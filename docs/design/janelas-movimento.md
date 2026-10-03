# Movimento das Janelas (Issue #94)

## Mapeamento de Ganchos e Regras (View Timeline)

| Gancho | Regra (CSS `@keyframes`) | Faixa de Rolagem (`animation-range`) |
| :--- | :--- | :--- |
| `.rise` (h2) | `rise` | `entry 0% entry 90%` |
| `.win-rise` | `win-rise` | `entry 0% cover 38%` |
| `.parallax` | `parallax` | `cover 0% cover 100%` |
| `.live-dot` | `live` | Infinito (animação comum) |
| `.nums > *` | `rise` em cascata | `entry (0,8,16,24)% entry (70,78,86,94)%` |
| `.pipe .step` | `step` em passos | `cover 4-10%`, ..., `28-34%` |
| `.track::before` | `draw` (linha) | `cover 18% cover 58%` |
| `.track li` | `ink` (+ `wipe` no 5º) | `cover 18-23%`, ..., `53-58%` |
| `.clist li` | `slide` (+ `wipe` no 6º) | `entry 30% cover 30%`, ... |

> *Duração:* Todas as animações associadas a scroll usam `linear both`. O ponto `.live-dot` dura 2.4s (ease-out).

## Como Testar

1. **Repouso absoluto:** Inspecione os nós finais. Sem layout shifts (opacity e visibility não são alterados, apenas transformações no carregamento ou scroll).
2. **Reduced Motion:** Ative via `Emulation.setEmulatedMedia` (DevTools). Nenhuma animação rodará, texto original será mantido.
3. **Contagem:** Desça até o IDF-BR. O valor deve animar até o final em ~1.6s e reverter exatamente à string textual idêntica configurada no HTML.
4. **Fallback:** Em um navegador sem suporte a `view()` (ex: Firefox), os elementos devem entrar na tela usando as transições fallback de 600ms configuradas em `janelas-movimento.js`.
5. **Vídeo e Memória:** Role lentamente. O script `device-media.js` deve carregar vídeos apenas próximos da view e limpar os buffers caso a janela afaste, minimizando o impacto.
