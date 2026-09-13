# Plano do degrau móvel da escala tipográfica — issue #45

Proponho **49px a 320px e 54px a 390px**, com entrelinha de um corpo nessas
larguras. A curva de tamanho reencontra a escala atual em 540px; a entrelinha
reencontra a proporção atual em 600px. As duas transições são contínuas.
O segundo degrau permanece como está. O corpo medido continua sendo 13px.

Este documento é design de execução: contém previsões, não uma nova rodada de
medição nem aprovação visual. O gate escolheu o corte de cada largura. A
implementação seguinte substitui somente o bloco de display de `CSS_ESCALA`
em [medir.mjs](medir.mjs); as demais regras da constante permanecem. A aplicação
em `wireframes/lp-final.html` depende do Gate D e está fora desta tarefa.

## Evidência e alvo

As observações abaixo vêm de [medicoes-movel.json](medicoes-movel.json), abreviado
**M**, e [medicoes.json](medicoes.json), abreviado **D**. `M[peça@largura]`
significa `referencias[peça@largura].data`; `D[B@largura]` significa
`variantesDaLP["B-so-escala@largura"].data`. Para referências de desktop,
`D[peça]` significa `referencias[peça].data`, a 1440px.
Tamanhos são `tamTitulos[0]`, razões são `razaoTituloWorkhorse`, e corpo é
`workhorse.px`. São os campos corrigidos, nunca `_legado`.

| Largura | Origem do corte de título | Origem do corte de razão |
| --- | --- | --- |
| 320 | Não existe: `M[illoca@320]` aprovado, 47px, abaixo de `M[lowmess@320]` rejeitado, 48px. | (`M[paulkalkbrenner@320]` 3,77 + `M[lowmess@320]` 3,69) / 2 = **3,73×**. |
| 390 | (`M[illoca@390]` 58 + `M[lowmess@390]` 50) / 2 = **54px**. | (`M[paulkalkbrenner@390]` 3,75 + `M[lowmess@390]` 3,57) / 2 = **3,66×**. |
| 768 | (`M[lxlcreative@768]` 80 + `M[lowmess@768]` 61) / 2 = **70,5px**. | (`M[lxlcreative@768]` 4,71 + `M[lowmess@768]` 4,07) / 2 = **4,39×**. |
| 1024 e 1440 | (`D[lxlcreative]` 102 + `D[lowmess]` 76) / 2 = **89px**; corte de desktop adotado pelo gate também a 1024. | (`D[lxlcreative]` 6 + `D[thatmlopsguy]` 5,14) / 2 = **5,57×**, com a mesma aplicação do gate. |

`D[B@320]` e `D[B@390]` registram 48px, corpo 13px e razão 3,69×.
A 320, o mínimo aritmético é `3,73 × 13 = 48,49px`; escolho 49px,
que também é o tamanho registrado da referência aprovada
`M[paulkalkbrenner@320]`, com corpo 13px. A 390, o corte de título domina:
`54 / 13 = 4,153846… > 3,66`. Nenhum corte de título é criado para 320.

## CSS proposto, completo para o bloco de display

```css
.hero-headline {
  /* E1–E5: piso móvel, ponte limitada a 54px e curva existente. */
  font-size: clamp(3.0625rem, max(10vw, min(14vw, 3.375rem)), 9rem) !important;
  /* E6–E8: um corpo no móvel; retorno contínuo à proporção .9. */
  line-height: clamp(.9em, 3.375rem, 1em) !important;
  letter-spacing: -.04em !important; /* E9 */
  text-transform: none !important; /* E10 */
  max-width: none !important; /* E11 */
  overflow-wrap: anywhere !important; /* E12 */
}

.slab-headline {
  font-size: clamp(2.25rem, 5vw, 4.5rem) !important; /* E13–E15 */
  line-height: 1.05 !important; /* E16 */
  letter-spacing: -.02em !important; /* E17 */
  text-transform: none !important; /* E18 */
}
```

Cada valor tem sua procedência abaixo. Conversões em `rem` usam a raiz de
16px declarada no HTML nas larguras do aceite; isso é premissa de código,
não uma nova medição. Valores de projeto e contas derivados estão marcados
como tal, sem atribuir às referências um CSS que os JSONs não registram.

