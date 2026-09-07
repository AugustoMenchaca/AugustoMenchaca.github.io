# #35 — o que foi achado

Relatório da investigação. A **norma** que saiu dela vive em
`docs/design/PESQUISA-PALETA.md`; este arquivo é o registro do que a medição
encontrou, incluindo o que não era sobre paleta.

---

## O pedido, e o que ele virou

A issue nasceu como *"descobrir a paleta a partir de referências medidas"*. O
comentário da própria issue já a havia rebaixado de **diferencial para
restrição**, depois que a #17 fechou. Esta rodada confirmou o rebaixamento e
fechou a última variável que faltava.

A pergunta respondida não é *"qual paleta?"* — é *"dado que cor não decide, qual
restrição a paleta precisa respeitar para não atrapalhar o que decide?"*

---

## Achado 1 — cor não separa, e agora banda escura também não

Já estava medido que **nenhuma das seis métricas de cor** separa as 15 peças
rotuladas (5 aprovadas, 10 rejeitadas). O corpo original da issue, porém, pedia
duas medidas que o teste das dez variáveis **nunca cobriu**: contagem de tons
escuros distintos e bandas escuras contíguas.

Isso importava porque o diagnóstico da primeira reclamação — *"muito
agressivo"* — atribuiu a causa a temperamento cromático **e frequência de banda
escura**. O temperamento foi medido e refutado. A banda escura, não.

Medida agora, nas 16 peças (as 15 rotuladas mais a `lp-final.html`):

| métrica | aprovados | rejeitados | veredito |
|---|---|---|---|
| tons escuros distintos | 1 – 3 | 0 – 4 | **não separa** |
| número de bandas | 0 – 7 | 0 – 3 | **não separa** |
| fração em banda | 0,0000 – 0,9451 | 0,0000 – 1,0000 | **não separa** |
| alternância claro/escuro | 0 – 7 | 0 – 3 | **não separa** |

Os contraexemplos, um por métrica: `nextfive` (rejeitado) tem **4 tons
escuros**, mais que toda peça aprovada. `illoca` (aprovado) tem **0 bandas**,
igual a cinco rejeitados. `obspogon` (rejeitado) tem **3**, igual à `aelixa`
(aprovada). E na fração, a faixa rejeitada `[0 – 1,0]` **contém inteiramente** a
aprovada `[0 – 0,945]` — não existe corte possível, em nenhuma direção.

**Nada de cor, tom ou distribuição de escuro separa o que o cliente aprova do
que ele rejeita.** As duas variáveis que separam seguem sendo tipográficas:
maior título (corte ≈89px) e razão display/corpo (corte ≈5,6×), na #36.

Definição usada: escuro é `L OKLCH < 0,50`. O limiar não é arbitrário — as
quatro superfícies escuras do projeto medem `L` 0,150–0,339 e as quatro claras
0,917–1,000, e 0,50 cai no vazio entre as duas populações. Banda é corrida
contígua de **≥ 300 CSS px**, medida no pixel e não no `background-color`.

### E o temperamento, que ninguém havia medido nos rejeitados

Depois do review, medi as métricas de cor **por referência** com a sonda
canônica da §8.2 do board, sobre as capturas de `referencias-v3/`. Dois
resultados:

**Primeiro, a sonda reproduz a §3 e a §12 em 15 de 15 peças** — mesmas seis
métricas, mesmo temperamento das cinco aprovadas, mesmo croma de pico. Isso
valida de uma vez a tabela nova e a canônica.

**Segundo, o temperamento dos 10 rejeitados é dado novo.** A §3 mede
temperamento só das 5 aprovadas; a §12 mede as seis métricas dos rejeitados mas
não o temperamento. Medido nos dois lados, ele **também não separa**: as quatro
famílias que dominam alguma peça aprovada — amarelo, azul, roxo, verde — dominam
também alguma rejeitada.

| família dominante | aprovada | rejeitada |
|---|---|---|
| amarelo | `aelixa` 42,6% | `charityshot` 77,8% |
| roxo | `illoca` 68,6% | `shelomoh` 98,3% · `thatmlopsguy` 51,9% |
| verde | `paulkalkbrenner` 55,6% · `lxlcreative` 41,5% | `obspogon` 61,6% · `simonbetton` 78,9% |
| azul | `white-desert` 63,5% | `nextfive` 92,7% · `cassidoo` 34,2% |

Isso encerra a **última** hipótese de cor que havia sobrevivido à primeira
reclamação: o *"muito agressivo"* que eu atribuí a "81% da família vinho".
Nenhuma família de matiz prediz aprovação.

A única métrica pedida pela issue que continua sem medição por referência é
**área por cor** dos 10 rejeitados — ela exige o DOM, não o pixel. Está apontada
peça por peça, com seção, na §1 do entregável, e os cinco aprovados têm o
inventário completo na §3 do board.

