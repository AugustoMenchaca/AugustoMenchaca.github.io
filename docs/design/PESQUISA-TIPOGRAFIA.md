# PESQUISA-TIPOGRAFIA — a variável que decide

**Issue #36.** Depende da #17, que fechou.

Este documento foi produzido em duas mãos: a medição de precedentes foi feita
por agente delegado (Antigravity/agy, tier `pro`), e **auditada linha a linha
por medição independente**. O que a auditoria derrubou está marcado no texto,
não escondido. A §9 lista os defeitos de instrumento que sobreviveram.

---

## 1. O que esta issue decide

O `REFERENCE-BOARD-v3` testou dez variáveis contra **15 peças rotuladas pelo
cliente** — 5 aprovadas, 10 rejeitadas. Duas classificam as 15 sem errar uma, e
as duas são tipografia:

| variável | aprovados | rejeitados | corte |
|---|---|---|---|
| maior título | 102 – 320px | 20 – 76px | **≈ 89px** |
| razão display/corpo | 6,0 – 20,0× | 1,25 – 5,14× | **≈ 5,6×** |

Nenhuma das seis variáveis de cor separa. Mídia não separa. Quantidade de
movimento não separa.

Esta issue projeta a escala que cruza os dois cortes, decide entre **dominância
assimétrica** e **uniformidade**, e mede o resultado em vez de estimar.

---

## 2. O instrumento

Sonda de DOM do `REFERENCE-BOARD-v3` §8.1, estendida com carga de texto por
tamanho, família resolvida, detecção de serifa, peso, altura de linha, largura
de coluna em `ch`, caixa alta e posição no primeiro viewport. Chrome headless,
`1440x900x1`. Script em `docs/design/tipografia/sonda-tipografia.mjs`, saída
bruta em `medicoes.json` e `medicoes-pontocego.json`.

**Teste de sanidade, com número.** Das 10 peças rejeitadas remedidas nesta
rodada, **9 reproduzem a razão do v3 exatamente**. As 5 aprovadas reproduzem as
cinco. A única divergência é o `lowmess.com` — ver §9.

---

## 3. As medições

| peça | rótulo | maior título | razão | carga no maior (car./pal.) | caixa alta | serifa |
|---|---|---|---|---|---|---|
| aelixa.webflow.io | aprovado | 240px | 13,33× | 7 / 1 | 150 | não |
| white-desert.com | aprovado | 320px | 20,0× | 15 / 4 | 421 | **sim** |
| paulkalkbrenner.net | aprovado | 150px | 10,71× | 51 / 8 | 174 | não |
| illoca.unseen.co | aprovado | 111px | 9,25× | **121 / 22** | 0 | não |
| lxlcreative.co.uk | aprovado | 102px | 6,0× | 14 / 3 | 505 | **sim** |
| lowmess.com | rejeitado | 76px | 4,75× ⚠ | 43 / 9 | 0 | sim |
| thatmlopsguy.github.io | rejeitado | 72px | 5,14× | 25 / 4 | 0 | não |
| shelomoh.work | rejeitado | 60px | — | 42 / 5 | 49 | não |
| nextfive.xyz | rejeitado | 40px | 2,22× | 14 / 2 | 0 | não |
| paul.fragara.com | rejeitado | 38px | 2,0× | 7 / 1 | 0 | sim |
| charityshot.co.uk | rejeitado | 35px | 2,19× | 12 / 2 | 12 | não |
| incomescrane.com | rejeitado | ~~68px~~ **32px** ⚠ | 4,25× | 9 / 1 | 25 | não |
| obspogon.neocities.org | rejeitado | 32px | 2,0× | 39 / 4 | 0 | não |
| cassidoo.co | rejeitado | 32px | 2,0× | 16 / 2 | 0 | não |
| simonbetton.com | rejeitado | 20px | 1,25× | 269 / 40 | 0 | não |
| **lp-final.html** | — | **46px** | **3,29×** | 59 / 9 | 96 | não |

