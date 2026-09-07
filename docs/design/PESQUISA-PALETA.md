# PESQUISA-PALETA — cor como restrição, não como diferencial

> Entregável da issue **#35**. Depende da **#17**, que fechou e **rebaixou esta
> issue de diferencial para restrição**. Leia o `00-ORDEM.md` antes deste
> arquivo, e a §12 do `REFERENCE-BOARD-v3.md` para a amostra rotulada.

Este documento **não escolhe uma paleta para agradar o cliente.** A medição diz
que não existe paleta que faça isso. Ele resolve satisfação de restrição: dado
que cor não é o critério de julgamento, quais limites a paleta precisa respeitar
para não atrapalhar o critério que é — tipografia, na **#36**.

---

## 1. A conclusão, e ela é negativa

**Cor não classifica o julgamento do cliente.** Amostra de 15 peças rotuladas
por ele — 5 aprovadas, 10 rejeitadas. Teste: o pior aprovado contra o melhor
rejeitado. Se qualquer aprovado cai dentro da faixa dos rejeitados, a variável
não separa.

| variável de cor | aprovados | rejeitados | veredito |
|---|---|---|---|
| cor perceptível `C≥0,05` | 2,7 – 34,5% | 1,2 – 13,5% | não separa — 3 de 5 aprovados dentro |
| cor forte `C≥0,12` | 0,0 – 30,2% | 0,3 – 4,3% | não separa — 2 de 5 dentro |
| croma médio | 0,006 – 0,069 | 0,002 – 0,032 | não separa — 3 de 5 dentro |
| croma de pico | 0,208 – 0,251 | 0,187 – 0,322 | não separa — **5 de 5 dentro** |
| quase neutro `C<0,02` | 25,7 – 92,2% | 1,0 – 97,1% | não separa — **5 de 5 dentro** |
| luminância mediana | 0,251 – 1,000 | 0,000 – 1,000 | não separa — **5 de 5 dentro** |

Para comparação, as duas variáveis que **classificam 15/15 sem erro** são
tipográficas: maior título (corte ≈89px) e razão display/corpo (corte ≈5,6×).

**O contraexemplo mais direto:** `obspogon.neocities.org`, rejeitado com a
palavra *"horrível"*, tem o **maior croma de pico de toda a pesquisa — 0,322**,
acima de qualquer peça que ele aprovou. Cor saturada não compra aprovação.

**E o erro simétrico:** `lowmess.com` foi rejeitado com *"sem animação nenhuma"*
medindo 10,81 elementos em transição por 1000px — mais que três dos cinco
aprovados. O que ele não tem é display: 76px. A percepção verbal aponta para
tipografia mesmo quando as palavras dizem outra coisa.

### Por que esta seção existe em tom de correção

Eu propus paleta três vezes neste projeto e errei as três, sempre no mesmo eixo:

| tentativa | meu palpite | o que a régua mostrou |
|---|---|---|
| 1ª — ele disse *"muito agressivo"* | excesso de cor | a página era **mais clara** que as três referências — 66% contra 46/61/42% |
| 2ª — ele disse *"sem cor, cara de site morto"* | falta de croma | régua errada (saturação HSV). Remedido em OKLCH, a comparação **se inverte**: o Aelixa tem 0,5% de cor forte contra 0,0% / 0,2% / 0,0% dos três produtos dele |
| 3ª — supor que paleta era o que ele percebia | cor é a variável | **cor não separa em nenhuma das seis métricas** |

Três vezes o palpite errou e a régua acertou. É por isso que aqui não há valor
de cor sem medição, e o que for escolha estética está declarado como tal.

*Nota sobre a 1ª linha:* o diagnóstico original também citava um croma de pico
menor — "0,76 contra 0,82/0,97/0,82". **Esses números não são reaproveitáveis:**
estão na faixa 0–1 da saturação HSV, a régua que a #17 derrubou, e não são
comparáveis a croma OKLCH, que nas peças medidas fica entre 0,187 e 0,322. O
`00-ORDEM.md` lista esses valores entre os que não devem ser reusados. O que
sobrevive da linha é a direção do erro, medida em luminância: a página era mais
clara, e eu diagnostiquei excesso.

