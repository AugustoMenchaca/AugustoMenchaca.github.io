# Issue #52 — investigação da altura instável

## Procedência e dados

Uma primeira versão (`88bb28f`, `gemini-3.1-pro-high`) atribuiu a causa ao `localStorage`; esta versão a testou. O código de `JS_EVENTO_CURTO` só insere um parágrafo e reescreve o `span` do herói. A hipótese anterior de que a variante C clicava em `.lang-btn` não corresponde ao código.

Todos os números abaixo vêm de comandos executados nesta sessão. Os arquivos `issue52-base-1440-1..5` e `issue52-base-768-1..5`, datados de 13/09, foram examinados, mas não usados como prova: contêm `ALTURA a0` de uma instrumentação que não estava no commit `736f015` de 12/09, e não há hash da versão não commitada de `medir.mjs` que os produziu. `issue52-baseline-2.json` é uma rodada headless de 24/09, incompatível com a rodada oficial `--headed`. A tentativa headed desta sessão `%TEMP%\issue52-r1.log` falhou com `timeout CDP: Page.enable`; a repetição válida está em `issue52-r1h.*`.

Taxa observada nos `%TEMP%\issue52-*.json` gravados após o reinício da máquina (2026-09-24 22:49), desconsiderando os arquivos de 13/09:
- `A-lp-atual@1440`: 8350 px em 68 de 69 medições; 8374 px em 1 de 69 medições (a única ocorrência alta ocorreu em `issue52-noclear-1440-5.json`).
- `A-lp-atual@768`: 10934 px em 10 de 10 medições (nenhuma variação observada).

Os logs e JSON completos estão em `C:\Users\augus\AppData\Local\Temp\issue52-*`. Nenhuma medição escreveu no `medicoes.json` versionado.

## Reprodução antes da explicação

Experimento: três rodadas completas da LP com Chrome headed, no instrumento ainda com `localStorage.clear()` de `88bb28f`. Comandos exatos no PowerShell:

```powershell
node docs/design/tipografia/medir.mjs --headed --so-local --saida "$env:TEMP/issue52-r1h.json" 2>&1 | Out-File -LiteralPath "$env:TEMP/issue52-r1h.log" -Encoding utf8
$env:SONDA_DIAG='1'; node docs/design/tipografia/medir.mjs --headed --so-local --saida "$env:TEMP/issue52-r2.json" 2>&1 | Out-File -LiteralPath "$env:TEMP/issue52-r2.log" -Encoding utf8
$env:SONDA_DIAG='1'; cmd /c 'node docs/design/tipografia/medir.mjs --headed --so-local --saida "%TEMP%\issue52-r3.json" > "%TEMP%\issue52-r3.log" 2>&1'
```

Altura `data.altura` da variante A, em px, extraída dos três JSON:

| Rodada | 320 | 390 | 768 | 1024 | 1440 |
| --- | ---: | ---: | ---: | ---: | ---: |
| r1h | 11644 | 11078 | 10934 | 7762 | 8350 |
| r2 | 11644 | 11078 | 10934 | 7762 | 8350 |
| r3 | 11644 | 11078 | 10934 | 7762 | 8350 |

Trecho bruto de `%TEMP%\issue52-r3.log`:

```text
medindo A-lp-atual@768 ...     DIAG a0: caps=39 reduce=false dataReveal=25 will=25 revealed=1 altura=10934
medindo A-lp-atual@1440 ...     DIAG a0: caps=46 reduce=false dataReveal=25 will=25 revealed=1 altura=8350
15/15 medidas -> C:\Users\augus\AppData\Local\Temp\issue52-r3.json
```

Veredito: **a oscilação não apareceu nessas três rodadas**. A amostra alta necessária para comparar os blocos ainda não foi obtida.

### Reprodução isolada em 1440 px e localização no `body`

