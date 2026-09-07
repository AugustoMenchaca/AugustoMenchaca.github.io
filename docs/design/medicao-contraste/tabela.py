# -*- coding: utf-8 -*-
"""Gera a tabela de pares de contraste a partir do JSON bruto da sonda.
Existe para a tabela do PESQUISA-PALETA.md nao ser digitada a mao."""
import json, sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

TOK = {'#F7F5EF':'paper','#E8E3D9':'stone','#FFFFFF':'white','#F1EEE6':'subtle',
 '#111213':'charcoal','#343739':'body','#626569':'muted','#8A8E93':'light','#9A9DA1':'on-dark',
 '#E6F835':'acid','#5A2232':'oxblood','#F1E6E8':'wine','#0B0B0B':'h8-black',
 '#6B0F9C':'h8-purple','#8A8A8A':'h8-gray','#2A2A28':'h8-photo'}
# valores que nao sao token: resultado de alpha/opacity sobre um fundo, ou fuga de paleta
MIX = {'#313232':'charcoal + alpha','#7A4351':'oxblood + alpha','#383E00':'charcoal + alpha',
 '#B7B5B1':'paper a .72','#D6D6D4':'paper + alpha','#000000':'ButtonText do navegador'}

def nome(h):
    if h in TOK: return f'`{TOK[h]}`'
    if h in MIX: return f'`{h}` _{MIX[h]}_'
    return f'`{h}`'

d = json.load(open(os.path.join(BASE,'raw','lp-final.json'), encoding='utf-8'))
print(f'<!-- gerado por tabela.py a partir de raw/lp-final.json — nao editar a mao -->')
print(f'\n| texto | fundo | contraste | limiar | veredito | usos | px |')
print('|---|---|---|---|---:|---:|---|')
for g in d['pares']:
    ok = g['ratio'] >= g['limiar']
    folga = g['ratio']/g['limiar']
    v = '**reprova**' if not ok else ('margem fina' if folga < 1.2 else 'passa')
    print(f"| {nome(g['texto'])} | {nome(g['fundo'])} | **{g['ratio']:.2f}:1** | {g['limiar']} | {v} | {g['n']} | {g['minPx']}–{g['maxPx']} |")
print(f"\n**{d['elementosComTexto']}** elementos com texto proprio · **{d['paresDistintos']}** pares distintos · "
      f"**{len(d['reprovados'])}** reprovacoes · **{len(d['margemFina'])}** em margem fina · "
      f"texto sobre `background-image`: **{d['textoSobreBackgroundImage']}**")
