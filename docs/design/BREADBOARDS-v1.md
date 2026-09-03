# BREADBOARDS-v1 — Fase 3B

**Fluxo:** redesign-secoes-lp-pessoal · **trilha reduzida** (decidida pelo
usuário em 2026-09-01) · Fase 3B
**Artefato visual:** https://www.figma.com/design/0NZizUgSb9ZH7ZIDWexxSJ
**Seção:** `FASE 3B · HIPOTESES DE UX` (node `3:2`)

| hipótese | node | link direto |
|---|---|---|
| H1 · MANCHETE | `3:3` | `?node-id=3-3` |
| H2 · COLUNA FIXA | `3:4` | `?node-id=3-4` |
| H3 · REGISTRO | `3:5` | `?node-id=3-5` |

Arquivo criado nos **rascunhos do Augusto**, não na equipe do Samuel — restrição
declarada por ele nesta sessão. Assento na própria equipe é `View`, mas escrita
em rascunho próprio funciona.

---

## Condições iguais nas três

Mesmo conteúdo real, mesmos seis itens, mesmos números, mesma largura de frame
(1440px), mesma fidelidade, mesmas três famílias tipográficas do projeto
(Instrument Sans / Inter / IBM Plex Mono) e a mesma paleta de tokens. Nenhuma
hipótese recebeu mais capricho que as outras.

Os seis itens, idênticos nas três: IDF-BR · Hut 8 · DVO/Prefeitura de Pelotas ·
Ciere da Rosa · Predição de vazão com IA (NIP) · Quantum Machine Learning.

## Medições

| | altura | caracteres úteis | densidade (chars/1000px) | faixas de mídia |
|---|---|---|---|---|
| H1 · Manchete | 1497px | 1565 | 1045 | **1** |
| H2 · Coluna fixa | 2200px | 2056 | 935 | **2** |
| H3 · Registro | **961px** | 1318 | **1371** | **0** |
| *LP atual (referência)* | *8455px* | *7596* | *898* | *9 molduras vazias* |

Nota metodológica: "caracteres úteis" exclui o texto do bloco de anotação, que
existe só no protótipo. A altura de H2 é 2200px porque a coluna de identidade é
`FILL` de propósito — ela representa uma coluna fixa de altura de viewport, não
conteúdo. O conteúdo real de H2 termina antes disso.

## As três hipóteses

### H1 · MANCHETE — dominância tipográfica

Um item inequivocamente principal. `IDF-BR` em 92px contra a massa em 21px
(razão **4,4×**, mais agressiva que os 2,7× da Folha). Largura total para o
herói, três colunas de 408px para os outros cinco. **Uma única** faixa de mídia,
no herói. Sem estado de hover desenhado — afordância por hierarquia de tipo.

**Vence quando:** o recrutador precisa saber em 6 segundos qual é o trabalho
mais forte, e existe um trabalho claramente mais forte.
**Referências:** Folha de S.Paulo (8 níveis de título, 1 item em 65px/1290px
contra massa em 24px/300px, 5 regras de hover e nenhuma no conteúdo) · The Crit,
padrão *Magazine*.
**Risco declarado pela fonte:** "amplifica o que estiver em destaque" — exige
herói forte.

### H2 · COLUNA FIXA — permanência

Duas colunas. Esquerda de 500px com nome, cargo, posicionamento, navegação com
filete ativo mais longo, e contato: **permanente**. Direita com prosa e depois
linhas compactas no padrão `período | título ↗ | corpo | tags`, **sem nenhuma
caixa**. Mídia escalonada: **2 de 6** itens têm faixa. A linha da Ciere está
renderizada em **estado de hover** — superfície branca, título em oxblood, seta
deslocada — para mostrar o mecanismo.

**Vence quando:** o leitor rola bastante e não pode perder o contexto de quem é
a pessoa; e quando a evidência é textual e volumosa.
**Referências:** Brittany Chiang (header `sticky` de 900px, 4 seções com padding
`0/0`, EXPERIENCE com 41 itens e **zero** imagens, PROJECTS com 4 com imagem e 7
só texto, 28 regras `group-hover` — filete cresce para `4rem`, seta translada
`+0.25rem`, transição `0.15s`).

### H3 · REGISTRO — agrupamento e densidade

Sem herói e sem coluna fixa. Os seis itens com o mesmo peso, agrupados por
natureza (TRABALHO · PROJETO DE CLIENTE · PESQUISA), em linhas de
`índice | período | título e resultado | stack`. **Zero imagens.** Escala de
tipo do arXiv: título de entrada em 18px, corpo em 13px, rótulos em 10px mono.

**Vence quando:** nenhum asset vai existir a tempo, o leitor é técnico, e o
objetivo é varrer fatos.
**Referências:** arXiv cs.LG (50 entradas em 5385px, cabeçalho de entrada com
15px de altura, densidade 2568, 8 tamanhos de fonte com workhorse em 13px e
título de entrada em 18px, 4 imagens e todas logos).

## Divergência

| eixo | H1 | H2 | H3 |
|---|---|---|---|
| profundidade | tudo na página, um item domina | resumo permanente + lista compacta | tudo na página, peso uniforme |
| hierarquia | escala tipográfica (4,4×) | permanência e volume | agrupamento |
| mídia | só o herói (1) | escalonada (2 de 6) | nenhuma (0) |
| hover | nenhum desenhado | indicador coordenado | mínimo |
| geometria | coluna cheia | duas colunas assimétricas | tabela cheia |

Adotar H2 exclui H1: a coluna fixa de 500px impede a manchete de largura total.
Adotar H3 exclui as duas: recusa herói e recusa permanência.

## O que muda em relação ao pedido original

O pedido foi "cards menores". **Nenhuma das três tem card.** Em H1 e H3 o card
desaparece como caixa; em H2 as linhas não têm contorno. A pesquisa levou a
tratar o card como problema de existência, não de escala — e as três reduzem a
altura entre **5,6× e 8,8×** em relação aos 8455px atuais, com o mesmo conteúdo.

---

**FASE:** 3B — Protótipos
**ARTEFATO:** seção `FASE 3B · HIPOTESES DE UX` em
`figma.com/design/0NZizUgSb9ZH7ZIDWexxSJ` + este registro
**REFERÊNCIAS CONSULTADAS:** as do `REFERENCE-BOARD-v1`, sem novas
**TAREFAS CODEX EXECUTADAS:** nenhuma
**DECISÕES:** três hipóteses construídas com conteúdo real idêntico; card
abandonado como caixa nas três; medição de densidade aplicada a cada uma
**QUESTÕES ABERTAS:** qual direção vai para alta fidelidade (4D) e Gate C
