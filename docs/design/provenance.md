# Proveniência de decisão

Formato QOC + FSE. Uma entrada por decisão estrutural. Etiquetas: `[R]`
derivada de referência concreta · `[E]` de padrão já existente no projeto ·
`[C]` imposta por restrição · `[N]` nova, e será auditada.

---

## P-001 — Régua de cor: saturação HSV → croma OKLCH

**QUESTÃO** Como medir "quanta cor" uma peça tem, de forma comparável entre
peças?

**OPÇÕES**
- Saturação HSV `(max−min)/max` sobre `background-color`, limiar 0,15 — usada
  no REFERENCE-BOARD-v2.
- Croma OKLCH `hypot(a,b)` em espaço perceptualmente uniforme, limiares 0,05
  (perceptível) e 0,12 (forte).
- Contagem de matizes distintos — descartada: não distingue acento de campo.

**CRITÉRIOS** A régua tem que separar *cor* de *neutro tingido*. HSV não separa,
porque é cega à luminância.

**DECISÃO** Croma OKLCH, com os dois limiares reportados lado a lado.

**EVIDÊNCIA** `rgb(39,32,29)`, fundo de 98,6% do `lxlcreative.co.uk`: saturação
HSV 0,26 (acima do limiar do v2, contado como cromático); croma OKLCH 0,012.
É marrom quase preto. A régua do v2 dava **99,4% de área cromática** para uma
página que o olho lê como escura e neutra. Confirmado em `rgb(9,11,16)` do
`white-desert.com` (HSV 0,44 · OKLCH 0,011) e em `rgb(13,27,42)` do IDF-BR,
registrado no v2 como "croma 0,69" e medido em **0,036**.

**ETIQUETA** `[C]` — imposta por defeito de medição comprovado.

**ADAPTAÇÃO** A coluna da métrica antiga fica nas tabelas do v3, para o erro
continuar visível em vez de sumir na correção.

---

## P-002 — Medição de cor: `background-color` do DOM → pixel renderizado

**QUESTÃO** Sobre qual superfície a cor deve ser medida?

**OPÇÕES**
- `getComputedStyle().backgroundColor` de cada elemento, ponderado por área —
  usado no v1 e no v2.
- Pixels da captura de página inteira, subamostrados sem interpolação.

**CRITÉRIOS** A régua precisa enxergar a cor onde ela de fato está na amostra do
cliente.

**DECISÃO** Pixel renderizado. A sonda de DOM continua, mas só para mídia,
movimento e tipografia.

**EVIDÊNCIA** As cinco referências do cliente põem a cor em superfície que o DOM
não reporta: Aelixa 81 `<img>`, paulkalkbrenner 83, white-desert 29,
lxlcreative 39, e o illoca inteiro é uma cena WebGL2 de 2160×1350. O v2
concluiu *"cor não é a variável"* medindo tudo menos essas superfícies.
Medido no pixel, a cor forte varia de **0,0%** (white-desert) a **30,2%**
(illoca) — duas ordens de grandeza dentro da amostra.

**ETIQUETA** `[C]`

**ADAPTAÇÃO** Custo assumido: a captura pega um quadro só, então vídeo e canvas
em movimento ficam subamostrados no tempo. Declarado em REFERENCE-BOARD-v3 §8.3.

---

## P-003 — O script do instrumento passa a viver dentro do board

**QUESTÃO** Onde guardar o instrumento de medição?

**OPÇÕES**
- Descrever o método em prosa — feito no v2.
- Arquivo de script no repositório.
- Bloco de código dentro do próprio board.

**CRITÉRIOS** Reprodutibilidade, sem destravar código antes do Gate D.

**DECISÃO** Bloco de código dentro do board, na íntegra.

**EVIDÊNCIA** O v2 descreveu o instrumento em prosa e não guardou o código.
Consequência concreta: a linha "Aelixa · 18 elementos em transição" **não
reproduz** — remedida hoje em 74. O paco.me reproduziu exato em 13 com o mesmo
código, o que mostra que o método é o mesmo e o que mudou foi a página. Sem o
script original não dá para saber qual das duas leituras vale.

**ETIQUETA** `[C]` — arquivo `.js` no repositório esbarraria no gate de código
do fluxo `nova-ferramenta`, que só destrava no Gate D.

---

## P-004 — Hipótese das duas rotas excludentes: derrubada