**"Cor não decide" não é "cor não importa".** Significa que ela não distingue o
que ele aceita do que ele recusa, e portanto **não deve ser a variável que esta
issue otimiza**. Ninguém deve reabrir a paleta no futuro esperando que ela
resolva o *"cara de site morto"* — esse defeito está medido, e é tipográfico.

---

## 2. O instrumento

Duas réguas, e nenhuma delas é a do v2.

**Croma e matiz: OKLCH no pixel renderizado.** A régua do v2 era saturação HSV,
que **chama neutro tingido de cor** e lê só `background-color` — cega justamente
para foto e canvas, que é onde a cor vive nas referências do cliente. Toda a
coluna de área cromática do v2 está derrubada. Definição vigente:
`REFERENCE-BOARD-v3.md` §8.2. Registro do defeito: `provenance.md`, P-001 e P-002.

**Contraste: WCAG 2.1 sobre o par realmente renderizado.** Instrumento novo
desta issue, em `medicao-contraste/probe-contraste.js`. Ele não combina tokens
dois a dois — isso produziria uma matriz cheia de pares que a página nunca usa.
Ele percorre os elementos que têm texto próprio, resolve o **fundo efetivo**
subindo a árvore, acumula `alpha` e `opacity` (que reduzem contraste em silêncio)
e escolhe o limiar por tamanho e peso: **4,5:1** normal, **3:1** para texto
grande — `≥24px`, ou `≥18,66px` em peso ≥700.

Viewport `1440x900x1`, para os números serem comparáveis com o resto do projeto.

> **Um defeito do instrumento, encontrado e corrigido nesta rodada.** A primeira
> passada reportou **12 reprovações**, todas com contraste exatamente `1,00:1` e
> cor de texto **idêntica** à do fundo. Nenhuma era real: a sonda leu a página
> antes das revelações de scroll, com os elementos ainda em `opacity: 0`. Rodar
> o pré-scroll da §8.1 antes de medir zera as doze. Uma segunda leitura, tirada
> logo após o scroll, ainda acusou 58 elementos translúcidos — eram as transições
> de **0,6s** ainda em voo. A sonda precisa de página **rolada e assentada**, e
> isso está escrito no cabeçalho dela.
>
> Registro porque o padrão se repete: **a régua errada produz um número
> confiante.** As doze reprovações teriam virado doze correções de cor
> desnecessárias. A causa raiz — o pré-scroll canônico da §8.1 ser rápido demais
> para disparar revelação — está medida e registrada em `provenance.md`, **P-012**.

---

## 3. Auditoria de contraste — os pares que existem na página

`wireframes/lp-final.html`, medida com o instrumento acima. Dados brutos em
`medicao-contraste/raw/lp-final.json`; a tabela é gerada por `tabela.py`, não
digitada.
<!-- gerado por tabela.py a partir de raw/lp-final.json — nao editar a mao -->

