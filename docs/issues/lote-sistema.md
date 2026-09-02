===ISSUE=== pesquisa: fechar a lacuna metodologica da amostra de referencias ||| pesquisa
A crítica independente apontou um furo que eu aceito: **das seis referências que embasaram o diagnóstico, só o Aelixa veio do repertório do cliente.** distill.pub, paco.me, arXiv, Brittany Chiang, Sara Soueidan e Folha de S.Paulo fui eu que escolhi. A correlação medida pode ser artefato da minha seleção.

**Fazer**
- Pedir ao cliente 3 a 5 referências ao vivo e navegáveis, escolhidas por ele.
- Medir cada uma com o mesmo instrumento: área cromática, contagem de `<img>`/`<svg>`/`<video>`, keyframes, elementos em transição — todos por 1000px, para serem comparáveis.
- Confirmar ou derrubar a conclusão atual de que existem duas rotas de vitalidade: densidade de mídia e densidade de movimento.

**Registro do que já foi medido**
`docs/design/REFERENCE-BOARD-v2.md`

**Aceite**
Cada conclusão de vitalidade tem pelo menos uma referência escolhida pelo cliente como fonte.

===ISSUE=== conteudo: os 4 assets que so o Augusto pode fornecer ||| conteudo,bloqueado
Sete das onze categorias de asset foram resolvidas nesta sessão, custo zero, por captura dos sites no ar e extração dos notebooks. Estas quatro não têm como eu resolver.

**Faltam**
- Foto de pesquisa ou equipe do NIP
- Foto de campo ou evento do NIP
- Foto da equipe da Hut 8
- Foto de evento da Hut 8
- Retrato do Augusto para a seção Sobre

**Restrição do cliente, que segue valendo**
Não gerar pessoas, não usar stock, não inventar foto.

**Nota que reduz a urgência**
Hut 8 e NIP viraram **vivências**, e a especificação dessa seção proíbe mockup e foto de produto. Então talvez essas quatro fotos simplesmente não sejam necessárias. Decidir antes de cobrar.

===ISSUE=== conteudo: verificar ou remover as 3 metricas nao verificadas ||| conteudo
A página tem 3 métricas marcadas como `[ MÉTRICA A VERIFICAR ]` / `[ VERIFIED METRIC REQUIRED ]`, cada uma nas duas línguas.

**Regra do cliente**
Não inventar métrica, data, autoria, publicação, tecnologia, resultado de cliente, tamanho de time ou número de performance.

**Fazer**
Para cada uma: confirmar com fonte, ou remover. Não existe terceira opção — número sem fonte sai.

**Aceite**
Zero ocorrência de marcador de métrica na página.

===ISSUE=== design: remover as 9 molduras vazias ||| design
A página tem 9 elementos `<figure class="ph">` com rótulo tracejado do asset que falta, reservando entre 190 e 360px de altura cada — na ordem de 1900 a 2700px de altura total, confirmado por dois métodos independentes de medição.

**Veredito da crítica independente**
"Remova todas as molduras vazias: ausência declarada ainda parece ausência."

Moldura tracejada escrito o que falta não é honestidade — é o buraco assinado, e é a causa medida do bloco grande com pouco conteúdo.

**Fazer**
- Onde existe asset real, entra o asset.
- Onde não existe, **o bloco não reserva espaço**: o layout fecha.

**Aceite**
Nenhuma moldura sem conteúdo real na página.

===ISSUE=== movimento: sistema de movimento e constante de duracao ||| movimento
Medição comparativa: paco.me tem 9,1 elementos em transição e 14 keyframes por 1000px. A LP tem 1,2 e 0,59 — **7,7 e 24 vezes menos**. E as entradas da LP levam 0,6s, 0,72s e 0,82s, contra a constante única de 0,24s do paco.me.

**Especificação fechada, vinda da crítica**