Depois de retirar a limpeza de `localStorage`, repetiu-se somente A@1440 cinco vezes, cada uma com JSON e log próprios. Comando exato no PowerShell:

```powershell
$env:SONDA_DIAG='1'; $env:SONDA_DIAG_VIEWPORT='1440'; $env:SONDA_DIAG_VARIANTE='A-lp-atual'; for ($i=1; $i -le 5; $i++) { $j=Join-Path $env:TEMP "issue52-noclear-1440-$i.json"; $l=Join-Path $env:TEMP "issue52-noclear-1440-$i.log"; $c='node docs/design/tipografia/medir.mjs --headed --so-local --saida "'+$j+'" > "'+$l+'" 2>&1'; cmd /c $c; Write-Output "1440-$i exit=$LASTEXITCODE" }
```

As alturas foram `8350, 8350, 8350, 8350, 8374` px. Trechos brutos dos logs da quarta e quinta repetições:

```text
issue52-noclear-1440-4.log: medindo A-lp-atual@1440 ...     DIAG a0: caps=46 reduce=false dataReveal=25 will=25 revealed=1 altura=8350
"blocos":[{"i":0,"tag":"nav","id":"","classe":"site-nav","topo":0,"altura":129.203},{"i":1,"tag":"main","id":"","classe":"","topo":129.203,"altura":7567.844},{"i":2,"tag":"footer","id":"","classe":"site-footer","topo":7769.047,"altura":580.484}
issue52-noclear-1440-5.log: medindo A-lp-atual@1440 ...     DIAG a0: caps=46 reduce=false dataReveal=25 will=25 revealed=1 altura=8374
"blocos":[{"i":0,"tag":"nav","id":"","classe":"site-nav","topo":0,"altura":129.203},{"i":1,"tag":"main","id":"","classe":"","topo":129.203,"altura":7592.156},{"i":2,"tag":"footer","id":"","classe":"site-footer","topo":7793.359,"altura":580.484}
```

O salto de `24,312` px ocorre na caixa do `main`; `nav` e `footer` têm altura igual, e o `footer` apenas começa `24,312` px abaixo. As cinco amostras dentro de cada repetição mantiveram sua respectiva altura.

Em 768 px, cinco repetições isoladas sem a limpeza deram `10934` px nas cinco. As duas primeiras usaram o mesmo loop acima com `SONDA_DIAG_VIEWPORT='768'` e nomes `issue52-noclear-768-{1,2}`; a segunda sessão foi interrompida depois de gravar seu JSON. As três restantes usaram o comando abaixo. Cada repetição tem `.json` e `.log` em `%TEMP%`:

```powershell
$env:SONDA_DIAG='1'; $env:SONDA_DIAG_VIEWPORT='768'; $env:SONDA_DIAG_VARIANTE='A-lp-atual'; $env:SONDA_DIAG_DETALHE='1'; for ($i=3; $i -le 5; $i++) { $j=Join-Path $env:TEMP "issue52-noclear-768-$i.json"; $l=Join-Path $env:TEMP "issue52-noclear-768-$i.log"; $c='node "'+(Join-Path $env:TEMP 'issue52-runner.mjs')+'" --headed --so-local --saida "'+$j+'" > "'+$l+'" 2>&1'; cmd /c $c; Write-Output "768-$i exit=$LASTEXITCODE" }
```

Trecho bruto de `%TEMP%\issue52-noclear-768-5.log`:

```text
medindo A-lp-atual@768 ...     DIAG a0: caps=39 reduce=false dataReveal=25 will=25 revealed=1 altura=10934
1/1 medidas -> C:\Users\augus\AppData\Local\Temp\issue52-noclear-768-5.json
```

## Hipótese: idioma persistido no `localStorage`

Experimento: `DIAGNOSTICO_ALTURA`, executado com `SONDA_DIAG=1` nas rodadas r2 e r3 acima, lê em cada amostra `localStorage.getItem('agy-lang')` e `document.documentElement.dataset.lang`. Os campos existem somente no log de diagnóstico, fora do JSON de medição. Em r3, as 75 amostras das 15 variantes deram `pt/pt`; em r2, todas as 75 também deram `pt/pt`.

