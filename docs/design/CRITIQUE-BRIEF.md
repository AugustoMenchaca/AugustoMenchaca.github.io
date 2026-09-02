# BRIEFING PARA A CÂMARA DE CRÍTICA

Você é um crítico adversarial. Sua tarefa é **atacar** o trabalho descrito
abaixo, não elogiá-lo. O cliente já reprovou seis propostas com uma frase:
**"está dando cara de site morto"**. Descubra por quê, com argumento
verificável, e diga o que fazer.

## O produto

Landing page de portfólio pessoal de **Augusto Menchaca**, estudante de Ciência
da Computação na UFPel (Brasil). Arquivo único HTML/CSS, sem build, sem
framework, bilíngue PT/EN. Objetivo declarado: **candidatura a programa de
estágio** em consultoria de tecnologia. Prazo real: 11/10/2026.
Leitor-alvo: recrutador que decide em **6 a 10 segundos** na home.

Estado atual da página em produção: 8455px de altura, 11 seções de primeiro
nível, **9 molduras de imagem vazias** (nenhum asset existe), 0 elementos
`<img>`, 10 links `href="#"`. Lighthouse 100/100/100 em A11y, BP e SEO.

Tokens de cor do projeto: paper `#F7F5EF`, stone `#E8E3D9`, white,
charcoal `#111213`, body `#343739`, muted `#626569`, acid `#E6F835`,
oxblood `#5A2232`, wine `#F1E6E8`. Marca Hut 8: preto `#0B0B0B`, roxo
`#6B0F9C`, verde `#A4DE02`. Fontes: Instrument Sans, Inter, IBM Plex Mono.

## As seis propostas reprovadas

Todas construídas em Figma, mesmo conteúdo real, 1440px de largura.

| # | modelo | altura | densidade (chars/1000px) | mídia | hover |
|---|---|---|---|---|---|
| H1 | manchete: um item domina por tipo (92px contra 21px) | 1497px | 1045 | 1 faixa | nenhum |
| H2 | coluna de identidade fixa + linhas compactas | 2200px | 935 | 2 faixas | indicador coordenado |
| H3 | registro denso e uniforme, tipo tabela | 961px | 1371 | 0 | mínimo |
| H4 | acordeão: 6 linhas, uma abre no lugar | 348px fechado | — | só no aberto | — |
| H5 | seletor: índice de 6 + painel do selecionado | 487px | — | 1 por vez | — |
| H6 | grade de 6 cards pequenos que expandem | 180px fechado | — | só no aberto | — |

Tratamento de card nas seis: **sem preenchimento, sem borda de caixa, sem
sombra** — apenas filete de 1px a 13% de opacidade, número em mono, título em
sans, uma linha em Inter, e um `+`. Paleta usada: paper, charcoal, filetes
cinza, e oxblood só como acento de estado.

## As referências que o cliente escolheu, e a acusação

O cliente diz que **todas as referências dele têm uma coisa em comum: são
sempre vivas e com cor** — e que as minhas propostas não têm isso.

Referências dele:
- Aelixa — template Webflow (`webflow.com/templates/html/aelixa-website-template`)
- Healio Healthcare Website — Dribbble shot 27413149
- Portfon Personal Portfolio — Behance gallery 250323099
- dois pins do Pinterest
- e, nomeados antes: Wala, Optibiz, Dominic, Darwin

Referências que **eu** medi para embasar as propostas — e é aqui que suspeito
do meu próprio viés:
- brittanychiang.com (4032px, 4 seções, padding 0/0, 9 imagens)
- sarasoueidan.com (5669px, 1 imagem, padding 120/120)
- rauno.me (6108px, **339 caracteres** no body inteiro)
- folha.uol.com.br (11881px, 8 tamanhos de título, 1 item em 65px/1290px)
- arxiv.org/list/cs.LG/recent (50 entradas em 5385px, densidade 2568)
- W3C ARIA APG: padrões Accordion e Tabs

## Correção de arquitetura que o cliente acabou de exigir

**Hut 8 e NIP não são projetos — são vivências.** Precisam sair da seção de
projetos e ganhar tratamento próprio. Hut 8 é a empresa júnior de computação da
UFPel onde ele é Diretor de Projetos e coordena ~20 membros desde jun/2025.
NIP é o Núcleo Integrado de Previsão da UFPel, onde ele é bolsista de iniciação
científica desde set/2025, trabalhando com IA aplicada a recursos hídricos
depois das enchentes que atingiram Pelotas.

Sobram como projetos: IDF-BR, DVO (Prefeitura de Pelotas), Ciere da Rosa
(advocacia), Quantum ML (disciplina).

## Restrições que não podem ser violadas

- Arquivo único, sem build, sem framework, sem dependência npm.
- Precisa funcionar sem JavaScript (progressive enhancement).
- Manter Lighthouse 100 em acessibilidade.
- `--acid #E6F835` **nunca** como texto sobre superfície clara (contraste ~1.1:1).
- Não inventar métrica, data, autoria, publicação ou tecnologia.
- Papéis exatos: em DVO ele **não** desenvolveu o sistema (coordenou); em Ciere
  ele **não** foi design lead; Quantum ML **não** foi publicado; no NIP **não**
  há IA de previsão de enchentes em produção.
- Não recolorir dado científico, screenshot, foto ou asset real de projeto.
- **Nenhum dos 11 assets de imagem existe hoje.** Qualquer proposta que dependa
  de fotografia ou screenshot precisa dizer o que fazer enquanto eles não
  existem.

## O que eu quero de você

1. **Por que as seis leem como site morto?** Nomeie mecanismos concretos, não
   adjetivos. Se for cor, diga qual quantidade e onde. Se for movimento, diga
   qual propriedade animada e em qual gatilho.
2. **Qual é o viés da minha amostra de referências?** Compare o que eu medi com
   o que o cliente escolheu.
3. **O que uma peça "viva" faz que nenhuma das seis faz?** Seja específico e
   citável.
4. **Três direções concretas** que sejam vivas e coloridas sem violar nenhuma
   restrição da lista acima — inclusive a de não ter imagem nenhuma disponível.
5. **O que você acha que eu vou errar na próxima tentativa.**

Seja direto e curto. Prefiro uma crítica dura e específica a um relatório
equilibrado.