| texto | fundo | contraste | limiar | veredito | usos | px |
|---|---|---|---|---:|---:|---|
| `muted` | `stone` | **4.58:1** | 4.5 | margem fina | 14 | 11–14 |
| `muted` | `acid` | **4.98:1** | 4.5 | margem fina | 2 | 11–11 |
| `muted` | `subtle` | **5.05:1** | 4.5 | margem fina | 8 | 9–11 |
| `muted` | `paper` | **5.37:1** | 4.5 | margem fina | 25 | 10–17 |
| `h8-gray` | `h8-black` | **5.70:1** | 4.5 | passa | 4 | 10–12 |
| `muted` | `white` | **5.86:1** | 4.5 | passa | 14 | 9–12 |
| `#7A4351` _oxblood + alpha_ | `wine` | **6.27:1** | 4.5 | passa | 2 | 11–11 |
| `on-dark` | `charcoal` | **6.89:1** | 4.5 | passa | 15 | 8–12 |
| `#B7B5B1` _paper a .72_ | `charcoal` | **9.19:1** | 4.5 | passa | 2 | 11–11 |
| `body` | `stone` | **9.37:1** | 3 | passa | 1 | 34–34 |
| `body` | `stone` | **9.37:1** | 4.5 | passa | 6 | 14–15 |
| `#383E00` _charcoal + alpha_ | `acid` | **9.61:1** | 4.5 | passa | 2 | 9–9 |
| `oxblood` | `stone` | **9.61:1** | 4.5 | passa | 6 | 11–13 |
| `white` | `h8-purple` | **9.66:1** | 4.5 | passa | 4 | 10–10 |
| `oxblood` | `wine` | **10.07:1** | 4.5 | passa | 6 | 8–13 |
| `wine` | `oxblood` | **10.07:1** | 4.5 | passa | 4 | 8–10 |
| `body` | `paper` | **11.00:1** | 3 | passa | 4 | 34–34 |
| `body` | `paper` | **11.00:1** | 4.5 | passa | 4 | 14–15 |
| `paper` | `#313232` _charcoal + alpha_ | **11.82:1** | 4.5 | passa | 2 | 8–8 |
| `body` | `white` | **11.99:1** | 4.5 | passa | 1 | 14–14 |
| `#D6D6D4` _paper + alpha_ | `h8-black` | **13.52:1** | 4.5 | passa | 1 | 14–14 |
| `charcoal` | `stone` | **14.66:1** | 4.5 | passa | 21 | 10–19 |
| `charcoal` | `stone` | **14.66:1** | 3 | passa | 2 | 34–34 |
| `charcoal` | `acid` | **15.93:1** | 4.5 | passa | 5 | 12–13 |
| `acid` | `charcoal` | **15.93:1** | 4.5 | passa | 6 | 8–12 |
| `charcoal` | `subtle` | **16.18:1** | 4.5 | passa | 19 | 8–13 |
| `charcoal` | `paper` | **17.20:1** | 4.5 | passa | 33 | 10–18 |
| `charcoal` | `paper` | **17.20:1** | 3 | passa | 3 | 46–232 |
| `paper` | `charcoal` | **17.20:1** | 4.5 | passa | 15 | 10–13 |
| `paper` | `charcoal` | **17.20:1** | 3 | passa | 1 | 34–34 |
| `charcoal` | `white` | **18.75:1** | 4.5 | passa | 7 | 13–15 |
| `#000000` _ButtonText do navegador_ | `paper` | **19.26:1** | 4.5 | passa | 1 | 10–10 |
| `white` | `h8-black` | **19.68:1** | 3 | passa | 1 | 34–34 |
| `white` | `h8-black` | **19.68:1** | 4.5 | passa | 1 | 16–16 |

**242** elementos com texto proprio · **34** pares distintos · **0** reprovacoes · **4** em margem fina · texto sobre `background-image`: **0**

### O que a auditoria encontrou

**Zero reprovações de AA.** A restrição mais dura desta issue já está satisfeita
na peça atual. Isso reduz o trabalho de correção a nada e desloca o valor deste
documento para o que vem depois: as seções **#8–#15** ainda não existem, e é
nelas que a restrição pode ser quebrada.

Cinco achados concretos:

**1. O par mais fino é `muted` sobre `stone`: 4,58:1 contra um limiar de 4,5.**
Passa por **0,08**, em 14 usos entre 11 e 14px. Qualquer escurecimento do
`stone` ou clareamento do `muted` derruba esse par. Ele precisa de nota, não de
conserto.

