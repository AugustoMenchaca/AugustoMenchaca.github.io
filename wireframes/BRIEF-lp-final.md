# BRIEF — Landing page final (Augusto Menchaca)

**Fonte de verdade visual:** `wireframes/prototipo-c.html` (Direção C, APROVADA).
**Entregável:** `wireframes/lp-final.html` — página completa, alta fidelidade, single file.

Expandir o sistema existente. NÃO reinventar. Proibido: nova paleta, nova
tipografia, novos wireframes, cobalt blue, redesign do Hero, redesign do IDF-BR.

---

## 1. TOKENS — copiar literalmente do protótipo

```
--paper #F7F5EF   --stone #E8E3D9   --white #FFFFFF   --subtle #F1EEE6
--charcoal #111213   --slab-inner #1A1B1C
--body #343739   --muted #626569   --light #8A8E93   --on-dark #9A9DA1
--acid #E6F835   --oxblood #5A2232   --wine #F1E6E8
--h8-black #0B0B0B   --h8-purple #6B0F9C   --h8-gray #8A8A8A
--f-display 'Instrument Sans'   --f-body 'Inter'   --f-mono 'IBM Plex Mono'
--container 1240px   --slab-radius 28px
```

### LEI DE CONTRASTE (não negociável)
`#E6F835` NUNCA é texto sobre paper/stone/white/wine (~1.1:1). Acid só como
(a) fundo com texto charcoal, ou (b) texto/traço/ponto sobre charcoal ou oxblood.
Oxblood é válido como texto sobre paper/white/stone. Wine é válido sobre oxblood.

### Pesos
Hero 700 · enunciados editoriais 600 · títulos de projeto 700 · corpo Inter 400 ·
ênfase Inter 500 · metadados IBM Plex Mono 500. **Nada acima de 700.**

### Caixa alta
Manter em: metadados, nav, índices de seção, rótulos técnicos, badges, pills.
Enunciados editoriais em sentence case. Hero permanece uppercase.

---

## 2. RITMO DE SEÇÃO — a laje é linguagem, não obrigação

Proibido: slab / slab / slab idênticos. Alternância obrigatória:

| # | Seção | Superfície |
|---|-------|-----------|
| — | Nav | paper, hairline inferior |
| 01 | Hero | paper aberto (sem laje) |
| 02 | Currently | paper aberto, meta strip |
| 03 | Editorial rail | paper aberto, trilho contínuo |
| 04 | Selected work — intro | paper aberto |
| 04.1 | **IDF-BR** | **LAJE CHARCOAL** (a maior de todas) |
| 04.2 | **DVO** | seção clara aberta — stone + cards white |
| 04.3 | **Ciere** | **LAJE WHITE**, cores reais do projeto aparecem |
| 04.4 | **Quantum ML** | **LAJE OXBLOOD** |
| 05.1 | **NIP** | paper aberto + composição fotográfica |
| 05.2 | **Hut 8** | **LAJE BLACK** (sistema próprio) |
| 06 | Research & exploration | paper aberto, leve |
| 07 | About | **LAJE STONE** |
| 08 | Contact | paper aberto, CTA acid |
| — | Footer | paper |

### Hierarquia de Selected Work
IDF-BR é visivelmente maior (mais altura, mais visuais, mais dados). DVO, Ciere e
Quantum ML são menores e equivalentes entre si — mas com tratamentos diferentes.

---

## 3. REGRAS DE PRECISÃO DE CONTEÚDO (CRÍTICO)

**Não inventar** datas, métricas, publicações, papéis, autoria, tecnologias,
resultados de cliente, tamanho de time ou números de performance.

Correções obrigatórias em relação ao protótipo:
- As métricas atuais do IDF-BR (`5,000+`, `<100ms`, `27`) são **ilustrativas e
  inventadas**. Substituir por `[ VERIFIED METRIC REQUIRED ]` ou remover.