⚠ = valor auditado, ver §9.

**Trabalho do próprio cliente**, medido para contexto, não julgado:

| peça | maior título | razão | serifa em display |
|---|---|---|---|
| advocaciacieredarosa.com.br | 60px | 3,75× | **sim** |
| dvopelotas.com.br | 60px | 3,33× | não |
| idf-br.com.br | 35px | 2,19× | não |

---

## 4. Carga de texto no display — a questão aberta nº 1

O `REFERENCE-BOARD-v3` deixou aberta a pergunta que mais importava: as cinco
aprovadas têm frase curta de marca; a LP precisa carregar cargo, formação e
cinco projetos. O corte de 89px é medição — a transferência para este conteúdo,
não.

**A resposta medida é: em quatro das cinco, sim. Na quinta, não.**

| peça | maior | caracteres | palavras |
|---|---|---|---|
| aelixa | 240px | 7 | **1** |
| white-desert | 320px | 15 | **4** |
| lxlcreative | 102px | 14 | **3** |
| paulkalkbrenner | 150px | 51 | **8** |
| **illoca** | **111px** | **121** | **22** |

Quatro põem de 1 a 8 palavras no maior tamanho. O `illoca.unseen.co` põe **22
palavras a 111px** — e é aprovado.

**A conclusão honesta é mais estreita do que "display gigante não abriga frase
longa":** a forma dominante entre as aprovadas é o evento curto, mas ela não é
condição necessária. Existe pelo menos um caso aprovado que sustenta frase longa
em display, e ele é justamente o de menor display da amostra. A leitura que os
dados sustentam é **display grande com pouco texto, ou display médio com mais
texto — nunca display pequeno.**

Isso importa para a LP porque a frase atual do herói tem **59 caracteres e 9
palavras** — perfil de `paulkalkbrenner` (51 / 8), que resolve isso a 150px.
Não é preciso inventar um evento de uma palavra para cruzar o corte. Ver a §8,
onde isso foi medido nas duas formas.

---

## 5. Serifa

**Nas aprovadas: duas de cinco.** `lxlcreative.co.uk` e `white-desert.com`.
Não é unânime, portanto não é requisito.

**No trabalho dele: uma de três.** O site da Ciere usa serifa em display, e é a
peça que o board descreve como a mais viva do portfólio dele.

**Veredito:** serifa é compatível com o gosto medido, não exigida por ele. Não
há evidência para trocar Instrument Sans, e há evidência suficiente para que
serifa em display seja uma hipótese legítima a testar no Gate C — não uma
decisão a tomar aqui.

---

## 6. A decisão — dominância assimétrica

As duas formas medidas são incompatíveis, e a issue exige escolher.

- **Uniformidade** — tipo quase uniforme, hierarquia por ordem e permanência.
  Brittany Chiang, Sara Soueidan. **Referências escolhidas pelo agente, não pelo
  cliente** (ver `00-ORDEM.md`).
- **Dominância assimétrica** — um evento enorme contra massa pequena.

**Decisão: dominância assimétrica.**

A evidência não é de gosto, é de classificação: as dez peças que o cliente
rejeitou são todas uniformes (razão 1,25× a 5,14×), e as cinco que ele aprovou
são todas dominantes (6,0× a 20,0×). Um sorteio aleatório do gênero produziu
**zero aprovações**. A uniformidade é a norma do gênero, e a norma do gênero é
exatamente o que ele recusa.

**O que a decisão custa, medido** (§8): a página fica **27% mais alta** — de 9,3
para 11,8 telas a 1440. Isso empurra na direção contrária ao alvo do
`PROBLEMA-v1`, de **≤ 1,5 viewport até a primeira prova de competência
técnica**. O conflito é real e não foi resolvido aqui.

---

## 7. A escala proposta

