# REFERENCE-BOARD-v3 — referências escolhidas pelo cliente, medidas

**Por que este board existe:** das seis referências que embasaram o v1 e o v2,
apenas o Aelixa veio do cliente. O Codex apontou que a correlação medida podia
ser artefato da minha seleção, e eu aceitei. Este board refaz a Fase 2 com uma
amostra que **o cliente escolheu**.

**O que ele encontrou, e que eu não esperava:** o instrumento do v2 estava
errado em duas frentes independentes, e as duas foram expostas pelas
referências dele — não pelas minhas. Detalhe na seção 2.

> **Este board já passou por crítica independente, e foi reescrito por causa
> dela.** Codex e Antigravity leram a primeira versão sem coordenação entre si e
> **derrubaram 4 das 10 conclusões**, incluindo a principal. Um grupo de
> controle de 10 sites sorteados foi acrescentado depois, e derrubou outra.
>
> **Leia a §7 pelos vereditos, não pelas afirmações originais.** O registro do
> que caiu está na §11; o grupo de controle, na §10.
>
> **Depois disso o cliente rotulou os dez sites do controle** — rejeitou os dez
> — e a amostra virou **15 peças julgadas, 5 aprovadas e 10 rejeitadas**. A §12
> é o teste que essa amostra permitiu, e é a seção mais importante do board.
>
> Resultado, em uma linha: **de dez variáveis testadas, exatamente duas
> classificam os 15 julgamentos sem errar um — maior título e razão
> display/corpo.** Mídia, movimento e as seis métricas de cor não separam. E a
> `lp-final.html`, passada por esse classificador, sai **do lado rejeitado**.

---

## 1. A amostra

| referência | quem escolheu | o que é |
|---|---|---|
| `aelixa.webflow.io` | **cliente** | template Webflow de e-commerce |
| `illoca.unseen.co` | **cliente** | produto de design arquitetônico, cena WebGL |
| `paulkalkbrenner.net` | **cliente** | site oficial de músico |
| `lxlcreative.co.uk` | **cliente** | portfólio de estúdio criativo |
| `white-desert.com` | **cliente** | viagem de luxo à Antártida |

Cinco de cinco escolhidas pelo cliente. Nenhuma escolhida por mim.

Capturas em `docs/design/referencias-v3/*.png`, a 1440 de largura.

---

## 2. O instrumento do v2 estava quebrado, e a amostra dele provou

### Defeito 1 — croma HSV chama neutro tingido de cor

O v2 definiu área cromática como *"soma da área dos fundos com croma > 0,15"*,
onde croma era saturação HSV, `(max−min)/max`. Essa fórmula é cega para o quão
escura a cor é.

| fundo | de onde | croma HSV (v2) | **croma OKLCH (real)** | o olho vê |
|---|---|---|---|---|
| `rgb(39,32,29)` | lxlcreative, 98,6% da área | 0,26 → "cromático" | **0,012** | marrom quase preto |
| `rgb(9,11,16)` | white-desert, 13,7% da área | 0,44 → "cromático" | **0,011** | preto azulado |
| `rgb(13,27,42)` | IDF-BR, registrado no v2 como "croma 0,69" | 0,69 | **0,036** | navy escuro |

Resultado: o **lxlcreative mediu 99,4% de área cromática** pela régua do v2. Ele
não é 99,4% colorido — ele é um campo marrom escuro quase neutro com dois
acentos minúsculos.

### Defeito 2 — a régua lê só `background-color`

Foto, gradiente, `<img>` e `<canvas>` são invisíveis para ela. Isso importa
porque **é exatamente aí que a cor mora** nas referências do cliente: o Aelixa
tem 81 imagens, o white-desert 29, o paulkalkbrenner 83, o illoca é uma cena
WebGL inteira.

O v2 concluiu *"cor não é a variável"* medindo tudo menos as superfícies onde a
cor está.

### Defeito 3 — métrica CSS é cega para movimento em JS

O `illoca.unseen.co` mede **0 keyframes e 0 animações ativas**. É uma cena
**WebGL2 de 2160×1350** rodando ao vivo. Nenhuma métrica de CSS enxerga isso.

**Cuidado ao citar este defeito** — eu mesmo tropecei nele. "0 keyframes" não
quer dizer "página parada": o illoca tem **15 elementos em transição, 16,67 por
1000px**, a segunda maior densidade de movimento da amostra. O que a métrica de
CSS não vê é a **cena**, não o movimento de interface.

### O que substituiu

1. **Croma perceptual OKLCH** no lugar de saturação HSV. Limiares: `C ≥ 0,05`
   cor perceptível, `C ≥ 0,12` cor forte.
2. **Medição nos pixels renderizados** da captura de página inteira, não no
   `background-color` do DOM. Inclui foto, gradiente e canvas.
3. As duas rodam lado a lado, e a coluna do v2 fica na tabela para o erro ficar
   visível.

Os dois scripts estão na seção 8, na íntegra. **O v2 não guardou o dele — é por
isso que uma linha daquele board não é reproduzível hoje** (transições do
Aelixa: registrado 18, remedido 74; o paco.me bateu exato em 13, então o método
é o mesmo e o que mudou foi a página).

---

## 3. Cor — medida nos pixels reais

| peça | cor perceptível `C≥0,05` | **cor forte `C≥0,12`** | quase neutro `C<0,02` | croma médio | L mediana |
|---|---|---|---|---|---|
| white-desert | 2,7% | **0,0%** | 92,2% | 0,006 | 1,00 |
| Aelixa | 4,4% | **0,5%** | 88,8% | 0,008 | 0,99 |
| lxlcreative | 5,2% | **2,3%** | 90,9% | 0,020 | **0,25** |
| paulkalkbrenner | 26,8% | **22,0%** | 69,7% | 0,042 | 0,82 |
| illoca | 34,5% | **30,2%** | 25,7% | 0,069 | 0,80 |

**A evidência do v2 cai. E a minha conclusão substituta também.**

O v2 disse "cor não é a variável" porque todas as peças mediam perto de zero.
Isso era artefato da régua errada. Medido no pixel, a cor forte varia de **0,0%
a 30,2%** entre as cinco — duas ordens de grandeza.

A primeira versão desta seção concluía daí que *"cor não prediz vitalidade
porque varia livremente entre coisas que ele gosta"*. **Codex e Antigravity
mataram essa frase, separadamente, com o mesmo argumento — e eles estão
certos.**

As cinco peças foram escolhidas **por serem amadas**. Não existe nenhuma que o
cliente tenha rejeitado. **Sem variação na coisa a ser explicada, não há
predição a estimar** — isso é seleção na variável dependente, e o resultado é
nulo, não descoberta. Eu vesti um resultado nulo de conclusão.

**O que esta tabela autoriza, e só isso:** uma faixa descritiva de quanta cor
forte aparece em peças que o cliente aprova — de 0,0% a 30,2%. Ela não diz que
cor não importa, nem que importa.

> **Resolvido na §12.** Faltavam peças **rejeitadas** pelo cliente, e elas
> chegaram: ele julgou os dez sites do grupo de controle e reprovou os dez. Com
> os dois lados na amostra, a pergunta de cor ficou respondível — e a resposta é
> que **nenhuma das seis métricas de cor separa aprovado de rejeitado**. A #35
> tem conclusão; ela é negativa.