**2. `--light #8A8E93` é token-armadilha.** Declarado no `:root`, **zero usos**.
Se alguma seção nova o usar como texto de corpo: **3,02:1** sobre paper,
**2,58:1** sobre stone, **2,84:1** sobre subtle — reprova até em texto grande nos
dois últimos. Ele está no bloco de tokens parecendo disponível e não é.

**3. `--h8-photo #2A2A28` também é morto, e está no lugar errado.** Zero usos, e
declarado sob o comentário `Sistema Hut 8 (manual de marca v1.0)` — mas
**#2A2A28 não é uma das quatro cores do manual**. O bloco afirma procedência de
marca para um valor que não tem.

**4. O verde `#A4DE02` da marca Hut 8 não existe como token, e a razão disso
estava enterrada em um comentário de protótipo** (`prototipo-c.html:370`:
*"Verde #A4DE02 fica FORA para nao colidir com o acid do portfolio"*). Era
palpite. **Medido agora, o palpite está certo:**

| | L | C | H |
|---|---|---|---|
| `--acid #E6F835` | 0,935 | 0,200 | 115,1° |
| `#A4DE02` (marca Hut 8) | 0,830 | 0,212 | 126,3° |
| **diferença** | 0,105 | **0,012** | **11,2°** |

Croma praticamente idêntico a **11,2° de matiz** de distância: são a mesma
família perceptual. "Colidir" agora tem número. E o verde carrega **a mesma
proibição** do acid — 1,48:1 sobre paper, 1,26:1 sobre stone, 1,61:1 sobre white.

**5. Um botão escapa da paleta por omissão.** `.rail-pause` define `border`,
`background` e `font-family`, mas **não define `color`** — então cai no
`ButtonText` do navegador, **#000000**, que não é token nenhum (o preto do
sistema é `--charcoal #111213`). O contraste está ótimo, 19,26:1; o problema é
de governança: é uma cor fora da paleta, e ela muda com o tema do sistema
operacional e sob `forced-colors`.

**Zero texto sobre `background-image`.** A restrição "screenshot nunca é
recolorido" hoje não tem par de contraste em risco, porque nenhum texto assenta
sobre imagem. É um estado a **preservar**, não um resultado a comemorar — as
seções de projeto ainda vão ser construídas.

---

## 4. As restrições, como norma

Cada regra abaixo tem a medição que a sustenta na própria linha. É isto que as
issues #5 e #8–#15 devem obedecer.

**R1 — `--acid` nunca como texto sobre superfície clara.**
Medido: **1,08:1** sobre paper · **1,09:1** sobre stone · **1,18:1** sobre white
· **1,02:1** sobre subtle. Na peça atual a lei está cumprida: `--acid` aparece
como texto em **6 usos, todos sobre `--charcoal`** (15,93:1), e como **fundo** em
9 usos, com texto `--charcoal` (15,93:1), `--muted` (4,98:1) e um charcoal com
alpha (9,61:1). O par `--acid` sobre `--h8-black` calcula 16,72:1 mas **não
ocorre na página** — fica registrado como permitido, não como observado.

O uso de `--muted` sobre `--acid` a **4,98:1** passa, e é o segundo par mais fino
da peça. Vale a mesma nota do `muted`/`stone`: não conserte, só não clareie.

**R2 — a mesma lei vale para o verde `#A4DE02` da marca Hut 8**, por
`ΔH = 11,2°` e `ΔC = 0,012` em relação ao acid, e por 1,26–1,61:1 sobre as
claras. Ele fica fora da paleta da LP — não por gosto, e agora com a medição no
lugar do comentário de protótipo.

**R3 — a marca Hut 8 é fixa e não se mistura.** Os quatro valores do manual v1.0:
`#0B0B0B`, `#6B0F9C`, `#8A8A8A`, `#A4DE02`. Nenhum recebe ajuste de matiz,
luminância ou croma. `#2A2A28` **não** pertence a esse conjunto e não deve ser
declarado como se pertencesse.

