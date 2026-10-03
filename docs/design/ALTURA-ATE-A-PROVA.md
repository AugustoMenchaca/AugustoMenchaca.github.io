# Issue #7 — altura até a primeira representação técnica

## Predicado

Na `wireframes/lp-final.html`, a primeira representação técnica é o **primeiro** elemento que corresponde a `#idf .data-grid .data-card` em ordem do DOM: o cartão “Motor de consulta geoespacial”, no início do estudo IDF-BR. O ponto medido é a borda superior da caixa desse cartão, em coordenadas do documento (`getBoundingClientRect().top + scrollY`).

O critério é aplicável por outra pessoa sem escolher visualmente entre candidatos: a seleção retorna dois cartões e usa o primeiro. Ele apresenta uma função técnica nomeada e um diagrama, antes do cartão “Método / Gumbel”. **O próprio HTML marca o diagrama como “ESQUEMÁTICO”**; esta medição não o classifica como dado real, screenshot de produto nem comprovação de funcionamento em produção. As molduras de screenshot posteriores também são placeholders no HTML atual.

## Método

- Fonte: `wireframes/lp-final.html` local. A variante **A-lp-atual** usa a página como está; **B-so-escala** injeta apenas `CSS_ESCALA` extraído de `docs/design/tipografia/medir.mjs`, sem modificar esse arquivo ou a página.
- Chrome com janela (`--headed`), CDP, cinco viewports definidos em `docs/design/tipografia/alvos.json`; cada par variante/largura foi medido duas vezes. Antes da leitura, o driver aguarda o carregamento e as fontes, rola até o alvo e aguarda o revelador. Nas 20 leituras, `revealAssentado` foi `true`.
- **Telas** = altura em px ÷ **900 px**, inclusive nas larguras cujo viewport de emulação tem outra altura. Os valores de telas abaixo foram arredondados a três casas; as alturas preservam as duas casas emitidas pelo instrumento.
- O Chrome deste host precisou das flags `--disable-gpu` e `--no-sandbox` para responder ao CDP; elas constam do driver. A saída bruta da execução foi escrita em `%TEMP%\altura-prova-issue7.json`, sem tocar `medicoes.json`.

## Resultado

| Largura | Variante | Rodada 1: altura / telas | Rodada 2: altura / telas |
|---:|---|---:|---:|
| 320 px | A-lp-atual | 1.716,41 px / 1,907 | 1.716,41 px / 1,907 |
| 320 px | B-so-escala | 2.099,30 px / 2,333 | 2.099,83 px / 2,333 |
| 390 px | A-lp-atual | 1.541,54 px / 1,713 | 1.541,54 px / 1,713 |
| 390 px | B-so-escala | 1.859,78 px / 2,066 | 1.859,78 px / 2,066 |
| 768 px | A-lp-atual | 1.375,31 px / 1,528 | 1.375,06 px / 1,528 |
| 768 px | B-so-escala | 1.650,11 px / 1,833 | 1.650,11 px / 1,833 |
| 1024 px | A-lp-atual | 1.220,46 px / 1,356 | 1.220,20 px / 1,356 |
| 1024 px | B-so-escala | 1.644,52 px / 1,827 | 1.644,52 px / 1,827 |
| 1440 px | A-lp-atual | 1.264,28 px / 1,405 | 1.264,28 px / 1,405 |
| 1440 px | B-so-escala | 2.234,33 px / 2,483 | 2.234,32 px / 2,483 |

O alvo da métrica 5 em `docs/design/PROBLEMA-v1.md` é **≤ 1,5 tela a 1440 px**, isto é, ≤ 1.350 px com a base de 900 px. **A** ficou 85,72 px abaixo desse limite nas duas rodadas. **B** ficou 884,33 px e 884,32 px acima, respectivamente. Esta é a comparação das variantes medidas com o predicado declarado, sem veredito sobre a arquitetura de seções.

As diferenças entre rodadas aparecem na tabela em vez de serem escolhidas ou médias. A §9.1 de `PESQUISA-TIPOGRAFIA.md` declara oscilação de aproximadamente 25 px na **altura total da página** em outras rodadas; este ensaio mede a posição de um elemento específico, e não usa altura total como substituto.

## Reproduzir

Na raiz do worktree, com Node ≥ 22 e Google Chrome instalado, em PowerShell:

```powershell
node docs/design/tipografia/medir-altura-prova.mjs --headed --saida "$env:TEMP\altura-prova-issue7.json"
```

O comando imprime as 20 alturas no terminal e grava o JSON com os resultados individuais no caminho informado. `--saida` é obrigatório; o driver não grava em `docs/design/tipografia/medicoes.json`.
