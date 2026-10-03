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

### As métricas por referência

Faixa agregada esconde o caso individual, e a issue pedia **por referência**.
Medido com a sonda canônica da **§8.2** do `REFERENCE-BOARD-v3`, reusada
verbatim, sobre as capturas canônicas de `referencias-v3/` — as mesmas
rastreadas desde a #17. **A sonda reproduz a §3 e a §12 do board em 15 de 15
peças**, o que valida de uma vez esta tabela e a do board.

Gerada por `medicao-contraste/tabela-cor.py` a partir de
`medicao-contraste/raw/cor-por-referencia.json`. Não é digitada.

<!-- gerado por tabela-cor.py a partir de raw/cor-por-referencia.json — nao editar a mao -->

| peça | grupo | cor perceptível `C≥0,05` | cor forte `C≥0,12` | quase neutro `C<0,02` | croma médio | croma de pico | L mediana |
|---|---|---:|---:|---:|---:|---:|---:|
| `illoca` | **aprovado** | 34,5% | **30,2%** | 25,7% | 0,069 | 0,208 | 0,800 |
| `paulkalkbrenner` | **aprovado** | 26,8% | **22,0%** | 69,7% | 0,042 | 0,247 | 0,823 |
| `lxlcreative` | **aprovado** | 5,2% | **2,3%** | 90,9% | 0,020 | 0,251 | 0,251 |
| `aelixa` | **aprovado** | 4,4% | **0,5%** | 88,8% | 0,008 | 0,219 | 0,989 |
| `white-desert` | **aprovado** | 2,7% | **0,0%** | 92,2% | 0,006 | 0,239 | 1,000 |
| `obspogon` | rejeitado | 6,4% | **4,3%** | 93,2% | 0,010 | 0,322 | 0,000 |
| `paulfragara` | rejeitado | 5,6% | **4,2%** | 65,6% | 0,017 | 0,300 | 1,000 |
| `shelomoh` | rejeitado | 3,1% | **3,0%** | 96,8% | 0,011 | 0,291 | 0,989 |
| `thatmlopsguy` | rejeitado | 2,3% | **1,6%** | 1,0% | 0,032 | 0,248 | 0,169 |
| `charityshot` | rejeitado | 12,7% | **1,4%** | 65,2% | 0,020 | 0,232 | 0,821 |
| `cassidoo` | rejeitado | 2,7% | **1,2%** | 96,0% | 0,004 | 0,213 | 0,264 |
| `lowmess` | rejeitado | 2,0% | **0,8%** | 97,1% | 0,012 | 0,187 | 0,275 |
| `incomescrane` | rejeitado | 2,3% | **0,6%** | 93,1% | 0,005 | 0,210 | 0,889 |
| `nextfive` | rejeitado | 13,5% | **0,4%** | 85,0% | 0,020 | 0,197 | 0,296 |
| `simonbetton` | rejeitado | 1,2% | **0,3%** | 97,1% | 0,002 | 0,188 | 1,000 |

### Temperamento — repartição da área **colorida** (`C ≥ 0,05`) por família de matiz

