# PROJECT-CONTEXT-v1

**Fluxo:** redesign-secoes-lp-pessoal · trilha completa · Fase 0
**Fonte:** lido de `wireframes/lp-final.html` (1454 linhas, 83 KB) em 2026-09-01.
Nada aqui é presumido; cada número tem linha de origem.

---

## 1. Stack

Arquivo único HTML com `<style>` e `<script>` inline. **Sem build, sem
dependência, sem framework.** Fontes via Google Fonts (Instrument Sans, Inter,
IBM Plex Mono). Bilíngue PT/EN por elementos irmãos duplicados
(`class="i18n" lang="pt|en"`) alternados por `display:none` sob `data-lang` no
`<html>`.

Consequência para este redesign: qualquer componente novo precisa ser HTML/CSS
puro, e **cada texto novo nasce duplicado** em duas línguas. Um componente de
biblioteca (React Bits, Aceternity etc.) não entra como pacote — só como
técnica reimplementada em CSS.

Outros arquivos do repositório: `index.html` (8 KB, portfólio antigo, **é o que
está publicado** em augustomenchaca.github.io), `Css/style.css`,
`wireframes/prototipo-c.html` (direção visual aprovada),
`wireframes/support.js`, `wireframes/BRIEF-lp-final.md`,
`wireframes/i18n-pt.md`.

## 2. Tokens (`:root`, L12–52)

| grupo | tokens |
|---|---|
| Superfícies | `--paper #F7F5EF` · `--stone #E8E3D9` · `--white #FFFFFF` · `--subtle #F1EEE6` |
| Neutros | `--charcoal #111213` · `--body #343739` · `--muted #626569` · `--light #8A8E93` · `--on-dark #9A9DA1` |
| Acentos | `--acid #E6F835` · `--oxblood #5A2232` · `--wine #F1E6E8` |
| Hut 8 (marca) | `--h8-black #0B0B0B` · `--h8-purple #6B0F9C` · `--h8-gray #8A8A8A` · `--h8-photo #2A2A28` |
| Hairlines | `--hair rgba(17,18,19,.13)` · `--hair-strong rgba(17,18,19,.28)` |
| Layout | `--container 1240px` · `--pad clamp(20px,4vw,48px)` · `--slab-radius 0` · `--slab-pad clamp(20px,3.6vw,44px)` |

Comentário no código em L21 registra que `--slab-inner` foi removido: "quatro
escuros colapsados em três". A escada de telas grandes (L626–641) altera
`--container` para 1400/1560/1720px e `font-size` da raiz para 16.8/18/19.5px.

## 3. Arquitetura de seções, na ordem do documento

| linha | id | classe | superfície |
|---|---|---|---|
| 759 | — | `rail-section` | paper |
| 876 | `work` | `work-intro` | paper |
| 884 | `idf` | `slab slab-dark` | charcoal |
| 1006 | `dvo` | `section-dvo` | stone |
| 1066 | `ciere` | `section-ciere` | paper |
| 1113 | `quantum` | `slab slab-stone` | stone |
| 1153 | `nip` | `section-nip` | paper |
| 1191 | `hut8` | `slab slab-hut8` | h8-black |
| 1239 | `research` | `section-research` | paper |
| 1269 | `about` | `slab slab-stone` | stone |
| 1297 | `contact` | `section-contact` | paper |

Duas famílias coexistem: **laje** (`.slab`, largura total, superfície própria) e
**seção aberta** (`.section-*`, sobre paper). O padding vertical é hoje
**idêntico nas duas**, o que apaga a diferença de hierarquia que a distinção
pretendia criar.

## 4. Densidade medida — padding vertical declarado

| seletor | linha | padding vertical |
|---|---|---|
| `.slab` | 173 | `clamp(34px, 4.4vw, 60px)` |
| `.section-dvo` | 275 | `clamp(34px, 4.4vw, 60px)` |
| `.section-ciere` | 291 | `clamp(34px, 4.4vw, 60px)` + **`margin-bottom: 18px`** |
| `.section-nip` | 309 | `clamp(34px, 4.4vw, 60px)` |
| `.section-research` | 334 | `clamp(34px, 4.4vw, 60px)` |
| `.section-contact` | 345 | `clamp(40px, 8vw, 80px)` |
| `.rail-section` | 129 | `padding-bottom: clamp(30px, 4vw, 46px)` |
| `.work-intro` | 192 | `padding-block: 40px 16px` |

**Sete das nove seções usam exatamente o mesmo valor.** Não há gradação de
importância no eixo vertical — o ritmo é uma repetição, não uma hierarquia.

Pendência conhecida: `margin-bottom: 18px` em `.section-ciere` era item 4 do
plano de cores aprovado ("→ 0, para não ler como painel autônomo") e **não foi
aplicado**. É a única seção com margem entre blocos.

## 5. Componentes com cara de card, com dimensões reais

