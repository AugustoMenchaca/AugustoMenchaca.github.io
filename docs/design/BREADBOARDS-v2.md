# BREADBOARDS-v2 — Fase 3B, segunda rodada

**Motivo da v2:** o usuário reprovou H1, H2 e H3 e apontou o eixo que faltava —
**seleção de projeto** e **card que expande**. As três primeiras eram três
sabores de "tudo aberto na página"; nenhuma testava revelação progressiva.

**Artefato:** https://www.figma.com/design/0NZizUgSb9ZH7ZIDWexxSJ
**Seção:** `FASE 3B v2 · REVELACAO PROGRESSIVA` (node `32:2`)

| hipótese | node |
|---|---|
| H4 · ACORDEAO | `?node-id=32-3` |
| H5 · SELETOR | `?node-id=32-4` |
| H6 · GRADE QUE EXPANDE | `?node-id=32-5` |

---

## Referência que não pôde ser usada

O link do Behance (`gallery/250323099/Portfon-Personal-Portfolio-Website-UIUX`)
**não rendeu evidência utilizável**: devolveu `HTTP 400` ao navegador headless
(bloqueio de bot) e, via fetch de texto, retornou descrição comercial do
template — "sleek, modern, and highly polished" — sem estrutura de projetos,
medida ou padrão extraível. Pelo protocolo, não conta como referência concreta.

O que foi usado no lugar: as **palavras** do usuário ("seleção de projetos",
"cards que podem expandir", "não ser tão agressivo") viradas em pergunta de
interação, e precedentes normativos medidos.

## Precedentes medidos nesta rodada

Viewport 1440×900×1, Chrome headless.

### R8 · W3C ARIA APG — padrão Accordion
`https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/`

Contrato medido: `<button aria-expanded="true|false" aria-controls="…">`,
cabeçalho de **66px**, 3 painéis com **1 visível**, painel aberto de **455px**.
Custo total para 3 itens: 198px de cabeçalhos + 455px de painel.
**Custo cresce linearmente com o número de itens, mas todo rótulo fica sempre
legível.**

### R9 · W3C ARIA APG — padrão Tabs
`https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/`

Contrato medido: `<button role="tab" aria-selected="true|false"
aria-controls="…">`, aba de **39–44px**, 4 painéis com **1 visível**, painel de
**174px**. Custo total: uma faixa de 44px + painel, **constante** qualquer que
seja a contagem de itens. Preço: exige navegação por seta e `tabindex` móvel —
implementação acessível mais cara.

**Incompatibilidade:** rótulos empilhados sempre visíveis × uma única faixa de
rótulos. Adotar um exclui o outro.

### R10 · `<details>` nativo (medido na plataforma, restrição `[C]`)

Medido injetando o elemento no navegador: fechado **24px**, aberto 224px com
painel de 200px, **seis fechados = 144px** no tipo padrão. Focável **sem
`tabindex`**. `CSS.supports("interpolate-size", "allow-keywords")` retorna
**true** — a expansão pode ser animada em CSS puro.

**Por que decide:** a LP é arquivo único sem build, sem framework, e usa
progressive enhancement (o JS apenas *adiciona* a classe que esconde). `details`
entrega abrir/fechar, teclado e leitor de tela **sem JavaScript nenhum** e sem
risco para o Lighthouse 100 de acessibilidade. Acordeão e grade que expande
saem de graça; **seletor por abas não** — precisa de JS ou do truque de
`radio`/`:target`.

### R11 · Orientação sobre acordeão em telas grandes
`https://salsa.digital/insights/accordion-ui-design-examples-inspiration-tips-and-best-practices` ·
`https://www.eleken.co/blog-posts/accordion-ui`

Citado: em telas grandes, onde espaço não é restrição, vale considerar layout em
abas ou expansão inline em vez de acordeão. E a prática corrente em portfólio
2026 favorece "menos projetos em destaque, rótulos mais claros, estrutura
narrativa mais forte, caminho mais rápido para contato".

---

## As três hipóteses, medidas

| | fechado | com um aberto | JS necessário |
|---|---|---|---|
| **H4 · Acordeão** | **348px** (6 linhas com descrição de uma linha) | 693px | **não** (`details`) |
| **H5 · Seletor** | 487px (sempre um projeto completo à direita) | 487px | **sim** |
| **H6 · Grade que expande** | **180px** (6 cards em 2 fileiras) | 622px | **não** (`details`) |
| *LP atual* | *~5000px, tudo aberto* | — | não |

Redução: **14×** (H4), **10×** (H5), **28×** (H6).

### Tratamento de card, comum às três

Atende "não ser tão agressivo": **sem preenchimento, sem borda de caixa, sem
sombra**. Só filete de 1px a 13–16% de opacidade separando as linhas, número em
mono, título em Instrument Sans SemiBold, uma linha de descrição em Inter, e um
`+` como afordância. O item aberto é o **único** que ganha superfície branca e
acento oxblood — o destaque marca estado, não decoração.

### H4 · ACORDEÃO
Seis linhas, todos os títulos **e** uma linha de descrição sempre visíveis.
Uma abre no lugar, com corpo, tags, faixa de mídia e link.
**Vence quando:** o recrutador de 6–10 segundos precisa ver **amplitude** —
seis projetos reconhecíveis de uma vez — antes de escolher onde aprofundar.

### H5 · SELETOR
Índice de seis nomes à esquerda (300px) com o ativo marcado por filete oxblood,
painel completo à direita. Sempre exatamente um projeto exposto.
**Vence quando:** existe um projeto que deve ser lido primeiro e por inteiro, e
os outros cinco só precisam existir como opção.

### H6 · GRADE QUE EXPANDE
Seis cards pequenos em grade de 3×2, 408px cada, **180px no total**. O clicado
expande no lugar ocupando a fileira inteira; os outros cinco continuam fechados.
**Vence quando:** o menor tamanho possível é a prioridade e o leitor topa clicar
para saber mais.

## Custo declarado de cada uma

- **H4:** 348px é mais que o dobro de H6. Seis `+` empilhados podem ler como FAQ,
  não como portfólio.
- **H5:** exige JavaScript, e cinco dos seis projetos ficam reduzidos a um nome —
  amplitude fica invisível para quem não clica.
- **H6:** 180px é o menor, mas o card fechado carrega o mínimo de informação
  (título e cinco palavras). Se ninguém clicar, a página não provou nada — e o
  padrão *Minimal* já foi medido falhando para perfil júnior por exatamente
  isso (Rauno Freiberg: 339 caracteres no body inteiro).

---

**FASE:** 3B (v2) — Protótipos de revelação progressiva
**ARTEFATO:** seção `FASE 3B v2 · REVELACAO PROGRESSIVA` + este registro
**REFERÊNCIAS CONSULTADAS:** W3C APG Accordion, W3C APG Tabs, `<details>` nativo
medido na plataforma, orientação de acordeão em telas grandes. Behance
**descartado** por falta de evidência extraível.
**TAREFAS CODEX EXECUTADAS:** nenhuma
**DECISÕES:** card tratado como linha discreta sem caixa nas três; `details`
identificado como caminho sem JS e sem risco de acessibilidade
**QUESTÕES ABERTAS:** qual das três vai para alta fidelidade e Gate C
