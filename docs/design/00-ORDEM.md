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

**Endereçado pela #17 — não "corrigido".** A distinção importa, e ela veio da
crítica independente: trocar o curador da amostra melhora a validade para
*descrever o gosto do cliente*, mas **muda o dono do viés, não a estrutura
dele**. A amostra segue com `n=5`, escolhida pelo desfecho (só peças que ele
ama, nenhuma que ele rejeitou) e fora do domínio do job to be done. Um grupo de
controle de 10 sites sorteados (`REFERENCE-BOARD-v3.md` §10) fechou parte da
lacuna, e a amostra pareada com casos rejeitados ainda faltava — ver abaixo.

**Fechado depois.** O cliente rotulou os dez sites do grupo de controle e
rejeitou os dez, o que deu a amostra com os dois lados que faltava. Resultado na
§12 do board: de dez variáveis medidas, **só duas separam os quinze julgamentos
sem erro — maior título e razão display/corpo**. Cor não separa em nenhuma das
seis métricas. A `lp-final.html` classifica do lado rejeitado.

O cliente escolheu quatro referências novas —
`illoca.unseen.co`, `paulkalkbrenner.net`, `lxlcreative.co.uk` e
`white-desert.com` — que somadas ao Aelixa fecham uma amostra de **cinco de
cinco escolhidas por ele**. Medidas em `REFERENCE-BOARD-v3.md`.

O que a amostra corrigida mostrou vai além de trocar o gosto: **o instrumento
também estava errado**, em duas frentes que só apareceram porque as peças dele
são diferentes das minhas. A régua de cor contava neutro tingido como cor, e
media só `background-color` — cega justamente para foto e canvas, que é onde a
cor vive nas referências dele. Registro em `provenance.md`, P-001 e P-002.

## O que aqui é confiável

Medição não deixa de valer por ter vindo na ordem errada — o número é o número.

| arquivo | o que vale |
|---|---|
| `PROJECT-CONTEXT-v1.md` | **confiável.** Lido do repositório, com linha de origem para cada valor: tokens, seções, dimensões, padrões de interação |
| `REFERENCE-BOARD-v1.md` | **as medições valem**, a seleção não. Densidade, altura, contagem de seções, paddings computados |
| `REFERENCE-BOARD-v2.md` | **parcialmente derrubado pela #17.** Contagem de mídia, altura e keyframes valem. **Toda a coluna de área cromática não vale** — a régua era saturação HSV, que conta neutro tingido como cor. Ver `REFERENCE-BOARD-v3.md` §2 |
| `REFERENCE-BOARD-v3.md` | **é o board vigente.** Passou por crítica independente que derrubou 4 das 10 conclusões — leia a §7 pelos vereditos, não pelas afirmações originais. Depois disso ganhou **amostra rotulada de 15 peças** (5 aprovadas, 10 rejeitadas pelo cliente): a §12 é o resultado que vale, e as seções anteriores são o caminho até ele |
| `CRITICA-v1.md` | **confiável.** Crítica independente de Codex e Antigravity, com uma afirmação do Antigravity refutada por medição minha |
| `assets-reais/` | **confiável.** Capturas reais dos três produtos no ar, mais 28 figuras extraídas dos notebooks do experimento |
| `PESQUISA-TIPOGRAFIA.md` | **etapa 1, issue #36.** A escala derivada da medição, com a decisão dominância × uniformidade. Medição feita por agente delegado e **auditada por medição independente** — leia a §9 antes das tabelas: dois valores da §3 estão marcados como errados, e a escala **não tem efeito a 390px** |

Números que sobrevivem e devem ser reaproveitados pelas issues de pesquisa:

- Aelixa: 17495px, 81 `<img>`, 91 `<svg>`, 1 vídeo, 1 keyframe, **zero animação ativa**
- paco.me: 1424px, **zero mídia**, 20 keyframes, 13 elementos em transição, **todos a 0,24s** — reproduzido exato em 2026-09-06
- arXiv: 50 entradas em 5385px, densidade **2568 caracteres por 1000px**

Números do v1/v2 que **a #17 derrubou** — não reaproveite:

- ~~Aelixa 0,4% de área cromática~~ · ~~os três produtos do cliente a 18,4%, 22,8% e 20,1%~~ — régua errada. Medido no pixel: cor forte de **0,5%** no Aelixa contra **0,0%, 0,2% e 0,0%** nos três produtos dele. A comparação do v2 se inverte
- ~~lp-final.html com 1,2 elemento em transição por 1000px~~ — remedido em **8,91**. Mas a contagem de transições é proxy fraco e não sustenta conclusão; o que vale é a **velocidade**: dominante a **0,6s**, contra 0,3s das referências do cliente e 0,18–0,3s dos dez sorteados — outlier nas duas populações
- ~~Folha, razão manchete/massa 2,7×~~ — domínio errado. As cinco referências do cliente ficam entre **6,0× e 20,0×**
- ~~"duas rotas excludentes de vitalidade"~~ — nenhuma das cinco fica em uma rota só
- ~~Aelixa com 18 elementos em transição~~ — não reproduz (remedido em 74), e o v2 não guardou o script

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
