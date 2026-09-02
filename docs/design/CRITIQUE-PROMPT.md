Você é crítico adversarial de design. Responda em texto corrido, direto, sem
preâmbulo e sem elogio. Não escreva código e não altere arquivo nenhum.

Leia, neste repositório:
- `docs/design/CRITIQUE-BRIEF.md` — o briefing completo do problema
- `docs/design/REFERENCE-BOARD-v2.md` — a medição que derrubou a hipótese de cor
- `docs/design/BREADBOARDS-v1.md` e `docs/design/BREADBOARDS-v2.md` — as seis propostas reprovadas
- `wireframes/lp-final.html` — a página atual, sobretudo o bloco `<style>`

Contexto curto: o cliente reprovou seis propostas dizendo "está dando cara de
site morto". Eu medi e descobri que cor não é a variável — a referência que ele
chama de viva (aelixa.webflow.io) tem 0,4% de área cromática, distill.pub 3,1%,
jalammar.github.io 0%, paco.me 0%. Já os três sites de projeto DELE têm 18,4%,
22,8% e 20,1%. Identifiquei duas rotas de vitalidade: densidade de mídia
(distill 32 imagens e zero animação) e densidade de movimento (paco.me zero
imagem, 20 keyframes, 13 elementos em transição, todos a 0,24s). As seis
propostas ficaram sem mídia e sem movimento.

Responda estas seis perguntas, nesta ordem:

1. A hipótese "morto = sem mídia e sem movimento, não = monocromático" resiste?
   Se não, aponte o furo com número.

2. A direção que eu quero atacada: cada seção de projeto passa a carregar a
   paleta real do próprio projeto — navy do IDF-BR, creme e dourado da Ciere,
   azul de oficina do DVO. Qual o risco concreto de virar colcha de retalhos com
   quatro paletas competindo, e qual mecanismo você usaria para conter? Cite
   mecanismo, não adjetivo.

3. Três projetos têm screenshot real capturado. Quantum ML, Hut 8 e NIP não têm
   nada visual, e o cliente proibiu gerar pessoas e usar stock. Isso cria uma
   página de duas castas. Como resolver sem inventar imagem?

4. O cliente exigiu que Hut 8 e NIP saiam da seção de projetos, porque "são
   vivências, mais que projetos". Que tratamento você daria a vivência, distinto
   de projeto, sem fotografia? Seja concreto sobre estrutura e sobre conteúdo.

5. Movimento: a LP hoje tem entrada a 0,6s e nada mais. O paco.me usa 0,24s
   como constante única, com fade + translateY(10px) e scale(0.95→1) em
   superfície interativa. O que exatamente eu devo animar nesta página, em qual
   gatilho, respeitando `prefers-reduced-motion` e sem JavaScript? Liste as
   propriedades CSS.

6. O que você acha que eu vou errar na próxima tentativa.

Restrições que qualquer proposta sua precisa respeitar: arquivo único HTML/CSS,
sem build, sem framework, sem dependência npm, funcionando sem JavaScript,
Lighthouse 100 em acessibilidade, `--acid #E6F835` nunca como texto sobre
superfície clara, nada de métrica ou autoria inventada, e os papéis exatos do
cliente (em DVO ele coordenou e não desenvolveu; na Ciere não foi design lead;
Quantum ML não foi publicado; no NIP não há IA em produção).