---

## Achado 2 — a restrição de AA já estava satisfeita

Instrumento novo, em `docs/design/medicao-contraste/probe-contraste.js`. Ele não
combina tokens dois a dois — isso produz uma matriz cheia de pares que a página
nunca usa. Ele percorre quem tem texto próprio, resolve o **fundo efetivo**
subindo a árvore, acumula `alpha` e `opacity` (que reduzem contraste em
silêncio) e escolhe o limiar por tamanho e peso.

**242 elementos com texto · 34 pares distintos · 0 reprovações · 0 texto sobre
imagem.**

Isso reduz o trabalho de correção a nada e desloca o valor do entregável para o
que vem depois: as seções **#8–#15** ainda não existem, e é nelas que a
restrição pode ser quebrada. Daí as sete regras normativas.

Dois pares merecem nota, não conserto:

- `muted` sobre `stone` a **4,58:1** contra limiar 4,5 — passa por **0,08**, em
  14 usos. Qualquer escurecimento do stone ou clareamento do muted derruba.
- `muted` sobre `acid` a **4,98:1** — o segundo mais fino.

---

## Achado 3 — dois tokens mortos, e um deles mente sobre a procedência

- **`--light #8A8E93`** — declarado no `:root`, **zero usos**. Se uma seção nova
  o usar como texto de corpo: 3,02:1 sobre paper, **2,58:1** sobre stone,
  **2,84:1** sobre subtle — reprova até em texto grande nos dois últimos. Está
  no bloco parecendo disponível, e não é.
- **`--h8-photo #2A2A28`** — zero usos, e declarado sob o comentário
  `Sistema Hut 8 (manual de marca v1.0)`. **#2A2A28 não é uma das quatro cores
  do manual.** O bloco afirma procedência de marca para um valor que não tem.

Os dois saem da paleta.

---

## Achado 4 — o verde da marca ficava fora por palpite; agora tem número

O verde `#A4DE02` do manual da Hut 8 não existe como token na LP, e a razão
estava enterrada em um comentário de protótipo (`prototipo-c.html:370`:
*"Verde #A4DE02 fica FORA para nao colidir com o acid do portfolio"*).

Medido, o palpite está certo:

| | L | C | H |
|---|---|---|---|
| `--acid #E6F835` | 0,935 | 0,200 | 115,1° |
| `#A4DE02` | 0,830 | 0,212 | 126,3° |
| **diferença** | 0,105 | **0,012** | **11,2°** |

Croma praticamente idêntico a 11,2° de matiz de distância: mesma família
perceptual. E o verde carrega **a mesma proibição** do acid — 1,48:1 sobre
paper, 1,26:1 sobre stone, 1,61:1 sobre white. Virou a regra **R2**.

---

## Achado 5 — um botão escapa da paleta por omissão

`.rail-pause` define `border`, `background` e `font-family`, mas **não define
`color`**. Cai no `ButtonText` do navegador, **#000000**, que não é token nenhum
— o preto do sistema é `--charcoal #111213`.

O contraste está ótimo (19,26:1). O problema é de governança: é cor fora da
paleta, e muda com o tema do sistema operacional e sob `forced-colors`. Virou a
regra **R7**.

---

## Achado 6 — existe display de 232px na página, e a §12 não o via

A sonda de contraste encontrou, por acidente, um elemento de **232px**:
`div.footer-wordmark`, texto "AUGUSTO", `aria-hidden="true"`, 1144×227px,
`charcoal` sobre `paper` a 17,2:1.

A §12 do board mediu *"maior título 46px"* porque a sonda dela varre apenas
`h1`–`h6`, e este é um `div` decorativo. **A classificação da §12 continua
válida** — 46px é o maior *título*, e a LP segue do lado rejeitado.

Mas o registro é relevante para a **#36**: a peça **já contém** tipografia de
display acima do corte de 89px, e ela está no rodapé, decorativa e escondida de
leitor de tela. O corte não é sobre existir um glifo grande; é sobre dominância
tipográfica onde ela é lida.

---

## Achado 7, e é o maior — o pré-scroll canônico do board não revela

Rastreando um erro na medição da própria LP, a causa não estava na rodada
delegada: está no **instrumento canônico do board**, a §8.1 do
`REFERENCE-BOARD-v3`.

Medido na `lp-final.html`, que tem 25 elementos `[data-reveal]`:

| pré-scroll | elementos ainda em `opacity < 0,99` |
|---|---|
| §8.1 — 700px / 90ms | **20 de 25** |
| 400px / 120ms / 2 passadas | **2 de 25** — e os dois são duplicatas de idioma em `display: none`, que o observer nunca vê |