**QUESTÃO** Por que uma peça é percebida como viva?

**OPÇÕES**
- Rota A, densidade de mídia · Rota B, densidade de movimento — **excludentes**
  entre si (REFERENCE-BOARD-v2 §2).
- As duas ao mesmo tempo.
- Uma terceira coisa, não medida pelo instrumento do v2.

**CRITÉRIOS** O modelo tem que sobreviver à amostra escolhida pelo cliente.

**DECISÃO** Modelo do v2 descartado. Nenhuma das cinco fica em uma rota só.

**EVIDÊNCIA** `paulkalkbrenner.net` faz as duas: **83 `<img>` e 33,82 elementos
em transição por 1000px** — o maior valor de movimento da amostra inteira.
`illoca.unseen.co` tem 0 `<img>`, **0 keyframes** e 0 animação ativa, e é uma
cena WebGL2 ao vivo numa página de 900px sem rolagem — um mecanismo que o
instrumento do v2 era estruturalmente incapaz de ver.

**ETIQUETA** `[R]` — as três referências são escolha do cliente.

**CORREÇÃO PÓS-CRÍTICA** (Codex, §11 do board). Esta entrada foi rebaixada de
"derrubada" para **contestada**, por dois motivos:

1. **Erro de leitura meu.** A versão original afirmava que o illoca "não faz
   nenhuma das duas rotas". Ele tem **15 elementos em transição, 16,67 por
   1000px** — a segunda maior densidade de movimento de toda a amostra. A
   afirmação contradizia a tabela do próprio board, três parágrafos acima.
2. **`n=5` contesta universalidade, não mata tipologia.** O que a evidência
   sustenta é que a exclusividade entre as rotas é falsa, não que o modelo
   inteiro esteja morto.

Some-se que a métrica de mídia por trás desta decisão conta **nó de DOM**, não
presença visual, e que o grupo de controle (P-007) mostrou que densidade de
mídia não separa as populações. **O modelo de rotas deixa de ser base para
qualquer decisão de UX**, mas por insuficiência de evidência, não por refutação.

---

## P-005 — Duração de movimento: 0,24s → 0,3s, e sem constante única

**QUESTÃO** Qual duração de transição a LP deve usar?

**OPÇÕES**
- 0,24s, constante única na página — derivada do `paco.me` no v2.
- 0,3s dominante, com dispersão em volta — derivada da amostra do cliente.

**CRITÉRIOS** A fonte precisa ser referência escolhida pelo cliente. O paco.me é
escolha minha, e é a única peça do corpus inteiro com duração constante.

**DECISÃO** **0,3s como dominante, dispersão permitida.**

**EVIDÊNCIA** 0,3s é a duração mais frequente no Aelixa (54 elementos), no
paulkalkbrenner (289) e no white-desert (133), e está presente nas cinco. A
constante única não sobrevive: paulkalkbrenner usa 8 durações distintas,
lxlcreative 8, white-desert 5.

**ADAPTAÇÃO** Efeito colateral: a LP atual roda a **0,6s** dominante. O ajuste é
de velocidade, não de quantidade. O v2 a registrou em 1,2 elemento em transição
por 1000px e a diagnosticou como parada; esse número não reproduz — medida hoje,
ela tem **8,91**.

**ETIQUETA** `[R]`

**REFORÇADA PÓS-CRÍTICA.** Esta é a decisão que saiu **mais forte** da crítica,
e a única assim. O grupo de controle (P-007) mostrou que os dez sites sorteados
usam duração dominante entre **0,18s e 0,3s** — mesma faixa das referências do
cliente. **Os 0,6s da LP são outlier nas duas populações independentes**, o que
é evidência bem mais dura do que "difere da amostra escolhida pelo cliente".

Ressalva de construto que fica: `emTransicao` conta `transition-duration`
declarada, sem saber se é acionada, visível ou de que amplitude. Por isso a
comparação de **quantidade** ("8,91 supera três das cinco") foi retirada do
board — ela apoiava-se num proxy fraco. **A comparação de velocidade não
depende desse proxy**: duração declarada é lida diretamente.

---

## P-006 — Contenção tipográfica herdada da Folha: descartada

**QUESTÃO** Qual a razão entre o maior título e o corpo de texto?

**OPÇÕES**
- ~2,7×, da Folha de S.Paulo — escolha minha, usada em H1–H6.
- 6× a 20×, da amostra do cliente.