| degrau | 1440 | 390 | função | referência medida |
|---|---|---|---|---|
| **1 — display** | **144px** | 48px ⚠ | evento único do herói | `paulkalkbrenner.net` mede **150px**, e resolve 51 caracteres nesse tamanho — o perfil de carga mais próximo do nosso herói |
| **2 — seção** | 72px | 36px | título de seção | segundo degrau das aprovadas: 100 · 77 · 55 · 90 · 36px, **mediana 77px** |
| **3 — subseção** | 32px | 24px | título de card | `lxlcreative` mede **33px** e `white-desert` **32px** nesse nível |
| **4 — corpo** | 16px | 16px | texto corrido | workhorse das aprovadas: 18 · 17 · 16 · 14 · 12px, **mediana 16px** |
| **5 — rótulo** | 12px | 12px | rótulos e meta | `illoca` usa **12px** como workhorse; `paulkalkbrenner` tem 11px na escada |

Restrições respeitadas:

- famílias mantidas — **Instrument Sans**, **Inter**, **IBM Plex Mono**;
- **pesos 800 e 900 fora**, teto em 700, conforme veto do briefing;
- **ALL CAPS reduzido de 96 para 23 elementos** a 1440 — medido, não estimado.

**Por que 144px e não 89px.** O corte é piso derivado de 15 peças; a mediana das
aprovadas é 150px. 144px (`9rem`) fica na mediana e mantém margem se o conteúdo
crescer. A faixa aprovada vai até 320px, então 144px é escolha conservadora
dentro dela, não teto.

⚠ **O degrau 1 a 390px não é decisão, é o piso do `clamp` — e ele não muda
nada.** Ver §8.

---

## 8. Antes e depois — medido, sem protótipo

**Como foi medido.** Não existe arquivo de protótipo neste repositório. A escala
é aplicada como folha de estilo **injetada em tempo de medição** sobre a
`wireframes/lp-final.html` real, e a página é lida logo em seguida. Isso mantém
o Gate D intacto — nada de código novo entra na aplicação — e mantém a medição
reproduzível, porque o CSS injetado está inteiro logo abaixo.

Três variantes foram medidas para separar o que é escala do que é conteúdo:

- **A** — a LP como está hoje;
- **B** — só a escala, conteúdo do herói intocado (a frase de 59 caracteres);
- **C** — a escala mais o "evento curto", com o herói trocado para o nome e a
  frase rebaixada a subtítulo.

### A 1440x900

| | maior título | razão | ALL CAPS | altura | telas |
|---|---|---|---|---|---|
| **A** — LP hoje | 46px | 3,54× | 96 | 8336px | 9,3 |
| **B** — só a escala | **144px** | **11,08×** | 23 | 10591px | 11,8 |
| **C** — escala + evento curto | **144px** | **11,08×** | 23 | 10157px | 11,3 |

**Aceite atendido.** 144px ≥ 89px e a razão ≥ 5,6×, pelos três denominadores
possíveis: 11,08× com o workhorse medido (13px), 9,0× com o corpo declarado no
degrau 4 (16px), 10,3× excluindo rótulo. Todos cruzam.

**E o resultado mais útil da tabela: B e C são idênticos no classificador.** O
evento curto — trocar o herói para "AUGUSTO MENCHACA" e rebaixar a frase —
**não contribui nada** para cruzar o corte. Ele só encurta a página em 434px.

Isso tem consequência de processo: a troca de conteúdo do herói é **decisão de
hierarquia sem justificativa de medição**. Ela não pertence a esta issue de
evidência e fica para o Gate B/C, com o número acima como insumo.

### A 390x844

| | maior título | razão | veredito |
|---|---|---|---|
| **A** — LP hoje | 48px | 3,69× | abaixo dos dois cortes |
| **B** — só a escala | 48px | 3,69× | **idêntico a A** |
| **C** — escala + evento curto | 48px | 3,69× | **idêntico a A** |

**A escala proposta não tem efeito nenhum a 390px.** O degrau 1 é
`clamp(3rem, 10vw, 9rem)`: a 390px, `10vw` = 39px, abaixo do piso de `3rem`, e o
valor cai para 48px — que é exatamente o que a LP já mede hoje. Antes e depois
são o mesmo número.