Trecho bruto de `%TEMP%\issue52-r3.log`:

```text
    ALTURA a0: {"scrollHeight":8350,"bodyScrollHeight":8350,"bodyRect":8349.531,"innerWidth":1440,"clientWidth":1440,"visualWidth":1440,"devicePixelRatio":1,"scrollbar":0,"langStorage":"pt","langDataset":"pt","fontsStatus":"loaded"
```

Veredito: **refutado, por código e por dado (`agy-lang` = `pt` em todas as amostras)**. A variante C não deixou `en` para a A da largura seguinte. A página lê `agy-lang` na carga e `setLang` grava o valor lido; sem clique, a leitura permaneceu `pt`.

## Hipótese: limpar `localStorage` antes de cada página estabiliza a altura

Experimento: remover somente `Page.addScriptToEvaluateOnNewDocument` com `localStorage.clear()` e repetir a rodada completa, comparando com r1h–r3. Comando exato no PowerShell:

```powershell
$env:SONDA_DIAG='1'; cmd /c 'node docs/design/tipografia/medir.mjs --headed --so-local --saida "%TEMP%\issue52-r4-no-clear.json" > "%TEMP%\issue52-r4-no-clear.log" 2>&1'
```

Trecho bruto de `%TEMP%\issue52-r4-no-clear.log`:

```text
medindo A-lp-atual@768 ...     DIAG a0: caps=39 reduce=false dataReveal=25 will=25 revealed=1 altura=10934
medindo A-lp-atual@1440 ...     DIAG a0: caps=46 reduce=false dataReveal=25 will=25 revealed=1 altura=8350
15/15 medidas -> C:\Users\augus\AppData\Local\Temp\issue52-r4-no-clear.json
```

As cinco alturas da variante A foram `11644, 11078, 10934, 7762, 8350` px, iguais às três rodadas com a limpeza. As 75 amostras de r4 continuaram `pt/pt`. Veredito: **refutado, por código e por dado (`agy-lang` = `pt` em todas as amostras)**; não houve efeito de altura observado neste contraste e a limpeza global foi removida do instrumento oficial sem causar instabilidade.

## Hipótese: barra de rolagem muda a largura útil

Experimento: ler `innerWidth`, `clientWidth` e `scrollbar` em todas as amostras de r3. Comando exato: o comando de r3 na seção “Reprodução antes da explicação”. Trecho bruto de `%TEMP%\issue52-r3.log`:

```text
    ALTURA a0: {"scrollHeight":8350,"bodyScrollHeight":8350,"bodyRect":8349.531,"innerWidth":1440,"clientWidth":1440,"visualWidth":1440,"devicePixelRatio":1,"scrollbar":0
```

Nas 75 amostras, `scrollbar` foi `0`; o Chrome oficial também é iniciado com `--hide-scrollbars`. Veredito: **refutada como mecanismo de troca de largura útil nessas rodadas**.

O contraste alto/baixo de `%TEMP%\issue52-noclear-1440-{4,5}.log` reforça o veredito: ambos registram `innerWidth=1440`, `clientWidth=1440` e `scrollbar=0` na primeira amostra.

## Hipótese: `document.fonts.ready` termina antes de a geometria assentar

Experimento: após o `await document.fonts.ready` já existente no medidor, observar `fontsStatus`, fontes carregadas e altura nas cinco amostras de cada variante. Comando exato: o comando de r3 na seção “Reprodução antes da explicação”. Trechos brutos de `%TEMP%\issue52-r3.log`:

