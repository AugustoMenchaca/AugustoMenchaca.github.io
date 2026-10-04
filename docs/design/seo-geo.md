# SEO e GEO (Generative Engine Optimization)

Este documento descreve as ferramentas e políticas para garantir a indexação correta e segura em buscadores clássicos e robôs de IA (GEO).

## Ferramentas

- **`docs/design/tools/gerar-llms.py`**:
  Lê o `index.html` e gera os arquivos `llms.txt`, `llms-en.txt` e `llms-full.txt`. 
  - **Uso**: `python docs/design/tools/gerar-llms.py`
  - **Finalidade**: Garantir que as LLMs tenham um resumo limpo e fidedigno do currículo/portfólio. A regra mestre é **"nenhum fato novo"**: o script extrai parágrafos exatamente como estão no HTML.
  - **Privacidade**: Todo conteúdo de contato é ativamente ignorado. A regra **nunca contato** protege contra raspagem indesejada de telefones/e-mails.

- **`docs/design/tools/auditar-seo.mjs`**:
  Auditor estrito de SEO que checa tags, limites de caracteres, sitemap, robôs de IA e validade dos arquivos gerados.

## Política para Robôs de IA

Todos os principais web crawlers de IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`, etc.) têm permissão explícita em `/robots.txt` para acessar e ler a raiz, para alimentar seus índices com a versão autorizada do site. `/docs/` e `/wireframes/` ficam bloqueados.

## CI 

O workflow em `.github/workflows/seo.yml` ("SEO e GEO") roda em PRs para `develop` e `main`. Ele:
1. Executa `python docs/design/tools/gerar-llms.py --check` para garantir que o PR não esqueceu de regenerar os arquivos.
2. Executa `node docs/design/tools/auditar-seo.mjs` garantindo que nenhuma alteração (por exemplo, exclusão do JSON-LD) vá para produção sem aderir aos critérios de indexação.
