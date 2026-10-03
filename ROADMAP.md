# Roadmap — etapas, paralelismo e caminho crítico

> **O objetivo é uma LP nova para substituir a que está em produção.**
> O arquivo em construção é `wireframes/lp-final.html`; a `develop` é a branch
> padrão e onde ele é construído. O `index.html` da raiz é o portfólio de 2024,
> não é usado, não é mantido e **não deve ser corrigido** — a issue #4 apaga ele.

> **A ordem é lei:** `PESQUISA → EVIDÊNCIA → SÍNTESE → HIPÓTESE → PROTÓTIPO →
> CRÍTICA → APROVAÇÃO`. Nada de UX ou UI é proposto antes da pesquisa fechar.
> O que já foi produzido fora dessa ordem está marcado como provisório em
> [`docs/design/00-ORDEM.md`](docs/design/00-ORDEM.md) — leia esse arquivo antes
> dos outros de `docs/design/`.

As etapas **não são atribuídas na mão**. O workflow `painel` calcula do grafo de
dependências nativo do GitHub, a cada evento de issue:

> **etapa de uma issue = maior etapa dos bloqueadores + 1**
> Etapa 0 não depende de nada. **Tudo dentro de uma etapa é paralelizável por
> definição.**

O estado ao vivo está na issue **#29**, fixada no topo do repositório. Este
arquivo explica o *porquê* de cada dependência; o painel diz *onde estamos*.

**Profundidade: 8 etapas.** O painel na #29 tem a largura atual de cada uma.

---

## Etapa 0 — comece aqui · 3 em paralelo

| destrava | # | tarefa |
|---|---|---|
| **22** | **#17** | **pesquisa: referências medidas e escolhidas pelo cliente** |
| 4 | #16 | contato e footer |
| — | #19 | verificar ou remover as 3 métricas |

**A #17 destrava 22 das 25 issues abertas.** Ela é a raiz: nenhuma decisão de
cor, tipo, movimento ou arquitetura acontece antes dela.

Infraestrutura concluída: **#1** proteção da `main`, **#2** CI de lint, **#3**
orçamento Lighthouse, **#28** favicon. E **#26**, que não deveria ter existido.

## Etapa 1 — evidência · 3 em paralelo

| destrava | # | tarefa | espera |
|---|---|---|---|
| **19** | #35 | paleta de cores, derivada de evidência | #17 |
| **19** | #36 | tipografia, derivada de evidência | #17 |
| **19** | #37 | movimento, derivado de evidência | #17 |

As três medem a mesma amostra por eixos diferentes, então rodam juntas. Cada uma
entrega um `PESQUISA-*.md` com a linha de evidência de cada decisão.

## Etapa 2 — síntese · 1

| destrava | # | tarefa | espera |
|---|---|---|---|
| **18** | #5 | escrever o `DESIGN.md` | #17 · #35 · #36 · #37 |

O gargalo estrutural do projeto. É aqui que paleta, tipografia e movimento viram
norma, no formato do `design.md` do Google Labs.

## Etapa 3 — hipótese · 2 em paralelo

| destrava | # | tarefa | espera |
|---|---|---|---|
| **16** | #7 | arquitetura de seções: cortar 11 para 8 | #5 |
| **7** | #21 | sistema de movimento e constante de duração | #5 · #37 |

**A #7 estava na Etapa 0 e foi movida para cá.** Arquitetura é decisão de UX, e
decisão de UX não vem antes da pesquisa. O cliente corrigiu isso.

## Etapa 4 — sistema e vivências

| destrava | # | tarefa | espera |
|---|---|---|---|
| **9** | #6 | isolamento cromático por subgrid | #5 · #7 |
| 9 | #20 | remover as 9 molduras vazias | #7 |
| 5 | #18 | os 4 assets que só o Augusto pode dar | #7 |
| 4 | #14 | Vivências — Hut 8 e NIP | #7 |
| 4 | #8 | Hero | #21 |
| 4 | #9 | trilho editorial | #7 · #21 |

## Etapa 5 — seções de produto

| # | tarefa | espera |
|---|---|---|
| #10 | IDF-BR | #7 · #6 · #20 |
| #11 | DVO | #7 · #6 · #20 |
| #12 | Ciere da Rosa | #7 · #6 · #20 |
| #13 | Quantum ML | #7 · #6 · #20 |
| #15 | Sobre | #7 · #18 |

## Etapa 6 — fechamento

| # | tarefa | espera |
|---|---|---|
| #23 | i18n PT/EN | todas as seções |
| #24 | responsivo de 320 a 3440px | todas as seções |
| #25 | auditoria de precisão de conteúdo | todas as seções |
| #22 | curva do IDF que se desenha | #21 · #10 |

## Etapa 7 — publicação

| # | tarefa | espera |
|---|---|---|
| #4 | **promover a LP nova para a raiz**, apagando o portfólio de 2024 | #23 · #24 · #25 |

---

## O grafo

