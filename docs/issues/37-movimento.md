Depende da #17 (concluída). Alimenta #5 e #21.

## Direção aprovada em 2026-09-07

O cliente gosta de movimento perceptível para trazer dinamismo e sensação de
página viva, junto com tipografia, composição e conteúdo. Gramática mínima
significa poucos padrões coerentes, sem impor pouca animação.

Este corpo substitui as premissas anteriores, inclusive a exigência de duração
única mantida no comentário de 2026-09-07. A associação com tipografia na amostra
não demonstra que ela substitua movimento nem invalida a percepção do cliente.

## Evidência

REFERENCE-BOARD-v3 §§5, 7 e 12: transições declaradas/1000px nos aprovados
4,23–33,82 e rejeitados 0–90. Charityshot: 90 e rejeitado, apesar de animação
apreciada. Lowmess: 10,81 e percebido como sem animação. Declarações CSS não
medem acionamento, visibilidade ou interesse do movimento. Não usar densidade
como meta nem escolher entre mídia e movimento como rotas excludentes.

LP: 0,6s dominante; referências: 0,3s presente nas cinco, dominante em três.
Adotar **0,3s como base, com exceções funcionais justificadas**. A regra de 0,24s
único veio do paco.me, escolhido pelo pesquisador, e não da amostra do cliente.

## Trabalho

- Consolidar evidência, limites e preferência em `docs/design/PESQUISA-MOVIMENTO.md`.
- Observar carga, hover/foco, rolagem e retorno nas cinco referências aprovadas;
  registrar alvo, gatilho, propriedades, amplitude, duração/curva, repetição,
  função e evidência. **Concluído em `docs/design/movimento/OBSERVACAO.md`.**
  Valores medidos, observados e hipóteses estão distinguidos.
- Definir gramática candidata: interações responsivas, entradas seletivas e
  um momento expressivo ligado ao conteúdo (curva do IDF como candidata).
- Documentar ritmo, intensidade e critérios para eventuais exceções. Movimento
  contínuo exige justificativa própria, pausa acessível e validação de leitura.
- Encaminhar a #5 para síntese e a #21 para protótipo e crítica visual.

## Restrições

Arquivo único, sem build/npm, funcional sem JavaScript. Movimento reduzido zera
animações e transições e apresenta estados finais. Nunca `transition: all` nem
transicionar dimensões ou posicionamento de layout. Retirar `interpolate-size`:
details expande nativamente, com efeito opcional no conteúdo. Timeline de
rolagem somente em `@supports`, com fallback visível. Sem cascata de todas as
seções, bloqueio de leitura ou acesso dependente de hover.

## Entregável e aceite

`docs/design/PESQUISA-MOVIMENTO.md`, com evidência numérica e comportamental,
gramática (gatilho, propriedade, amplitude, ritmo e repetição), decisões e
hipóteses distinguidas. Uma duração base de 0,3s, com exceções justificáveis.
Registrar charityshot e o limite da métrica: movimento não separou julgamentos
nesta amostra, mas continua sendo preferência explícita do cliente.

O documento local consolida as decisões e a observação comportamental das cinco
referências. A validação visual da implementação pertence à #21, após #5, e não
se substitui por contagem de animações. Esses trabalhos posteriores não bloqueiam
o encerramento desta pesquisa.
