# PESQUISA-TIPOGRAFIA — o eixo que classifica 15/15

**Issue #36.** Depende da #17, que fechou com a amostra rotulada de 15 peças.

Este documento substitui por completo a versão anterior (reprovada na revisão do PR **#42**). Todos os números aqui apresentados foram extraídos exclusivamente de `docs/design/tipografia/medicoes.json`, gerado com o instrumento corrigido e executado em navegador com janela real (`--headed`). Nenhuma chave do protótipo apagado (`escala-proposta-*`) sobreviveu; o comportamento da proposta é aferido diretamente por injeção de CSS sobre a `wireframes/lp-final.html` real.

---

## 1. O que esta issue decide

O `REFERENCE-BOARD-v3` §12 submeteu dez variáveis formais a um teste com **15 peças rotuladas pelo cliente** (5 aprovadas e 10 rejeitadas). De todas as variáveis medidas — seis métricas de cor OKLCH, nós de mídia por 1000px, transições por 1000px, durações —, **apenas duas classificam os 15 julgamentos sem cometer um único erro**:

| variável | aprovados (n=5) | rejeitados (n=10) | corte (ponto médio) | margem |
|---|---|---|---|---|
| **maior título** | **102 – 320px** | **20 – 76px** | **≈ 89px** | **26px** |
| **razão display/corpo** | **6,00 – 20,00×** | **1,25 – 5,14×** | **≈ 5,57×** (≈ 5,6×) | **0,86×** |

A `wireframes/lp-final.html` original mede **46px** no maior título e razão **3,54×** (com workhorse medido de 13px), classificando-se inequivocamente do lado **rejeitado** nas duas variáveis.

O `REFERENCE-BOARD-v3.md` registra **3,29×** para a mesma página porque usa um workhorse de **14px**; os **3,54×** deste documento usam os **13px** medidos, portanto ambos os resultados estão corretos sob suas respectivas réguas.

Esta issue tem três encargos:
1. **Validar a sobrevivência dos cortes** após o conserto de três defeitos graves no instrumento de medição;
2. **Decidir formalmente entre dominância assimétrica e uniformidade**, calculando o custo dessa escolha em altura de página;
3. **Projetar e medir uma escala tipográfica de 5 degraus** que cruze os dois cortes classificadores no desktop, ancorando cada degrau em precedentes medidos e expondo com transparência o comportamento no viewport móvel.

---

## 2. O instrumento

As medições foram coletadas pelo script driver `docs/design/tipografia/medir.mjs`, que injeta a sonda `docs/design/tipografia/sonda-tipografia.mjs`.

### 2.1 Dependências e execução

O instrumento possui **zero dependências externas**: não utiliza Puppeteer, Selenium nem pacotes em `node_modules`. Comunica-se diretamente com o Google Chrome via protocolo CDP (*Chrome DevTools Protocol*) sobre o `WebSocket` nativo do Node.js (requer Node >= 22).

O comando oficial para repetir a rodada completa na íntegra é:

```bash
node docs/design/tipografia/medir.mjs --headed
```

A flag `--headed` (janela real visível) é um **requisito técnico de medição**, não conveniência visual. O driver recusa-se a mentir sobre isso: quando executado sem ela, imprime aviso em `stderr` e grava `modo: "headless"` e `rodadaOficial: false` no `_meta` do JSON. O `_meta.comando` registra a invocação realmente usada, não uma string fixa. Em modo headless, peças com animação de entrada e sequestro de rolagem (como o herói do `illoca.unseen.co`) permanecem com `opacity: 0` devido à ausência de compositor gráfico ativo, fazendo com que a sonda descarte o texto como invisível e derrube seu display de 111px para 77px. Com janela real e união temporal de quatro amostras consecutivas antes do scroll mais uma pós-scroll, o valor converge deterministicamente em 111px. O v3 havia reportado 111px unicamente porque não continha filtro de visibilidade — acertou o número pelo motivo errado.

### 2.2 Correções implementadas contra a versão reprovada

A revisão do PR #42 expôs que o instrumento anterior media elementos invisíveis e sofria de ruído geométrico. As seguintes correções estruturais foram aplicadas:

- **C1 — Visibilidade real auditável:** Validação rigorosa de `display: none`, `visibility: hidden/collapse`, `content-visibility: hidden`, ausência de caixas no DOM (`getClientRects().length === 0`), área nula e cadeia de opacidade efetiva herdada (`opacity <= 0.05`). Todo elemento excluído tem seu predicado arquivado no array `descartes`.
- **C2 — Filtro de recorte por maquinário (`fracaoContida`):** Distingue elementos fora da tela por rolagem daqueles recortados por recipientes estruturais (`overflow: hidden`, `clip-path`). A proporção da caixa do elemento preservada contra os ancestrais deve ser ≥ 0,25. Isso elimina falsos positivos como contadores numéricos clipados.
- **C3 — Resolução de `line-height: normal` e largura em `ch`:** Quando `line-height` é `normal`, a propriedade computada do CSS não retorna razão numérica. A sonda cria um span invisível offscreen (`Hxg`) com as métricas exatas da fonte para medir a caixa de linha real, registrando `lineHeightOrigem: "normal-medida"`. Onde declarado, anota `"declarada"`. A largura em `ch` é apurada medindo a largura física do glifo `'0'` na fonte computada.
- **C4 — Razão de telas baseada no viewport real:** O cálculo de telas (`document.documentElement.scrollHeight / window.innerHeight`) utiliza a altura real do viewport configurado (ex.: 900px no desktop, 844px no mobile), abandonando a divisão fixa por 900.
- **C5 — Serifa avaliada pela primeira família renderizada:** Evita falsos positivos em pilhas de fallback (como `"Oswald, Arial Narrow, sans-serif"`), avaliando apenas a família principal efetivamente renderizada.
- **C7 — Família renderizada verificada, não apenas declarada:** A versão anterior lia `getComputedStyle().fontFamily` e assumia que a primeira família da lista era a que pintava na tela. Se a webfont não carrega, o navegador cai para a próxima, e a conclusão sobre serifa passa a descrever uma fonte que ninguém viu. Agora o driver aguarda `document.fonts.ready` antes de amostrar, e a sonda testa cada candidata da pilha com `document.fonts.check()`, na ordem, adotando a primeira disponível. Cada degrau registra `familiaEfetiva`, `familiaVerificada`, `caiuParaFallback` e `familiaDeclarada`. **Nesta rodada, as 18 peças externas tiveram a família do maior título verificada e nenhuma caiu para fallback** — a conclusão de serifa da §5 descreve fonte comprovadamente carregada.
- **C6 — Varredura exaustiva de ALL CAPS:** Avalia `text-transform: uppercase` sobre qualquer nó com texto próprio renderizado visível, gerando contagem fidedigna na página inteira.

### 2.3 Teste de sanidade: comparativo contra o v3 e o `_legado`

O `medicoes.json` preserva em `_legado` os dados brutos sem os filtros C1 e C2, permitindo auditar o impacto das correções:

| peça | rótulo | corrigido: maior título | corrigido: razão | legado: maior título | legado: razão | divergiu? | motivo da divergência |
|---|---|---|---|---|---|---|---|
| `aelixa` | aprovado | 240px | 13,33× | 240px | 13,33× | não | idêntico ao v3 |
| `illoca` | aprovado | 111px | 9,25× | 111px | 9,25× | não | 111px sustentado via `--headed` e 4 amostras |
| `paulkalkbrenner` | aprovado | 150px | 12,50× | 150px | 10,71× | não no display | display de 150px mantido (falso positivo de 641px barrado por C2); workhorse ajustado de 14px para 12px por filtro de visibilidade |
| `lxlcreative` | aprovado | 102px | 6,00× | 102px | 6,00× | não | idêntico ao v3 |
| `white-desert` | aprovado | 320px | 20,00× | 320px | 20,00× | não | idêntico ao v3 |
| `charityshot` | rejeitado | 35px | 2,19× | 35px | 2,19× | não | idêntico ao v3 |
| `obspogon` | rejeitado | 32px | 2,00× | 32px | 2,00× | não | idêntico ao v3 |
| `paulfragara` | rejeitado | 38px | 2,00× | 38px | 2,00× | não | idêntico ao v3 |
| `lowmess` | rejeitado | 76px | 4,75× | 76px | 4,75× | não | teto dos rejeitados confirmado em 76px (wh 16px) |
| `simonbetton` | rejeitado | 20px | 1,25× | 20px | 1,25× | não | idêntico ao v3 |
| `nextfive` | rejeitado | 40px | 2,22× | 40px | 2,22× | não | idêntico ao v3 |
| `incomescrane` | rejeitado | **32px** | **2,00×** | **68px** | **4,25×** | **SIM** | **O cabeçalho de 68px tem `display: none` e nunca renderizou.** Corrigido para 32px por C1 |
| `shelomoh` | rejeitado | 60px | — | 60px | — | não | workhorse ausente (não devolvido pela sonda) |
| `thatmlopsguy` | rejeitado | 72px | 5,14× | 72px | 5,14× | não | idêntico ao v3 |
| `cassidoo` | rejeitado | 32px | 2,00× | 32px | 2,00× | não | idêntico ao v3 |
| `ciere` | cliente | 60px | 3,75× | 60px | 3,75× | não | idêntico ao v3 |
| `idf-br` | cliente | 35px | 2,19× | 35px | 2,19× | não | idêntico ao v3 |
| `dvo` | cliente | 60px | 3,33× | 60px | 3,33× | não | idêntico ao v3 |

Das 18 peças externas, **17 reproduzem exatamente o maior título do v3**. A única divergência em cabeçalho é `incomescrane.com`, cujo valor de 68px registrado no v3 era uma ilusão provocada pela falta de checagem de `display: none`. Sua retificação para 32px rebaixa a peça e consolida ainda mais a separação do classificador.

---

## 3. As medições

Todas as grandezas desta seção foram extraídas de `medicoes.json` (`referencias.<id>.data`). Em conformidade com as exigências da revisão, reportam-se a largura de coluna em `ch`, a razão de altura de linha e a origem da apuração (`declarada` no CSS ou `normal-medida` da caixa da fonte).

### 3.1 Peças aprovadas pelo cliente (n=5)

| peça | maior título | t0 largura | t0 line-height (origem) | workhorse | wh largura | wh line-height (origem) | razão display/corpo | carga maior (car./pal.) | ALL CAPS (nós) | serifa no display |
|---|---|---|---|---|---|---|---|---|---|---|
| `aelixa` | 240px | 6ch | 1,00 (declarada) | 18px | 83ch | 1,50 (declarada) | 13,33× | 7 / 1 | 19 | não |
| `illoca` | 111px | 14ch | 0,90 (declarada) | 12px | 31ch | 1,00 (declarada) | 9,25× | 121 / 22 | 2 | não |
| `paulkalkbrenner` | 150px | 13ch | 0,80 (declarada) | 12px | 19ch | 1,00 (declarada) | 12,50× | 51 / 8 | 183 | não |
| `lxlcreative` | 102px | 9ch | 0,90 (declarada) | 17px | 38ch | 1,44 (declarada) | 6,00× | 14 / 3 | 30 | **sim** |
| `white-desert` | 320px | 9ch | 0,90 (declarada) | 16px | 36ch | 1,25 (normal-medida) | 20,00× | 9 / 3 | 25 | não |

### 3.2 Peças rejeitadas pelo cliente — grupo de controle rotulado (n=10)

| peça | maior título | t0 largura | t0 line-height (origem) | workhorse | wh largura | wh line-height (origem) | razão display/corpo | carga maior (car./pal.) | ALL CAPS (nós) | serifa no display |
|---|---|---|---|---|---|---|---|---|---|---|
| `lowmess` | 76px | 20ch | 1,00 (declarada) | 16px | 41ch | 1,50 (declarada) | 4,75× | 43 / 9 | 0 | não |
| `thatmlopsguy` | 72px | 14ch | 1,10 (declarada) | 14px | 42ch | 1,54 (declarada) | 5,14× | 25 / 4 | 8 | não |
| `shelomoh` | 60px | 18ch | 1,00 (declarada) | — | — | — | — | 42 / 5 | 34 | não |
| `nextfive` | 40px | 28ch | 1,20 (declarada) | 18px | 67ch | 1,70 (declarada) | 2,22× | 14 / 2 | 0 | não |
| `paulfragara` | 38px | 16ch | 1,52 (declarada) | 19px | 148ch | 1,52 (declarada) | 2,00× | 7 / 1 | 0 | **sim** |
| `charityshot` | 35px | 14ch | 0,94 (declarada) | 16px | 28ch | 1,60 (declarada) | 2,19× | 12 / 2 | 6 | não |
| `incomescrane` | 32px | 41ch | 1,10 (declarada) | 16px | 82ch | 1,00 (declarada) | 2,00× | 25 / 4 | 4 | não |
| `obspogon` | 32px | 41ch | 1,50 (declarada) | 16px | 91ch | 1,50 (declarada) | 2,00× | 15 / 2 | 0 | não |
| `cassidoo` | 32px | 18ch | 1,31 (normal-medida) | 16px | 66ch | 1,60 (declarada) | 2,00× | 16 / 2 | 0 | não |
| `simonbetton` | 20px | 62ch | 1,63 (declarada) | 16px | 77ch | 1,63 (declarada) | 1,25× | 269 / 40 | 0 | não |

*Nota sobre `shelomoh.work`:* Não devolveu workhorse textual dominante (dado ausente na sonda, não zero). Participa da classificação de display (60px) e é excluído do denominador da razão.

### 3.3 Trabalhos anteriores do cliente — contexto de portfólio (n=3)

Peças produzidas pelo próprio cliente, medidas como contexto de repertório anterior. **Não entram no classificador de preferência**:

| peça | maior título | t0 largura | t0 line-height (origem) | workhorse | wh largura | wh line-height (origem) | razão | carga maior (car./pal.) | ALL CAPS (nós) | serifa no display |
|---|---|---|---|---|---|---|---|---|---|---|
| `ciere` | 60px | 20ch | 1,00 (declarada) | 16px | 52ch | 1,00 (declarada) | 3,75× | 89 / 13 | 13 | **sim** |
| `idf-br` | 35px | 32ch | 1,14 (normal-medida) | 16px | 34ch | 1,13 (normal-medida) | 2,19× | 6 / 1 | 0 | não |
| `dvo` | 60px | 4ch | 1,00 (declarada) | 18px | 19ch | 1,56 (declarada) | 3,33× | 3 / 1 | 0 | não |

### 3.4 Recálculo independente dos cortes

Operando estritamente sobre os vetores de `aprovado` e `rejeitado`:

1. **Maior Título:**
   - Menor valor entre os aprovados: **102px** (`lxlcreative`)
   - Maior valor entre os rejeitados: **76px** (`lowmess`)
   - Faixas: Aprovados **[102px – 320px]** contra Rejeitados **[20px – 76px]**.
   - As faixas **não se tocam**. A classificação 15/15 sobrevive sem exceção.
   - **Margem medida:** $102\text{px} - 76\text{px} = \mathbf{26\text{px}}$.
   - **Ponto médio (corte):** $(102 + 76) / 2 = \mathbf{89\text{px}}$.
   - *Status da margem:* A margem de **26px** manteve-se rigorosamente idêntica à do `REFERENCE-BOARD-v3`. A alegação da versão reprovada de que o teto dos rejeitados teria subido para 80px em `shelomoh.work` foi refutada: aquele valor era um `span` absoluto hover/bounce registrado fora de cabeçalho; em `h1-h6` a peça mede 60px e o teto dos rejeitados permanece fixado nos **76px** do `lowmess`.

2. **Razão Display/Workhorse:**
   - Menor valor entre os aprovados: **6,00×** (`lxlcreative`, 102px / 17px)
   - Maior valor entre os rejeitados: **5,14×** (`thatmlopsguy`, 72px / 14px)
   - Faixas: Aprovados **[6,00× – 20,00×]** contra Rejeitados **[1,25× – 5,14×]**.
   - As faixas **não se tocam**. A classificação sobrevive 14/14 (com `shelomoh` ausente).
   - **Margem medida:** $6,00 - 5,14 = \mathbf{0,86\times}$.
   - **Ponto médio (corte):** $(6,00 + 5,14) / 2 = \mathbf{5,57\times}$ (arredondado para **≈ 5,6×**).

---

## 4. Carga de texto no display

A primeira questão em aberto deixada pelo `REFERENCE-BOARD-v3` era: *display gigante abriga o conteúdo de um portfólio de engenharia ou exige frases telegráficas de marca?*

Os dados de `titulosDetalhes[0]` das aprovadas respondem com precisão:

| peça | maior título | caracteres | palavras | texto renderizado no display |
|---|---|---|---|---|
| `aelixa` | 240px | 7 | 1 | `"aelixa."` |
| `white-desert` | 320px | 9 | 3 | `"CPT – WFR"` |
| `lxlcreative` | 102px | 14 | 3 | `"Why lxl"`, `"Studios"` |
| `paulkalkbrenner` | 150px | 51 | 8 | `"Paul Kalkbrenner"`, `"Experience the Pulse of Electronic"` |
| `illoca` | **111px** | **121** | **22** | `"Design at the speed of thought Design at the speed of thought..."` (bloco de 9 linhas) |

**O contraexemplo crucial é o `illoca.unseen.co`.** Enquanto três peças adotam frases de marca curtíssimas (1 a 3 palavras), o `illoca` renderiza **22 palavras e 121 caracteres** em tipografia de 111px — e é uma das referências mais apreciadas pelo cliente. Em paralelo, `paulkalkbrenner` acomoda **51 caracteres e 8 palavras** a 150px.

A frase atual do herói da nossa LP possui **59 caracteres e 8 palavras** (*"Construo produtos digitais e lidero projetos de tecnologia."*). Essa carga é virtualmente idêntica à do `paulkalkbrenner` (51 car. / 8 pal.) e fica a menos da metade da densidade suportada pelo `illoca` (121 car. / 22 pal.).

Portanto, os dados **não exigem truncar a mensagem do herói para uma única palavra** para cruzar o corte. Display dominante acolhe frase expressiva, desde que tipografada com tracking fechado e altura de linha compacta (0,8 a 0,9).

---

## 5. Serifa

A contagem precisa do campo `titulosDetalhes[0].serifa` em `medicoes.json` corrige outro erro da versão anterior:

- **Nas 5 referências aprovadas:** Exatamente **1 de 5** utiliza serifa no maior título (`lxlcreative`, que renderiza *Scribo* a 102px). As outras quatro são puramente sans-serif: *Funnel Display* (`aelixa`, 240px), *F37 Analog* (`illoca`, 111px), *ABC Diatype Plus Variable* (`paulkalkbrenner`, 150px) e *Oswald* (`white-desert`, 320px). A versão reprovada erroneamente atribuiu serifa ao `white-desert`, cuja família é Oswald (sans-serif clássica condensada).
- **Em qualquer título da página:** Permanece **1 de 5** entre as aprovadas. Nenhuma outra peça aprovada introduz serifa em degraus secundários.
- **Nas 10 rejeitadas:** Apenas **1 de 10** exibe serifa no maior título (`paulfragara`, com *Times New Roman* a 38px). **Caso de fronteira declarado:** o `charityshot.co.uk` renderiza *Courier New* a 35px — monoespaçada com serifas de haste. A sonda classifica monoespaçada como categoria própria e não a conta como serifa; sob a convenção oposta, a contagem dos rejeitados seria 2 de 10. A escolha está no código (`serifNames` em `sonda-tipografia.mjs`) e não altera nenhuma conclusão, porque a peça é rejeitada nos dois casos.
- **Nos trabalhos anteriores do cliente:** **1 de 3** utiliza serifa (*Cormorant Garamond* a 60px no site da `ciere`).

**Veredito:** Serifa no display **não é traço distintivo nem requisito de aprovação**. O gosto do cliente aceita serifa, mas é majoritariamente sans-serif (80% da amostra aprovada). A manutenção das três famílias do projeto — **Instrument Sans**, **Inter** e **IBM Plex Mono** — está plenamente respaldada nos dados. A introdução de uma alternativa com serifa no herói permanece como hipótese conceitual reservada para o Gate C, sem autorização de implementação prematura.

---

## 6. A decisão: dominância assimétrica versus uniformidade

A divergência entre as hipóteses iniciais do projeto (H1–H6) e as referências aprovadas reflete duas filosofias tipográficas irreconciliáveis:

1. **Uniformidade:** Variação mínima de escala (razão display/corpo entre 1,25× e 5,14×; maior título entre 20px e 76px). Prioriza ritmo de leitura contínuo e contenção editorial. É a gramática de *Sara Soueidan*, *Brittany Chiang* e dos dez sites sorteados do grupo de controle.
2. **Dominância assimétrica:** Contraste vertical massivo entre um evento de entrada monumental (102px a 320px; razão 6,0× a 20,0×) e um corpo compacto e funcional (12px a 18px).

**Decisão formal: Adota-se dominância assimétrica.**

Esta não é uma preferência estética arbitrária: é o único caminho que cruza o classificador 15/15. O grupo de controle demonstrou que a uniformidade é a norma média dos sites pessoais (mediana de 39px); todavia, essa mesma norma foi **rejeitada em 10 de 10 casos** pelo cliente como "cara de site morto".

### O custo medido da decisão em altura de página

Dominância tipográfica consome espaço vertical. O impacto da escala proposta sobre a `wireframes/lp-final.html` a 1440x900 foi medido diretamente:

- **LP atual (Variante A):** 8.374px de altura (**9,3 telas**).
- **LP com escala proposta (Variante B):** 10.604px de altura (**11,8 telas**).
- **Acréscimo medido:** **+2.230px (+26,6%, ou ~27%)**, adicionando 2,5 viewports ao documento.

Esse custo entra em colisão direta com a meta formal fixada em `PROBLEMA-v1.md`, que estipula **≤ 1,5 viewport até a primeira prova de competência técnica**. Ao dilatar o herói e os cabeçalhos de seção, a dominância empurra as evidências de engenharia para baixo. Esse conflito é real, está registrado e terá de ser arbitrado na arquitetura de seções (issue #7).

---

## 7. A escala proposta

A escala mantém cinco degraus funcionais, reancorados nas medições diretas de `medicoes.json`. Nenhum degrau carece de evidência medida:

| degrau | tamanho 1440px | tamanho 390px | função na interface | referências medidas que sustentam o degrau |
|---|---|---|---|---|
| **1 — display** | **144px** | 48px | Evento monumental do herói | `paulkalkbrenner.net` mede **150px** no display (13ch, lh 0,80 declarada, 51 car. / 8 pal.). A mediana dos displays aprovados é **150px** (faixa 102–320px). A 390px, variante B mede **48px** (11ch, lh 0,90 declarada). |
| **2 — seção** | **72px** | 36px | Cabeçalhos de seção (`.slab-headline`) | `illoca.unseen.co` mede exatamente **72px** no degrau 3 (1 elem, 37 car., 4 pal., lh 1,00 declarada, 9ch); a mediana do 2º degrau das aprovadas é **77px** (256, 100, 77, 55, 36px). A 390px, **36px** reproduz o 2º degrau de `paulkalkbrenner.net` (**36px**, 1 elem, 82 car., lh 0,90 declarada, 26ch). |
| **3 — subseção** | **32px** | 24px | Títulos de cartões, métricas e blocos | `white-desert.com` mede **32px** (1 elem, 12 car., lh 1,20 declarada, 13ch); `aelixa.webflow.io` mede **32px** (12 elem, 352 car., lh 1,40 declarada, 13ch); `lxlcreative` mede **33px** (2 elem, 39 car., lh 0,99 declarada, 20ch). A 390px, **24px** está presente em `illoca` (**24px**, 4 elem, 70 car., lh 1,00 declarada, 33ch) e `aelixa` (**24px**, 3 elem, 48 car., lh 1,50 declarada, 11ch). |
| **4 — corpo** | **16px** | 16px | Texto corrido e workhorse geral | A mediana do workhorse das aprovadas é **16px** (18, 17, 16, 12, 12px); `white-desert.com` tem workhorse medido em exatamente **16px** (42 ocorrências, lh 1,25 normal-medida, 36ch). 7 das 10 peças rejeitadas também utilizam 16px como corpo. |
| **5 — rótulo** | **12px** | 12px | Badges, pílulas, termos técnicos e meta | `illoca.unseen.co` possui workhorse em **12px** (25 ocorrências, lh 1,00 declarada, 31ch) e títulos em **12px** (7 elem, 88 car., lh 1,50 declarada, 35ch); `paulkalkbrenner.net` possui workhorse em **12px** (24 ocorrências, lh 1,00 declarada, 19ch) e títulos em **11px** (3 elem, 18 car., lh 0,86 declarada, 23ch). |

### Restrições normativas estritas

- **Famílias tipográficas:** Preservadas sem alteração — *Instrument Sans*, *Inter* e *IBM Plex Mono*.
- **Veto de pesos extremos:** Pesos 800 e 900 permanecem **terminantemente proibidos**. Teto tipográfico fixado em peso 700 (*Bold*).
- **Redução auditada de ALL CAPS:** A sonda C6 quantificou a queda de caixa alta na página inteira:
  - A 1440px: queda de **96 para 23 elementos** (**-76,0%**); volume de caracteres reduzido de **1.513 para 467** (**-69,1%**).
  - A 390px: queda de **89 para 23 elementos** (**-74,2%**); volume de caracteres reduzido de **1.419 para 467** (**-67,1%**).
  - A versão anterior deste arquivo publicava bases de **55 elementos a 1440px** e **48 elementos a 390px**, subcontadas porque o revelador da página escondia 19 dos 25 blocos; os novos totais vêm de um passe com o revelador neutralizado.

---

## 8. Antes e depois — medido nas seis variantes da LP

O "depois" não é uma estimativa nem provém de arquivos de rascunho. Foi medido aplicando injeção de CSS em tempo de execução via CDP sobre a página real `wireframes/lp-final.html`. As seis células correspondem estritamente às seis chaves do objeto `variantesDaLP` em `medicoes.json`:

### 8.1 Resultados comparativos nos dois viewports

| variante / chave | viewport | maior título | razão (wh 13px) | ALL CAPS (nós) | altura | telas | maior texto na página (qualquer tag) | veredito do classificador |
|---|---|---|---|---|---|---|---|---|
| **`A-lp-atual@1440`** | 1440×900 | 46px | 3,54× | 96 | 8.374px | 9,3 | 232px (`div.footer-wordmark` @ 95,9%) | **REJEITADO** (46 < 89px; 3,54 < 5,57×) |
| **`B-so-escala@1440`** | 1440×900 | **144px** | **11,08×** | 23 | 10.604px | 11,8 | 232px (`div.footer-wordmark` @ 96,7%) | **APROVADO** (144 ≥ 89px; 11,08 ≥ 5,57×) |
| **`C-escala-evento-curto@1440`** | 1440×900 | **144px** | **11,08×** | 23 | 10.169px | 11,3 | 232px (`div.footer-wordmark` @ 96,6%) | **APROVADO** (144 ≥ 89px; 11,08 ≥ 5,57×) |
| **`A-lp-atual@390`** | 390×844 | 27px | 2,08× | 89 | 11.078px | 13,1 | 73px (`div.footer-wordmark` @ 98,1%) | **REJEITADO** (27 < 89px; 2,08 < 5,57×) |
| **`B-so-escala@390`** | 390×844 | **48px** | **3,69×** | 23 | 12.444px | 14,7 | 73px (`div.footer-wordmark` @ 98,3%) | **REJEITADO** (48 < 89px; 3,69 < 5,57×) |
| **`C-escala-evento-curto@390`** | 390×844 | **48px** | **3,69×** | 23 | 12.399px | 14,7 | 73px (`div.footer-wordmark` @ 98,3%) | **REJEITADO** (48 < 89px; 3,69 < 5,57×) |

### 8.2 Análise dos achados

1. **B e C são perfeitamente idênticas perante o classificador:** A troca de conteúdo do herói na variante C (substituir o texto do `h1` pelo nome curto em duas linhas e rebaixar a frase para subtítulo) **não contribui com um único pixel nem com qualquer fração de razão** para cruzar o corte (144px e 11,08× nas duas variantes a 1440px; 48px e 3,69× nas duas a 390px). O evento curto apenas diminui a altura em 435px no desktop e 45px no mobile. Como a alteração de copy não tem respaldo em necessidade métrica, trata-se de decisão puramente editorial, remetida ao Gate B/C.
2. **A 390px a escala tem efeito sensível, porém insuficiente:** A versão reprovada afirmava erroneamente que a escala não surtia "nenhum efeito" a 390px. Os dados corrigidos mostram que ela eleva o título de 27px para 48px (+21px, +77,8%), eleva a razão de 2,08× para 3,69× e reduz ALL CAPS de 89 para 23 nós. No entanto, **48px permanece muito abaixo do limiar de 89px e 3,69× fica abaixo de 5,57×**. O piso do `clamp(3rem, 10vw, 9rem)` crava em 48px porque `10vw` a 390px equivale a 39px. O viewport móvel continua classificado do lado rejeitado, constituindo trabalho em aberto.
3. **Ponto cego do rodapé:** Nas três variantes a 1440px, o maior texto físico renderizado na página inteira é o `<div class="footer-wordmark">` com **232px**, localizado a cerca de 96% de profundidade de rolagem.

### 8.3 O CSS injetado na íntegra

Copiado diretamente da constante `CSS_ESCALA` do script executável `docs/design/tipografia/medir.mjs`:

```css
body { font-size: 1rem; line-height: 1.6; }

.hero-headline { font-size: clamp(3rem, 10vw, 9rem) !important; line-height: .9 !important;
  letter-spacing: -.04em !important; text-transform: none !important; max-width: none !important; }

.slab-headline { font-size: clamp(2.25rem, 5vw, 4.5rem) !important; line-height: 1.05 !important;
  letter-spacing: -.02em !important; text-transform: none !important; }

.qml-quote p, .ciere-flow-wrap, .about-copy p { font-size: clamp(1.5rem, 2.22vw, 2rem) !important;
  line-height: 1.2 !important; text-transform: none !important; }

.rail-title, .data-card-head { font-size: 1.25rem !important; text-transform: none !important; }

.meta-label, .pill, .btn, .spec-head, .spec-term, .rail-badge, .qml-col-title, .h8-tag,
.h8-figcap, .footer-col h3, .footer-top { text-transform: none !important; letter-spacing: .02em !important; }

.hero-lede { font-size: 1rem !important; }
.hero-subheadline { font-weight: 500; font-size: 1.25rem; max-width: 40ch; margin-bottom: 20px; }
```

A variante C acrescentou a essa folha a execução do script `JS_EVENTO_CURTO`, que converte o conteúdo de `h1.hero-headline` em `AUGUSTO<br>MENCHACA` e insere a frase original logo abaixo como `<p class="i18n hero-subheadline">`.

*Lacuna de workhorse conhecida:* O workhorse textual dominante capturado na LP pela sonda é **13px** (elementos utilitários de rodapé e notas de cards com 9 ocorrências), enquanto o degrau 4 projeta 16px. A razão de 11,08× calculada com 13px (144 / 13) e a razão projetada de 9,00× com 16px (144 / 16) cruzam ambas com folga o corte de 5,57×.

---


### 8.4 O degrau móvel — cinco larguras, e o corte de cada uma (issue #45)

A §8.1 mediu dois viewports e concluiu que a escala ficava do lado rejeitado a
390px. Aquela conclusão usava o corte de **desktop**. A #45 mediu as 18
referências em 320, 390 e 768px — 54 medições, em
`docs/design/tipografia/medicoes-movel.json` — e o corte de desktop **não
sobrevive ao móvel**.

**A 390px, quatro das cinco peças aprovadas ficam abaixo de 89px:** `aelixa`
80px, `lxlcreative` 64px, `paulkalkbrenner` 60px e `illoca` 58px. Só
`white-desert`, com 200px, cruza. Perseguir 89px a 390px deixaria a LP mais
extrema que quatro quintos da própria referência do cliente.

#### O corte de cada largura, pelo método da §3.4

Pior aprovado contra melhor rejeitado, corte no ponto médio:

| largura | corte de título | corte de razão |
|---|---|---|
| 320 | **não existe** — a variável inverte: `illoca` (aprovada) 47px fica **abaixo** de `lowmess` (rejeitada) 48px | **3,73×** |
| 390 | **54px** (`illoca` 58 · `lowmess` 50) | **3,66×** (`paulkalkbrenner` 3,75 · `lowmess` 3,57) |
| 768 | **70,5px** (`lxlcreative` 80 · `lowmess` 61) | **4,39×** (`lxlcreative` 4,71 · `lowmess` 4,07) |
| 1024 e 1440 | 89px | 5,57× |

**A 320px, uma das duas variáveis classificadoras falha.** É a primeira vez neste
projeto que isso acontece. Ali só a razão separa, e por 0,08.

#### A escala revisada, e o resultado medido

O `PLANO-DEGRAU-MOVEL.md` propôs alterar apenas o primeiro degrau, mantendo o
segundo, o teto de 144px e as famílias:

```css
font-size:     clamp(3.0625rem, max(10vw, min(14vw, 3.375rem)), 9rem);
line-height:   clamp(.9em, 3.375rem, 1em);
overflow-wrap: anywhere;
```

A ponte `min(14vw, 3.375rem)` só atua **abaixo de 540px**, onde `10vw` ainda não
alcançou 54px — de 540 para cima a curva é exatamente a anterior. A entrelinha
abre para um corpo no móvel e reencontra `0.9em` em 600px.

Medido em `--headed`, 33/33, contra o corte de cada largura:

| largura | maior título | razão | corte de título | corte de razão |
|---|---|---|---|---|
| 320 | **49px** | **3,77×** | não existe | 3,73× · **cruza por 0,04** |
| 390 | **54px** | **4,15×** | 54px · **cruza com margem zero** | 3,66× |
| 768 | **77px** | **5,92×** | 70,5px | 4,39× |
| 1024 | **102px** | **7,85×** | 89px | 5,57× |
| 1440 | **144px** | **11,08×** | 89px | 5,57× |

As cinco larguras cruzam o corte da sua própria largura. O *workhorse* medido
continua **13px** nas quinze linhas, e a variante `A-lp-atual` não se move em
largura nenhuma — ela não recebe CSS injetado.

#### O que este resultado não autoriza concluir

- **A classificação no móvel é frágil, e são duas fragilidades distintas.** A
  primeira é a **separação da amostra**: a distância entre o pior aprovado e o
  melhor rejeitado em maior título cai de **26px** a 1440px (102 contra 76) para
  **8px** a 390px (58 contra 50), e a 320px fica **negativa** (47 contra 48). A
  segunda é a **folga da LP até o corte**: 0,04 em razão a 320px e **zero** em
  título a 390px. A amostra aprovada tem **N=5**, e as dez rejeitadas vêm de um
  único agregador (§9.2) — limite que pesa mais justamente onde a separação
  encolhe.
- **A 390px o título cai exatamente sobre o corte.** O corte é o ponto médio
  entre 58px (pior aprovada) e 50px (melhor rejeitada): a LP fica na fronteira,
  não dentro da faixa aprovada. Foi o alvo escolhido no gate, e é conformidade,
  não folga.
- **Nada foi conferido em navegador.** As previsões de quebra de linha do
  `PLANO-DEGRAU-MOVEL.md` — seis linhas a 320px, cinco a 390px — são previsão de
  composição, não observação. O `h1` está dentro de `.hero-mask` com
  `overflow: hidden`, e **ausência de rolagem horizontal não prova que o texto
  não foi cortado**. A crítica visual é da #21 e do Gate C.

#### Um efeito colateral não previsto, e medido

`overflow-wrap: anywhere` altera o cálculo de tamanho intrínseco, e com ele a
altura da página. Comparando a mesma variante antes e depois, a 1440px:

| variante @1440 | escala anterior | escala com o degrau móvel |
|---|---|---|
| `B-so-escala` | 10.604px | **10.863px** |
| `C-escala-evento-curto` | 10.169px | **10.299px** |

São **+259px** e **+130px** que não vêm do tamanho do tipo — o título a 1440px
continua 144px e a razão 11,08×. Vêm da propriedade de quebra.

O custo de altura da escala, discutido na §6, sobe de **+2.230px (+26,6%)** para
**+2.513px (+30,1%)** a 1440px — de 8.350px para 10.863px. Continua remetido à
**#7**, agora com o alvo de ≤5.500px do `PROBLEMA-v1` mais distante: o corte de
11 para 8 seções passa a ter que pagar **5.363px**.

---

## 9. Limites declarados e o que continua não medido

### 9.1 Limites operacionais do instrumento

- **Inviabilidade de medição headless para páginas animadas:** Ficou comprovado que o Chromium em modo headless desativa pipelines essenciais de renderização quando interage com bibliotecas de scroll e WebGL, congelando animações em opacidade zero (`illoca.unseen.co`). A execução em janela real (`--headed`) com janelas temporais espaçadas é mandatória para a reprodutibilidade dos dados.
- **Caixa alta exige o revelador neutralizado:** A varredura de 700px com pausa de 90ms revela 6 dos 25 blocos `[data-reveal]`; sem neutralizar, a contagem depende de qual bloco a corrida alcançou. O passe neutralizado mede o estado assentado da página, correspondente a “caixa alta na página inteira”. A origem é reproduzível com `SONDA_DIAG=1 node docs/design/tipografia/medir.mjs --so-local --headed`, que imprime `dataReveal` e `revealed` por amostra.
- **Altura não determinística da Variante A em desktop:** Duas execuções do comando gravado em `_meta.comando` devolveram **8.350px** e **8.374px** para `A-lp-atual@1440`. A oscilação não está resolvida nesta issue; por isso, o custo de altura publicado no §8 (**+2.230px, +26,6%**) carrega incerteza de **±24px** na base.
- **O wordmark de rodapé não substitui a hierarquia:** O `<div class="footer-wordmark">` de 232px da LP localiza-se a 95,9% de rolagem. O `aelixa.webflow.io` (aprovado) possui idêntica estrutura: um elemento de **240px a 97,8%** de profundidade. A presença de uma palavra gigante no encerramento da página aparece nos dois lados do espectro e **não separa aprovação de rejeição**. O que separa os grupos é a escala que governa os títulos de conteúdo ativo (102–320px vs 20–76px).

- **A altura da variante `A-lp-atual` oscila cerca de 25px entre rodadas, e a #45 não fechou a causa.** O desvio aparece em **uma largura por rodada**, não sempre na mesma: `A-lp-atual@1440` mediu 8.374px e 8.350px em rodadas diferentes, e `A-lp-atual@768` mediu 10.934px e 10.959px. Nas demais quatorze linhas as três rodadas conferidas batem exatamente. Duas hipóteses foram **refutadas com dado**, não descartadas por opinião: (1) *o revelador* — com `SONDA_DIAG=1` a 320px, `isRevealed` sobe de 0 para 5 entre as amostras e a altura permanece 11.644px nas cinco, logo o `transform` dos blocos `[data-reveal]` não move a altura; (2) *imagem preguiçosa* — a LP não tem elemento `<img>` algum, `rolagem.imgs` é **0**. Consequência a declarar em qualquer citação: toda altura publicada carrega incerteza de **±25px**, e diferenças menores que isso entre duas medições não são sinal.

### 9.2 O que continua estritamente não medido

- **Nenhum teste foi realizado com recrutadores:** O classificador de 89px e 5,57× reflete com rigor cirúrgico o **gosto subjetivo do cliente**. Em nenhum momento foi avaliado se um recrutador sênior de engenharia de software prefere páginas com display monumental de 144px em detrimento da contenção densa típica do gênero técnico.
- **Conflito de tempo até a prova técnica:** A dominância assimétrica estica a LP para 11,8 telas, postergando o alcance da primeira prova de competência técnica além do limite de 1,5 tela exigido pelo `PROBLEMA-v1.md`. Este conflito permanece sem resolução e requer decisão no Gate B.
- **Amostra de controle concentrada:** As 10 referências rejeitadas foram sorteadas de um único agregador (`personalsit.es`) e julgadas sem gradação intermediária.

---

## 10. Rodapé

**FASE:** 1 — Evidência (issue #36)
**ARTEFATO:** `docs/design/PESQUISA-TIPOGRAFIA.md`
**REFERÊNCIAS MEDIDAS:** 18 peças externas (5 aprovadas, 10 rejeitadas, 3 de clientes) e a `wireframes/lp-final.html` avaliada em 6 variantes (A, B e C a 1440px e 390px). Total de **24 medições completas**, executadas e registradas em `docs/design/tipografia/medicoes.json` em 2026-09-08T00:33:33.388Z.
**DECISÕES:**
1. Adoção da **dominância assimétrica** sobre a uniformidade, única rota que satisfaz os limiares de 89px e 5,57×;
2. Estabelecimento da escala de cinco degraus (**144 / 72 / 32 / 16 / 12px**), ancorando cada valor em precedentes aprovados de `medicoes.json`;
3. Serifa no display descartada como requisito obrigatório (apenas 1 de 5 aprovadas utiliza serifa no maior título);
4. Redução auditada de ALL CAPS na página inteira: elementos **-76,0% a 1440px** e **-74,2% a 390px**; caracteres **-69,1% a 1440px** e **-67,1% a 390px**;
5. Extinção definitiva de arquivos de protótipo de escala (`escala-proposta-*`), adotando-se a injeção em tempo de medição como metodologia de aferição.

**QUESTÕES ABERTAS:**
1. **O degrau móvel foi resolvido contra o corte de cada largura, não contra o de desktop (#45):** a escala revisada mede 49px a 320, 54px a 390 e 77px a 768, cruzando o corte da própria largura nas cinco medidas — §8.4. O que **permanece aberto** é a folga: a 390px o título cai exatamente sobre o corte, com margem zero, e a 320px a variável de título não separa aprovado de rejeitado. Nada foi conferido em navegador, e a máscara do herói tem `overflow: hidden`, então ausência de rolagem horizontal não prova ausência de texto cortado. Crítica visual é da #21 e do Gate C;
2. **Dilatação da página versus tempo até a prova técnica:** com o degrau móvel aplicado, o aumento a 1440px passa de 26,6% para **30,1%** (+2.513px), porque `overflow-wrap: anywhere` altera o cálculo de tamanho intrínseco — §8.4. A métrica de ≤ 1,5 tela do `PROBLEMA-v1.md` continua sem nunca ter sido medida, e o alvo de ≤5.500px fica a 5.363px de distância;
3. **Decisão sobre a cópia do herói (Variante C):** A redução para "AUGUSTO MENCHACA" no `h1` e o rebaixamento da frase técnica para subtítulo não afetam as métricas tipográficas. A decisão de hierarquia de mensagem deve ser arbitrada no Gate B/C;
4. **Governança do workhorse utilitário:** O CSS da escala governa elementos de corpo (`16px`), mas a página computa `13px` em textos secundários de rodapé.

**O QUE ESTE DOCUMENTO NÃO AUTORIZA:**
- Modificar qualquer código-fonte de produção ou aplicar o CSS injetado em `wireframes/lp-final.html` antes da abertura do Gate D;
- Tratar a variante C como obrigatória para satisfação tipográfica;
- Assumir que o corte de 89px atende às demandas ergonômicas de recrutadores técnicos;
- Tratar os 48px computados a 390px como escala móvel final e satisfatória;
- Recriar branches, arquivos de protótipo ou artefatos paralelos fora do fluxo estabelecido.