### Croma de pico e temperamento por família de matiz

Medidos no pixel renderizado. Temperamento é a repartição da área **colorida**
(`C ≥ 0,05`) por família de matiz — não da área total.

| peça | croma de pico (pixel) | croma de pico (fundo CSS) | temperamento da área colorida |
|---|---|---|---|
| lxlcreative | **0,251** | 0,251 · azul `rgb(5,93,255)` | verde 41,5% · roxo 32,5% · laranja 19,9% · amarelo 5,1% |
| paulkalkbrenner | **0,247** | 0,196 · laranja `rgb(255,104,49)` | **verde 55,6%** · laranja 39,9% · amarelo 3,4% · azul 0,5% |
| white-desert | **0,239** | 0,185 | **azul 63,5%** · roxo 19,5% · amarelo 11,2% · laranja 5,6% |
| Aelixa | **0,219** | 0,153 · dourado `rgb(241,186,53)` | **amarelo 42,6%** · laranja 29,9% · verde 12,0% · azul 10,3% |
| illoca | **0,208** | 0,109 · azul `rgb(40,63,125)` | **roxo 68,6%** · azul 31,0% · laranja 0,4% |

**Duas leituras que a tabela permite.** O croma de pico é praticamente constante
— **0,208 a 0,251**, faixa estreita — mesmo entre peças cujas áreas coloridas
diferem em duas ordens de grandeza. Quando essas peças usam cor, usam **cor
saturada**; o que varia é **quanta**, não quão intensa.

Sobre temperamento, há uma tendência — e ela **não** é o corte limpo que eu
escrevi na primeira versão desta seção. Somando as quatro famílias principais de
cada peça em dois eixos:

| peça | eixo amarelo-laranja-verde | eixo azul-roxo |
|---|---|---|
| paulkalkbrenner | **98,9%** | 0,5% |
| Aelixa | **84,5%** | 10,3% |
| lxlcreative | **66,5%** | **32,5%** |
| white-desert | 16,8% | **83,0%** |
| illoca | 0,4% | **99,6%** |

Três pendem para o eixo amarelo, duas para o azul. Mas **só duas são puras** —
paulkalkbrenner (98,9 / 0,5) e illoca (0,4 / 99,6). O lxlcreative tem **32,5% de
roxo** e o white-desert **16,8%** no eixo amarelo: são misturas, não campos
separados. Eu tinha escrito "nenhuma das cinco mistura os dois eixos", e a minha
própria tabela desmente.

Evito também o par quente/frio: o verde do paulkalkbrenner (`rgb(167,255,156)`,
matiz 142) não é cor quente, e forçar esse rótulo seria interpretação por cima
da medição.

*Nota de leitura:* as porcentagens cobrem as **quatro famílias principais** de
cada peça, não todas. No Aelixa elas somam 94,8%; os 5,2% restantes estão em
famílias menores.

> Isto é **descrição da amostra, não direção de paleta.** Vale a ressalva da
> seleção na variável dependente: sem peça rejeitada, não dá para dizer que
> quente ou frio, saturado ou lavado, tenha qualquer efeito.

### Área por cor — o inventário completo dos fundos

`background-color` opaco, área maior que 900px², ponderado por área. `C` é croma
OKLCH: abaixo de 0,05 é neutro ou neutro tingido, por mais que a cor tenha nome.

| peça | fundos, em ordem de área |
|---|---|
| **Aelixa** | creme `rgb(253,251,248)` 66,6% `C=0,005` · branco 22,2% `C=0` · grafite `rgb(36,36,36)` 10,5% `C=0` · **dourado `rgb(241,186,53)` 0,3% `C=0,153`** · `rgb(51,51,51)` 0,2% |
| **illoca** | areia `rgb(234,223,201)` 71,0% `C=0,032` · branco 18,1% `C=0` · **azul `rgb(40,63,125)` 10,0% `C=0,109`** · `rgb(253,248,240)` 0,9% `C=0,012` · `rgb(91,91,91)` 0% |
| **paulkalkbrenner** | preto 43,7% `C=0` · branco 38,7% `C=0` · cinza `rgb(197,197,197)` 9,3% `C=0` · **verde `rgb(167,255,156)` 5,4% `C=0,156`** · **laranja `rgb(255,104,49)` 2,8% `C=0,196`** |
| **lxlcreative** | marrom `rgb(39,32,29)` 98,6% `C=0,012` · **azul `rgb(5,93,255)` 0,7% `C=0,251`** · preto 0,4% · branco 0,2% · **laranja `rgb(255,81,33)` 0,1% `C=0,218`** · `rgb(252,242,189)` 0% `C=0,069` |
| **white-desert** | branco 78,7% `C=0` · quase-preto `rgb(9,11,16)` 13,7% `C=0,011` · `rgb(233,231,225)` 3,0% `C=0,008` · preto 2,7% · `rgb(245,245,245)` 1,4% · `rgb(243,241,236)` 0,3% `C=0,007` |

**O paulkalkbrenner é o único que põe cor saturada em área de fundo relevante**
— 8,2% somando verde e laranja. Nos outros quatro, todo fundo acima de 10% de
área tem `C ≤ 0,032`: são neutros, ou neutros tingidos. A cor deles, quando
existe, está na **foto e no canvas** — que é o que a §3 mede no pixel, e o que a
régua do v2 não via.

**Uma forma aparece em duas das cinco:** campo grande de neutro tingido +
acento minúsculo de croma alto.

| peça | campo | acento | área do acento |
|---|---|---|---|
| Aelixa | creme `rgb(253,251,248)`, C=0,005, 66,6% | dourado `rgb(241,186,53)`, **C=0,153** | 0,3% |
| lxlcreative | marrom `rgb(39,32,29)`, C=0,012, 98,6% | azul `rgb(5,93,255)`, **C=0,251** | 0,7% |

> **Correção.** A primeira versão desta seção dizia "três das cinco" e incluía o
> site da Ciere na tabela. **A Ciere é trabalho do cliente, não referência dele**
> — misturar as duas populações para fechar um padrão de três foi erro meu,
> apontado pelo Codex. São duas de cinco, e duas de cinco não é padrão.
>
> A generalização "onde há cor, a forma é esta" também não se sustenta: illoca e
> paulkalkbrenner têm **30,2% e 22,0% de cor forte** e não seguem essa gramática.

Vale registrar à parte, como observação e não como padrão: o site da Ciere
(`rgb(243,236,220)` C=0,023 em 64,4%, com dourado `rgb(206,145,0)` C=0,145 em
0,2%) tem a mesma assinatura do Aelixa. É trabalho do próprio cliente, e sugere
que a gramática já lhe é familiar — mas é uma peça só, e não entra como
evidência de amostra.

### A comparação do v2 com o trabalho dele estava errada

O v2 afirmou: *"o trabalho do próprio cliente é 45 a 57× mais cromático que a
referência dele"*. Remedido:

| peça | área cromática v2 (HSV) | **cor forte real (OKLCH)** |
|---|---|---|
| IDF-BR | 18,4% → remedido 26,9% | **0,0%** |
| Ciere | 22,8% → remedido 22,7% | **0,2%** |
| DVO | 20,1% → remedido **0,0%** (o site mudou, hoje é 100% branco) | **0,0%** |
| Aelixa | 0,4% | **0,5%** |