```mermaid
graph LR
  subgraph E0["Etapa 0 — PESQUISA"]
    I17["#17 referências<br/>medidas pelo cliente<br/>destrava 22"]
    I16["#16 contato"]
    I19["#19 métricas"]
  end

  subgraph E1["Etapa 1 — EVIDÊNCIA"]
    I35["#35 paleta"]
    I36["#36 tipografia"]
    I37["#37 movimento"]
  end

  subgraph E2["Etapa 2 — SÍNTESE"]
    I5["#5 DESIGN.md<br/>destrava 18"]
  end

  subgraph E3["Etapa 3 — HIPÓTESE"]
    I7["#7 arquitetura<br/>destrava 16"]
    I21["#21 mov. sistema"]
  end

  subgraph E4["Etapa 4 — sistema"]
    I6["#6 cor"]
    I20["#20 molduras"]
    I18["#18 assets"]
    I14["#14 Vivências"]
    I8["#8 Hero"]
    I9["#9 trilho"]
  end

  subgraph E5["Etapa 5 — produtos"]
    I10["#10 IDF-BR"]
    I11["#11 DVO"]
    I12["#12 Ciere"]
    I13["#13 Quantum"]
    I15["#15 Sobre"]
  end

  subgraph E6["Etapa 6 — fechamento"]
    I23["#23 i18n"]
    I24["#24 responsivo"]
    I25["#25 precisão"]
    I22["#22 curva IDF"]
  end

  I4["#4 publicar"]

  I17 --> I35 & I36 & I37
  I35 & I36 & I37 --> I5
  I5 --> I7 & I21
  I37 --> I21
  I7 --> I6 & I20 & I18 & I14 & I9
  I5 --> I6
  I21 --> I8 & I9 & I22
  I6 --> I10 & I11 & I12 & I13
  I20 --> I10 & I11 & I12 & I13
  I7 --> I10 & I11 & I12 & I13 & I15
  I18 --> I15
  I10 --> I22
  I8 & I9 & I10 & I11 & I12 & I13 & I14 & I15 & I16 --> I23 & I24 & I25
  I23 & I24 & I25 --> I4
```

## Caminho crítico

```
#17 pesquisa → #35/#36/#37 evidência → #5 DESIGN.md → #7 arquitetura
     → #6 cor → #10 IDF-BR → #23/#24/#25 fechamento → #4 publicação
```

Oito níveis. Era seis antes de a ordem ser corrigida — a correção custou
dois níveis de profundidade, e vale, porque antes a arquitetura vinha antes
da pesquisa. Nenhuma outra cadeia é mais longa, então **é este caminho que
define o prazo**. Atrasar qualquer elo dele atrasa o projeto inteiro; atrasar
uma issue fora dele não atrasa nada, desde que ela feche antes da etapa 4.

## Por que cada dependência existe

| dependência | motivo |
|---|---|
| #35, #36, #37 ← #17 | paleta, tipografia e movimento saem da medição das referências que **o cliente** escolher. Das seis que embasaram o diagnóstico, só uma veio dele. |
| #5 ← #35, #36, #37 | o `DESIGN.md` registra o que a pesquisa concluiu. Escrever antes seria norma sem base. |
| #7 ← #5 | **arquitetura é decisão de UX.** Não se decide quantas seções a página tem antes de existir paleta, tipografia e movimento definidos. Esta era a violação principal. |
| #21 ← #37 | a constante de duração sai da medição, não de gosto. |
| #5 ← #17 | os tokens do `DESIGN.md` saem da pesquisa. Escrever antes seria registrar palpite como norma — e a pesquisa atual tem furo declarado: das seis referências medidas, só uma veio do cliente. |
| #6, #21 ← #5 | cor e movimento consomem tokens. Sem tokens, viram valor solto no CSS. |
| #20, #18, #14, #9, #6, #15 ← #7 | não se decide cor, moldura ou conteúdo de uma seção antes de saber quais seções existem. |
| #10–#13 ← #6 | os três produtos publicados carregam paleta real de projeto. A regra de contenção vem antes. |
| #10–#13 ← #20 | cada uma tem moldura vazia hoje. A regra de remoção vem antes de reconstruir. |
| #15 ← #18 | Sobre depende do retrato, e o retrato depende do Augusto. |
| #22 ← #21, #10 | a curva que se desenha precisa do sistema de movimento e da seção onde mora. |
| #23, #24, #25 ← todas as seções | i18n, responsivo e precisão só fazem sentido sobre a página inteira. |
| #4 ← #23, #24, #25 | publicar é o último passo. Nada vai a produção sem as três verificações. |

## Uma lição registrada

A **#26** consertava HTML quebrado no `index.html` em produção. Eu a criei e
priorizei achando que defeito no ar sempre vale corrigir.

**Estava errado, e o cliente corrigiu:** aquela página não é usada e vai ser
apagada pela #4. O conserto foi trabalho descartável, e pior — o CI estava
validando o arquivo errado, guardando o que não interessa em vez do produto.

O que ficou: o alvo do CI é **`wireframes/lp-final.html`**, e só ele. Antes de
criar issue sobre um arquivo, a pergunta é se ele sobrevive à #4.

## Estado da infraestrutura

- `main` — produção. GitHub Pages publica dela em modo `legacy`, direto da raiz.
- `develop` — **branch padrão do repositório** e onde a LP nova é construída.
  Precisa ter os workflows: evento de `issues` só dispara a partir da padrão.
- CI de lint no ar, com alvo em `wireframes/lp-final.html`: html-validate,
  stylelint, content-rules, paridade PT/EN. Os dois primeiros são **catracas**:
  reprovam só se o PR aumentar a contagem, e viram portão absoluto ao chegar a
  zero.
- CI de Lighthouse validado e verde.
- Painel automático calculando as etapas a cada evento de issue.
