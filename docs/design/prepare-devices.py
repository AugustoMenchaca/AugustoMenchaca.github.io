from PIL import Image
from pathlib import Path
import json
ROOT = Path(__file__).resolve().parents[2]
rows=[]
for name,screen in [('pro14',(230,150,1512,982)),('pro16',(221,157,1728,1117))]:
    im=Image.open(ROOT / ('assets/mockups/apple/'+name+'.webp')).convert('RGBA')
    a=im.getchannel('A'); w,h=im.size
    bands=[]
    for y in range(h):
        r=a.crop((0,y,w,y+1)).point(lambda v:255 if v>100 else 0).getbbox()
        if r:bands.append((y,r[0],r[2],r[2]-r[0]))
    # A base ocupa mais de 90% da largura; a tampa fica abaixo desse limiar.
    cutoff=next(y for y,x1,x2,width in bands if y>h*.6 and width>w*.9)
    lid=a.crop((0,0,w,cutoff)).point(lambda v:255 if v>12 else 0).getbbox()
    x1,y1,x2,y2=lid
    print(name,'base starts',cutoff,'near seam',[(y,l,r,width)for y,l,r,width in bands if cutoff-4<=y<=cutoff+3],'lid box',lid)
    crop=im.crop((x1,y1,x2,cutoff)); crop.save(ROOT / ('assets/mockups/apple/'+name+'-tampa.webp'),'WEBP',quality=90,method=6)
    lx,ty,sw,sh=screen
    row=dict(name=name,cutoff=cutoff,crop=[x1,y1,x2,cutoff],width=crop.width,height=crop.height,screen=[(lx-x1)/crop.width*100,(ty-y1)/crop.height*100,sw/crop.width*100,sh/crop.height*100],bytes=(ROOT / ('assets/mockups/apple/'+name+'-tampa.webp')).stat().st_size)
    rows.append(row)
print(json.dumps(rows))

# Variantes leves sem mudar o enquadramento das capturas reais.
for project in ['idf', 'dvo']:
    image = Image.open(ROOT / f'assets/img/celulares/{project}-celular-780.webp')
    for width, height, quality in [(230, 498, 70), (390, 844, 82)]:
        image.resize((width, height), Image.Resampling.LANCZOS).save(
            ROOT / f'assets/img/celulares/{project}-celular-{width}.webp',
            'WEBP', quality=quality, method=6)
Image.open(ROOT / 'assets/mockups/apple/iphone13.webp').resize(
    (600, 1157), Image.Resampling.LANCZOS).save(
    ROOT / 'assets/mockups/apple/iphone13-leve.webp', 'WEBP', quality=82, method=6)
Image.open(ROOT / 'assets/mockups/apple/pro14.webp').save(
    ROOT / 'assets/mockups/apple/pro14-leve.webp', 'WEBP', quality=42, method=6)
