# Otimização de Carga e Ferramentas

## Ferramentas
1. **Auditor de Carga** (`docs/design/tools/auditar-carga.mjs`): Ferramenta CDP para medir o consumo exato e iterativo de rede ao rolar cada seção, registrando limites em KB e aferindo o CLS para evitar layout shifts.
   - Uso: `node docs/design/tools/auditar-carga.mjs <url> [--orcamento docs/design/orcamento-carga.json]`
2. **Otimizador de Imagens** (`docs/design/tools/otimizar-imagens.py`):
   - Uso: `python docs/design/tools/otimizar-imagens.py` (relatório dry-run)
   - Uso ativo: `python docs/design/tools/otimizar-imagens.py --aplica --remove-orfas`
   - O otimizador converte os rasters grandes e reporta redundâncias/órfãs, com base nas referências ativas do código.

## Orçamento de Carga (`orcamento-carga.json`)
Mantém a meta exigente para dispositivos:
- **`primeiraCargaKB` (365 KB)**: Assegura TTI rápido; limite calibrado a partir do baseline do GitHub Pages (com compressão gzip no servidor estático node local).
- **`roladaSemVideoKB` (837 KB)** e **`porSecaoKB` (230 a 199 KB)**: Mantém o payload das subpáginas isolado; vídeos ficam sob lazy control próprio de mídia.
- **`clsMax` (0.1)**: o limite "bom" dos Core Web Vitals. No CI (rede e CPU lentas) o texto do hero se reorganiza uma vez, o que dá CLS ~0,07 sem nenhuma mudança na página; localmente fica em ~0,01. Medido na #110: com CPU 4× mais lenta o primeiro frame de estilo e layout prende a thread principal por ~1,7 s, a fonte baixa em ~1,4 s mas só é aplicada depois do primeiro paint. Hospedar a fonte não muda isso, e o fallback com métrica zera o CLS mas atrasa o LCP em ~0,8 s (ver `fontes.md`). Para um teto mais rígido, o caminho é encurtar esse primeiro frame, não baixar o teto.
- Definição Exata da **Primeira Carga**: tudo que é transferido (comprimido em rede) até 3 s depois do `load`, sem rolar, incluindo HTML, CSS, JS, fontes e imagens, **sem vídeo**.
- Fontes próprias em `assets/fonts/` (woff2, já comprimido): `ibm-plex-mono` ~45 KB (3 reqs), `instrument-sans` ~30 KB (1 req), `inter` ~48 KB (1 req). Desde a #110 não há requisição ao Google Fonts.

## Medição (3 rodadas, `servir.mjs` com gzip, Chrome com GPU)

| | 1440 px | 390 px |
|---|---|---|
| primeira carga (sem vídeo, comprimida) | 304 KB | 264 KB |
| total rolando a página inteira | 1031 KB | 737 KB |
| CLS da rolagem completa | 0,0155 a 0,0175 | 0,0001 |
| só imagens, antes de rolar (`cdp-prod.mjs`) | 157 KB | |

**De onde vêm os 304 KB (1440):** fontes ~123 KB (Inter 47, Instrument Sans 29, IBM Plex Mono 44), `idf-tela-1440.webp` 78 KB e `idf-celular-390.webp` 40 KB (a ~1 tela da dobra, dentro da distância de `loading="lazy"` do Chrome), prévias do hero 39 KB (`dvo-480.webp` e `idf-br-ferramenta-480.webp`, só aparecem ao passar o mouse nos papéis), HTML 20 KB. Ideia para depois, se o orçamento apertar: carregar as prévias do hero só no primeiro `pointerenter` (−39 KB).

**O que NÃO entrou, e por quê:** testei uma pré-busca da próxima seção (`loading="eager"` nas imagens da seção seguinte, em ocioso). Ela **somou ~80 KB às imagens da primeira carga** (157 → 236 KB em `cdp-prod.mjs`) sem ganho medido de CLS nem de bytes totais, e o objetivo aqui é carregar **menos** de uma vez. Foi descartada. A página já carrega por seção: imagens abaixo da dobra com `loading="lazy"` e vídeo só perto da tela.

**O que entrou:** `carga.css` (`content-visibility: auto` em `#about`, `#contact` e rodapé: sem bytes, menos layout e pintura fora da tela; CLS igual) e, principalmente, o **auditor com orçamento** (reprova no CI se a página engordar) e o relatório de imagens.

## Edições aplicadas ao `index.html` (já feitas na #96)
1. `<link rel="stylesheet" href="assets/css/carga.css">` no `<head>`.
2. Os fallbacks PNG das prévias do hero (`idf-br-ferramenta-1440.png`, `dvo-1440.png`) viraram o WebP de 480 e os dois PNG foram **removidos** (−864 KB no repositório; 0 na rede, porque o `<source>` WebP já os cobria).
3. Sem imagem de LCP: o hero é tipográfico.

## Ferramentas auxiliares
- `docs/design/tools/servir.mjs <porta>`: servidor estático local com gzip (como o GitHub Pages) e `Range` para MP4; é o que o auditor e o CI usam.
- `docs/design/tools/medir-alturas.mjs`: mede a altura de cada seção por largura, para recalibrar os `contain-intrinsic-size` de `carga.css`.
