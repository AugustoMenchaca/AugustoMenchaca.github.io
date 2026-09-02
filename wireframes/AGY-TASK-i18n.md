# TAREFA — deixar a lp-final.html bilíngue (PT principal, EN secundário)

Editar **em lugar** o arquivo `wireframes/lp-final.html`. Não tocar em nenhum outro arquivo.

## Ler primeiro, por completo
1. `wireframes/lp-final.html` — a página a converter
2. `wireframes/i18n-pt.md` — a **única** fonte de traduções

## REGRA ABSOLUTA — NÃO INVENTAR TEXTO
Você **não** traduz nada por conta própria. Toda string em português deve ser
copiada **literalmente** de `i18n-pt.md`. Se uma string visível não estiver lá,
deixe em inglês, inalterada. Não adivinhe, não parafraseie, não "melhore" uma
tradução. Inventar um título de cargo ou uma afirmação em português é falha da
tarefa. O arquivo lista nomes próprios que nunca devem ser traduzidos — respeite.

## Mecânica (implementar exatamente assim)

`<html lang="pt-BR" data-lang="pt">` — PT é o padrão, então a página funciona
corretamente com JavaScript desligado.

Cada trecho traduzível vira **dois irmãos**, nunca troca por atributo (troca por
atributo destruiria a marcação inline `<strong>`, `<br>` e `<span>` que já existe):

```html
<span class="i18n" lang="pt">…português…</span><span class="i18n" lang="en">…english…</span>
```

Para conteúdo de bloco (um `<p>`, uma `<ul>`, um grupo de parágrafos), envolva o
bloco inteiro usando o mesmo par classe/lang num elemento de bloco.

CSS, junto das outras regras:

```css
[data-lang="pt"] .i18n[lang="en"] { display: none; }
[data-lang="en"] .i18n[lang="pt"] { display: none; }
```

Toggle na nav, ao lado do botão LET'S TALK. Dois `<button>` reais ("PT" e "EN")
num grupo, ou um botão que alterna — sua escolha, mas **precisa** ser alcançável
por teclado, ter `aria-pressed` refletindo o estado, um `aria-label`, e anel de
`:focus-visible` coerente com o resto da página.

JS inline no fim do `<body>`, sem biblioteca: ao clicar, define
`document.documentElement.dataset.lang` e `document.documentElement.lang`
(`pt` → `pt-BR`, `en` → `en`), atualiza `aria-pressed`, troca `document.title`
usando os dois títulos do fim de `i18n-pt.md`, e persiste em `localStorage`.
Na carga, restaura a escolha salva; padrão `pt` quando não houver nada.
Todo acesso a `localStorage` dentro de `try/catch` — ele lança exceção em
modo privativo.

## NÃO ALTERAR
- Nenhum layout, espaçamento, cor, token, breakpoint ou regra CSS existente.
- O hero (agora é uma chamada em largura total, **sem retrato** — manter assim).
- A rail editorial: 14 itens, marquee, botão PAUSE.
- Os dois SVGs do IDF, exceto que os rótulos de texto dentro deles recebem o
  mesmo tratamento bilíngue, com `<text>` duplicado usando classe/lang.
- O sistema preto/cinza/roxo da seção Hut 8. Nada de acid ali.
- Os chips `[ … ]` de placeholder — são identificadores de asset, ficam em
  inglês nos **dois** idiomas. Só as notas descritivas deles são traduzidas.
- O bloco de comentário `ASSETS NEEDED` no fim do arquivo.

## Verificar antes de reportar, colando a saída bruta
```
grep -c 'class="i18n"' wireframes/lp-final.html
grep -c 'lang="pt"'    wireframes/lp-final.html
grep -c 'lang="en"'    wireframes/lp-final.html
grep -c 'class="rail-item' wireframes/lp-final.html    # tem de continuar 14
grep -o '<div' wireframes/lp-final.html | wc -l        # tem de bater com </div>
```
Confirmar também: nenhuma string foi traduzida sem estar em `i18n-pt.md`.
