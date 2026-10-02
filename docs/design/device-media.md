# Mídia nas telas dos aparelhos

Desde a issue #90 (rodada 2), o aparelho é o componente `.mk` (render real do
Mokker, com ângulo fixo em `assets/mokker/angulos.json`), e o slot de mídia é o `.mk__screen`
dentro dele, que **também leva a classe `.device-screen`** para reaproveitar
este mecanismo sem alterações:

```html
<div class="mk__screen device-screen"
     style="--cw:1440;--ch:900;--raio:0.6%;transform:matrix3d(…)"
     data-device-video="assets/video/idf-desktop.mp4"
     data-device-video-mobile="assets/video/idf-mobile.mp4"
     data-device-poster="assets/img/video/idf-poster-1280.webp"
     data-device-poster-mobile="assets/img/video/idf-poster-640.webp">
</div>
```

Sem `data-device-video`, o `.mk__screen` fica vazio — o render do Mokker por
baixo já mostra a captura embutida na tela, servindo de fallback. Só os dois
notebooks principais (IDF-BR e Ciere) têm vídeo; o resto do slot nunca recebe
`data-device-video`, e nenhum `<picture>` é necessário dentro do slot.

Sem `data-device-video`, nada é criado e nenhuma mídia extra é baixada. Com o
atributo, `assets/js/device-media.js` cria um `<video>` (`muted loop
playsinline preload="none" disablepictureinpicture aria-hidden="true"`) e,
sobre ele, um `<img class="device-video-poster">` (WebP, `alt=""`,
`aria-hidden="true"`) — ambos aria-hidden porque a captura vizinha já tem
`alt`.

## Quando cada coisa carrega

- **Pôster:** `.src` só é atribuído quando o `.device-screen` entra no
  `IntersectionObserver` (`rootMargin: 300px`) — pela primeira vez, fica
  valendo para sempre (não troca se o viewport mudar depois).
- **Vídeo:** mesma proximidade, **e só se** não houver
  `prefers-reduced-motion: reduce`, `navigator.connection.saveData` nem
  `effectiveType` `2g`/`slow-2g`. Fora dessas condições, carrega só o
  pôster — a mesma imagem que o `<video poster="…">` também recebe.
- **Desktop × mobile:** a escolha usa `matchMedia('(max-width: 899px)')` no
  momento do carregamento, não um listener contínuo.
- **Saída de tela:** o vídeo pausa; volta a tocar ao reentrar, enquanto as
  mesmas condições acima continuarem valendo.
- **Falha:** erro de carregamento ou bloqueio de autoplay (`play()`
  rejeitado) é ignorado em silêncio — o pôster permanece.

## A troca pôster → vídeo

O pôster fica **sobreposto** ao vídeo (mesmo retângulo, `position: absolute;
inset: 0`) e só some com um fade de **300ms, só `opacity`**, disparado pelo
evento `playing` do vídeo (classe `.device-screen--playing`). Isso evita o
salto de textura entre o pôster nativo do `<video>` e o primeiro quadro
decodificado. Sem vídeo tocando (erro, bloqueio ou condição acima), o pôster
nunca some.

## Espaço reservado

`.device-screen` já tem dimensão própria (dentro do recorte do aparelho,
`position: absolute` com `width`/`height` relativos a um ancestral de
`aspect-ratio` fixo). O `<video>` e o pôster herdam `position: absolute;
inset: 0; width: 100%; height: 100%`, no mesmo retângulo da captura — não há
mudança de layout (CLS) quando um ou outro aparece.
