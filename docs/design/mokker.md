# Novo ângulo Mokker

1. No Figma, aplique o plugin Mokker a um **MacBook Pro** ou **iPhone 17 Pro**. Ajuste rotação e câmera, coloque a captura real na tela e exporte o PNG com margem transparente.
2. Rode `python mokker-angulo.py <render.png> <captura> --tipo macbook|iphone [--saida dir]`. O comando produz WebP cheio e `-m`, `angulo.json` e `sobreposicao.jpg`; erro médio acima de 0,03 reprova o ângulo.
3. Abra `sobreposicao.jpg` e confira se toda a grade magenta fica dentro da moldura da tela, sem atravessar bordas, notch ou ilha.
4. Registre `matrix3d`, `raio_pct`, `notch_poligono`, dimensões e quadrilátero de `angulo.json` em `assets/mokker/angulos.json`; use o componente `.mk` com os WebP gerados.

Não invente ângulo por transformação CSS de um render existente. Para mudar o ângulo, exporte outro render do Mokker e valide de novo.
