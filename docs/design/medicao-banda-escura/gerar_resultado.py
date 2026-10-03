import glob, json, os

aprovados = ["aelixa", "illoca", "paulkalkbrenner", "lxlcreative", "white-desert"]
rejeitados = ["charityshot", "obspogon", "paulfragara", "lowmess", "simonbetton", "nextfive", "incomescrane", "shelomoh", "thatmlopsguy", "cassidoo"]
local = ["lp-final"]

data = {}
for path in glob.glob("docs/design/medicao-banda-escura/raw/*.json"):
    if path.endswith("_dom.json"): continue
    base_name = os.path.basename(path).replace('.json', '')
    with open(path, 'r', encoding='utf-8') as f:
        data[base_name] = json.load(f)

def format_row(k, grupo):
    d = data.get(k)
    if not d:
        return f"| {k} | {grupo} | FALTA ARQUIVO | | | | | |"
    
    if d.get('status') == 'FALHA':
        return f"| {k} | {grupo} | FALHA: {d.get('erro', '')} | - | - | - | - | FALHA |"
    
    flags = []
    if k == 'charityshot': flags.append('sequestro de rolagem (altura da tela)')
    
    carregadas, imgs = d['carregadas_por_imgs'].split('/')
    if int(carregadas) < int(imgs):
        flags.append('imagens incompletas')
        
    m1_tons = d['M1']['qtdTonsEscurosDistintos']
    m2_bandas = d['M2']['numero_bandas']
    m2_frac = d['M2']['fracao_escura']
    m3_c_e = d['M3']['transicoes_claro_escuro']
    m3_e_c = d['M3']['transicoes_escuro_claro']
    
    return f"| {k} | {grupo} | {m1_tons} | {m2_bandas} | {m2_frac:.4f} | {m3_c_e} c->e / {m3_e_c} e->c | {d['carregadas_por_imgs']} | {', '.join(flags)} |"

def test_separacao(name, get_val_fn):
    vals_ap = [(k, get_val_fn(data[k])) for k in aprovados if data.get(k, {}).get('status') == 'OK']
    vals_rj = [(k, get_val_fn(data[k])) for k in rejeitados if data.get(k, {}).get('status') == 'OK']
    
    if not vals_ap or not vals_rj:
        return f"{name}: Dados insuficientes"
        
    mean_ap = sum(x[1] for x in vals_ap) / len(vals_ap)
    mean_rj = sum(x[1] for x in vals_rj) / len(vals_rj)
    
    if mean_ap >= mean_rj:
        min_ap = min(vals_ap, key=lambda x: x[1])
        max_rj = max(vals_rj, key=lambda x: x[1])
        if min_ap[1] > max_rj[1]:
            return f"**{name}: SEPARA** (Aprovados > Rejeitados). Pior aprovado: {min_ap[0]} ({min_ap[1]}). Melhor rejeitado: {max_rj[0]} ({max_rj[1]})."
        else:
            return f"**{name}: NÃO SEPARA**. Pior aprovado: {min_ap[0]} ({min_ap[1]}) caiu dentro/abaixo da faixa rejeitada (Melhor rejeitado: {max_rj[0]} com {max_rj[1]})."
    else:
        max_ap = max(vals_ap, key=lambda x: x[1])
        min_rj = min(vals_rj, key=lambda x: x[1])
        if max_ap[1] < min_rj[1]:
            return f"**{name}: SEPARA** (Aprovados < Rejeitados). Pior aprovado: {max_ap[0]} ({max_ap[1]}). Melhor rejeitado: {min_rj[0]} ({min_rj[1]})."
        else:
            return f"**{name}: NÃO SEPARA**. Pior aprovado: {max_ap[0]} ({max_ap[1]}) caiu dentro/acima da faixa rejeitada (Melhor rejeitado: {min_rj[0]} com {min_rj[1]})."

with open("docs/design/medicao-banda-escura/RESULTADO.md", "w", encoding="utf-8") as out:
    out.write("# Resultado da Medição de Bandas Escuras\n\n")
    out.write("## Tabela Geral\n\n")
    out.write("| Peça | Grupo | M1 (tons escuros) | M2 (bandas) | M2 (fração escura) | M3 (transições) | Carregadas/Imgs | Notas |\n")
    out.write("|---|---|---|---|---|---|---|---|\n")
    for k in aprovados: out.write(format_row(k, "Aprovado") + "\n")
    for k in rejeitados: out.write(format_row(k, "Rejeitado") + "\n")
    for k in local: out.write(format_row(k, "Local") + "\n")
    
    out.write("\n## Regra de Honestidade: Teste de Separação\n\n")
    out.write(test_separacao("M1 (Tons escuros)", lambda d: d['M1']['qtdTonsEscurosDistintos']) + "\n\n")
    out.write(test_separacao("M2 (Número de bandas)", lambda d: d['M2']['numero_bandas']) + "\n\n")
    out.write(test_separacao("M2 (Fração escura)", lambda d: d['M2']['fracao_escura']) + "\n\n")
    out.write(test_separacao("M3 (Transições claro->escuro)", lambda d: d['M3']['transicoes_claro_escuro']) + "\n\n")
    out.write(test_separacao("M3 (Transições escuro->claro)", lambda d: d['M3']['transicoes_escuro_claro']) + "\n\n")
    
    out.write("\n## Ressalvas e Falhas\n")
    out.write("- `charityshot`: sequestro de rolagem (scrollHeight = 900px). Medição reflete apenas uma tela.\n")
    out.write("- Imagens incompletas marcadas na tabela (carregadas < imgs). Pode subestimar avaliação M2 baseada em pixels para estas peças.\n")
    for k, d in data.items():
        if d.get('status') == 'FALHA':
            out.write(f"- `{k}` falhou: {d.get('erro')}\n")
    out.write("\n")