| peça | grupo | quatro famílias principais | eixo amarelo·laranja·verde | eixo azul·roxo |
|---|---|---|---:|---:|
| `illoca` | **aprovado** | roxo 68,6% · azul 31,0% · laranja 0,4% · amarelo 0,0% | 0,4% | 99,6% |
| `paulkalkbrenner` | **aprovado** | verde 55,6% · laranja 39,9% · amarelo 3,4% · azul 0,5% | 98,9% | 0,5% |
| `lxlcreative` | **aprovado** | verde 41,5% · roxo 32,5% · laranja 19,9% · amarelo 5,1% | 66,5% | 32,5% |
| `aelixa` | **aprovado** | amarelo 42,6% · laranja 29,9% · verde 12,0% · azul 10,3% | 84,5% | 10,3% |
| `white-desert` | **aprovado** | azul 63,5% · roxo 19,5% · amarelo 11,2% · laranja 5,6% | 16,8% | 83,0% |
| `obspogon` | rejeitado | verde 61,6% · azul 25,9% · magenta 5,9% · laranja 2,1% | 63,7% | 25,9% |
| `paulfragara` | rejeitado | verde 36,7% · roxo 34,8% · amarelo 8,6% · laranja 7,4% | 52,7% | 34,8% |
| `shelomoh` | rejeitado | roxo 98,3% · amarelo 0,9% · verde 0,6% · magenta 0,1% | 1,5% | 98,3% |
| `thatmlopsguy` | rejeitado | roxo 51,9% · azul 29,7% · verde 7,3% · amarelo 4,3% | 11,6% | 81,6% |
| `charityshot` | rejeitado | amarelo 77,8% · verde 10,1% · laranja 8,1% · azul 2,8% | 96,0% | 2,8% |
| `cassidoo` | rejeitado | azul 34,2% · verde 25,4% · laranja 13,0% · amarelo 11,1% | 49,5% | 34,2% |
| `lowmess` | rejeitado | verde 31,9% · amarelo 26,6% · azul 21,3% · laranja 10,5% | 69,0% | 21,3% |
| `incomescrane` | rejeitado | verde 34,3% · amarelo 27,8% · azul 16,0% · laranja 8,0% | 70,1% | 16,0% |
| `nextfive` | rejeitado | azul 92,7% · verde 3,5% · laranja 1,5% · roxo 1,3% | 5,0% | 94,0% |
| `simonbetton` | rejeitado | verde 78,9% · azul 16,9% · amarelo 4,0% · laranja 0,2% | 83,1% | 16,9% |

### O teste, sobre esta tabela

| métrica | aprovados | rejeitados | veredito |
|---|---|---|---|
| cor perceptível | 2,7% – 34,5% | 1,2% – 13,5% | **não separa** — 3 de 5 aprovados dentro da faixa rejeitada |
| cor forte | 0,0% – 30,2% | 0,3% – 4,3% | **não separa** — 2 de 5 aprovados dentro da faixa rejeitada |
| quase neutro | 25,7% – 92,2% | 1,0% – 97,1% | **não separa** — 5 de 5 aprovados dentro da faixa rejeitada |
| croma médio | 0,006 – 0,069 | 0,002 – 0,032 | **não separa** — 3 de 5 aprovados dentro da faixa rejeitada |
| croma de pico | 0,208 – 0,251 | 0,187 – 0,322 | **não separa** — 5 de 5 aprovados dentro da faixa rejeitada |
| luminância mediana | 0,251 – 1,000 | 0,000 – 1,000 | **não separa** — 5 de 5 aprovados dentro da faixa rejeitada |
| temperamento (família dominante) | amarelo · azul · roxo · verde | amarelo · azul · roxo · verde | **não separa** — as 4 famílias que dominam alguma peça aprovada dominam também alguma rejeitada |

**15 peças** — 5 aprovadas, 10 rejeitadas. Medidas sobre as capturas canônicas de `referencias-v3/`, com a sonda da §8.2 do board.

**O temperamento dos 10 rejeitados é novo.** A §3 do board mede temperamento
apenas para as 5 aprovadas, e a §12 mede as seis métricas dos rejeitados mas
**não** o temperamento deles. Medido agora nos dois lados, ele **também não
separa**: as quatro famílias que dominam alguma peça aprovada — amarelo, azul,
roxo e verde — dominam também alguma rejeitada. `charityshot` é 77,8% amarelo e
foi rejeitado; `aelixa` é 42,6% amarelo e foi aprovado. `shelomoh` é 98,3% roxo
e foi rejeitado; `illoca` é 68,6% roxo e foi aprovado.

