#!/usr/bin/env python
"""Gera as imagens otimizadas de assets/img/ a partir das originais em
docs/design/assets-reais/. Reprodutivel: rode de novo sempre que as
originais mudarem. As originais nunca sao alteradas; nenhuma imagem e
recolorida, so redimensionada e reencodada."""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SRC = os.path.join(ROOT, "docs", "design", "assets-reais")
OUT = os.path.join(ROOT, "assets", "img")
QUALITY = 90

# (caminho de origem relativo a SRC, subpasta de saida ("" = raiz de OUT),
#  nome base de saida, larguras, formato de fallback)
JOBS = [
    ("idf-br-ferramenta-1440.png", "", "idf-br-ferramenta", [480, 820, 1440], "png"),
    ("idf-br-futuro-1440.png", "", "idf-br-futuro", [600, 1200], "png"),
    ("dvo-1440.png", "", "dvo", [480, 760, 1440], "png"),
    ("ciere-1440.png", "", "ciere", [960, 1440], "png"),
    ("ciere-mobile-390.png", "", "ciere-mobile", [230, 460], "png"),
    ("vivencias/hut8-equipe.jpg", "vivencias", "hut8-equipe", [400, 800], "jpg"),
    ("vivencias/hut8-evento.jpg", "vivencias", "hut8-evento", [400, 800], "jpg"),
    ("vivencias/nip-ufmg.jpg", "vivencias", "nip-ufmg", [400, 800], "jpg"),
    ("vivencias/nip-conabreh-inteira.jpg", "vivencias", "nip-conabreh-inteira", [400, 800, 1200], "jpg"),
    ("sobre/retrato.jpg", "sobre", "retrato", [384], "jpg"),
    ("quantum/qml_classificacao_pca_completo1-01.png", "quantum", "qml-dados", ["natural"], "png"),
    ("quantum/qml_classificacao_pca_completo1-03.png", "quantum", "qml-representacao", ["natural"], "png"),
    ("quantum/qml_classificacao_pca_completo1-05.png", "quantum", "qml-featuremap", ["natural"], "png"),
    ("quantum/qml_classificacao_pca_completo1-07.png", "quantum", "qml-kernel", ["natural"], "png"),
    ("quantum/qml_classificacao_pca_completo1-09.png", "quantum", "qml-resultado", ["natural"], "png"),
]


def resized(im, width):
    if width == "natural" or width == im.width:
        return im, im.width, im.height
    height = round(im.height * (width / im.width))
    return im.resize((width, height), Image.LANCZOS), width, height


def main():
    manifest = []
    for rel_src, subdir, basename, widths, fallback_fmt in JOBS:
        src_path = os.path.join(SRC, rel_src)
        im = Image.open(src_path)
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "A" in im.mode else "RGB")

        out_dir = os.path.join(OUT, subdir) if subdir else OUT
        os.makedirs(out_dir, exist_ok=True)

        max_width = im.width if widths == ["natural"] else max(widths)
        for w in widths:
            resampled, actual_w, actual_h = resized(im, w)
            suffix = "" if w == "natural" else f"-{w}"
            webp_path = os.path.join(out_dir, f"{basename}{suffix}.webp")
            save_im = resampled if resampled.mode != "RGBA" or fallback_fmt != "jpg" else resampled.convert("RGB")
            save_im.save(webp_path, "WEBP", quality=QUALITY, method=6)
            manifest.append((webp_path, actual_w, actual_h))

        # Fallback no formato original, na maior largura da lista.
        fallback_im, fw, fh = resized(im, max_width if widths != ["natural"] else "natural")
        fallback_suffix = "" if widths == ["natural"] else f"-{max_width}"
        fallback_path = os.path.join(out_dir, f"{basename}{fallback_suffix}.{fallback_fmt}")
        if fallback_fmt == "jpg":
            fallback_im = fallback_im.convert("RGB")
            fallback_im.save(fallback_path, "JPEG", quality=94)
        else:
            fallback_im.save(fallback_path, "PNG", optimize=True)
        manifest.append((fallback_path, fw, fh))

    for path, w, h in manifest:
        print(f"{os.path.relpath(path, ROOT)}\t{w}x{h}\t{os.path.getsize(path)}B")


if __name__ == "__main__":
    main()
