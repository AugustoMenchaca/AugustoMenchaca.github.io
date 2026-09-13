---
name: Augusto Menchaca Personal Landing Page Design System
colors:
  primary: "{colors.charcoal}"
  paper: "#F7F5EF"
  stone: "#E8E3D9"
  white: "#FFFFFF"
  subtle: "#F1EEE6"
  charcoal: "#111213"
  body: "#343739"
  muted: "#626569"
  on-dark: "#9A9DA1"
  acid: "#E6F835"
  oxblood: "#5A2232"
  wine: "#F1E6E8"
  h8-black: "#0B0B0B"
  h8-purple: "#6B0F9C"
  h8-gray: "#8A8A8A"
  hair: "rgba(17, 18, 19, 0.13)"
  hair-strong: "rgba(17, 18, 19, 0.28)"
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

A paleta é composta estritamente pelos tokens ativos declarados no bloco `:root` de `wireframes/lp-final.html`, estruturada em superfícies neutras tingidas, neutros escuros para tipografia, acentos pontuais e as cores institucionais da marca Hut 8.

- **Superfícies:** `paper` (`#F7F5EF`), `stone` (`#E8E3D9`), `white` (`#FFFFFF`) e `subtle` (`#F1EEE6`). Apresentam croma medido em OKLCH de `C <= 0,014`, situando-se rigorosamente na faixa de neutros tingidos observada nas referências aprovadas.
- **Tipografia e Neutros:** `charcoal` (`#111213`) como elemento principal de contraste e hierarquia escura; `body` (`#343739`) para texto corrido e blocos de leitura; `muted` (`#626569`) como piso de contraste para textos utilitários e metadados; `on-dark` (`#9A9DA1`) restrito exclusivamente a textos sobre superfícies escuras.
- **Acentos:** `acid` (`#E6F835`) como ativador visual de alto contraste sobre fundos escuros; `oxblood` (`#5A2232`) e `wine` (`#F1E6E8`) para ênfases cromáticas profundas e superfícies editoriais complementares.
- **Sistema Hut 8:** `h8-black` (`#0B0B0B`), `h8-purple` (`#6B0F9C`) e `h8-gray` (`#8A8A8A`), reproduzindo as especificações do manual de marca da empresa júnior.
- **Hairlines:** Linhas divisórias estruturais finas baseadas em transparência controlada do neutro escuro: `hair` (`rgba(17, 18, 19, 0.13)`) e `hair-strong` (`rgba(17, 18, 19, 0.28)`).

### Tokens Mortos Fora do Sistema (Decisão D3)

Os tokens `--light` (`#8A8E93`) e `--h8-photo` (`#2A2A28`), embora permaneçam fisicamente no bloco `:root` de `wireframes/lp-final.html` até a deliberação do Gate D, **não fazem parte do sistema de design** e estão expurgados do frontmatter e do uso em produção. A pesquisa #35 comprovou que ambos possuem zero ocorrências na peça atual. O token `--light` reprova os critérios de acessibilidade sobre superfícies claras (2,58:1 sobre stone e 2,84:1 sobre subtle). O token `--h8-photo` possui procedência falsa de marca: o manual institucional da Hut 8 especifica o preto-tecido como `#1F1F1D` (RGB 31 31 29), valor ausente no repositório.

### Limiar de Contraste e Tamanho Computado (Decisão D2)

A conformidade com WCAG 2.1 AA é mandatória em todos os pares da interface:
- Texto com **>= 24px** (ou **>= 18,66px** quando em peso negrito >= 700) submete-se ao limiar relaxado de **3:1**.
- Texto abaixo desses limites submete-se estritamente ao limiar de **4,5:1**.
- Os degraus 1 e 2 da escala tipográfica enquadram-se na faixa de 3:1 em todas as larguras; os degraus 3, 4 e 5 submetem-se sempre a 4,5:1.