- **DVO:** Augusto NÃO desenvolveu frontend nem backend.
- **Ciere:** Augusto NÃO foi designer exclusivo nem design lead. Havia liderança
  de design. Ele foi a ponte cliente ↔ design ↔ dev.
- **Quantum ML:** projeto acadêmico. NÃO é paper publicado. Sem venue, sem DOI.
- **NIP:** não afirmar IA de previsão de cheias em produção.
- Única data factual permitida: **janeiro de 2026, formação sobre IA aplicada a
  recursos hídricos, em Minas Gerais.** Nenhuma outra data.

---

## 4. CONTEÚDO POR SEÇÃO (usar literalmente)

### NAV
`AUGUSTO MENCHACA` · WORK · EXPERIENCE · ABOUT · CV · `LET'S TALK ↗` (botão acid).

### 01 — HERO (preservar composição atual)
- Sobrelinha: `HEY, I'M AUGUSTO.`
- H1 (uppercase, Instrument Sans 700):
  `I BUILD DIGITAL PRODUCTS AND LEAD TECH PROJECTS.`
- Lede: `Computer Science student at UFPel working across software, scientific computing, project leadership and applied AI.`
- Ações: `VIEW MY WORK` (acid) · `LET'S TALK` (ghost)
- Retrato: `[ AUGUSTO PORTRAIT ]`, ratio 3/4, radius 24px.

### 02 — CURRENTLY (meta strip, 3 colunas)
```
UNDERGRADUATE RESEARCHER
Núcleo Integrado de Previsão · UFPel
Scientific software, water resources and applied AI.

DIRECTOR OF PROJECTS
Hut 8 · UFPel
Leading client projects from discovery to delivery.

COMPUTER SCIENCE UNDERGRADUATE
Federal University of Pelotas.
```
Sem datas.

### 03 — EDITORIAL RAIL (preservar exatamente)
7 itens + duplicata para o loop. Ritmo `charcoal · acid · oxblood · paper ·
white · paper · white`. Manter marquee 46s, pause no hover, `prefers-reduced-motion`
→ vira overflow-x manual. Mobile: swipe horizontal. Não virar carousel SaaS.
Itens: IDF-BR · HUT 8 JR. · QUANTUM ML · NIP · UFPEL · DVO PELOTAS · CIERE DA ROSA · UFPEL.

### 04.1 — IDF-BR (FLAGSHIP, laje charcoal)
- URL: https://www.idf-br.com.br/home/index.html
- H2: `Turning nationwide hydrological research into a usable digital tool.`
- Papel: o time científico definiu dados, equações, outputs e conteúdo. Augusto
  respondeu pela camada de software: escolha de ferramentas, decisões técnicas,
  arquitetura, estrutura da aplicação, fluxo, UI/UX, transformação de planilhas
  em JSON, implementação e deploy.
- Diagrama de narrativa (visual, não lista):
  `SCIENTIFIC RESEARCH → RAW DATA → STRUCTURED DATA → SOFTWARE → USABLE PRODUCT`
- Visuais: `[ IDF-BR REAL INTERFACE ]` grande + `[ IDF-BR DETAIL SCREENSHOT ]`
  menor + os dois SVGs já existentes (mapa e curvas) preservados literalmente.
- Representação spreadsheet → JSON é bem-vinda como diagrama.
- Métricas: `[ VERIFIED METRIC REQUIRED ]`. **Nenhum número.**
- Proibido mockup de MacBook decorativo.

### 04.2 — DVO (seção clara, linguagem de PROCESSO)
- URL: https://dvopelotas.com.br/
- H2: `Taking a client project from requirements to production.`
- **Augusto não desenvolveu o sistema.** Deixar explícito e sem constrangimento.
- Fluxo como principal elemento gráfico, horizontal no desktop e vertical no mobile:
  `CLIENT → REQUIREMENTS → SCOPE → PRICING → SQUAD → QA → INFRASTRUCTURE → PRODUCTION`
