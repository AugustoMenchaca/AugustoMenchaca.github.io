# -*- coding: utf-8 -*-
"""Regua de banda escura, com duas correcoes sobre a versao delegada:
  1. M3 e contada no nivel de BANDA (>=300px), nao em qualquer corrida escura.
     A versao anterior contava corridas de 1px, e por isso a aelixa saiu com
     32 transicoes tendo 3 bandas — o numero media hairline e linha de texto.
  2. 'fracao escura' declarada como fracao EM BANDA, que e o que ela sempre foi.
Escuro = L OKLCH < 0,50. Banda = corrida contigua >= 300px."""
import numpy as np, sys, io, os, json, glob
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def okL(rgb):
    c = rgb.astype(np.float64)/255.0
    lin = np.where(c <= 0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    R, G, B = lin[...,0], lin[...,1], lin[...,2]
    l = np.cbrt(0.4122214708*R + 0.5363325363*G + 0.0514459929*B)
    m = np.cbrt(0.2119034982*R + 0.6806995451*G + 0.1073969566*B)
    s = np.cbrt(0.0883024619*R + 0.2817188376*G + 0.6299787005*B)
    return 0.2104542553*l + 0.7936177850*m - 0.0040720468*s

def medir(png, escala=1.0):
    """escala = deviceScaleFactor da captura. aelixa e white-desert foram
    capturadas a 0.5 porque passam do limite de altura do Chrome; sem isto o
    limiar de 300 CSS px viraria 300 px de IMAGEM, ou seja 600 CSS px, e bandas
    reais desaparecem. Foi o defeito que a primeira versao desta funcao teve:
    a aelixa saiu com 0 bandas em vez de 3."""
    a = np.asarray(Image.open(png).convert('RGB'))
    dark = np.median(okL(a[:, ::4, :]), axis=1) < 0.50
    minimo = 300 * escala
    runs, st = [], None
    for i, v in enumerate(dark):
        if v and st is None: st = i
        elif not v and st is not None: runs.append((st, i-1)); st = None
    if st is not None: runs.append((st, len(dark)-1))
    bandas = [(s, e) for s, e in runs if e-s+1 >= minimo]
    h = a.shape[0]
    escuro = sum(e-s+1 for s, e in bandas)
    comeca_escuro = bool(bandas) and bandas[0][0] == 0
    termina_escuro = bool(bandas) and bandas[-1][1] == h-1
    return {'altura': h, 'bandas': len(bandas), 'intervalos': [[s, e] for s, e in bandas],
            'altura_css': int(h/escala), 'escala': escala,
            'barras_50_299': sum(1 for s, e in runs if 50*escala <= e-s+1 < minimo),
            'corridas_sub50': sum(1 for s, e in runs if e-s+1 < 50*escala),
            'altura_em_banda': escuro, 'fracao_em_banda': round(escuro/h, 4),
            'M3_entradas': len(bandas) - (1 if comeca_escuro else 0),
            'M3_saidas': len(bandas) - (1 if termina_escuro else 0)}

# A escala vem do *_dom.json de cada peca, nao de palpite: aelixa e white-desert
# foram capturadas a 0,5x porque passam do limite de altura do Chrome.
def escala_de(raw, peca):
    try:
        d = json.load(io.open(os.path.join(raw, peca + '_dom.json'), encoding='utf-8'))
        return float(d.get('scaleFactor', 1.0))
    except Exception:
        return 1.0

if __name__ == '__main__':
    RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'raw')
    # Sem argumento: mede toda peca com PNG em raw/. Com argumentos: caminho[:escala].
    if len(sys.argv) > 1:
        alvos = []
        for spec in sys.argv[1:]:
            png, _, esc = spec.rpartition(':')
            if not png or len(png) < 3: png, esc = spec, '1'
            alvos.append((png, float(esc)))
    else:
        alvos = [(p, escala_de(RAW, os.path.basename(p)[:-4]))
                 for p in sorted(glob.glob(os.path.join(RAW, '*.png')))]
    if not alvos:
        print('Nenhum PNG em raw/. Rode primeiro probe.js e driver-lp-final.js — ver README.md.')
        sys.exit(1)
    print(f"{'peca':<28}{'esc':>5}{'css_h':>8}{'bandas':>8}{'fracao':>9}{'M3':>7}{'finas':>7}{'sub50':>7}")
    for png, esc in alvos:
        r = medir(png, esc)
        print(f"{os.path.basename(png):<28}{r['escala']:>5}{r['altura_css']:>8}"
              f"{r['bandas']:>8}{r['fracao_em_banda']:>9.4f}"
              f"{str(r['M3_entradas'])+'/'+str(r['M3_saidas']):>7}"
              f"{r['barras_50_299']:>7}{r['corridas_sub50']:>7}")
