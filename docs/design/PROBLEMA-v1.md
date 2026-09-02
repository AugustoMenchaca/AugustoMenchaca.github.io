# PROBLEMA-v1 — Gate A

**Fluxo:** redesign-secoes-lp-pessoal · trilha completa · Fase 1
**Entrada:** respostas do usuário em 2026-09-01 + `PROJECT-CONTEXT-v1.md`

---

## 1. Job to be done

> Quando um recrutador de programa de estágio abre meu link, preciso que em
> menos de um minuto ele conclua que eu tenho experiência real de projeto e de
> código — o suficiente para me passar para a etapa seguinte.

Declarado pelo usuário: o objetivo da página hoje é **candidatura a estágio**,
não captação de cliente nem portfólio acadêmico.

Contexto concreto e datado: Programa de Estágio Smarthis 2026, inscrições até
**11 de outubro de 2026**. Trilhas de Tecnologia (Dados, IA, Automação) e de
Consultoria e Projetos. A vaga valoriza explicitamente empresa júnior,
iniciação científica e projetos acadêmicos — os três que ele tem.

## 2. Frequência e impacto

**Frequência:** uma vez por candidatura, e o link também vai no CV e no
LinkedIn. É o artefato de maior alcance dele.

**Impacto se falhar:** alto e assimétrico. Um portfólio com molduras vazias não
é neutro — ele lê como **projeto abandonado**, e comunica menos que nenhum
link. O custo de errar aqui é maior que o de não ter página.

## 3. Os três incômodos declarados, e onde eles moram no código

O usuário marcou três, não um. Eles têm causas diferentes e não se resolvem com
a mesma intervenção.

### 3.1 "Rolagem longa demais"

Documento com ~8500px de altura renderizada. Para um leitor de 40 segundos,
tudo abaixo de ~3000px é território que ele provavelmente não alcança.

### 3.2 "Bloco grande para pouco conteúdo" — a causa medida

| pendência | contagem |
|---|---|
| Molduras `<figure class="ph">` sem asset | **9** |
| Assets distintos aguardando | **11** |
| Métricas marcadas como não verificadas | **3** |
| Links `href="#"` | **10** |

Alturas declaradas dessas molduras: `.ph` `clamp(190px, 20vw, 300px)` ·
`.ph-ciere-m` até 360px · `.ph-idf-det` até 236px · `.ph-h8-2` até 220px ·
`.ph-nip-2` até 250px.

Nove molduras entre 190 e 360px somam da ordem de **1900 a 2700px de altura
declarada** — algo entre **um quarto e um terço do documento reservado para
conteúdo que não existe**. (Números declarados no CSS, não medidos em
navegador; a medição entra na Fase 7.)

**É aqui que os dois primeiros incômodos se encontram:** a página é longa em
grande parte porque está guardando lugar para o que falta. Encolher a moldura
não resolve — moldura vazia menor continua sendo moldura vazia, e ainda por
cima com menos presença para justificar a própria existência.

### 3.3 "Card sem vida"

Hover de `translateY(-3px)` e nada mais (L147). Sem mudança de estado, borda,
sombra, revelação de conteúdo ou indicação de destino. Sete das nove seções não
têm nenhum elemento clicável. Um card menor e igualmente inerte permanece
inerte.

## 4. A hipótese estrutural encontrada na Fase 0

Sete das nove seções usam o mesmo padding vertical:
`clamp(34px, 4.4vw, 60px)`. Laje (`.slab`) e seção aberta (`.section-*`)
compartilham o valor. A distinção de hierarquia existe no código e **não chega
à tela**: o eixo vertical comunica repetição, não importância.

Consequência para o leitor de 40 segundos: nada indica onde olhar primeiro.
Numa página onde o IDF-BR deveria dominar, ele compete em pé de igualdade com
seções secundárias.

## 5. A solução proposta pelo usuário, questionada

