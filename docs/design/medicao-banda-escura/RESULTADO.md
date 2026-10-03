# Banda escura — resultado verificado

> **Procedência.** A rodada foi executada pelo agy (Antigravity/Gemini) e
> **conferida linha por linha** aqui. O arquivo original dele está preservado em
> `RESULTADO-agy-original.md`. Das 16 peças, **14 reproduziram exatamente**; duas
> foram corrigidas, e a razão de cada correção está na seção "O que mudou". Os
> dados brutos em `raw/` são os dele, exceto `lp-final.json` e `obspogon.json`,
> remedidos aqui — os originais ficam ao lado, em
> `lp-final-agy-defeito-revelacao.json` e `obspogon-agy-falha-timeout.json`, para
> o erro continuar visível em vez de sumir na correção. Cada JSON corrigido
> carrega um campo `PROCEDENCIA` dizendo o que mudou e por quê.

Escuro é `L OKLCH < 0,50`. O limiar sai das próprias superfícies do projeto: as
quatro escuras medem `L` 0,150–0,339, as quatro claras 0,917–1,000, e 0,50 cai
no vazio entre as duas populações. **Banda** é corrida contígua de linhas
escuras com **≥ 300 CSS px**. Medido no pixel, não no `background-color`.

## Tabela

| peça | grupo | M1 tons | M2 bandas | M2 fração | M3 entra/sai | imgs | nota |
|---|---|---:|---:|---:|---:|---:|---|
| aelixa | **aprovado** | 3 | 3 | 0,0711 | 3/3 | 57/81 | captura a 0,5× · imagens incompletas |
| illoca | **aprovado** | 2 | 0 | 0,0000 | 0/0 | 0/0 | nenhuma tag `<img>` |
| paulkalkbrenner | **aprovado** | 1 | 7 | 0,4339 | 7/7 | 67/83 | imagens incompletas |
| lxlcreative | **aprovado** | 2 | 4 | 0,9451 | 3/3 | 38/39 | começa escuro |
| white-desert | **aprovado** | 2 | 2 | 0,0677 | 2/2 | 27/29 | captura a 0,5× |
| charityshot | rejeitado | 1 | 0 | 0,0000 | 0/0 | 40/73 | sequestro de rolagem — vale 1 tela |
| obspogon | rejeitado | 1 | 3 | 0,7981 | 3/3 | 31/33 | **remedido aqui** — falhou no agy |
| paulfragara | rejeitado | 1 | 0 | 0,0000 | 0/0 | 14/14 | |
| lowmess | rejeitado | 1 | 1 | 1,0000 | 0/0 | 0/0 | página inteira escura |
| simonbetton | rejeitado | 0 | 0 | 0,0000 | 0/0 | 5/14 | imagens incompletas |
| nextfive | rejeitado | 4 | 1 | 1,0000 | 0/0 | 8/8 | página inteira escura |
| incomescrane | rejeitado | 0 | 0 | 0,0000 | 0/0 | 8/8 | |
| shelomoh | rejeitado | 3 | 0 | 0,0000 | 0/0 | 4/4 | |
| thatmlopsguy | rejeitado | 3 | 1 | 1,0000 | 0/0 | 5/5 | página inteira escura |
| cassidoo | rejeitado | 1 | 1 | 1,0000 | 0/0 | 1/1 | página inteira escura |
| **lp-final** | local | 4 | **2** | **0,2170** | 2/2 | 0/0 | **corrigido** — agy media 1 e 0,1123 |

## O teste — pior aprovado contra melhor rejeitado

| métrica | aprovados | rejeitados | veredito |
|---|---|---|---|
| M1 tons escuros distintos | 1 – 3 | 0 – 4 | **não separa** |
| M2 número de bandas | 0 – 7 | 0 – 3 | **não separa** |
| M2 fração em banda | 0,0000 – 0,9451 | 0,0000 – 1,0000 | **não separa** |
| M3 alternância | 0 – 7 | 0 – 3 | **não separa** |

O detalhe de cada nulo, para não ficar só na faixa:

- **M1** — `nextfive`, rejeitado, tem **4 tons escuros distintos**, mais que
  qualquer peça aprovada. E três rejeitados empatam com o pior aprovado em 1 tom.
- **M2 bandas** — `illoca`, aprovado, tem **0 bandas**, igual a cinco rejeitados.
  No outro extremo, `obspogon`, rejeitado, tem **3**, igual à `aelixa`, aprovada.
- **M2 fração** — este é o nulo mais forte: a faixa rejeitada (0 a 1,0)
  **contém inteiramente** a aprovada (0 a 0,945). Não existe corte possível, em
  nenhuma direção.
- **M3** — mesma estrutura das bandas: sobreposição nas duas pontas.

**Nenhuma das quatro separa.** A variável de banda escura sai da lista, e sai com
os dois lados do julgamento do cliente na amostra — 15 peças rotuladas, 5
aprovadas e 10 rejeitadas.

## O que mudou em relação à rodada do agy