**A afirmação se inverte.** Sob a régua perceptual, o Aelixa tem mais cor forte
que os três projetos dele. O "45 a 57×" era artefato de somar neutros tingidos.

---

## 4. Mídia — eu disse que era o buraco, e o controle mostrou que não é

| peça | altura | telas | `<img>` | `<svg>` | `<video>` | `<canvas>` | **mídia por 1000px** |
|---|---|---|---|---|---|---|---|
| illoca | 900 | 1,0 | 0 | 49 | 0 | **1 WebGL2** | **55,56** |
| Aelixa | 17495 | 19,4 | 81 | 91 | 1 | 0 | **9,89** |
| paulkalkbrenner | 10408 | 11,6 | 83 | 3 | 0 | 0 | **8,26** |
| lxlcreative | 15301 | 17,0 | 39 | 50 | 2 | 0 | **5,95** |
| white-desert | 20782 | 23,1 | 29 | 56 | 1 | 0 | **4,14** |
| **lp-final.html (nossa)** | 8417 | 9,4 | **0** | **2** | 0 | 0 | **0,24** |

> **Esta seção foi reescrita depois da crítica independente e do grupo de
> controle (§10 e §11). A versão original afirmava que mídia era "a única
> variável em que a LP está fora da faixa" e citava um déficit de 17× a 234×.
> As duas coisas estavam erradas.**

**O que o número mede, e o que ele não mede.** `midiaTotalPor1000` conta **nós
do DOM por altura de documento**: um ícone SVG de 16px pesa igual a uma
fotografia de tela cheia. Os 55,56 do illoca são majoritariamente **49 ícones**,
não 49 imagens. O multiplicador "234×" comparava contagem de nó, não presença
visual, e não sustenta o que eu disse que sustentava. Defeito apontado pelo
Codex e aceito.

**E o grupo de controle derrubou o resto.** Dez sites pessoais sorteados ao
acaso (§10) têm mediana de **3,61** e faixa de **0,60 a 81,11** — sobreposta
quase por inteiro à faixa das referências do cliente (4,14 a 55,56). O
`charityshot.co.uk`, sorteado, mede **81,11**: mais que qualquer referência
que o cliente escolheu.

**Conclusão corrigida: densidade de mídia não distingue o que o cliente ama de
um site pessoal qualquer.** Ela não é a variável que explica a diferença.

O que sobrevive é mais estreito, e é sobre a LP, não sobre a amostra dele: com
**0,24**, a `lp-final.html` fica abaixo dos dez sorteados — **15× abaixo da
mediana** e 2,5× abaixo até do menor deles (`cassidoo.co`, 0,60). A LP tem
déficit de mídia contra o gênero inteiro. Só não é isso que a torna diferente
das peças que o cliente admira.

---

## 5. Movimento — a quantidade não separa nada; a velocidade separa

| peça | keyframes | **kf/1000px** | elems em transição | **trans/1000px** | animações ativas | duração dominante |
|---|---|---|---|---|---|---|
| paulkalkbrenner | 1 | 0,10 | 352 | **33,82** | 2 | **0,3s** (289) |
| illoca | 0 | **0** | 15 | **16,67** | 0 | 0,3s / 0,5s (5 cada) |
| **lp-final.html (nossa)** | 3 | **0,36** | 75 | **8,91** | 9 | **0,6s** (52) |
| white-desert | 6 | **0,29** | 144 | **6,93** | 4 | **0,3s** (133) |
| lxlcreative | 1 | 0,07 | 83 | **5,42** | 0 | 0,5s (23), 0,3s (18) |
| Aelixa | 1 | 0,06 | 74 | **4,23** | 0 | **0,3s** (54) |

**Keyframes por 1000px é quase ruído nesta amostra** — todas as cinco ficam
entre 0 e 0,29, e a LP, com 0,36, é a *mais alta* de todas. `@keyframes` não é
onde o movimento dessas páginas mora: ele está em `transition` e, no illoca, em
WebGL. Registro a coluna porque a issue a pede, mas ela não sustenta conclusão.

Contagem de keyframes é **piso**: folhas de estilo de outra origem bloqueiam a
leitura em cinco das seis linhas — todas menos o white-desert (§8.3).

**Duas correções ao v2, as duas contra mim.**

1. O v2 registrou a LP com **1,2 elementos em transição por 1000px** e a
   diagnosticou no "quadrante sem mídia e sem movimento". Esse número **não
   reproduz**: medida agora, ela tem **8,91**, dentro da faixa da amostra do
   cliente e da faixa do grupo de controle (§10, mediana 10,26).
   **Ressalva de construto, aceita do Codex:** `emTransicao` conta
   `transition-duration` declarada, sem saber se a transição é acionada, se o
   elemento está visível, que propriedade anima nem com que amplitude. Serve
   para derrubar o "1,2" do v2; **não serve** para afirmar que a LP tem
   movimento suficiente.
2. O que sobrevive sem depender desse proxy é o **déficit de velocidade**, e
   ele é o achado mais duro deste board depois da tipografia: a duração
   dominante da LP é **0,6s**; as cinco referências do cliente convergem em
   **0,3s**, e os dez sites sorteados do grupo de controle ficam entre **0,18s e
   0,3s**. **A LP é outlier em duas populações independentes**, e duração
   declarada é lida direto do CSS computado — não é proxy de nada.

**A regra "uma única duração" não tem nenhuma referência do cliente por trás.**
Ela veio do paco.me, que é escolha minha, e é contradita pelas cinco: o
paulkalkbrenner usa 8 durações distintas, o lxlcreative 8, o white-desert 5. A
gramática real da amostra dele é **uma duração dominante com dispersão em volta**,
não uma constante única.

Os 0,24s do paco.me também caem: o número do cliente é **0,3s**.

---

## 6. Tipografia — o achado principal, e o único corte limpo do board

| peça | tamanhos distintos de título | maior | workhorse | **razão** |
|---|---|---|---|---|
| white-desert | 7 | **320px** | 16px | **20,0×** |
| Aelixa | 8 | 240px | 18px | **13,3×** |
| paulkalkbrenner | 4 | 150px | 14px | **10,7×** |
| illoca | 5 | 111px | 12px | **9,3×** |
| lxlcreative | 7 | 102px | 17px | **6,0×** |
| **lp-final.html (nossa)** | 4 | **46px** | 14px | **3,3×** |

**As cinco convergem numa coisa só: display grande.** O menor display da amostra
dele é 102px. O nosso maior título é 46px — **2,2× menor que o menor deles, 7×
menor que o maior.** A razão display/corpo deles vai de 6× a 20×; a nossa é 3,3×.

### É aqui que está o achado, e só se enxerga com o grupo de controle

| população | maior título | faixa |
|---|---|---|
| 10 sites pessoais sorteados (§10) | mediana **39px** | **20 – 76px** |
| as 5 referências do cliente | mediana **150px** | **102 – 320px** |
| `lp-final.html` | **46px** | — |

**As duas populações não se tocam.** O maior display do controle é 76px; o menor
das referências é 102px. **Zero sobreposição.** De tudo que este board mediu —
cor, mídia, movimento, altura, densidade — **tipografia de display é a única
variável que separa as duas populações sem ambiguidade.**

E o corolário inverte o diagnóstico do projeto: **os 46px da LP estão acima da
mediana do controle, que é 39px.** A LP não é tipograficamente pobre. Ela é
**típica do gênero** — acertou a norma dos sites pessoais. O que está fora da
norma é o gosto do cliente.

