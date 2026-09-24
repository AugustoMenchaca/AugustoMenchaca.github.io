# Plano de movimento — design de execução da #21

Rascunho de `gpt-6-astra` em 2026-09-13; revisão e versão final de Claude
Sonnet 5 em 2026-09-24. Base documental e de código: `ca17f08` — inalterada
desde o rascunho, porque nenhum commit novo entrou na `develop` no intervalo.

**Status: proposta para crítica e deliberação; Gate D fechado.** Este documento
não implementa o sistema, não é um protótipo visual e não aprova o resultado.
O CSS abaixo existe somente dentro deste plano. Nenhum arquivo existente deve
ser alterado nesta entrega. Não houve medição, execução do driver ou inspeção
visual em navegador; os comportamentos descritos são previsões e contratos
para a etapa posterior.

## 1. Evidência, norma e decisões desta proposta

Fontes locais:

- [Ordem da pesquisa](00-ORDEM.md), atualização de movimento.
- [Pesquisa de movimento](PESQUISA-MOVIMENTO.md), seções “Evidência existente e
  seus limites”, “Decisões e hipóteses para a síntese”, “Gramática candidata” e
  “Restrições e fallback”.
- [Corpo versionado da issue #21](../issues/21-movimento.md), tabela dos gatilhos.
- [DESIGN.md](../../DESIGN.md), “Elevation & Depth”, “Components” e “Sistema
  de Movimento Integrado (Pesquisa #37)”.
- [Produto atual](../../wireframes/lp-final.html), leitura do código-fonte,
  sem tratar valores declarados como comportamento medido.

**A base de 0,3s é fixa.** A pesquisa registra sua presença nas cinco referências
aprovadas e dominância em três; o DESIGN.md a tornou norma. A evidência sustenta
essa base temporal, não uma conclusão de que determinado deslocamento ou curva
produzirá vitalidade. Não proponho outro token de duração base.

**Todas as amplitudes, curvas, alvos seletivos e durações de exceção escolhidos
abaixo são hipóteses de projeto.** Nenhum desses valores é apresentado como
medição das referências. Conservar `ease`, `ease-out`, `-2px`, `-3px` e `0.98`
é uma escolha explícita de continuidade com o sistema, não nova evidência.

A direção formal é uma chegada curta em conjunto e respostas locais distintas:
o ponteiro eleva; a pressão comprime; o foco permanece parado. Proponho
**opacidade constante em 1 nos elementos apresentados**: a direção vem do
deslocamento, sem um intervalo de texto, CTA ou dado invisível. Isso substitui
deliberadamente os fades candidatos `0 → 1` da pesquisa; não é uma proibição
deduzida dela. A crítica poderá rejeitar essa opção por ser pouco perceptível.

## 2. Os seis gatilhos

Todos os deslocamentos são em pixels CSS, iguais nas três larguras de crítica.
Não escalam com o tamanho da fonte raiz. Nenhuma entrada tem atraso ou stagger.

| Gatilho | Alvo e amplitude proposta | Curva proposta | Duração e repetição | Razão e estatuto da escolha |
|---|---|---|---|---|
| Carga | Texto do nome, proposição e grupo de CTA: `translateY(8px → 0)`; `opacity: 1` constante. Sem animar os cartões de credenciais ou a descrição auxiliar. | `ease-out`, equivalente a `cubic-bezier(0, 0, 0.58, 1)`. | **0,3s**, atraso **0s**, uma entrada por documento mediante o protocolo da §3. Sem JS, estado final estático. | **Hipótese estética:** 8px conserva uma direção reconhecível sem a máscara de uma linha inteira. Os três alvos chegam juntos; CTA e texto continuam apresentados desde o início. A curva desacelera a chegada, sem overshoot. |
| Hover em ponteiro fino | `.btn`, `.live-link`, `.footer-top`: `translateY(0 → -2px)`; `a.rail-item`: `0 → -3px`. Navegação e idioma: cor; links de coluna do rodapé: cor da borda existente. Nenhum movimento nos cartões sem ação. | `ease`, equivalente a `cubic-bezier(0.25, 0.1, 0.25, 1)`. | **0,3s** na entrada e saída. Exceção E1: somente `.nav-links a` conserva **0,18s**. Inversões cromáticas E4 são imediatas. | **Hipóteses estéticas:** manter 2px/3px já descritos no DESIGN.md e distinguir o cartão maior do botão. A curva serve tanto à aproximação quanto à saída. Gatilho limitado a `(hover: hover) and (pointer: fine)`; nenhum conteúdo depende dele. |
| Foco visível | Controles e links: deslocamento **0px**, escala **1**; `outline` de **2px**, afastado **3px**. Charcoal em claro, acid em escuro. Cores de estado mudam de imediato; sem animar espessura ou afastamento. | Sem interpolação; `linear` no token instantâneo é apenas convenção sem efeito a 0s. | **0s**, enquanto houver `:focus-visible`. Exceção E2. | Indicador estático já normativo no DESIGN.md. **Escolha de precedência:** foco cancela a entrada do ancestral marcado e a elevação/compressão do controle; teclado mantém o alvo parado e legível. |
| Active | Controles com superfície (`.btn`, `.live-link`, `.footer-top`, `a.rail-item`): `scale(1 → 0.98)` no centro; preserva a elevação enquanto o hover continuar. `.lang-btn`, `.rail-pause` e `summary`: escala igual, sem elevação. Com foco visível, sem compressão. | Pressão `ease-out`; soltura `ease-out`. | Pressão **40ms**, soltura **100ms**. Exceção E3; sem repetição automática. | **Hipótese estética e funcional:** compressão de 2% comunica pressão; 40ms escolhe um ponto no intervalo normativo 0–50ms; 100ms respeita o teto de retorno de 0,1s. São escolhas, não latências medidas. A ação nativa não espera a animação. |
| Abertura nativa de `details` | Somente o invólucro do conteúdo aberto: `translateY(4px → 0)`, escala **1**, opacidade **1**. `summary` permanece parado. | `ease-out`. | **0,3s** ao abrir; fechamento **0s**. Tentar em cada abertura; verificar reabertura por navegador. | **Hipótese estética:** 4px sinaliza a apresentação sem comprimir texto com o `scale(0.95)` candidato. A expansão de layout é nativa e imediata; não se tenta suavizá-la. Sem suporte ao efeito, o painel continua nativo. |
| Entrada por viewport em evidência selecionada | Somente a figura real candidata do Quantum: `translateY(10px → 0)`, escala **1**, opacidade **1**. Título, conclusão e legenda ficam estáticos fora do invólucro animado. Placeholder não é elegível. | `ease-out`. | **0,3s** de relógio, atraso **0s**. Uma tentativa por alvo/documento pelo protocolo da §3; nunca rearmar no retorno. | **Hipótese estética:** 10px diferencia a chegada da evidência da resposta de um controle. Escolha de implementação proposta: disparo temporal por `IntersectionObserver`, sem vincular opacidade ou progresso à rolagem. Sem JS/API, tudo já aparece no estado final. |

O sétimo gatilho, desenho da curva do IDF, pertence à **#22**. Não há aqui
proposta de traçado, amplitude, normalização de comprimento, duração narrativa
ou intervalo de rolagem para ele.

### Exceções temporais nomeadas

- **E1 — navegação textual de orientação:** conservar os `0,18s ease` de
  `.nav-links a`, já nomeados no DESIGN.md. Hipótese funcional: a pequena
  mudança de cor ao percorrer links próximos pede uma resposta mais curta que
  a elevação de uma superfície. Não estender essa exceção aos outros links.
- **E2 — foco e interrupção acessível:** `0s`; não atrasar a localização do
  teclado. O fechamento nativo de `details` também é imediato, sem animação
  de saída. São mudanças de estado, sem tempo de espera imposto.
- **E3 — pressão/soltura:** `40ms`/`100ms`, especialização da exceção já
  registrada no DESIGN.md. O tempo de retorno de escala não muda para 0,3s ao
  soltar fora do alvo, porque escala e deslocamento têm propriedades separadas.
- **E4 — inversão de primeiro plano/fundo:** `.live-link` e `.footer-top`
  conservam seus pares cromáticos de repouso/hover, mas trocam ambos em `0s`.
  Interpolar simultaneamente duas cores que trocam de papel pode aproximar
  texto e fundo durante o percurso. A resposta de 0,3s fica no deslocamento,
  não nessa inversão. É uma precaução de projeto, sem contraste novo medido.

Antes de implementar, registrar no DESIGN.md as escolhas aprovadas, em especial
E2/E4 e a especialização E3. Esta entrega não altera a norma. A base e E1 já
estão registradas; o plano não autoriza CSS de produto antes dessa atualização
e da abertura do Gate D.

## 3. Contrato de integração futura

### Alvos e estado final por padrão

O CSS da §5 é a camada de movimento completa proposta, usando os tokens de cor
existentes. Ele pressupõe a remoção das regras legadas listadas na §4 e os
marcadores abaixo, a adicionar somente na implementação autorizada:

| Marcador | Mapeamento e limite |
|---|---|
| `[data-motion="load"]` | Um `span` dentro de `.wordmark` para o nome; cada `.hero-headline` de PT/EN; o grupo `.hero-actions`. Não marcar o link inteiro do nome, cada letra ou cada botão do CTA. Animar o grupo evita concorrer com a transformação do botão. |
| `[data-motion="evidence"]` | Um invólucro da mídia real que substituirá o placeholder de `#quantum figure.ph-qml`; legenda e conclusão fora dele. Exigir mídia real carregada e procedência resolvida antes de marcar. **No HTML atual essa mídia está ausente: nenhum placeholder recebe entrada.** A obtenção do asset é trabalho da etapa de conteúdo. |
| `.is-motion-entering` | Estado transitório apenas nos marcadores de carga/evidência. Sem essa classe, o CSS apresenta o conteúdo em repouso. Não existe classe que esconda conteúdo à espera de JS. |
| `details.motion-details > .motion-details-body` | Invólucro imediatamente após um `summary` nativo. O HTML atual não contém `details`; esta é a especificação reutilizável, não uma decisão de criar painéis ou colapsar conteúdo existente. |
| `[data-motion-stroke]` | Contrato reservado de repouso de traços animáveis: somente caminhos apresentados que devam terminar com `stroke-dashoffset: 0`. Nenhum caminho é marcado pela #21. Não selecionar todo `path`/`svg`, nem mexer nos tracejados de referência. A #22 deverá compatibilizar seu estado final com este contrato. |

O estado de idioma (`display: none` da tradução inativa), painéis fechados e
duplicatas `aria-hidden` do trilho continuam sendo governados pelos mecanismos
existentes. Opacidade 1 em um alvo apresentado não muda esses mecanismos.

### Protocolo do disparador, sem código JS nesta entrega

1. Após o DOM estar disponível, habilitar entradas somente com
   `prefers-reduced-motion: no-preference`. Marcar simultaneamente os alvos de
   carga apresentados no idioma corrente. Não aguardar fonte, imagem ou fim
   de outra animação. Se a inicialização falhar, permanecer estático.
2. Usar um conjunto de alvos consumidos para a vida do documento. Trocar idioma
   consome/cancela a entrada correspondente também na outra tradução, antes
   da troca de `display`; não animar a proposição novamente ao trocar PT/EN.
   Remover a classe transitória no fim/cancelamento. Restauração por histórico
   não rearma entradas; um novo documento pode iniciá-las novamente.
3. Na evidência elegível, observar com `rootMargin: "0px"` e `threshold: 0`.
   Consumir na primeira entrada com `isIntersecting` e área de interseção
   positiva. São parâmetros de disparo propostos, não medições. Se o alvo já
   estiver visível ao inicializar, consumi-lo **sem** animação, evitando um salto
   tardio. Remover a observação antes de ativar `.is-motion-entering`.
4. Não preparar elementos fora da tela com opacidade zero. Falta de
   `IntersectionObserver`, JS desativado, erro ou callback atrasado preservam o
   conteúdo visível. Na falha, abandonar o efeito; não bloquear ações, rolagem,
   seleção, carregamento ou leitura. Não usar `preventDefault` nos controles.
5. Ao receber foco no alvo ou em descendente, consumir/cancelar sua entrada; o
   CSS também a neutraliza imediatamente. Ao mudar a preferência para `reduce`,
   cancelar classes, consumir os alvos pendentes e desconectar o observador.
   Voltar a `no-preference` não reapresenta o conteúdo. Nenhuma correção altera
   `open`, `hidden`, `aria-hidden` ou o idioma.
6. O `details` usa o atributo nativo `open`, sem observador e sem interceptar
   clique/Enter/Espaço. Não prometer reabertura animada em todo navegador: se
   ela falhar, aceitar abertura estática. A vida do efeito não governa a vida
   do painel.

O requisito de uma tentativa depende desse protocolo, **não de CSS sozinho**.
Sua implementação e a confirmação dos casos de histórico/idioma pertencem à
próxima etapa. Não se propõe `animation-timeline: view()` nesta #21. Se vier a
ser proposto depois para gráfico narrativo, só poderá existir em `@supports`,
com conteúdo visível fora do bloco e sem ocultar texto/dados ao rolar de volta.

## 4. Reconciliação com o código atual

Os valores “atuais” abaixo são declarações lidas em `lp-final.html` na base
`ca17f08`, não resultados de execução. A implementação futura deve substituir
essas regras, não apenas anexar mais uma camada competindo com elas.

| Regra atual | Destino proposto e motivo |
|---|---|
| `.will-reveal`: opacidade zero, `translateY(20px)`, transições de `0.6s ease-out`; `.is-revealed`; observador de todo `[data-reveal]` | Remover esse sistema genérico e seus marcadores. Títulos, parágrafos, seções, grades, contato e trilho ficam apresentados. Só a evidência explicitamente elegível passa a **0,3s/10px**, pelo novo protocolo. Não conservar exceção de 0,6s. |
| `.hero-anim`: `14px`, `0.72s`; `.hero-mask > span`: `105%`, `0.82s`; atrasos inline `--d` | Remover `heroUp`, `heroLine`, animações, máscara de overflow da linha e atrasos de entrada. Preservar a estrutura tipográfica necessária. Nome/proposição/CTA passam a **0,3s/8px**, simultâneos. Descrição e credenciais ficam estáticas. Não conservar exceções de 0,72s/0,82s. |
| `.btn`: `transform .18s ease`, hover sem filtro de ponteiro | Deslocamento em **0,3s**, somente ponteiro fino; pressão com E3 em propriedade separada. Não confundir os 0,18s deste botão com E1. |
| `.rail-item`: `transform .2s ease` | Somente `a.rail-item` recebe transição de **0,3s**; manter amplitude proposta de 3px. Os `div.rail-item` não sugerem ação por movimento. |
| `.nav-links a`: `color .18s ease` | Conservar exclusivamente como **E1**. Foco tem resposta imediata E2. |
| `.lang-btn`: `color .2s` | **0,3s** para hover; troca de `aria-pressed`, foco e seleção do idioma imediatos. |
| `.live-link`: `background .18s ease, color .18s ease` | Eliminar o shorthand de transição de fundo. Inversão cromática imediata **E4**; elevação de **0,3s**. |
| `.site-footer a`: `opacity .2s`, hover em `0.7` | Remover a redução de opacidade e sua transição. `.footer-col a` usa a borda já existente em **0,3s**; `.footer-top` usa elevação de **0,3s** e inversão imediata E4. Nenhuma regra universal de opacidade substitui essa remoção. |
| Foco global e foco de `.lang-btn` | Consolidar em indicador imediato E2; incluir o cartão charcoal, cujo fundo escuro não depende de um ancestral `.slab-dark`. |
| `.rail-track`: `rail-scroll 46s linear infinite` | **Legado contínuo fora dos seis gatilhos**, não converter em 0,3s nem adotar como novo padrão. Preservar nesta proposta a pausa por hover/foco/controle e o fallback de rolagem manual já existente. A decisão de manter/remover o movimento contínuo exige avaliação própria de propósito e leitura, pendente; não é validada por este plano. Em `reduce`, pará-lo. |

Não há exceção de 0,6s proposta. A conclusão não é “trocar toda duração por
0,3s”: o reveal indiscriminado sai; entradas seletivas e respostas geométricas
passam a 0,3s; E1–E4 têm função nomeada; o ciclo contínuo legado não se confunde
com uma transição de interface.

## 5. CSS proposto na íntegra

Bloco documental, **não aplicado**. Inserção futura após remoção das regras
substituídas na §4. Não modifica dimensões, fluxo, tipografia, paleta ou conteúdo.
O `display` do novo `span` do nome apenas permite transformá-lo; é estático,
nunca transicionado. As regras de layout, idioma e funcionamento do trilho que
não são movimento continuam no CSS existente.

```css
:root {
  --motion-base: 0.3s;
  --motion-nav: 0.18s;
  --motion-press: 40ms;
  --motion-release: 100ms;
  --motion-state: ease;
  --motion-enter: ease-out;
}

/* Repouso visível; não seleciona conteúdo oculto indiscriminadamente. */
[data-motion="load"],
[data-motion="evidence"],
details.motion-details[open] > .motion-details-body {
  opacity: 1;
  transform: none;
}

.wordmark > [data-motion="load"] {
  display: inline-block;
}

/* Transform para hover; scale independente para pressão e soltura. */
:is(.btn, a.rail-item, .live-link, .footer-top) {
  transform: none;
  scale: 1;
  transform-origin: center;
  transition:
    transform var(--motion-base) var(--motion-state),
    scale var(--motion-release) var(--motion-enter);
}

:is(.lang-btn, .rail-pause, details.motion-details > summary) {
  color: var(--charcoal);
  scale: 1;
  transform-origin: center;
  transition: scale var(--motion-release) var(--motion-enter);
}

.lang-btn {
  color: var(--muted);
  transition:
    color var(--motion-base) var(--motion-state),
    scale var(--motion-release) var(--motion-enter);
}

.lang-btn[aria-pressed="true"] {
  color: var(--charcoal);
  /* A seleção não espera a transição cromática de hover. */
  transition:
    color 0s linear,
    scale var(--motion-release) var(--motion-enter);
}

.nav-links a {
  transition: color var(--motion-nav) var(--motion-state);
}

.footer-col a {
  transition: border-color var(--motion-base) var(--motion-state);
}

/* Substitui os antigos :hover sem media query; mantém seus pares de cor. */
@media (hover: hover) and (pointer: fine) {
  :is(.btn, .live-link, .footer-top):hover:not(:focus-visible) {
    transform: translateY(-2px);
  }

  a.rail-item:hover:not(:focus-visible) {
    transform: translateY(-3px);
  }

  :is(.nav-links a, .lang-btn):hover {
    color: var(--charcoal);
  }

  .footer-col a:hover {
    border-bottom-color: var(--charcoal);
  }

  :is(.live-link, .footer-top):hover {
    background-color: var(--charcoal);
    color: var(--paper);
  }

  .slab-dark .live-link:hover {
    background-color: var(--paper);
    color: var(--charcoal);
  }
}

/* Somente superfícies/controles; links textuais corridos não comprimem. */
:is(.btn, a.rail-item, .live-link, .footer-top,
    .lang-btn, .rail-pause, details.motion-details > summary):active:not(:focus-visible) {
  scale: 0.98;
  transition:
    transform var(--motion-base) var(--motion-state),
    color 0s linear,
    scale var(--motion-press) var(--motion-enter);
}

/* Foco tem precedência sobre hover, active e cor interpolada. */
:focus-visible {
  outline: 2px solid var(--charcoal);
  outline-offset: 3px;
  transition-duration: 0s;
  transition-delay: 0s;
}

:is(.slab-dark, .slab-hut8, .slab-oxblood) :focus-visible,
a.rail-item.charcoal:focus-visible {
  outline-color: var(--acid);
}

:is(.btn, a.rail-item, .live-link, .footer-top,
    .lang-btn, .rail-pause, details.motion-details > summary):focus-visible {
  transform: none;
  scale: 1;
  transition-duration: 0s;
  transition-delay: 0s;
}

:is(.nav-links a, .lang-btn):focus-visible {
  color: var(--charcoal);
  transition-duration: 0s;
}

.footer-col a:focus-visible {
  border-bottom-color: var(--charcoal);
  transition-duration: 0s;
}

@keyframes motion-load {
  from { transform: translateY(8px); }
  to { transform: none; }
}

@keyframes motion-evidence {
  from { transform: translateY(10px); }
  to { transform: none; }
}

@keyframes motion-details {
  from { transform: translateY(4px); }
  to { transform: none; }
}

@media (prefers-reduced-motion: no-preference) {
  [data-motion="load"].is-motion-entering {
    animation: motion-load var(--motion-base) var(--motion-enter) 0s 1;
  }

  [data-motion="evidence"].is-motion-entering {
    animation: motion-evidence var(--motion-base) var(--motion-enter) 0s 1;
  }

  details.motion-details[open] > .motion-details-body {
    animation: motion-details var(--motion-base) var(--motion-enter) 0s 1;
  }
}

/* Cancelar movimento do invólucro também fixa o alvo de teclado. */
[data-motion]:focus-within,
.wordmark:focus-visible > [data-motion="load"],
details.motion-details > summary:focus-visible + .motion-details-body,
.motion-details-body:focus-within {
  animation: none;
  transform: none;
}

/* Repouso de traços futuros, sem decidir o efeito da #22. */
[data-motion-stroke] {
  stroke-dashoffset: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-timeline: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    scroll-behavior: auto !important;
  }

  /* Escopo de movimento HTML; não apagar transformações estruturais de SVG. */
  :is([data-motion="load"], [data-motion="evidence"],
      .btn, a.rail-item, .live-link, .footer-top, .lang-btn, .rail-pause,
      details.motion-details > summary,
      details.motion-details[open] > .motion-details-body, .rail-track) {
    transform: none !important;
    scale: none !important;
  }

  /* Somente conteúdo apresentado; nenhuma abertura de painel ou idioma. */
  [data-motion="load"],
  [data-motion="evidence"],
  details.motion-details[open] > .motion-details-body {
    opacity: 1 !important;
  }

  [data-motion-stroke] {
    stroke-dashoffset: 0 !important;
  }
}
```

O fallback manual do trilho já existente — `overflow-x: auto`, pausa da pista
e ocultação das duplicatas `aria-hidden` em movimento reduzido — deve continuar
ativo. O bloco acima não abre painéis, não liga traduções inativas, não remove
`display: none` e não aplica opacidade universal. Transformações estruturais
de SVG (como a rotação de um rótulo de eixo) não são movimento a neutralizar.

## 6. O que pode quebrar e como conferir depois

**Nenhum item desta matriz foi executado.** É o contrato de aceite da futura
implementação, após autorização. Usar 390, 1440 e 2560px, PT/EN, mouse, teclado
e toque quando disponível; o mesmo caso precisa passar nas larguras aplicáveis.

| Previsão de risco | Como conferir e predicado de aceite futuro |
|---|---|
| CSS legado continuar escondendo seções ou atrasando o hero | Inspecionar fonte e estilos computados: nenhuma regra ativa `.will-reveal`, `heroUp` ou `heroLine`; nenhum observador genérico de `[data-reveal]`; atrasos de entrada iguais a 0s. Não pode restar duração de 0,6s, 0,72s ou 0,82s nesses alvos. |
| Movimento sem fade parecer insuficiente, especialmente em 2560px | Crítica visual lado a lado em movimento normal/reduzido. Conferir depois amplitudes de 8px/10px/4px, duração de 0,3s e ausência de overshoot. Cliente precisa reconhecer a resposta sem perder o ponto de leitura; se rejeitar, revisar hipótese, sem alegar que 0,3s garante vitalidade. |
| Entrada do grupo deslocar um CTA durante foco ou clique | Focar/acionar antes de 300ms: ação nativa executa sem espera; invólucro focado tem animação cancelada e transformação identidade. Hover de botão chega a -2px; cartão acionável, -3px. Foco visível tem deslocamento 0px e escala 1. |
| Transição de pressão herdar 0,3s ao soltar ou perder hover | Pressionar, sair com o ponteiro ainda pressionado e soltar. Escala alvo 0,98, pressão declarada 40ms, soltura 100ms; deslocamento separado continua em 0,3s. Nenhum JS atrasa clique. No teclado, foco continua estático. |
| Halo de foco ser cortado por overflow do hero/trilho ou escuro sobre escuro | Percorrer todos os controles: outline inteiro de 2px com offset 3px visível nas três larguras, inclusive cartão charcoal. Comparar com repouso e verificar ausência de novo overflow horizontal no documento. Se cortar, rejeitar a integração para revisão de espaço; não esconder o defeito removendo outline. |
| Troca de idioma, voltar pelo histórico ou rolagem reversa repetir entrada | Carga → PT/EN → voltar ao trecho → histórico: alvo consumido não recebe nova classe. Evidência retorna com opacidade 1 e transformação identidade. Documento novo pode repetir. |
| Observer atrasado, indisponível ou JS quebrado deixar conteúdo pendente | Abrir com JS desativado e sem a API: todo conteúdo apresentado no estado final; links, foco e `details` utilizáveis. Não há estado escondido aguardando observer. Placeholder do Quantum permanece estático e não conta como evidência entregue. |
| Expansão de `details` dar salto ou animação não repetir | O salto de layout é **esperado e aceito**: comparar aberto/fechado; não há transição de height/width/posicionamento. Reabrir com mouse/teclado. Aceitar fallback estático; painel fechado não pode apresentar corpo nem controles na navegação de foco. Com foco no summary, a precedência de foco pode suprimir a entrada do corpo — comportamento intencional. |
| Preferência reduzida ativada no meio do efeito deixar posição intermediária | Alternar durante carga, hover, pressão, painel aberto e trilho: durações/delays 0s, animações desativadas, transformações dos alvos neutralizadas, traço marcado com offset 0, rolagem auto. Repetir com painel fechado e tradução inativa: ambos continuam ocultos. Voltar à preferência normal não rearma entradas. |
| Estado cromático do rodapé ficar desbotado ou inversão interpolada persistir | Conferir remoção de `opacity: 0.7`; links apresentados mantêm opacidade 1. Em `.live-link`/`.footer-top`, cor e fundo não constam da lista temporal de transições. Verificar legibilidade dos estados e do percurso na etapa visual, sem inferir contraste a partir deste plano. |
| Seletores novos anularem posicionamento de gráficos ou sugerirem ação falsa | Rótulos SVG conservam suas transformações estruturais; tracejados sem marcador conservam offsets; `div.rail-item` não eleva nem comprime. Nenhum placeholder ou seção inteira é marcado para entrada. |
| Conflito de suporte a propriedades ou CSS futuro com a norma | Rodar os checks exigidos pelo CONTRIBUTING.md na implementação, incluindo lint CSS/HTML; conferir browsers-alvo e fallback. Enumerar propriedades temporais: somente `transform`, `scale`, `color` e `border-color`. Nenhuma transição de geometria de layout; nenhuma timeline de viewport nesta proposta. |

## 7. Decisões de não fazer

- **Não animar todo `[data-reveal]` nem distribuir stagger pelas seções.** Essa
  regularidade cria espera repetida e disputa a leitura; selecionar a evidência
  é uma decisão editorial, não uma meta de quantidade de animações.
- **Não usar fade de opacidade zero, máscara por linha ou compressão de texto
  de painel.** A proposta aposta no deslocamento curto para preservar leitura
  e ação desde o primeiro instante. Essa forma segue aberta à crítica.
- **Não transicionar layout, usar `transition: all` ou `interpolate-size`.**
  Listar propriedades e deixar a expansão nativa de `details` imediata.
- **Não usar `animation-timeline: view()` para simular uma entrada única.**
  Linha de tempo de rolagem não tem duração fixa de relógio e pode reverter;
  o disparador temporal proposto explicita consumo e fallback.
- **Não introduzir biblioteca, build, dependência npm, scroll handler contínuo
  ou controle de rolagem.** CSS e um disparador opcional no arquivo único bastam
  para a hipótese; a navegação essencial continua nativa.
- **Não decidir conteúdo de painéis, arquitetura de seções, obtenção de mídia
  ou efeito da curva IDF.** Especificar o gatilho não autoriza inventar o alvo;
  #22 conserva integralmente a decisão sobre a curva.
- **Não adicionar movimento contínuo nem revalidar o trilho de 46s por analogia.**
  O legado exige avaliação de função, disputa com leitura e pausa acessível;
  essa aprovação não está contida no plano.
- **Não medir, prototipar, aplicar CSS ou declarar aceite visual nesta entrega.**
  O próximo passo é criticar as hipóteses e decidir os gates; a execução futura
  atualiza primeiro o DESIGN.md e só altera o produto com Gate D aberto.

## Revisão

Revisão de 2026-09-24 sobre o rascunho de `gpt-6-astra` (base `ca17f08`, não
commitado). Conferido item a item contra `PESQUISA-MOVIMENTO.md`, `DESIGN.md`
e a leitura de `wireframes/lp-final.html` na própria base — não contra
execução ou medição, que esta entrega não autoriza.

### O que foi conferido e mantido

1. **Base de 0,3s.** Nenhum gatilho propõe outro token de duração base; toda
   exceção (E1–E4) está nomeada com razão ao lado. Confere com
   PESQUISA-MOVIMENTO.md ("`0,3s` está presente nas cinco referências
   aprovadas e domina em três", linha 32) e com a seção "Sistema de Movimento
   Integrado" do DESIGN.md. Mantido sem alteração.
2. **Nenhum `transition: all`.** O literal só aparece na lista de proibições
   (§7); no CSS de §5 toda propriedade é listada nominalmente — `transform`,
   `scale`, `color`, `border-color`. Mantido.
3. **Nenhuma transição de propriedade de layout.** O CSS de §5 não transiciona
   `height`, `width`, `top`, `left`, `margin` nem `padding` em nenhuma regra;
   a expansão de `details` é tratada como salto nativo aceito, não suavizado
   (§6, linha "Expansão de `details`"). Mantido.
4. **`interpolate-size` fora.** Não ocorre no documento fora da própria
   proibição citada em §7. Mantido.
5. **`animation-timeline: view()` só em `@supports`.** O documento não propõe
   o uso da propriedade nesta entrega, nem dentro nem fora de `@supports`, e
   diz isso textualmente em §3: "Não se propõe `animation-timeline: view()`
   nesta #21." A única menção em CSS é o reset `animation-timeline: auto
   !important` dentro do bloco `reduce`, que neutraliza timeline, não a
   declara. Mantido.
6. **`prefers-reduced-motion: reduce`.** O bloco de §5 zera duração e
   transformação (`transform: none !important; scale: none !important`),
   mantém `[data-motion="load"|"evidence"]` e o corpo de `details[open]` em
   `opacity: 1 !important` por uma lista nomeada de seletores, nunca por `*`
   — não é opacidade universal — e não força `open` em nenhum `details`
   fechado, porque o seletor só alcança `details.motion-details[open]`. Inclui
   `scroll-behavior: auto !important` e `stroke-dashoffset: 0 !important` para
   o contrato de traço. Mantido sem alteração.
7. **Sem cascata, sem sequestro de rolagem, sem hover obrigatório.** O
   documento remove o sistema `.will-reveal`/`.is-revealed` de
   `lp-final.html` — confirmado em `wireframes/lp-final.html:354-355` e
   `:1361-1372`, que hoje aplica reveal genérico a todo `[data-reveal]` — sem
   substituí-lo por outra cascata; a entrada de evidência é seletiva a um
   único alvo. Nenhum conteúdo depende de `:hover`: todo alvo de
   `[data-motion]` parte de `opacity: 1` no estado de repouso. Mantido.
8. **Amplitudes e curvas declaradas como escolha estética.** Cada linha da
   tabela do §2 tem uma célula de razão que nomeia a hipótese; nenhuma é
   apresentada como conclusão da pesquisa, inclusive onde o documento se
   afasta deliberadamente dos candidatos da pesquisa (por exemplo, descartar
   o fade de opacidade e o `scale(0.95)` do `details`, declarado como tal em
   §1 e na linha de "Abertura nativa de `details`"). Mantido.
9. **Reconciliação dos 0,6s (e 0,18s).** Conferi cada regra citada na tabela
   do §4 contra o código-fonte atual — `.will-reveal` (`:354`), `.hero-anim`/
   `heroUp`/`heroLine` (`:527-540`), `.btn` (`:108`), `.rail-item` (`:148`),
   `.nav-links a` (`:98`), `.lang-btn` (`:364`), `.live-link` (`:459`),
   `.site-footer a` (`:350-351`) — e todos os valores batem com o que o
   documento declara. A exceção E1 (0,18s em `.nav-links a`) já está
   registrada no DESIGN.md ("Links de Navegação" nas Exceções Funcionais
   Nomeadas); o documento não inventa essa exceção, só a preserva. Mantido.
10. **Curva do IDF fora de escopo.** O §2 fecha afirmando textualmente que o
    sétimo gatilho "pertence à #22" e não propõe traçado, amplitude ou
    duração para ele. Mantido.

### O que mudou

- **Proveniência e data.** A abertura do documento passa a registrar a
  autoria em duas etapas — rascunho de `gpt-6-astra`, revisão e versão final
  de Claude Sonnet 5 — e a data desta revisão, preservando `ca17f08` como
  base de código: ela não mudou porque nenhum commit novo entrou na `develop`
  no intervalo.
- **Esta seção.** Nenhuma seção de revisão existia no rascunho; é a única
  adição estrutural desta passagem.

### Por que não há mais correções

O rascunho já citava fonte para cada afirmação factual sobre o código atual,
já declarava cada valor sem base medida como hipótese, e já enumerava
exaustivamente propriedades, exceções e o que decidiu não fazer. A
verificação linha a linha contra `lp-final.html` não encontrou nenhuma
discrepância entre o que o documento afirma existir hoje e o que existe. Não
fabriquei correção onde a checagem não encontrou erro; o valor desta revisão
está no registro da checagem em si, feita ponto a ponto contra a
especificação da #21, e na assunção de autoria da versão final.
