# REFERENCE-BOARD-v2 — "por que parece morto"

**Motivo:** o cliente reprovou as seis hipóteses (H1–H6) com "está dando cara de
site morto" e disse que todas as referências dele são "sempre vivas e com
cores". Este board investiga a causa e **derruba a hipótese de cor**.

Instrumento único em todas as linhas: Chrome headless, `emulate --viewport
1440x900x1`, área cromática = soma da área dos fundos com croma > 0,15 dividida
pela área total dos fundos opacos maiores que 900px².

---

## 1. A hipótese de cor está errada — medida

| peça | altura | **área cromática** | `<img>` | `<svg>` | `<video>` | keyframes | elems em transição |
|---|---|---|---|---|---|---|---|
| **Aelixa** (referência do cliente) | 17502 | **0,4%** | 81 | 91 | 1 | 1 | 18 |
| distill.pub | 7933 | 3,1% | 32 | 2 | 0 | 0 | 0 |
| visualcinnamon.com | 5342 | 7,9% | 33 | 9 | 0 (+1 canvas) | 0 | 10 |
| jalammar.github.io | 32792 | **0%** | 30 | 1 | 3 | 4 | 0 |
| paco.me | **1424** | **0%** | **0** | 0 | 0 | **20** | **13** |
| emilkowal.ski | 2480 | 0,1% | **0** | 1 | 0 | 7 | 6 |
| **lp-final.html (nossa)** | 8455 | ~5% (vinho, pós-plano) | **0** | SVG de dado | 0 | 5 | ~10 |
| **idf-br.com.br** (projeto dele) | 929 | **18,4%** | 12 | 0 | 0 | — | — |
| **advocaciacieredarosa.com.br** (dele) | 6297 | **22,8%** | 9 | 10 | 0 | — | — |
| **dvopelotas.com.br** (dele) | 900 | **20,1%** | 1 | 1 | 0 | — | — |

**Conclusões que a tabela impõe:**

1. **Cor não é a variável.** A referência que o cliente chama de viva e colorida
   tem **0,4%** de área cromática. distill 3,1%, jalammar **0%**, paco **0%**.
   Nenhuma peça considerada viva é cromaticamente saturada.
2. **O trabalho do próprio cliente é 45 a 57× mais cromático que a referência
   dele.** IDF-BR 18,4%, Ciere 22,8%, DVO 20,1%, contra Aelixa 0,4%.
3. Correção ao digest do agente de pesquisa: ele afirmou que distill.pub usa
   **SVG inline** como arte principal. **Medi 2 elementos `<svg>` contra 32
   `<img>`.** As figuras científicas dessas peças são **imagem exportada**, não
   SVG codado à mão. A afirmação estava errada e foi descartada.

## 2. Existem duas rotas para "vivo", e elas são excludentes

### Rota A — densidade de mídia
distill.pub (32 img, 0 keyframes, 0 transições) · visualcinnamon (33 img) ·
jalammar (30 img + 3 vídeos, 0% de croma) · Aelixa (81 img + 91 svg + 1 vídeo,
0 animações ativas).

**Mecanismo:** a página é vista como viva porque está **cheia de coisa para
olhar**. O movimento é irrelevante — três dessas quatro têm zero animação ativa.

### Rota B — densidade de movimento
paco.me: **zero mídia**, 1424px de altura, **20 keyframes**, 1 animação ativa,
**13 elementos em transição**. emilkowal.ski: zero imagem, 7 keyframes.

**Gramática medida no paco.me:**
- `enter`: `opacity: 0 → 1` + `transform: translateY(10px) → none`
- `tooltipIn` / `tooltipOut`: `opacity` + `scale(0.9) → none`
- `dialogIn`: `opacity: 0.6 → 1` + `scale(0.95) → none`
- fades puros (`opacityIn` / `opacityOut`)
- **todos os 13 elementos em transição usam a mesma duração: `0.24s`** — uma
  constante única na página inteira.

**Mecanismo:** vocabulário minúsculo, uma única duração, aplicado a **entrada e
a superfície interativa** — não a decoração.

### Por que as seis hipóteses morreram

H1–H6 ficaram no **quadrante vazio das duas rotas**: zero mídia e
essencialmente zero movimento. Em H1 e H3 eu removi deliberadamente até o
estado de hover, seguindo a Folha (5 regras de hover, nenhuma no conteúdo). Foi
uma leitura correta de uma referência errada para este problema.

**E a LP atual está no mesmo quadrante:** 0 `<img>`, movimento só de entrada, a
**0,6s** — duas vezes e meia mais lento que os 0,24s do paco.me — mais um
marquee de 46s. Nada de estado interativo.

## 3. Três assets reais existem hoje, de graça

Capturados em `docs/design/assets-reais/` a 1440×900:

