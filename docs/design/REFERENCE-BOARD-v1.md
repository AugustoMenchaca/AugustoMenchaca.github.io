# REFERENCE-BOARD-v1

**Fluxo:** redesign-secoes-lp-pessoal · trilha completa · Fase 2
**Data:** 2026-09-01 · viewport de medição: **1440×900×1**, Chrome headless via
`chrome-devtools` CLI, `emulate --viewport` aplicado antes de cada leitura.

Toda linha abaixo tem URL e **valor medido no navegador**, não paráfrase.

---

## 0. Perguntas de interação (decompostas antes de pesquisar)

| # | pergunta |
|---|---|
| **Q1** | Como o leitor de 40 segundos descobre a profundidade sem pagar a rolagem por ela? |
| **Q2** | Como uma seção sinaliza que vale mais que a vizinha? |
| **Q3** | Como um bloco de projeto se comporta quando o asset visual não existe? |
| **Q4** | Como um card comunica que é navegável e para onde vai? |

---

## 1. Tabela comparativa medida

| referência | altura | telas | caracteres | densidade (chars/1000px) | `<img>` | `<section>` |
|---|---|---|---|---|---|---|
| arXiv cs.LG recent | 5385 | 5,98 | 13.829 | **2568** | 4 (logos) | — |
| Brittany Chiang | 4032 | 4,48 | 4.797 | **1190** | 9 | 4 |
| **lp-final.html (nossa)** | **8455** | **9,39** | **7.596** | **898** | **0** | **11** |
| Sara Soueidan | 5669 | 6,30 | 4.083 | **720** | 1 | — |
| Rauno Freiberg | 6108 | 6,79 | 339 | **55** | 0 | 0 |
| Folha de S.Paulo (capa) | 11881 | 13,20 | — | — | muitas | — |

### O achado central, confirmado por dois métodos independentes

1. **Por CSS:** nove molduras `.ph` entre 190 e 360px de altura declarada somam
   ~1900–2700px.
2. **Por densidade:** com a densidade da Chiang (1190), os 7.596 caracteres da
   LP caberiam em **6383px**. Contra os 8455px reais, sobram **~2070px**.

Os dois caminhos chegam ao mesmo número. **Cerca de 2000px da página são altura
reservada para imagem que não existe** — a LP tem `<img>` = 0.

### Contra-evidência a uma hipótese minha da Fase 0

Eu havia formulado que o padding uniforme das seções era o problema. **Soueidan
usa `120/120` idêntico em todos os quatro blocos e funciona.** Chiang usa
`0/0` em todas as quatro seções. Uniformidade de padding, isolada, não é o
defeito.

O que separa: **contagem de blocos competindo no mesmo nível.** Chiang 4,
Soueidan 4, Rauno 0 — **a LP tem 11**. E em Chiang as alturas de seção variam
**3,1×** (542 / 1444 / 763 / 459px) por volume de conteúdo, com padding zero.

