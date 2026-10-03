# Pesquisa de movimento — dinamismo perceptível e coerente

Data: 2026-09-07. Frente #37, após a pesquisa #17. Alimenta a síntese #5
(`DESIGN.md`) e a implementação #21. Não altera o CSS da LP nesta etapa.

## Direção aprovada pelo cliente

O cliente gosta de movimento para trazer dinamismo e sensação de página viva,
e reconhece que isso depende também de tipografia, composição e conteúdo.
Direção aprovada nesta conversa: interações responsivas, entradas seletivas e
um momento expressivo ligado ao conteúdo, a validar visualmente no conjunto.

“Gramática mínima” significa poucos padrões reutilizáveis e coerentes. Não
estabelece uma cota pequena de elementos animados nem recomenda uma página
discreta demais. Quantidade de animações não é indicador de sucesso.

## Evidência existente e seus limites

Fonte: [REFERENCE-BOARD-v3](REFERENCE-BOARD-v3.md), §§5, 7, 8.3, 10 e 12;
[provenance](provenance.md), P-005. Os números abaixo são transcritos da #17,
não novas medições de navegação feitas nesta tarefa.

| Peça | Keyframes/1000px | Transições declaradas/1000px | Duração dominante registrada |
|---|---|---|---|
| paulkalkbrenner | 0,10 | 33,82 | 0,3s (289 elementos) |
| illoca | 0 | 16,67 | 0,3s e 0,5s (5 cada) |
| white-desert | 0,29 | 6,93 | 0,3s (133) |
| lxlcreative | 0,07 | 5,42 | 0,5s (23), seguida de 0,3s (18) |
| Aelixa | 0,06 | 4,23 | 0,3s (54) |
| LP atual | 0,36 | 8,91 | 0,6s (52) |

`0,3s` está presente nas cinco referências aprovadas e domina em três.
O controle tem durações dominantes de 0,18s a 0,3s. A LP opera em 0,6s, o dobro
do padrão de 0,3s encontrado nas referências e no controle; isso justifica
0,3s como heurística técnica inicial, sem atribuir a ela aprovação estética ou
vitalidade. As referências usam múltiplas durações: oito no paulkalkbrenner e no
lxlcreative, cinco no white-desert. A duração única de 0,24s veio do paco.me,
escolhido pelo pesquisador, e não constitui preferência medida do cliente.

As faixas de transições declaradas se sobrepõem: aprovados 4,23–33,82;
rejeitados 0–90. O charityshot registra **90/1000px**, maior contagem normalizada
da amostra, e foi rejeitado apesar da animação apreciada. O lowmess registra
10,81/1000px e foi percebido como sem animação. O instrumento conta declarações
CSS: não comprova acionamento, visibilidade, amplitude ou interesse percebido.
Também não captura adequadamente movimento em JS, canvas e WebGL; keyframes
têm limitações de leitura entre origens. No charityshot, a altura de 900px com
rolagem controlada também limita a interpretação da normalização.

Portanto, a métrica não separou aprovações e rejeições. Isso **não demonstra
que movimento seja irrelevante**, nem invalida a percepção do cliente sobre o
lowmess. A separação por tipografia encontrada nos 15 casos é uma associação
nessa amostra, não prova causal de que aumentar títulos resolverá a vitalidade.

Mídia e movimento podem coexistir: paulkalkbrenner registra 83 imagens e
33,82 transições/1000px. Escolher uma rota exclusiva não é requisito desta
pesquisa. Presença visual de mídia também não se reduz à contagem de nós DOM.

## Observação comportamental

A coleta complementar está documentada em
[movimento/OBSERVACAO.md](movimento/OBSERVACAO.md), com instrumento, registros
lossless e imagens. Todos os cinco sites responderam HTTP 200 em 2026-09-07.

| Padrão observado | Evidência | Decisão de transferência |
|---|---|---|
| Entrada por opacidade e transformação | Aelixa: `30px→0` na carga e `76,8px→0` em letras ao rolar; Paul: título e imagem chegam de direções opostas | Usar somente no hero e em evidência selecionada; `10px` é adaptação deliberadamente contida |
| Resposta cromática | Aelixa: `color 0.3s`; White Desert: fundo azul→laranja em `0.3s` | Adotar em links e controles com propriedades explícitas |
| Ênfase no conjunto | LxL reduz irmãos para `opacity 0.4` e revela painel; links declaram `0.15s` | Considerar contraste entre itens, sem esconder informação ou importar o painel complexo |
| Exceção assimétrica | Paul: letras do link entram em `0.5s` e retornam em `0.3s` | Permitir exceções por função; nenhuma exceção entra no token sem ser nomeada |
| Resposta direcional | illoca move rótulos `12px` e sublinhados pela largura; corroborado mutuamente em `hover-0` (Features) e `hover-1` (Pricing), cobrindo >90% aos `+326ms`/`+368ms` (−11,1px/−11,3px) e repouso em −12,0px aos `+514ms`/`+523ms` (duração inferida de ~500ms em animação JS sem transição CSS) | Adaptar para amplitude menor em ponteiro fino; manter foco parado |
| Movimento contínuo / cena | Faixa do Aelixa, equalizador do Paul, vídeo do White Desert, SVG do LxL, canvas/SVG do illoca | Não adotar como base. Autorizar uma expressão temática limitada: curva do IDF na #22 |
| Rolagem reversível | White Desert usa parallax; LxL move vídeo e ambos revertem no retorno | Não usar opacidade reversível em texto/dados; timeline somente em gráfico decorativo/narrativo |

As referências dependem em grande parte de JavaScript, GSAP, vídeo, canvas ou
rolagem própria. A evidência serve para escolher padrões, não para copiar essas
dependências. A gramática da LP será CSS progressivo e preservará conteúdo sem JS.

