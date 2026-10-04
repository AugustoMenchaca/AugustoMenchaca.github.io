# Fontes próprias (#110)

Inter, Instrument Sans e IBM Plex Mono saem de `assets/fonts/` (woff2, subconjunto `latin`, licença OFL em `assets/fonts/LICENSES.txt`). O site não faz mais requisição a `fonts.googleapis.com` nem a `fonts.gstatic.com`.

Os arquivos são os mesmos que o Google servia: baixados do CSS dele, só os subconjuntos cujo `unicode-range` cobre um caractere que a página usa (a mesma regra do navegador). O Inter é um arquivo variável, então as três regras por peso viraram uma (`font-weight: 400 600`). O itálico do Instrument Sans foi tirado: nenhum texto o usa.

## O que a issue supunha e o que a medição mostrou

A issue partia de que a troca de fonte causava o CLS de ~0,07 do CI e de que fonte própria + `preload` + fallback com métrica o zeraria. Medido em 04/10/2026, Chrome headless por CDP, 1,6 Mbps / 150 ms de latência / CPU 4× mais lenta (o perfil do CI), 3 a 4 rodadas por variante:

| variante | CLS (1440) | FCP = LCP (390) |
|---|---|---|
| Google Fonts (antes) | 0,0749 | 2,05 a 2,4 s |
| **fonte própria, sem `preload`, sem fallback (entregue)** | 0,0749 a 0,0769 | **1,8 a 2,3 s** (mesma faixa, sem piora) |
| própria + `preload` das duas fontes | não medido | 2,1 a 2,4 s |
| própria + `preload` só do Inter | não medido | 2,2 a 2,5 s |
| própria + fallback com métrica (7 faces, `local('Arial')`) | **0,0013** | 2,8 a 3,2 s |
| mesmo fallback, sem `size-adjust`/overrides | não medido | 2,4 a 2,6 s |
| mesmo fallback, faces declaradas mas fora da pilha | não medido | igual à fonte própria pura |

Medido com `auditar-carga.mjs` (sem limitar rede): primeira carga 305,8 KB e 16 requisições, contra 306,5 KB e 17 antes. Estouro 0 nas 9 larguras do `estouro.mjs`. Capturas de viewport do `develop` e desta versão, 12 em 1440 px e 13 em 390 px com movimento reduzido: 0 pixel diferente.

## Por que o CLS não foi tratado aqui

- **O deslocamento é a fonte sendo aplicada depois do primeiro paint**, mas o atraso não é de rede. A cascata mostra as fontes terminando de baixar em ~1,4 s. O primeiro frame de estilo e layout, sem nenhum script, ocupa a thread principal por ~1,7 s (Long Animation Frames) com CPU 4× mais lenta. O texto pinta com a fonte do sistema, e a fonte só é aplicada no frame seguinte, e o hero se reorganiza.
- **Hospedar não muda isso** (CLS na mesma faixa: 0,0749 antes, 0,0749 a 0,0769 depois; nas rodadas de 0,0769 o relatório trouxe um único deslocamento em vez de dois), porque o gargalo é a thread principal, não a origem dos arquivos.
- **O fallback com métrica resolve o CLS, mas custa LCP.** Levou o LCP de ~2,1 s para ~2,9 s, cruzando o 2,5 s do "bom". O custo só aparece quando a face de fallback entra na pilha de fontes: declarada e sem uso, não custa nada. Repetido com perfil do Chrome reaproveitado, para descartar custo de perfil frio: o custo continua. A causa exata (resolução de `local('Arial')` ou os overrides) não foi isolada. Troca ruim: o CLS que ele corrige (0,075) já está abaixo do limite de 0,1.
- **O `preload` não ajudou**: o primeiro frame começa em ~0,24 s, antes de qualquer fonte conseguir chegar, e os dois arquivos (78 KB) só disputam banda com o CSS.

Se um dia o CLS precisar baixar, o caminho é encurtar o primeiro frame (por exemplo, `content-visibility: auto` em mais seções, que hoje só está em `#about`, `#contact` e no rodapé), não mexer em fonte. Isso tem risco próprio (saltos de altura ao rolar) e fica fora desta issue.

## Ganho real da mudança

Sem dependência de terceiro: nenhum acesso ao Google ao abrir o site (o Google Fonts expõe o IP do visitante), duas origens a menos para resolver DNS e TLS, e o site continua igual se o Google Fonts cair. O laboratório não mede o custo de DNS e TLS da origem externa (a latência simulada é igual para todas as requisições), então esse ganho é esperado e não medido.
