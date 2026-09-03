# CRITICA-v1 — câmara de agentes

Dois agentes, ambos com o mesmo briefing e as medições:
**Antigravity (Gemini)** varreu referências; **Codex** fez a crítica
adversarial. Eu verifiquei os dois com o meu próprio instrumento e refutei uma
afirmação de cada.

---

## 1. O que o Codex corrigiu em mim

### A minha hipótese binária não resiste

Eu disse "as seis morreram por não ter mídia nem movimento". Codex:

> "A LP atual não tem 'zero movimento': tem 5 keyframes, cerca de 10 elementos
> em transição, marquee de 46s e entradas de 0,6s, 0,72s e 0,82s — e continua
> morta."

A métrica útil é **densidade, não presença**:

| | elems em transição / 1000px | keyframes / 1000px |
|---|---|---|
| paco.me | **9,1** | **14** |
| lp-final.html | 1,2 | 0,59 |
| razão | **7,7× menos** | **24× menos** |

> "O problema não é ausência literal, mas escassez, lentidão e irrelevância
> perceptiva: placeholders não são mídia; marquee decorativo não é resposta;
> entrada que acontece uma vez não sustenta vitalidade."

E o alerta metodológico que eu aceito: **a amostra não prova causalidade.**
Só o Aelixa veio do repertório do cliente; distill, paco, arXiv, Chiang e Folha
fui eu que escolhi. A correlação que eu medi pode ser artefato da minha seleção.

### O que eu refutei nos agentes

- **Antigravity** afirmou que distill.pub usa SVG inline como arte principal.
  Medi **2 `<svg>` contra 32 `<img>`** — as figuras são imagem exportada.
- **Antigravity** classificou paco.me e emilkowal.ski como "vitalidade por
  tensão tipográfica", julgamento estético sem medida. Medi: paco tem 20
  keyframes e 13 elementos em transição a 0,24s. É movimento, não tipografia.

---

## 2. Especificação que a crítica produziu

### 2.1 Contenção das quatro paletas — isolamento cromático por subgrid

> "O chassi permanece invariável — paper, charcoal, mesma tipografia, mesmas
> margens, mesmos títulos, metadados e divisores — e a paleta do projeto fica
> confinada ao **campo de evidência**: screenshot, moldura, legenda e no máximo
> um marcador ou link."

Regra operacional, verificável no Gate E:
- **Um campo cromático por viewport.**
- **Nenhuma cor de projeto** em texto corrido, navegação ou fundo de seção.
- Faixa neutra contínua entre projetos.
- **Não recolorir screenshot para harmonizar** — harmonizar o enquadramento.

### 2.2 Provas de naturezas diferentes, componentes diferentes

> "Pare de prometer o mesmo tipo de prova para conteúdos de naturezas
> diferentes."

Arquitetura que a crítica impõe — e ela mata a página de duas castas:

| natureza | itens | prova |
|---|---|---|
| **produto publicado** | IDF-BR · DVO · Ciere | screenshot real do produto no ar |
| **experimento acadêmico** | Quantum ML | prancha de experimento: pergunta, datasets, configuração clássica × quântica, resultado, conclusão, marca "disciplina, não publicado" |
| **vivência** | Hut 8 · NIP | seção cronológica, sem mockup e sem stack |

> "Remova todas as molduras vazias: ausência declarada ainda parece ausência."

**Isso mata os `[ ASSET A DEFINIR ]`.** Moldura tracejada com rótulo do que
falta não é honestidade, é o buraco assinado.

Ressalva do Codex: "se os valores exatos do experimento não estiverem
disponíveis, não desenhe gráfico". **Essa ressalva caiu:** extraí **28 figuras
reais** dos notebooks dele (`~/Downloads/qml_*.ipynb`) — matriz de kernel QSVM
Z/ZZ/Pauli, variância acumulada do PCA, função de custo de treinamento, matriz
de confusão, acurácia por modelo, crescimento de statevector ∝ 2ⁿ. Os valores
existem e as figuras já estão desenhadas pelo próprio autor.

### 2.3 Vivência — estrutura, não case study sem foto

> "Vivência deve ser uma seção cronológica única, não dois case studies sem
> imagem."

Três colunas por entrada: **período/instituição/papel** · **contexto e
responsabilidade** · **progressão ou modo de atuação**.

- **Hut 8:** Diretor de Projetos desde jun/2025, coordenação de ~20 membros, e
  o encadeamento real — entrada do cliente, requisitos, escopo e preço, formação
  de squads, coordenação design–dev, QA, infraestrutura, entrega. Descreve
  liderança **sem atribuir desenvolvimento**.
- **NIP:** bolsista de iniciação científica desde set/2025, recursos hídricos
  após as enchentes, IDF-BR como entrega anterior, formação em IA em jan/2026,
  passagem para experimentação e escrita acadêmica. Termina em **"pesquisa em
  andamento"**, não em produto nem impacto operacional.

> "Não use stack, CTA de produto, mockup ou métrica de resultado; vivência prova
> mudança de responsabilidade e repertório, não uma entrega isolada."