| gatilho | anima | como |
|---|---|---|
| carga | só nome, proposição e CTA do hero | `opacity` + `translateY(10px)`, 0,24s |
| evidência entrando no viewport | o campo de evidência | `animation-timeline: view()` dentro de `@supports` |
| `:hover` e `:focus-visible` | elevação pequena | `transform` |
| `:active` | redução breve de escala | `transform` |
| `<details>` abrindo | o painel | `opacity` + `scale(0.95 → 1)` |
| links | — | só `color`, `background-color`, `border-color`, `transform` |

**Proibido**
`transition: all`. Transicionar altura, largura ou posicionamento. Revelar as oito seções em cascata.

**`prefers-reduced-motion: reduce`**
Zerar animações, fixar `opacity: 1`, `transform: none`, `stroke-dashoffset` no estado final, e `scroll-behavior: auto`.

===ISSUE=== movimento: curva do IDF que se desenha, sem JavaScript ||| movimento
O IDF-BR trata de curvas de intensidade, duração e frequência de chuva. Uma curva que se desenha é tematicamente exata, e sai de graça em CSS.

**Técnica**
`<path>` SVG inline com `stroke-dasharray` e `stroke-dashoffset` animados por `@keyframes`, disparados por `animation-timeline: view()`. Zero JavaScript.

**Fazer**
- Usar dado real das curvas IDF. **Se o valor não existir, não desenhar o gráfico** — a crítica foi explícita sobre não fabricar mídia com gráfico sem número.
- Traçado final visível como fallback quando `animation-timeline` não é suportado.
- Estado final imediato sob `prefers-reduced-motion`.

===ISSUE=== i18n: PT/EN das secoes novas ||| i18n
A página é bilíngue por elementos irmãos duplicados com `class="i18n" lang="pt|en"`, alternados por `display:none` sob `data-lang` no `<html>`.

**Cuidado registrado**
Numa rodada anterior, 9 strings foram perdidas na tradução automatizada — todas as que continham `&`, por causa do `&amp;`. Conferir par por par contra o HTML.

**Nunca traduzir**
UFPel, Hut 8, NIP, Núcleo Integrado de Previsão, IDF-BR, DVO, Ciere da Rosa, HydroUAI, UFMG, Breast Cancer Wisconsin, Qiskit, `ad_hoc_data`.

**Aceite**
Toda string nova tem par nas duas línguas, e a troca de idioma não deixa nada vazio.

===ISSUE=== qa: responsivo de 320 a 3440px ||| qa
A geometria atual está limpa em 15 larguras. Não pode regredir com a nova arquitetura.

**Larguras a conferir**
3440, 2560, 2200, 1920, 1800, 1600, 1500, 1440, 1280, 1024, 900, 768, 560, 390, 320.

**Armadilhas já conhecidas neste projeto**
- Chrome headless no Windows trava a janela em ~497px: usar `emulate --viewport LxAxD` antes de medir.
- `max-height` junto de `aspect-ratio` encolhe a largura em vez da altura.
- `style` inline vence media query.
- Irmãos `i18n` escondidos contam como coluna de largura zero em auditoria de grade.
- Recarregar ignorando cache antes de medir.

**Aceite**
Zero overflow, zero desalinhamento e zero colisão de foto nas 15 larguras.

===ISSUE=== qa: auditoria de precisao de conteudo ||| qa,conteudo
O material tem limites de papel que não podem ser violados, e já foram violados antes.

**Verificar, item por item**
- **DVO**: ele coordenou, **não desenvolveu** frontend nem backend.
- **Ciere**: ele **não foi design lead**; havia liderança de design própria.
- **Quantum ML**: projeto de disciplina, **não publicado**.
- **NIP**: **não** existe IA de previsão de enchentes em produção; termina em pesquisa em andamento.
- **IDF-BR**: o time científico definiu dados, equações e resultados; dele é a camada de software.

**Proibido**
Data, métrica, publicação, autoria, tecnologia, resultado de cliente, tamanho de time ou número de performance sem fonte.

**Aceite**
Cada afirmação da página tem origem rastreável, e nenhuma infla papel.