**1. A `lp-final` estava subestimada pela metade — 1 banda em vez de 2.** Causa
encontrada: `<section class="slab slab-hut8" data-reveal>`, a segunda faixa
escura da página, é revelada por scroll. Na captura do agy ela estava em
`opacity: 0`, e o `--paper` aparecia por baixo. Medindo a faixa dela na captura
dele, a `L` mediana dá **0,970** — exatamente o valor do `--paper` — e a fração
de pixels escuros na linha 5600 é **0,0%**.

Remedido com scroll de 400px e duas passadas, a slab revela (`is-revealed`,
`opacity: 1`, y=5362, 870px, largura cheia, `rgb(11,11,11)`) e a página passa a
**2 bandas** — `[955, 1893]` e `[5361, 6230]` — com **fração 0,2170**. As duas
bandas conferem com uma medição de DOM independente: 938px e 870px de altura.

**2. A M3 estava contando corrida escura de qualquer altura, inclusive de 1px.**
Por isso a `aelixa` saía com **32 transições** tendo 3 bandas: o número media
hairline e linha de texto escuro, não alternância de faixa. Recontada no nível de
banda, a `aelixa` tem **3/3**. O veredito não muda; o número passa a significar o
que o nome diz.

**3. A `obspogon` falhou no agy** por timeout de 30s, e teria deixado o teste com
N=14. Remedida aqui e fechada: 1 tom, 3 bandas, fração 0,7981. **N=15.** A falha
era transitória, não do site: `referencias-v3/rejeitados/obspogon.png` já existia
no repositório desde a #17, e a página carregou normalmente na segunda tentativa
com 60s de timeout.

**4. Um defeito meu, na conferência.** A primeira versão de
`bandas-verificado.py` aplicava o limiar de 300px em espaço de **imagem**, e
`aelixa` e `white-desert` foram capturadas a 0,5× — o que virava um limiar de 600
CSS px e fazia a `aelixa` sair com **0 bandas** em vez de 3. Corrigido para
escalar o limiar. Registro porque foi a mesma classe de erro que eu estava
auditando no trabalho do agy.

## Por que o nulo sobrevive ao defeito de revelação

O defeito da `lp-final` levanta a suspeita certa: se revelação por scroll pode
esconder faixa escura, as peças externas podem estar subestimadas também.

**A direção do erro é sempre a mesma — subestimar escuro.** E o nulo é imune a
ela: quatro peças rejeitadas medem fração **1,0000**, o máximo possível, e a
faixa rejeitada já cobre `[0, 1]` inteiro. Qualquer valor verdadeiro de uma peça
aprovada, por definição, cai dentro dessa faixa. **Nenhuma correção para cima
pode produzir separação.**

Corroboração independente, contra o inventário de fundos da §3 do
`REFERENCE-BOARD-v3` — medido com outro instrumento, em outra rodada:

| peça | o que a §3 diz | fração em banda aqui |
|---|---|---|
| paulkalkbrenner | preto em 43,7% da área de fundo | **0,4339** |
| lxlcreative | marrom `rgb(39,32,29)` em 98,6% | **0,9451** |
| illoca | areia 71% · branco 18% · azul 10%, nada escuro | **0,0000** |

Três de três batem. As duas que ficam abaixo do inventário — `aelixa` (0,0711
contra grafite em 10,5%) e `white-desert` (0,0677 contra quase-preto em 13,7%) —
são exatamente as capturadas a 0,5× e com imagem incompleta, e continuam dentro
da faixa rejeitada nos dois casos.

## Limites

- **Duas capturas degradadas na origem:** `charityshot` rola por sequestro
  (`scrollHeight` 900px, vale uma tela) e `simonbetton` carregou 5 de 14 imagens.
- **`illoca` e `lp-final` não têm tag `<img>`**, então `carregadas/imgs` não prova
  carregamento nelas — se usam `background-image`, o pré-scroll não é evidência.
- **A `illoca` mediu 900px de altura**, uma tela. Vale a mesma ressalva do
  `charityshot`.
- A régua vê **faixa horizontal de largura majoritária**. Bloco escuro estreito,
  em coluna, não vira banda — por definição, não por falha.

---

**INSTRUMENTO:** `probe.js` + `bandas.py` (agy) · `bandas-verificado.py` (a
conferência, com M3 no nível de banda e limiar escalado pela captura)
**DADOS BRUTOS:** `raw/*.json` e `raw/*_dom.json` — 86K, rastreados. Os
`raw/*.png` (23M) **ficam fora do git**: as mesmas 15 páginas já estão em
`docs/design/referencias-v3/`, e estas são regeneráveis pelo instrumento. O que
precisa ser auditável são os números, e eles ficam
**RESULTADO:** nulo nas quatro métricas, N=15
**O QUE ISTO NÃO AUTORIZA:** concluir que banda escura não tem efeito nenhum — o
que está medido é que ela **não distingue** o que o cliente aprova do que ele
rejeita. E o nulo vale para o gosto dele, não para o julgamento de um recrutador,
que segue não medido