**CRITÉRIOS** Domínio da referência tem que bater com o domínio do problema.

**DECISÃO** A régua da Folha sai. A faixa da amostra do cliente entra, e a
questão de onde cair dentro dela vai para a #36.

**EVIDÊNCIA** As cinco: white-desert 20,0× (display 320px), Aelixa 13,3× (240px),
paulkalkbrenner 10,7× (150px), illoca 9,3× (111px), lxlcreative 6,0× (102px).
Nenhuma perto de 2,7×. A LP atual: **3,3×, display de 46px** — 2,2× menor que o
menor display da amostra dele.

**ADAPTAÇÃO** Jornal otimiza densidade de leitura; portfólio otimiza impacto de
entrada. A referência não era ruim, era de outro problema.

**ETIQUETA** `[R]`

---

## P-007 — Grupo de controle aleatório entra na Fase 2

**QUESTÃO** A `lp-final.html` está anormalmente pobre, ou as referências do
cliente é que são densas fora do comum e a LP é normal para o gênero?

**OPÇÕES**
- Comparar só contra as 5 referências do cliente — o que o board fazia.
- Acrescentar um grupo de controle **sorteado**, não curado por ninguém.
- Acrescentar referências que o cliente rejeitou — pedido pelo Codex, e é o
  desenho correto; não feito **nesta decisão**, por exigir nova rodada com o
  cliente. Feito depois, e de outro jeito: ver **P-010**.

**CRITÉRIOS** Sem controle, as duas explicações opostas produzem o mesmo dado e
recomendações contrárias. Nenhum número da amostra de cinco as separa.

**DECISÃO** Grupo de controle de 10 sites sorteados de `personalsit.es`
(universo 1096 após excluir feed, RSS e rede social), por hash FNV-1a da URL com
semente `v3-controle`. Determinístico e reproduzível. Nenhum site substituído
por falha — 10 de 10 mediram.

**EVIDÊNCIA** O controle **derrubou a conclusão principal do board**: densidade
de mídia não separa as populações (controle 0,60–81,11 contra referências
4,14–55,56, faixas sobrepostas; um site sorteado mede 81,11, acima de todas as
referências do cliente). E revelou o que separa: **tipografia de display, com
zero sobreposição** — controle 20–76px, referências 102–320px.

**ETIQUETA** `[C]` — imposta por ambiguidade não resolvível com a amostra
existente.

**ADAPTAÇÃO** O sorteio foi por hash justamente para que o resultado não pudesse
ser atribuído a mais uma seleção minha. Limite declarado: `personalsit.es` é
diretório de site pessoal em geral, não de portfólio de engenharia para
recrutamento. É linha de base de gênero, não amostra pareada.

---

## P-008 — A alavanca é tipografia de display, não mídia

**QUESTÃO** Qual variável explica a distância entre a LP e as peças que o
cliente chama de vivas?

**OPÇÕES**
- Densidade de mídia — hipótese do v3 original, e do v2 antes dele.
- Densidade de movimento — hipótese do v2.
- Cor — hipótese do v2, já descartada por medição.
- Tipografia de display.

**CRITÉRIOS** A variável tem que **separar** as populações, não apenas diferir
entre a LP e a amostra. Variável cuja faixa de controle contém a faixa das
referências não explica nada.

**DECISÃO** **Tipografia de display.**

**EVIDÊNCIA** Única variável medida com separação limpa: maior título do
controle 20–76px, das referências do cliente 102–320px, **sem sobreposição**.
Mídia e movimento têm faixas de controle que contêm quase inteiramente as das
referências. E o corolário que inverte o diagnóstico: os **46px da LP estão
acima da mediana do controle (39px)** — a LP é típica do gênero; o gosto do
cliente é que é atípico.

**ETIQUETA** `[R]` — as duas populações são medição; nenhuma foi escolhida por
mim.

**ADAPTAÇÃO** Consequência prática que pesou na decisão: é a única das variáveis
candidatas que **não custa asset** e não esbarra na restrição declarada de não
ter fotografia, não gerar pessoas e não usar stock.

**Limite:** a sonda lê `font-size` de `h1`–`h6` sem checar visibilidade, função
ou comprimento do texto. As cinco referências têm frase curta de marca; a LP
carrega cargo, formação e cinco projetos. O corte de 102px é medição; a
transferência para este conteúdo é a questão aberta da #36.

