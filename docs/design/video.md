# Vídeos nos aparelhos (issue #90)

Gerados por `docs/design/tools/gerar-videos.py`, que chama o `ffmpeg` a partir
dos originais em `C:/Users/augus/specs/videos90/` (fora do repositório). Cada
vídeo: `-an`, `-pix_fmt yuv420p`, `-movflags +faststart`, `-r 60`, `crf 27`.
Desktop em `-profile:v high`; mobile em `-profile:v main` (adendo do
coordenador: decodifica mais fácil em celular fraco).

Comando por versão (exemplo IDF desktop):

```
ffmpeg -i idf-60fps.mp4 -an -vf "scale=1280:-2,fps=60" -c:v libx264 \
  -profile:v high -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart \
  idf-desktop.mp4
```

## `ffprobe` de cada saída

| arquivo | codec_name | profile | r_frame_rate | width | height | duration | tamanho | teto |
|---|---|---|---|---|---|---|---|---|
| `assets/video/idf-desktop.mp4` | h264 | High | 60/1 | 1280 | 720 | 30.233333 | 1.486.636 B (1,42 MB) | 1,6 MB |
| `assets/video/idf-mobile.mp4` | h264 | Main | 60/1 | 640 | 360 | 30.233333 | 434.673 B (0,41 MB) | 0,9 MB |
| `assets/video/advocacia-desktop.mp4` | h264 | High | 60/1 | 1280 | 720 | 32.600000 | 1.448.978 B (1,38 MB) | 1,6 MB |
| `assets/video/advocacia-mobile.mp4` | h264 | Main | 60/1 | 640 | 360 | 32.600000 | 504.741 B (0,48 MB) | 0,9 MB |

Todas couberam no teto já em `crf 27`, sem precisar cair para a largura de
960px. Um quadro de cada saída foi conferido visualmente: o texto da captura
(IDF-BR e Ciere da Rosa Advocacia) continua legível nas versões desktop e
mobile.

## Posteres (WebP)

| arquivo | largura | tamanho |
|---|---|---|
| `assets/img/video/idf-poster-1280.webp` | 1280 | 35.584 B |
| `assets/img/video/idf-poster-640.webp` | 640 | 11.626 B |
| `assets/img/video/advocacia-poster-1280.webp` | 1280 | 35.794 B |
| `assets/img/video/advocacia-poster-640.webp` | 640 | 12.880 B |

## Onde entram

- **IDF-BR**, notebook principal (`idf-screen-main`, MacBook Pro 16"
  "tampa real"): `idf-desktop.mp4` / `idf-mobile.mp4`.
- **Ciere da Rosa Advocacia**, notebook (`ciere-shot-desktop`, MacBook
  grafite): `advocacia-desktop.mp4` / `advocacia-mobile.mp4`.
- A tela de "clima futuro" do IDF-BR, os dois iPhones e o DVO (notebook e
  celular) continuam só com a captura estática — nenhum vídeo configurado.

Os originais de 5 a 6 MB não entram no repositório; só as saídas acima.