**R4 — screenshot e figura de dado real nunca são recoloridos.** O navy do
IDF-BR, o creme e o dourado da Ciere e o azul de oficina do DVO entram como são.
**Consequência que faltava estar escrita:** se a imagem é intocável, a restrição
recai sobre a **superfície vizinha** dela — a moldura, a legenda e o fundo da
seção é que se acomodam à imagem, nunca o contrário.

**R5 — AA em todo par texto/fundo, e `--muted` é o piso.** Nenhuma cor mais
clara que `--muted` (`L = 0,505`) como texto sobre superfície clara. É essa regra
que exclui `--light` (`L = 0,645`), `--on-dark` (`L = 0,695`) e `--h8-gray`
(`L = 0,633`) do papel de texto sobre paper, stone, white e subtle.

**R6 — nenhum texto assenta sobre imagem sem faixa sólida por baixo.** Hoje são
zero casos. Quando as seções de projeto entrarem, texto sobre screenshot exige
faixa opaca, porque o fundo de uma imagem não é mensurável por CSS e portanto não
é auditável por esta sonda.

**R7 — nenhuma cor fora dos tokens, inclusive por omissão.** Todo elemento
interativo declara `color` explicitamente. `.rail-pause` é o caso existente.

---

## 5. A paleta

**A paleta proposta é a que já está no `:root` da `lp-final.html`**, com duas
remoções e sete regras. Não há valor novo, e isso é a conclusão, não preguiça:
a medição não autoriza escolher cor, e trocar valores agora seria a quarta
tentativa de otimizar a variável errada.

| grupo | tokens | decisão |
|---|---|---|
| Superfícies | `paper #F7F5EF` · `stone #E8E3D9` · `white #FFFFFF` · `subtle #F1EEE6` | **mantidos** — os quatro medem `C ≤ 0,014`, dentro da faixa de neutro tingido das peças aprovadas |
| Texto | `charcoal #111213` · `body #343739` · `muted #626569` | **mantidos** — cobrem os 34 pares sem reprovação |
| Texto claro | `light #8A8E93` | **removido** — zero usos, e reprova sobre stone e subtle (R5) |
| Texto sobre escuro | `on-dark #9A9DA1` | **mantido, restrito a fundo escuro** — 6,89:1 sobre charcoal, mas 2,13–2,72:1 sobre as claras |
| Acentos | `acid #E6F835` · `oxblood #5A2232` · `wine #F1E6E8` | **mantidos**, sob R1 |
| Marca Hut 8 | `h8-black #0B0B0B` · `h8-purple #6B0F9C` · `h8-gray #8A8A8A` | **mantidos e congelados** (R3) |
| — | `h8-photo #2A2A28` | **removido** — zero usos, e não é cor de marca (R3) |

### O que aqui é escolha estética, e está declarado como tal

O aceite da issue exige esta seção.

**Os matizes específicos não têm base medida.** Que a superfície seja um creme
`#F7F5EF` em vez de branco puro, que o acento seja um amarelo-ácido em
`H = 115°`, que o vinho seja `H = 4,8°` — nada disso sai de medição. São herança
do briefing original, e a pesquisa **não** produziu evidência a favor nem contra.

O que **está** medido é outra coisa, e mais modesta: esta paleta **satisfaz todas
as restrições**, e cai dentro da faixa descritiva das peças que o cliente aprova
(cor forte entre 0,0% e 30,2%). Isso é licença, não recomendação. Qualquer
paleta que respeite R1–R7 serviria igualmente bem ao critério dele — e é
exatamente esse o achado.

**Uma observação que não é padrão.** O site da Ciere, trabalho do próprio
cliente, tem a assinatura "campo de neutro tingido + acento minúsculo de croma
alto" (`rgb(243,236,220)` `C=0,023` em 64,4%, com dourado `C=0,145` em 0,2%) —
a mesma do Aelixa. Sugere que a gramática já lhe é familiar. É **uma peça só**,
é trabalho dele e não referência dele, e portanto **não entra como evidência** —
misturar as duas populações para fechar um padrão já foi erro apontado pelo
Codex na §3 do board.

