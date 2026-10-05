# Auditor de responsivo, 320 a 3440 px (#111)

`docs/design/tools/auditar-responsivo.mjs` abre a página em 15 larguras (320, 360, 390, 414, 480, 600, 768, 900, 1024, 1280, 1440, 1920, 2560, 3000, 3440; altura 900; celular só abaixo de 768) com movimento reduzido, `content-visibility` forçado a visível e a página rolada uma vez, e roda três checagens em cada largura.

```
node docs/design/tools/servir.mjs 8080 &
node docs/design/tools/auditar-responsivo.mjs http://127.0.0.1:8080/ --json saida/relatorio.json --capturas saida
```

Imprime uma tabela (larguras × estouro, colisão, corte), grava o JSON e as capturas de **página inteira** em 320 e 3440, e sai com código 1 se qualquer checagem tiver ocorrência. O CI roda isso no check **Responsivo 320–3440** e guarda o relatório como artefato. Só Node e Chrome, sem dependência; `CHROME_PATH` aponta o Chrome.

| checagem | o que conta como ocorrência |
|---|---|
| **estouro** | `scrollWidth > innerWidth`, ou elemento visível passando do `.container` da seção. Fica de fora quem é cortado de propósito por um ancestral com `overflow` e quem é `position: fixed` |
| **colisão** | dois itens da mesma seção se cruzam em mais de 16 px² sem um conter o outro. Texto é medido pelos **retângulos do próprio texto** (`Range.getClientRects()`), não pela caixa do elemento, porque a caixa inclui a área de toque dos links (`padding-block: 4px; margin-block: -4px` no rodapé). Imagem, vídeo e SVG usam a própria caixa |
| **corte** | texto com `nowrap` ou `ellipsis` num contêiner com `overflow` cuja largura de conteúdo passa da visível |

Elementos com `display: none`, `visibility: hidden` ou `opacity: 0` (em si ou num ancestral) ficam fora: as prévias do hero só aparecem ao passar o mouse.

**Sobreposições declaradas** (constante `matchesOverlap`, uma linha de motivo cada): o pôster do vídeo sobre a captura estática (`img.device-video-poster` e `img.win__shot`, ver `assets/js/device-media.js`) e as fotos das Vivências, uma menor sobre a maior, por desenho. Texto com imagem continua sendo checado.

## Como se sabe que ele pega defeito

Em 04/10/2026, com a página no estado de antes da correção abaixo, o auditor reportou 1 estouro em 320 px e 0 nas outras larguras. Uma `div` de texto absoluta posicionada exatamente sobre o primeiro parágrafo do hero foi pega como **colisão** (`p.i18n x div#colide-teste`, 4041 px²) de 320 a 480 px e, de brinde, como estouro e corte de 320 a 414 px.

## O que ele achou

- **Corrigido:** em 320 px o `h2` da Ciere ("Conectando necessidades do cliente, decisões de design e desenvolvimento.") passava 14 px da coluna, porque o piso de `36px` do `clamp` fazia "desenvolvimento." (~290 px) maior que os 276 px de coluna. Agora `@media (max-width: 340px)` usa 32 px. Nenhuma outra largura mudou.
- **Falsos positivos que ele tinha e foram resolvidos medindo o texto:** caixas de `span` em linha que quebram de linha, links do rodapé com área de toque ampliada, prévias do hero invisíveis, pôster sobre a captura, polaroides das Vivências.
- **Não é defeito do auditor, é observação de layout:** em 3440 px a coluna de Contato e Rodapé começa ~120 px mais à esquerda que as seções acima (Ciere, Quantum, Hut 8, Sobre). Não quebra nada e não é pego por nenhuma checagem; fica para o Augusto decidir se quer alinhar.

## O que ele não cobre

Só a versão em português (a em inglês não é auditada); só o estado de repouso, com movimento reduzido; não mede alinhamento entre seções nem contraste. As capturas servem para olhar, não para comparar pixel a pixel.