| ID | Valor escolhido | Evidência ou decisão explícita |
| --- | --- | --- |
| E1 | `3.0625rem` = 49px | `M[paulkalkbrenner@320]`: 49px, corpo 13px, razão 3,77×. Adoto seu tamanho **arredondado registrado**, sem inferir o valor fracionário original da referência. |
| E2 | `10vw` | Preservação do `CSS_ESCALA`; `D[B@768]`, `D[B@1024]`, `D[B@1440]` registram 77, 102 e 144px, compatíveis com 76,8, 102,4 e 144px antes do arredondamento. |
| E3 | `14vw` | **Escolha estética de interpolação**, sem medição direta: está entre `100 × 54 / 390 = 13,846154…` e `100 × 49 / 320 = 15,3125`, limites calculados que deixam o piso ativo a 320 e alcançam o teto móvel a 390. |
| E4 | `3.375rem` = 54px, no tamanho | Corte calculado de `M[illoca@390]` 58px e `M[lowmess@390]` 50px. Limita a contribuição da ponte móvel; a curva `10vw` pode ultrapassá-lo. |
| E5 | `9rem` = 144px | Teto existente e resultado de `D[B@1440]`, 144px. Preservado. |
| E6 | `.9em`, na entrelinha | Mantém a proporção de `D[B@768]`, `D[B@1024]` e `D[B@1440]`: `titulosDetalhes[0].lineHeightPx` de 69,12, 92,16 e 129,6px. |
| E7 | `3.375rem` = 54px, na entrelinha | **Escolha estética de transição**, reutilizando o corte de 390; não é entrelinha medida de uma referência. Mantém a altura de linha em 54px enquanto o título cresce de 54 a 60px. |
| E8 | `1em`, na entrelinha | `M[aelixa@320]` e `M[aelixa@390]`: `titulosDetalhes[0].lineHeightRazao = 1`. A transferência para Instrument Sans é **hipótese estética**, não prova de legibilidade; abre a linha em relação aos 43,2px atuais de `D[B@320]`. |
| E9 | `-.04em` | `D[B@320]`: `titulosDetalhes[0].letterSpacing = -1.92px` a 48px, portanto `-1,92 / 48 = -0,04`. Preservo o aperto horizontal para não somar largura ao aumento do corpo. |
| E10 | `text-transform: none` | `D[B@320]` e `D[B@390]`: `titulosDetalhes[0].textTransform = "none"`. Preservado. |
| E11 | `max-width: none` | **Decisão de continuidade da composição**, já no `CSS_ESCALA`; o JSON não mede essa propriedade. `D[B@320]` registra contenção 1 para o título, mas isso não comprova ausência de recorte de glifos. A coluna continua sendo o limite de largura. |
| E12 | `overflow-wrap: anywhere` | **Escolha preventiva de composição**, sem precedente medido. Autoriza quebra dentro da palavra só se ela não couber inteira; não força hifenização, não altera a frase e reduz a contribuição mínima de largura ao grid. |
| E13 | `2.25rem` = 36px | Piso preservado; `D[B@320].titulosDetalhes[1].px = 36`. |
| E14 | `5vw` | Curva preservada; `D[B@768]` e `D[B@1024]` registram segundo título de 38 e 51px, compatíveis com 38,4 e 51,2px antes do arredondamento. |
| E15 | `4.5rem` = 72px | Teto preservado; `D[B@1440].titulosDetalhes[1].px = 72`. |
| E16 | `1.05` | `D[B@320].titulosDetalhes[1].lineHeightPx = "37.8px"` a 36px: `37,8 / 36 = 1,05`. |
| E17 | `-.02em` | `D[B@320].titulosDetalhes[1].letterSpacing = "-0.72px"` a 36px: `-0,72 / 36 = -0,02`. |
| E18 | `text-transform: none` | `D[B@320].titulosDetalhes[1].textTransform = "none"`. Preservado. |
| E19 | `!important`, em todas as declarações | **Decisão técnica de injeção**, seguindo o bloco atual; a folha injetada precisa prevalecer sobre as regras responsivas do produto. Não é dado de preferência. |

## Predição conferível

Seja `W` a largura em CSS px, `H` o tamanho do hero e `L` sua altura de linha:

```text
H(W) = max(49, min(max(0,10W, min(0,14W, 54)), 144))
L(W) = max(0,9H, min(54, H))
S(W) = max(36, min(0,05W, 72))  [segundo degrau]
R(W) = H(W) / 13
```