Correção que isso impõe: a métrica 6 do `PROBLEMA-v1` ("≥3 níveis de padding
vertical") mira o instrumento errado. Deve virar **contagem de blocos de
primeiro nível** e/ou **razão de altura entre o dominante e a mediana**.

---

## 2. Referências, uma linha cada

### R1 · Brittany Chiang — portfólio de engenheira frontend
`https://brittanychiang.com/`

- **Endereça:** Q1, Q2, Q3, Q4.
- **Evidência:** 4032px / 4,48 telas / 4797 chars / densidade 1190 / 9 imgs /
  4 seções com padding `0/0`. `<header>` com `position: sticky; top: 0;
  height: 900px`. Seções: ABOUT 542px · EXPERIENCE 1444px com **41 itens e zero
  imagens** · PROJECTS 763px com **4 com imagem e 7 só texto** · WRITING 459px.
  28 regras `:hover`; padrão `group-hover`: filete cresce para `4rem`, seta
  translada `+0.25rem` no eixo X, cor vai para `rgb(94 234 212)`, transição
  `0.15s`. Captura de tela conferida a 1440×900.
- **Funciona:** a identidade (nome, cargo, posicionamento em uma linha, nav,
  redes) fica **permanentemente** na tela; o leitor nunca perde o contexto de
  quem é. Evidência entregue como linha `data | cargo · empresa ↗` + prosa,
  **sem nenhuma caixa** — zero cards, zero bordas. Mídia é **camada**, não
  requisito: a seção de maior credibilidade não tem imagem alguma.
- **Não funciona:** a coluna fixa consome metade da largura em telas médias; o
  modelo exige que o texto sustente sozinho o interesse; nav de 3 itens não
  escala para 11 seções.
- **Contexto:** engenheira sênior, público técnico, profundidade fora da página
  (46 links).
- **Transferível?** Sim, e é a referência mais próxima do nosso caso: público
  técnico, evidência textual, poucos assets. **Por que vale para este usuário
  (contra-argumento NN/g):** o leitor-alvo declarado é recrutador de estágio de
  consultoria de tecnologia, que segundo a pesquisa de comportamento decide em
  **6–10 segundos na home**; identidade permanente atende exatamente isso. Mas
  ela é sênior e ele é júnior — a taxonomia (R6) diz que modelos enxutos falham
  para júnior que precisa provar capacidade. Logo: **adotar a permanência e o
  escalonamento de mídia, não a escassez de conteúdo.**

### R2 · Sara Soueidan — consultora de acessibilidade
`https://www.sarasoueidan.com/`

- **Endereça:** Q1, Q2, Q3.
- **Evidência:** 5669px / 6,30 telas / 4083 chars / densidade 720 / **1 img** /
  4 blocos todos com padding computado `120/120`. 33 links, 6 `<h2>`, `<h1>` =
  "Hi, I'm Sara."
- **Funciona:** prova que um portfólio de credibilidade alta pode ter
  **praticamente nenhuma imagem**. Padding generoso e uniforme com poucos
  blocos produz ritmo, não monotonia.
- **Não funciona:** densidade 720 é a segunda pior da amostra; 120px de padding
  em 11 seções produziria uma página de ~13000px. O modelo depende de haver
  poucos blocos.
- **Contexto:** especialista reconhecida; o nome já é a credencial.
- **Transferível?** Parcialmente. **Transferível:** imagem não é requisito de
  credibilidade. **Não transferível:** ele não tem o capital de nome que
  permite ser econômico; e o padding generoso só funciona com ≤4 blocos.

### R3 · Rauno Freiberg — portfólio "Minimal"
`https://rauno.me/`

- **Endereça:** Q1 (como limite inferior).
- **Evidência:** 6108px / 6,79 telas / **339 caracteres no `innerText` do body
  inteiro** / 0 imgs / 0 seções / 12 links / 3 elementos `position: fixed`
  (um deles com 720px de altura).
- **Funciona:** presença absoluta; a página é uma assinatura.
- **Não funciona:** **capacidade de carga.** 339 caracteres não comportam dois
  empregos, seis projetos, stack e linha de pesquisa. Torna concreta e medida a
  afirmação da taxonomia de que "Minimal" falha para quem precisa provar.
- **Contexto:** designer com reputação estabelecida em círculo específico.
- **Transferível?** **Não**, e está no board justamente como limite: é a prova
  medida de que encurtar por subtração de conteúdo destrói o objetivo.

### R4 · Folha de S.Paulo — capa (REFERÊNCIA DISTANTE, domínio editorial)
`https://www.folha.uol.com.br/`

- **Endereça:** Q2 e Q4.
- **Evidência:** 11881px de altura — **40% mais alta que a nossa LP**.
  **8 tamanhos distintos** de título: 14px (87 usos), 16 (3), 18 (4), 20 (10),
  22 (17), 24 (42), 30 (1), **65 (1)**. A manchete de 65px tem **1290px de
  largura**; todo o resto está em coluna de **300px**. Razão manchete/massa =
  **2,7×**. **5 regras `:hover` na página inteira**, nenhuma sobre manchete —
  todas em cromo (barra UOL, banner LGPD).
- **Funciona:** hierarquia carregada por **escala tipográfica e largura de
  coluna**, com **exatamente um** item dominante. Comprimento da página é
  irrelevante para a leitura de 10 segundos.
- **Não funciona:** exige um item claramente mais importante que todos; sem
  isso, 8 níveis de tipo viram ruído. Afordância zero de hover só se sustenta
  porque o leitor já sabe que manchete é link.
- **Contexto:** leitor recorrente, convenção de jornal internalizada há um
  século.
- **Transferível?** Sim, e é a referência que **contradiz o remédio pedido**:
  encurtar não é o caminho: um documento 40% mais longo que o nosso é
  instantaneamente escaneável porque **um** item é inequivocamente o principal.
  **Por que vale aqui:** ele tem esse item — o IDF-BR, único projeto em que ele
  é dono da camada técnica inteira. **O que absorver:** dominância por tipo e
  largura, não por altura de bloco.

### R5 · arXiv, listagem cs.LG (REFERÊNCIA DISTANTE, domínio científico)
`https://arxiv.org/list/cs.LG/recent`

- **Endereça:** Q3 e densidade.
- **Evidência:** 5385px / **50 entradas** / cabeçalho de entrada com **15px de
  altura** / 13.829 caracteres / densidade **2568** / 4 imgs (logos).
  8 tamanhos de fonte, workhorse em 13px (394 usos), título de entrada em 18px
  (exatamente 50 = um por entrada), título da página em 26px.
- **Funciona:** 50 registros de pesquisa com título, autores e resumo em menos
  altura do que a nossa LP gasta com 6 projetos. Credibilidade **inteiramente**
  textual e estruturada.
- **Não funciona:** frieza total; nenhuma persuasão, nenhuma narrativa, nenhum
  senso de autoria. Público que já veio decidido a ler.
- **Contexto:** pesquisadores buscando trabalho relevante, alta tolerância a
  densidade.
- **Transferível?** Em parte, e é o teto de densidade da amostra. **O que
  absorver:** que o público técnico aceita registro textual denso, e que a
  moldura reservada é o oposto de densidade. **Não absorver:** ausência de
  narrativa — o recrutador de estágio precisa de história, não de índice.

### R6 · The Crit — taxonomia de 7 padrões de layout de portfólio
`https://thecrit.co/resources/portfolio-layout-examples`

- **Endereça:** Q1 e Q2, como mapa de padrões e de incompatibilidades.
- **Evidência (citada, não parafraseada):** sete padrões — Gallery Grid, Story
  Scroll, Business Card, Magazine, Case Study First, Sidebar Nav, Minimal.
  Pares declarados incompatíveis: *Case Study First × Gallery Grid*
  (profundidade primeiro × visão geral primeiro); *Business Card × Story Scroll*
  (zero rolagem × rolagem estendida); *Minimal × Magazine* (sem imagem e sem
  hierarquia visual × hierarquia assimétrica dependente de imagem).
- **Diagnóstico direto da nossa página:** a LP é **Story Scroll**, e a fonte diz
  que esse padrão **falha com "case studies individuais muito longos"** e com
  "muitos projetos pequenos". A LP tem **seis projetos, cada um como case
  completo**.
- **Alerta para o alvo júnior:** *Business Card* falha para "júnior que precisa
  provar capacidade"; *Minimal* falha para "júnior que precisa de prova" e
  "títulos genéricos não dão vontade de clicar". **Isso elimina as duas saídas
  mais óbvias de encurtamento.**
- **Candidato apontado pela própria taxonomia:** *Magazine* — "projeto herói no
  topo, projetos de apoio abaixo em tamanhos variados" — funciona quando há
  "um projeto destacado com vários de apoio", que é exatamente a configuração
  dele. Risco declarado: "amplifica o que estiver em destaque", então exige que
  o herói seja forte.

### R7 · Comportamento medido de recrutador (pesquisa documental)
`https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio` ·
`https://uxdictionary.io/article/optimizing-your-portfolio-for-recruiter-scan-ability` ·
`https://thecrit.co/resources/portfolio-layout-examples`

- **Endereça:** a premissa do Gate A.
- **Evidência citada:** 2–5 minutos por portfólio no total; **6–10 segundos na
  home antes de decidir aprofundar ou sair**; single-page é "escaneável em 20
  segundos" com "nome, uma linha de posicionamento, 3–4 projetos e um link de
  contato"; recrutadores "não leem case studies, escaneiam buscando impacto";
  a primeira linha de cada case deve dar **o resultado antes do processo**.
- **Consequência dura:** o número ótimo citado é **3–4 projetos**. A LP tem
  **seis**, todos abertos.
- **Contra-argumento registrado:** são fontes de blog do setor, não estudo
  revisado por pares. Servem para calibrar ordem de grandeza, não como número
  exato. O critério do Gate E deve medir a **nossa** página, não confiar nelas.

---

## 3. Incompatibilidades confirmadas — critério de saída da Fase 2

| pergunta | resposta A (medida) | resposta B (medida) | por que adotar uma exclui a outra |
|---|---|---|---|
| **Q1** | **Chiang:** resumo permanente em coluna `sticky` de 900px + lista compacta escalonada, profundidade fora da página (46 links), 4032px | **Soueidan:** poucos blocos largos com `120/120` de padding, sem coluna fixa, 5669px | Coluna fixa consome metade da largura; bloco largo com 120px de padding exige a largura inteira. São geometrias mutuamente exclusivas. |
| **Q2** | **Folha:** um item em 65px/1290px contra massa em 24px/300px (2,7×); 11881px e ainda escaneável | **Chiang:** todas as seções com padding `0/0` e tipo quase uniforme; hierarquia por permanência e por volume (3,1× de variação de altura) | Um aposta em dominância assimétrica de tipo; o outro em uniformidade tipográfica com constância espacial. Aplicar os dois anula os dois. |
| **Q3** | **Chiang / arXiv:** mídia é camada opcional; a seção de maior peso tem zero imagem; densidade 1190 e 2568 | **Folha:** praticamente todo item tem miniatura; a imagem é parte da unidade de notícia | Escalonar mídia significa aceitar itens sem imagem, o que quebra a grade regular que a miniatura universal exige. |
| **Q4** | **Chiang:** 28 regras; container **estático**, filete cresce para 4rem, seta +0.25rem, cor muda, 0.15s | **Folha:** **5 regras**, nenhuma no conteúdo; afordância só por hierarquia de tipo e cursor padrão | Indicador coordenado dentro de caixa estática × nenhum estado desenhado. Não há meio-termo coerente. |

Critério de saída **atendido**: cada pergunta tem ≥2 precedentes reais com
resoluções incompatíveis, e há **duas referências distantes** (editorial e
científica), ambas medidas.

---

## 4. Proveniência das decisões desta fase

```
QUESTÃO    Q3 — como o bloco se comporta sem o asset visual?
OPÇÕES     (a) moldura reservada com rótulo do asset pendente — padrao atual da LP
           (b) midia escalonada: poucos itens com imagem, resto como linha de
               texto — Chiang, PROJECTS 4 com imagem / 7 sem, EXPERIENCE 41 sem
           (c) registro textual denso sem imagem — arXiv, densidade 2568
           (d) miniatura universal obrigatoria — Folha
CRITERIOS  ele nao tem os 11 assets hoje; moldura vazia lê como projeto
           abandonado; publico é tecnico e tolera densidade; prazo 11/10/2026
DECISAO    a decidir na Fase 3 entre (b) e (c); (a) e (d) eliminadas
EVIDENCIA  brittanychiang.com secao PROJECTS 763px 4/7; arxiv.org 50 entradas
           em 5385px; lp-final.html com <img>=0 e ~2070px de altura morta
ETIQUETA   [R]
ADAPTACAO  a definir
```

```
QUESTÃO    Q2 — como sinalizar que uma secao vale mais?
OPÇÕES     (a) mais padding vertical — instrumento atual, uniforme em 7 de 9
           (b) escala tipografica + largura de coluna — Folha, 2,7x
           (c) permanencia em coluna fixa — Chiang, header sticky 900px
           (d) volume de conteudo — Chiang, 3,1x de variacao de altura
CRITERIOS  (a) esta medido como ineficaz: Soueidan tem padding uniforme e
           funciona, entao o problema é contagem de blocos, nao uniformidade
DECISAO    (a) rebaixada de instrumento principal; escolha entre (b), (c) e (d)
           vai para a Fase 3
EVIDENCIA  Folha 8 tamanhos com 1 item em 65px/1290px; Soueidan 120/120 em 4
           blocos; Chiang 0/0 em 4 secoes com alturas 542/1444/763/459
ETIQUETA   [R]
ADAPTACAO  metrica 6 do PROBLEMA-v1 precisa mudar de "≥3 niveis de padding"
           para "contagem de blocos de primeiro nivel" — registrar em PROBLEMA-v2
```

---

**FASE:** 2 — Precedentes
**ARTEFATO:** `docs/design/REFERENCE-BOARD-v1.md`
**REFERÊNCIAS CONSULTADAS:** 5 produtos medidos em navegador a 1440×900
(brittanychiang.com, sarasoueidan.com, rauno.me, folha.uol.com.br,
arxiv.org/list/cs.LG/recent) + 2 fontes documentais (thecrit.co,
opendoorscareers.com/uxdictionary.io) + a própria `lp-final.html` como linha de
base
**TAREFAS CODEX EXECUTADAS:** nenhuma
**DECISÕES:** altura morta de ~2070px confirmada por dois métodos; padding
uniforme descartado como causa; Story Scroll identificado como padrão em falha
declarada; Business Card e Minimal eliminados por inadequação a perfil júnior
**QUESTÕES ABERTAS:** escolha entre mídia escalonada e registro textual denso
(Q3); escolha entre dominância tipográfica, permanência e volume (Q2); ambas
são decisões da Fase 3, com protótipo no Figma
