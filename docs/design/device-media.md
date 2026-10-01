# Mídia nas telas dos aparelhos

Cada `.device-screen` mantém sua própria captura e pode receber um vídeo,
independentemente dos outros aparelhos. Configure apenas as telas desejadas:

```html
<div class="device-screen" data-device-video="assets/videos/idf-desktop.webm">
  <picture><!-- captura atual, com sources e alt --></picture>
</div>
```

Use uma gravação da navegação com a proporção da captura daquele dispositivo.
No notebook, a mídia preenche a abertura; no celular, a gravação inteira fica
visível. A perspectiva, o notch e a moldura continuam sobre a mídia.

O vídeo começa quando a tela entra na viewport, mudo, em loop e inline. Ao sair
da viewport, ocultar a aba ou ativar `prefers-reduced-motion`, volta à captura.
Falha no arquivo ou bloqueio de autoplay também mantém a captura. Sem o
atributo, nenhum vídeo é criado ou baixado. Não há vídeo de produção configurado
nesta rodada porque o arquivo ainda não foi fornecido.
