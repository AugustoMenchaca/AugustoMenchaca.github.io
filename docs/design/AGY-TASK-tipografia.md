# TAREFA — issue #36: pesquisa de tipografia, a variável que decide

Você está num worktree do repositório, no branch
`AugustoMenchaca/pesquisa-tipografia-o-eixo-que-classifica-15-15`.
Trabalhe **aqui**, neste diretório. Não faça commit, não abra PR, não faça push.

## Ler primeiro, por completo, antes de qualquer medição

1. `docs/design/00-ORDEM.md` — diz o que neste repositório é medição confiável e
   o que é proposta feita fora de ordem. Leia inteiro.
2. `docs/design/REFERENCE-BOARD-v3.md` — o board vigente. **Seções obrigatórias:**
   §6 (tipografia), §8 (o instrumento na íntegra), §9 (questões abertas),
   §10 (grupo de controle), §12 (amostra rotulada de 15 peças).
3. `docs/design/provenance.md` — o formato QOC+FSE que você vai ter que seguir.
4. `wireframes/lp-final.html` — a página medida como "nossa" no board.

## O que a issue #36 pede, em uma frase

O REFERENCE-BOARD-v3 provou, com **15 peças rotuladas pelo cliente**
(5 aprovadas, 10 rejeitadas), que **duas variáveis classificam as 15 sem errar
uma, e as duas são tipografia**: maior título (corte ≈ **89px**) e razão
display/corpo (corte ≈ **5,6×**). A `lp-final.html` mede **46px** e **3,29×** —
sai do lado rejeitado nas duas.

Esta tarefa **projeta a escala tipográfica que cruza os dois cortes**, com cada
degrau justificado por uma referência medida, e resolve a incompatibilidade que
ficou aberta desde o v1: **dominância assimétrica** contra **uniformidade**.

## REGRA ABSOLUTA — nenhum número sem medição sua

Todo número que entrar no documento tem que vir de uma medição que **você
executou nesta rodada**, com script salvo e data registrada. É proibido:

- estimar, arredondar de memória ou "inferir" um valor;
- copiar número do v1 ou do v2 (o `00-ORDEM.md` lista quais foram derrubados);
- inventar referência, URL, autor ou citação;
- apresentar como medido algo que falhou ao carregar.

Se um site não carregar, **registre a falha com o erro** e siga. Uma peça a
menos com falha declarada vale mais que uma peça a mais com número inventado.

Números do v3 **podem** ser citados como linha de base — mas identificados como
"medido no v3" e, quando você remedir a mesma peça, **reporte os dois lado a
lado** e explique divergência em vez de escondê-la.

## Restrição de escopo — não implemente nada no produto

A política do projeto bloqueia implementação antes do Gate D. Esta issue é
etapa 1, evidência. Portanto:

- **NÃO** edite `index.html`, `Css/style.css`, `wireframes/lp-final.html`,
  `wireframes/prototipo-c.html`, `ROADMAP.md`, `00-ORDEM.md`,
  `REFERENCE-BOARD-v3.md` nem qualquer coisa fora da lista de entregáveis.
- **NÃO** instale dependência dentro do repositório. Instale em diretório
  temporário fora dele e aponte o script para lá. O repositório termina sem
  `node_modules/` e sem `package.json` novo.
- O único HTML que você cria é **instrumento de medição**, não protótipo de UI, e
  o documento tem que dizer isso com todas as letras.

## Ambiente

