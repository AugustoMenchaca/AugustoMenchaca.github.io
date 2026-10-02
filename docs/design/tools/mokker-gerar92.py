#!/usr/bin/env python3
"""Regera e verifica os seis renders da colagem #92."""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

from importlib.machinery import SourceFileLoader

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[3]
SPECS = Path(r"C:\Users\augus\specs\mokker90\novos")
OUT = ROOT / "assets/mokker"
REAL = ROOT / "docs/design/assets-reais"
COMPOSE = SourceFileLoader("compoe", str(Path(__file__).with_name("mokker-compoe.py"))).load_module()

ITEMS = [
    ("idf-macbook-cima-esq", "macbook-branco-cima-esq", "idf-br-ferramenta-1440.png"),
    ("idf-iphone-frontal", "iphone-branco-frontal", "idf-br-mobile-780.jpg"),
    ("dvo-macbook-cima-dir", "macbook-branco-cima-dir", "dvo-1440.png"),
    ("dvo-iphone-cima-dir", "iphone-branco-cima-dir", "dvo-mobile-780.jpg"),
    ("ciere-macbook-baixo-esq", "macbook-branco-baixo-esq", "ciere-1440.png"),
    ("ciere-iphone-frontal", "iphone-branco-frontal", "ciere-mobile-390.png"),
]


def restore(name, old, temp):
    result = subprocess.run(["git", "show", f"cca63ea^:assets/img/celulares/{old}"],
                            cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors="replace"))
    target = temp / name
    target.write_bytes(result.stdout)
    print(f"git show cca63ea^:assets/img/celulares/{old} -> {name} ({len(result.stdout)} B)")
    return target


def magenta_proof(angle, original, label):
    w, h = angle["captura"]
    grid = Image.new("RGB", (w, h), (255, 0, 255))
    draw = ImageDraw.Draw(grid)
    for x in range(0, w, 39):
        draw.line((x, 0, x, h), fill=(248, 0, 248), width=1)
    for y in range(0, h, 42):
        draw.line((0, y, w, y), fill=(248, 0, 248), width=1)
    quad = angle["quad_com_margem"]
    projected = COMPOSE.project(grid, quad, original.size)
    mask = COMPOSE.project(COMPOSE.rounded_mask((w, h), angle["mascara_pct"]), quad, original.size)
    overlay = Image.composite(projected, original.convert("RGB"), mask)
    # Medicao equivalente ao teste magenta: pixels da grade dentro do quad.
    poly = COMPOSE.polygon_mask(original.size, quad)
    px = np.asarray(overlay)
    is_magenta = (px[..., 0] >= 245) & (px[..., 1] <= 10) & (px[..., 2] >= 245)
    inside = np.asarray(poly) > 0
    outside = int(np.count_nonzero(is_magenta & ~inside))
    magenta = int(np.count_nonzero(is_magenta))
    covered = int(np.count_nonzero(is_magenta & inside))
    area = int(np.count_nonzero(inside))
    leakage, coverage = outside / magenta, covered / area
    print(f"{label} mascara_pct={angle['mascara_pct']}: vazamento={leakage:.4%}, cobertura={coverage:.4%}")
    if leakage > .005 or coverage < .96:
        raise AssertionError(f"mascara reprovada: {label}")
    return overlay


def main():
    source_angles = json.loads((SPECS / "angulos-novos.json").read_text(encoding="utf-8"))
    existing_path = OUT / "angulos.json"
    existing = json.loads(existing_path.read_text(encoding="utf-8"))
    with tempfile.TemporaryDirectory() as temporary:
        temp = Path(temporary)
        mobiles = {
            "idf-br-mobile-780.jpg": restore("idf-br-mobile-780.jpg", "idf-celular-780.jpg", temp),
            "dvo-mobile-780.jpg": restore("dvo-mobile-780.jpg", "dvo-celular-780.jpg", temp),
        }
        panels = []
        proofs = []
        lines = []
        total = 0
        for name, angle_name, capture_name in ITEMS:
            capture_path = mobiles.get(capture_name, REAL / capture_name)
            angle = dict(source_angles[angle_name])
            short = angle_name.replace("-branco", "")
            if short.startswith("iphone"):
                angle["mascara_pct"] = 13.5
            existing[short] = angle
            with Image.open(SPECS / (angle_name + ".webp")) as original_file, Image.open(capture_path) as capture_file:
                original = original_file.convert("RGBA")
                capture = capture_file.convert("RGB")
            output = COMPOSE.compose(original, angle, capture)
            cap = 90_000 if short.startswith("macbook") else 35_000
            half_cap = 45_000 if short.startswith("macbook") else 18_000
            # Preserva 85 sempre que couber; qualquer reducao fica registrada.
            for quality in (85, 82, 80, 78):
                full_path = OUT / (name + ".webp")
                half_path = OUT / (name + "-m.webp")
                output.save(full_path, "WEBP", quality=quality, method=6)
                half = output.resize((output.width // 2, output.height // 2), Image.Resampling.LANCZOS)
                half.save(half_path, "WEBP", quality=quality, method=6)
                if full_path.stat().st_size <= cap and half_path.stat().st_size <= half_cap:
                    break
            else:
                raise AssertionError(f"peso acima do limite: {name}")
            for path in (full_path, half_path):
                size = path.stat().st_size
                lines.append(f"{path.name}\t{size} B")
                total += size
            print(f"{name}: {full_path.stat().st_size}/{half_path.stat().st_size} B, qualidade {quality}")
            if short.startswith("iphone"):
                proofs.append((name, magenta_proof(angle, original, name)))
            # Comparacao: origem, captura e resultado no mesmo painel.
            thumb = Image.new("RGB", (1080, 340), "#f5f5f5")
            draw = ImageDraw.Draw(thumb)
            draw.text((12, 8), f"{name} | fonte / captura / composicao", fill="black")
            for ix, im in enumerate((original, capture, output)):
                rgb = im.convert("RGB")
                rgb.thumbnail((345, 300), Image.Resampling.LANCZOS)
                thumb.paste(rgb, (ix * 360 + (360 - rgb.width) // 2, 34 + (300 - rgb.height) // 2))
            panels.append(thumb)
        existing_path.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        check = Image.new("RGB", (1080, 340 * len(panels)), "white")
        for i, panel in enumerate(panels):
            check.paste(panel, (0, i * 340))
        check.save(ROOT / "docs/design/mokker-composicao-check.jpg", quality=88)
        proof_image = Image.new("RGB", (900, 700), "#f5f5f5")
        for i, (name, im) in enumerate(proofs):
            im.thumbnail((280, 650), Image.Resampling.LANCZOS)
            proof_image.paste(im.convert("RGB"), (i * 300 + 10, 35))
            ImageDraw.Draw(proof_image).text((i * 300 + 10, 10), name, fill="black")
        proof_image.save(Path(__file__).with_name("mokker-magenta-check.png"))
        lines.append(f"TOTAL\t{total} B")
        (OUT / "PRONTO").write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"TOTAL {total} B")


if __name__ == "__main__":
    main()
