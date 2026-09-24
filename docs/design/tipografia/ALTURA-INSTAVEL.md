# Oscilação de Altura (Issue #52)

Este documento registra a investigação e os experimentos realizados para identificar a causa da variação de ~25px na altura da variante `A-lp-atual` (ex: 8374px vs 8350px em 1440px).

## Hipóteses Testadas

### 1. Animação em curso (Marquee de 46s)
- **Experimento:** O script de medição foi executado isoladamente para a variante A com a flag `SONDA_DIAG_PAUSAR_ANIMACOES=1` injetada, que pausa via CDP (`document.getAnimations().forEach(a => a.pause())`) antes das amostras.
- **Resultado:** A altura persistiu fixada em 8.374px em todas as 5 amostras, não reduzindo para o esperado 8.350px.
- **Veredito:** **REFUTADA**. As animações de CSS `transform` não afetam o cálculo de `scrollHeight` da página neste contexto.

### 2. `document.fonts.ready` resolvendo antes do layout assentar
- **Experimento:** Análise dos logs de diagnóstico (DIAG) das 5 amostras (`a0` até `a4`) coletadas com 250ms de intervalo, cobrindo >1.5s após a resolução do `document.fonts.ready`.
- **Resultado:** A altura registrada em `a0` manteve-se **idêntica** até `a4` (ex: 8374px) dentro de uma mesma rodada. O layout não "assenta" ou encolhe progressivamente após o início das medições. Além disso, a contagem de fontes carregadas (33) é consistente.
- **Veredito:** **REFUTADA**. A renderização da tipografia já está perfeitamente estável e não sofre layout shift após a promise de fontes resolver.

### 3. Arredondamento de subpixel acumulado
- **Experimento:** Injeção de diagnóstico comparando `document.documentElement.scrollHeight` (inteiro) com `document.body.getBoundingClientRect().height` (float preciso) para verificar divergências cumulativas ao longo dos ~8.400px.
- **Resultado:** Na rodada que marcou 8374, o `bodyRect` foi de 8373.844. Na rodada que marcou 8350, o `bodyRect` foi de 8349.531. A discrepância entre as duas métricas é de <1px. O "salto" de ~24.3px (que equivale exatamente à altura de uma linha `1.6 * 15.19px`) acontece integralmente nos limites flutuantes reais do layout, e não por falha de arredondamento.
- **Veredito:** **REFUTADA**.

### 4. Barra de rolagem e variação da largura útil
- **Experimento:** Inspeção da propriedade `clientWidth` do `document.documentElement` coletada durante os saltos de altura para verificar se uma barra física de scroll (17px no Windows) encolhia a área útil.
- **Resultado:** O `clientWidth` medido foi estritamente **1440** tanto nas rodadas que deram 8374px quanto nas que deram 8350px. Como o `Emulation.setDeviceMetricsOverride` atua com base no viewport virtual (comportando-se de forma equivalente a scrollbars do tipo overlay), a largura da página nunca é comprimida pelo scrollbar do Chrome Headed/Headless.
- **Veredito:** **REFUTADA**.

---

## Conclusão: A Verdadeira Causa (Vazamento de Estado via LocalStorage)

Nenhuma das hipóteses originais era a responsável. O problema é um **vazamento de estado persistente entre medições devido ao `localStorage`**.

A anomalia acontece por causa da execução sequencial do script `medir.mjs`:
1. Durante uma rodada completa, o script reutiliza a **mesma pasta de perfil do Chrome** (`--user-data-dir`) para iterar sobre todos os viewports e variantes.
2. Quando a variante `C-escala-evento-curto` é testada, o seu injetor JavaScript (`JS_EVENTO_CURTO`) simula um clique no botão de idioma (`.lang-btn`).
3. Esse clique dispara a lógica da página (`lp-final.html`) que **salva o novo idioma no `localStorage('agy-lang')`**.
4. Quando a próxima iteração começa (ex: `A-lp-atual` no viewport subsequente), o cache de rede é limpo, mas o **`localStorage` não é limpo**. A página inicializa, lê o `localStorage` vazado da variante anterior e altera os elementos com `display: none`.
5. Os textos em Português (`pt`) são ligeiramente mais longos e provocam a quebra de exatamente **uma linha adicional** dentro da tag `<main>` em relação ao texto em Inglês (`en`). Isso resulta numa diferença cirúrgica de ~24.3px na altura em viewports específicos, causando a instabilidade não-determinística nas métricas observadas dependendo da ordem de testes.

Para estabilizar as medições, o perfil do Chrome deve ter sua persistência isolada por variante, ou o `localStorage.clear()` deve ser chamado antes do carregamento de cada amostra.