- Node **v24.11.0**, npm 11.6.1 disponíveis.
- Chrome em `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- Use `puppeteer-core` apontando `executablePath` para esse Chrome, instalado em
  pasta temporária fora do repositório.
- Viewport **1440x900x1**, idêntico ao do v3 — é o que torna as medições
  comparáveis. Antes de medir, role a página inteira para carregar imagem
  preguiçosa (rotina em `REFERENCE-BOARD-v3.md` §8.1).

## Etapa 1 — estender o instrumento

Partir da sonda de DOM do `REFERENCE-BOARD-v3.md` §8.1 **sem alterar as métricas
existentes** (elas precisam continuar reproduzindo os números do board — isso é
o seu teste de sanidade do instrumento) e **acrescentar** as métricas que a #36
exige e o v3 não tinha:

Para **cada** tamanho distinto de título, e em especial para o maior:

- `caracteres` e `palavras` do texto renderizado naquele tamanho;
- quantos **elementos** usam aquele tamanho (1 = evento único; muitos = ritmo);
- `font-family` computada, e **serifa sim/não** (classifique pela família real,
  não pelo palpite — registre o nome resolvido);
- `font-weight`, `line-height` (em px e em razão), `letter-spacing`,
  `text-transform`;
- se o elemento está **dentro do primeiro viewport** (topo < 900px);
- **largura da coluna em `ch`** do bloco de texto (largura em px dividida pela
  largura do caractere `0` na fonte computada) — para título e para o workhorse.

No nível da página:

- contagem de elementos com `text-transform: uppercase` e quantos caracteres
  visíveis estão em caixa alta, absoluto e por 1000px de altura;
- inventário de famílias tipográficas efetivamente usadas, com área ou contagem;
- `line-height` do corpo e largura da coluna de corpo em `ch`.

Salve a sonda em `docs/design/tipografia/sonda-tipografia.mjs`. **Ela é
entregável.** O v2 perdeu o script dele e o board registra isso como defeito —
não repita.

## Etapa 2 — o que medir

**Aprovadas pelo cliente (5 de 5):**
`https://aelixa.webflow.io` · `https://illoca.unseen.co` ·
`https://paulkalkbrenner.net` · `https://lxlcreative.co.uk` ·
`https://white-desert.com`

**Rejeitadas pelo cliente (10 de 10, o grupo de controle da §10):**
`charityshot.co.uk` · `obspogon.neocities.org` · `paul.fragara.com` ·
`lowmess.com` · `simonbetton.com` · `nextfive.xyz` · `incomescrane.com` ·
`shelomoh.work` · `thatmlopsguy.github.io` · `cassidoo.co`

As dez precisam das métricas novas também: sem elas você não consegue testar se
o corte de 89px sobrevive quando se controla por **carga de texto** e **função
do título** — que é a questão aberta nº 1 da §9 e o coração desta issue.

**Trabalho do próprio cliente (contexto, não julgamento):**
`https://advocaciacieredarosa.com.br` · `https://idf-br.com.br` ·
`https://dvopelotas.com.br`

O board diz que o site da Ciere usa **serifa em display com dourado** e é a peça
mais viva do portfólio dele. Confirme ou derrube isso com medição. Se serifa
aparecer nos aprovados, é evidência a favor; se não aparecer em nenhum, diga.

**A nossa:** `wireframes/lp-final.html` (via `file://`).

## Etapa 3 — a decisão que a issue exige

Duas formas de hierarquia foram medidas e são incompatíveis:

- **dominância assimétrica** — um evento tipográfico enorme, massa pequena;
- **uniformidade** — tipo quase uniforme, hierarquia por ordem e permanência
  (Brittany Chiang, Sara Soueidan; medidas no v1, com a ressalva de que **foram
  escolhidas pelo agente, não pelo cliente** — ver `00-ORDEM.md`).

Os cortes do cliente empurram forte para dominância. **Decida, com argumento
medido, e mostre o que a decisão custa.** Deixar em aberto reprova o aceite.

E enfrente a questão aberta nº 1 de frente, porque ela é o risco real:

> As cinco referências aprovadas têm **frase curta de marca** no display. A LP
> precisa carregar cargo, formação e cinco projetos. O corte de 89px é medição;
> que ele seja transferível para **este conteúdo** não é.

Sua medição de `caracteres no maior tamanho` responde isso com número. Se as
cinco aprovadas puserem 1 a 3 palavras a 102–320px, a escala da LP não pode
simplesmente inflar um título de frase longa — ela precisa **criar** o evento
curto. Diga onde ele mora: nome? cargo? uma palavra por seção? Justifique com a
peça que faz isso.

## Etapa 4 — a escala proposta

Cada degrau com: valor em px a 1440, valor a 390, a **referência medida** que o
justifica, e a função dele na página. Restrições que valem como lei:

- Famílias em uso: **Instrument Sans** (display), **Inter** (corpo),
  **IBM Plex Mono** (rótulo). Trocar exige justificativa medida — e se a medição
  justificar serifa em display, apresente como proposta explícita com o número
  que a sustenta, não como fato consumado.