Isso explica um fato que estava sem explicação desde o v2: por que ele olha a LP
e diz "cara de site morto" enquanto ela não tem defeito aparente. Ela não tem
defeito **contra o gênero**. Ela tem distância **contra a referência dele** — e a
distância mora quase toda na tipografia de display, que é justamente a variável
que não custa asset nenhum.

Ressalva que fica de pé: a sonda lê `font-size` de `h1`–`h6` sem checar
visibilidade, função ou se o texto é uma palavra de marca ou uma frase longa. As
cinco referências têm frase curta de marca; a LP precisa carregar cargo,
formação e cinco projetos. **O corte de 102px é medição; que ele seja
transferível para este conteúdo, não é** — vai para a #36.

**E isso derruba uma decisão que eu tinha tomado.** O v1 usou a Folha de S.Paulo
— escolha minha — que mede razão manchete/massa de **2,7×**, e daí saiu a
contenção tipográfica das hipóteses H1–H6. Nenhuma das cinco referências do
cliente fica perto de 2,7×. A referência que embasou a contenção era do domínio
errado: jornal otimiza densidade de leitura, portfólio otimiza impacto de
entrada.

Corpo de texto: 12 a 18px, mediana **16px**.

---

## 7. Conclusões, com o veredito da crítica em cada uma

Esta tabela é a **versão pós-crítica**. Os vereditos vieram da crítica
independente de Codex e Antigravity (§11) e do grupo de controle (§10). Quatro
conclusões da primeira versão caíram, três sobrevivem inteiras, três em parte.

| # | conclusão original | veredito | o que ficou |
|---|---|---|---|
| 1 | duas rotas excludentes estão mortas | **FRACA** | Mídia e movimento coexistem no paulkalkbrenner (83 img *e* 33,82/1000px) — isso basta para negar exclusividade. Mas `n=5` contesta universalidade, não declara tipologia morta. **E eu contradisse minha própria tabela:** o illoca tem **15 elementos em transição, 16,67/1000px**, a segunda maior densidade de movimento da amostra — não é verdade que ele "não faz nenhuma das duas" |
| 2 | existe uma terceira rota: cena em canvas | **FRACA, e vetada** | O canvas WebGL2 do illoca é real e o instrumento CSS é cego para ele. Mas um caso é possibilidade, não rota. E o Antigravity vetou pelo job to be done: `Ctrl+F` de recrutador não acha texto dentro de `<canvas>`, leitor de tela é cego, `prefers-reduced-motion` exige JS pesado |
| 3 | mídia é a única variável fora da faixa, 17× a 234× abaixo | **CAI** | Duas vezes. A métrica conta nó do DOM, não presença visual (Codex). E o controle §10 sobrepõe as faixas: um site sorteado mede 81,11, acima de qualquer referência do cliente. **Sobra:** a LP, com 0,24, fica 15× abaixo da mediana do controle |
| 4 | cor não prediz vitalidade porque varia livre | **CAI** | Seleção na variável dependente: as cinco foram escolhidas *por serem amadas*. Sem peça rejeitada, não há variação em vitalidade para explicar. **É resultado nulo, e eu o vesti de descoberta.** Achado dos dois críticos, independentemente |
| 5 | onde há cor: campo tingido + acento minúsculo | **CAI** | São **duas** das cinco, não três — a terceira que eu listei era a Ciere, trabalho do cliente, não referência. E illoca (30,2%) e paulkalkbrenner (22,0%) contradizem |
| 6 | a duração é 0,3s, não 0,24s | **SOBREVIVE** | Dominante em três das cinco, presente nas cinco. **Reforçada pelo controle:** os dez sorteados ficam entre **0,18s e 0,3s** |
| 7 | "uma única duração" é falso para a amostra dele | **SOBREVIVE** | Conclusão negativa e estreita: paulkalkbrenner 8 durações, lxlcreative 8, white-desert 5 |
| 8 | a LP não é pobre em movimento, é lenta | **METADE CAI** | "Quantidade de movimento" conta `transition-duration` declarada, sem saber se é acionada, visível ou de que amplitude — proxy fraco (Codex). **Sobrevive a metade da velocidade:** 0,6s da LP contra 0,18–0,3s das *duas* populações. É outlier nas duas |
| 9 | display grande é o único traço unânime | **SOBREVIVE, e virou o achado principal** | Ver §6. Controle 20–76px, referências 102–320px, **zero sobreposição** — a única variável medida que separa as populações. "Único traço unânime" era afirmação sem inventário exaustivo; "única que separa as duas populações" é medição |
| 10 | a contenção de 2,7× da Folha não tem base | **SOBREVIVE** | Nenhuma das cinco fica perto de 2,7×. Isso elimina a Folha como fonte — mas não prova que 6×–20× sirva para o job de recrutamento |

### O achado, em uma frase

**A LP acertou a norma do gênero e errou a referência do cliente**, e a distância
entre as duas mora quase inteira em tipografia de display — a única variável que
separa as populações, e a única que não custa asset.

### Aceite da issue #17

**Atendido.** Cada uma das três frentes tem conclusão com referência escolhida
pelo cliente como fonte:

| frente | conclusão | fonte |
|---|---|---|
| **tipografia** | display ≥ ~89px e razão ≥ ~5,6× separam aprovado de rejeitado, 15/15 | as 5 aprovadas e as 10 rejeitadas, §12 |
| **movimento** | duração dominante 0,3s, sem constante única; a LP a 0,6s é outlier | as 5 aprovadas, §5; controle §10 |
| **paleta** | **cor não é critério de decisão do cliente** — nenhuma das 6 métricas de cor separa, e em 3 delas os 5 aprovados caem inteiros na faixa rejeitada | as 5 aprovadas e as 10 rejeitadas, §12 |

A conclusão de paleta é **negativa**, e isso foi conquistado, não contornado: a
primeira versão deste board tinha uma conclusão de cor **positiva** que caiu por
seleção na variável dependente. Só depois de o cliente rotular dez peças
rejeitadas é que a pergunta ficou respondível — e a resposta é que cor não
decide. **A #35 tem resposta; só não é a que ela esperava.**

**Ressalva estrutural que permanece, aceita do Codex:** os dez rejeitados vêm
todos do mesmo diretório, sorteados no mesmo dia, e nenhuma peça foi testada com
recrutador. O corte de 89px separa o **gosto do cliente**; que ele sirva ao job
to be done do `PROBLEMA-v1` continua não medido.

---

## 8. O instrumento, na íntegra

Chrome headless, `emulate --viewport 1440x900x1`. Capturas de página inteira a
`x0.5` quando a altura passa do limite do Chrome (~16384px device pixels).

### 8.1 Sonda de DOM — mídia, movimento, tipografia, cor de fundo

