import sys, json, os, glob
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

def oklch(rgb):
    c = rgb.astype(np.float64) / 255.0
    lin = np.where(c <= 0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    R, G, B = lin[...,0], lin[...,1], lin[...,2]
    l = np.cbrt(0.4122214708*R + 0.5363325363*G + 0.0514459929*B)
    m = np.cbrt(0.2119034982*R + 0.6806995451*G + 0.1073969566*B)
    s = np.cbrt(0.0883024619*R + 0.2817188376*G + 0.6299787005*B)
    L = 0.2104542553*l + 0.7936177850*m - 0.0040720468*s
    return L

def process_file(base_name):
    json_path = f"docs/design/medicao-banda-escura/raw/{base_name}_dom.json"
    img_path = f"docs/design/medicao-banda-escura/raw/{base_name}.png"
    out_path = f"docs/design/medicao-banda-escura/raw/{base_name}.json"

    if not os.path.exists(json_path):
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if data.get('status') == 'FALHA':
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return

    # Process M2 & M3
    if not os.path.exists(img_path):
        print(f"Missing image for {base_name}")
        return

    im = Image.open(img_path).convert('RGB')
    a = np.asarray(im)
    img_h, img_w = a.shape[0], a.shape[1]

    # Subsample columns by 4
    a_sub = a[:, ::4, :]

    L = oklch(a_sub)
    median_L_per_row = np.median(L, axis=1)
    is_dark_img_row = median_L_per_row < 0.50

    css_height = data['preScrollData']['altura']
    scale_factor = data['scaleFactor']

    css_is_dark = []
    for css_y in range(css_height):
        img_y = min(int(css_y * scale_factor), img_h - 1)
        css_is_dark.append(is_dark_img_row[img_y])

    # Find runs
    runs = []
    current_run_start = None
    
    # M3 metrics
    claro_para_escuro = 0
    escuro_para_claro = 0

    for i in range(css_height):
        if i > 0:
            if not css_is_dark[i-1] and css_is_dark[i]:
                claro_para_escuro += 1
            elif css_is_dark[i-1] and not css_is_dark[i]:
                escuro_para_claro += 1

        if css_is_dark[i]:
            if current_run_start is None:
                current_run_start = i
        else:
            if current_run_start is not None:
                runs.append((current_run_start, i - 1))
                current_run_start = None

    if current_run_start is not None:
        runs.append((current_run_start, css_height - 1))

    bandas = []
    barras_finas = 0
    altura_total_escura = 0

    for start, end in runs:
        h = end - start + 1
        if h >= 300:
            bandas.append([start, end])
            altura_total_escura += h
        elif h >= 50:
            barras_finas += 1

    fracao_escura = altura_total_escura / css_height if css_height > 0 else 0

    out_data = {
        'peca': base_name,
        'status': 'OK',
        'url': data['url'],
        'carregadas_por_imgs': f"{data['preScrollData']['carregadas']}/{data['preScrollData']['imgs']}",
        'altura_css': css_height,
        'M1': data['domData'],
        'M2': {
            'numero_bandas': len(bandas),
            'altura_total_escura_px': altura_total_escura,
            'fracao_escura': round(fracao_escura, 4),
            'intervalos_bandas_y': bandas,
            'corridas_escuras_50_a_299_px': barras_finas
        },
        'M3': {
            'transicoes_claro_escuro': claro_para_escuro,
            'transicoes_escuro_claro': escuro_para_claro
        }
    }

    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(out_data, f, ensure_ascii=False, indent=2)

print("Processando imagens...")
for path in glob.glob("docs/design/medicao-banda-escura/raw/*_dom.json"):
    base_name = os.path.basename(path).replace('_dom.json', '')
    process_file(base_name)
print("Concluído.")
