#!/usr/bin/env python3
"""Extrai e valida um novo angulo Mokker. Requer Pillow, numpy, scipy e scikit-image."""
import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from skimage.feature import ORB, match_descriptors
from skimage.measure import approximate_polygon, find_contours, ransac
from skimage.metrics import structural_similarity
from skimage.morphology import convex_hull_image
from skimage.transform import ProjectiveTransform, warp

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parents[1]


def gray(im, maxw):
    rgb = im.convert("RGB")
    if rgb.width > maxw:
        rgb = rgb.resize((maxw, round(rgb.height * maxw / rgb.width)), Image.Resampling.LANCZOS)
    return np.asarray(rgb.convert("L"), dtype=float) / 255, rgb.width / im.width


def matches_quad(render, capture):
    base = Image.new("RGBA", render.size, (128, 128, 128, 255))
    base.alpha_composite(render)
    gr, sr = gray(base, 1000)
    gc, _ = gray(capture, 700)
    a, b = ORB(n_keypoints=2500, fast_threshold=.03), ORB(n_keypoints=2500, fast_threshold=.03)
    a.detect_and_extract(gc)
    b.detect_and_extract(gr)
    pairs = match_descriptors(a.descriptors, b.descriptors, cross_check=True, max_ratio=.85)
    if len(pairs) < 8:
        raise ValueError(f"apenas {len(pairs)} pontos correspondentes")
    model, inliers = ransac((a.keypoints[pairs[:, 0]][:, ::-1], b.keypoints[pairs[:, 1]][:, ::-1]),
                            ProjectiveTransform, min_samples=4, residual_threshold=4, max_trials=3000)
    if model is None or inliers.sum() < 8:
        raise ValueError(f"RANSAC: apenas {0 if inliers is None else inliers.sum()} pontos válidos")
    h, w = gc.shape
    return model(np.array([[0, 0], [w, 0], [w, h], [0, h]], float)) / sr, int(inliers.sum())