```js
() => {
  const P = s => { const m=String(s).match(/rgba?\(([^)]+)\)/); if(!m) return null;
    const p=m[1].split(/[,\s\/]+/).filter(Boolean).map(Number);
    return (p.length<3||p.some(Number.isNaN))?null:{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const lin = c => { c/=255; return c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  const oklch = ({r,g,b}) => {
    const R=lin(r),G=lin(g),B=lin(b);
    const l=Math.cbrt(0.4122214708*R+0.5363325363*G+0.0514459929*B);
    const m=Math.cbrt(0.2119034982*R+0.6806995451*G+0.1073969566*B);
    const s=Math.cbrt(0.0883024619*R+0.2817188376*G+0.6299787005*B);
    const L=0.2104542553*l+0.7936177850*m-0.0040720468*s;
    const A=1.9779984951*l-2.4285922050*m+0.4505937099*s;
    const Bb=0.0259040371*l+0.7827717662*m-0.8086757660*s;
    let H=Math.atan2(Bb,A)*180/Math.PI; if(H<0)H+=360;
    return {L, C: Math.hypot(A,Bb), H};
  };
  const hsvS = ({r,g,b}) => { const mx=Math.max(r,g,b),mn=Math.min(r,g,b); return mx===0?0:(mx-mn)/mx; };
  let total=0, hsv15=0, c05=0, c12=0, somaC=0, picoC=0;
  const cores=new Map(); const todos=document.querySelectorAll('*');
  for (const el of todos) {
    const c=P(getComputedStyle(el).backgroundColor); if(!c||c.a!==1) continue;
    const rc=el.getBoundingClientRect(); const ar=rc.width*rc.height; if(ar<=900) continue;
    total+=ar; const o=oklch(c);
    somaC+=o.C*ar; if(o.C>picoC) picoC=o.C;
    if(hsvS(c)>0.15) hsv15+=ar;
    if(o.C>=0.05) c05+=ar;
    if(o.C>=0.12) c12+=ar;
    const k=`rgb(${c.r},${c.g},${c.b})`;
    const p=cores.get(k)||{a:0,C:o.C,L:o.L,H:o.H}; p.a+=ar; cores.set(k,p);
  }
  const pc = n => total? Math.round(n/total*1000)/10 : 0;
  const img=document.querySelectorAll('img').length, svg=document.querySelectorAll('svg').length,
        video=document.querySelectorAll('video').length, canvas=document.querySelectorAll('canvas').length;
  let keyframes=0; const nomes=[]; let bloq=0;
  const varrer=(rs)=>{ for(const r of rs){ if(r.type===7){keyframes++;nomes.push(r.name);}
    else if(r.cssRules){try{varrer(r.cssRules);}catch(e){}} } };
  for (const s of document.styleSheets) { try{ varrer(s.cssRules); }catch(e){ bloq++; } }
  const dur=new Map(); let trans=0, anim=0;
  for (const el of todos) {
    const cs=getComputedStyle(el); const d=cs.transitionDuration;
    if (d && d.split(',').some(x=>parseFloat(x)>0)) { trans++;
      d.split(',').map(x=>x.trim()).forEach(x=>{ if(parseFloat(x)>0) dur.set(x,(dur.get(x)||0)+1); }); }
    if (cs.animationName && cs.animationName!=='none') anim++;
  }
  const tit=[...new Set([...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .map(el=>Math.round(parseFloat(getComputedStyle(el).fontSize))))].sort((a,b)=>b-a);
  const corpo=new Map();
  for (const el of document.querySelectorAll('p,li,td,dd,figcaption')) {
    if(!el.textContent.trim()) continue;
    const fs=Math.round(parseFloat(getComputedStyle(el).fontSize)); corpo.set(fs,(corpo.get(fs)||0)+1); }
  const wh=[...corpo.entries()].sort((a,b)=>b[1]-a[1])[0];
  const altura=Math.max(document.documentElement.scrollHeight, document.body?document.body.scrollHeight:0);
  const p1000=n=>Math.round(n/altura*1000*100)/100;
  return { url: location.href, altura, telas: Math.round(altura/900*10)/10,
    metricaV2_hsvS015: pc(hsv15), corPerceptivel_C005: pc(c05), corForte_C012: pc(c12),
    cromaMedioPonderado: total? Math.round(somaC/total*1000)/1000 : 0,
    cromaPicoOklch: Math.round(picoC*1000)/1000,
    fundos: [...cores.entries()].sort((a,b)=>b[1].a-a[1].a).slice(0,6)
      .map(([cor,v])=>({cor, pct: pc(v.a), L: Math.round(v.L*100)/100,
                        C: Math.round(v.C*1000)/1000, H: Math.round(v.H)})),
    midia:{img,svg,video,canvas}, midiaTotalPor1000: p1000(img+svg+video+canvas),
    keyframes, nomes, keyframesPor1000: p1000(keyframes), folhasBloqueadas: bloq,
    emTransicao: trans, emTransicaoPor1000: p1000(trans), animacoesAtivas: anim,
    duracoes: [...dur.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8),
    tamTitulos: tit, workhorse: wh?{px:wh[0],ocorrencias:wh[1]}:null,
    razaoTituloWorkhorse: (tit.length&&wh)? Math.round(tit[0]/wh[0]*100)/100 : null };
}
```

Antes de capturar página inteira, role para carregar imagem preguiçosa:

```js
async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r=>setTimeout(r,90)); }
  window.scrollTo(0, 0); await new Promise(r=>setTimeout(r,700));
  const imgs=[...document.querySelectorAll('img')];
  return { altura: document.documentElement.scrollHeight, imgs: imgs.length,
           carregadas: imgs.filter(i=>i.complete && i.naturalWidth>0).length };
}
```

### 8.2 Sonda de pixel — cor real, incluindo foto e canvas

```python
import sys, json, numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

def oklch(rgb):
    c = rgb.astype(np.float64) / 255.0
    lin = np.where(c <= 0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    R, G, B = lin[...,0], lin[...,1], lin[...,2]
    l = np.cbrt(0.4122214708*R + 0.5363325363*G + 0.0514459929*B)
    m = np.cbrt(0.2119034982*R + 0.6806995451*G + 0.1073969566*B)
    s = np.cbrt(0.0883024619*R + 0.2817188376*G + 0.6299787005*B)
    L = 0.2104542553*l + 0.7936177850*m - 0.0040720468*s
    A = 1.9779984951*l - 2.4285922050*m + 0.4505937099*s
    Bb= 0.0259040371*l + 0.7827717662*m - 0.8086757660*s
    return L, np.hypot(A, Bb), np.degrees(np.arctan2(Bb, A)) % 360

FAM = [(15,'vermelho'),(45,'laranja'),(70,'amarelo'),(170,'verde'),
       (200,'ciano'),(260,'azul'),(290,'roxo'),(345,'magenta')]

for path in sys.argv[1:]:
    im = Image.open(path).convert('RGB')
    a = np.asarray(im)
    passo = max(1, min(a.shape[0], a.shape[1]) // 400)
    a = a[::passo, ::passo]                      # subamostra sem misturar pixel
    L, C, H = oklch(a)
    perc, forte = C >= 0.05, C >= 0.12
    fams = {}
    if perc.sum():
        idx = np.digitize(H[perc], [f[0] for f in FAM])
        nomes = np.array([f[1] for f in FAM] + ['vermelho'])
        vals, cnts = np.unique(nomes[idx], return_counts=True)
        ordem = np.argsort(-cnts)
        fams = {str(vals[i]): round(float(cnts[i])/perc.sum()*100, 1) for i in ordem[:4]}
    print(json.dumps({
        'arquivo': path, 'dim': f'{im.size[0]}x{im.size[1]}',
        'corPerceptivelPct': round(float(perc.mean())*100, 1),
        'corFortePct': round(float(forte.mean())*100, 1),
        'quaseNeutroPct_C002': round(float((C < 0.02).mean())*100, 1),
        'cromaMedio': round(float(C.mean()), 3),
        'cromaP95': round(float(np.percentile(C, 95)), 3),
        'cromaPico': round(float(C.max()), 3),
        'luminanciaMediana': round(float(np.median(L)), 3),
        'familiasDaCor': fams,
    }, ensure_ascii=False))
```

