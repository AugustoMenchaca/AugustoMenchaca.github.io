# A ordem, e o que nela está fora de ordem

Leia este arquivo antes de qualquer outro em `docs/design/`. Ele diz o que aqui
é **medição confiável** e o que é **proposta feita fora de ordem** — e portanto
provisória.

## A ordem canônica

```
PESQUISA → EVIDÊNCIA → SÍNTESE → HIPÓTESE → PROTÓTIPO → CRÍTICA → APROVAÇÃO
```

Traduzida para as issues deste projeto:

| # | etapa | issue |
|---|---|---|
| 0 | **pesquisa** — referências ao vivo, escolhidas pelo cliente, medidas | #17 |
| 1 | **evidência** — paleta, tipografia e movimento derivados da medição | #35 · #36 · #37 |
| 2 | **síntese** — o sistema vira norma no `DESIGN.md` | #5 |
| 3 | **hipótese** — arquitetura de seções e sistema de movimento | #7 · #21 |
| 4+ | protótipo, seções, fechamento | #6, #8–#15, #20–#25 |
| último | aprovação e publicação | #4 |

**Nada de UX ou UI é proposto antes da etapa 0 estar fechada.** Foi exatamente
isso que eu violei, e está registrado abaixo.

## O defeito de origem

Das seis referências que embasaram todo o diagnóstico deste projeto, **apenas
uma veio do cliente**:

| referência | quem escolheu |
|---|---|
| Aelixa (`aelixa.webflow.io`) | **o cliente** |
| brittanychiang.com | eu |
| sarasoueidan.com | eu |
| rauno.me | eu |
| folha.uol.com.br | eu |
| arxiv.org/list/cs.LG | eu |
| distill.pub · visualcinnamon.com · jalammar.github.io | eu, via agente de pesquisa |

O Codex apontou, e eu aceito: **a correlação que eu medi pode ser artefato da
minha própria seleção.** As medições são reais; a amostra não é representativa
do gosto de quem decide.

Consequência: seis hipóteses de UX foram construídas e todas as seis foram
reprovadas pelo cliente. Não por acaso.

## O que aqui é confiável

Medição não deixa de valer por ter vindo na ordem errada — o número é o número.

| arquivo | o que vale |
|---|---|
| `PROJECT-CONTEXT-v1.md` | **confiável.** Lido do repositório, com linha de origem para cada valor: tokens, seções, dimensões, padrões de interação |
| `REFERENCE-BOARD-v1.md` | **as medições valem**, a seleção não. Densidade, altura, contagem de seções, paddings computados |
| `REFERENCE-BOARD-v2.md` | **as medições valem**, a seleção não. Área cromática, contagem de mídia, keyframes e transições por 1000px |
| `CRITICA-v1.md` | **confiável.** Crítica independente de Codex e Antigravity, com uma afirmação do Antigravity refutada por medição minha |
| `assets-reais/` | **confiável.** Capturas reais dos três produtos no ar, mais 28 figuras extraídas dos notebooks do experimento |

Números que sobrevivem e devem ser reaproveitados pelas issues de pesquisa:

- Aelixa: 17502px, **0,4% de área cromática**, 81 `<img>`, 91 `<svg>`, 1 vídeo, 1 keyframe, **zero animação ativa**
- paco.me: 1424px, **zero mídia**, 20 keyframes, 13 elementos em transição, **todos a 0,24s**
- lp-final.html: 8455px, **1,2 elemento em transição por 1000px** contra 9,1 do paco.me
- Os três produtos do cliente: **18,4%, 22,8% e 20,1%** de área cromática
- Folha: 8 tamanhos de título, razão manchete/massa **2,7×**
- arXiv: 50 entradas em 5385px, densidade **2568 caracteres por 1000px**

## O que aqui é provisório

| arquivo | por que |
|---|---|
| `BREADBOARDS-v1.md` | H1, H2 e H3 — três hipóteses de UX construídas **antes** da amostra estar corrigida. Todas reprovadas |
| `BREADBOARDS-v2.md` | H4, H5 e H6 — feitas depois do feedback, mas ainda sobre a mesma amostra enviesada. Todas reprovadas |
| `PROBLEMA-v1.md` | o problema e o job to be done seguem válidos. **As métricas de sucesso, não**: a métrica 6 pedia "≥3 níveis de padding vertical" e a medição derrubou — Soueidan usa `120/120` uniforme e funciona; a variável real era contagem de blocos, não uniformidade |
| `CRITIQUE-BRIEF.md` · `CRITIQUE-PROMPT.md` | insumo para os agentes, não conclusão |

**As seis hipóteses ficam no repositório de propósito.** Servem como registro do
que já foi tentado e reprovado, para não ser proposto de novo. O que elas **não**
são é base para a próxima proposta.

## O erro que a ordem errada produziu, em concreto

Eu coloquei a **#7 — arquitetura de seções** na Etapa 0, sem bloqueio nenhum.
Arquitetura é decisão de UX. Do jeito que estava, dava para decidir quantas
seções a página tem antes de existir uma referência medida.

O cliente corrigiu: *"paleta de cores, tipografia e tudo mais precisamos definir
isso antes de definir arquitetura de seções"*.

**Corrigido.** A #7 agora depende do `DESIGN.md`, que depende das três issues de
pesquisa, que dependem da #17. O custo dessa correção é honesto e visível: o
projeto passou de **6 para 8 etapas** de profundidade, e a #17 passou a
destravar **22 das 25 issues abertas**.

Mais fundo, e certo. Antes era mais raso e começava pelo fim.

## Uma segunda lição, do mesmo tipo

A issue **#26** consertava HTML quebrado no `index.html` em produção. Eu a criei
e priorizei achando que defeito no ar sempre vale corrigir. O cliente corrigiu:
aquela página não é usada e vai ser apagada pela #4.

Pior que o trabalho descartado — **o CI estava validando o arquivo errado**,
guardando o que não interessa em vez do produto.

O padrão comum às duas lições: eu agi antes de confirmar o que estava sendo
otimizado. Uma vez foi ordem de etapa, outra foi alvo. As duas vezes a régua e o
cliente concordaram entre si, e contra mim.