### 2.4 Movimento — especificação fechada

| gatilho | o que anima | como |
|---|---|---|
| carga | **só** nome, proposição e CTA do hero | `opacity` + `transform: translateY(10px)`, **0,24s**, atrasos curtos |
| evidência real entrando no viewport | o campo de evidência | `animation-timeline: view()` dentro de `@supports`; fora dele, visível de imediato |
| curva real do IDF | o traçado | `stroke-dashoffset` por view timeline, traçado final como fallback |
| `:hover` e `:focus-visible` em superfície de fato interativa | elevação pequena | `transform` |
| `:active` | redução breve de escala | `transform` |
| `<details>` abrindo | o painel | `opacity` + `scale(0.95 → 1)` |
| links | — | transicionar **só** `color`, `background-color`, `border-color`, `transform` |

Proibições explícitas: **`transition: all` nunca**; não transicionar altura,
largura nem posicionamento; **não revelar onze seções em cascata**.

`prefers-reduced-motion: reduce`: zerar animações, fixar `opacity: 1`,
`transform: none`, `stroke-dashoffset` no estado final, `scroll-behavior: auto`.

**E o marquee de 46s sai:** "gera deslocamento contínuo, não vitalidade
informativa."

### 2.5 Técnicas sem dependência, do Antigravity, verificadas por mim

- **Curva que se desenha:** `<path>` inline + `stroke-dasharray` /
  `stroke-dashoffset` + `@keyframes`. Zero JS.
- **Grão:** `background-image: url("data:image/svg+xml,…")` com `<feTurbulence>`.
- **Campo de grade:** `linear-gradient` com `background-size` apertado.
- **Barra a partir de dado:** `display: grid` + custom property inline
  (`style="--val: 80"`) por `calc()`.
- **Tema derivado:** `color-mix(in oklch, …)`.
- Precisa de JS mesmo: tooltip interativo, zoom/pan, fetch, canvas/WebGL.

---

## 3. O que o Codex prevê que eu vou errar

> "Você vai transformar uma correlação em receita e aplicar as duas rotas ao
> mesmo tempo em todos os lugares: quatro fundos de marca, três screenshots,
> diagramas para compensar os vazios, curva se desenhando, entradas por scroll,
> cards reagindo e marquee sobrevivendo. O resultado será mais ocupado, não mais
> vivo."

E o mais grave:

> "O erro mais perigoso será fabricar 'mídia' com gráficos sem números,
> diagramas que apenas repetem a prosa ou linguagem que infla autoria."

Instrução final que eu adoto como regra de trabalho:

> "A próxima tentativa precisa **cortar componentes, remover placeholders, e
> decidir qual evidência cada bloco prova antes de escolher sua cor ou
> animação**."

---

## 4. Inventário de assets — de 0 para 7 de 11

Capturados nesta sessão em `docs/design/assets-reais/`, custo zero:

| arquivo | cobre | conteúdo |
|---|---|---|
| `idf-br-1440.png` | IDF-BR interface | home navy, tiles de navegação, logos institucionais |
| `idf-br-ferramenta-1440.png` | IDF-BR detalhe | **a ferramenta**: seletor TR2–TR100, mapa do Brasil, tabela com código Hidroweb, município, distribuição (WAK/LN3/KAP) e coeficientes a/b/c |
| `idf-br-futuro-1440.png` | extra | página de clima futuro |
| `ciere-1440.png` | Ciere desktop | serifa em display, dourado, ilustração 3D de balança |
| `ciere-mobile-390.png` | Ciere mobile | o detalhe mobile que faltava |
| `dvo-1440.png` | DVO produto | login real, foto de oficina, logo SMA/Prefeitura |
| `quantum/*.png` (28) | Quantum ML | figuras reais do experimento dele |

**Continuam faltando 4, e são as que só ele pode dar:** duas fotos do NIP, duas
da Hut 8, e o retrato do About. E as quatro pertencem justamente às **duas
vivências**, que pela especificação da seção 2.3 **não devem ter mockup nem
foto de produto** — então o buraco encolheu de 11 para praticamente zero
bloqueio.

Observação que muda o ânimo do projeto: **a ferramenta do IDF-BR usa seleção por
abas (TR2, TR5, TR10…)** — o mesmo padrão de seleção que o cliente pediu para
eu explorar. Ele já existe no trabalho dele.

---

**FASE:** crítica independente (equivalente a 3C, fora da trilha reduzida, pedida
pelo cliente)
**ARTEFATO:** este registro + `docs/design/assets-reais/`
**AGENTES:** Antigravity (referências, uma afirmação refutada por medição) ·
Codex (crítica adversarial, 78.451 tokens)
**DECISÕES:** hipótese binária substituída por densidade; isolamento cromático
por subgrid adotado; três naturezas de prova em vez de um componente único;
molduras vazias condenadas; especificação de movimento fechada; marquee removido
**QUESTÕES ABERTAS:** quantas seções cortar (a crítica diz que 11 é insustentável
para 6–10 segundos) e onde NIP e Hut 8 param de se repetir
