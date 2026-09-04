# Roadmap — etapas, paralelismo e caminho crítico

As etapas **não são atribuídas na mão**. O workflow `painel` calcula do grafo de
dependências nativo do GitHub, a cada evento de issue:

> **etapa de uma issue = maior etapa dos bloqueadores + 1**
> Etapa 0 não depende de nada. **Tudo dentro de uma etapa é paralelizável por
> definição.**

O estado ao vivo está na issue **#29**, fixada no topo do repositório. Este
arquivo explica o *porquê* de cada dependência; o painel diz *onde estamos*.

**Profundidade: 6 etapas. Largura máxima: 7 issues em paralelo.**

---

## Etapa 0 — comece aqui · 7 em paralelo

| destrava | # | tarefa |
|---|---|---|
| **16** | **#7** | **arquitetura de seções: cortar 11 para 8** |
| **14** | **#17** | **pesquisa: fechar a lacuna da amostra de referências** |
| 4 | #16 | contato e footer |
| 1 | #28 | falta favicon, derruba best-practices para 96 |
| — | #1 | proteger `main` |
| — | #19 | verificar ou remover as 3 métricas |
| — | #26 | HTML quebrado no `index.html` em produção |

**#7 e #17 são as duas raízes, e juntas alimentam quase o projeto inteiro.**
Fazer as duas em paralelo é a única forma de encurtar o caminho crítico.

`destrava` conta dependentes **transitivos**. A diferença importa: contando só
dependente direto, a #17 aparentava alcance 1 — ela tem 1 direto (#5) e **14
transitivos**, porque `#17 → #5 → #6/#21 → todas as seções`.

As três últimas não destravam nada: são folhas, e existem para tirar vermelho do
CI e consertar o que está no ar.

## Etapa 1 — fundação · 5 em paralelo

| destrava | # | tarefa | espera |
|---|---|---|---|
| **13** | #5 | escrever o `DESIGN.md` | #17 |
| **9** | #20 | remover as 9 molduras vazias | #7 |
| 5 | #18 | os 4 assets que só o Augusto pode dar | #7 |
| 4 | #14 | **Vivências — Hut 8 e NIP** | #7 |
| — | #3 | orçamento Lighthouse | #28 |

**A #14 está aqui, não na etapa das seções.** Ela só depende da arquitetura, e
por isso pode ser construída muito antes das outras seis. Eu tinha marcado ela
como etapa 3 na mão; o grafo corrigiu.

## Etapa 2 — sistema · 3 em paralelo

| destrava | # | tarefa | espera |
|---|---|---|---|
| **9** | #6 | isolamento cromático por subgrid | #5 · #7 |
| **7** | #21 | sistema de movimento e constante de duração | #5 |
| 4 | #15 | Sobre | #7 · #18 |

## Etapa 3 — seções · 6 em paralelo

| destrava | # | tarefa | espera |
|---|---|---|---|
| 5 | #10 | IDF-BR | #7 · #6 · #20 |
| 4 | #8 | Hero | #21 |
| 4 | #9 | trilho editorial | #7 · #21 |
| 4 | #11 | DVO | #7 · #6 · #20 |
| 4 | #12 | Ciere da Rosa | #7 · #6 · #20 |
| 4 | #13 | Quantum ML | #7 · #6 · #20 |

Seis frentes independentes entre si. É a etapa mais larga depois da 0, e a que
mais se beneficia de trabalho paralelo.

## Etapa 4 — fechamento · 4 em paralelo

| # | tarefa | espera |
|---|---|---|
| #23 | i18n PT/EN | todas as seções |
| #24 | responsivo de 320 a 3440px | todas as seções |
| #25 | auditoria de precisão de conteúdo | todas as seções |
| #22 | curva do IDF que se desenha | #21 · #10 |

## Etapa 5 — publicação · 1

| # | tarefa | espera |
|---|---|---|
| #4 | CD: deploy para o GitHub Pages | #23 · #24 · #25 |

---

## O grafo