O pedido foi "deixar os cards menores" e "redesign nessas partes de seção".
Três objeções, para serem decididas por ele e não por mim:

1. **Reduzir tamanho ataca o sintoma dominante pelo lado errado.** O maior
   consumidor de altura são as molduras vazias. Reduzir padding de seção
   economiza dezenas de pixels; resolver as molduras economiza milhares.
2. **Uniformidade pode ser o problema real, não tamanho.** Se sete seções
   encolherem igualmente, a página fica menor e continua sem hierarquia — e o
   incômodo "nada se destaca" retorna com outra roupa. Precedente desta mesma
   sessão: "muito agressivo" não era quantidade de cor; a medição mostrou a
   página mais clara e com menor croma que as três referências, e a causa era
   temperamento cromático e frequência de banda.
3. **"Sem vida" é problema de estado, não de escala.** Pertence à fase de
   interação (Fase 3), com precedente pesquisado — não a um ajuste de CSS.

## 6. Restrição bloqueante fora do design

`https://augustomenchaca.github.io/` serve hoje o **portfólio antigo** (7,6 KB,
`<title>Portifólio Augusto</title>`, último push do repo em outubro de 2024).
A landing page vive apenas em `wireframes/lp-final.html` e **nunca foi
publicada**.

Enquanto isso não mudar, todo este redesign tem impacto zero sobre o objetivo
declarado: o recrutador que clicar verá o site de 2024. **Publicar é
pré-requisito do valor, não etapa posterior.** Não é trabalho de design e não
consome gate, mas precisa entrar no plano da Fase 5.

## 7. Métrica de sucesso proposta

Verificável, para o Gate E poder reprovar:

| # | critério | hoje | alvo |
|---|---|---|---|
| 1 | Altura do documento a 1440px | ~8500px | **≤ 5500px** |
| 2 | Molduras vazias visíveis | 9 | **0** — com asset real ou com a moldura eliminada |
| 3 | Métricas não verificadas visíveis | 3 | **0** |
| 4 | Links mortos (`href="#"`) | 10 | **0** |
| 5 | Altura até a evidência de competência técnica | a medir | **≤ 1.5 viewport** a 1440px |
| 6 | Valores distintos de padding vertical de seção | 2 (60px e 80px) | **≥ 3 níveis**, com o IDF no topo |
| 7 | Seções com elemento interativo de destino | 2 de 9 | **≥ 5** |
| 8 | Lighthouse A11y / BP / SEO | 100/100/100 | **manter 100** |
| 9 | Página publicada no domínio | não | **sim** |

Critérios 1 e 6 juntos são a trava contra o erro óbvio: encolher tudo
igualmente satisfaz 1 e falha em 6.

## 8. Questões que seguem abertas para as fases seguintes

- Os 11 assets: quais existem e podem ser capturados (IDF-BR, DVO, Ciere e o
  site do Quantum são públicos), quais dependem de foto que ele precisa
  fornecer, e quais devem simplesmente deixar de ser previstos.
- As 3 métricas: verificar ou remover.
- Se a página deve encurtar por corte de conteúdo, por adensamento, ou por
  mudança de modelo de navegação (por exemplo, projeto que abre em vez de ficar
  aberto). **Essa é pergunta de Fase 3, com precedente pesquisado — não decido
  aqui.**

---

**FASE:** 1 — Problema
**ARTEFATO:** `docs/design/PROBLEMA-v1.md`
**REFERÊNCIAS CONSULTADAS:** nenhuma externa ainda (a Fase 2 é que coleta precedentes)
**TAREFAS CODEX EXECUTADAS:** nenhuma
**DECISÕES:** objetivo da página é candidatura a estágio; os "cards" em questão são os blocos de projeto inteiros e os cards de dado do IDF; três incômodos com causas distintas
**QUESTÕES ABERTAS:** as da seção 8
**STATUS:** AGUARDANDO APROVAÇÃO