```text
medindo A-lp-atual@1440 ...     DIAG a0: caps=46 reduce=false dataReveal=25 will=25 revealed=1 altura=8350
    ALTURA a0: {"scrollHeight":8350,"bodyScrollHeight":8350,"bodyRect":8349.531,"innerWidth":1440,"clientWidth":1440,"visualWidth":1440,"devicePixelRatio":1,"scrollbar":0,"langStorage":"pt","langDataset":"pt","fontsStatus":"loaded"
```

As cinco amostras de A@1440 mantiveram `altura=8350`, `bodyRect=8349.531` e `fontsStatus=loaded`; as faces marcadas como carregadas permaneceram as mesmas. No contraste alto/baixo de `%TEMP%\issue52-noclear-1440-{4,5}.log`, `fontsStatus=loaded` e a lista de faces carregadas também são iguais. Veredito: **nenhum assentamento tardio foi observado após `fonts.ready`**; o estado de carregamento registrado não distingue as duas alturas. Ainda não se mediu o elemento específico em ambas as alturas para excluir diferença de métricas efetivas.

Um ensaio adicional comparou esperar e pular `document.fonts.ready` somente no modo de diagnóstico. Em ambos os casos, `--espera 0 --amostras 5 --intervalo 300`; o comando exato foi:

```powershell
$env:SONDA_DIAG='1'; $env:SONDA_DIAG_VIEWPORT='1440'; $env:SONDA_DIAG_VARIANTE='A-lp-atual'; Remove-Item Env:SONDA_DIAG_DETALHE -ErrorAction SilentlyContinue; foreach ($modo in @('ready','skip','ready2','skip2')) { $env:SONDA_DIAG_PULAR_FONTES_READY = if ($modo.StartsWith('skip')) { '1' } else { '0' }; $j=Join-Path $env:TEMP "issue52-font-$modo.json"; $l=Join-Path $env:TEMP "issue52-font-$modo.log"; $c='node "'+(Join-Path $env:TEMP 'issue52-runner.mjs')+'" --headed --so-local --espera 0 --amostras 5 --intervalo 300 --saida "'+$j+'" > "'+$l+'" 2>&1'; cmd /c $c; $v=(Get-Content -LiteralPath $j -Raw | ConvertFrom-Json).variantesDaLP.'A-lp-atual@1440'.data.altura; Write-Output "font-$modo exit=$LASTEXITCODE altura=$v" }
```

Trecho bruto de `%TEMP%\issue52-font-skip.log`:

```text
medindo A-lp-atual@1440 ...     DIAG a0: caps=46 reduce=false dataReveal=25 will=25 revealed=1 altura=8350
    ALTURA a0: {"scrollHeight":8350,"bodyScrollHeight":8350,"bodyRect":8349.531,"innerWidth":1440,"clientWidth":1440,"visualWidth":1440,"devicePixelRatio":1,"scrollbar":0,"langStorage":"pt","langDataset":"pt","fontsStatus":"loaded"
```

As quatro passadas deram `8350` px; nas seis amostras de cada uma, `fontsStatus=loaded` e as mesmas seis faces já estavam carregadas. Veredito: **não discriminante: nenhuma rodada deste ensaio deu o alto**.

## Hipótese: arredondamento de subpixel

Experimento: comparar o `bodyRect` fracionário com `scrollHeight` em todas as amostras de A@1440 e A@768 de r3. Comando exato: o comando de r3 na seção “Reprodução antes da explicação”. Trechos brutos de `%TEMP%\issue52-r3.log`:

```text
    ALTURA a0: {"scrollHeight":10934,"bodyScrollHeight":10934,"bodyRect":10934.438,"innerWidth":768,"clientWidth":768
    ALTURA a0: {"scrollHeight":8350,"bodyScrollHeight":8350,"bodyRect":8349.531,"innerWidth":1440,"clientWidth":1440
```

