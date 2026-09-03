===ISSUE=== secao: Hero ||| secao,movimento
A hero passou por várias iterações e o cliente nunca aprovou nenhuma. Depende da issue de arquitetura de seções.

**Fazer**
- Nome, proposição em uma linha, e um CTA.
- Movimento na carga: **só** nome, proposição e CTA, com `opacity` e `transform: translateY(10px)`, duração única de 0,24s e atrasos curtos.
- Não revelar as seções seguintes em cascata.

**Aceite**
Legível em 6 segundos, e o movimento de carga não passa de três elementos.

===ISSUE=== secao: trilho editorial - refazer ou remover ||| secao,movimento
O trilho é um marquee de 46s com sete itens. A crítica independente foi direta: **o marquee deve sair**, porque gera deslocamento contínuo e não vitalidade informativa.

**Decidir**
- Remover de vez, ou
- Converter em índice estático clicável das oito seções.

Se ficar, precisa preservar o que já funciona: pausa acessível por botão, pausa em `:hover` e `:focus-within`, e desligamento em `prefers-reduced-motion` e abaixo de 860px.

===ISSUE=== secao: IDF-BR, produto publicado ||| secao,conteudo
É o carro-chefe: o único projeto em que ele responde pela camada de software inteira.

**Assets já capturados**
- `docs/design/assets-reais/idf-br-1440.png` — home navy com tiles de navegação
- `docs/design/assets-reais/idf-br-ferramenta-1440.png` — **a ferramenta**: seletor TR2 a TR100, mapa do Brasil, tabela com código Hidroweb, município, distribuição probabilística e coeficientes a/b/c
- `docs/design/assets-reais/idf-br-futuro-1440.png`

**Papel exato, não pode ser inflado**
O time científico definiu dados, equações e resultados esperados. Dele foram: escolha de ferramentas, decisões técnicas, arquitetura, estrutura da aplicação, fluxo, interface, deploy, e a conversão do acervo de planilhas em dados estruturados.

**Nota**
A própria ferramenta usa seleção por abas — o mesmo padrão que o cliente pediu para explorar na página.

===ISSUE=== secao: DVO, produto publicado ||| secao,conteudo
Sistema para a Prefeitura de Pelotas.

**Asset capturado**
`docs/design/assets-reais/dvo-1440.png` — tela de login real, fotografia de oficina em luz azul, logo oficial SMA/Prefeitura, CTA laranja.

**Papel exato — atenção, este é sensível**
Ele **não desenvolveu** o frontend nem o backend. O sistema foi construído pelo squad. Dele foram: coordenação, requisitos, escopo, precificação, proposta, acompanhamento, QA com o cliente, configuração de banco e de armazenamento, e os deploys.

**Aceite**
Nenhuma frase que sugira autoria de desenvolvimento.

===ISSUE=== secao: Ciere da Rosa, produto publicado ||| secao,conteudo
Site para advocacia de família e sucessões.

**Assets capturados**
- `docs/design/assets-reais/ciere-1440.png` — serifa em display, dourado, ilustração 3D de balança
- `docs/design/assets-reais/ciere-mobile-390.png`

**Papel exato**
Ele **não foi design lead**; havia liderança de design própria no projeto. Dele foram: comercial, discovery, requisitos, escopo, ponte entre cliente, design e desenvolvimento, QA, SEO e a atenção a GEO — como o escritório é descrito e recuperado por modelos de linguagem.

**Observação de projeto**
Este site é a peça mais viva do portfólio dele, e não tem nenhuma fotografia de pessoa: o visual principal é ilustração renderizada. Vale estudar como precedente.

===ISSUE=== secao: Quantum ML, experimento academico ||| secao,conteudo
Natureza de prova diferente de produto: não tem interface, tem experimento.

**Assets já extraídos** — 28 figuras reais em `docs/design/assets-reais/quantum/`, tiradas dos notebooks `~/Downloads/qml_*.ipynb`: matriz de kernel QSVM Z, ZZ e Pauli · variância acumulada do PCA · treino após PCA em PC1/PC2 · função de custo de treinamento · acurácia por modelo · matriz de confusão · crescimento de statevector proporcional a 2^n · pares distintos de kernel por amostras de treino.

**Estrutura, vinda da crítica**
Prancha de experimento: pergunta, os dois datasets, configuração clássica contra quântica, resultado, conclusão, e a marca explícita **disciplina da graduação, não publicado**.

**Aceite**
Nenhum gráfico sem número por trás, e nenhuma sugestão de publicação.

===ISSUE=== secao: Vivencias - Hut 8 e NIP ||| secao,conteudo
O cliente foi explícito: Hut 8 e NIP **não são projetos, são vivências**, e precisam sair da seção de projetos.

**Estrutura, vinda da crítica independente**
Seção cronológica única, não dois case studies sem foto. Três colunas por entrada: período, instituição e papel; contexto e responsabilidade; progressão ou modo de atuação.

**Hut 8** — Diretor de Projetos desde jun/2025, entrou em nov/2024. Coordena cerca de 20 membros, de designers a desenvolvedores. O encadeamento real: entrada do cliente, requisitos, escopo e preço, formação de squads, coordenação design–dev, QA, infraestrutura, entrega. Assumiu a diretoria num período em que a continuidade da operação estava ameaçada. Descreve liderança **sem atribuir desenvolvimento**.

**NIP** — bolsista de iniciação científica desde set/2025. Contexto: recursos hídricos depois das enchentes que atingiram Pelotas. IDF-BR como entrega anterior. Escola de verão HydroUAI na UFMG em jan/2026. Passagem para experimentação em machine learning e escrita acadêmica. Termina em **pesquisa em andamento** — nunca em produto nem em impacto operacional, e nunca sugerindo IA de previsão de enchentes em produção.

**Proibido nesta seção**
Stack, CTA de produto, mockup e métrica de resultado. Vivência prova mudança de responsabilidade e repertório, não uma entrega isolada.

**Aceite**
Nenhuma das duas aparece também na seção de projetos.

===ISSUE=== secao: Sobre ||| secao,conteudo
Seção de identidade pessoal.

**Conteúdo verificado, na voz dele**
Graduando em Ciência da Computação na UFPel. A paixão por tecnologia começou antes da graduação: no colégio foi o programador da equipe de LEGO Mindstorms EV3.

**Asset que falta**
Retrato do Augusto — é um dos quatro assets que só ele pode fornecer. Enquanto não existir, **não usar moldura vazia**: ausência declarada continua parecendo ausência.

===ISSUE=== secao: Contato e footer ||| secao,conteudo
Fechamento da página.

**Fazer**
- E-mail `adcmenchaca@inf.ufpel.edu.br`, telefone `(53) 99901-1310`, LinkedIn, GitHub.
- Substituir os **10 `href="#"`** por destinos reais.
- Link para o CV, que já existe compilado em `curriculo/augusto-menchaca-cv.pdf`.

**Aceite**
Zero link morto, e o CV baixa de verdade.
