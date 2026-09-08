Depende de #5 e #37. Sistema aplicado em `wireframes/lp-final.html` somente após
os tokens e as decisões estarem no DESIGN.md. A curva específica pertence à #22.

## Objetivo

Implementar dinamismo perceptível por interações responsivas, entradas seletivas
e um momento expressivo ligado ao conteúdo, conforme direção aprovada pelo
cliente em 2026-09-07. Avaliar movimento com tipografia, mídia e composição.

Referência: `docs/design/PESQUISA-MOVIMENTO.md`. Substitui a especificação antiga
de 0,24s único e o diagnóstico de densidade baseado no v2.

## Sistema candidato a validar

Base temporal de **0,3s**, com exceções nomeadas e justificadas no DESIGN.md.
0,3s é presente nas cinco referências aprovadas, dominante em três. Amplitudes
e curvas abaixo são hipóteses de projeto, não medições dessas referências.

| Gatilho | Alvo / propriedades | Hipótese inicial |
|---|---|---|
| Carga | Nome, proposição e CTA: opacity e translateY | 0→1 e 10px→0; 0,3s ease-out |
| Hover em ponteiro fino | Controles e cartões acionáveis: transform e cores explícitas | Elevação 2px; 0,3s ease |
| Foco visível | Controles: cor, borda/outline | Imediato, sem deslocamento |
| Active | Controle: transform | scale 1→0.98; pressão em 0–50ms, retorno até 0,1s |
| Abertura nativa de details | Conteúdo: opacity e transform | 0→1 e scale 0.95→1; 0,3s ease-out; fallback nativo |
| Viewport, em evidência selecionada | opacity e transform | Entrada temporal seletiva; conteúdo não reverte para opacity 0 |
| Visibilidade da curva IDF (#22) | stroke-dashoffset | Justificar duração narrativa ou intervalo de rolagem próprio |

Não exigir 0,3s de relógio para uma timeline dirigida pela rolagem. Não presumir
execução única de animações de viewport. Links usam somente propriedades de cor,
borda e transformação pertinentes, explicitamente listadas.

Movimento contínuo não está selecionado: avaliar propósito, leitura e pausa
acessível antes de incorporar. Não distribuir o mesmo reveal por todas as seções.

## Restrições

- Arquivo único, sem build/npm, conteúdo e ações essenciais sem JavaScript.
- Nunca transition: all nem transicionar dimensões ou posicionamento de layout.
- Sem interpolate-size: expansão nativa imediata; animação opcional no conteúdo.
- Fallback visível sem suporte a timeline e sem JS; não depender de hover no toque.
- Movimento reduzido: neutralizar durações, timelines e transformações; manter
  conteúdo apresentado visível e o traço no estado final; scroll-behavior auto.
  Não usar `opacity: 1` universal nem abrir painéis fechados.
- Timeline reversível somente para gráfico decorativo/narrativo; nunca ocultar
  texto ou dados no retorno da rolagem.
- Não bloquear leitura ou cliques nem sequestrar rolagem.

## Aceite

- Tokens definidos primeiro no DESIGN.md; base 0,3s e exceções documentadas.
- Resposta perceptível a ações, entradas seletivas e momento expressivo avaliados
  no conjunto visual, sem meta de contagem de animações.
- Conferência em navegador a 390, 1440 e 2560px, teclado, mouse e toque quando
  disponível; JS desabilitado, movimento reduzido e fallback sem timeline.
- Evidência de que conteúdo permanece acessível e a leitura não é atrasada.
- Crítica visual com o cliente antes de considerar o resultado aprovado.
- Checks de CI exigidos pelo CONTRIBUTING.md para a implementação.