---

## 6. Banda escura — a variável que ficou sem régua

O corpo original desta issue pedia duas medidas que **o teste das 15 peças nunca
cobriu**: contagem de tons escuros distintos e bandas escuras contíguas. As dez
variáveis da §12 do board não incluem nenhuma das duas.

Isso importa porque o diagnóstico da **primeira** reclamação — *"muito
agressivo"* — atribuiu a causa a dois fatores: temperamento cromático e
**frequência de banda escura**. O temperamento foi medido e refutado. A banda
escura, não.

E ela já foi mexida sem medição: o bloco de tokens registra
`--slab-inner removido: quatro escuros colapsados em tres`. Ou seja, agiu-se
sobre a variável antes de existir régua para ela.

Contagem provisória, **por classe de CSS e não por pixel**: a peça tem duas
faixas escuras declaradas em 8123px — `slab-dark` e `slab-hut8`. Esse número é
proxy fraco e pode subir na medição real, porque screenshot escuro e figura de
fundo preto produzem banda escura sem nenhuma classe correspondente — é
exatamente a cegueira que o defeito P-002 registrou. Vale o que a sonda de pixel
devolver, não esta contagem.

**Definição adotada.** Escuro é `L OKLCH < 0,50`. O limiar não é arbitrário: as
quatro superfícies escuras deste projeto medem `L` entre **0,150 e 0,339**, as
quatro claras entre **0,917 e 1,000**, e 0,50 cai no vazio entre as duas
populações. Banda é uma corrida contígua de linhas escuras com **≥ 300px** de
altura, contada no pixel — não no `background-color` — para não ficar cega a
foto e canvas, que foi o defeito P-002.

**Compromisso registrado antes de ver o número:** se a variável não separar,
ela é declarada nula e a issue fecha assim. Já houve três resultados nulos
vestidos de conclusão neste projeto; este documento não faz o quarto.

### O resultado: nulo nas quatro métricas

Medido nas 15 peças rotuladas mais a `lp-final.html`. Rodada executada pelo agy
e conferida aqui — tabela completa, procedência e correções em
`medicao-banda-escura/RESULTADO.md`.

| métrica | aprovados | rejeitados | veredito |
|---|---|---|---|
| tons escuros distintos | 1 – 3 | 0 – 4 | **não separa** |
| número de bandas | 0 – 7 | 0 – 3 | **não separa** |
| fração em banda | 0,0000 – 0,9451 | 0,0000 – 1,0000 | **não separa** |
| alternância claro/escuro | 0 – 7 | 0 – 3 | **não separa** |

Os contraexemplos, um por métrica: `nextfive` (rejeitado) tem **4 tons escuros**,
mais que toda peça aprovada. `illoca` (aprovado) tem **0 bandas**, igual a cinco
rejeitados. `obspogon` (rejeitado) tem **3**, igual à `aelixa` (aprovada). E na
fração, a faixa rejeitada `[0 – 1,0]` **contém inteiramente** a aprovada
`[0 – 0,945]` — não existe corte possível em nenhuma direção.

**A variável de banda escura sai da lista.** Junto com as seis métricas de cor da
§1, isso fecha o quadro: **nada de cor, tom ou distribuição de escuro separa o
que o cliente aprova do que ele rejeita.** As duas variáveis que separam
continuam sendo tipográficas.

### O nulo é imune ao defeito que ele encontrou

Esta rodada achou um defeito de captura que vale registrar, porque muda o número
da própria LP: **a segunda faixa escura da `lp-final` não estava sendo medida.**
A seção `<section class="slab slab-hut8" data-reveal>` é revelada por scroll, e
foi capturada em `opacity: 0` — deixando o `--paper` aparecer por baixo. Na faixa
dela a `L` mediana deu **0,970**, que é exatamente o valor do `--paper`.