- Pesos **800 e 900 foram vetados pelo cliente** no briefing original.
- **Reduzir ALL CAPS** foi pedido explicitamente. Meça o quanto a LP tem hoje e
  diga quanto a escala remove.
- A escala tem que funcionar a **390px** também. Display de 100px+ que quebra no
  celular não é escala, é captura de tela.

Não mire no mínimo. 89px é **piso** derivado de amostra de 15; a mediana das
aprovadas é **150px**. Argumente onde entre 89 e 320 a LP deve cair, e por quê.

## Etapa 5 — o "depois", medido e não estimado

O aceite exige antes **e** depois **medidos**. Para isso, e só para isso, crie
`docs/design/tipografia/escala-proposta.html`:

- é **instrumento de medição**, não protótipo de UI, e o documento precisa
  afirmar isso — ele não propõe layout, não vale como Gate C e não autoriza
  implementação;
- usa o **conteúdo real** da `lp-final.html` (hero completo mais duas seções com
  o texto que já existe lá) — texto sintético invalida a medição de carga;
- aplica a escala proposta e nada mais: sem redesenhar seção, sem inventar
  componente, sem mudar cor, sem mudar movimento;
- é medido pela **mesma sonda**, a 1440x900x1 **e** a 390x844x2.

Reporte a tabela antes/depois com as duas variáveis do classificador. O aceite é
`maior título ≥ 89px` **e** `razão display/corpo ≥ 5,6×` a 1440. Se a sua escala
não cruzar, **não maquie o número** — ajuste a escala e remeça, ou registre que
não cruzou e por quê.

## Entregáveis, e só estes

| arquivo | o que é |
|---|---|
| `docs/design/PESQUISA-TIPOGRAFIA.md` | o documento da issue |
| `docs/design/tipografia/sonda-tipografia.mjs` | a sonda estendida, reproduzível |
| `docs/design/tipografia/medicoes.json` | saída bruta de todas as peças, com data e viewport |
| `docs/design/tipografia/escala-proposta.html` | o instrumento que produz o "depois" |
| `docs/design/provenance.md` | **acrescentar ao fim**, sem editar o que já existe: uma entrada QOC+FSE para a escolha dominância × uniformidade, e uma para a escala proposta |

## O documento

`docs/design/PESQUISA-TIPOGRAFIA.md`, em **português do Brasil**, na voz do
`REFERENCE-BOARD-v3.md`: direta, medida, sem adjetivo de venda, sem "elevar",
"potencializar" nem "seamless". Estrutura mínima:

1. o que esta issue decide, e por que ela decide o resultado do projeto;
2. o instrumento — o que mudou em relação ao v3, e o teste de sanidade que
   mostra que as métricas antigas ainda reproduzem;
3. as medições, em tabela, aprovadas contra rejeitadas, com as métricas novas;
4. carga de texto no display — a questão aberta nº 1, respondida com número;
5. serifa: aparece nos aprovados? e no trabalho dele?
6. **a decisão** dominância × uniformidade, com o que ela custa;
7. a escala proposta, degrau a degrau, com referência e função;
8. antes e depois medidos, com o veredito do classificador do cliente;
9. limites declarados desta rodada — o que o instrumento não vê, o que a amostra
   não sustenta, e o que continua não medido (o `PROBLEMA-v1` fixa job to be done
   de recrutamento, e **nada aqui foi testado com recrutador**);
10. rodapé no formato dos outros boards: FASE, ARTEFATO, REFERÊNCIAS MEDIDAS,
    DECISÕES, QUESTÕES ABERTAS, O QUE ESTE DOCUMENTO NÃO AUTORIZA.

Seja honesto sobre incerteza. Este repositório tem histórico de conclusão
derrubada por crítica independente, e o board vigente registra os próprios erros
em vez de apagá-los. Um documento que declara o que não sabe vale mais aqui do
que um que soa confiante.

## Ao terminar

Devolva um digest curto: o que mediu, quantas peças falharam e por quê, a
decisão da etapa 3 em uma frase, a escala em uma tabela, e os números
antes/depois. **Não** cole os arquivos inteiros de volta. Não declare sucesso
sem ter rodado a sonda no `escala-proposta.html` e visto os dois números
cruzarem o corte.