- Responsabilidades: reuniões, requisitos, escopo, preço, proposta, acompanhamento,
  apoio ao gerente, QA com cliente, database, bucket/storage, deploy de API,
  deploy de frontend.
- Visual: `[ DVO PRODUCT SCREENSHOT ]` grande + pequeno diagrama de infraestrutura.
- Superfícies: paper/stone/white/charcoal. Acid apenas pontual. **Não repetir laje preta.**

### 04.3 — CIERE DA ROSA (laje white, cores reais do projeto)
- URL: https://advocaciacieredarosa.com.br/
- H2: `Connecting client needs, design decisions and development.`
- Papel: comercial, discovery, requisitos, escopo, relacionamento com cliente,
  ponte cliente↔design, ponte design↔dev, QA, SEO, deploy.
  **Não apresentar como design lead** — havia liderança de design.
- Relação central como diagrama: `CLIENT ↕ AUGUSTO ↙↘ DESIGN / DEV`
- Visual: `[ CIERE WEBSITE DESKTOP ]` + `[ CIERE MOBILE DETAIL ]`.
- **Deixar as cores reais do projeto aparecerem.** Nenhum filtro ou tint global.

### 04.4 — QUANTUM ML (laje oxblood, menor)
- H2: `Testing when quantum machine learning actually makes a difference.`
- Categorias: Machine Learning · Quantum Computing · Experimental Research.
- Projeto acadêmico. **Não é produto. Não é paper publicado.**
- Pergunta central (destacada como citação):
  `Does QML perform better simply because it uses quantum representations, or does performance depend on the alignment between data, feature maps and kernels?`
- Comparação em duas colunas:
  - REAL DATA — Breast Cancer Wisconsin → *Classical SVM and the quantum configuration achieved comparable results in the controlled representation. No clear quantum advantage.*
  - SYNTHETIC DATA — Qiskit `ad_hoc_data` → *The quantum model performed extremely well, but the dataset was designed around a compatible quantum representation.*
- Modelos: Classical SVM · QSVC · Quantum kernels.
- Fecho: `DATA + REPRESENTATION + FEATURE MAP + KERNEL = OUTCOME`
- Nunca afirmar "Quantum ML is better".
- Protagonista é a informação. Sem screenshot de Jupyter como visual principal.
- Foto opcional secundária: `[ QUANTUM ACADEMIC CONTEXT PHOTO ]`.

### 05.1 — NIP (paper aberto + fotografia)
- H2: `From scientific software to applied AI research.`
- NIP responde "como minha pesquisa evolui", IDF-BR responde "o que eu construí".
  Não confundir os dois.
- Narrativa: `SCIENTIFIC SOFTWARE → IDF-BR → AI APPLIED TO WATER RESOURCES →
  EXPERIMENTATION → RESEARCH → PAPERS → FUTURE PUBLIC-FACING TOOLS`
- Conteúdo: entrou como undergraduate research fellow; primeiro grande trabalho
  foi o IDF-BR; começou em research → software; em **janeiro de 2026** participou
  em Minas Gerais de formação sobre aplicação de IA em recursos hídricos; depois
  disso o trabalho se aproximou de machine learning, recursos hídricos,
  experimentação e escrita acadêmica. Objetivo de longo prazo: transformar
  pesquisa útil em ferramentas que cheguem a pessoas fora da universidade.
- Fotografia encorajada: `[ NIP RESEARCH / TEAM PHOTO ]` + opcional
  `[ NIP FIELD / EVENT PHOTO ]`. Máximo 2. Não virar galeria.
- Misturar fotografia com informação científica (snippet, diagrama, anotação).

### 05.2 — HUT 8 (laje black, sistema próprio — PRESERVAR)
- Preservar praticamente a seção atual do protótipo, incluindo a composição
  fotográfica com sobreposição, os chips roxos, a figcaption e o texto.
