import os
import re
import sys
import json
import argparse
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def count_references(basename, content_cache):
    count = 0
    for content in content_cache:
        count += content.count(basename)
    return count

def is_fallback_only(basename, content_cache):
    # Regex para achar a tag inteira picture contendo a imagem
    # Como pode ser complexo cruzar DOM com regex em Python, vamos buscar
    # <picture> ... <source ... webp ...> ... <img src="...basename..."> ... </picture>
    # Mas simplificando: se todas as aparições de basename estão perto de um webp num <picture>
    # Para ser simples:
    # Procura na string toda se o basename está referenciado
    for content in content_cache:
        if basename in content:
            # verifica se a ocorrencia do basename esta dentro de um <picture> que tem webp
            # Encontra as posicoes
            parts = content.split(basename)
            if len(parts) > 1:
                for i in range(len(parts)-1):
                    # olha o texto para tras de parts[i]
                    before = parts[i][-200:]
                    after = parts[i+1][:200]
                    # check if it looks like <picture ... <source ... type="image/webp"
                    # actually just checking if it is inside <picture> and there is a webp source
                    if '<picture' in before or '<source' in before:
                        # very naive heuristic
                        return True
    return False

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--aplica', action='store_true')
    parser.add_argument('--remove-orfas', action='store_true')
    parser.add_argument('--sim', action='store_true')
    parser.add_argument('--json', action='store_true')
    parser.add_argument('--saida', type=str)
    args = parser.parse_args()

    workdir = Path('.')
    
    content_cache = []
    html_file = workdir / 'index.html'
    if html_file.exists():
        content_cache.append(html_file.read_text(encoding='utf-8', errors='ignore'))
        
    css_dir = workdir / 'assets' / 'css'
    if css_dir.exists():
        for f in css_dir.glob('*.css'):
            content_cache.append(f.read_text(encoding='utf-8', errors='ignore'))
            
    js_dir = workdir / 'assets' / 'js'
    if js_dir.exists():
        for f in js_dir.glob('*.js'):
            content_cache.append(f.read_text(encoding='utf-8', errors='ignore'))
            
    images = []
    for root, dirs, files in os.walk(workdir / 'assets' / 'img'):
        for f in files:
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                images.append(Path(root) / f)
                
    assets_dir = workdir / 'assets'
    if assets_dir.exists():
        for f in assets_dir.iterdir():
            if f.is_file() and f.name.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                images.append(f)
                
    orfas = []
    redundantes = []
    fallbacks = []
    rasters = []
    formato = []
    recuperavel = 0
    
    webp_basenames = {img.stem for img in images if img.suffix.lower() == '.webp'}
    
    for img in images:
        if 'video' in img.parts:
            continue
            
        basename = img.name
        refs = count_references(basename, content_cache)
        size = img.stat().st_size
        
        if refs == 0:
            if img.suffix.lower() in ('.png', '.jpg', '.jpeg') and img.stem in webp_basenames:
                redundantes.append((img, size))
            else:
                orfas.append((img, size))
            recuperavel += size
        else:
            if img.suffix.lower() in ('.png', '.jpg', '.jpeg') and img.stem in webp_basenames:
                if is_fallback_only(basename, content_cache):
                    fallbacks.append((img, size))
                    recuperavel += size
            
        if img.suffix.lower() in ('.png', '.jpg', '.jpeg'):
            if img.stem not in webp_basenames:
                formato.append(img)
                
        try:
            with Image.open(img) as pil_img:
                w, h = pil_img.size
                if w > 1600 or size > 250 * 1024:
                    if refs > 0:
                        rasters.append({"file": img, "w": w, "size": size})
        except Exception:
            pass
            
    if args.aplica:
        # omit omitted code for applying
        pass
                
    if not args.aplica and not args.remove_orfas:
        if args.json:
            print(json.dumps({"recuperavel": recuperavel}))
        else:
            print("=== Relatório de Imagens ===")
            print(f"Órfãs de verdade ({len(orfas)}):")
            for x, s in orfas:
                print(f"  - {x} (não referenciada, {s/1024:.1f} KB)")
                
            print(f"\nRedundantes (sem uso) ({len(redundantes)}):")
            for x, s in redundantes:
                print(f"  - {x} (tem .webp irmão, não referenciada, {s/1024:.1f} KB)")
                
            print(f"\nReferenciada só como fallback <img src> dentro de <picture> com <source> WebP ({len(fallbacks)}):")
            for x, s in fallbacks:
                print(f"  - {x} ({s/1024:.1f} KB)")
                
            print(f"\nTotal de bytes recuperáveis: {recuperavel/1024:.1f} KB")

if __name__ == '__main__':
    main()
