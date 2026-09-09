# TAREFA — reescrever o PESQUISA-TIPOGRAFIA.md sobre dados regenerados (issue #36)

Segunda rodada. A primeira versão deste documento foi entregue, revisada no PR
**#42**, e teve **alterações solicitadas**. O instrumento foi consertado e todas
as medições foram refeitas. Sua tarefa é **reescrever o relatório** sobre os
dados novos.

Você escreve **um arquivo só**: `docs/design/PESQUISA-TIPOGRAFIA.md`.
Não toque em mais nada. Não faça commit. Não rode medição — ela já está feita.

## Leia primeiro, por completo

1. `docs/design/tipografia/medicoes.json` — **a única fonte de números.** Foi
   regenerado agora, com o instrumento corrigido, em navegador com janela real.
2. `docs/design/00-ORDEM.md` — o que neste repositório é confiável.
3. `docs/design/REFERENCE-BOARD-v3.md` — as seções 6, 9, 10 e 12.
4. `docs/design/provenance.md` — entradas P-012, P-013 e P-014.
5. `docs/design/PESQUISA-TIPOGRAFIA.md` — a versão reprovada. Leia para **não
   repetir os erros dela**, não para copiar.

## REGRA ABSOLUTA — todo número sai do medicoes.json

Nenhum valor pode vir da versão antiga do documento, do REFERENCE-BOARD-v3, da
sua memória ou de estimativa. Se um número não estiver no `medicoes.json`, ele
não entra. Números do v3 podem ser **citados como comparação**, sempre rotulados
como "medido no v3", e sempre ao lado do valor novo.

## A estrutura do JSON

- `_meta` — geração, comando, contagem de sucessos e falhas
- `referencias.<id>` — com `status`, `dataHora`, `viewport`, `rotulo`, `url`,
  `passes` e `data`
- `variantesDaLP` — as chaves `A-lp-atual@1440`, `B-so-escala@1440`,
  `C-escala-evento-curto@1440`, e as mesmas três em `@390`

Dentro de `data`, o que interessa:

- `tamTitulos` — degraus de título **visíveis**, do maior para o menor
- `titulosDetalhes[]` — por degrau: `caracteres`, `palavras`, `elementos`,
  `fontFamily`, `familiaEfetiva`, `serifa`, `fontWeight`, `lineHeightPx`,
  `lineHeightRazao`, `lineHeightOrigem`, `letterSpacing`, `textTransform`,
  `inFirstViewport`, `largura_ch`, `maiorLarguraCh`
- `workhorse` e `workhorseDetalhe` — corpo dominante, com `largura_ch` e altura
  de linha
- `razaoTituloWorkhorse` — a razão display/corpo
- `maiorTextoRenderizado` — maior texto em **qualquer** tag, com
  `profundidadeDeRolagem`
- `caixaAlta` — contagem de ALL CAPS
- `telas` — altura em viewports, contra o viewport real
- `_legado` — os valores **sem filtro**, como o instrumento antigo os via
- `descartes` — o que foi excluído e **por qual predicado**

## As cinco alterações que a revisão exigiu

1. **Sem resíduo do protótipo apagado.** As linhas `escala-proposta-*` sumiram.
   O "depois" agora está em `variantesDaLP`, medido por injeção de CSS sobre a
   `wireframes/lp-final.html` real.
2. **A medição final está nos dados brutos** — é o que `variantesDaLP` é.
3. **Apresentar largura de coluna em `ch` e altura de linha das referências.**
   Isso é exigência da issue e faltou na primeira versão. Use `largura_ch` e
   `lineHeightRazao`. Onde `lineHeightOrigem` for `normal-medida`, diga que o
   valor foi medido da caixa de linha da fonte, porque `line-height: normal` não
   tem razão declarada — antes isso virava nulo e sumia da tabela.
4. **O instrumento foi corrigido**, e o documento tem que dizer o que mudou.
5. **Existe um comando para repetir a rodada:**
   `node docs/design/tipografia/medir.mjs --headed`
   Sem dependência alguma: fala CDP direto pelo WebSocket nativo do Node, sem
   puppeteer e sem `node_modules` no repositório. Alvos em `alvos.json`.

## Os fatos que você NÃO pode errar

Foram verificados à mão, um por um. Contradizer qualquer um reprova a entrega.

- **`incomescrane.com` mede 32px, não 68px.** O cabeçalho de 68px que o v3
  registrou tem `display: none` — nunca renderizou.
- **`paulkalkbrenner.net` mede 150px no display.** Uma régua intermediária
  marcou 641px: é um contador animado de dígitos num span recortado por
  container, fração contida 0,05. Não é tipografia.