- H2: `Learning to make projects happen through people, not just code.`
- Sistema: `#0B0B0B` · `#6B0F9C` · `#8A8A8A` · branco. **Acid não entra aqui.**
- Narrativa: entrou buscando experiência prática; a Hut passou por baixa
  atividade; a continuidade da organização estava ameaçada; assumiu
  responsabilidade antes de se sentir preparado; aprendeu clientes, requisitos,
  escopo, precificação, squads, liderança, coordenação design-dev, QA,
  infraestrutura e entrega.
- **Não criar founder story nem narrativa heroica.** É responsabilidade,
  aprendizado e pessoas.
- Fotos em cores reais. Sem duotone, sem overlay roxo/verde, sem filtro escuro.
- Pode ganhar uma terceira foto de apoio: `[ HUT 8 EVENT PHOTO ]`.

### 06 — RESEARCH & EXPLORATION (paper, leve)
- H2: `What I'm trying to understand next.`
- Apoio: `Some projects start with a product to build. Others start with a question worth investigating.`
- Três áreas (NÃO é seção de skills, NÃO listar Python/React/Qiskit como cards):
  - `APPLIED AI & WATER RESOURCES` — Exploring how machine learning can support research in hydrology and water resources through my work at NIP.
  - `MACHINE LEARNING` — Interested not only in model performance, but in data, representation, evaluation and understanding why an approach works.
  - `EMERGING / EXPERIMENTAL COMPUTING` — Using academic and personal experiments to understand where new computational approaches actually make sense.
- Visual leve: pequenos diagramas ou anotações. Não disputar com Selected Work.

### 07 — ABOUT (laje stone)
- H2: `I'm interested in what happens between "we have a problem" and "this actually works."`
- Copy (4 parágrafos, usar literalmente):
  1. `I'm a Computer Science student at UFPel, and most of what has shaped the way I work has happened when technology had to meet a real problem.`
  2. `At NIP, that means turning research into software and studying applied AI. At Hut 8, it means turning client needs into projects that teams can actually deliver.`
  3. `The context changes, but the part I enjoy remains the same: understanding an unclear problem and gradually turning it into something useful.`
  4. `I'm still early in my career, and I want to keep deepening my technical foundation while becoming better at making decisions, communicating clearly and helping people build together.`
- Foto contextual opcional: `[ ABOUT CONTEXT PHOTO ]` — **não repetir o retrato do Hero.**

### 08 — CONTACT
- H2: `Have a problem worth building around?`
- Copy: `I'm open to conversations about software, applied AI, research, technology projects and new opportunities.`
- Ações: EMAIL (acid, primária) · LINKEDIN · GITHUB · CV.
- E-mail real: `adcmenchaca@inf.ufpel.edu.br`. LinkedIn/GitHub/CV → `href="#"` com
  comentário `<!-- URL a confirmar -->`. Não inventar URLs de perfil.

### 09 — FOOTER
```
AUGUSTO MENCHACA
Computer Science · Pelotas, Brazil
Building software, researching AI and learning how to lead better projects.
LinkedIn · GitHub · Email · CV
© 2026 Augusto Menchaca
```

---

## 5. PLACEHOLDERS — nomenclatura obrigatória

Nunca escrever apenas "PHOTO HERE". Cada slot é uma composição com moldura
tracejada, chip identificando o asset e uma linha de orientação de enquadramento.

```
[ AUGUSTO PORTRAIT ]            [ IDF-BR REAL INTERFACE ]
[ IDF-BR DETAIL SCREENSHOT ]    [ DVO PRODUCT SCREENSHOT ]
[ CIERE WEBSITE DESKTOP ]       [ CIERE MOBILE DETAIL ]
[ QUANTUM EXPERIMENT VISUAL ]   [ QUANTUM ACADEMIC CONTEXT PHOTO ]
[ NIP RESEARCH / TEAM PHOTO ]   [ NIP FIELD / EVENT PHOTO ]
[ HUT 8 TEAM PHOTO ]            [ HUT 8 EVENT PHOTO ]
[ ABOUT CONTEXT PHOTO ]
```

