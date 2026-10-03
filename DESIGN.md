---
name: Augusto Menchaca Personal Landing Page Design System
colors:
  primary: "{colors.ink}"
  surface: "#FFFFFF"
  ink: "#111111"
  muted: "#626569"
  earth: "#4F3D3A"
  forest: "#2C4C45"
  leaf: "#B7D692"
  sun: "#F6ED6C"
  h8-black: "#0B0B0B"
  h8-purple: "#6B0F9C"
  h8-gray: "#8A8A8A"
  hair: "rgba(17, 17, 17, 0.13)"
  hair-strong: "rgba(17, 17, 17, 0.28)"
typography:
  h1:
    fontFamily: Instrument Sans
    fontSize: 144px
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  h1-desktop-sm:
    fontFamily: Instrument Sans
    fontSize: 102.4px
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  h1-tablet:
    fontFamily: Instrument Sans
    fontSize: 76.8px
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  h1-mobile:
    fontFamily: Instrument Sans
    fontSize: 54px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.04em"
  h1-mobile-min:
    fontFamily: Instrument Sans
    fontSize: 49px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.04em"
  h2:
    fontFamily: Instrument Sans
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  h3:
    fontFamily: Instrument Sans
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0em"
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "0.02em"
rounded:
  slab-radius: 0px
spacing:
  container: 1240px
  container-lg: 1400px
  container-xl: 1560px
  pad-min: 20px
  pad-max: 48px
  slab-pad-min: 20px
  slab-pad-max: 44px
---

## Overview

Este sistema de design governa o portfólio pessoal e institucional de engenharia de software e pesquisa científica de Augusto Menchaca (UFPel). A identidade visual comunica rigor técnico, alta performance computacional e precisão arquitetural, fundamentando todas as escolhas de interface em medições empíricas auditáveis.

O direcionamento formal rejeita a uniformidade homogênea típica do gênero de páginas técnicas — rejeitada em 10 de 10 referências avaliadas pelo cliente como "cara de site morto" — e adota a **dominância assimétrica**. Essa filosofia estabelece um contraste vertical extremo entre um evento de entrada monumental e um corpo funcional compacto, denso e legível.

O sistema de movimento ancora-se no **dinamismo perceptível e coerente**, combinando respostas imediatas à interação direta, entradas seletivas e um momento expressivo vinculado ao conteúdo técnico (com a curva do IDF como candidata temática). A animação não persegue cotas de densidade nem ornamentação dispersa: utiliza uma base temporal contida de 0,3s para assegurar fluidez sem postergar o acesso aos dados.

O sistema distingue categoricamente evidência de preferência: a cor atua estritamente como restrição de contraste e convivência, a tipografia atua como o eixo divisor que classifica 15 de 15 avaliações sem erro, e o movimento provê vitalidade e orientação visual.

## Colors

