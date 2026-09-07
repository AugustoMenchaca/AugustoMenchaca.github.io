# Como rodar os instrumentos

Todos os scripts desta pasta e da `../medicao-contraste/` **ancoram os caminhos
no próprio arquivo** (`__dirname` / `__file__`), então rodam de qualquer
diretório. Isso é deliberado: a primeira versão resolvia
`wireframes/lp-final.html` relativo ao CWD enquanto escrevia a saída relativo à
raiz do repositório — **as duas metades assumiam diretórios diferentes, e nenhum
CWD fazia as duas funcionarem**. Foi por isso que a rodada delegada precisou de
um driver separado só para a LP.

Pré-requisitos: Chrome, Node 18+, Python com `numpy` e `Pillow`.

## 1. Capturar e sondar

```sh
cd docs/design/medicao-banda-escura
npm install                     # puppeteer-core, escopado nesta pasta
node probe.js                   # as 15 referências → raw/*.png e raw/*_dom.json
node driver-lp-final.js         # a lp-final.html  → raw/lp-final.png e _dom.json
```

O caminho do Chrome está fixo no topo dos dois scripts
(`C:\Program Files\Google\Chrome\Application\chrome.exe`). Ajuste em outra
máquina.

**Ressalva que muda o resultado:** os dois usam o pré-scroll da §8.1 do board,
que é **rápido demais para disparar revelação por scroll** — deixa 20 dos 25
elementos `[data-reveal]` da LP em `opacity: 0`. Ver `provenance.md` **P-012**.
Para medir uma peça com revelação, use passos de 400px com 120ms e duas
passadas. A captura correta da LP está em `raw/lp-final-revelada.png`.

## 2. Medir banda escura

```sh
python bandas-verificado.py     # imprime a tabela de toda peça com PNG em raw/
```

**Não rode `bandas.py`.** Ele está preservado como a régua da rodada delegada
veio, com dois defeitos registrados no `RESULTADO.md` — conta a M3 em qualquer
corrida escura de 1px, e não escala o limiar de 300px pela captura, então
`aelixa` e `white-desert` (capturadas a 0,5×) saem com 0 bandas em vez de 3 e 2.
Além disso ele **sobrescreve** `raw/lp-final.json` e `raw/obspogon.json`, que
foram remedidos, devolvendo os números errados.

`bandas-verificado.py` corrige os dois pontos e lê a escala do `scaleFactor` de
cada `_dom.json`, não de argumento. Sem argumentos mede toda peça com PNG em
`raw/`; com argumentos aceita `caminho.png[:escala]`.

## 3. Métricas de cor por referência

```sh
python ../medicao-contraste/cor-por-referencia.py \
  ../referencias-v3/*.png ../referencias-v3/rejeitados/*.png
python ../medicao-contraste/tabela-cor.py > ../medicao-contraste/tabela-cor.md
```

**Meça as capturas de `referencias-v3/`, não as desta pasta.** As de
`referencias-v3/` são as canônicas, rastreadas desde a #17, e sobre elas a sonda
reproduz a §3 e a §12 do board em **15 de 15 peças**. As desta pasta são de
outra rodada, com outro estado de carregamento preguiçoso: medido sobre elas, o
`paulkalkbrenner` dá L mediana **0,596** contra **0,823** da §3.

## 4. Contraste da LP

A sonda de contraste (`../medicao-contraste/probe-contraste.js`) roda no
navegador, não por CLI — ela precisa da página viva para resolver o fundo
efetivo na árvore e acumular `alpha`/`opacity`. Cole o corpo dela no console do
DevTools com a página em `1440x900`, **depois** de rolar a página inteira com
passos de 400px e deixar as transições de 0,6s assentarem.

Sem isso ela reporta **12 reprovações falsas**, todas com contraste exatamente
`1,00:1` e cor de texto idêntica à do fundo — são elementos ainda em
`opacity: 0`. O sintoma está escrito no cabeçalho do arquivo.

Depois: `python ../medicao-contraste/tabela.py > ../medicao-contraste/tabela.md`

## O que fica fora do git

`raw/*.png` (23M). As mesmas 15 páginas já estão rastreadas em
`../referencias-v3/`, o histórico do repositório inteiro tem 24M, e estas são
regeneráveis pelo passo 1. O que precisa ser auditável são os números, e eles
ficam nos `raw/*.json` — 86K.