Chip de placeholder por contexto: fundo charcoal + texto acid em superfície clara;
fundo roxo + texto branco dentro da laje Hut 8. Moldura sempre tracejada, para
ler inequivocamente como pendente.

Regra global de fotografia: toda foto responde "o que esta imagem acrescenta à
história?". Se a resposta for só "fica mais bonito", não usar. Proibido stock,
pessoa gerada por IA, foto genérica de laptop, reunião falsa.

Os slots devem aceitar `<img>` no lugar do placeholder sem alterar o layout —
`aspect-ratio` e `border-radius` já definidos no contêiner.

---

## 6. MOTION

Permitido e controlado. Sempre atrás de `@media (prefers-reduced-motion: reduce)`.
- Rail: movimento contínuo lento (já aprovado), pause no hover.
- Hero: revelação de texto contida.
- IDF: reveal do ponto ativo / data points.
- DVO: progressão do fluxo de processo.
- Quantum: reveal da comparação de resultados.
- Fotos: crop/reveal sutil.

Proibido: scroll hijacking, partículas, parallax aleatório, efeitos de cursor,
animação em tudo. Usar IntersectionObserver, nunca bibliotecas externas.

---

## 7. RESPONSIVO

Construir de fato, não só encolher. Breakpoints 1024 / 860 / 560.
- Rail → swipe / overflow horizontal.
- Fluxo DVO → vertical.
- Comparação Quantum → empilhada.
- Fotos Hut 8 → dominante + apoio, principal sempre dominante.
- NIP → composição editorial empilhada.
- Headlines → preservar hierarquia sem overflow.
- Nenhuma informação importante pode depender só de hover.

---

## 8. ACESSIBILIDADE

HTML semântico (`header`/`nav`/`main`/`section`/`article`/`figure`/`footer`),
hierarquia de headings lógica e sem pulos, `alt` descritivo em todo slot de
imagem, navegação por teclado, foco visível (`:focus-visible` com contorno acid
sobre superfície escura e charcoal sobre clara), contraste conforme a lei acima,
`prefers-reduced-motion` respeitado. Duplicatas do rail com `aria-hidden="true"`
e `tabindex="-1"`.

---

## 9. ENTREGÁVEL

Arquivo único `wireframes/lp-final.html`. Sem build, sem dependências externas
além das Google Fonts já usadas. CSS inline no `<head>`, JS inline no fim do
`<body>`. Comentários de seção no mesmo estilo do protótipo.

Ao final, listar `ASSETS NEEDED` numerada com exatamente as imagens reais
necessárias.

---

# 10. CORREÇÕES PÓS-VALIDAÇÃO (OBRIGATÓRIAS — precedem tudo acima)

Resultado da revisão adversarial. Onde conflitar com as seções 1-9, **isto vence**.

## 10.1 SVGs do IDF — remover dado inventado
`Pelotas #83985` é um ID de estação INVENTADO. Remover.
Preservar a geometria dos dois SVGs, mas torná-los explicitamente esquemáticos:
- Rótulo da estação ativa → `SELECTED STATION` (sem número, sem cidade).
- Legenda do gráfico → manter `T = 100 / 50 / 10 yr` (conceito padrão de hidrologia,
  não é dado do produto), mas adicionar `SCHEMATIC` como pill no cabeçalho dos dois cards.
- `Status: active solver` → `METHOD` (rótulo neutro).
- Nenhum número que descreva o produto real.

