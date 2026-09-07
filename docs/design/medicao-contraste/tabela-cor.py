# -*- coding: utf-8 -*-
"""Gera a tabela POR REFERENCIA a partir de raw/cor-por-referencia.json.
Existe para a tabela do PESQUISA-PALETA.md nao ser digitada a mao."""
import json, os, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
AQUI = os.path.dirname(os.path.abspath(__file__))
d = json.load(io.open(os.path.join(AQUI, 'raw', 'cor-por-referencia.json'), encoding='utf-8'))
d.sort(key=lambda x: (x['grupo'] != 'aprovado', -x['corFortePct']))

def num(v): return f"{v:.3f}".replace('.', ',')
def pct(v): return f"{v:.1f}".replace('.', ',') + '%'

print('<!-- gerado por tabela-cor.py a partir de raw/cor-por-referencia.json — nao editar a mao -->')
print('\n| peça | grupo | cor perceptível `C≥0,05` | cor forte `C≥0,12` | quase neutro `C<0,02` | croma médio | croma de pico | L mediana |')
print('|---|---|---:|---:|---:|---:|---:|---:|')
for r in d:
    g = '**aprovado**' if r['grupo'] == 'aprovado' else 'rejeitado'
    print(f"| `{r['peca']}` | {g} | {pct(r['corPerceptivelPct'])} | **{pct(r['corFortePct'])}** | "
          f"{pct(r['quaseNeutroPct_C002'])} | {num(r['cromaMedio'])} | {num(r['cromaPico'])} | {num(r['luminanciaMediana'])} |")

print('\n### Temperamento — repartição da área **colorida** (`C ≥ 0,05`) por família de matiz\n')
print('| peça | grupo | quatro famílias principais | eixo amarelo·laranja·verde | eixo azul·roxo |')
print('|---|---|---|---:|---:|')
for r in d:
    f = r['familiasDaCor']
    g = '**aprovado**' if r['grupo'] == 'aprovado' else 'rejeitado'
    quente = sum(v for k, v in f.items() if k in ('amarelo', 'laranja', 'verde'))
    frio   = sum(v for k, v in f.items() if k in ('azul', 'roxo', 'ciano'))
    fam = ' · '.join(f'{k} {pct(v)}' for k, v in f.items())
    print(f"| `{r['peca']}` | {g} | {fam} | {pct(quente)} | {pct(frio)} |")

apr = [r for r in d if r['grupo'] == 'aprovado']
rej = [r for r in d if r['grupo'] == 'rejeitado']
def faixa(rs, campo, f=num):
    vs = [r[campo] for r in rs]
    return f'{f(min(vs))} – {f(max(vs))}'
print('\n### O teste, sobre esta tabela\n')
print('| métrica | aprovados | rejeitados | veredito |')
print('|---|---|---|---|')
for campo, nome, f in [('corPerceptivelPct','cor perceptível',pct), ('corFortePct','cor forte',pct),
                       ('quaseNeutroPct_C002','quase neutro',pct), ('cromaMedio','croma médio',num),
                       ('cromaPico','croma de pico',num), ('luminanciaMediana','luminância mediana',num)]:
    amin, amax = min(r[campo] for r in apr), max(r[campo] for r in apr)
    rmin, rmax = min(r[campo] for r in rej), max(r[campo] for r in rej)
    # separa apenas se as duas faixas forem disjuntas
    sep = amax < rmin or amin > rmax
    dentro = sum(1 for r in apr if rmin <= r[campo] <= rmax)
    v = '**separa**' if sep else f'**não separa** — {dentro} de 5 aprovados dentro da faixa rejeitada'
    print(f'| {nome} | {faixa(apr,campo,f)} | {faixa(rej,campo,f)} | {v} |')

fam_apr = {max(r['familiasDaCor'], key=r['familiasDaCor'].get) for r in apr}
fam_rej = {max(r['familiasDaCor'], key=r['familiasDaCor'].get) for r in rej}
print(f'| temperamento (família dominante) | {" · ".join(sorted(fam_apr))} | {" · ".join(sorted(fam_rej))} | '
      f'**não separa** — as {len(fam_apr & fam_rej)} famílias que dominam alguma peça aprovada dominam também alguma rejeitada |')
print(f'\n**{len(d)} peças** — {len(apr)} aprovadas, {len(rej)} rejeitadas. Medidas sobre as capturas '
      f'canônicas de `referencias-v3/`, com a sonda da §8.2 do board.')