A consequência foi medida, não inferida. A seção
`<section class="slab slab-hut8" data-reveal>` — segunda faixa escura da página,
870px de altura, largura cheia, `rgb(11,11,11)` — foi capturada em
`opacity: 0`. Na faixa dela a captura devolve `L` mediana de **0,970**, que é
exatamente o valor do `--paper #F7F5EF`, e **0,0%** de pixels escuros na linha
5600. A peça mediu **1 banda e fração 0,1123**; o correto é **2 bandas e
0,2170** — quase o dobro.

Registrado como **P-012** em `provenance.md`. A consequência declarada vai além
desta issue: **qualquer medição anterior de peça com revelação por scroll pode
estar subestimada** — inclusive mídia, movimento e cor nas rodadas anteriores do
board. Isso **não foi verificado** nas 15 referências externas; o teste acima
vale para a LP, cujo mecanismo de revelação é conhecido.

### O nulo da banda escura sobrevive a esse defeito

A suspeita seguinte é a certa: se revelação esconde faixa escura, as peças
externas podem estar subestimadas também. **Mas a direção do erro é sempre a
mesma — subestimar escuro — e o nulo é imune a ela:** quatro rejeitados medem
fração **1,0000**, o máximo possível, e a faixa rejeitada já cobre `[0, 1]`
inteiro. Qualquer valor verdadeiro de uma peça aprovada cai dentro dela.
Nenhuma correção para cima produz separação.

Corroboração contra o inventário de fundos da §3 do board, medido com outro
instrumento em outra rodada: paulkalkbrenner **0,4339** contra "preto em 43,7%";
lxlcreative **0,9451** contra "marrom em 98,6%"; illoca **0,0000** contra
"areia, branco e azul, nada escuro". Três de três.

---

## Achado 8 — os instrumentos não eram reproduzíveis, e o defeito era meu

Apontado no review do PR. Verificado, e pior do que descrito:

- **`probe.js`** resolvia `../../wireframes/lp-final.html` mas escrevia em
  `docs/design/medicao-banda-escura/raw/` — **as duas metades assumiam CWDs
  diferentes, e nenhum CWD fazia as duas funcionarem.** É por isso que a rodada
  delegada precisou de um driver separado só para a LP.
- **`driver-lp-final.js`** era internamente consistente (tudo relativo à raiz do
  repositório), mas **o cabeçalho que eu escrevi mandava rodar de dentro da
  pasta**. A instrução versionada era minha, e quebrava o script.
- **`bandas.py`** também assumia a raiz, sem nada no arquivo dizendo isso.

Corrigido ancorando os caminhos no próprio arquivo (`__dirname` / `__file__`),
em vez de documentar "rode da raiz" — que só reintroduz o modo de falha. O fluxo
completo ficou em `medicao-banda-escura/README.md`, e roda de qualquer
diretório.

**`bandas.py` saiu do fluxo.** Além dos dois defeitos de régua já registrados,
rodá-lo **sobrescreve** `raw/lp-final.json` e `raw/obspogon.json`, que foram
remedidos — devolvendo os números errados. Fica no repositório como procedência
da rodada delegada, com a guarda escrita no cabeçalho.

### A re-execução, e o que ela mostrou

Rodei o fluxo inteiro de `/tmp`, um diretório sem relação com o repositório.
Comandos e resultados na **§8 do entregável**. Os quatro passos passaram, e o
`cor-por-referencia.py` reproduziu a §3 e a §12 do board em 15 de 15 peças.

E apareceu uma confirmação que eu não tinha: a captura fresca da LP pelo fluxo
documentado mede **1 banda e fração 0,1126**, contra **2 bandas e 0,2170** da
captura com scroll correto. A rodada delegada havia medido **0,1123**. Ou seja,
**o defeito da P-012 é determinístico e reproduzível**, não um azar de uma
execução.

---

## Os quatro defeitos de instrumento desta rodada

Dois meus, dois da rodada delegada. Tabelados porque o padrão é o mesmo dos três
que o projeto já tinha registrado:

| defeito | de quem | sintoma |
|---|---|---|
| sonda de contraste lendo a página antes da revelação | meu | 12 reprovações falsas, todas a `1,00:1`, com cor de texto igual à do fundo |
| limiar de 300px aplicado em espaço de imagem, não de CSS | meu | `aelixa` com 0 bandas em vez de 3 — ela foi capturada a 0,5× |
| captura com a slab escura em `opacity: 0` | agy | `lp-final` com metade do escuro que tem |
| M3 contando corrida escura de 1px | agy | `aelixa` com 32 transições tendo 3 bandas |

**A régua errada devolve um número confiante, e o número passa por conclusão se
ninguém o conferir contra uma segunda medição.** Nos quatro casos foi a segunda
medição que pegou — não a revisão do texto.

