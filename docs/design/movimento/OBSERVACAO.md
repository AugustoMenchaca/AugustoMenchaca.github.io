# Observação comportamental das referências

Coleta: 2026-09-07, Chrome 152, viewport `1440×900@1`, movimento normal.
Instrumento reproduzível: [observe.cjs](observe.cjs). Os cinco sites responderam
HTTP 200. A coleta registrou estado computado durante carga, hover, saída do
ponteiro, primeiro foco por teclado, rolagem de 750px e retorno. Os arquivos
`.json.gz` são os registros lossless; as imagens de carga são amostras visuais.

Esta é uma sonda de interação, não uma medição de preferência. Ela identifica
o que ocorreu na sessão observada. Não cobre todas as páginas ou controles e
não converte comportamento observado em causa de aprovação.

| Referência | Carga / contínuo observado | Ponteiro e foco observado | Rolagem e retorno observado | Transferência para a LP |
|---|---|---|---|---|
| Aelixa | Rótulo e texto entram com `opacity 0→1` e `translateY(30px→0)`; letras entram separadamente; faixa de logos move continuamente | Links mudam para amarelo; dropdown usa `color 0.3s` | Novo título entra letra a letra desde `translateY(76,8px)`; a faixa continua em movimento no retorno | Entrada seletiva com opacidade/transformação e resposta de cor. Reduzir amplitude e não depender do GSAP usado pela referência |
| Paul Kalkbrenner | Título chega de lados opostos; imagem central chega em dois eixos; equalizador continua pulsando; imagens alternam com fade de `0.3s` | Link “Music” desloca letras: `0.5s` na entrada e `0.3s` na saída; cursor customizado acompanha o ponteiro | Navegação se recolhe com `transform 0.35s`; o retorno inverte o estado | Evidência direta para base com exceções assimétricas. Não transferir cursor customizado, equalizador permanente ou navegação que some |
| White Desert | Vídeo/fotografia ocupa o hero; elementos de cena mantêm movimento visual | Abas passam do azul translúcido ao laranja em `0.3s cubic-bezier(0.5,1,0.89,1)`; foco nativo apareceu | Hero, título e nuvens movem em velocidades diferentes e revertem ao retornar | Resposta cromática a 0,3s. Parallax de texto não é necessário para a LP; reservar movimento ligado à rolagem para gráfico narrativo |
| LxL Creative | Hero é dominado por imagem e tipografia; SVG gira continuamente | Hover em um link reduz irmãos para `opacity 0.4`; cor declara `0.15s`; painel associado entra com opacidade/transformação; foco recebe contorno | Vídeo se desloca nos dois eixos conforme a rolagem e reverte no retorno | Ênfase por contraste pode servir à navegação. Não manter ornamento rotativo permanente nem reproduzir painel complexo sem necessidade |
| illoca | Cena central em canvas/SVG e retângulos se movem continuamente | Labels “Features/Pricing” sobem `12px`; sublinhado percorre aproximadamente a largura do rótulo; estado final apareceu entre as amostras de 220 e 500ms | A roda não alterou `scrollY` nesta sessão; a página usa uma superfície de navegação própria, então não se infere ausência de movimento de rolagem | Microinteração direcional é transferível em amplitude menor. Canvas e superfície própria ficam fora por acesso, leitura e dependência de JS |

## Leitura cruzada

As cinco referências oferecem resposta perceptível, mas com mecanismos muito
diferentes. Três padrões reaparecem: mudança de cor/contraste no controle,
entrada por opacidade e transformação, e uma camada expressiva ligada ao tema.
As exceções também são parte da gramática: Paul Kalkbrenner usa tempos distintos
na entrada e saída; LxL usa `0,15s` nos links; illoca desloca rótulos em 12px.
Isso confirma uma base dominante, sem justificar uma constante universal.

O movimento expressivo das referências costuma depender de GSAP, canvas,
cursores customizados, vídeo ou controle próprio da rolagem. Essas técnicas não
são precedentes transferíveis para a restrição da LP. A adaptação escolhida é
CSS progressivo: resposta de cor/transformação, poucas entradas e uma expressão
temática no SVG real do IDF. A curva será definida na #22.

## Limites da coleta

- Valores de duração são chamados “medidos” somente quando o navegador expôs
  uma transição e seu evento. Deslocamentos lidos da matriz computada são
  arredondados. Movimento dirigido por JS sem transição CSS fica descrito como
  observado, sem duração inventada.
- O hover cobriu os dois primeiros controles textuais visíveis. O foco cobriu o
  primeiro elemento na ordem de tabulação. Não é auditoria completa de a11y.
- No illoca, a sonda anterior da #17 descrevia uma cena de 900px; a URL atual
  entrega uma página longa, mas a roda não moveu `scrollY` nesta sessão. O site
  mudou ou usa navegação própria; os dois registros ficam datados.
- As páginas são externas e podem mudar. O horário, versão do navegador e dumps
  preservam o estado observado. A eficácia na LP será testada na #21.
