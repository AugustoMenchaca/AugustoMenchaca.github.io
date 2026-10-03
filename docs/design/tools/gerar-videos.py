#!/usr/bin/env python3
"""Gera as versoes leves dos videos de gravacao de tela (issue #90).

Entrada (fora do repositorio): C:/Users/augus/specs/videos90/
Saida: assets/video/*.mp4 (H.264, 60 fps, sem audio) e assets/img/video/*.webp (posteres).

Uso: python docs/design/tools/gerar-videos.py
"""
from __future__ import annotations

import json
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SRC_DIR = Path("C:/Users/augus/specs/videos90")
VIDEO_OUT = ROOT / "assets" / "video"
POSTER_OUT = ROOT / "assets" / "img" / "video"


@dataclass
class Variant:
    name: str  # ex.: "idf-desktop"
    widths: list[int]  # tentadas em ordem; cai para a proxima se nao couber
    ceiling_bytes: int
    profile: str  # "high" (desktop) ou "main" (mobile, decodifica mais facil)


@dataclass
class Source:
    slug: str  # ex.: "idf"
    src: str  # arquivo em SRC_DIR
    poster_src: str
    variants: list[Variant]


SOURCES = [
    Source(
        slug="idf",
        src="idf-60fps.mp4",
        poster_src="idf-60fps-poster.jpg",
        variants=[
            Variant("idf-desktop", [1280, 960], 1_600_000, "high"),
            Variant("idf-mobile", [640], 900_000, "main"),
        ],
    ),
    Source(
        slug="advocacia",
        src="advocacia-60fps.mp4",
        poster_src="advocacia-poster.jpg",
        variants=[
            Variant("advocacia-desktop", [1280, 960], 1_600_000, "high"),
            Variant("advocacia-mobile", [640], 900_000, "main"),
        ],
    ),
]


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)


def encode(src: Path, out: Path, width: int, crf: int, profile: str) -> None:
    run([
        "ffmpeg", "-y", "-i", str(src),
        "-an",
        "-vf", f"scale={width}:-2,fps=60",
        "-c:v", "libx264", "-profile:v", profile, "-preset", "slow",
        "-crf", str(crf),
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(out),
    ])


def ffprobe(path: Path) -> dict:
    out = subprocess.run([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=codec_name,r_frame_rate,width,height,duration",
        "-of", "json", str(path),
    ], check=True, capture_output=True, text=True).stdout
    data = json.loads(out)["streams"][0]
    data["size_bytes"] = path.stat().st_size
    return data


def make_poster(image: Path, out: Path, width: int) -> None:
    run([
        "ffmpeg", "-y", "-i", str(image),
        "-vf", f"scale={width}:-2",
        "-c:v", "libwebp", "-quality", "82",
        str(out),
    ])


def encode_variant(src_path: Path, variant: Variant) -> dict:
    out_path = VIDEO_OUT / f"{variant.name}.mp4"
    for width in variant.widths:
        crf = 27
        while True:
            encode(src_path, out_path, width, crf, variant.profile)
            size = out_path.stat().st_size
            if size <= variant.ceiling_bytes or crf >= 34:
                break
            crf += 1
        if size <= variant.ceiling_bytes or width == variant.widths[-1]:
            break
    info = ffprobe(out_path)
    info["crf"] = crf
    info["chosen_width"] = width
    return info


def main() -> int:
    VIDEO_OUT.mkdir(parents=True, exist_ok=True)
    POSTER_OUT.mkdir(parents=True, exist_ok=True)
    report: list[str] = []

    for source in SOURCES:
        src_path = SRC_DIR / source.src
        poster_src_path = SRC_DIR / source.poster_src
        for variant in source.variants:
            info = encode_variant(src_path, variant)
            report.append(
                f"{variant.name}.mp4: codec_name={info['codec_name']} "
                f"r_frame_rate={info['r_frame_rate']} width={info['width']} "
                f"height={info['height']} duration={info['duration']} "
                f"size_bytes={info['size_bytes']} crf={info['crf']} teto={variant.ceiling_bytes}"
            )

        for width in (1280, 640):
            poster_path = POSTER_OUT / f"{source.slug}-poster-{width}.webp"
            make_poster(poster_src_path, poster_path, width)
            report.append(f"{poster_path.name}: {poster_path.stat().st_size} bytes")

    print("\n".join(report))
    return 0


if __name__ == "__main__":
    sys.exit(main())