- **`illoca.unseen.co` mede 111px, e isso só aparece em navegador com janela.**
  Em headless o herói fica em `opacity: 0`, porque a animação de entrada não
  dispara sem compositor real. O v3 acertou os 111px **porque não filtrava
  visibilidade nenhuma** — número certo por motivo errado. Isso é limite
  declarado do instrumento e precisa constar na seção de limites.
- **Serifa: leia `titulosDetalhes[0].serifa`, não o resumo antigo.** A versão
  reprovada afirmava "duas das cinco aprovadas" e incluía o `white-desert.com`.
  O display dele é **Oswald, sans-serif**. Conte pelo campo, e distinga "serifa
  no maior título" de "serifa em algum título da página".
- **B e C são idênticas no classificador.** A troca de conteúdo do herói — nome
  curto no `h1`, frase rebaixada a subtítulo — **não contribui nada** para
  cruzar o corte; muda só a altura da página. É decisão de hierarquia sem
  respaldo de medição, e vai para o Gate B/C.
- **A 390px a escala tem efeito, mas insuficiente.** Não repita a afirmação
  anterior de que "não tem efeito nenhum": aquilo saiu de emulação móvel errada.
  Use os números de `@390`.
- **A LP tem um `div.footer-wordmark` de 232px a cerca de 96% de rolagem.** O
  evento de display existe e é decorativo; o que carrega conteúdo para em 46px.
  E o `aelixa`, aprovado, tem a mesma forma — o gesto do rodapé aparece nos dois
  lados e **não separa nada**.

## O que você tem que decidir com os dados novos

**Recalcule os cortes você mesmo**, a partir de `tamTitulos[0]` e
`razaoTituloWorkhorse` de cada peça, separando por `rotulo`:

- o menor valor entre os `aprovado` e o maior entre os `rejeitado`;
- se as faixas ainda não se tocam, a classificação 15/15 sobrevive — diga com
  qual margem, em px;
- **se a margem encolheu em relação ao corte de 89px do board, diga isso com
  todas as letras.** É o achado mais importante desta rodada, se acontecer;
- `shelomoh.work` não devolve workhorse: dado ausente, não zero.

Peças com `rotulo: "cliente"` — Ciere, IDF-BR, DVO — são contexto e **não entram
no classificador**.

## A escala proposta

Mantenha os cinco degraus — 144 / 72 / 32 / 16 / 12 — mas **reancore cada um nos
números novos**. A issue exige **referência medida por degrau**, e a versão
reprovada deixou três com traço. Use as escadas de `tamTitulos` das aprovadas e
as medianas que você mesmo calcular.

Restrições que valem como lei: famílias Instrument Sans, Inter e IBM Plex Mono
mantidas; pesos 800 e 900 vetados; ALL CAPS reduzido — reporte a queda medida
comparando `caixaAlta.elementos` entre as variantes A e B.

## O documento

Português do Brasil, na voz do `REFERENCE-BOARD-v3.md`: direta, medida, sem
adjetivo de venda. Estrutura mínima:

1. o que esta issue decide;
2. o instrumento — as correções, o comando para repetir, e o teste de sanidade:
   quais peças reproduzem o v3 e quais divergem, com `_legado` ao lado;
3. as medições, aprovadas contra rejeitadas, **com `ch` e altura de linha**;
4. carga de texto no display, respondida com número — e trate o `illoca` como o
   contraexemplo que ele é;
5. serifa, contada pelo campo;
6. a decisão dominância versus uniformidade, e o que ela custa em altura;
7. a escala, degrau a degrau, cada um com sua referência;
8. antes e depois: as seis células de `variantesDaLP`, com o veredito do
   classificador nos dois viewports, e o CSS injetado na íntegra — está na
   constante `CSS_ESCALA` de `medir.mjs`, copie de lá;
9. limites declarados, incluindo o do headless, e o que continua não medido —
   **nada foi testado com recrutador**;
10. rodapé no formato dos outros boards: FASE, ARTEFATO, REFERÊNCIAS MEDIDAS,
    DECISÕES, QUESTÕES ABERTAS, O QUE ESTE DOCUMENTO NÃO AUTORIZA.

Seja honesto sobre incerteza. Este repositório registra os próprios erros em vez
de apagá-los, e a primeira versão deste documento foi reprovada justamente por
soar mais confiante do que os dados permitiam.

## Ao terminar

Digest de no máximo 20 linhas: os cortes recalculados com a margem em px, o que
mudou em relação à versão reprovada, e as questões abertas que você deixou.
Não cole o documento de volta.