A causa está medida, e não é do agy: **o pré-scroll canônico da §8.1 do board é
rápido demais.** Com os 700px/90ms dele, **20 dos 25** elementos `[data-reveal]`
da LP ficam em `opacity: 0`; com 400px/120ms em duas passadas, sobram 2 — e os
dois são duplicatas de idioma em `display: none`, que o observer nunca vê.
Registrado em `provenance.md`, **P-012**, com a consequência declarada: qualquer
medição anterior de peça com revelação por scroll pode estar subestimada, e isso
**não foi verificado** nas 15 referências externas.

Corrigido, a `lp-final` tem **2 bandas e fração 0,2170**, não 1 e 0,1123 — quase
o dobro. As duas bandas conferem com medição de DOM independente: 938px e 870px.

A suspeita seguinte é a certa: se revelação esconde faixa escura, as peças
externas podem estar subestimadas também. **Mas a direção do erro é sempre a
mesma — subestimar escuro — e o nulo é imune a ela:** quatro rejeitados medem
fração **1,0000**, o máximo possível, e a faixa rejeitada já cobre `[0, 1]`
inteiro. Qualquer valor verdadeiro de uma peça aprovada cai dentro dela. Nenhuma
correção para cima pode produzir separação.

Corroboração contra o inventário de fundos da §3 do board, medido com outro
instrumento em outra rodada: paulkalkbrenner **0,4339** contra "preto em 43,7%";
lxlcreative **0,9451** contra "marrom em 98,6%"; illoca **0,0000** contra "areia,
branco e azul, nada escuro". Três de três.

> **Nota de método.** Esta sessão produziu **quatro** defeitos de instrumento,
> dois meus e dois da rodada delegada:
>
> | defeito | de quem | sintoma |
> |---|---|---|
> | sonda de contraste lendo a página antes da revelação | meu | 12 reprovações falsas, todas a `1,00:1` |
> | limiar de 300px aplicado em espaço de imagem, não de CSS | meu | `aelixa` com 0 bandas em vez de 3 |
> | captura com a slab escura em `opacity: 0` | agy | `lp-final` com metade do escuro |
> | M3 contando corrida escura de 1px | agy | `aelixa` com 32 transições e 3 bandas |
>
> Os quatro têm a mesma forma, e é a mesma dos três que o projeto já tinha
> registrado em `provenance.md`: **a régua errada devolve um número confiante, e
> o número passa por conclusão se ninguém o conferir contra uma segunda
> medição.** Nos quatro casos foi a segunda medição que pegou — não a revisão do
> texto.

---

## 7. O que fica pendente da #36

**Os pares que envolvem display não travam aqui.** A #36 vai propor display
entre 102 e 320px, e isso muda duas coisas na paleta:

1. **O limiar de contraste cai de 4,5:1 para 3:1** em todo texto `≥24px`. Amplia
   o que é permitido — e é justamente aí que uma cor reprovada hoje pode
   parecer liberada. A liberação é real, mas só para aquele tamanho.
2. **Uma headline tingida a 102–320px é área, não acento.** A gramática "campo
   grande de neutro + acento minúsculo de croma alto" pressupõe que o croma alto
   ocupe fração de 1% da área. Um display gigante colorido rompe isso. Se a #36
   propuser display tingido, esta paleta precisa ser relida.

**Um dado para a #36, achado por acidente nesta auditoria.** A sonda de
contraste encontrou um elemento de **232px** na página — `div.footer-wordmark`,
texto "AUGUSTO", `aria-hidden="true"`, 1144×227px, `charcoal` sobre `paper` a
17,2:1. A §12 mediu "maior título 46px" porque a sonda dela varre apenas
`h1`–`h6`, e este é um `div` decorativo.

