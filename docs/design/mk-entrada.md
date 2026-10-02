# Entrada da colagem Mokker (#92, worker C)

Arquivos: `assets/css/mk-entrada.css`, `assets/js/mk-entrada.js`. Sem dependências.

## Curvas e tempos

- **Notebook**: `translate 0 32px → 0 0`, `rotate 3deg → 0`, 700ms,
  `cubic-bezier(.16,1,.3,1)` (desaceleração, sem sobrepasso).
- **Celular**: começa 110ms depois, de `-6px 44px` / `2deg`, 650ms,
  `cubic-bezier(.34,1.56,.64,1)` (sobrepasso ~5px, medido, dentro de ≤6px).
- Nunca `opacity`; nunca `.mk__stage`/`.mk__screen` (escala/ângulo do #90).

## Camadas

1. `@supports (animation-timeline: view())`: `animation-range: entry 10%/13%
   entry 70%/73%` por `.mk`, sem JS para disparar.
2. Fallback (`@supports not`): `mk-entrada.js` usa `IntersectionObserver`
   (threshold 0.25), soma `.is-in` uma vez e desconecta; CSS só transiciona.
3. `prefers-reduced-motion: reduce`: última regra do arquivo, mesma
   especificidade das duas camadas acima — zera `translate`/`rotate`,
   `animation` e `transition` sem `!important` nem opacidade universal.
4. Parallax de ponteiro: só `(hover:hover) and (pointer:fine)`, liga depois
   que a entrada assenta (`animationend`/`transitionend`), `rAF`+lerp,
   ±6px celular / ±3px notebook, para fora da tela e em `reduced-motion`.

## Como testar

`docs/design/mk-entrada-teste.html` (descartável) simula a colagem com
`<div>` nas proporções 831×796/303×616. `?forcar=1` substitui o `view()` por
transições equivalentes, para comparar as duas camadas. Teste em
`http.server` local + Chrome headless via CDP (modelo:
`C:/Users/augus/specs/ferramentas/estouro.mjs`).

## Resultados medidos (itens 1–8 do aceite)

1. Posição final = repouso, com e sem `view()` (diff 0px). ✅
2. `opacity === '1'` nas 8 amostras (0–900ms). ✅
3. `offsetWidth/Height`/`scrollWidth` constantes; `layout-shift` total 0. ✅
4. Celular inicia ~100–110ms depois do notebook (janela 80–140ms). ✅
5. Reduced motion: estado final no 1º quadro, 0 animações ativas. ✅
6. Scroll para fora e volta não reanima (fallback e `view()`, via
   congelamento no `animationend`). ✅
7. Parallax do celular chega a 5,26px (≤6px); 0 `rAF` fora da tela. ✅
8. `gzip` CSS+JS = 1999 bytes (≤ 2048). ✅
