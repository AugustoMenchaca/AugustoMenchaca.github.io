# Sonda de Observação de Movimento

Instrumento automatizado e reproduzível para captura e análise comportamental das referências aprovadas do projeto (Aelixa, Paul Kalkbrenner, White Desert, LxL Creative e illoca), desenvolvido no contexto da issue #37 (PR #43 e PR #44).

## Arquivos e Estrutura

- `observe.cjs`: sonda em Playwright que navega pelas referências, executa ações de interação (carga, hover, leave, foco por teclado e rolagem) e agenda snapshots com tempos absolutos decorridos (`actionStartAt`), registrando `requestedDelayMs` e `actualDelayMs` (sonda absoluta do PR #44).
- `summarize.cjs`: script de análise (introduzido no PR #43, commit `ef2c887`) que descomprime os dumps `.json.gz` e compara o estado computado de cada elemento contra o snapshot `before` indexando por `uid`, isolando transformações e transições dinâmicas.
- `*.json.gz`: registros completos e lossless de todas as ações e snapshots de cada referência.
- `*-load.png`: capturas de tela do estado de carga visual de cada site.
- `OBSERVACAO.md`: síntese cruzada dos comportamentos observados e implicações para a landing page.

## Comandos de Reprodução

Para executar a sonda (requer módulo Playwright disponível no ambiente):

```bash
# Executar para todas as referências
node docs/design/movimento/observe.cjs playwright

# Executar para uma referência específica (ex.: illoca)
node docs/design/movimento/observe.cjs playwright illoca
```

Para analisar e sumarizar os dumps versionados:

```bash
node docs/design/movimento/summarize.cjs
```

## Nota Metodológica de Conferência (illoca)

Ao auditar os deslocamentos no `illoca`:

1. **Comparação diferencial por `uid`**: O site renderiza 275 elementos com dezenas de transformações estáticas no SVG/canvas decorativo (ex.: matrizes fixas de 39,0, −15,3, 5,5, etc.). Uma listagem genérica de `transform` oculta o sinal interativo; a conferência deve ser feita por `uid` em relação ao snapshot `before` da ação, como implementado em `summarize.cjs`.
2. **Ações de hover**: O hover em ponteiro fino não altera o foco do documento (`document.activeElement` permanece `body.` em ambas as ações). A microinteração direcional de −12,0px e o sublinhado deslizante são capturados e corroborados mutuamente em `hover-0` (rótulo "Features", uid 44) e `hover-1` (rótulo "Pricing", uid 52), ambos atingindo repouso final em −12,0px entre +514ms e +523ms após cobrirem mais de 90% do curso em ~330–370ms.