**A classificação da §12 continua válida** — 46px é o maior *título*, e a LP
segue do lado rejeitado. Mas o registro é relevante para a #36: a peça **já
contém** tipografia de display acima do corte de 89px, e ela está no rodapé,
decorativa e escondida de leitor de tela. O corte não é sobre existir um glifo
grande; é sobre dominância tipográfica onde ela é lida. Fica para a #36 decidir,
não para esta issue.

---

## 8. Limites declarados

- **A auditoria de contraste cobre uma peça, em um viewport.** `lp-final.html` a
  `1440x900x1`, nos dois idiomas presentes no DOM. Os breakpoints de 320 a
  3440px da **#24** não foram medidos, e `clamp()` muda tamanho de fonte — logo
  muda o limiar aplicável. Um par em margem fina a 1440px pode trocar de
  categoria em outro viewport.
- **Estado de interação não foi medido.** `:hover`, `:focus-visible` e
  `aria-pressed` trocam cor em vários componentes. A sonda lê o estado de
  repouso.
- **`prefers-color-scheme: dark` não existe na peça** e portanto não foi
  auditado.
- **A conclusão negativa vale para o gosto do cliente, não para o recrutador.**
  Os 15 rótulos são dele. Que cor não decida **a leitura de um recrutador**
  continua não medido, e o `PROBLEMA-v1` é sobre recrutador. Este é o mesmo
  limite que o board declara para o corte de 89px.
- **Os dez rejeitados vêm todos do mesmo diretório**, sorteados no mesmo dia:
  linha de base do gênero, não amostra estratificada. E são 10 de 10 rejeitados,
  o que deixa o rótulo sem gradação.
- **Duas peças da amostra têm captura degradada:** `charityshot.co.uk` rola por
  sequestro (`scrollHeight` 900px, a medição vale para uma tela) e
  `simonbetton.com` carregou 4 de 14 imagens, subestimando a cor dele.

---

**FASE:** 1 — Evidência (issue #35)
**ARTEFATO:** este documento · `medicao-contraste/` (sonda, dados brutos e
gerador da tabela) · `medicao-banda-escura/` (instrumento, 16 capturas, dados
brutos, resultado verificado e o original do agy preservado)
**INSTRUMENTO:** WCAG 2.1 sobre o par renderizado, com fundo efetivo resolvido
na árvore e `alpha`/`opacity` acumulados; OKLCH para croma, matiz e luminância.
Viewport `1440x900x1`. **Pré-scroll de 400px/120ms em duas passadas** — o da
§8.1 do board é insuficiente, ver `provenance.md` P-012
**MEDIDO:** 242 elementos com texto próprio · 34 pares distintos · 0 reprovações
· 4 em margem fina · 0 texto sobre imagem. Banda escura em 16 peças: nulo nas
quatro métricas, N=15
**DECISÕES:** cor declarada **restrição, não diferencial**, com fonte nos dois
lados de uma amostra rotulada de 15 peças; sete regras normativas (R1–R7);
`--light` e `--h8-photo` removidos por serem tokens mortos, o segundo também por
procedência de marca falsa; banda escura medida e **declarada nula** nas quatro
métricas, fechando a última variável de cor que faltava; verde `#A4DE02` mantido
fora com justificativa medida (`ΔH = 11,2°`, `ΔC = 0,012`) em lugar do comentário
de protótipo; nenhum matiz novo proposto
**O QUE ESTE DOCUMENTO NÃO AUTORIZA:** tratar a paleta como resposta ao *"cara de
site morto"* — esse defeito está medido e é tipográfico, na #36; presumir que
satisfazer R1–R7 melhore a aprovação do cliente (satisfazer não atrapalha, e é
só isso que a medição sustenta); travar os pares de display antes da #36; e
estender a conclusão negativa do gosto do cliente para o julgamento de um
recrutador, que não foi medido
**QUESTÕES ABERTAS:** pares de display (§7, depende da #36) · contraste nos
breakpoints da #24 · estados de interação · `prefers-color-scheme: dark`
