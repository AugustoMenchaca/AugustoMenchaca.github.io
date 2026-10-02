#!/usr/bin/env python3
"""Troca a tela de um render Mokker recortado por uma captura.

Uso: python mokker-compoe.py RENDER ANGULO_JSON CAPTURA SAIDA.webp
"""
import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from skimage.transform import ProjectiveTransform, warp


def polygon_mask(size, polygon):
    mask = Image.new("L", size)
    if polygon:
        ImageDraw.Draw(mask).polygon([tuple(p) for p in polygon], fill=255)
    return mask


def rounded_mask(size, pct):
    width, height = size
    mask = Image.new("L", size)
    radius = round(width * pct / 100)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, width - 1, height - 1), radius=radius, fill=255)
    return mask


def project(image, quad, size, order=1):
    width, height = image.size
    transform = ProjectiveTransform()
    if not transform.estimate(np.array([[0, 0], [width, 0], [width, height], [0, height]], float), np.array(quad, float)):
        raise ValueError("homografia invalida")
    pixels = np.asarray(image, dtype=np.float32) / 255
    result = warp(pixels, transform.inverse, output_shape=(size[1], size[0]),
                  order=order, mode="constant", cval=0, preserve_range=True)
    return Image.fromarray(np.uint8(np.clip(result * 255 + .5, 0, 255)), image.mode)


def expanded_quad(quad, amount=.5):
    points = np.array(quad, float)
    center = points.mean(axis=0)
    vectors = points - center
    return (points + amount * vectors / np.linalg.norm(vectors, axis=1)[:, None]).tolist()


def compose(render, angle, capture):
    base = render.convert("RGBA")
    capture = capture.convert("RGB")
    quad = expanded_quad(angle["quad_original"])
    screen = project(capture, quad, base.size).convert("RGBA")
    mask = project(rounded_mask(capture.size, angle["raio_pct"]), quad, base.size)
    # O poligono foi medido no render original: recoloque seus pixels sem
    # reconstruir cor, reflexo ou a borda antialias da ilha.
    composed = Image.composite(screen, base, mask)
    notch = polygon_mask(base.size, angle.get("notch_poligono"))
    return Image.composite(base, composed, notch)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("render", type=Path)
    parser.add_argument("angulo_json", type=Path)
    parser.add_argument("captura", type=Path)
    parser.add_argument("saida", type=Path, help="caminho do WebP cheio")
    parser.add_argument("--quality", type=int, default=85)
    args = parser.parse_args()
    if not 0 <= args.quality <= 100:
        parser.error("--quality deve estar entre 0 e 100")
    angle = json.loads(args.angulo_json.read_text(encoding="utf-8"))
    with Image.open(args.render) as source, Image.open(args.captura) as capture:
        result = compose(source, angle, capture)
    if list(result.size) != angle["imagem"]:
        raise ValueError(f"dimensoes {result.size} divergem de {angle['imagem']}")
    args.saida.parent.mkdir(parents=True, exist_ok=True)
    result.save(args.saida, "WEBP", quality=args.quality, method=6)
    half = result.resize((result.width // 2, result.height // 2), Image.Resampling.LANCZOS)
    half_path = args.saida.with_name(args.saida.stem + "-m.webp")
    half.save(half_path, "WEBP", quality=args.quality, method=6)
    print(f"{args.saida}: {args.saida.stat().st_size} B")
    print(f"{half_path}: {half_path.stat().st_size} B")


if __name__ == "__main__":
    main()