def line_intersection(first, second):
    (x1, y1), (x2, y2) = first
    (x3, y3), (x4, y4) = second
    d = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)
    if abs(d) < 1e-8:
        raise ValueError("lados paralelos na moldura")
    return [((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/d,
            ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/d]


def frame_quad(render):
    data = np.asarray(render)
    dark = (data[..., :3].max(axis=2) < 48) & (data[..., 3] > 200)
    labels, count = ndi.label(dark)
    if not count:
        raise ValueError("moldura preta ausente")
    sizes = ndi.sum(dark, labels, range(1, count+1))
    frame = labels == 1 + int(np.argmax(sizes))
    hole = ndi.binary_fill_holes(frame) & ~frame
    labels, count = ndi.label(hole)
    if not count:
        raise ValueError("moldura sem tela fechada")
    sizes = ndi.sum(hole, labels, range(1, count+1))
    screen = labels == 1 + int(np.argmax(sizes))
    hull = convex_hull_image(screen)
    contour = max(find_contours(hull.astype(float), .5), key=len)
    poly = approximate_polygon(contour, tolerance=6)[:-1][:, ::-1]
    edges = [(poly[i], poly[(i+1) % len(poly)]) for i in range(len(poly))]
    index = sorted(np.argsort([np.linalg.norm(y-x) for x, y in edges])[-4:])
    sides = [edges[i] for i in index]
    corners = np.asarray([line_intersection(sides[i], sides[(i+1) % 4]) for i in range(4)])
    total, diff = corners.sum(axis=1), corners[:, 0]-corners[:, 1]
    return np.asarray([corners[np.argmin(total)], corners[np.argmax(diff)],
                       corners[np.argmax(total)], corners[np.argmin(diff)]]), int(screen.sum())


def matrix_for(quad, dimensions, inset):
    width, height = dimensions
    unit = ProjectiveTransform()
    unit.estimate(np.array([[0, 0], [1, 0], [1, 1], [0, 1]], float), quad)
    mx = inset / np.linalg.norm(quad[1]-quad[0])
    my = inset / np.linalg.norm(quad[3]-quad[0])
    inner = unit(np.array([[mx, my], [1-mx, my], [1-mx, 1-my], [mx, 1-my]]))
    transform = ProjectiveTransform()
    transform.estimate(np.array([[0, 0], [width, 0], [width, height], [0, height]], float), inner)
    a, b, c = transform.params[0]
    d, e, f = transform.params[1]
    g, h, i = transform.params[2]
    values = [a/i, d/i, 0, g/i, b/i, e/i, 0, h/i, 0, 0, 1, 0, c/i, f/i, 0, 1]
    return inner, "matrix3d(" + ",".join(f"{v:.9g}" for v in values) + ")"


def notch_polygon(cropped, quad):
    data = np.asarray(cropped.convert("RGBA"))
    dark = (data[..., :3].max(axis=2) < 45) & (data[..., 3] > 200)
    unit = ProjectiveTransform()
    unit.estimate(np.array([[0, 0], [1, 0], [1, 1], [0, 1]], float), quad)
    inv = ProjectiveTransform(np.linalg.inv(unit.params))
    h, w = dark.shape
    yy, xx = np.mgrid[:h, :w]
    uv = inv(np.stack([xx.ravel(), yy.ravel()], axis=1)).reshape(h, w, 2)
    region = (uv[..., 0] > .30) & (uv[..., 0] < .70) & (uv[..., 1] > .006) & (uv[..., 1] < .09)
    blob = ndi.binary_closing(dark & region, iterations=2)
    labels, count = ndi.label(blob)
    if not count:
        return None
    sizes = ndi.sum(blob, labels, range(1, count+1))
    hull = convex_hull_image(labels == 1 + int(np.argmax(sizes)))
    contour = max(find_contours(hull.astype(float), .5), key=len)
    return np.round(approximate_polygon(contour, tolerance=1.5)[:-1][:, ::-1], 1).tolist()


def metrics(render, capture, quad):
    base = Image.new("RGBA", render.size, (128, 128, 128, 255))
    base.alpha_composite(render)
    cap = np.asarray(capture.convert("RGB"), dtype=float) / 255
    transform = ProjectiveTransform()
    transform.estimate(quad, np.array([[0, 0], [capture.width, 0],
                                       [capture.width, capture.height], [0, capture.height]], float))
    warped = warp(cap, transform, output_shape=(render.height, render.width), order=1, cval=-1)
    mask = ndi.binary_erosion(warped[..., 0] >= 0, iterations=14)
    if mask.sum() < 1000:
        raise ValueError("quadrilátero sem área útil de validação")
    observed = np.asarray(base.convert("RGB"), dtype=float).mean(axis=2) / 255
    expected = warped.mean(axis=2)
    ys, xs = np.where(mask)
    box = np.s_[ys.min():ys.max()+1, xs.min():xs.max()+1]
    score = structural_similarity(observed[box], np.clip(expected[box], 0, 1), data_range=1)
    error = np.abs(observed[mask] - np.clip(expected[mask], 0, 1)).mean()
    return float(error), float(score)


def overlay(cropped, quad, capture_size, out):
    canvas = Image.new("RGBA", cropped.size, (128, 128, 128, 255))
    canvas.alpha_composite(cropped)
    transform = ProjectiveTransform()
    w, h = capture_size
    transform.estimate(np.array([[0, 0], [w, 0], [w, h], [0, h]], float), quad)
    draw = ImageDraw.Draw(canvas)
    for x in np.linspace(0, w, 11):
        pts = transform(np.stack([np.full(51, x), np.linspace(0, h, 51)], axis=1))
        draw.line([tuple(p) for p in pts], fill=(255, 0, 255), width=2)
    for y in np.linspace(0, h, 9):
        pts = transform(np.stack([np.linspace(0, w, 51), np.full(51, y)], axis=1))
        draw.line([tuple(p) for p in pts], fill=(255, 0, 255), width=2)
    canvas.convert("RGB").save(out, quality=90)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("render", type=Path)
    parser.add_argument("captura", type=Path)
    parser.add_argument("--tipo", choices=("macbook", "iphone"), required=True)
    parser.add_argument("--saida", type=Path)
    args = parser.parse_args()
    out = args.saida or args.render.parent / (args.render.stem + "-angulo")
    out.mkdir(parents=True, exist_ok=True)
    render = Image.open(args.render).convert("RGBA")
    capture = Image.open(args.captura).convert("RGB")
    method = "moldura"
    if args.tipo == "macbook":
        try:
            detected, points = matches_quad(render, capture)
            method = f"ORB/RANSAC ({points} pontos)"
        except (ValueError, RuntimeError) as exc:
            print(f"casamento falhou ({exc}); tentando moldura", file=sys.stderr)
            detected, _ = frame_quad(render)
    else:
        detected, _ = frame_quad(render)
    # Angulos de referencia ja medidos em mais de um render usam o contorno
    # canonico; a deteccao acima confirma que o PNG fornecido e o mesmo angulo.
    records = json.loads((ROOT / "mokker.json").read_text(encoding="utf-8"))
    known = records.get(args.render.stem)
    if known:
        bounds = render.getchannel("A").getbbox()
        crop_origin = np.array([max(bounds[0]-6, 0), max(bounds[1]-6, 0)])
        reference = np.asarray(known["quad"], float) + crop_origin
        delta = float(np.linalg.norm(detected-reference, axis=1).max())
        if delta > 8:
            raise ValueError(f"render diverge {delta:.1f}px do angulo de referencia")
        quad = reference
        method += f"; contorno canonico ({delta:.2f}px da deteccao)"
    else:
        quad = detected
    error, score = metrics(render, capture, quad)
    bounds = render.getchannel("A").getbbox()
    if bounds is None:
        raise ValueError("render totalmente transparente")
    x0, y0, x1, y1 = max(0, bounds[0]-6), max(0, bounds[1]-6), min(render.width, bounds[2]+6), min(render.height, bounds[3]+6)
    cropped = render.crop((x0, y0, x1, y1))
    q = quad - [x0, y0]
    name = args.render.stem
    for width, suffix in ((cropped.width, ""), (cropped.width//2, "-m")):
        result = cropped if width == cropped.width else cropped.resize((width, round(cropped.height*width/cropped.width)), Image.Resampling.LANCZOS)
        result.save(out / (name + suffix + ".webp"), "WEBP", quality=88, method=3)
    size = (1440, 900) if args.tipo == "macbook" else (390, 844)
    inner, matrix = matrix_for(q, size, 1.5 if args.tipo == "macbook" else 2.5)
    notch = notch_polygon(cropped, q)
    overlay(cropped, inner, size, out / "sobreposicao.jpg")
    result = {"quad": np.round(q, 2).tolist(), "quad_com_margem": np.round(inner, 2).tolist(),
              "matrix3d": matrix, "raio_pct": .6 if args.tipo == "macbook" else 13.5,
              "notch_poligono": notch, "imagem": list(cropped.size), "captura": list(size),
              "metricas": {"erro_medio": round(error, 5), "ssim": round(score, 5), "metodo": method}}
    (out / "angulo.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"quad={result['quad']}\nmatrix3d={matrix}\nraio_pct={result['raio_pct']}\nnotch_poligono={notch}")
    print(f"erro_medio={error:.5f} ssim={score:.5f} metodo={method}")
    print(f"saida={out} (WebP cheio, -m, angulo.json, sobreposicao.jpg)")
    if error > .03:
        print(f"FALHA: erro medio {error:.5f} > 0.03; confira captura, alinhamento e conteudo da tela", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"FALHA: {exc}", file=sys.stderr)
        raise SystemExit(1)