| arquivo | o que é | paleta real |
|---|---|---|
| `idf-br-1440.png` | interface real da plataforma: logo com mapa do Brasil pontilhado, quatro tiles de navegação com ícones de linha, texto descritivo, logos institucionais | navy `rgb(13,27,42)` croma 0,69 |
| `ciere-1440.png` | hero real: serifa em display, "experiência" em dourado, **ilustração 3D de balança**, CTA dourado, faixa marrom em marquee | creme `rgb(243,236,220)` + marrom `rgb(77,54,28)` + dourado `rgb(206,145,0)` croma **1,00** |
| `dvo-1440.png` | tela de login real: fotografia de oficina em luz azul, logo oficial SMA/Prefeitura, CTA laranja | branco + azul de foto |

**O site da Ciere é o achado mais instrutivo, e é trabalho dele:** ele parece
vivo sem **nenhuma fotografia de pessoa** — o visual principal é uma ilustração
renderizada. Responde diretamente à restrição "não gere pessoas, não use stock".

Restam **8 assets sem existir**: detalhe do IDF, visual do Quantum ML, duas
fotos do NIP, duas da Hut 8, detalhe mobile da Ciere, retrato do About.

## 4. Precedente aplicável ao caso dele — portfólio técnico carregado por dado

distill.pub · visualcinnamon.com · jalammar.github.io provam que **um portfólio
técnico pode ser inteiramente carregado por figura de dado autoral, sem
fotografia nenhuma**, e que 30 a 33 figuras bastam para a peça ler como viva com
0 a 3% de croma.

Aplicável porque ele **tem dado real**: curvas IDF de intensidade-duração-
frequência de chuva, e resultados do experimento de SVM clássico contra kernels
quânticos. A LP **já tem** cartões de dado em SVG na seção do IDF.

## 5. Técnicas sem dependência, sem npm, funcionando sem JS

Levantadas pelo agente de pesquisa; as que dependem de propriedade CSS estão
citadas pelo nome exato e precisam de `@supports` antes de entrar.

- **Grão / ruído:** `background-image: url("data:image/svg+xml,…")` embrulhando
  `<feTurbulence>`. Zero JS.
- **Campo de grade / papel milimetrado:** `linear-gradient` ou `conic-gradient`
  com `background-size` apertado. Zero JS.
- **Curva que se desenha:** `<path>` SVG inline com `stroke-dasharray` +
  `stroke-dashoffset` animados por `@keyframes`. Zero JS. **Tematicamente
  perfeito aqui: as curvas de chuva do IDF se desenham.**
- **Barra / histograma:** `display: grid` com o dado em custom property inline
  (`style="--val: 80"`) passada por `calc()`. Zero JS.
- **Revelação por rolagem:** `animation-timeline: view()` / `scroll()`.
  Sólido em Chromium; exige `@supports` com degradação para opacidade estática.
- **Tema derivado:** `color-mix(in oklch, var(--base), var(--accent))`.

**Precisa de JS de verdade:** tooltip interativo em gráfico, zoom e pan nas
curvas, fetch de JSON, canvas/WebGL.

## 6. Direção que a evidência aponta

Não é "adicionar cor". É **as duas rotas ao mesmo tempo, cada uma no que ela
faz bem**:

- **Mídia:** os 3 screenshots reais + figuras de dado autorais a partir dos
  dados reais dele. Cada projeto carrega a **paleta do próprio projeto** — cor
  emprestada do trabalho, não inventada, e nada é recolorido.
- **Movimento:** a gramática do paco.me — entrada com `translateY` + fade,
  `scale(0.95→1)` em superfície interativa, **uma única duração**, e a LP passa
  de 0,6s para algo próximo de 0,24s. Mais a curva do IDF que se desenha com
  `stroke-dashoffset`.

**Risco declarado, a ser atacado na crítica:** quatro paletas de projeto
competindo podem virar colcha de retalhos; e Quantum ML, Hut 8 e NIP não têm
asset nenhum, o que cria uma página de duas castas.

---

**FASE:** 2 (segunda rodada) — Precedentes, eixo de vitalidade
**ARTEFATO:** este board + `docs/design/assets-reais/*.png`
**REFERÊNCIAS MEDIDAS:** aelixa.webflow.io, distill.pub, visualcinnamon.com,
jalammar.github.io, paco.me, emilkowal.ski, e os três sites de projeto do
próprio cliente
**AGENTES:** Antigravity (varredura de referências, digest verificado por mim —
uma afirmação sobre SVG inline em distill.pub foi refutada por medição);
Codex (crítica adversarial, pendente)
**DECISÕES:** hipótese de cor descartada por medição; duas rotas de vitalidade
identificadas e medidas; H1–H6 diagnosticadas no quadrante sem mídia e sem
movimento; 3 assets reais incorporados ao inventário
**QUESTÕES ABERTAS:** contenção das quatro paletas; tratamento de Hut 8 e NIP
como vivência sem foto; o que fazer com os 8 assets que continuam faltando