## 10.2 Quantum ML — sem gráfico fabricado
A copy qualitativa fornecida pelo cliente é mantida literalmente. **Mas não gerar
gráfico, tabela de resultados, barra ou número.** `[ QUANTUM EXPERIMENT VISUAL ]`
é moldura tracejada vazia com chip, como qualquer outro placeholder.

## 10.3 DVO — autoria explícita
Incluir uma linha visível, não escondida em rodapé:
`The system was built by the Hut 8 squad. My role was coordination, scoping and delivery support.`
Descrever database/bucket/deploy como **coordenação e configuração**, nunca como
autoria de engenharia.

## 10.4 Ajustes de copy
- `PAPERS` → `ACADEMIC WRITING` no fluxo do NIP.
- `© 2026` é permitido (ano de copyright não é afirmação factual sobre trabalho).

## 10.5 LEI DE CONTRASTE — foregrounds que faltavam

**Laje oxblood (Quantum):** fundo `#5A2232`.
- Headline → `#FFFFFF`
- Corpo → `--wine #F1E6E8` (≈10.07:1). **NUNCA** `--body`, `--muted` ou `--charcoal`
  (1.02:1 / 2.10:1 / 1.53:1 — reprovados).
- Acid só como chip preenchido com texto charcoal, ou ponto/traço pequeno.

**Acid em superfície clara (DVO, Ciere, research, contact):**
proibido acid como texto, ponto ou régua diretamente sobre paper/stone/white
(1.08:1 / 1.09:1 / 1.18:1). Acid ali só existe como:
(a) chip/botão preenchido de acid com texto `--charcoal`, ou
(b) marca sobre uma micro-superfície charcoal.
A régua acid das métricas continua válida **apenas** dentro da laje charcoal.

**Roxo Hut 8 sobre preto:** `#6B0F9C` sobre `#0B0B0B` = 2.04:1, abaixo de 3:1.
Proibido como borda fina informativa ou texto. Só como **rótulo preenchido com
texto branco** (9.66:1). Corrigir a `.h8-quote`: trocar a borda roxa fina por
uma barra de 4px + um rótulo preenchido, ou usar borda `--h8-gray` (5.70:1).

**Cores reais da Ciere** (`#4D361C`, `#CCA548`, `#CE9100`, `#FFFDF8`, `#F3ECDC`,
`#E9E2D0`): só podem aparecer **dentro da moldura de mídia** do projeto. Nunca
como cor de texto, fundo de seção ou acento em CSS fora daquele contêiner.

## 10.6 Ritmo — Ciere deixa de ser laje
Ciere vira **composição aberta sobre paper** (molduras white, sem laje), para não
criar laje-branca seguida de laje-oxblood. Sequência final de superfície:
`paper · paper · paper · CHARCOAL · stone-aberto · paper-aberto · OXBLOOD · paper+foto · BLACK · paper · STONE · paper`

## 10.7 Rail — lista canônica de 7 itens
Exatamente estes 7 cards, nesta ordem, e a duplicata é cópia idêntica:
```
01 IDF-BR          charcoal
02 HUT 8 JR.       acid
03 QUANTUM ML      oxblood
04 NIP · UFPEL     paper      <- UM card. O ponto medio faz parte do nome.
05 DVO PELOTAS     white
06 CIERE DA ROSA   paper
07 UFPEL           white
```

## 10.8 Rail — modo swipe mobile e reduced-motion
Em `@media (max-width: 860px)` E em `prefers-reduced-motion: reduce`:
- `animation: none` e `transform: none` na `.rail-track`;
- `.rail-viewport { overflow-x: auto; -webkit-overflow-scrolling: touch; }`;
- `.rail-track > [aria-hidden="true"] { display: none; }` — a duplicata some
  visualmente, senão o usuário desliza pela lista repetida.
- `scroll-snap-type: x proximity` na viewport, `scroll-snap-align: start` nos cards.

