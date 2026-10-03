# -*- coding: utf-8 -*-
"""Metricas de cor POR REFERENCIA — area cromatica, croma de pico, temperamento.

A sonda e a canonica da §8.2 do REFERENCE-BOARD-v3, copiada VERBATIM (mesmas
fronteiras de familia de matiz, mesma subamostragem, mesmos limiares). Nao
reescrevi a regua: o ponto e produzir a tabela por referencia com o MESMO
instrumento que gerou a tabela canonica, para os numeros serem comparaveis.

O que isto acrescenta ao board: a §3 mede temperamento apenas para as 5 pecas
aprovadas, e a §12 mede as 6 metricas de cor dos 10 rejeitados mas NAO o
temperamento deles. Aqui as 15 sao medidas igual.

IMPORTANTE — qual captura medir. Rodar isto sobre as capturas de
../medicao-banda-escura/raw/ NAO reproduz a tabela canonica: sao de outra
rodada, com outro estado de carregamento preguicoso. Medido sobre elas, o
paulkalkbrenner da L mediana 0,596 contra 0,823 da §3. As capturas canonicas
sao as de docs/design/referencias-v3/, rastreadas desde a #17, e sobre elas
esta sonda reproduz a §3 e a §12 em 15 de 15 pecas. Comando no README.md.
"""
import sys, json, os, glob, io
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

AQUI = os.path.dirname(os.path.abspath(__file__))
RAW  = os.path.join(AQUI, '..', 'medicao-banda-escura', 'raw')

def oklch(rgb):
    c = rgb.astype(np.float64) / 255.0
    lin = np.where(c <= 0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    R, G, B = lin[...,0], lin[...,1], lin[...,2]
    l = np.cbrt(0.4122214708*R + 0.5363325363*G + 0.0514459929*B)
    m = np.cbrt(0.2119034982*R + 0.6806995451*G + 0.1073969566*B)
    s = np.cbrt(0.0883024619*R + 0.2817188376*G + 0.6299787005*B)
    L = 0.2104542553*l + 0.7936177850*m - 0.0040720468*s
    A = 1.9779984951*l - 2.4285922050*m + 0.4505937099*s
    Bb= 0.0259040371*l + 0.7827717662*m - 0.8086757660*s
    return L, np.hypot(A, Bb), np.degrees(np.arctan2(Bb, A)) % 360

FAM = [(15,'vermelho'),(45,'laranja'),(70,'amarelo'),(170,'verde'),
       (200,'ciano'),(260,'azul'),(290,'roxo'),(345,'magenta')]

def medir(path):
    im = Image.open(path).convert('RGB')
    a = np.asarray(im)
    passo = max(1, min(a.shape[0], a.shape[1]) // 400)
    a = a[::passo, ::passo]                      # subamostra sem misturar pixel
    L, C, H = oklch(a)
    perc, forte = C >= 0.05, C >= 0.12
    fams = {}
    if perc.sum():
        idx = np.digitize(H[perc], [f[0] for f in FAM])
        nomes = np.array([f[1] for f in FAM] + ['vermelho'])
        vals, cnts = np.unique(nomes[idx], return_counts=True)
        ordem = np.argsort(-cnts)
        fams = {str(vals[i]): round(float(cnts[i])/perc.sum()*100, 1) for i in ordem[:4]}
    return {
        'peca': os.path.basename(path)[:-4],
        'origem': path.replace(os.sep, '/'),
        'grupo': 'rejeitado' if 'rejeitados' in path.replace(os.sep, '/') else 'aprovado',
        'dim': f'{im.size[0]}x{im.size[1]}',
        'corPerceptivelPct': round(float(perc.mean())*100, 1),
        'corFortePct': round(float(forte.mean())*100, 1),
        'quaseNeutroPct_C002': round(float((C < 0.02).mean())*100, 1),
        'cromaMedio': round(float(C.mean()), 3),
        'cromaP95': round(float(np.percentile(C, 95)), 3),
        'cromaPico': round(float(C.max()), 3),
        'luminanciaMediana': round(float(np.median(L)), 3),
        'familiasDaCor': fams,
    }

if __name__ == '__main__':
    alvos = sys.argv[1:] or sorted(glob.glob(os.path.join(RAW, '*.png')))
    if not alvos:
        print('Nenhum PNG. Rode primeiro os instrumentos de medicao-banda-escura — ver README.md.')
        sys.exit(1)
    saida = []
    for p in alvos:
        r = medir(p); saida.append(r)
        fam = ' · '.join(f'{k} {v}%' for k, v in r['familiasDaCor'].items())
        print(f"{r['peca']:<24} perc={r['corPerceptivelPct']:>5}% forte={r['corFortePct']:>5}% "
              f"neutro={r['quaseNeutroPct_C002']:>5}% Cmed={r['cromaMedio']:.3f} "
              f"pico={r['cromaPico']:.3f} L={r['luminanciaMediana']:.3f} | {fam}")
    destino = os.path.join(AQUI, 'raw', 'cor-por-referencia.json')
    io.open(destino, 'w', encoding='utf-8').write(json.dumps(saida, ensure_ascii=False, indent=2))
    print(f"\n{len(saida)} pecas -> {os.path.relpath(destino, AQUI)}")