Isso encerra a última hipótese de cor que havia sobrevivido à primeira
reclamação — o *"muito agressivo"* que eu atribuí a "81% da família vinho".
**Nenhuma família de matiz prediz aprovação.**

### Área por cor — medida nas 16 peças

Última das seis métricas que a issue pede por referência, e a que estava
faltando. A §3 do board traz o inventário de fundos apenas das 5 aprovadas; a
rodada de banda escura registrou dos rejeitados só os **tons escuros**. Medida
agora nas 16, com a definição do campo `fundos` da sonda §8.1 — `background-color`
opaco, área de bounding rect acima de 900px², agrupado por `rgb` e ponderado por
área — e com o pré-scroll corrigido da **P-012**.

**O instrumento se valida contra a §3.** As 5 aprovadas reproduzem o inventário
do board com os mesmos valores `rgb`, na mesma ordem, com deriva abaixo de 0,5
ponto percentual:

| peça | §3 do board | medido agora |
|---|---|---|
| `aelixa` | creme 66,6% · branco 22,2% · grafite 10,5% · dourado 0,3% | 66,9% · 21,7% · 10,6% · 0,4% |
| `illoca` | areia 71,0% · branco 18,1% · azul 10,0% | 71,0% · 18,1% · 10,0% |
| `paulkalkbrenner` | preto 43,7% · branco 38,7% · cinza 9,3% · verde 5,4% · laranja 2,8% | 43,6% · 38,6% · 9,0% · 5,5% · 3,3% |
| `lxlcreative` | marrom 98,6% · azul 0,7% | 98,6% · 0,7% |
| `white-desert` | branco 78,7% · quase-preto 13,7% · 3,0% | 78,7% · 13,7% · 3,1% |

