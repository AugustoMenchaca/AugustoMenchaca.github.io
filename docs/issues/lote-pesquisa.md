===ISSUE=== pesquisa: paleta de cores, derivada de evidencia ||| pesquisa,design
Depende da #17. **Nenhuma cor é escolhida antes das referências estarem medidas.**

## Por que esta issue existe separada

Eu propus paleta duas vezes neste projeto sem base medida, e as duas vezes errei na direção oposta ao que o cliente pedia:

**Primeira vez** — ele disse "muito agressivo". Eu presumi excesso de cor. A medição mostrou o contrário: a página era **mais clara** (66% contra 46/61/42%) e tinha **menor croma de pico** (0,76 contra 0,82/0,97/0,82) que as três referências. A causa real era temperamento cromático — 81% da família vinho — e frequência de banda escura.

**Segunda vez** — ele disse "sem cor, cara de site morto". Eu presumi falta de croma. A medição mostrou que a referência que ele chama de viva, o Aelixa, tem **0,4% de área cromática**; distill.pub 3,1%; jalammar 0%. E os três sites de projeto **dele** têm 18,4%, 22,8% e 20,1% — ele é 45 a 57 vezes mais cromático que a própria referência.

Duas vezes o palpite errou e a régua acertou. Por isso a paleta agora sai de medida, não de opinião.

## O que medir, em cada referência que o cliente escolher

| medida | como |
|---|---|
| área por cor | soma da área dos fundos opacos maiores que 900px², agrupada por valor computado |
| área cromática | fração da área com croma > 0,15 |
| croma de pico | maior croma encontrado |
| temperamento | distribuição por família de matiz — âmbar, vinho, frio, ácido |
| contagem de tons escuros distintos | quantos valores diferentes de fundo escuro |
| bandas escuras contíguas | quantas entradas e saídas do escuro ao longo do documento |

Instrumento: Chrome headless com `emulate --viewport 1440x900x1` antes de cada leitura, para os números serem comparáveis entre si e com o que já foi medido.

## Restrições que a paleta não pode violar

- `--acid #E6F835` **nunca** como texto sobre paper, stone ou white — contraste ~1,1:1.
- Marca Hut 8 é fixa: `#0B0B0B`, `#6B0F9C`, `#8A8A8A`, `#A4DE02`.
- **Screenshot e figura de dado real nunca são recoloridos.** As paletas reais dos projetos entram como são: navy do IDF-BR, creme e dourado da Ciere, azul de oficina do DVO.

## Entregável

`docs/design/PESQUISA-PALETA.md` com a tabela de medições, e a paleta proposta **com a linha de evidência de cada decisão**: qual medida em qual referência justifica aquele valor.

## Aceite

Nenhum valor de cor na proposta sem uma medição que o sustente. Se um valor for escolha estética sem base medida, ele é declarado como tal, não disfarçado de conclusão.

===ISSUE=== pesquisa: tipografia, derivada de evidencia ||| pesquisa,design
Depende da #17. **Nenhuma escala tipográfica é escolhida antes das referências estarem medidas.**

## O que já foi medido, e vale reaproveitar

| referência | achado |
|---|---|
| Folha de S.Paulo | **8 tamanhos distintos** de título. Um item em 65px ocupando 1290px de largura; a massa em 24px em coluna de 300px. Razão manchete/massa **2,7×** |
| arXiv cs.LG | 8 tamanhos, workhorse em **13px** (394 usos), título de entrada em 18px (exatamente um por entrada), título da página em 26px |
| Brittany Chiang | tipo quase uniforme; hierarquia vem de permanência e volume, não de escala |
| Sara Soueidan | 4 blocos, 6 `<h2>`, hierarquia por ordem |

**A incompatibilidade está medida:** dominância assimétrica de tipo (Folha) contra uniformidade tipográfica com constância espacial (Chiang). Adotar um exclui o outro. Essa escolha é o coração desta issue.

## O que falta medir

As referências que **o cliente** escolher, com o mesmo instrumento: contagem de tamanhos distintos, razão entre o maior e o workhorse, largura de coluna em `ch`, altura de linha, e se há serifa em display.

Vale medir também o site da Ciere, que é trabalho dele: **serifa em display com dourado**, e é a peça mais viva do portfólio dele.

## Restrições

- Famílias já em uso: Instrument Sans (display), Inter (corpo), IBM Plex Mono (rótulo). Trocar exige justificativa medida.
- Pesos 800 e 900 foram vetados pelo cliente no briefing original.
- Reduzir ALL CAPS foi pedido explicitamente.

## Entregável

`docs/design/PESQUISA-TIPOGRAFIA.md` com as medições e a escala proposta, cada degrau com a referência que o justifica.

## Aceite

A escolha entre dominância assimétrica e uniformidade está **decidida com argumento medido**, não deixada em aberto.

===ISSUE=== pesquisa: movimento, derivado de evidencia ||| pesquisa,movimento
Depende da #17. Movimento é requisito declarado pelo cliente, não enfeite — e a medição já mostrou que era o eixo que faltava.

## O que já foi medido

| referência | keyframes/1000px | elems em transição/1000px |
|---|---|---|
| paco.me | **14** | **9,1** |
| lp-final.html (nossa) | 0,59 | 1,2 |
| | **24× menos** | **7,7× menos** |

E a gramática do paco.me é minúscula: `enter` com `opacity 0→1` mais `translateY(10px)`, `tooltipIn` e `dialogIn` com `scale(0.9→1)` e `scale(0.95→1)`, fades puros — e **todos os 13 elementos em transição usam a mesma duração, 0,24s**. Uma constante única na página inteira.

A LP usa 0,6s, 0,72s e 0,82s. Duas vezes e meia mais lento, e só na entrada.

## Contra-evidência que precisa ser resolvida

**Três das quatro referências vivas têm ZERO animação ativa:** distill.pub 0 keyframes, visualcinnamon 0, Aelixa 1 keyframe e 0 animações ativas. Elas vivem por densidade de mídia — 32, 33 e 81 imagens.

Ou seja: existem **duas rotas para vitalidade, e elas são excludentes**. Densidade de mídia ou densidade de movimento. Esta issue precisa decidir qual, para este caso, e não empilhar as duas — o Codex avisou que empilhar produz página mais ocupada, não mais viva.

## O que medir nas referências do cliente

Contagem de keyframes e de elementos em transição por 1000px, quais propriedades são animadas, em qual gatilho, com qual duração, e se há uma constante única.

## Restrições

- Arquivo único, sem build, sem npm, **funcionando sem JavaScript**.
- `prefers-reduced-motion: reduce` precisa zerar tudo.
- Nunca `transition: all`. Nunca transicionar altura, largura ou posicionamento.
- Técnicas sem dependência já levantadas: `stroke-dasharray` com `stroke-dashoffset` para curva que se desenha, `animation-timeline: view()` dentro de `@supports`, `interpolate-size: allow-keywords` para expansão animada, `color-mix(in oklch, …)`.

## Entregável

`docs/design/PESQUISA-MOVIMENTO.md` com as medições, a rota escolhida com justificativa, e a gramática de movimento: gatilho, propriedade, duração.

## Aceite

A escolha entre rota de mídia e rota de movimento está decidida com número. E existe **uma** constante de duração declarada, não três.