O brief fixou o aceite a 1440, então isso não reprova a entrega. Mas precisa
estar dito com todas as letras: **no celular a peça continua do lado que o
cliente rejeita**, e a coluna "390px" da §7 descreve o comportamento do `clamp`,
não uma escala projetada. Projetar o degrau móvel é trabalho que esta issue não
fez.

Sem transbordo horizontal a 390px em nenhuma das três variantes.

### O CSS injetado, na íntegra

```css
body { font-size: 1rem; line-height: 1.6; }

.hero-headline { font-size: clamp(3rem, 10vw, 9rem) !important; line-height: .9 !important;
  letter-spacing: -.04em !important; text-transform: none !important; max-width: none !important; }

.slab-headline { font-size: clamp(2.25rem, 5vw, 4.5rem) !important; line-height: 1.05 !important;
  letter-spacing: -.02em !important; text-transform: none !important; }

.qml-quote p, .ciere-flow-wrap, .about-copy p { font-size: clamp(1.5rem, 2.22vw, 2rem) !important;
  line-height: 1.2 !important; text-transform: none !important; }

.rail-title, .data-card-head { font-size: 1.25rem !important; text-transform: none !important; }

.meta-label, .pill, .btn, .spec-head, .spec-term, .rail-badge, .qml-col-title, .h8-tag,
.h8-figcap, .footer-col h3, .footer-top { text-transform: none !important; letter-spacing: .02em !important; }

.hero-lede { font-size: 1rem !important; }
.hero-subheadline { font-weight: 500; font-size: 1.25rem; max-width: 40ch; margin-bottom: 20px; }
```

A variante C acrescenta a isto uma troca de DOM: o `<span>` dentro de cada
`h1.hero-headline` passa a `AUGUSTO<br>MENCHACA`, e a frase original vira um
`<p class="hero-subheadline">` logo depois.

**Lacuna conhecida da escala:** o workhorse medido da página é **13px**
(`.footer-note` e afins), e o degrau 4 declara 16px. O CSS acima não governa
esses elementos. A razão passa nos dois casos, mas a escala não cobre a página
inteira.

---

## 9. Limites e defeitos declarados

### Três defeitos de instrumento, confirmados na mão

1. **Escopo em `h1`–`h6`.** A sonda do v3 não vê display fora de cabeçalho. A
   `lp-final.html` renderiza um `<div class="footer-wordmark">` com "AUGUSTO" a
   **232px**, visível, a 95,9% de rolagem. O board mediu 46px e nunca viu isso.
2. **Sem guarda de recorte.** A régua corrigida marcou `paulkalkbrenner.net` com
   **641px**. Verificado na mão: é um **contador animado de dígitos** num `span`
   de 342×10143px recortado por container — um dígito visível por vez. O display
   real é 150px. Falso positivo.
3. **Sem filtro de visibilidade.** O v3 registrou `incomescrane.com` com 68px.
   Verificado na mão: esse cabeçalho é `display: none` — **nunca foi
   renderizado**. O maior texto visível da peça é 32px.

**As duas réguas erram em direções opostas**, e a §3 foi escrita com a primeira.
A guarda de recorte usada na §8 (caixa mais de 4× mais alta que o corpo, com
menos de 60 caracteres) resolve o caso 2, mas não foi aplicada à §3.

### O que a remedição decidiu

`medicoes-pontocego.json`, 21 peças, 21 `sucesso`. **O corte de 89px sobrevive:**
nenhuma peça rejeitada o alcança nem com a régua corrigida — o teto dos
rejeitados sobe de 76px para **80px** (`shelomoh.work`, 60 → 80).

**Mas o diagnóstico do board muda.** Sob a régua corrigida a `lp-final.html`
mede 232px e razão 16,6× — classificaria do lado **aprovado**. A frase "a LP
classifica do lado rejeitado" é artefato do escopo em cabeçalho.