---

## A rodada delegada, e o que a verificação pegou

As 16 peças foram medidas pelo agy (Antigravity/Gemini) em paralelo à redação do
entregável. **14 reproduziram exatamente** na conferência. Duas não:

- a **`lp-final`** estava com metade do escuro (achado 7);
- a **`obspogon`** falhou por timeout de 30s, o que deixaria o teste com N=14.
  Remedida aqui e fechada: 1 tom, 3 bandas, fração 0,7981. **N=15.**

Também corrigi a M3 dele, que contava corrida escura de qualquer altura.

O que o agy fez bem, e vale registrar: **não vestiu o nulo de conclusão.**
Declarou a falha da `obspogon`, marcou as seis peças com imagem incompleta, e
não escreveu "GREEN" nem equivalente. O arquivo original dele está preservado em
`docs/design/medicao-banda-escura/RESULTADO-agy-original.md`, ao lado da versão
verificada.

Um resíduo que ele não declarou no digest: criou `fix_lp_final.js` na raiz do
repositório. **Não altera a LP** — conferido, `wireframes/` intacto; é um driver
de medição com nome enganoso. Movido para
`docs/design/medicao-banda-escura/driver-lp-final.js`, com cabeçalho honesto e
com o defeito da P-012 declarado dentro dele. O `package.json` de
`puppeteer-core` também foi escopado para essa pasta, para um manifesto na raiz
não fazer a LP parecer ter dependência de runtime que ela não tem.

---

## O que mudou no repositório

| arquivo | o que é |
|---|---|
| `docs/design/PESQUISA-PALETA.md` | **o entregável.** As sete regras R1–R7, os 34 pares medidos, a paleta e o que nela é escolha estética declarada |
| `docs/design/medicao-contraste/` | sonda de contraste, sonda de cor por referência, dados brutos e os dois geradores — nenhuma tabela é digitada |
| `docs/design/medicao-banda-escura/` | instrumento, dados brutos, resultado verificado e o original do agy |
| `docs/design/medicao-banda-escura/README.md` | o fluxo reproduzível, com o comando de cada passo e a ressalva da P-012 |
| `docs/design/provenance.md` | **P-012** — o defeito do pré-scroll |
| `CONTRIBUTING.md` | os arquivos novos na tabela de `docs/design/`, e a ressalva da P-012 no board vigente |

---

## O aceite, item por item

O aceite revisado da issue pedia três coisas:

1. **"A paleta proposta satisfaz todas as restrições, com o contraste de cada
   par medido."** — 34 pares medidos, 0 reprovações. Tabela na §3 do entregável,
   gerada dos dados brutos.
2. **"O documento declara explicitamente que cor não é o diferencial."** — é o
   título, a §1 e a §6 do entregável, com os números dos dois lados do
   julgamento.
3. **"Nenhum valor sem medição que o sustente. Se for escolha estética, é
   declarado como tal."** — a §5 tem a seção *"O que aqui é escolha estética"*:
   os matizes específicos são herança do briefing e **não têm base medida**. O
   que está medido é que a paleta satisfaz as restrições e cai na faixa
   descritiva das peças aprovadas. Isso é licença, não recomendação.

**A paleta proposta é a que já está no `:root`**, menos os dois tokens mortos,
mais sete regras. Nenhum matiz novo — e isso é a conclusão, não preguiça: a
medição não autoriza escolher cor, e trocar valores agora seria a quarta
tentativa de otimizar a variável errada.

---

## O que fica aberto

- **Os pares de display dependem da #36.** Display de 102–320px muda o limiar de
  4,5:1 para 3:1, e uma headline tingida nesse tamanho é **área, não acento** —
  o que rompe a gramática "campo grande de neutro + acento minúsculo". Se a #36
  propuser display tingido, esta paleta precisa ser relida.
- **Contraste nos breakpoints da #24** (320 a 3440px). Medi um viewport, 1440px.
  `clamp()` muda tamanho de fonte, logo muda o limiar aplicável: um par em
  margem fina aqui pode trocar de categoria em outro viewport.
- **Estados de interação.** `:hover`, `:focus-visible` e `aria-pressed` trocam
  cor em vários componentes. A sonda lê o estado de repouso.
- **`prefers-color-scheme: dark`** não existe na peça, e portanto não foi
  auditado.
- **A generalidade da P-012** nas 15 referências externas — declarada, não
  medida.
- **O nulo vale para o gosto do cliente, não para o recrutador.** Os 15 rótulos
  são dele. Que cor não decida a leitura de um recrutador continua não medido, e
  o `PROBLEMA-v1` é sobre recrutador. É o mesmo limite que o board declara para
  o corte de 89px.