```mermaid
graph LR
  subgraph E0["Etapa 0 — comece aqui"]
    I7["#7 arquitetura<br/>destrava 16"]
    I17["#17 pesquisa<br/>destrava 14"]
    I16["#16 contato"]
    I28["#28 favicon"]
    I1["#1 proteger main"]
    I19["#19 métricas"]
    I26["#26 HTML quebrado"]
  end

  subgraph E1["Etapa 1 — fundação"]
    I5["#5 DESIGN.md<br/>destrava 13"]
    I20["#20 molduras<br/>destrava 9"]
    I18["#18 assets"]
    I14["#14 Vivências"]
    I3["#3 Lighthouse"]
  end

  subgraph E2["Etapa 2 — sistema"]
    I6["#6 cor<br/>destrava 9"]
    I21["#21 movimento<br/>destrava 7"]
    I15["#15 Sobre"]
  end

  subgraph E3["Etapa 3 — seções"]
    I10["#10 IDF-BR"]
    I8["#8 Hero"]
    I9["#9 trilho"]
    I11["#11 DVO"]
    I12["#12 Ciere"]
    I13["#13 Quantum"]
  end

  subgraph E4["Etapa 4 — fechamento"]
    I23["#23 i18n"]
    I24["#24 responsivo"]
    I25["#25 precisão"]
    I22["#22 curva IDF"]
  end

  I4["#4 deploy"]

  I17 --> I5
  I28 --> I3
  I7 --> I20 & I18 & I14
  I5 --> I6 & I21
  I7 --> I6
  I7 --> I15
  I18 --> I15
  I6 --> I10 & I11 & I12 & I13
  I20 --> I10 & I11 & I12 & I13
  I7 --> I9
  I21 --> I8 & I9 & I22
  I10 --> I22
  I8 & I9 & I10 & I11 & I12 & I13 & I14 & I15 & I16 --> I23 & I24 & I25
  I23 & I24 & I25 --> I4
```

## Caminho crítico

```
#17 pesquisa → #5 DESIGN.md → #6 isolamento cromático → #10 IDF-BR
     → #23 / #24 / #25 fechamento → #4 publicação
```

Seis níveis. Nenhuma outra cadeia é mais longa, então **é este caminho que
define o prazo**. Atrasar qualquer elo dele atrasa o projeto inteiro; atrasar
uma issue fora dele não atrasa nada, desde que ela feche antes da etapa 4.

## Por que cada dependência existe

| dependência | motivo |
|---|---|
| #5 ← #17 | os tokens do `DESIGN.md` saem da pesquisa. Escrever antes seria registrar palpite como norma — e a pesquisa atual tem furo declarado: das seis referências medidas, só uma veio do cliente. |
| #6, #21 ← #5 | cor e movimento consomem tokens. Sem tokens, viram valor solto no CSS. |
| #20, #18, #14, #9, #6, #15 ← #7 | não se decide cor, moldura ou conteúdo de uma seção antes de saber quais seções existem. |
| #10–#13 ← #6 | os três produtos publicados carregam paleta real de projeto. A regra de contenção vem antes. |
| #10–#13 ← #20 | cada uma tem moldura vazia hoje. A regra de remoção vem antes de reconstruir. |
| #15 ← #18 | Sobre depende do retrato, e o retrato depende do Augusto. |
| #22 ← #21, #10 | a curva que se desenha precisa do sistema de movimento e da seção onde mora. |
| #3 ← #28 | o gate do Lighthouse não fica verde enquanto o favicon der 404. |
| #23, #24, #25 ← todas as seções | i18n, responsivo e precisão só fazem sentido sobre a página inteira. |
| #4 ← #23, #24, #25 | publicar é o último passo. Nada vai a produção sem as três verificações. |

## Uma tensão registrada

A **#26** — HTML quebrado no site que está no ar — está na Etapa 0 e **sem
bloqueio de propósito**, embora a lógica dissesse que ela depende da #4.

Um `</spaN>` com maiúscula errada quebra a estrutura do documento **agora**, e o
caminho até a #4 tem seis níveis. Se a substituição demorar, o site fica
quebrado esse tempo todo. Decisão consciente: corrigir agora custa pouco e pode
virar trabalho perdido; não corrigir mantém o defeito no ar.

## Estado da infraestrutura

- `main` — produção. GitHub Pages publica dela em modo `legacy`, direto da raiz.
- `develop` — integração, com worktree próprio.
- CI de lint no ar: html-validate, stylelint, content-rules, paridade PT/EN.
- CI de Lighthouse validado, reprovando por motivo real (#28).
- Painel automático calculando as etapas a cada evento de issue.