Isso não absolve a página, porque o `aelixa.webflow.io`, aprovado, tem a mesma
forma: **240px a 97,8% de profundidade**, também um wordmark de rodapé. O gesto
aparece nos dois lados e não separa nada. O que separa:

| | display na hierarquia de conteúdo | wordmark decorativo |
|---|---|---|
| as 5 aprovadas | **102 – 320px**, em cabeçalho | algumas têm |
| as 10 rejeitadas | 20 – 80px | — |
| **lp-final.html** | **46px** | **232px** |

**A LP pegou emprestado o gesto do rodapé sem a hierarquia.** O evento grande
existe e é decorativo; o que carrega conteúdo para em 46px. A decisão da §6
continua de pé, com o diagnóstico corrigido: não falta escala — falta que a
escala governe o texto que diz alguma coisa.

### Divergência não resolvida

`lowmess.com`: o v3 registra **3,80×** (workhorse 20px), esta rodada **4,75×**
(workhorse 16px), e a auditoria lê o corpo a **25px**. É a única peça em dez que
não reproduz. Nenhuma das três está demonstrada errada. Fica aberta.

### O que continua não medido

- **Nada aqui foi testado com recrutador.** O corte de 89px separa o gosto do
  cliente. Que ele sirva ao job to be done do `PROBLEMA-v1` segue não medido, e
  a §6 registra um conflito direto: a escala aumenta a página em 27%, contra um
  alvo de ≤ 1,5 viewport até a primeira prova técnica.
- **Os dez rejeitados vêm todos do mesmo diretório**, sorteados no mesmo dia.
- **A heurística de serifa** casa nome de família por string, não lê métrica de
  glifo.
- **A largura em `ch`** assume o caractere `0` como unidade — seguro, com margem
  sub-pixel em fonte variável.
- **A §3 não foi remedida** com uma régua que corrija os três defeitos ao mesmo
  tempo. Duas linhas dela estão comprovadamente erradas e estão marcadas.

---

## 10. Rodapé

**FASE:** 1 — Evidência (issue #36)
**ARTEFATO:** este documento · `docs/design/tipografia/sonda-tipografia.mjs` ·
`medicoes.json` · `medicoes-pontocego.json`
**REFERÊNCIAS MEDIDAS:** as 5 aprovadas e as 10 rejeitadas da amostra rotulada,
mais 3 sites do próprio cliente e a `wireframes/lp-final.html` — 19 peças, 21
medições, todas com carimbo de 2026-09-07
**DECISÕES:** dominância assimétrica sobre uniformidade · escala de 5 degraus com
display em 144px · serifa não adotada e não descartada · ALL CAPS de 96 para 23
elementos · o "depois" passa a ser medido por injeção de CSS, sem arquivo de
protótipo no repositório
**QUESTÕES ABERTAS:**
1. **O degrau móvel não existe.** A escala não altera nada a 390px, e lá a peça
   segue do lado rejeitado. Projetar isso é trabalho aberto.
2. **A escala aumenta a página em 27%**, contra o alvo de ≤ 1,5 viewport do
   `PROBLEMA-v1`. Conflito não resolvido.
3. **A troca de conteúdo do herói** não tem justificativa de medição — B e C são
   idênticos no classificador. Vai para o Gate B/C.
4. **O wordmark de 232px do rodapé** não é governado por nenhum degrau da escala.
5. **A §3 precisa de remedição** com régua que corrija os três defeitos juntos.
6. **`lowmess.com`** não reproduz e ninguém sabe por quê.
7. **Serifa em display** é hipótese viva, sustentada pelo trabalho da Ciere e por
   duas das cinco aprovadas.

**O QUE ESTE DOCUMENTO NÃO AUTORIZA:** implementar qualquer coisa na aplicação —
o Gate D segue fechado; tratar a coluna "390px" da §7 como escala projetada;
tratar o corte de 89px como ligado ao job to be done de recrutamento; decidir
conteúdo do herói; e usar as duas linhas marcadas com ⚠ na §3 sem antes remedir.