A paleta **Blocos terrosos** (Gate C e Gate D, issue #64) substitui integralmente a
família creme/stone/acid anterior. Não sobra nenhum bege: as superfícies claras são
`surface` puro, e os acentos antes cobertos por `acid` viram um amarelo mais quente
(`sun`), sempre como bloco de fundo — nunca como texto sobre `surface`.

- **Superfície:** `surface` (`#FFFFFF`) é o único fundo claro do sistema. Hero, `#dvo`,
  `#ciere`, `#quantum`, `#about` e `#contact` correm nela.
- **Tipografia e Neutros:** `ink` (`#111111`) é o neutro escuro único para texto e
  hierarquia — absorve o antigo par `charcoal`/`body`, que colapsa numa camada só.
  `muted` (`#626569`) permanece como piso de contraste para textos utilitários e
  metadados **sobre `surface`**, condicionado a seguir passando no contraste medido a
  cada largura; não tem par simétrico sobre fundo escuro (texto sobre `earth` ou
  `forest` é sempre `surface`, sem um nível secundário).
- **Blocos:** `earth` (`#4F3D3A`, bloco marrom) cobre `#vivencias`; `forest`
  (`#2C4C45`, bloco verde profundo) cobre `#idf` e o rodapé. `leaf` (`#B7D692`, verde
  claro) é o verde de cartões e marcadores — substitui `subtle` nos `pill` e chips. `sun`
  (`#F6ED6C`) é o destaque pontual — substitui `acid` em botões e marcadores, sempre
  como fundo.
- **Sistema Hut 8:** `h8-black` (`#0B0B0B`), `h8-purple` (`#6B0F9C`) e `h8-gray`
  (`#8A8A8A`) seguem intocados, congelados pela decisão de projeto da issue #35 e
  conferidos no manual de marca local (páginas 16–17; procedência abaixo). A troca de
  paleta da #64 não altera nenhum valor desta família.
- **Hairlines:** Linhas divisórias estruturais finas baseadas em transparência
  controlada do neutro escuro, recalculadas para `ink`: `hair` (`rgba(17, 17, 17,
  0.13)`) e `hair-strong` (`rgba(17, 17, 17, 0.28)`).

### Pares de Texto Aprovados (Gate C)

A troca de paleta veio com os pares já medidos, e são estes — e só estes — que o
sistema usa para texto:

| texto | fundo | contraste |
| --- | --- | --- |
| `ink` (`#111111`) | `surface` (`#FFFFFF`) | 18,88:1 |
| `surface` (`#FFFFFF`) | `earth` (`#4F3D3A`) | 10,19:1 |
| `surface` (`#FFFFFF`) | `forest` (`#2C4C45`) | 9,43:1 |
| `ink` (`#111111`) | `leaf` (`#B7D692`) | 11,73:1 |
| `ink` (`#111111`) | `sun` (`#F6ED6C`) | 15,51:1 |
| `sun` (`#F6ED6C`) | `earth` (`#4F3D3A`) | 8,37:1 |
| `leaf` (`#B7D692`) | `forest` (`#2C4C45`) | 5,86:1 |

Um par que reprovar troca de combinação — nunca o hex medido (regra operacional da
#64, não uma decisão nova deste arquivo).

### Tokens Mortos Fora do Sistema (Decisão D3)

Os tokens `--light` (`#8A8E93`) e `--h8-photo` (`#2A2A28`), embora permaneçam fisicamente no bloco `:root` de `wireframes/lp-final.html` até a deliberação do Gate D, **não fazem parte do sistema de design** e estão expurgados do frontmatter e do uso em produção. A pesquisa #35 comprovou que ambos possuem zero ocorrências na peça atual. O token `--light` reprova os critérios de acessibilidade sobre superfícies claras (2,58:1 sobre stone e 2,84:1 sobre subtle). O token `--h8-photo` não tem valor declarado no manual: a página 13 orienta “Foto — escureça antes, sempre”, sem número, e `#2A2A28` não aparece no PDF. O `Preto tecido` (`#1F1F1D`, página 31) é outra cor declarada, sem associação a foto no manual. A exclusão de `--h8-photo` permanece por falta de fonte para seu valor.

### Procedência Conferida da Marca Hut 8

Fonte primária: `ManualdemarcaHUT8.pdf` (6.796.534 bytes; SHA-256 `2788C2618EB1D3B63424BF5E314846449654773E02A0CB388B2816E81D11CC51`), cópia local na pasta `Hut8_Workspace/governanca` do Augusto, fora de qualquer repositório público. Por decisão do Augusto em 2026-09-24, o manual não foi publicado neste repositório. As páginas citadas abaixo são índices do PDF começando em 1; nas páginas com numeração impressa, os números coincidem.

| Valor registrado no projeto | Status contra o PDF | Página do PDF | Evidência impressa |
| --- | --- | --- | --- |
| `#0B0B0B` | consta | 10 (impressa 10) e 16 (impressa 16) | Versão preta `#0B0B0B` na p. 10; Preto Hut8, HEX `#0B0B0B` na p. 16 |
| `#6B0F9C` | consta | 17 (impressa 17) e 31 (impressa 31) | Roxo; HEX `#6B0F9C` na p. 17; Roxo Hut8 `#6B0F9C` na p. 31 |
| `#8A8A8A` | consta | 16 (impressa 16) | Cinza texto; `#8A8A8A` |
| `#A4DE02` | consta | 17 (impressa 17) | Verde; HEX `#A4DE02` |
| `#1F1F1D` | consta | 31 (impressa 31) | Preto tecido; `#1F1F1D` |

Inventário de **todos os valores de cor declarados** no PDF (notações transcritas como impressas; “—” indica que a notação não foi declarada):

| Página do PDF | Nome no manual | HEX ou valor impresso | RGB | CMYK | Pantone |
| --- | --- | --- | --- | --- | --- |
| 10 (impressa 10) | Versão preta | `#0B0B0B` | — | — | — |
| 10 (impressa 10) | Versão branca | `#FFFFFF` | — | — | — |
| 16 (impressa 16) | Preto Hut8 | `#0B0B0B` | `11 11 11` | `0 0 0 96` | `Black 6 C` |
| 16 (impressa 16) | Branco | `#FFFFFF` | `255 255 255` | `0 0 0 0` | — |
| 16 (impressa 16) | Cinza fundo | `#F4F4F4` | — | — | — |
| 16 (impressa 16) | Cinza texto | `#8A8A8A` | — | — | — |
| 17 (impressa 17) | Verde | `#A4DE02` | `164 222 2` | `33 0 100 0` | `375 C` |
| 17 (impressa 17) | Roxo | `#6B0F9C` | `107 15 156` | `71 100 0 0` | `2597 C` |
| 31 (impressa 31) | Preto tecido | `#1F1F1D` | — | — | — |
| 31 (impressa 31) | Off-white | `#F1EDE6` | — | — | — |
| 31 (impressa 31) | Roxo profundo | `#1F003A` | — | — | — |
| 31 (impressa 31) | Roxo médio | `#3D0A5C` | — | — | — |
| 31 (impressa 31) | Roxo Hut8 | `#6B0F9C` | — | — | — |
| 31 (impressa 31) | Verde profundo | `#243A0B` | — | — | — |

Na página 13 (impressa 13), as seis amostras de fundo são **amostras sem valor declarado**: “Branco — versão preta”, “Preto — versão branca”, “Verde — versão preta”, “Roxo — versão branca”, “Cinza médio — só a branca, e evite” e “Foto — escureça antes, sempre”. Na página 31 há ainda uma amostra de verde claro, **amostra sem valor declarado**: não se atribui a ela um valor por medição da imagem. O derivado local `ManualdemarcaHUT8.md`, de autoria desconhecida, foi usado apenas para localizar páginas: sua transcrição corrompe caracteres de valores impressos (por exemplo, o `#1F003A` da p. 31 aparece como `#1FQQ3A` no `.md`); prevalece o PDF.

Os registros internos divergem: `docs/issues/lote-pesquisa.md:30` lista quatro valores (`#0B0B0B`, `#6B0F9C`, `#8A8A8A`, `#A4DE02`), enquanto `docs/design/CRITIQUE-BRIEF.md:22` lista só preto, roxo e verde. O PDF resolve a omissão: `#8A8A8A` é **Cinza texto** na página 16. `#1F1F1D`, ausente das duas listas, é **Preto tecido** na página 31. Os cinco valores acima têm fonte primária identificada; a limitação restante é que a cópia local não está disponível para verificação por leitores do repositório público.

### Limiar de Contraste e Tamanho Computado (Decisão D2)

A conformidade com WCAG 2.1 AA é mandatória em todos os pares da interface:
- Texto com **>= 24px** (ou **>= 18,66px** quando em peso negrito >= 700) submete-se ao limiar relaxado de **3:1**.
- Texto abaixo desses limites submete-se estritamente ao limiar de **4,5:1**.
- Os degraus 1 e 2 da escala tipográfica enquadram-se na faixa de 3:1 em todas as larguras; os degraus 3, 4 e 5 submetem-se sempre a 4,5:1.

**Regra mandatória por largura:** O limiar de contraste está vinculado ao **tamanho efetivamente computado naquela largura**, e não ao degrau nominal da escala. Com o uso de funções `clamp()`, pares de cor que atendem ao critério a 1440px podem reprovar a 390px se a fonte computada encolher para menos de 24px. A auditoria de contraste é individual por largura (issue #24).

### Regras Normativas de Cor (R1 a R7)

- **R1 — Lei de Contraste do Amarelo (revisada na #64):** O token `--sun` (`#F6ED6C`, sucessor do `--acid`) **NUNCA** pode ser utilizado como cor de texto sobre `--surface` (`#111111` sobre `#F6ED6C` mede 15,51:1, mas o inverso — `sun` como texto sobre branco — não faz parte dos pares aprovados e não deve ser usado). Seu uso normativo é como **fundo** (botões e marcadores, texto em `--ink`) ou, unicamente sobre `--earth`, como texto (`#F6ED6C` sobre `#4F3D3A` mede 8,37:1 — o único par aprovado com `sun` como texto).
- **R2 — Verde da Marca Hut 8 Fora da LP:** O verde `#A4DE02` da marca Hut 8 permanece fora da paleta da landing page. A medição instrumental comprovou proximidade perceptual excessiva com o acid (`ΔH = 11,2°` e `ΔC = 0,012`), pertencendo à mesma família cromática e incorrendo na mesma inviabilidade de contraste sobre superfícies claras (1,26:1 a 1,61:1).
- **R3 — Marca Hut 8 Congelada:** Os valores da marca Hut 8 congelados no projeto (`#0B0B0B`, `#6B0F9C`, `#8A8A8A` e externamente `#A4DE02`) são fixos e invioláveis: **não derivar, não modular e não inventar** variações de matiz, saturação ou luminosidade. O manual identificado na seção de procedência confirma esses quatro valores nas páginas 16–17; a decisão de congelá-los no projeto permanece sendo a da issue #35 (`docs/issues/lote-pesquisa.md`) e dos tokens ativos do bloco `:root` de `wireframes/lp-final.html`.
- **R4 — Confinamento das Paletas de Projetos Reais:** As identidades visuais de projetos reais entram como restrição externa, com os valores medidos nas capturas reais: **IDF-BR** navy `rgb(13,27,42)`; **Ciere** creme `rgb(243,236,220)`, marrom `rgb(77,54,28)` e dourado `rgb(206,145,0)`. O **DVO** não possui token estável: o azul de oficina vem de fotografia e varia por imagem, então nenhum valor é normativo — a peça entra como é e nada se deriva dela. Ficam confinadas ao campo visual de evidência técnica (cartões e ilustrações de produto) e **nunca** viram fundo de seção. Capturas de tela e dados reais jamais são recoloridos; superfícies adjacentes (molduras, legendas e planos de seção) acomodam-se à imagem original. **Um campo por tela:** nunca duas capturas de projetos diferentes inteiras no mesmo viewport; na transição entre projetos, a captura seguinte pode entrar por baixo. Medido em 2026-09-28 a 1440×900 e 390×844, com as 5 capturas reais (issue #6).
- **R5 — Piso de Contraste no Neutro (revisada na #64):** Nenhuma cor com luminosidade superior a `--muted` (`L = 0,505` em OKLCH) pode ser empregada como texto sobre `--surface`, agora a única superfície clara do sistema (o `paper`/`stone`/`white`/`subtle` de antes colapsaram nela). Essa restrição veda expressamente o uso de `--light` (`L = 0,645`) e `--h8-gray` (`L = 0,633`) sobre `--surface`. Sobre fundo escuro (`--earth` ou `--forest`) o piso não se aplica: o sistema não tem um nível "secundário" ali — todo texto sobre esses dois blocos é `--surface`.
- **R6 — Vedação de Texto Direto sobre Imagem:** Nenhum elemento textual pode assentar diretamente sobre imagens ou capturas sem uma faixa sólida e opaca intermediária, assegurando mensurabilidade determinística de contraste.
- **R7 — Fechamento do Sistema contra Cores Não Tokenizadas:** Todo elemento interativo deve declarar a propriedade `color` explicitamente no CSS, impedindo quedas omissivas em valores nativos do agente de usuário (como o `ButtonText` `#000000` detectado no controle `.rail-pause`).

### Orçamento de Área do Croma Alto (R8, revisada na #64)

O contraste diz **onde** uma cor pode aparecer; o orçamento diz **quanto** dela pode
aparecer. Os dois são necessários, e o segundo foi o que a medição isolou como a
gramática das peças aprovadas.

- **A regra:** a gramática do sistema é *campo grande de neutro + acento mínimo de
  croma alto*, e ela pressupõe que o croma alto — hoje `--sun`, sucessor do `--acid`
  — ocupe **da ordem de 1% da área pintada**. Passar disso não é questão de gosto:
  descaracteriza a gramática que a amostra aprovada exibe. `--earth`, `--forest` e
  `--leaf` são blocos de superfície, não acentos, e ficam fora deste orçamento — eles
  cobrem seção inteira por desenho (mapa de seções acima), o que a gramática de "campo
  grande de neutro" já não pressupõe para eles.
- **Consequência operacional direta:** **nenhum degrau de display carrega croma.**
  Os degraus 1 e 2 (`h1` e suas variantes por largura, e `h2`) são sempre neutros.
  Uma headline tingida, em qualquer largura, rompe o orçamento sozinha — um título
  de 144px colorido é área, não acento.
- **Como conferir:** medir a fração da área com croma alto (`--sun`) por viewport, não
  por componente. O instrumento da #35 já faz essa leitura; a auditoria por largura é
  da #24.
- **O que o orçamento não é:** limite de quantidade de ocorrências. Duas marcas
  minúsculas de `sun` e um campo grande tingido têm a mesma contagem e orçamentos
  opostos.

### Auditoria da Peça e Margens Críticas (reauditada na #64)

A troca para Blocos terrosos reauditou `wireframes/lp-final.html` com um script CDP
descartável, em janela real (`--headed`), nos dois viewports de referência: **154
elementos com texto próprio a 1440px e 157 a 390px, com zero reprovações de AA nos
dois** (limiar de 4,5:1, relaxado a 3:1 para texto >= 24px ou >= 18,66px em negrito
>= 700). O fundo efetivo de cada elemento foi resolvido subindo a árvore de
ancestrais e compondo alpha sobre alpha — não presumido do token nominal da seção.

A recontagem trocou a fonte da margem fina: com `--surface` (branco puro)
substituindo `stone`, o par `muted` sobre superfície clara deixou de ser crítico —
`stone` (`#E8E3D9`) tinha luminosidade menor que `#FFFFFF`, então o mesmo `muted`
agora mede mais alto do que os 4,58:1 registrados antes da #64. Nenhum par
sobrevive perto do piso: a reauditoria não encontrou pares em margem fina
equivalente à de antes.

### Ausências Declaradas (Decisão D4)

Duas áreas **não estão definidas neste sistema**, e a ausência é deliberada. Elas não
entram na chave `omitted` do frontmatter porque essa chave nomeia seções do próprio
esquema (`colors`, `typography`, `spacing`, `rounded`, `components`) e não conceitos;
declará-las ali produzia `unknown-omission` no linter.

- **`prefers-color-scheme: dark`** — nenhuma medição deste projeto cobre tema escuro.
  Derivar uma paleta escura a partir da clara seria proposta sem evidência, que é
  exatamente o que o `docs/design/00-ORDEM.md` proíbe. Quem precisar de tema escuro
  abre a questão como pesquisa, não como dedução.
- **Estados de interação** (`:hover`, `:active`, `:focus-visible` além do contraste
  de foco já normatizado) — as medições cobriram estritamente o estado de repouso. O
  sistema de movimento da #21 é quem define a resposta à interação, e os pares de cor
  desses estados nascem lá.

Consumir este arquivo assumindo valores para qualquer das duas é uso indevido: a
ausência está registrada para que ninguém a preencha por conta.

## Typography

A tipografia é o eixo primário de conformidade do projeto, sendo o único domínio cujas variáveis classificam as avaliações do cliente com precisão de 15 em 15 peças: maior título com ponto de corte em 89px (margem de 26px) e razão display/corpo com ponto de corte em 5,57× (margem de 0,86×).

### Denominador Normativo da Razão (Decisão D1)

A razão display/corpo normativa do sistema de design é fixada na relação:
$$\text{Razão} = \frac{\text{Degrau 1}}{\text{Degrau 4}} = \frac{144\text{px}}{16\text{px}} = \mathbf{9,00\times} \quad (\text{a } 1440\text{px})$$

Esse valor cruza o ponto de corte do classificador (5,57×) com folga de 3,43× **a 1440px**.

**Mas comparar contra um corte exige a régua que o derivou, e ela não é esta.** Os cortes
do classificador — 89px e 5,57× no desktop, e os cortes por largura da §8.4 da #45 — foram
obtidos dividindo o maior título de cada peça pelo *workhorse medido daquela peça*. Aplicar
a eles um denominador normativo que a página ainda não realiza é trocar de régua no meio da
comparação, que é precisamente o erro que esta decisão existe para encerrar.

Portanto o sistema declara **duas razões, com papéis distintos**:

- **Razão normativa do sistema** = degrau 1 ÷ degrau 4 = `144 ÷ 16` = **9,00×** a 1440px. É
  a proporção que o sistema *pretende*, e o número a citar ao descrever a escala.
- **Razão de classificação** = maior título ÷ *workhorse medido*. É a única comparável aos
  cortes. Hoje a página computa 13px de workhorse, então ela vale **11,08×** a 1440px e
  **4,15×** a 390px.

**A consequência, declarada porque inverte um veredito:** quando a escala for aplicada ao
produto e o workhorse medido convergir para os 16px do degrau 4, a razão a 390px passa a ser
`54 ÷ 16` = **3,38×**, **abaixo** do corte de 3,66× daquela largura. A 1440px nada muda
(9,00× continua acima de 5,57×). Ou seja, **a conformidade móvel de hoje depende do
workhorse de 13px**, que a escala não governa. Resolver isso é decisão de Gate C — ou o
degrau 1 móvel sobe, ou o degrau 4 não converge para 16px no texto utilitário.

Toda razão citada neste sistema declara obrigatoriamente o seu denominador.

### Escala de Cinco Degraus e Degrau Móvel (Decisão D5 e §8.4)

A escala é constituída por cinco degraus funcionais. O segundo degrau e o teto da escala são fixos; o primeiro degrau incorpora a forma móvel responsiva validada na pesquisa #45:

| Degrau | Token | Tamanho 1440px | Tamanho 390px | Função na Interface | Line-height | Letter-spacing | Peso | Família |
|---|---|---|---|---|---|---|---|---|
| **1 — display** | `h1` | **144px** | **54px** | Evento monumental do herói | `clamp(.9em, 3.375rem, 1em)` | `-0.04em` | 700 | Instrument Sans |
| **2 — seção** | `h2` | **72px** | 36px | Cabeçalhos de seção (`.slab-headline`) | 1.05 | `-0.02em` | 600 | Instrument Sans |
| **3 — subseção** | `h3` | **32px** | 24px | Títulos de cards, métricas e blocos | 1.20 | `0em` | 600 | Instrument Sans |
| **4 — corpo** | `body` | **16px** | 16px | Texto corrido e workhorse normativo | 1.60 | `0em` | 400 | Inter |
| **5 — rótulo** | `label` | **12px** | 12px | Badges, tags técnicas e metadados | 1.00 | `0.02em` | 500 | IBM Plex Mono |

O degrau 1 é **uma curva fluida**, e o frontmatter não pode carregá-la: o esquema do `DESIGN.md` aceita apenas dimensões tipadas (`px`, `em`, `rem`) e `clamp()` não é uma delas. A curva normativa é esta, e vive aqui na prosa:
```css
font-size:     clamp(3.0625rem, max(10vw, min(14vw, 3.375rem)), 9rem);
line-height:   clamp(.9em, 3.375rem, 1em);
overflow-wrap: anywhere;
```

Os cinco tokens de `h1` no frontmatter — `h1`, `h1-desktop-sm`, `h1-tablet`,
`h1-mobile` e `h1-mobile-min` — **não são cinco decisões**: são os valores medidos da mesma
curva nas cinco larguras de referência, tipados para o esquema poder serializá-los. Quem
implementa usa a expressão `clamp()` acima; quem consome tokens lê as âncoras. Se as duas
divergirem, a expressão manda.

Nas larguras auditadas em janela real (`--headed`), o degrau 1 atinge:
- **1440px:** 144px (razão 9,00× sobre 16px; corte 89px / 5,57×).
- **1024px:** 102px (razão 6,38×; corte 89px / 5,57×).
- **768px:** 77px (razão 4,81×; corte 70,5px / 4,39×).
- **390px:** 54px (razão 3,38× sobre 16px, 4,15× sobre 13px; corte 54px / 3,66×).
- **320px:** 49px (razão 3,06× sobre 16px, 3,77× sobre 13px; corte de razão 3,73×).

### Fragilidades e Limites Declarados da Escala Móvel

1. **Margem Nula a 390px:** No viewport de 390px, o maior título atinge exatamente 54px, pousando sobre o ponto de corte da largura com margem zero.
2. **Inversão da Variável de Título a 320px:** Em 320px, a variável de maior título inverte na amostra de controle (`illoca` aprovada com 47px contra `lowmess` rejeitada com 48px), inexistindo corte de título válido. A classificação depende exclusivamente da razão sobre o texto utilitário (3,77× contra corte de 3,73×, com folga de apenas 0,04).
3. **Ausência de Homologação Visual:** A ausência de rolagem horizontal sob `.hero-mask` não assegura ausência de truncamento de texto no navegador real, dependendo de validação visual na issue #21 e Gate C.

### Famílias Tipográficas e Proibições

- **Famílias:** Preservadas sem alteração — `Instrument Sans` para títulos e display (`--f-display`), `Inter` para texto de leitura contínua (`--f-body`) e `IBM Plex Mono` para dados técnicos e metadados (`--f-mono`).
- **Descarte de Serifa:** 4 das 5 referências aprovadas utilizam sans-serif no display. Serifa não é discriminante de aceitação e foi descartada para o núcleo normativo.
- **Veto a Pesos Extremos:** Pesos tipográficos 800 e 900 são **terminantemente proibidos**. O teto de peso do sistema é fixado em 700 (*Bold*).
- **Carga de Texto:** O display comporta frases expressivas completas (59 caracteres e 8 palavras na LP atual), com respaldo empírico nas referências *Paul Kalkbrenner* (51 car. / 8 pal. a 150px) e *Illoca* (121 car. / 22 pal. a 111px).
- **Redução de Caixa Alta:** ALL CAPS restrito estritamente a elementos utilitários curtos, consolidando a redução auditada de -76,0% em nós e -69,1% em caracteres.

### Custo de Altura da Dominância Assimétrica

A dominância assimétrica eleva a altura da página em decorrência do tamanho monumental do display e da propriedade `overflow-wrap: anywhere`:
- LP original: 8.374px (9,3 telas).
- LP com escala e degrau móvel: **10.863px (11,8 telas)**.
- Acréscimo medido: **+2.513px (+30,1%)**, introduzindo conflito com a diretriz do `PROBLEMA-v1.md` (primeira prova técnica em <= 1,5 tela), remetido à arquitetura da issue #7.

## Layout

O modelo espacial organiza a página em faixas horizontais de sangria total articuladas por um contêiner estrutural centralizado.

### Tokens de Layout

- `--container: 1240px`: largura máxima da grade central, que sobe para **1400px** e
  **1560px** nos dois breakpoints largos (tokens `container-lg` e `container-xl`).
- `--pad: clamp(20px, 4vw, 48px)`: margem de recuo lateral fluida da página.
- `--slab-pad: clamp(20px, 3.6vw, 44px)`: espaçamento interno das faixas estruturais.

Os dois `clamp()` acima são a forma normativa, e também não cabem no frontmatter tipado.
O esquema recebe os **extremos** de cada um — `pad-min` 20px e `pad-max` 48px, `slab-pad-min`
20px e `slab-pad-max` 44px — que são valores reais do sistema, não aproximações. O termo
fluido do meio (`4vw` e `3,6vw`) vive nesta prosa. Declarar só um dos extremos faria o token
desaparecer na exportação ou, pior, fixaria um recuo que o sistema nunca usa sozinho.

### Sistema de Faixas (Slabs)

A página é estruturada pelo sistema de lajes (`.slab`), caracterizado por faixas de largura total contíguas, sem cantos arredondados e sem margens verticais separadoras (`margin: 0; border-radius: 0;`). O recuo horizontal e o alinhamento da leitura são atribuídos exclusivamente ao contêiner interno (`.container`).

As lajes alternam superfícies tonais de alto contraste:
- `.slab-dark`: Fundo em `--forest` (o bloco de `#idf`) com texto e títulos em `--surface`.
- `.slab-hut8`: Fundo em `--h8-black` com títulos em `#FFFFFF` (congelado, R3).
- `.slab-stone`: Fundo em `--surface` com texto e títulos em `--ink` (cobre `#quantum` e `#about`).
- `.slab-oxblood`: classe sem uso na peça hoje; fundo em `--earth` com texto e títulos em `--surface`.

A medição das 16 referências comprovou que contagem de bandas escuras (0 a 7 em aprovados vs 0 a 3 em rejeitados) e fração de área escura (0 a 0,945 vs 0 a 1,0) constituem variáveis estatisticamente nulas. A alternância de faixas existe para clareza visual e ritmo de leitura, e não como tentativa de satisfação de preferência cromática.

### Lacuna de Tokens de Espaçamento Declarada

Registra-se que uma escala modular discreta de espaçamento relativo (como patamares fixos de 4px, 8px, 16px, 24px, 32px e 64px para margens e entre-colunas) **não está definida** nas fontes de referência nem no `:root`. Apenas os três tokens de contêiner e preenchimento fluido acima possuem definição normativa.

## Elevation & Depth

A profundidade no sistema é plana e arquitetural, construída por contraste tonal direto e linhas milimétricas, sem recurso a sombras projetadas (*drop shadows*) ou efeitos de translucidez difusa (*glassmorphism*).

- **Camadas Tonais:** A distinção de planos é conferida pela justaposição de blocos maciços de cor (`surface`, `ink`, `earth`, `forest`, `h8-black`).
- **Hairlines Estruturais:** Separação entre seções, cabeçalhos de tabelas e contornos de cartões executada por linhas de 1px com transparência calibrada: `--hair` (`rgba(17, 17, 17, 0.13)`) para divisões gerais de baixo peso visual e `--hair-strong` (`rgba(17, 17, 17, 0.28)`) para fronteiras ativas.
- **Indicador de Foco Acessível:** `outline: 2px solid var(--ink); outline-offset: 3px;` sobre planos claros; `outline-color: var(--surface);` sobre superfícies escuras. O indicador é estático e imediato, sem atraso de transição ou deslocamento.
- **Elevação Interativa por Deslocamento:** A resposta ao cursor ocorre via microdeslocamento geométrico vetorial: botões recebem `transform: translateY(-2px)` e cartões do trilho recebem `transform: translateY(-3px)`, comunicando acionamento sem alterar o fluxo do documento.

## Shapes

A geometria do sistema é austera e disciplinada, priorizando ângulos retos na macroestrutura e arredondamentos mínimos e utilitários em componentes de toque.

- **Macroestrutura das Faixas:** `--slab-radius: 0;`. As faixas de seção mantêm arestas vivas e transições retas de borda a borda da janela.
- **Microestrutura de Componentes:**
  - Botões (`.btn`), etiquetas técnicas (`.pill`) e botões de controle (`.rail-pause`): raio de canto de **3px** (`border-radius: 3px`).
  - Cartões de conteúdo do trilho editorial (`.rail-item`): raio de canto de **10px** (`border-radius: 10px`), conferindo contenção suave sem descaracterizar a sobriedade técnica.
- **Lacuna de Tokens de Raio Declarada:** Os valores de 3px e 10px encontram-se aplicados diretamente nas declarações de classes CSS em `wireframes/lp-final.html`, não estando formalizados como tokens de variáveis no bloco `:root`. Formas orgânicas, cantos arredondados excessivos e distorções não padronizadas são proibidos.

## Components

Os componentes da interface operam como átomos funcionais de alta densidade informativa e resposta mecânica previsível.

### Botões (`.btn`) — Substituído pelo Botão B3b (Corte 1, issues #8 e #68)
**Removido:** a classe `.btn` (e as variantes `.round`, `.ghost`) saiu da hero, do contato e da nav nesta corte, substituída pelo Botão B3b abaixo. Sem uso na peça atual — grep de prova em `wireframes/lp-final.html`. Esta subseção descreve um componente que não existe mais no arquivo, e fica só como registro histórico, no mesmo padrão do Trilho Editorial mais abaixo.
- **Tipografia:** `IBM Plex Mono`, tamanho 0.72rem (~11,5px), peso 600, `letter-spacing: 0.1em`, caixa alta.
- **Estrutura:** `padding: 13px 22px; border-radius: 3px; border: 1px solid var(--ink); display: inline-flex; align-items: center; gap: 9px;`.
- **Cores:** Fundo em `var(--sun)`, texto e ícones em `var(--ink)`. Variante Ghost com fundo transparente.
- **Estados:** Hover com `transform: translateY(-2px)` e transição de 0,3s ease; estado `:active` com compressão `scale(0.98)` de resposta imediata (0–50ms) e retorno em até 0,1s.

### Botão B3b (`.btn-b3b`) — issues #8 e #68
Círculo magnético que substitui o `.btn` na hero e no contato. Referências externas coletadas antes da implementação: dennissnellenberg.com (padrão `btn-click magnetic` + `btn-fill`) e o componente Magnetic da biblioteca Motion Primitives.
- **Markup:** um `<a class="btn-b3b btn-b3b--<variante>">` por botão, com o rótulo dentro de `.btn-b3b__rotulo` (i18n) e o círculo em `.btn-b3b__circulo > .btn-b3b__seta` (`aria-hidden`):
  ```html
  <a class="btn-b3b btn-b3b--primario" href="#contact">
    <span class="btn-b3b__rotulo"><span class="i18n" lang="pt">Vamos conversar</span><span class="i18n" lang="en">Let's talk</span></span>
    <span class="btn-b3b__circulo" aria-hidden="true"><span class="btn-b3b__seta">↗</span></span>
  </a>
  ```
- **Tipografia:** rótulo em Instrument Sans SemiBold 22px `var(--ink)`; seta em Instrument Sans Bold 22px. `gap` de 14px entre rótulo e círculo; círculo de 52px de diâmetro.
- **Variantes:** `--primario` (círculo `var(--sun)`, seta `var(--ink)`); `--secundario` (círculo transparente, borda de 1,5px `var(--ink)`, seta `var(--ink)`); `--escuro` (círculo `var(--ink)`, seta `var(--sun)`, usado sobre o bloco `--sun` do contato); `--externo`, modificador para `target="_blank"` ou `download` cuja seta continua em ↗ no hover (não gira).
- **Estados de ponteiro e `:focus-visible`:** a cor do círculo e da seta troca em 0s (mesma regra do sistema de movimento, sem interpolação de cor); o círculo desloca para `translate(10px, -4px)` e o rótulo para `translateX(4px)`, em 0,3s `var(--motion-enter)`; nos links internos (sem `--externo`) a seta gira 45° (↗ vira →).
- **Ímã (JS puro, ≤ 30 linhas):** no `pointermove` sobre o círculo, as variáveis `--mx`/`--my` recebem 25% da distância do ponteiro ao centro do círculo, limitada a ±10px, somando-se ao deslocamento fixo do hover; no `pointerleave` voltam a 0. Só liga com `(hover: hover) and (pointer: fine)` **e** `(prefers-reduced-motion: no-preference)` — sem JS ou fora dessas condições, vale o deslocamento fixo `translate(10px, -4px)`.
- **Acessibilidade:** `prefers-reduced-motion: reduce` neutraliza toda a translação (só a cor troca); foco com contorno de 2px `var(--ink)` e `outline-offset` de 4px.

### Hero (`header#top`) — Corte 1 (issues #8, #68)
Título em Instrument Sans Bold, curva fluida de 112px (1440px) a 54px (390px), `line-height: 0.9`, `-0.04em`; a segunda palavra ("produto." → "software." → "usuário.") troca só por CSS, ciclo de 7,5s (2,5s por palavra), rodando apenas em `(min-width: 1024px) and (prefers-reduced-motion: no-preference)` — fora disso só a primeira palavra aparece, e o nome acessível do título permanece "Da pesquisa ao produto." (as duas palavras seguintes ficam `aria-hidden`). Apoio em Inter 18px `var(--muted)`. Duas chamadas Botão B3b (`--primario` para `#contact`, `--secundario` para `#idf`). Abaixo, a linha de papéis (NIP, Hut 8, UFPel) substitui os antigos `.hero-cards`/`.hero-card*` (removidos, grep de prova). Em telas com ponteiro fino e hover a partir de 1024px, passar o ponteiro ou o foco em NIP e Hut 8 revela uma prévia da ferramenta real (`idf-br-ferramenta-1440.png` e `dvo-1440.png`), `aria-hidden` e `alt=""` porque as mesmas imagens já aparecem nas seções correspondentes.

### Vivências (`#vivencias`) — colagem A aprovada (issue #86)

Composição A (`196:4` desktop / `196:6` móvel): títulos no mesmo eixo esquerdo,
Hut 8 com três grupos de texto à esquerda e colagem à direita; NIP com colagem
à esquerda e texto à direita. Abaixo de 1200px a ordem é título → três grupos
de texto → colagem nas duas instituições, inclusive em 768/1024px. As quatro
fotos permanecem na página, sem carrossel. Instrument Sans 600 nos títulos,
72px no desktop e 40px até 600px; Inter 16px/26px no corpo e 600/14px nos rótulos.
Fundo `earth`, texto e molduras `surface`, períodos em `sun` e frase final do
NIP em 600. O contêiner da seção conserva o limite de 1240px nas telas largas.

Os pares têm geometria normalizada e fluida, com margem para rotação e movimento:
Hut 8 usa a equipe maior atrás (+3° CSS) e evento menor à frente (−4°), sobre o
canto inferior direito; NIP usa UFMG maior atrás (−3°) e CONABREH menor à frente
(+4°), sobre o canto inferior esquerdo. A moldura branca gira junto da imagem.
As proporções originais são preservadas, inclusive 800/450 e 1600/901; nenhum
recorte é aplicado. A escala dos pares contém os limites rotacionados dentro da
coluna e do contêiner, em vez de copiar coordenadas absolutas do protótipo.
`sizes` acompanha a largura real não rotacionada de cada imagem.

### Contato (`#contact`) — Corte 1 (issues #8, #68)
Bloco `var(--sun)` de sangria total, título Instrument Sans Bold de 88px (1440px) a 48px (390px), parágrafo Inter de 20px (17px a 390px) com no máximo 640px. Os quatro links usam Botão B3b: E-mail em `--escuro`, e LinkedIn/GitHub/CV em `--secundario --externo`.

### Rodapé (`.site-footer`) — Corte 1 (issues #8, #68)
Bloco `var(--forest)`, texto `var(--surface)`. A marca ("Augusto Menchaca") sobe para Instrument Sans Bold 28px; os títulos das colunas Navegação e Contato trocam de `IBM Plex Mono` maiúsculo para Instrument Sans SemiBold 14px `var(--leaf)`, sem caixa alta. A base (borda superior `rgba(255,255,255,.15)`) reúne o aviso de direitos autorais e "↑ Topo" na mesma linha. O `footer-wordmark` ("AUGUSTO" em escala gigante) saiu da peça nesta corte — grep de prova em `wireframes/lp-final.html`.

### Rótulos Técnicos e Pílulas (`.meta-label`, `.pill`)
- **`.meta-label`:** Tipografia `IBM Plex Mono`, tamanho 0.7rem (~11px), peso 500, `letter-spacing: 0.12em`, caixa alta, cor `var(--muted)`. Variante em fundo escuro com cor `var(--surface)`.
- **Rótulo de seção:** `.meta-label` nunca representa numeração (`01 / Nome`). Augusto recusou esse uso em 29/09/2026, na #66, porque parece marca d'água de IA e nenhuma referência usa.
- **`.pill`:** Tipografia `IBM Plex Mono`, tamanho 0.62rem (~10px), peso 600, `letter-spacing: 0.09em`, caixa alta, `padding: 4px 9px; border-radius: 3px; border: 1px solid var(--hair-strong); background: var(--leaf); color: var(--ink);`. Variante em fundo escuro com fundo transparente, borda `rgba(255, 255, 255, 0.28)` e texto `var(--surface)`.
- **`.live-link`:** Link de texto abaixo do título, `var(--f-body)`, `1rem` (`0.9rem` na DVO, como o parágrafo), peso 400, sublinhado de `1px` com afastamento `0.2em`, `margin-top: 16px`; `var(--ink)` em superfície clara e `var(--surface)` em `.slab-dark`. No hover, o sublinhado passa a `2px` sem transição.

### Trilho Editorial (`.rail-section`)
- **Removido (issue #9):** o trilho editorial saiu da peça; esta subseção descreve um componente que não existe mais em `wireframes/lp-final.html` e fica só como registro histórico até uma limpeza dedicada do `DESIGN.md`.
- **Mecanismo:** Visualização contínua com rolagem linear automática de 46s (`@keyframes rail-scroll`), com pausa obrigatória ativada por `:hover`, `:focus-within` e controle manual.
- **Controle de Pausa (`.rail-pause`):** Botão técnico com tipografia `IBM Plex Mono`, peso 600, tamanho 0.6rem, caixa alta, borda em `var(--hair-strong)`. Em estrito cumprimento da regra R7, deve declarar explicitamente `color: var(--ink)` para vedar queda no valor nativo `#000000`.
- **Cartões (`.rail-item`):** Dimensões de 186px de largura e mínimo de 82px de altura, `border-radius: 10px`, `padding: 12px 14px;`, fundo branco ou tonal (`var(--surface)`, `var(--leaf)`, `var(--ink)`, `var(--sun)`, `var(--earth)`). Hover com `transform: translateY(-3px)`.

### Faixas Estruturais (`.slab`)
- Seções de sangria total com preenchimento vertical de `clamp(34px, 4.4vw, 60px) 0`, contendo o alinhamento da grade via contêiner central.

### Aparelhos do portfólio — issue #85, rodada 3

- **Fonte e composição:** cinco capturas reais, textos alternativos, proporções
  e posições dos grupos preservados; cascata E2 e sobreposições da rodada 2.
  Desktop usa tela 16:10 e celular mantém 460×995. Não recortar nem recolorir.
- **Componente:** `.laptop3d`, perspectiva de 2200px, geometria proporcional em
  unidades de container. Modificadores de câmera e arquitetura combináveis.
- **Câmeras:** `--tres-quartos-dir` usa X14°/Y−22°; `--tres-quartos-esq`,
  X14°/Y22° e reflexo espelhado; `--frontal`, X6°/Y0°, tampa compensada em −6°
  e base em 82° para mostrar a faixa frontal; `--alto`, X32°/Y−12° e base em
  40° para expor teclado e trackpad. Os ajustes são internos ao aparelho.
- **Alumínio:** `deck.svg`, bezel proporcional de 14px, tampa arredondada em
  18px, câmera com notch, moldura `#1f2022`, arestas `#3a3b3f` → `#2a2b2e`.
- **Grafite:** `deck-grafite.svg`, bezel de 18px e queixo de 30px, cantos em
  6px, moldura `#16181b`, tampa mais espessa, câmera pontual sem notch e
  dobradiça aparente. As medidas nominais escalam com o container de 1000px.
- **Aplicação:** IDF principal alumínio/direita; futuro grafite/esquerda;
  DVO alumínio/frontal; Ciere grafite/alto. O celular aprovado fica como está.
- **Tela e sombra:** reflexo branco de 6% e vinheta suave, sem alterar o asset;
  sombra `drop-shadow(0 40px 40px rgba(0,0,0,.35))` e sombra de chão contida.
- **Responsividade:** abaixo de 900px, X8°/Y±8° nos três quartos, X12°/Y−6°
  na vista alta e frontal reto (X0°/Y0°), inclusive a tampa frontal.
- **Movimento:** hovers aprovados só por transform; timelines preservadas;
  `prefers-reduced-motion` elimina deslocamentos e mantém a geometria estática.
- **Referência:** `docs/design/mockups-variantes.html` compara oito combinações
  com a mesma captura. CSS do componente reproduzido da LP para inspeção.
- **Verificação:** nove larguras sem estouro, sonda sem violações, página rolada
  abaixo de 1,2MB, seis capturas em 390/1440px e referência em 1440px.

### Aparelhos Apple do Figma — issue #85, rodada 4

- **Origem:** exportações fornecidas pelo Augusto dos arquivos Figma Community
  "Device Mockups (Community)" e "Apple Device Mockups – iPhone, Mac, iPad,
  Apple Watch (Community)". **A licença precisa ser conferida pelo Augusto antes
  de publicar.** Esta rodada prepara o PR para develop; não autoriza publicação.
- **Assets:** `assets/mockups/apple/{air13,pro14,pro16,imac24}.webp`, copiados
  integralmente, com tela transparente. O Air contém "MacBook Air" no queixo.
  Não usar `imac27`, que não integra os arquivos desta rodada.
- **Arquiteturas:** `--apple-air`, `--apple-pro14`, `--apple-pro16`, `--apple-imac`.
  Imagem decorativa sobre a captura, ambas no mesmo conjunto com perspectiva
  de 2200px. Frontal em Y0°; três quartos em Y±20°, reduzidos para ±8° abaixo
  de 900px. Sombra de chão contida, sem mudar composição ou aparelhos restantes.
- **Aberturas (% left/top/width/height):** Air 12.835/8.696/74.227/78.261;
  Pro 14 11.663/11.7/76.673/76.599; Pro 16 10.184/10.979/79.631/78.112;
  iMac 2.941/3.96/94.118/62.376. Capturas originais atrás da abertura, com
  `object-fit: cover` e `object-position: top left`, sem recolorir o arquivo.
  A diferença de proporção limita a faixa direita dos Pro (~3–4%) e a faixa
  inferior do iMac (~10%); conferir conteúdo importante e bordas nas capturas.
- **Aplicação:** DVO Pro 14 frontal; clima futuro Air à esquerda. Principal do
  IDF, Ciere grafite e celular continuam iguais. Hovers e reduced-motion iguais.
- **Referência:** oito combinações Apple (quatro frontais e quatro três quartos)
  junto das oito da rodada 3, fora do alvo publicado dos checks.

### MacBooks abertos e iPhones reais — issue #85, rodada 5

- **Direção:** montagem 3D aberta aprovada com tampa real dos Pro 14/16 e base
  de alumínio `deck.svg`. Câmera X12°/Y±44°, perspectiva 2200px; as arquiteturas
  Apple frontais também aceitam Y±44°. Abaixo de 900px, Y±14° e X8°.
- **Recorte medido:** a base começa na linha 1192 do Pro 14 e 1334 do Pro 16,
  onde a largura opaca salta para mais de 90% da imagem. As tampas são recortadas
  em [202,122,1769,1192] e [193,128,1977,1334], preservando transparência e notch.
  `docs/design/recortar-tampas.py` reproduz os assets; o CSS registra as aberturas.
- **Composição:** principal do IDF Pro 16 aberto à direita; futuro Pro 14 aberto
  à esquerda, na cascata E2; DVO mantém Pro 14 frontal. Ciere mantém grafite/alto.
  Cada seção ganha um iPhone com a captura real correspondente; no DVO, ele
  sobrepõe a fotografia de oficina e mantém o formulário de login visível.
- **iPhone:** `iphone13.webp`, exportação real 800×1543. Abertura em
  8.143/3.111/83.571/93.769% (left/top/width/height). Capturas móveis IDF e DVO
  fornecidas em 780×1688; candidatos menores preservam proporção e todo o conteúdo.
  Ciere mantém sua captura 460×995 inteira, sem cortar, com ajuste subpixel na
  abertura. Câmeras frontal e X6°/Y±32°; abaixo de 900px, X4°/Y±14°.
- **Peso:** originais Apple preservados; molduras leves e capturas mobile em
  230/390/780px, com enquadramento completo. `docs/design/prepare-devices.py`
  reproduz recortes e variantes a partir dos originais, usando Pillow.
- **Movimento:** hovers aceitos preservados; reduced-motion mantém geometria
  estrutural estática, sem translações ou animações. Nenhum texto da LP muda.
- **Vídeo por aparelho (issue #90):** só o notebook principal do IDF-BR e o
  notebook da Ciere tocam vídeo (`assets/video/idf-*.mp4`,
  `assets/video/advocacia-*.mp4`, H.264 60 fps, `-an`, `+faststart`, sem
  reduzir o frame rate); o DVO e os dois iPhones continuam só com a captura
  estática. `data-device-video`/`-mobile` e `data-device-poster`/`-mobile`
  no `.device-screen` escolhem a fonte certa via `matchMedia('(max-width:
  899px)')`. O `<video>` (`preload="none"`) só recebe `src` quando o slot
  entra no `IntersectionObserver` (`rootMargin: 300px`); pausa ao sair e
  nunca carrega com `prefers-reduced-motion: reduce`, `saveData` ou
  `effectiveType` `2g`/`slow-2g` — nesses casos fica só o pôster. Um `<img
  class="device-video-poster">` (WebP) fica sobreposto ao vídeo e só some
  com fade de **300ms, só `opacity`**, quando o vídeo dispara `playing` —
  evita o salto do pôster nativo para o primeiro quadro decodificado
  (adendo do coordenador). Erro de carregamento ou bloqueio de autoplay
  mantém o pôster em silêncio.
- **Licença:** o iPhone 13 também vem de "Apple Device Mockups – iPhone, Mac,
  iPad, Apple Watch (Community)". Augusto precisa conferir a licença dos aparelhos
  antes de publicar; esta rodada prepara a mesma branch e o PR para develop.
- **Referência:** quatro MacBooks abertos (Pro 14/16, esquerda/direita) e três
  vistas do iPhone junto das dezesseis combinações anteriores.

### Aparelhos do Mokker — issue #90, rodada 2

- **Substituição:** todo o CSS 3D anterior (`.laptop3d`/`.phone3d` e variantes,
  seções acima) e `assets/mockups/` saíram. Os aparelhos agora são **renders
  reais do plugin Mokker** (Figma): MacBook Pro e iPhone 17 Pro, em perspectiva
  lateral, com a captura real do site já embutida na tela de cada render —
  ela serve de fallback e de poster, e o vídeo vai por cima.
- **Componente `.mk`:** `.mk__render` (o render, fundo) + `.mk__stage`
  (caixa de largura nativa do render, escalada por `--k` via `ResizeObserver`
  em `assets/js/device-media.js`) + `.mk__screen` (do tamanho da captura,
  `matrix3d` do ângulo, `border-radius` em `%` da própria largura) + vídeo/
  pôster dentro + `.mk__notch` (o mesmo render, só o notch/ilha, por cima do
  vídeo via `clip-path: polygon()`). `aspect-ratio: var(--w) / var(--h))`
  sem CLS.
- **3 ângulos fixos em uso (issue #92, corte 4):** `macbook-cima-esq` (IDF-BR,
  3/4 visto de cima), `macbook-frontal` (Ciere, reto) e `iphone-frontal`
  (IDF-BR e DVO, reto) — cada um com `matrix3d`, `raio_pct` (em px, fração da
  largura da captura — **não** `border-radius: N%` puro, que usaria `%` da
  largura no raio horizontal e `%` da altura no vertical, cortando demais numa
  tela não quadrada) e `notch_poligono` medidos em `assets/mokker/angulos.json`.
  O iPhone também traz `mascara_pct`: um `border-radius` em `%` da própria
  caixa do `.mk` (não da captura), que fecha o vazamento de pixel nos cantos
  do PNG do Mokker — distinto do raio da tela. Um ângulo novo nunca nasce de
  transformação CSS de um render existente — sempre de um render novo do
  Mokker, validado por uma ferramenta própria. Ângulos descartados ao longo da
  #92: `macbook-esq`/`-dir`, `iphone-esq`/`-dir` (corte 1), `macbook-baixo-esq`
  (corte 2), `macbook-cima-dir`/`iphone-cima-dir` (corte 4 — substituídos pelo
  `macbook-frontal`/`iphone-frontal` do protótipo).
- **Colagem copiada do protótipo aprovado no Figma (issue #92, corte 4):**
  depois de três reprovações de composições feitas **sem** protótipo (ver
  memória `copiar-referencias-reais-mockups`), o Augusto aprovou o protótipo
  v5 no Figma (arquivo `0NZizUgSb9ZH7ZIDWexxSJ`) e as medidas viraram a fonte
  da verdade — sem inventar ângulo, posição ou sobreposição. Tudo abaixo é
  medido do protótipo e convertido para `%` do grupo/container (nunca `px`
  copiado do frame).
  - **IDF-BR** (variante B): grupo de 920×677 = 74,2% do container,
    centralizado. `macbook-cima-esq` (com vídeo) **na frente**, 76,74% do
    grupo; `iphone-frontal` **atrás, à direita**, 28,04% do grupo, base
    alinhada com o notebook (mesmo `bottom`), sobrepondo a borda direita dele
    em ≈44px (4,8% do grupo). `.idf-numbers` fica **depois** do bloco no DOM
    (só ordem, texto idêntico).
  - **Ciere**: voltou a **um aparelho só**, `macbook-frontal` (com vídeo),
    55,97% do container, encostado à direita — **sem corte lateral** (o
    `overflow:hidden`/`clip` tentado no corte 3 só escondia visualmente; o
    `estouro.mjs` mede `getBoundingClientRect` do descendente, que `overflow`
    não encolhe, então continuava sendo reportado — removido). Os 4 chips
    (`.ciere-chips`, texto de `.ciere-activities`, que mantém as 6 frases
    completas abaixo) ficam fora da tela, à esquerda, cada um com uma
    linha-guia (`::after` do `<li>`, `width:100vw` cortada pelo
    `overflow:hidden` do `.ciere-chips` no ponto exato — sem medir largura de
    texto em JS) convergindo na borda esquerda do notebook.
  - **DVO**: só `iphone-frontal`, reto (sem a inclinação 3/4 do
    `iphone-cima-dir` anterior), 24,2% do container (expresso como 38,8% de
    `.dvo-aside`, a coluna onde ele mora), centrado no quadrante à direita da
    lista — reaproveita a curva de entrada do "notebook"
    (`data-mk-papel="notebook"` num `.mk` que é um iPhone — só a curva).
  - Todo aparelho mantém folga de 3-6% no lado ancorado (nunca 0) para o
    `rotate()`/`translate()` de entrada não furar a borda do bloco.
- **Sombra de chão — nunca retângulo:** `box-shadow` e `filter: drop-shadow`
  **saíram** de qualquer wrapper retangular (era a causa do retângulo escuro
  que o Augusto mais odiou — o WebP em si não tem sombra, alfa só 0 ou 255).
  A sombra agora é `.mk-sombra`, um `<span aria-hidden>` por aparelho, **por
  baixo** dele (`z-index:0`) e **dentro do invólucro** (nunca cortado):
  elipse via `radial-gradient(closest-side, rgba(0,0,0,.22), transparent)`,
  85% da largura do aparelho, `aspect-ratio: 1/0.16`.
- **Vídeo:** só os dois notebooks principais (IDF-BR e Ciere) tocam vídeo —
  o resto não leva `<video>`, porque o render já mostra a tela. `.mk__screen`
  reaproveita a classe `.device-screen` e os mesmos `data-device-video`/
  `-poster`, sem mudar `assets/js/device-media.js` além do `ResizeObserver`.
- **Entrada e hover (issue #92):** a entrada ao rolar (`device-enter`/
  `device-enter-pose` da #90, e o parelelismo de profundidade `corte9-
  profundidade` da #21) saiu junto com as figuras separadas que animava.
  `assets/css/mk-entrada.css` e `assets/js/mk-entrada.js` assumem a entrada via
  `[data-mk-colagem]`/`[data-mk-papel]`; o `index.html` só marca os atributos,
  nunca escreve `transform` nos `.mk`. O hover (`translateY` → `translate`,
  para não brigar com esse transform) migrou do `.mk` individual para o
  invólucro `[data-mk-colagem]` inteiro.
- **Validação:** `docs/design/mokker-validacao.html` (fora do `index.html` e
  do CI publicado) mostra os 3 ângulos com `?teste=1` trocando o vídeo por uma
  caixa magenta no mesmo quadrilátero, para medir vazamento e cobertura por
  pixel.

### Sistema de Movimento Integrado (Pesquisa #37, implementado na #21)

- **Duração Base:** **0,3s** (`--motion-base`) como valor heurístico padrão para transições temporais de interface (presente em 5 de 5 referências aprovadas e dominante em 3).
- **Entradas de carga com opacidade constante:** nome do wordmark, headline do herói (`.hero-headline`) e o grupo de CTA (`.hero-actions`) chegam com `translateY(8px → 0)` em 0,3s, sem passar por `opacity: 0`. Razão registrada no `PLANO-MOVIMENTO.md`: a #46 mediu o revelador genérico anterior escondendo 19 de 25 blocos em `opacity: 0` quando o disparo não alcançava o alvo a tempo; a opacidade constante elimina esse risco por construção. Cartões de credenciais e a descrição auxiliar do herói permanecem estáticos, sem entrada.
- **Exceções Funcionais Nomeadas:**
  1. *Controles Pressionados (`:active`):* pressão em **`--motion-press` (40ms)** com `scale(1 → 0.98)`; soltura em **`--motion-release` (100ms)**, propriedade separada do deslocamento (que continua em 0,3s).
  2. *Links de Navegação:* transição cromática em **`--motion-nav` (0,18s ease)** em repouso/hover (conforme `lp-final.html`).
  3. *Linhas de Tempo de Rolagem (`animation-timeline: view()`):* Permitida exclusivamente como melhoria progressiva contida em blocos `@supports`, restrita a gráficos e elementos narrativos e **nunca** ocultando texto ou dados em rolagem reversa.
  4. *Momento Expressivo (Curva do IDF):* Transição por `stroke-dashoffset` parametrizada à evidência científica, com especificação reservada para a issue #22.
  5. *Inversão cromática de primeiro plano/fundo (`.footer-top`), em 0s:* a troca simultânea de texto e fundo (`--ink` ↔ `--surface`) ocorre em 0s, e não nos 0,3s do deslocamento associado. Razão medida no `PLANO-MOVIMENTO.md` (E4): interpolando as duas cores em sRGB e aplicando a fórmula de contraste do WCAG 2.1 ao longo da transição simultânea, o contraste cai abaixo de 4,5:1 entre t≈0,26 e t≈0,74 (mínimo de 1,00:1 em t=0,50) — cerca de 48% do percurso esconderia o texto. A recomendação geral de `color 0.3s` cobre mudança simples de cor, não essa inversão de papéis entre duas cores.
  6. *Barra de Progresso de Leitura (Corte 9, issue #21):* linha de 2px fixa no topo, `var(--forest)`, `transform-origin: left` e `scaleX(0 → 1)` por `animation-timeline: scroll(root)`, contida em `@supports`; sem suporte ao recurso, fica `display: none` e não reserva espaço. `aria-hidden="true"`.
  7. *Seção Ativa na Nav (Corte 9, issue #21):* um `IntersectionObserver` (≤ 25 linhas de JS) marca `aria-current="true"` no link de Trabalhos (IDF-BR a Quantum), Experiência (Vivências) ou Sobre, conforme a seção visível; a cor usa o par `--ink`/`--muted` já existente, na mesma `--motion-nav` (0,18s). Sem JS, a nav continua como está.
  8. *Profundidade nas Telas Sobrepostas (Corte 9, issue #21):* a partir de 900px, a imagem de cima do IDF-BR (a tela do futuro) e da Ciere (o celular) desloca de `translateY(24px)` a `translateY(-24px)` enquanto a composição atravessa a tela, via `animation-timeline: view()` e `animation-range: cover`. A imagem de baixo não se move por essa timeline. O hover já existente nesses dois elementos passou de `transform` para `translate` — propriedade separada — para não brigar com a linha do tempo de rolagem. **Aposentado na issue #92:** as figuras independentes que animava (`.idf-screen-future`, `.ciere-shot-mobile`) saíram na colagem única; o `corte9-profundidade` foi removido do CSS.
  9. *Montagem da Fórmula do Quantum (Corte 9, issue #21):* ao entrar na tela (`animation-timeline: view()`, `animation-range: entry 0%–60%` por termo, com ~6% de atraso por termo), cada cartão anima `translateY(16px) → 0` e cada operador (+, =) `scale(0.6) → 1`. Opacidade constante em 1: as figuras são dado e nunca somem. O hover já existente no cartão passou de `transform` para `translate` pelo mesmo motivo do item 8.
  10. *Entrada das Fotos de Vivências (issue #86):* `.viv-photo > .viv-photo-motion > .viv-photo-card > picture > img` separa posição, movimento e pose. Dentro de `@supports (animation-timeline: view())` e `prefers-reduced-motion: no-preference`, o wrapper anima `translateY(12px → 0)` pela rolagem: atrás em `entry 0%–60%`, à frente em `entry 8%–68%`. A defasagem é 8% de progresso, não 100ms; a duração nominal da animação não representa tempo decorrido em `view()`. Foto e moldura movem juntas, com opacidade constante em 1. Hover apenas com ponteiro fino usa `translate: 0 -4px` no mesmo wrapper, em `--motion-base` (0,3s) / `--motion-enter`, separado do `transform` da timeline. Sem suporte ou sem JS, a pose final estática permanece visível; `reduce` neutraliza animação e translação do wrapper, preservando a rotação estrutural do card. Não há loop, escala flutuante ou movimento do texto.
  11. *Entrada dos Dispositivos (issue #90):* um `.device-enter` novo — o invólucro, nunca o `.laptop3d`/`.phone3d` que já recebe o `transform` do hover, nem o `.laptop3d-assembly`/`.laptop3d-apple` que já tem a rotação 3D da câmera — envolve cada notebook e iPhone (IDF-BR, DVO e Ciere). Dentro de `@supports (animation-timeline: view())` e `prefers-reduced-motion: no-preference`, anima `translateY(24px) rotateX(10deg) → translateY(0) rotateX(0deg)` em 0,6s `var(--motion-enter)`, com `animation-timeline: view()` e `animation-range: entry 0% entry 40%` — a pose final é o estado normal, sem animação. O iPhone de cada seção entra 80ms depois do notebook (`.device-enter--phone { animation-delay: 80ms }`). Só `transform`; opacidade constante em 1 (a captura e o vídeo nunca somem). Sem suporte ou com `reduce`, a pose final estática aparece direto. Não briga com os hovers 3D existentes (item 8) nem com o fade do pôster do vídeo (acima): são elementos e propriedades diferentes. **Substituído na issue #92** pelo item 12 — o `.device-enter` saiu do `index.html`.
  12. *Entrada da Colagem do Mokker (issue #92):* substitui o item 11. `assets/css/mk-entrada.css` e `assets/js/mk-entrada.js` animam `[data-mk-colagem]`/`[data-mk-papel="notebook"|"celular"]` — o `index.html` só marca os atributos, nunca escreve `transform` nos `.mk`. O hover por ponteiro fino migrou do `.mk` individual para o invólucro `[data-mk-colagem]` inteiro, em `translate` (não `transform`), para não brigar com essa entrada.
- **Acessibilidade (`prefers-reduced-motion: reduce`):** Neutralização total de durações temporais, timelines e translações espaciais. O conteúdo essencial permanece imediatamente visível em seu estado renderizado final, caminhos vetoriais estabelecidos em repouso definitivo e `scroll-behavior: auto`. Veda-se a aplicação genérica de `opacity: 1` indiscriminado ou abertura forçada de painéis colapsados.
- **Proibições Estruturais:**
  - Veto absoluto a `transition: all`. Todas as propriedades em transição devem ser declaradas nominalmente.
  - Proibição de transicionar propriedades de geometria de layout (`height`, `width`, `top`, `left`, etc.).
  - Remoção definitiva de `interpolate-size`.
  - Proibição de revelações em cascata que bloqueiem cliques, leitura ou navegação linear.

## Do's and Don'ts

### Do's (Faça)
- **Do:** Garanta conformidade com WCAG AA em todas as larguras de tela (mínimo de 4,5:1 para texto com tamanho computado < 24px e 3:1 para texto computado >= 24px).
- **Do:** Utilize o degrau 4 da escala (**16px**) como o único denominador normativo oficial para o cálculo da razão display/corpo do sistema.
- **Do:** Mantenha a duração base de **0,3s** para transições temporais de interface, documentando expressamente qualquer exceção funcional nomeada.
- **Do:** Trate os valores da marca Hut 8 conferidos no manual (páginas 16–17) e congelados no projeto pela issue #35 (`#0B0B0B`, `#6B0F9C`, `#8A8A8A`) como fixos e imutáveis, sem derivar variações ou inventar modulações.
- **Do:** Confine as paletas cromáticas dos projetos de clientes (IDF-BR, Ciere e DVO) exclusivamente ao escopo dos seus cartões e ilustrações de evidência técnica.
- **Do:** Adote `--muted` (`L = 0,505`) como o piso absoluto de contraste sobre `--surface`.
- **Do:** Declare a propriedade `color` explicitamente em todos os elementos interativos para impedir regressão ao `ButtonText` do navegador.
- **Do:** Respeite rigorosamente `prefers-reduced-motion: reduce`, zerando durações e translações enquanto preserva o conteúdo totalmente legível e acessível.

### Don'ts (Não Faça)
- **Don't:** **NUNCA** utilize o token `--sun` (`#F6ED6C`) como cor de texto sobre `--surface`. Sobre `--earth` é o único fundo escuro em que `sun` como texto está aprovado (8,37:1).
- **Don't:** **NUNCA** incorpore o verde `#A4DE02` da marca Hut 8 à paleta da landing page, por colisão cromática medida contra o antigo acid e reprovação de contraste.
- **Don't:** **NUNCA** utilize os tokens mortos `--light` (`#8A8E93`) e `--h8-photo` (`#2A2A28`) no código do produto.
- **Don't:** **NUNCA** recolora capturas de tela, diagramas ou figuras de dados reais de projetos de clientes, e nunca os utilize como planos de fundo de seção.
- **Don't:** **NUNCA** assente elementos textuais diretamente sobre imagens sem uma faixa sólida e opaca intermediária.
- **Don't:** **NUNCA** utilize pesos tipográficos 800 ou 900 (o teto do sistema é fixado no peso 700).
- **Don't:** **NUNCA** utilize a declaração genérica `transition: all`.
- **Don't:** **NUNCA** transicione propriedades de layout geométrico (`width`, `height`, `top`, `left`).
- **Don't:** **NUNCA** utilize `interpolate-size`.
- **Don't:** **NUNCA** aplique sombras projetadas pesadas (*drop shadows*) ou efeitos difusos de *glassmorphism*.