**Regra mandatória por largura:** O limiar de contraste está vinculado ao **tamanho efetivamente computado naquela largura**, e não ao degrau nominal da escala. Com o uso de funções `clamp()`, pares de cor que atendem ao critério a 1440px podem reprovar a 390px se a fonte computada encolher para menos de 24px. A auditoria de contraste é individual por largura (issue #24).

### Regras Normativas de Cor (R1 a R7)

- **R1 — Lei de Contraste do Acid:** O token `--acid` (`#E6F835`) **NUNCA** pode ser utilizado como cor de texto sobre superfícies claras (`paper` 1,08:1; `stone` 1,09:1; `white` 1,18:1; `subtle` 1,02:1). Seu uso é permitido exclusivamente como texto sobre `--charcoal` (15,93:1) ou como plano de fundo contendo texto em `--charcoal` (15,93:1) ou `--muted` (4,98:1).
- **R2 — Verde da Marca Hut 8 Fora da LP:** O verde `#A4DE02` da marca Hut 8 permanece fora da paleta da landing page. A medição instrumental comprovou proximidade perceptual excessiva com o acid (`ΔH = 11,2°` e `ΔC = 0,012`), pertencendo à mesma família cromática e incorrendo na mesma inviabilidade de contraste sobre superfícies claras (1,26:1 a 1,61:1).
- **R3 — Marca Hut 8 Congelada:** Os valores institucionais da Hut 8 (`#0B0B0B`, `#6B0F9C`, `#8A8A8A` e externamente `#A4DE02`) são fixos e invioláveis. Não admitem modulação de matiz, saturação ou luminosidade.
- **R4 — Confinamento das Paletas de Projetos Reais:** As identidades visuais de projetos reais entram como restrição externa, com os valores medidos nas capturas reais: **IDF-BR** navy `rgb(13,27,42)`; **Ciere** creme `rgb(243,236,220)`, marrom `rgb(77,54,28)` e dourado `rgb(206,145,0)`. O **DVO** não possui token estável: o azul de oficina vem de fotografia e varia por imagem, então nenhum valor é normativo — a peça entra como é e nada se deriva dela. Ficam confinadas ao campo visual de evidência técnica (cartões e ilustrações de produto) e **nunca** viram fundo de seção. Capturas de tela e dados reais jamais são recoloridos; superfícies adjacentes (molduras, legendas e planos de seção) acomodam-se à imagem original.
- **R5 — Piso de Contraste no Neutro:** Nenhuma cor com luminosidade superior a `--muted` (`L = 0,505` em OKLCH) pode ser empregada como texto sobre fundos claros. Essa restrição veda expressamente o uso de `--light` (`L = 0,645`), `--on-dark` (`L = 0,695`) e `--h8-gray` (`L = 0,633`) sobre `paper`, `stone`, `white` e `subtle`.
- **R6 — Vedação de Texto Direto sobre Imagem:** Nenhum elemento textual pode assentar diretamente sobre imagens ou capturas sem uma faixa sólida e opaca intermediária, assegurando mensurabilidade determinística de contraste.
- **R7 — Fechamento do Sistema contra Cores Não Tokenizadas:** Todo elemento interativo deve declarar a propriedade `color` explicitamente no CSS, impedindo quedas omissivas em valores nativos do agente de usuário (como o `ButtonText` `#000000` detectado no controle `.rail-pause`).

### Orçamento de Área do Croma Alto (R8)

O contraste diz **onde** uma cor pode aparecer; o orçamento diz **quanto** dela pode
aparecer. Os dois são necessários, e o segundo foi o que a medição isolou como a
gramática das peças aprovadas.

- **A regra:** a gramática do sistema é *campo grande de neutro + acento mínimo de
  croma alto*, e ela pressupõe que o croma alto ocupe **da ordem de 1% da área
  pintada**. Passar disso não é questão de gosto: descaracteriza a gramática que a
  amostra aprovada exibe.
- **Consequência operacional direta:** **nenhum degrau de display carrega croma.**
  Os degraus 1 e 2 (`h1` e suas variantes por largura, e `h2`) são sempre neutros.
  Uma headline tingida, em qualquer largura, rompe o orçamento sozinha — um título
  de 144px colorido é área, não acento.
- **Como conferir:** medir a fração da área com croma alto por viewport, não por
  componente. O instrumento da #35 já faz essa leitura; a auditoria por largura é da
  #24.
- **O que o orçamento não é:** limite de quantidade de ocorrências. Duas marcas
  minúsculas de acid e um campo grande tingido têm a mesma contagem e orçamentos
  opostos.

### Auditoria da Peça e Margens Críticas

A auditoria de `wireframes/lp-final.html` apurou 242 elementos com texto próprio distribuídos em 34 pares distintos, com **zero reprovações de AA** e zero texto sobre imagem. A peça apresenta dois pares em margem fina que exigem preservação rigorosa sem clareamento:
- `muted` sobre `stone`: **4,58:1** (margem de 0,08 sobre o limiar de 4,5:1, em 14 ocorrências entre 11 e 14px).
- `muted` sobre `acid`: **4,98:1** (limiar 4,5:1, em 2 ocorrências a 11px).

As escolhas específicas de matiz (creme `#F7F5EF`, amarelo-ácido em `H = 115,1°` e vinho em `H = 4,8°`) representam escolhas estéticas herdadas do briefing inicial que satisfazem as restrições medidas, sem constituírem por si variáveis de classificação de aprovação.

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
- `.slab-dark`: Fundo em `--charcoal` com texto em `--on-dark` e títulos em `--paper`.
- `.slab-hut8`: Fundo em `--h8-black` com títulos em `#FFFFFF`.
- `.slab-stone`: Fundo em `--stone` com texto e títulos em `--charcoal`.
- `.slab-oxblood`: Fundo em `--oxblood` com texto e títulos em `--wine` e `#FFFFFF`.

A medição das 16 referências comprovou que contagem de bandas escuras (0 a 7 em aprovados vs 0 a 3 em rejeitados) e fração de área escura (0 a 0,945 vs 0 a 1,0) constituem variáveis estatisticamente nulas. A alternância de faixas existe para clareza visual e ritmo de leitura, e não como tentativa de satisfação de preferência cromática.

### Lacuna de Tokens de Espaçamento Declarada

Registra-se que uma escala modular discreta de espaçamento relativo (como patamares fixos de 4px, 8px, 16px, 24px, 32px e 64px para margens e entre-colunas) **não está definida** nas fontes de referência nem no `:root`. Apenas os três tokens de contêiner e preenchimento fluido acima possuem definição normativa.

## Elevation & Depth

A profundidade no sistema é plana e arquitetural, construída por contraste tonal direto e linhas milimétricas, sem recurso a sombras projetadas (*drop shadows*) ou efeitos de translucidez difusa (*glassmorphism*).

- **Camadas Tonais:** A distinção de planos é conferida pela justaposição de blocos maciços de cor (`paper`, `stone`, `charcoal`, `h8-black`, `oxblood`).
- **Hairlines Estruturais:** Separação entre seções, cabeçalhos de tabelas e contornos de cartões executada por linhas de 1px com transparência calibrada: `--hair` (`rgba(17, 18, 19, 0.13)`) para divisões gerais de baixo peso visual e `--hair-strong` (`rgba(17, 18, 19, 0.28)`) para fronteiras ativas.
- **Indicador de Foco Acessível:** `outline: 2px solid var(--charcoal); outline-offset: 3px;` sobre planos claros; `outline-color: var(--acid);` sobre superfícies escuras. O indicador é estático e imediato, sem atraso de transição ou deslocamento.
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

### Botões (`.btn`)
- **Tipografia:** `IBM Plex Mono`, tamanho 0.72rem (~11,5px), peso 600, `letter-spacing: 0.1em`, caixa alta.
- **Estrutura:** `padding: 13px 22px; border-radius: 3px; border: 1px solid var(--charcoal); display: inline-flex; align-items: center; gap: 9px;`.
- **Cores:** Fundo em `var(--acid)`, texto e ícones em `var(--charcoal)`. Variante Ghost com fundo transparente.
- **Estados:** Hover com `transform: translateY(-2px)` e transição de 0,3s ease; estado `:active` com compressão `scale(0.98)` de resposta imediata (0–50ms) e retorno em até 0,1s.

### Rótulos Técnicos e Pílulas (`.meta-label`, `.pill`)
- **`.meta-label`:** Tipografia `IBM Plex Mono`, tamanho 0.7rem (~11px), peso 500, `letter-spacing: 0.12em`, caixa alta, cor `var(--muted)`. Variante em fundo escuro com cor `var(--on-dark)`.
- **`.pill`:** Tipografia `IBM Plex Mono`, tamanho 0.62rem (~10px), peso 600, `letter-spacing: 0.09em`, caixa alta, `padding: 4px 9px; border-radius: 3px; border: 1px solid var(--hair-strong); background: var(--subtle); color: var(--charcoal);`. Variante em fundo escuro com fundo transparente, borda `rgba(247, 245, 239, 0.28)` e texto `var(--on-dark)`.

### Trilho Editorial (`.rail-section`)
- **Mecanismo:** Visualização contínua com rolagem linear automática de 46s (`@keyframes rail-scroll`), com pausa obrigatória ativada por `:hover`, `:focus-within` e controle manual.
- **Controle de Pausa (`.rail-pause`):** Botão técnico com tipografia `IBM Plex Mono`, peso 600, tamanho 0.6rem, caixa alta, borda em `var(--hair-strong)`. Em estrito cumprimento da regra R7, deve declarar explicitamente `color: var(--charcoal)` para vedar queda no valor nativo `#000000`.
- **Cartões (`.rail-item`):** Dimensões de 186px de largura e mínimo de 82px de altura, `border-radius: 10px`, `padding: 12px 14px;`, fundo branco ou tonal (`var(--white)`, `var(--subtle)`, `var(--charcoal)`, `var(--acid)`, `var(--wine)`). Hover com `transform: translateY(-3px)`.

### Faixas Estruturais (`.slab`)
- Seções de sangria total com preenchimento vertical de `clamp(34px, 4.4vw, 60px) 0`, contendo o alinhamento da grade via contêiner central.

### Sistema de Movimento Integrado (Pesquisa #37)

- **Duração Base:** **0,3s** como valor heurístico padrão para transições temporais de interface (presente em 5 de 5 referências aprovadas e dominante em 3).
- **Exceções Funcionais Nomeadas:**
  1. *Controles Pressionados (`:active`):* Resposta imediata em 0–50ms com `scale(1 → 0.98)` e retorno em até 0,1s.
  2. *Links de Navegação:* Transição cromática de 0,18s ease em repouso/hover (conforme `lp-final.html`).
  3. *Linhas de Tempo de Rolagem (`animation-timeline: view()`):* Permitida exclusivamente como melhoria progressiva contida em blocos `@supports`, restrita a gráficos e elementos narrativos e **nunca** ocultando texto ou dados em rolagem reversa.
  4. *Momento Expressivo (Curva do IDF):* Transição por `stroke-dashoffset` parametrizada à evidência científica, com especificação reservada para a issue #22.
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
- **Do:** Trate as cores institucionais da marca Hut 8 (`#0B0B0B`, `#6B0F9C`, `#8A8A8A`) como valores fixos, congelados e imutáveis.
- **Do:** Confine as paletas cromáticas dos projetos de clientes (IDF-BR, Ciere e DVO) exclusivamente ao escopo dos seus cartões e ilustrações de evidência técnica.
- **Do:** Adote `--muted` (`L = 0,505`) como o piso absoluto de contraste sobre superfícies claras.
- **Do:** Declare a propriedade `color` explicitamente em todos os elementos interativos para impedir regressão ao `ButtonText` do navegador.
- **Do:** Respeite rigorosamente `prefers-reduced-motion: reduce`, zerando durações e translações enquanto preserva o conteúdo totalmente legível e acessível.

### Don'ts (Não Faça)
- **Don't:** **NUNCA** utilize o token `--acid` (`#E6F835`) como cor de texto sobre superfícies claras (`paper`, `stone`, `white`, `subtle`).
- **Don't:** **NUNCA** incorpore o verde `#A4DE02` da marca Hut 8 à paleta da landing page, por colisão cromática medida contra o acid e reprovação de contraste.
- **Don't:** **NUNCA** utilize os tokens mortos `--light` (`#8A8E93`) e `--h8-photo` (`#2A2A28`) no código do produto.
- **Don't:** **NUNCA** recolora capturas de tela, diagramas ou figuras de dados reais de projetos de clientes, e nunca os utilize como planos de fundo de seção.
- **Don't:** **NUNCA** assente elementos textuais diretamente sobre imagens sem uma faixa sólida e opaca intermediária.
- **Don't:** **NUNCA** utilize pesos tipográficos 800 ou 900 (o teto do sistema é fixado no peso 700).
- **Don't:** **NUNCA** utilize a declaração genérica `transition: all`.
- **Don't:** **NUNCA** transicione propriedades de layout geométrico (`width`, `height`, `top`, `left`).
- **Don't:** **NUNCA** utilize `interpolate-size`.
- **Don't:** **NUNCA** aplique sombras projetadas pesadas (*drop shadows*) ou efeitos difusos de *glassmorphism*.