| componente | linha | dimensão declarada |
|---|---|---|
| `.rail-item` | 142–146 | `flex: 0 0 186px` · `min-height: 82px` · `padding: 12px 14px` · `border-radius: 10px` · `border: 0` · fundo próprio |
| `.ph` (moldura de mídia) | 663–667 | `height: clamp(190px, 20vw, 300px)` · `aspect-ratio: auto` |
| `.ph-ciere-m` | 668 | `clamp(240px, 26vw, 360px)` — retrato |
| `.ph-idf-det` | 669 | `clamp(160px, 16vw, 236px)` |
| `.ph-h8-2` | 670 | `clamp(150px, 15vw, 220px)` |
| `.ph-nip-2` | 671 | `clamp(160px, 17vw, 250px)` |
| `.data-card svg` | 662 | `max-height: 190px` |
| `.rail-viewport` | 135 | `border-block: 1px solid var(--hair)` · `padding-block: 12px` |

O rail tem sete itens com sete fundos (`white`, `subtle`, `charcoal`, `acid`,
`oxblood`/wine) e duplicata para o marquee.

## 6. Padrões de interação existentes

| padrão | onde | detalhe |
|---|---|---|
| Marquee | `.rail-track` L136 | `rail-scroll 46s linear infinite`, `translateX(calc(-50% - 6px))` |
| Pausa | L137–138 | `:hover` e `:focus-within` pausam; classe `is-paused` com botão acessível |
| Desligamento | L429–430 | `max-width: 860px` **ou** `prefers-reduced-motion: reduce` |
| Reveal | `.will-reveal` L356 | `opacity 0 → 1`, `translateY(20px) → 0`, 0.6s, via `IntersectionObserver` (L1382); a classe é **adicionada por JS**, então sem JS o conteúdo aparece |
| Hero | L529–542 | `heroUp` .72s e `heroLine` .82s, `cubic-bezier(.22,.68,.36,1)`, atraso escalonado por `--d`, só sob `prefers-reduced-motion: no-preference` |
| Hover de elevação | L147 | `a.rail-item:hover { translateY(-3px) }` — **só em card que é link** |
| Hover de botão | L107 | `.btn:hover { translateY(-2px) }` |
| Inversão | L463–465, 594 | `.live-link` e `.footer-top` trocam fundo/cor |

**Leitura:** o movimento da página está concentrado na entrada (reveal, hero) e
no rail. Os cards, individualmente, respondem ao ponteiro com **3px de
elevação e nada mais** — não há mudança de estado, de conteúdo revelado, de
borda, de sombra ou de foco. Pela regra 10 da skill, é o ponto mais fraco.

## 7. Restrições herdadas que este redesign não pode violar

Do briefing original do usuário e do plano de cores aprovado:

- Lei de contraste: `--acid` **nunca** como texto sobre paper/stone/white (~1.1:1).
- Orçamento de ácido: ≤ 8 instâncias, distribuídas, só para ação/categoria/dado ativo.
- Oxblood em 5–10% do sistema visual; **não** recolorir a página de vinho.
- Hut 8 segue o manual de marca: `#0B0B0B`, `#6B0F9C`, foto real, zero ácido, corte duro.
- **Não recolorir dado científico**, screenshot, foto, mapa ou asset real de projeto.
- Nada de métrica, data, autoria ou publicação inventada.
- Rail preserva: sete itens, ordem, categorias, duplicata, 46s, pausa acessível, reduced-motion.
- Escada de telas grandes preservada; `.slab` sem raio e sem margem entre seções.
- Fontes: Instrument Sans / Inter / IBM Plex Mono. Evitar pesos 800/900.

## 8. Estado de qualidade atual

Lighthouse 100/100/100 em Acessibilidade, Best Practices e SEO. Geometria limpa
em 15 larguras de 320 a 3440px. Documento ~8500px de altura renderizada.

## 9. Questões abertas que a Fase 1 precisa fechar

1. **Quais cards** são "os cards do portfólio"? Há quatro candidatos com
   dimensões diferentes: `.rail-item` (186×82), `.ph` (190–300px de altura),
   `.data-card`, `.spec` do DVO.
2. **Quais seções** são "essas partes de secção"?
3. Menor é o objetivo ou o remédio? A hipótese a testar é que o incômodo seja
   **uniformidade** (sete seções com o mesmo padding), não tamanho absoluto.
4. Qual é o job to be done da página hoje: candidatura a estágio? cliente para
   a Hut 8? portfólio de pesquisa? Isso muda o que precisa dominar a tela.

---

**FASE:** 0 — Inteligência do projeto
**ARTEFATO:** `docs/design/PROJECT-CONTEXT-v1.md`
**REFERÊNCIAS CONSULTADAS:** nenhuma externa (fase de leitura do repositório)
**TAREFAS CODEX EXECUTADAS:** nenhuma
**DECISÕES:** trilha completa; estado de gates criado em `.claude/nova-ferramenta-state.json` com tudo em falso
**QUESTÕES ABERTAS:** as quatro da seção 9