Nas fórmulas, vírgula é decimal; em `max(0,10W, …)`, o primeiro argumento é
`0,10 × W`. A tabela explicita cada conta para evitar ambiguidade.

| W | Conta do título, em px | H computado | H / 13, sem arredondar H | Saída prevista da sonda: título / razão | L / S, px | Contra o corte da largura |
| --- | --- | --- | --- | --- | --- | --- |
| 320 | `max(49; min(max(32; min(44,8; 54)); 144))` | **49** | `49 / 13 = 3,769231…` | **49 / 3,77×** | 49 / 36 | Razão > 3,73; não há corte de título. |
| 390 | `max(49; min(max(39; min(54,6; 54)); 144))` | **54** | `54 / 13 = 4,153846…` | **54 / 4,15×** | 54 / 36 | Título = 54; razão > 3,66. |
| 768 | `max(49; min(max(76,8; min(107,52; 54)); 144))` | **76,8** | `76,8 / 13 = 5,907692…` | **77 / 5,92×** | 69,12 / 38,4 | Título > 70,5; razão > 4,39. |
| 1024 | `max(49; min(max(102,4; min(143,36; 54)); 144))` | **102,4** | `102,4 / 13 = 7,876923…` | **102 / 7,85×** | 92,16 / 51,2 | Título > 89; razão > 5,57. |
| 1440 | `max(49; min(max(144; min(201,6; 54)); 144))` | **144** | `144 / 13 = 11,076923…` | **144 / 11,08×** | 129,6 / 72 | Título > 89; razão > 5,57. |

A sonda faz `Math.round(fontSize)` antes de calcular e arredondar a razão;
ver [sonda-tipografia.mjs](sonda-tipografia.mjs), atribuição de `fs` dos títulos
e retorno de `razaoTituloWorkhorse`. Por isso 76,8px dá 5,907692… na conta
contínua, mas **77px e 5,92×** no JSON. A coluna da sonda mantém a semântica
dos dados que originaram os cortes. As duas formas de cálculo passam.

Com raiz de 16px, as junções calculadas são: piso até `49 / 0,14 = 350px`;
rampa até `54 / 0,14 = 385,714286…px`; patamar até `54 / 0,10 = 540px`;
depois `10vw`, limitado pelo teto. A linha fica em `1em` até H = 54px,
em 54px até `54 / 0,9 = 60px` de título, e depois em `.9em`.
Isso dispensa um breakpoint que faça o título ou sua entrelinha saltar.

## Forma esperada, riscos e verificação pelo próximo agente

**Hipótese de quebra a 320px**, com a frase integral registrada em
`D[B@320].titulosDetalhes[0]` (59 caracteres, 8 palavras):

```text
Construo
produtos
digitais e
lidero
projetos de
tecnologia.
```

É uma previsão de composição, sem medição de avanço dos glifos. As divisões
mais sensíveis são depois de “e” e de “lidero”; a fonte efetivamente carregada
pode alterar esses agrupamentos. Não inserir `<br>` para fabricar a previsão.
A 390, espero que “digitais e lidero” caiba junto, resultando em cinco linhas:
“Construo” / “produtos” / “digitais e lidero” / “projetos de” / “tecnologia.”.
Se essas hipóteses se confirmarem, os blocos de linha terão `6 × 49 = 294px`
e `5 × 54 = 270px`, sem margens. Não são alturas observadas.

A leitura estática do HTML dá coluna útil de `320 − 2 × 20 = 280px` e
`390 − 2 × 20 = 350px`: `.container` usa o piso de `--pad` e `.hero-top`
tem uma coluna nessa faixa. Esses valores são deduções do código, não
medições dos JSONs. O risco principal é o **`span` dentro de
`h1.hero-headline.hero-mask`**, sobretudo “tecnologia.”. O h1 e o hero têm
máscaras com `overflow: hidden`; ausência de rolagem horizontal sozinha pode
significar texto cortado. `anywhere` deve ser uma reserva, não a quebra usual
da frase em português. Abertura de linha não garante, por si só, separação
óptica de ascendentes e descendentes.

O próximo agente deve conferir estes predicados com a folha injetada:

- Nas cinco larguras da tabela, tamanho e razão correspondem às respectivas
  colunas de predição e cruzam os cortes; `workhorse.px` continua 13. Usar os
  valores fracionários de `getComputedStyle` além dos campos arredondados;
  tolerância de leitura proposta: 0,01px para tamanho e entrelinha. Se o corpo
  medido mudar, recalcular a razão e investigar a mudança antes de aceitar.
