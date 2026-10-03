# Movimento das Janelas (Issues #94 e #96)

## Mapeamento de Ganchos e Regras (View Timeline)

### Seções Iniciais (#94: IDF, DVO, Ciere)

| Gancho | Regra (CSS `@keyframes`) | Faixa de Rolagem (`animation-range`) | Duração / Timing |
| :--- | :--- | :--- | :--- |
| `.rise` (h2) | `rise` | `entry 0% entry 90%` | `linear both` |
| `.win-rise` | `win-rise` | `entry 0% cover 38%` | `linear both` |
| `.parallax` | `parallax` | `cover 0% cover 100%` | `linear both` |
| `.live-dot` | `live` | Infinito (animação comum) | `2.4s ease-out infinite` |
| `.nums > *` | `rise` em cascata | `entry (0,8,16,24)% entry (70,78,86,94)%` | `linear both` |
| `.pipe .step` | `step` em passos | `cover 4-10%`, ..., `28-34%` | `linear both` |
| `.track::before` | `draw` (linha) | `cover 18% cover 58%` | `linear both` |
| `.track li` | `ink` (+ `wipe` no 5º) | `cover 18-23%`, ..., `53-58%` | `linear both` |
| `.clist li` | `slide` (+ `wipe` no 6º) | `entry 30% cover 30%`, ... | `linear both` |

### Seções Restantes (#96: Quantum, Vivências, Sobre, Contato, Rodapé)

| Área / Gancho | Regra (CSS `@keyframes`) | Faixa de Rolagem (`animation-range`) | Duração / Timing |
| :--- | :--- | :--- | :--- |
| `#quantum h2.rise` | `rise` | `entry 0% entry 90%` | `linear both` |
| `.qml-cols > *` | `rise` em cascata (3 colunas) | `entry (0,8,16)% entry (70,78,86)%` | `linear both` |
| `.qml-formula.pipe .step` | `step` em passos (5 etapas) | `cover 4-10%`, ..., `28-34%` | `linear both` |
| `.qml-formula-caption` | `slide` | `entry 10% entry 80%` | `linear both` |
| `#vivencias h3.rise` | `rise` (Hut 8, NIP) | `entry 0% entry 90%` | `linear both` |
| `.viv-col` | `slide` em cascata via `--viv-text` | `entry 30% cover 30%`, ..., `50-36%` | `linear both` |
| `.viv-photo--back.parallax-lento` | `parallax-lento` (±40px desktop, ±16px mobile) | `cover 0% cover 100%` | `linear both` |
| `.viv-photo--front.parallax` | `parallax` (±80px desktop, ±30px mobile) | `cover 0% cover 100%` | `linear both` |
| `.viv-divider.draw` | `draw-x` (`scaleX` horizontal) | `entry 10% cover 30%` | `linear both` |
| `.viv-period` | `ink` (deslocamento + cor) | `entry 20% cover 30%` | `linear both` |
| `#about h2.rise` | `rise` | `entry 0% entry 90%` | `linear both` |
| `.about-photo.win-rise` | `win-rise` | `entry 0% cover 38%` | `linear both` |
| `.about-copy p` | `rise` em cascata (4 pares PT/EN) | `entry (0,8,16,24)% entry (70,78,86,94)%` | `linear both` |
| `.contact-panel.win-rise` | `win-rise` | `entry 0% cover 38%` | `linear both` |
| `#contact h2.rise` | `rise` | `entry 0% entry 90%` | `linear both` |
| `.contact-links .btn-b3b` | `slide` em cascata via `--contact-links` | `entry 20% cover 25%`, ..., `35-40%` | `linear both` |
| `.footer-grid > *` | `slide-curto` em cascata (10px) | `entry 5% entry 60%`, ..., `20-90%` | `linear both` |

> *Duração:* Todas as animações associadas a scroll usam `linear both`. O ponto `.live-dot` dura 2.4s (ease-out).

## Como Testar

1. **Repouso absoluto:** Inspecione os nós finais. Sem layout shifts (opacity e visibility não são alterados, apenas transformações no carregamento ou scroll).
2. **Reduced Motion:** Ative via `Emulation.setEmulatedMedia` (DevTools). Nenhuma animação rodará, texto original será mantido.
3. **Contagem:** Desça até o IDF-BR. O valor deve animar até o final em ~1.6s e reverter exatamente à string textual idêntica configurada no HTML.
4. **Fallback:** Em um navegador sem suporte a `view()` (ex: Firefox), os elementos devem entrar na tela usando as transições fallback de 600ms configuradas em `janelas-movimento.js`.
5. **Vídeo e Memória:** Role lentamente. O script `device-media.js` deve carregar vídeos apenas próximos da view e limpar os buffers caso a janela afaste, minimizando o impacto.