### 8.3 Limites declarados do instrumento

- **Keyframes são piso, não valor exato.** Folha de estilo de outra origem
  lança ao ler `cssRules`. Bloqueadas: Aelixa 2, paulkalkbrenner 1,
  lxlcreative 1, lp-final 1.
- **Imagem preguiçosa não carrega toda.** Mesmo rolando a página inteira:
  Aelixa 57 de 81, paulkalkbrenner 62 de 83, lxlcreative 25 de 39. A cor medida
  no pixel **subestima** a cor real dessas três.
- **Movimento em JS, WebGL e canvas é invisível** para as métricas de CSS. O
  illoca é o caso extremo: 0 keyframes numa cena 3D ao vivo.
- **A sonda de pixel captura um quadro.** Página com vídeo ou canvas em
  movimento tem cor que varia no tempo e não é capturada por uma captura só.
- **Captura a `x0,5`** no white-desert e no Aelixa, por limite de altura do
  Chrome. Proporções não mudam; detalhe fino, sim.

Limites de **construto** — levantados pela crítica independente (§11), e mais
graves que os anteriores, porque não são ruído de medida: são métricas que não
medem o que o nome delas promete.

- **`midiaTotalPor1000` conta nó do DOM, não presença visual.** Um ícone SVG de
  16px pesa igual a uma fotografia de tela cheia. Não usar como proxy de "quanta
  imagem a página mostra" sem medir área, visibilidade e posição.
- **`emTransicao` conta `transition-duration` declarada**, sem saber se a
  transição é acionada, se o elemento está visível, qual propriedade anima nem
  com que amplitude. É proxy fraco de "quanto a página se mexe".
- **A sonda de DOM soma áreas de elementos aninhados e sobrepostos** no mesmo
  total. As porcentagens dela não são área exclusiva de página. Isso afeta as
  colunas de fundo do DOM; **não** afeta a sonda de pixel, que é a base das
  conclusões de cor.
- **Os limiares OKLCH 0,05 e 0,12 não têm calibração publicada**, e foram
  adotados **depois** de observar a falha da régua anterior. Separam bem os casos
  deste board, mas carecem de análise de sensibilidade e de validação em amostra
  definida antes da medição.
- **A subamostragem por passo fixo** sempre parte da mesma origem e pode criar
  aliasing em página com grade, listra ou padrão regular.
- **Nada aqui mede vitalidade percebida.** Todas as métricas são propriedades
  formais. A ligação com o job to be done do `PROBLEMA-v1` não foi medida.

---

## 9. Questões abertas — vão para #35, #36 e #37

1. **Display de 102px+ sobrevive ao conteúdo dele?** — vai para a **#36**, e é a
   pergunta mais importante que sobrou. As cinco referências têm frase curta de
   marca; a LP precisa carregar cargo, formação e cinco projetos. O corte de
   102px é medição sólida; a transferência para este conteúdo, não.
2. **A #35 tem de onde partir?** **Sim, e a resposta é negativa** (§12): cor não
   separa o que o cliente aprova do que ele rejeita, em nenhuma das seis
   métricas. A #35 deixa de ser "qual paleta?" e passa a ser "**dado que cor não
   decide, qual restrição de cor a paleta precisa respeitar para não atrapalhar
   o que decide?**" — que é tipografia.
3. **Qual rota de mídia é viável aqui?** As cinco usam foto profissional ou
   render 3D; o cliente não tem foto, não pode gerar pessoas nem usar stock. Os
   candidatos que restam: os 3 screenshots de produto que já existem e figura de
   dado autoral a partir das curvas de chuva do IDF e do experimento quântico.
   A rota do canvas está **vetada** — ver conclusão 2 da §7.
4. **A LP precisa mesmo de mais mídia?** O controle §10 diz que densidade de
   mídia não separa as populações, mas a LP está abaixo das duas. Fechar essa
   distância é requisito ou é otimizar a variável errada?
5. **Falta medir a distância até a evidência de trabalho.** O `PROBLEMA-v1`
   fixa alvo de **≤ 1,5 viewport** até a primeira prova de competência técnica, e
   este board não mediu isso em nenhuma referência. Achado do Antigravity, e é
   uma lacuna real: copiar a arquitetura narrativa do white-desert (23,1 telas)
   ou do illoca (1,0 tela) tem consequência direta sobre esse alvo.
6. **A forma "campo tingido + acento minúsculo" briga com "cada projeto carrega
   a paleta do próprio projeto"** do v2. O conflito continua de pé, mas agora com
   apenas duas peças sustentando o lado do acento — evidência fraca dos dois
   lados.

---

## 10. Grupo de controle — dez sites pessoais sorteados

**Por que existe.** Depois de medir as cinco referências do cliente, eu não
conseguia distinguir duas explicações opostas para o mesmo dado: *ou* a LP está
anormalmente pobre, *ou* as referências dele é que são densas fora do comum e a
LP é normal para o gênero. As duas leituras produzem recomendações contrárias, e
nenhum número da amostra de cinco separa uma da outra.

**Sorteio, para não ser mais uma seleção minha.** Universo: os **1096** links
externos de `personalsit.es` que não são feed, RSS nem rede social. Ordenação
por hash FNV-1a da URL concatenada com a semente `v3-controle`, e os 10
primeiros. Determinístico e reproduzível: mesma semente, mesma amostra. Nenhum
site foi trocado por falha — **10 de 10 mediram**.

Instrumento idêntico ao das referências: viewport `1440x900x1`, mesma sonda.

| site | altura | mídia | **mídia /1000px** | keyframes | transição /1000px | duração dominante | maior título | razão |
|---|---|---|---|---|---|---|---|---|
| charityshot.co.uk | 900 | 73 img | **81,11** | 6 | 90,00 | 0,3s | 35 | 2,19 |
| obspogon.neocities.org | 3057 | 33 img | **10,79** | 7 | 23,55 | 0,2s | 32 | 2,00 |
| paul.fragara.com | 1429 | 14 img | **9,80** | 0 | 0,00 | — | 38 | 2,00 |
| lowmess.com | 1295 | 5 svg | **3,86** | 0 | 10,81 | 0,2s | 76 | 3,80 |
| simonbetton.com | 9279 | 14 img · 20 svg · 1 canvas | **3,77** | 10 | 9,70 | 0,18s | 20 | 1,25 |
| nextfive.xyz | 2909 | 8 img · 2 svg | **3,44** | 0 | 57,75 | 0,3s | 40 | 2,22 |
| incomescrane.com | 3719 | 8 img | **2,15** | 2 | 0,54 | 0,3s | 68 | 4,25 |
| shelomoh.work | 2364 | 4 img | **1,69** | 6 | 85,87 | 0,2s | 60 | — |
| thatmlopsguy.github.io | 3596 | 5 img · 1 svg | **1,67** | 2 | 9,18 | 0,2s | 72 | 5,14 |
| cassidoo.co | 1655 | 1 img | **0,60** | 1 | 0,00 | — | 32 | 2,00 |