---

## P-009 — Rota de cena em canvas/WebGL: vetada

**QUESTÃO** A LP deve usar cena renderizada em canvas, no padrão do
`illoca.unseen.co`?

**OPÇÕES**
- Adotar, como "terceira rota de vitalidade" identificada no v3.
- Vetar.

**CRITÉRIOS** Compatibilidade com o job to be done do `PROBLEMA-v1` e com a
restrição de zero dependência.

**DECISÃO** **Vetada.**

**EVIDÊNCIA** Levantado pelo Antigravity: `Ctrl+F` de recrutador não encontra
texto dentro de `<canvas>`; leitor de tela é cego para o conteúdo; respeitar
`prefers-reduced-motion` exige interceptação em JS; e há custo de main thread em
aparelho fraco. Some-se que o illoca é **WebGL2** e o projeto declara zero
dependência npm. Numa página cuja função é **ser lida**, isso é desqualificante.

**ETIQUETA** `[C]` — restrição de acessibilidade e de função.

**ADAPTAÇÃO** O que sobrevive do illoca não é a técnica, é a arquitetura: **uma
tela, sem rolagem**, contra as 9,4 telas da LP. Essa parte segue viva e vai para
a discussão de arquitetura de seções (#7), depois do `DESIGN.md`.

---

## P-010 — Amostra rotulada: o cliente julgou o grupo de controle

**QUESTÃO** Como sair da seleção na variável dependente, apontada por Codex e
Antigravity, sem recomeçar a pesquisa?

**OPÇÕES**
- Pedir ao cliente 3 a 5 sites novos que ele ache feios — mais uma rodada de
  coleta, e ele escolheria o que lembrasse na hora.
- **Pedir que ele rotule os dez sites do grupo de controle**, que já estavam
  medidos com o mesmo instrumento.
- Manter o board como estava e declarar a limitação.

**CRITÉRIOS** A amostra rejeitada precisa ser **do mesmo gênero** e **não
escolhida pelo próprio julgamento** — senão ele escolheria o extremo caricato, e
o contraste testaria "berrante contra sóbrio" em vez de "vivo contra morto".

**DECISÃO** Rotular o grupo de controle. Zero medição nova, amostra já
comparável, e os dez vieram de sorteio — nem eu nem ele os escolhemos.

**EVIDÊNCIA** O cliente rejeitou **10 de 10**, sete sem ressalva. Um sorteio
aleatório do gênero dele não produziu **nenhuma** aprovação — achado por si só,
e consistente com o corte tipográfico.

**ETIQUETA** `[C]` — imposta pelo defeito de desenho apontado na crítica.

**ADAPTAÇÃO** Barato de propósito: a alternativa custava uma rodada inteira de
coleta e daria uma amostra pior. O limite fica declarado — os dez vêm do mesmo
diretório, sorteados no mesmo dia, e o rótulo saiu sem gradação.

---

## P-011 — O critério de aprovação do cliente é tipográfico

**QUESTÃO** Qual variável separa o que o cliente aprova do que ele rejeita?

**OPÇÕES** As dez variáveis medidas: mídia por 1000px · transição por 1000px ·
cor perceptível · cor forte · croma médio · croma de pico · quase neutro ·
luminância mediana · maior título · razão display/corpo.

**CRITÉRIOS** Um limiar único tem que classificar as 15 peças rotuladas sem
errar nenhuma. Se qualquer aprovado cai dentro da faixa dos rejeitados, a
variável não separa.

**DECISÃO** **Maior título (corte ≈ 89px) e razão display/corpo (corte ≈ 5,6×).**
São as duas únicas que passam, e as duas são tipografia.

**EVIDÊNCIA** Maior título: aprovados 102–320px, rejeitados 20–76px. Razão:
aprovados 6,0–20,0×, rejeitados 1,25–5,14×. As oito restantes falham — em croma
de pico, quase neutro e luminância mediana, **os cinco aprovados caem inteiros
dentro da faixa rejeitada**.

Corroboração verbal independente, dada sem ver número nenhum: o
`charityshot.co.uk` tem o **maior movimento de toda a pesquisa** (90,00
transições por 1000px) e foi rejeitado com *"apesar de valorizar a animação que
ele traz, acho muito simples em questão de cor, tipografia e UX"*. Título de
35px.

**ETIQUETA** `[R]`

**CONSEQUÊNCIA** A `lp-final.html` classifica **do lado rejeitado** nas duas
variáveis: 46px contra corte de 89, e 3,29× contra corte de 5,6×. É a resposta
para *"cara de site morto"* sem defeito apontável — e o defeito era o tamanho do
título.

**Limite:** o corte separa o **gosto do cliente**. Nenhuma peça foi testada com
recrutador, e a ligação com o job to be done do `PROBLEMA-v1` não foi medida. A
transferência do corte para o conteúdo da LP — que carrega cargo, formação e
cinco projetos, contra a frase curta de marca das referências — é a questão
aberta da #36.

---

## P-012 — Pré-scroll do instrumento: 700px/90ms é rápido demais para revelação

**QUESTÃO** O pré-scroll canônico da §8.1 do `REFERENCE-BOARD-v3` carrega o que
precisa ser medido, em página que revela conteúdo por scroll?

**OPÇÕES**
- O da §8.1: passos de 700px, 90ms de espera, volta ao topo, 700ms — escrito
  para carregar imagem preguiçosa.
- Passos de 400px, 120ms, **duas passadas**, volta ao topo, 1200ms.
- Forçar `is-revealed` por script antes de medir — descartada: altera a página
  para caber na régua, e mascara o defeito em vez de resolvê-lo.

**CRITÉRIOS** Depois do pré-scroll, todo elemento que a página revela por scroll
tem que estar em `opacity: 1`. Elemento em `opacity: 0` no momento da medição é
lido como o fundo que está atrás dele, não como ele mesmo.

**DECISÃO** **400px / 120ms / duas passadas.** O da §8.1 fica registrado como
insuficiente para peça com revelação por scroll — ele resolve imagem preguiçosa,
que era o problema para o qual foi escrito, e não resolve `IntersectionObserver`.

**EVIDÊNCIA** Medido na `wireframes/lp-final.html`, que tem 25 elementos
`[data-reveal]`:

| pré-scroll | elementos ainda em `opacity < 0,99` |
|---|---|
| §8.1 — 700px / 90ms | **20 de 25** |
| 400px / 120ms / 2 passadas | **2 de 25** — e os dois são duplicatas de idioma em `display: none`, que o observer nunca vê |

A consequência foi medida, não inferida. A `<section class="slab slab-hut8"
data-reveal>` — a segunda faixa escura da página, 870px de altura e largura
cheia, `rgb(11,11,11)` — foi capturada em `opacity: 0`. Na faixa dela, a captura
devolve `L` mediana de **0,970**, que é exatamente o valor do `--paper
#F7F5EF`, e **0,0%** de pixels escuros na linha 5600. A peça mediu **1 banda
escura e fração 0,1123**; o correto é **2 bandas e 0,2170** — quase o dobro.

O mesmo defeito atingiu, de forma independente, a sonda de contraste desta
issue: ela reportou **12 reprovações de AA**, todas com contraste exatamente
`1,00:1` e cor de texto **idêntica** à do fundo. Nenhuma era real. Duas sondas
diferentes, o mesmo erro, na mesma sessão.

**ETIQUETA** `[C]` — imposta por defeito de medição comprovado.

**ADAPTAÇÃO** O cabeçalho de `medicao-contraste/probe-contraste.js` declara o
pré-scroll como pré-requisito, com o sintoma do erro escrito, para que a sonda
não seja rodada sem ele.

**CONSEQUÊNCIA, e ela é maior que a #35.** Toda medição de peça com revelação
por scroll feita com o pré-scroll da §8.1 pode estar subestimando o que mediu —
inclusive mídia, movimento e cor nas rodadas anteriores do board. Isto **não foi
verificado** nas referências externas: o teste acima vale para a `lp-final`, que
é a peça cujo mecanismo de revelação eu conheço. Nas outras 15, a possibilidade
fica aberta e declarada.

**Limite:** o resultado de banda escura da #35 é **imune** a este defeito, e por
uma razão estrutural, não por sorte: a direção do erro é sempre subestimar
escuro, quatro peças rejeitadas já medem fração **1,0000**, e a faixa rejeitada
cobre `[0, 1]` inteiro. Nenhuma correção para cima produz separação. Isso não se
transfere para as outras variáveis do board, que não têm essa propriedade.