<!-- gerado de raw/*_areacor.json — nao editar a mao -->

| peça | grupo | fundos distintos | fundo dominante | % dele | área de fundo cromática `C≥0,05` | acento `C≥0,12` em ≤2% | assinatura campo+acento |
|---|---|---:|---|---:|---:|---:|:---:|
| `aelixa` | **aprovado** | 7 | `rgb(253,251,248)` `C=0,005` | 66,9% | 0,4% | 0,153 | sim |
| `illoca` | **aprovado** | 5 | `rgb(234,223,201)` `C=0,032` | 71% | 10% | — | não |
| `paulkalkbrenner` | **aprovado** | 5 | `rgb(0,0,0)` `C=0` | 43,6% | 8,8% | — | não |
| `lxlcreative` | **aprovado** | 6 | `rgb(39,32,29)` `C=0,012` | 98,6% | 0,8% | 0,251 | sim |
| `white-desert` | **aprovado** | 8 | `rgb(255,255,255)` `C=0` | 78,7% | 0% | 0,185 | sim |
| `charityshot` | rejeitado | 3 | `rgb(252,252,252)` `C=0` | 51,3% | 0% | — | não |
| `obspogon` | rejeitado | 5 | `rgb(0,0,0)` `C=0` | 96,6% | 1,7% | 0,177 | sim |
| `paulfragara` | rejeitado | 6 | `rgb(240,255,240)` `C=0,025` | 57,6% | 0,7% | 0,194 | não |
| `lowmess` | rejeitado | 1 | `rgb(59,59,59)` `C=0` | 100% | 0% | — | não |
| `simonbetton` | rejeitado | 1 | `rgb(255,255,255)` `C=0` | 100% | 0% | — | não |
| `nextfive` | rejeitado | 4 | `rgb(39,46,51)` `C=0,013` | 80,5% | 18,7% | — | não |
| `incomescrane` | rejeitado | 3 | `rgb(219,218,216)` `C=0,003` | 61,8% | 0% | — | não |
| `shelomoh` | rejeitado | 4 | `rgb(29,29,31)` `C=0,004` | 51,7% | 3,2% | — | não |
| `thatmlopsguy` | rejeitado | 4 | `rgb(10,15,26)` `C=0,025` | 77,1% | 0,3% | 0,215 | sim |
| `cassidoo` | rejeitado | 1 | `rgb(37,37,37)` `C=0` | 100% | 0% | — | não |
| `lp-final` | local | 10 | `rgb(247,245,239)` `C=0,008` | 68,5% | 0,3% | 0,2 | sim |

#### O teste — pior aprovado contra melhor rejeitado

| grandeza derivada | aprovados | rejeitados | veredito |
|---|---|---|---|
| fundos distintos | 5 – 8 | 1 – 6 | **não separa** — 3 de 5 aprovados dentro da faixa rejeitada |
| área de fundo cromática | 0% – 10% | 0% – 18,7% | **não separa** — 5 de 5 aprovados dentro da faixa rejeitada |
| croma do acento minúsculo | 0,0 – 0,251 | 0,0 – 0,215 | **não separa** — 4 de 5 aprovados dentro da faixa rejeitada |
| assinatura campo+acento | 3 de 5 | 2 de 10 | **não separa** — presente em peça rejeitada e ausente em aprovada |

**16 peças medidas, zero falhas.** Viewport `1440x900x1`, pré-scroll de 400px/120ms em duas passadas. Dados brutos em `medicao-banda-escura/raw/*_areacor.json`.

Quais peças fecham a assinatura:
- aprovadas: `aelixa`, `lxlcreative`, `white-desert`
- rejeitadas: `obspogon`, `thatmlopsguy`

**Critério da assinatura, declarado para poder ser contestado:** campo é o fundo
dominante com **≥ 60%** da área e `C < 0,05`; acento é um fundo com `C ≥ 0,12`
ocupando **≤ 2%**. A `white-desert` conta aqui e não constava na tabela da §3
porque este inventário vai até 8 fundos e o da §3 ia até 6 — o acento dela está
na cauda. É diferença de profundidade, não divergência.

### E isto fecha a questão aberta 6 da §9 do board

A §3 observou que *"uma forma aparece em duas das cinco: campo grande de neutro
tingido + acento minúsculo de croma alto"*, e a §9 deixou em aberto se ela
significava algo. **Agora está testada nos dois lados, e não significa.**

A assinatura aparece em **2 das 10 rejeitadas** — `obspogon` e `thatmlopsguy` —
e falta em **2 das 5 aprovadas** — `illoca` e `paulkalkbrenner`. O
contraexemplo é o mesmo de sempre e continua sendo o mais duro: **a `obspogon`,
reprovada com a palavra *"horrível"*, tem a assinatura** — campo preto em 96,6%
com acento de croma 0,177 em área minúscula.

Nenhuma das quatro grandezas derivadas do inventário separa: contagem de fundos
distintos, área de fundo cromática, croma do acento, e a assinatura. Com isso a
área por cor entra na lista dos nulos, e **as seis métricas que a issue pediu
estão todas medidas por referência.**

> **Um dado de manutenção que apareceu na rodada.** A `simonbetton` carregou
> **14 de 14** imagens com o pré-scroll corrigido, contra 5 de 14 na rodada
> anterior. A ressalva de captura degradada dela, herdada da §12, **cai** para
> esta medição. As duas que continuam degradadas são a `charityshot`, que rola
> por sequestro, e a `illoca`, que mede 900px de altura.

### Para comparação

As duas variáveis que **classificam 15/15 sem erro** são tipográficas: maior
título (corte ≈89px) e razão display/corpo (corte ≈5,6×), na **#36**.

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
resolva o *"cara de site morto"*.

**E o inverso também não vale.** Dizer que cor não separa **não** promove
tipografia a causa. A `provenance.md` **P-011** foi revisada depois da #37 e é
explícita: a associação entre o corte tipográfico e o julgamento do cliente
**não demonstra causalidade**, e tipografia **não substitui o movimento** que ele
diz valorizar — ele valoriza movimento para dinamismo e sensação de página viva,
junto com tipografia, composição e conteúdo. O que esta issue estabelece é
negativo e só isso: **cor não é a variável a otimizar.**

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
**#2A2A28 não é cor do manual**. O bloco afirma procedência de marca para um
valor que não tem.

O review conferiu contra o manual e foi além do que eu tinha: o preto-tecido de
lá é **`#1F1F1D`**. Ou seja, se `--h8-photo` foi criado para representar esse
preto, ele está simplesmente **com o valor errado** — não é só um token sem
procedência. `#1F1F1D` não aparece em nenhum arquivo deste repositório. Ver a
ressalva de procedência na **R3**.

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

**R3 — a marca Hut 8 é fixa e não se mistura.** Os quatro valores tratados como
fixos: `#0B0B0B`, `#6B0F9C`, `#8A8A8A`, `#A4DE02`. Nenhum recebe ajuste de matiz,
luminância ou croma. `#2A2A28` **não** pertence a esse conjunto e não deve ser
declarado como se pertencesse.

> **Confira procedência pelos RGB, nunca pelos hex.** O review levantou isto, e é
> o tipo de aviso que evita alguém "corrigir" um achado certo. Um `grep` de hex
> no manual conclui, **errado**, que `#0B0B0B`, `#6B0F9C` e `#A4DE02` não estão
> lá: o OCR do documento mutilou os glifos — `#@BQ@B@B`, `#6BOF9C`, `#A4DE@2`.
> Só os RGB declarados confirmam, e a aritmética fecha nos quatro casos:
>
> | RGB no manual | hex correspondente |
> |---|---|
> | `11 11 11` | `#0B0B0B` |
> | `107 15 156` | `#6B0F9C` |
> | `164 222 2` | `#A4DE02` |
> | `31 31 29` | `#1F1F1D` (preto-tecido) |
>
> **O que eu verifiquei e o que não.** A aritmética RGB→hex acima, sim, nas
> quatro linhas. A mutilação por OCR e o valor do preto-tecido, **não** — vêm do
> review, que tinha o manual em mãos.

> **E há um vão de procedência maior, que este PR não fecha.** **O manual da Hut 8
> não está no repositório.** Nenhum arquivo rastreado o contém. Logo os quatro
> valores desta regra **não são reverificáveis a partir do repositório**, e os
> dois registros internos que os declaram **discordam entre si**:
>
> | fonte no repo | o que lista |
> |---|---|
> | corpo da issue #35 · `docs/issues/lote-pesquisa.md:30` | **quatro** — `#0B0B0B`, `#6B0F9C`, `#8A8A8A`, `#A4DE02` |
> | `docs/design/CRITIQUE-BRIEF.md:22` | **três** — preto, roxo e verde. **Sem o cinza `#8A8A8A`** |
>
> E o `#1F1F1D` que o review reporta do manual não aparece em nenhuma das duas
> listas. Então a autoridade da R3 hoje é **a declaração da issue**, não o manual.
> Versionar o manual — mesmo como PDF em `docs/design/` — fecharia isso, e é
> trabalho para outra issue, não para esta.

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

**Uma coincidência que não é evidência.** O site da Ciere tem a assinatura
"campo de neutro tingido + acento minúsculo de croma alto"
(`rgb(243,236,220)` `C=0,023` em 64,4%, com dourado `C=0,145` em 0,2%) — a mesma
do Aelixa.

**E não dá para ler nada disso como gosto dele.** O papel do cliente na Ciere foi
comercial, discovery, requisitos, escopo, ponte entre cliente, design e dev, QA,
SEO e GEO — **ele não foi designer nem design lead da peça**. A paleta da Ciere é
de quem a desenhou, não dele. A versão anterior deste parágrafo dizia que a
assinatura "sugere que a gramática já lhe é familiar", e isso era exatamente o
tipo de inferência de autoria que o `CONTRIBUTING.md` proíbe.

Some-se a isso o motivo que já valia: é **uma peça só**, é projeto dele e não
referência escolhida por ele, e misturar as duas populações para fechar um padrão
já foi erro apontado pelo Codex na §3 do board. **Não entra como evidência** por
três razões independentes.

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

## 8. Reprodução — o comando e o resultado

Os instrumentos passaram a **ancorar os caminhos no próprio arquivo**
(`__dirname` / `__file__`). A versão anterior resolvia
`wireframes/lp-final.html` relativo ao CWD enquanto escrevia a saída relativo à
raiz do repositório — as duas metades assumiam diretórios diferentes, e **nenhum
CWD fazia as duas funcionarem**. Foi por isso que a rodada delegada precisou de
um driver separado só para a LP. Fluxo completo em
`medicao-banda-escura/README.md`.

Rodado inteiro de `/tmp`, um diretório deliberadamente sem relação com o
repositório, para provar que a reprodução não depende do CWD:

```sh
cd /tmp
R=".../pesquisa-paleta-restricao-nao-diferencial-cor-na"

node   "$R/docs/design/medicao-banda-escura/driver-lp-final.js"
python "$R/docs/design/medicao-banda-escura/bandas-verificado.py"
python "$R/docs/design/medicao-contraste/cor-por-referencia.py"        "$R"/docs/design/referencias-v3/*.png        "$R"/docs/design/referencias-v3/rejeitados/*.png
python "$R/docs/design/medicao-contraste/tabela-cor.py" > .../tabela-cor.md
python "$R/docs/design/medicao-contraste/tabela.py"     > .../tabela.md
```

| passo | resultado |
|---|---|
| `driver-lp-final.js` | `Sucesso para lp-final` — resolveu a LP pelo caminho absoluto certo a partir de `/tmp`. Antes da correção teria procurado `/tmp/wireframes/lp-final.html` |
| `bandas-verificado.py` | 17 peças medidas, tabela idêntica à do `RESULTADO.md` |
| `cor-por-referencia.py` | 15 peças, **reproduz a §3 e a §12 do board em 15 de 15** |
| `tabela-cor.py` · `tabela.py` | tabelas deste documento regeneradas dos dados brutos |

### Uma lacuna de instrumento, declarada porque contraria a P-003

A rodada de **área por cor** foi executada, os dados brutos estão em
`medicao-banda-escura/raw/*_areacor.json` e a tabela em
`medicao-contraste/tabela-areacor.md`. **Mas as duas sondas dessa rodada não
estão versionadas** — a de captura e a que gera a tabela ficaram fora do
repositório, porque o gate de `nova-ferramenta` bloqueia criação de arquivo de
código até a autorização do Gate D.

Isso contraria a **P-003**, que decidiu que *"o script do instrumento passa a
viver dentro do board"*. A consequência é concreta e não deve ser minimizada:
**esta medição, hoje, não é reproduzível a partir do repositório** — ao contrário
das outras três desta issue, que são.

O que existe para reconstruí-la, e é suficiente para alguém reescrever a sonda:

| item | onde está |
|---|---|
| definição da medida | esta seção e a §1 — campo `fundos` da sonda §8.1, `background-color` opaco, área > 900px², agrupado por `rgb`, ponderado por área, top 8 |
| viewport e pré-scroll | `1440x900x1`, pré-scroll de 400px/120ms em duas passadas (P-012) |
| as 16 URLs | `medicao-banda-escura/raw/*_areacor.json`, campo `url` |
| critério da assinatura | §1 — campo ≥ 60% com `C < 0,05`, acento `C ≥ 0,12` em ≤ 2% |
| saída completa | os 16 JSON e a tabela gerada, os dois rastreados |

**Fechar isso é decisão do Gate**, não desta issue: ou o instrumento entra em
`medicao-banda-escura/` como os outros três, ou a lacuna fica registrada aqui. As
outras três sondas desta issue estão versionadas e rodam de qualquer diretório.

### O que a re-execução mostrou de novo

A captura fresca da LP, feita pelo fluxo documentado — que usa o pré-scroll da
§8.1 — mede **1 banda e fração 0,1126**. A captura com scroll de 400px em duas
passadas mede **2 bandas e 0,2170**.

A rodada delegada havia medido **0,1123**. Ou seja: o defeito da **P-012 é
determinístico e reproduzível**, não um azar de uma execução. Isso fortalece o
registro — a diferença de 8350px contra 8374px de altura entre as duas capturas
é variação normal de layout, e não muda a conclusão.

`bandas.py` **ficou fora do fluxo**, e o README diz por quê: além dos dois
defeitos de régua já registrados, rodá-lo **sobrescreve** `raw/lp-final.json` e
`raw/obspogon.json`, que foram remedidos, devolvendo os números errados. Ele
segue no repositório como procedência da rodada delegada, com a guarda escrita
no cabeçalho.

---

## 9. Limites declarados

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
**ARTEFATO:** este documento · `medicao-contraste/` (sonda de contraste, sonda
de cor por referência, dados brutos e os dois geradores de tabela) ·
`medicao-banda-escura/` (instrumento, `README.md` com o fluxo reproduzível,
dados brutos, resultado verificado e o original do agy preservado)
**INSTRUMENTO:** WCAG 2.1 sobre o par renderizado, com fundo efetivo resolvido
na árvore e `alpha`/`opacity` acumulados; OKLCH para croma, matiz e luminância.
Viewport `1440x900x1`. **Pré-scroll de 400px/120ms em duas passadas** — o da
§8.1 do board é insuficiente, ver `provenance.md` P-012
**MEDIDO:** 242 elementos com texto próprio · 34 pares distintos · 0 reprovações
· 4 em margem fina · 0 texto sobre imagem. Cor por referência nas 15 peças
rotuladas, com a sonda da §8.2 — **reproduz a §3 e a §12 em 15 de 15**, e
acrescenta o temperamento dos 10 rejeitados, que o board não tinha. Banda escura
em 16 peças: nulo nas quatro métricas, N=15. **Área por cor nas 16 peças, zero
falhas** — valida contra a §3 nas cinco aprovadas e fecha a questão aberta 6 da
§9: a assinatura campo+acento não separa. **As seis métricas que a issue pediu
estão todas medidas por referência**
**DECISÕES:** cor declarada **restrição, não diferencial**, com fonte nos dois
lados de uma amostra rotulada de 15 peças; sete regras normativas (R1–R7);
`--light` e `--h8-photo` removidos por serem tokens mortos, o segundo também por
procedência de marca falsa; banda escura medida e **declarada nula** nas quatro
métricas, fechando a última variável de cor que faltava; **temperamento e área
por cor medidos nos dois lados e também declarados nulos**; verde `#A4DE02` mantido fora com
justificativa medida (`ΔH = 11,2°`, `ΔC = 0,012`) em lugar do comentário de
protótipo; nenhum matiz novo proposto; instrumentos ancorados no próprio arquivo
para o fluxo não depender do CWD
**O QUE ESTE DOCUMENTO NÃO AUTORIZA:** tratar a paleta como resposta ao *"cara de
site morto"*; tampouco tratar tipografia como a causa dele — a **P-011** revisada
diz que a associação não demonstra causalidade e que tipografia não substitui o
movimento que o cliente valoriza; presumir que
satisfazer R1–R7 melhore a aprovação do cliente (satisfazer não atrapalha, e é
só isso que a medição sustenta); travar os pares de display antes da #36; e
estender a conclusão negativa do gosto do cliente para o julgamento de um
recrutador, que não foi medido
**QUESTÕES ABERTAS:** pares de display (§7, depende da #36) · contraste nos
breakpoints da #24 · estados de interação · `prefers-color-scheme: dark`