**Estatística** (n=10; razão sobre 9, `shelomoh.work` não devolveu workhorse):

| métrica | mediana | faixa |
|---|---|---|
| mídia por 1000px | **3,61** | 0,60 – 81,11 |
| elementos em transição por 1000px | **10,26** | 0,00 – 90,00 |
| maior título | **39px** | **20 – 76px** |
| razão display/corpo | **2,19** | 1,25 – 5,14 |

### O que o controle decidiu

| variável | separa as populações? | evidência |
|---|---|---|
| **mídia** | **não** | faixas sobrepostas; `charityshot.co.uk`, sorteado, mede 81,11 — acima de toda referência do cliente |
| **movimento (quantidade)** | **não** | controle 0,00–90,00 contém inteiramente a faixa das referências, 4,23–33,82 |
| **cor** | **não** (testado na §12) | os dez foram medidos em pixel depois de rotulados: nenhuma das 6 métricas de cor separa, e em 3 delas os 5 aprovados caem inteiros na faixa rejeitada |
| **tipografia de display** | **sim, com corte limpo** | controle **20–76px** · referências **102–320px** · **zero sobreposição** |
| **duração** | parcialmente | controle 0,18–0,3s, referências 0,3s dominante. A LP, a **0,6s**, é outlier nas duas |

**Limite declarado do controle.** `personalsit.es` é um diretório de sites
pessoais em geral, não de portfólios de engenharia voltados a recrutamento. Ele
serve como linha de base do gênero — **não** substitui a amostra pareada com
casos aprovados e rejeitados que o Codex pediu.

**Atualização:** esses dez deixaram de ser apenas linha de base. O cliente
rotulou todos, e reprovou todos — o que transformou este grupo de controle na
metade rejeitada da amostra pareada. Resultado na §12.

---

## 11. Crítica independente — o que foi aceito e o que não foi

Dois críticos leram este board sem coordenação entre si: **Codex** (crítica
adversarial das dez conclusões e do instrumento) e **Antigravity/agy** (ataque
por viabilidade e pelo job to be done). Nenhum dos dois recebeu minha opinião
sobre qual conclusão eu preferia.

**Os dois chegaram sozinhos ao mesmo defeito de raiz:** a amostra foi
selecionada **pelo desfecho**. As cinco peças são todas casos que o cliente ama;
não há nenhuma que ele tenha rejeitado. Sem variação na coisa a ser explicada,
não existe predição a estimar — e a conclusão de cor vira resultado nulo.

O Codex foi além, e eu aceito: `00-ORDEM.md` declarar a #17 "corrigida" excedia
a evidência. **Trocar o dono do viés não mudou a estrutura dele.** O texto do
`00-ORDEM.md` foi corrigido.

### Aceito

| origem | achado | efeito |
|---|---|---|
| ambos | seleção na variável dependente | conclusão 4 cai; §7 e o aceite da issue reescritos |
| Codex | "mídia por 1000px" conta nó de DOM, não presença visual | §4 reescrita; multiplicador 17×–234× retirado |
| Codex | Ciere não pertence às cinco; são 2 de 5, não 3 | §3 corrigida |
| Codex | illoca tem 15 elementos em transição — "não faz nenhuma rota" contradiz a própria tabela | conclusão 1 rebaixada |
| Codex | limiares OKLCH sem calibração, adotados depois de ver os dados | registrado em §8.3 como limite aberto |
| Codex | a sonda de DOM soma áreas de elementos aninhados | registrado em §8.3 |
| Antigravity | tipografia **também** está fora da faixa — "única variável" é falso | virou o achado principal, §6 |
| Antigravity | canvas é hostil ao job: `Ctrl+F`, leitor de tela, `prefers-reduced-motion` | conclusão 2 vetada |
| Antigravity | o board nunca mediu distância até a evidência de trabalho | §9, questão 5 |

### Não aceito, e por quê

- **Antigravity citou `leerob.io` e `brianlovin.com`** como precedentes de
  portfólio técnico que resolvem densidade sem fotografia. Ele mesmo declarou
  que rodou **sem rede** e que as URLs vieram da memória do modelo. **Não entram
  no board sem medição.** Ficam como candidatos a verificar na #36.
- **Antigravity estimou `n≈15+15`** para uma amostra pareada, sem cálculo de
  poder. Trato como ordem de grandeza, não como número.
- **Codex classificou a conclusão 3 como totalmente derrubada.** Concordo com o
  ataque ao construto e ao multiplicador, mas a direção sobrevive por outra via:
  o grupo de controle §10, que ele não tinha, mostra a LP **abaixo dos dez
  sorteados**. O que cai é "mídia explica a diferença", não "a LP tem pouca
  mídia".

### O que os dois deixaram sem resposta