## 10.9 Rail — pausa acessível
Pausa não pode depender só de hover. Exigido:
- `.rail-viewport:hover .rail-track` **e** `.rail-viewport:focus-within .rail-track`;
- um botão real `PAUSE / PLAY` no cabeçalho do rail, com `aria-pressed`, que
  alterna uma classe `.is-paused` — funciona por teclado e toque.

## 10.10 Nav mobile de verdade
Nav passa de 3 para 5 links + CTA + wordmark. Em `≤ 860px` isso não cabe.
Definir: wordmark + CTA permanecem na primeira linha; os links descem para uma
segunda linha rolável horizontalmente, com hairline separando. Sem menu hambúrguer
com JS. Nenhum link pode ser cortado.

## 10.11 Geometria obrigatória de TODO slot de imagem
Cada placeholder declara aspect-ratio desktop, aspect-ratio mobile e radius:

| Slot | Desktop | Mobile | Radius |
|------|---------|--------|--------|
| `[ AUGUSTO PORTRAIT ]` | 3/4 | 3/4 | 24px |
| `[ IDF-BR REAL INTERFACE ]` | 16/10 | 4/3 | 16px |
| `[ IDF-BR DETAIL SCREENSHOT ]` | 4/3 | 4/3 | 14px |
| `[ DVO PRODUCT SCREENSHOT ]` | 16/10 | 4/3 | 16px |
| `[ CIERE WEBSITE DESKTOP ]` | 16/10 | 4/3 | 16px |
| `[ CIERE MOBILE DETAIL ]` | 9/16 | 3/4 | 14px |
| `[ QUANTUM EXPERIMENT VISUAL ]` | 16/9 | 4/3 | 16px |
| `[ NIP RESEARCH / TEAM PHOTO ]` | 4/3 | 4/3 | 18px |
| `[ NIP FIELD / EVENT PHOTO ]` | 1/1 | 4/3 | 14px |
| `[ HUT 8 TEAM PHOTO ]` | 16/9 | 16/10 | 20px |
| `[ HUT 8 EVENT PHOTO ]` | 4/3 | 4/3 | 12px |
| `[ ABOUT CONTEXT PHOTO ]` | 4/3 | 4/3 | 18px |

Todos aceitam `<img style="width:100%;height:100%;object-fit:cover">` sem mudar layout.

## 10.12 Hut 8 — exatamente 2 fotos
Cancelado o terceiro slot. A composição aprovada é `.main` + `.overlap`, só isso.

## 10.13 Diagramas — comportamento responsivo definido
- Fluxo DVO (8 estágios): linha horizontal só `≥1024px`. Entre 1024 e 0 vira
  lista vertical numerada com conector à esquerda. Nunca uma linha de 8 em 860px.
- Diagrama Ciere (`CLIENT ↕ AUGUSTO ↙↘ DESIGN/DEV`): abaixo de 860px vira
  sequência vertical legível na ordem `CLIENT → AUGUSTO → DESIGN → DEV`.
- Ambos com `<ol>`/`<ul>` semântico por baixo, não só desenho.

## 10.14 Hierarquia — orçamento visual imposto
- **IDF-BR:** 1 imagem grande + 1 detalhe + 2 SVGs + fluxo. Alvo ≈1.5× a altura
  de qualquer outro projeto.
- **DVO, Ciere, Quantum:** teto de **1 visual grande + 1 pequeno cada**. Sem
  terceira imagem, sem lista longa de responsabilidades (máx. 6 itens, em linha).
Se algum dos três crescer além do teto, cortar conteúdo — não aumentar o IDF.

## 10.15 Placeholders neutros
Texto de placeholder e `alt` NÃO especulam sobre o conteúdo da foto real
("reunião de planejamento", "entrega", "evento do MEJ" são chutes).
Formato exigido: chip com o nome do slot + uma linha de orientação de
enquadramento estritamente técnica (proporção e o que deve estar em quadro).
`alt` provisório = nome do slot. Legenda descritiva só depois do asset real.
