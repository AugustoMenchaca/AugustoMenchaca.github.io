# Como este repositório funciona

`AugustoMenchaca.github.io` é servido pelo GitHub Pages. **A `main` é produção**:
o que entra nela vai ao ar no domínio.

## Branches

| branch | papel | quem escreve nela |
|---|---|---|
| `main` | **produção** — servida pelo GitHub Pages | ninguém direto; só merge de PR com CI verde |
| `develop` | integração do trabalho em andamento | merge de PR de branch de tarefa |
| `feat/…` `fix/…` `chore/…` | uma issue cada | você |

Fluxo: `feat/algo` → PR para `develop` → PR de `develop` para `main` → deploy.

Nomear a branch pela issue: `feat/14-vivencias`, `fix/20-molduras-vazias`.

`nova-lp` está no mesmo commit que `main` e não tem nada exclusivo — decidir se
remove.

## Proteção da main

A configurar em Settings → Branches:

- Exigir pull request antes de merge.
- Exigir que os checks `lint`, `lighthouse` e `content-rules` passem.
- Proibir push direto e force-push.
- Manter histórico linear.

## O que o CI verifica

Três workflows, todos rodando em PR para `develop` e `main`.

### 1. `lint` — o código está válido

| check | ferramenta | reprova quando |
|---|---|---|
| HTML válido | `html-validate` | markup inválido, atributo duplicado, `id` repetido |
| CSS | `stylelint` | propriedade desconhecida, valor inválido, duplicidade |
| Link morto | `grep` | existe `href="#"` |

O `id` duplicado está na lista por experiência: um `id="rail-pause-btn"`
repetido deixou o botão em inglês morto e sobrescreveu o rótulo em português.

### 2. `lighthouse` — a qualidade não regride

Lighthouse CI em modo navegação, perfil mobile. **Orçamento:**

| categoria | mínimo |
|---|---|
| Acessibilidade | **100** |
| Best Practices | **100** |
| SEO | **100** |

Estes três estão em 100 hoje. Queda reprova o PR.

Orçamento adicional: altura do documento e peso total da página, para a
regressão de tamanho ser detectada por máquina e não por olho.

### 3. `content-rules` — nada inventado entra

Esta é específica deste projeto e é a mais importante. O material tem limites de
papel que já foram violados antes, e um portfólio que infla autoria é um risco
real.

Reprova o PR quando encontra:

- Marcador de métrica não verificada: `MÉTRICA A VERIFICAR`,
  `VERIFIED METRIC REQUIRED`.
- Moldura de asset vazia: qualquer `[ TEXTO EM CAIXA ALTA ]` no lugar de
  conteúdo real. Ausência declarada ainda parece ausência.
- `href="#"`.

**O que o CI não consegue verificar, e por isso vai no checklist do PR:**
que nenhuma frase atribua a ele desenvolvimento do DVO, liderança de design da
Ciere, publicação do Quantum ML, ou IA de previsão de enchentes em produção no
NIP.

## Deploy

Push em `main` dispara o deploy para o GitHub Pages.

Ponto a resolver antes do primeiro deploy: hoje a LP nova vive em
`wireframes/lp-final.html` e o `index.html` da raiz é o portfólio de outubro de
2024, que é **o que está no ar**. O workflow precisa decidir o que vai para a
raiz publicada.

## Definição de pronto

Uma issue fecha quando:

1. Os três checks de CI estão verdes.
2. O visual foi conferido em 390, 1440 e 2560px **em navegador**, não só medido.
3. Nenhuma afirmação nova sem origem rastreável.
4. Texto novo existe nas duas línguas, PT e EN.
5. Movimento novo respeita `prefers-reduced-motion`.

## Sistema de design

O sistema visual vive em `DESIGN.md` na raiz, no formato
[google-labs-code/design.md](https://github.com/google-labs-code/design.md).
Especificação baixada em `docs/design.md-spec/`.

**Mudança de token, cor, tipografia ou movimento se faz no `DESIGN.md` antes do
CSS.** O CSS implementa o que está lá, não o contrário.

Pesquisa e decisões de design ficam em `docs/design/`:

| arquivo | o que é |
|---|---|
| `PROJECT-CONTEXT-v1.md` | o que a página é hoje, medido |
| `PROBLEMA-v1.md` | o problema e as métricas de sucesso |
| `REFERENCE-BOARD-v1.md` | precedentes de densidade e hierarquia |
| `REFERENCE-BOARD-v2.md` | precedentes de vitalidade — derruba a hipótese de cor |
| `BREADBOARDS-v1.md` · `BREADBOARDS-v2.md` | as seis hipóteses reprovadas |
| `CRITICA-v1.md` | crítica independente de Codex e Antigravity |
| `assets-reais/` | os screenshots e figuras reais capturados |