Nenhum dos dois — nem eu — mediu **vitalidade percebida**. Todas as conclusões
deste board são sobre propriedades formais de páginas, e a ligação entre essas
propriedades e o job do `PROBLEMA-v1` ("recrutador reconhecer competência em
pouco tempo") **continua não medida, e não deve ser presumida por nenhuma das
issues que consomem este board**.

---

## 12. Amostra rotulada — o teste que a issue realmente pedia

Tudo acima compara peças que o cliente **aprova** contra peças que ninguém
julgou. Codex e Antigravity apontaram, separadamente, que isso é **seleção na
variável dependente**: sem nada rejeitado, não há variação a explicar.

Isso foi resolvido. O cliente julgou **os dez sites do grupo de controle**, um a
um, com as palavras dele. Resultado: **10 de 10 rejeitados** — sete sem
ressalva, três com aprovação parcial da intenção ("legalzinho até", "valorizo a
animação que ele traz").

**Que um sorteio aleatório do gênero dele produza zero aprovações é achado por
si só:** o gosto dele está longe da norma dos sites pessoais, o que é
consistente com o corte tipográfico da §6.

Amostra final: **15 peças rotuladas** — 5 aprovadas, 10 rejeitadas.

### O teste

Para cada variável, o critério mais duro que existe: **o pior aprovado contra o
melhor rejeitado.** Se um limiar único classifica as 15 sem erro, a variável
separa. Se qualquer aprovado cai dentro da faixa dos rejeitados, não separa.

| variável | aprovados | rejeitados | veredito |
|---|---|---|---|
| **maior título** | **102 – 320px** | **20 – 76px** | **SEPARA · 15/15 · corte ≈ 89px** |
| **razão display/corpo** | **6,0 – 20,0×** | **1,25 – 5,14×** | **SEPARA · 15/15 · corte ≈ 5,6×** |
| mídia por 1000px | 4,14 – 55,56 | 0,60 – 81,11 | não — 3 rejeitados passam o pior aprovado |
| transição por 1000px | 4,23 – 33,82 | 0,00 – 90,00 | não — 7 rejeitados passam |
| cor perceptível `C≥0,05` | 2,7 – 34,5% | 1,2 – 13,5% | não — 3 de 5 aprovados dentro da faixa rejeitada |
| **cor forte** `C≥0,12` | 0,0 – 30,2% | 0,3 – 4,3% | não — 2 de 5 dentro |
| croma médio | 0,006 – 0,069 | 0,002 – 0,032 | não — 3 de 5 dentro |
| croma de pico | 0,208 – 0,251 | 0,187 – 0,322 | não — **5 de 5 dentro** |
| quase neutro `C<0,02` | 25,7 – 92,2% | 1,0 – 97,1% | não — **5 de 5 dentro** |
| luminância mediana | 0,251 – 1,000 | 0,000 – 1,000 | não — **5 de 5 dentro** |

**Duas variáveis classificam os 15 julgamentos sem errar um. As duas são
tipografia. Nenhuma das seis variáveis de cor separa.**

### A LP, passada pelo classificador do próprio cliente

| | valor | corte | lado |
|---|---|---|---|
| maior título | **46px** | 89px | **rejeitado** |
| razão display/corpo | **3,29×** | 5,6× | **rejeitado** |

A `lp-final.html` sai classificada como um site que o cliente rejeitaria — pelas
duas variáveis, e só por elas. Isso responde à pergunta aberta desde o v2: por
que ele olha a LP, diz *"cara de site morto"*, e não consegue apontar o defeito.
**O defeito não estava em cor, nem em mídia, nem em quantidade de animação.**

### Corroboração independente — as palavras dele

O `charityshot.co.uk` tem **90,00 elementos em transição por 1000px**, o maior
movimento de tudo que este board mediu, aprovados inclusive. Foi rejeitado com
esta justificativa:

> *"apesar de valorizar a animação que ele traz, acho muito simples em questão
> de cor, tipografia e UX"*

Ele separou espontaneamente a animação da tipografia e reprovou pela segunda. O
maior título dele é **35px**. **A medição e a justificativa verbal apontam para
a mesma variável, por caminhos independentes** — e a verbal foi dada sem ver
número nenhum.

O `lowmess.com` foi rejeitado por *"sem animação nenhuma"*, mas mede **10,81**
de transição por 1000px — mais que três dos cinco aprovados. O que ele não tem é
display: 76px, o maior entre os rejeitados, ainda abaixo do corte. **A percepção
de "sem animação" não corresponde à medição de movimento; corresponde à de
tipografia.**

### Cor dos rejeitados — o registro

| peça | perceptível | forte | quase neutro | croma médio | pico | L mediana |
|---|---|---|---|---|---|---|
| nextfive | 13,5% | 0,4% | 85,0% | 0,020 | 0,197 | 0,296 |
| charityshot | 12,7% | 1,4% | 65,2% | 0,020 | 0,232 | 0,821 |
| obspogon | 6,4% | 4,3% | 93,2% | 0,010 | **0,322** | 0,000 |
| paulfragara | 5,6% | 4,2% | 65,6% | 0,017 | 0,300 | 1,000 |
| shelomoh | 3,1% | 3,0% | 96,8% | 0,011 | 0,291 | 0,989 |
| cassidoo | 2,7% | 1,2% | 96,0% | 0,004 | 0,213 | 0,264 |
| incomescrane | 2,3% | 0,6% | 93,1% | 0,005 | 0,210 | 0,889 |
| thatmlopsguy | 2,3% | 1,6% | **1,0%** | 0,032 | 0,248 | 0,169 |
| lowmess | 2,0% | 0,8% | 97,1% | 0,012 | 0,187 | 0,275 |
| simonbetton | 1,2% | 0,3% | 97,1% | 0,002 | 0,188 | 1,000 |

O `obspogon.neocities.org`, rejeitado com *"horrível"*, tem o **maior croma de
pico da pesquisa inteira: 0,322** — acima de qualquer peça aprovada. Cor
saturada não compra aprovação.

### O que isto autoriza, e o que não

**Autoriza uma conclusão de paleta**, negativa e com fonte nos dois lados do
julgamento do cliente: **cor não é critério de decisão dele.** Nenhuma das seis
métricas de cor separa aprovado de rejeitado, e em três delas os cinco aprovados
caem inteiramente dentro da faixa rejeitada. A #35 tem uma resposta — só não é a
resposta que ela esperava.

**Não autoriza** dizer qual paleta usar. "Cor não decide" não é o mesmo que "cor
não importa": significa que ela não distingue o que ele aceita do que ele
recusa, e portanto **não deve ser a variável que a #35 otimiza**.

### Limites desta rodada

- **Os dez rejeitados vêm todos do mesmo diretório**, sorteados no mesmo dia. É
  uma linha de base do gênero, não uma amostra estratificada.
- **10 de 10 rejeitados** deixa o rótulo sem gradação. Os três com aprovação
  parcial (charityshot, shelomoh, simonbetton) **não** são tipograficamente mais
  próximos do corte — 35px, 60px e 20px. O que rendeu meia aprovação veio de
  outro lugar (animação, intenção), o que sugere que tipografia é o **portão**,
  não a história inteira.
- **`charityshot.co.uk` rola por sequestro de rolagem:** `scrollHeight` de 900px.
  A captura pegou uma tela; a cor dele vale para essa tela, não para a peça.
- **`simonbetton.com` carregou 4 de 14 imagens.** A cor dele está subestimada.
- **Nada aqui foi testado com recrutador.** O corte de 89px separa o gosto do
  cliente. Que ele sirva ao job to be done do `PROBLEMA-v1` continua **não
  medido**.

---

**FASE:** 2 — Precedentes (refeita, issue #17)
**ARTEFATO:** este board + `docs/design/referencias-v3/*.png`
**REFERÊNCIAS MEDIDAS:** aelixa.webflow.io, illoca.unseen.co,
paulkalkbrenner.net, lxlcreative.co.uk, white-desert.com — **cinco de cinco
escolhidas pelo cliente**; mais idf-br.com.br, advocaciacieredarosa.com.br e
dvopelotas.com.br (trabalho dele) e wireframes/lp-final.html, remedidos para
corrigir números do v2
mais **10 sites pessoais sorteados** como grupo de controle (§10)
**TAREFAS CODEX EXECUTADAS:** crítica adversarial das 10 conclusões e do
instrumento (§11). Em paralelo, Antigravity/agy atacou por viabilidade e job to
be done. Os dois convergiram sozinhos no mesmo defeito de raiz: seleção na
variável dependente
**DECISÕES:** régua de cor trocada de saturação HSV para croma OKLCH; medição de
cor movida do `background-color` para o pixel renderizado; script do instrumento
passa a viver dentro do board; duração de referência corrigida de 0,24s para
0,3s; contenção tipográfica herdada da Folha descartada; **tipografia de display
identificada como a única variável que separa as populações**; rota de
canvas/WebGL vetada pelo job to be done; quatro conclusões da primeira versão
retiradas depois da crítica
**AMOSTRA FINAL:** 15 peças rotuladas pelo cliente — 5 aprovadas, 10 rejeitadas
**RESULTADO:** de 10 variáveis testadas, 2 separam os 15 julgamentos sem erro —
maior título (corte ≈89px) e razão display/corpo (corte ≈5,6×). A
`lp-final.html` classifica do lado rejeitado nas duas
**QUESTÕES ABERTAS:** as seis da seção 9
**O QUE ESTE BOARD NÃO AUTORIZA:** escolher paleta a partir daqui — ele mostra
que cor não decide, não qual cor usar; presumir que densidade de mídia ou
quantidade de movimento expliquem aprovação; usar cena em canvas; e tratar o
corte de 89px como ligado ao job to be done do `PROBLEMA-v1` — ele separa o
gosto do cliente, e a ligação com recrutador não foi medida