Em ambas as larguras, `bodyRect` e `scrollHeight` ficaram constantes nas cinco amostras. Na comparação real alto/baixo em 1440 px, `bodyRect` muda de `8349.531` para `8373.844`, enquanto `scrollHeight` muda de `8350` para `8374`. Veredito: **refutado o arredondamento final como causa**: a caixa real já difere em `24,312` px antes do arredondamento (8373.844 - 8349.531 = 24.313 px). A razão do salto interno de layout no `main` permanece não isolada.

## Hipótese: animação em curso

Experimento: comparar o estado e o tempo de todas as animações nas rodadas baixa e alta de A@1440 e pausar `document.getAnimations()` antes das amostras em mais três rodadas. O comando do contraste é o loop de A@1440 da seção “Reprodução isolada”; o comando exato das rodadas pausadas foi:

```powershell
$env:SONDA_DIAG='1'; $env:SONDA_DIAG_VIEWPORT='1440'; $env:SONDA_DIAG_VARIANTE='A-lp-atual'; $env:SONDA_DIAG_DETALHE='1'; $env:SONDA_DIAG_PAUSAR_ANIMACOES='1'; for ($i=1; $i -le 3; $i++) { $j=Join-Path $env:TEMP "issue52-pause-1440-$i.json"; $l=Join-Path $env:TEMP "issue52-pause-1440-$i.log"; $c='node "'+(Join-Path $env:TEMP 'issue52-runner.mjs')+'" --headed --so-local --saida "'+$j+'" > "'+$l+'" 2>&1'; cmd /c $c; $v=(Get-Content -LiteralPath $j -Raw | ConvertFrom-Json).variantesDaLP.'A-lp-atual@1440'.data.altura; Write-Output "pause-1440-$i exit=$LASTEXITCODE altura=$v" }
```

`issue52-runner.mjs`, guardado em `%TEMP%`, passa os argumentos para o mesmo `medir.mjs` e encerra o Node após a gravação do JSON, sem esperar os temporizadores pendentes do CDP. Trechos brutos dos logs:

```text
issue52-noclear-1440-4.log: "nome":"rail-scroll","estado":"running","tempo":4180
issue52-noclear-1440-5.log: "nome":"rail-scroll","estado":"running","tempo":4180
issue52-pause-1440-1.log: "nome":"rail-scroll","estado":"paused","tempo":4176
```

Todas as outras seis animações estavam `finished` com os mesmos tempos nas rodadas baixa e alta. Veredito no par real: **a fase e o estado da animação não distinguem o par alto/baixo observado**.
Para o ensaio com pausa das animações (`pause-1440-1..3`), as três rodadas mediram `8350` px. Veredito: **não discriminante: nenhuma rodada deste ensaio deu o alto**.

## Ensaios de detalhe dos elementos (`detail-1440` e `direct-detail`)

Experimento: foram executadas 40 rodadas com detalhe (`issue52-detail-1440-1..40`) e 5 rodadas diretas com detalhe (`issue52-direct-detail-1440-1..5`) com `SONDA_DIAG_DETALHE=1` para inspecionar a geometria de todos os blocos em `main`.

Todas as 45 medições resultaram em `8350` px.

Veredito: **não discriminante: nenhuma rodada deste ensaio deu o alto**. Sem capturar a rodada alta com o detalhe ativo, o salto não pôde ser atribuído a um elemento específico.

## Conclusão

1. Causa não encontrada nos dados coletados.
2. Taxa medida: 1 em 69 em `A-lp-atual@1440` (8374 px vs 8350 px) e 0 em 10 em `A-lp-atual@768` (10934 px), com o salto de 24,312 px restrito ao `main`.
3. **Tolerância declarada:** medições de altura total da variante A podem variar em +24,312 px, raramente.
4. Nenhuma decisão depende disto: as margens da #7 são de 85,72 px (variante A) e 884 px (variante B), ambas superiores a 24,312 px.
5. Para quem quiser retomar: o próximo passo é capturar o alto com o detalhe ligado (`SONDA_DIAG_DETALHE=1`), o que demandará muitas rodadas pela taxa medida.