- Fonte efetiva do hero é Instrument Sans, peso 700; segundo degrau mantém
  Instrument Sans, peso 600, e as dimensões previstas. Inter e IBM Plex Mono
  conservam seus papéis. São os valores de `D[B@320].titulosDetalhes` e
  `workhorseDetalhe`, não autorização para trocar famílias.
- Em 320 e 390, conferir PT e EN após o carregamento das fontes e o fim da
  entrada, também com movimento reduzido. Registrar a quebra real por palavra
  e comparar com a hipótese. Nenhuma palavra da frase PT deve precisar de
  quebra interna; se precisar, a hipótese de forma falhou e volta para revisão.
  Não diminuir o tamanho para passar silenciosamente.
- `document.documentElement.scrollWidth <= clientWidth`; também conferir
  `scrollWidth <= clientWidth` no h1 e no seu span. Retângulos de texto obtidos
  por `Range` devem ficar dentro da coluna e da máscara, e a inspeção visual
  deve mostrar todos os glifos sem recorte ou contato entre linhas. Um
  `fracaoContidaMin = 1` da caixa do título não substitui essa conferência.
- Conferir ambos os lados das junções calculadas, além das cinco larguras:
  tamanho e altura de linha não têm salto; a troca de quantidade de linhas
  por reflow pode acontecer. Em largura igual ou superior a 768px, tamanho,
  entrelinha, tracking e segundo degrau devem reproduzir a escala anterior.
- Esperar crescimento vertical no hero móvel e deslocamento do lede, CTAs e
  cards. Registrar altura do hero, posição do primeiro CTA e altura da página;
  `D[B@320].altura = 13484` e `D[B@390].altura = 12444` são as bases anteriores,
  não orçamentos novos nem alturas previstas. Não prometer CTA na primeira
  tela. Crescimento que não venha do hero exige investigação, pois o segundo
  degrau e o restante da escala permanecem iguais.

O bloco não declara cor. Mantém a restrição de `--acid #E6F835` nunca como
texto sobre `paper`, `stone` ou `white`, e a gramática neutra de
[PESQUISA-PALETA.md §7](../PESQUISA-PALETA.md#7-o-que-fica-pendente-da-36).
Com raiz de 16px, os pisos dos degraus são 49 e 36px, ambos acima dos 24px
estipulados no brief para o limiar de contraste 3:1. Se algum cenário reduzir
um título abaixo desse tamanho, conferir o par contra 4,5:1 conforme o brief;
não estender o limiar relaxado ao corpo.

## O que decidi não fazer

- **Piso único de 54px em todo móvel ou 89px a 390.** O primeiro consome largura
  desnecessária a 320; o segundo contraria o gate. A 390, `M[aelixa@390]` 80px,
  `M[lxlcreative@390]` 64px, `M[paulkalkbrenner@390]` 60px e `M[illoca@390]`
  58px são aprovados abaixo de 89px.
- **Encurtar a frase ou aplicar o evento curto da variante C.** A tarefa é a
  escala com o conteúdo existente. `D[illoca]` registra 121 caracteres e 22
  palavras a 111px, e `D[paulkalkbrenner]`, 51 caracteres e 8 palavras a 150px:
  carga, isoladamente, não autoriza edição de conteúdo.
- **Alterar tracking, impor largura em `ch`, balanceamento ou quebras manuais.**
  Abro a entrelinha, preservo o tracking e deixo a coluna determinar a medida.
  Não há observação que justifique acumular essas mudanças; quebras fixas
  também amarrariam desnecessariamente as versões PT e EN.
- **Reduzir o corpo para aumentar a razão, aumentar o segundo degrau ou mudar
  as famílias e pesos.** A lacuna medida é do hero móvel; pesos 800 e 900
  continuam proibidos.
- **Ocultar overflow para aprovar o teste, remover máscaras ou mexer no
  movimento.** É preciso verificar os glifos dentro das máscaras existentes.
  A quebra preventiva não equivale a uma aprovação visual.
- **Rodar o driver, regenerar dados ou alterar o produto e documentos
  existentes.** Esta entrega cria apenas este plano. Medição, crítica visual,
  síntese final e eventual aplicação no produto pertencem às próximas etapas.
