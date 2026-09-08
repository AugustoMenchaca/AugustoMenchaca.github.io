# Como este repositório funciona

## O objetivo

Construir uma **landing page nova** para substituir a que está em produção.

O arquivo em construção é **`wireframes/lp-final.html`**. Ele é o produto.

O `index.html` da raiz é o portfólio de outubro de 2024. **Ele não é usado, não
é mantido e não deve ser corrigido** — vai ser apagado quando a LP nova for
promovida para a raiz (issue #4). Trabalho gasto nele é trabalho descartado, e
já aconteceu uma vez: a issue #26 consertou markup de um arquivo que vai
desaparecer.

Por isso o CI valida **só a LP nova**. Quando a issue #4 promover ela para a
raiz, o alvo volta a ser `index.html` e o CI passa a guardar produção de fato.

## Branches

`AugustoMenchaca.github.io` é servido pelo GitHub Pages. **A `main` é produção**:
o que entra nela vai ao ar no domínio. **A `develop` é onde a LP nova é
construída e testada.**

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

**A issue #4 é o objetivo do projeto, não uma etapa de infraestrutura.** Ela
promove `wireframes/lp-final.html` para a raiz, apagando o portfólio de 2024.
Enquanto ela não acontecer, todo o trabalho está invisível: quem abrir o domínio
vê o site velho.

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
| `REFERENCE-BOARD-v2.md` | precedentes de vitalidade — **coluna de área cromática derrubada pela #17** |
| `REFERENCE-BOARD-v3.md` | **o board vigente.** 15 peças rotuladas pelo cliente, instrumento corrigido e escrito por inteiro. **Ressalva:** o pré-scroll da §8.1 é insuficiente para página com revelação por scroll — ver `provenance.md` P-012 |
| `PESQUISA-PALETA.md` | **entregável da #35.** Cor é restrição, não diferencial: as sete regras normativas R1–R7, com o contraste de cada par medido |
| `medicao-contraste/` | a sonda de contraste, os dados brutos e o gerador da tabela |
| `medicao-banda-escura/` | o instrumento de banda escura, 16 capturas e o resultado verificado |
| `provenance.md` | as decisões estruturais em QOC — questão, opções, critérios, decisão, evidência |
| `BREADBOARDS-v1.md` · `BREADBOARDS-v2.md` | as seis hipóteses reprovadas |
| `CRITICA-v1.md` | crítica independente de Codex e Antigravity |
| `00-ORDEM.md` | **leia antes dos outros.** O que aqui é medição confiável e o que foi derrubado |
| `assets-reais/` | os screenshots e figuras reais capturados |
| `referencias-v3/` | as 15 capturas de página inteira medidas pela #17 |