## Decisões e hipóteses para a síntese

- **Decidido:** adotar 0,3s como duração base de transições temporais de interface.
  Exceções são permitidas quando função e observação as justificarem; cada uma
  deve ser nomeada e documentada no DESIGN.md antes do CSS.
- **Decidido:** combinar resposta à interação, direção do olhar e expressão
  visual ligada ao conteúdo. Não exigir uma densidade de animações.
- **Hipótese aprovada para prototipar:** base responsiva, entradas seletivas e
  um momento expressivo, com a curva do IDF como candidata. Não é aprovação
  do efeito final nem decisão de arquitetura de seções.
- **Hipótese de ritmo:** `ease-out` nas entradas e `ease` em mudanças de estado.
  Essas curvas e o `scale` abaixo vêm da hipótese anterior baseada no paco.me;
  permanecem placeholders explícitos para o protótipo, não evidência do cliente.
- **Movimento contínuo:** não selecionado nesta etapa. Qualquer proposta deve
  justificar sua função, testar a disputa com a leitura e prever pausa acessível.

## Gramática candidata

Valores de amplitude abaixo são hipóteses iniciais, a confirmar na #21.
`transform` representa deslocamento visual, sem transicionar o layout.

| Função / alvo candidato | Gatilho | Propriedades e amplitude | Ritmo inicial / repetição |
|---|---|---|---|
| Direção do olhar: nome, proposição e CTA | Carga | `opacity: 0 → 1`, `translateY(10px → 0)` | 0,3s, ease-out; uma vez; sem atraso obrigatório |
| Resposta: botões e cartões acionáveis | Hover em ponteiro fino | `translateY(0 → -2px)`; cor e borda quando pertinentes | 0,3s, ease; retorno ao sair |
| Resposta: controle pressionado | `:active` | `scale(1 → 0.98)` | Pressão imediata (0–50ms), retorno até 0,1s; exceção funcional |
| Resposta: links | Hover e foco | `color`, `background-color` ou `border-color`, listadas explicitamente | Hover em 0,3s; indicador de `:focus-visible` imediato e sem deslocamento |
| Direção do olhar: evidência selecionada | Entrada no viewport | `opacity` e `translateY(10px → 0)` | Animação temporal seletiva; não vincular opacidade de texto à rolagem reversível |
| Resposta: painel de details | Abertura nativa | Conteúdo com `opacity: 0 → 1` e `scale(0.95 → 1)` | 0,3s, ease-out; fechamento pode ser imediato; fallback nativo |
| Expressão: curva do IDF | Visibilidade da evidência, a definir no protótipo | `stroke-dashoffset` do traço real ao estado final | Duração ou intervalo de rolagem pendente; exceção narrativa justificada na #22 |

Não tornar conteúdo dependente do fim de animação. Entradas no viewport e
reabertura de painéis precisam de verificação real; não prometer execução única
ou suporte universal usando apenas CSS. Efeitos ligados à rolagem podem reverter
quando o usuário retorna; essa reversão só é aceita em gráfico
decorativo/narrativo e nunca deve ocultar texto ou dados.

## Restrições e fallback

- Entrega em arquivo único, sem build/npm e com conteúdo e ações essenciais
  funcionando sem JavaScript. Links, foco, toque e details devem funcionar nativamente.
- `prefers-reduced-motion: reduce`: neutralizar durações, timelines e
  transformações; manter conteúdo apresentado visível, traço no estado final e
  `scroll-behavior: auto`. Não aplicar `opacity: 1` universal nem abrir painéis fechados.
- Nunca `transition: all`; listar propriedades. Não transicionar altura,
  largura, `top`, `left` ou outras propriedades de layout/posicionamento.
- **Retirar `interpolate-size` da proposta:** animar dimensões contraria a
  restrição. A expansão nativa muda o layout imediatamente; o conteúdo pode
  receber o efeito de opacidade/transformação se suportado.
- `animation-timeline: view()` apenas como melhoria progressiva dentro de
  `@supports`, com conteúdo visível fora desse bloco e no modo de movimento reduzido.
- Não revelar todas as seções em cascata, sequestrar a rolagem ou exigir hover
  para acessar informação. Nada deve bloquear cliques ou leitura durante a entrada.

## Aceite da pesquisa

- [x] Preferência do cliente registrada e limites causais e instrumentais explícitos.
- [x] Evidência numérica consolidada sem usar densidade como meta.
- [x] Cinco referências observadas em carga, ponteiro, foco, rolagem e retorno,
  com método, data, dumps, imagens, falhas e distinção entre medição e observação.
- [x] Base de 0,3s definida como heurística técnica, com exceções funcionais.
- [x] Gramática candidata, origem das hipóteses e restrições documentadas.
- [x] Conceito do momento expressivo autorizado; sua forma pertence à #22.

## Handoff para as próximas etapas

A #5 incorpora as decisões e exceções no DESIGN.md. A #21 implementa o sistema
após essa síntese; a #22 trata a curva. O protótipo deve ser conferido em 390,
1440 e 2560px, com mouse, teclado e toque quando disponível, JS desabilitado,
movimento reduzido e fallback sem timeline de rolagem.

Na crítica visual, verificar se a página reage perceptivelmente às ações, se
as entradas orientam sem atrasar o conteúdo, se o momento expressivo tem relação
com o projeto e se a leitura permanece confortável. A aprovação de sensação de
vitalidade considera o conjunto de tipografia, mídia, composição e movimento.

Essas etapas não bloqueiam o aceite da pesquisa. A aprovação desta direção não
equivale à aprovação do visual implementado.
