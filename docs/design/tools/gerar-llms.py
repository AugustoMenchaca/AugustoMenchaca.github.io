import html.parser
import argparse
import pathlib
import sys
import re

class IndexParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.meta_desc_pt = ""
        self.public_links = {}
        self.ignore_tags = {'script', 'style', 'svg', 'nav', 'footer', 'button'}
        
        self.blocks = []
        self.current_block = None
        
        self.section_links = {}

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        
        if tag == 'meta' and attr_dict.get('name') == 'description':
            self.meta_desc_pt = attr_dict.get('content', '')
            
        parent_lang = self.stack[-1]['lang'] if self.stack else 'pt'
        parent_explicit = self.stack[-1]['explicit'] if self.stack else False
        parent_ignored = self.stack[-1]['ignored'] if self.stack else False
        parent_section = self.stack[-1]['section'] if self.stack else None
        
        lang = attr_dict.get('lang')
        if tag == 'html':
            lang = None  # o lang da raiz e so o padrao do documento, nao marca um texto como PT
        explicit = False
        if lang:
            if lang.startswith('pt'): lang = 'pt'
            elif lang.startswith('en'): lang = 'en'
            explicit = True
        else:
            lang = parent_lang
            explicit = parent_explicit
            
        is_ignored = parent_ignored or tag in self.ignore_tags or attr_dict.get('aria-hidden') == 'true' or attr_dict.get('id') == 'contact' or ('class' in attr_dict and 'section-contact' in attr_dict['class'])
        
        section_id = attr_dict.get('id') or parent_section
            
        self.stack.append({
            'tag': tag,
            'lang': lang,
            'explicit': explicit,
            'ignored': is_ignored,
            'section': section_id,
        })
        
        if not is_ignored:
            if tag in ['link', 'a']:
                href = attr_dict.get('href', '')
                if 'linkedin.com' in href:
                    self.public_links['LinkedIn'] = href
                elif 'github.com' in href:
                    self.public_links['GitHub'] = href
                
                if href and section_id:
                    if section_id not in self.section_links:
                        self.section_links[section_id] = []
                    self.section_links[section_id].append(href)
                    
            if tag in ['h1', 'h2', 'h3', 'p', 'li']:
                if not self.current_block:
                    self.current_block = {
                        'tag': tag,
                        'lang': lang,
                        'neutro': not explicit,
                        'section': section_id,
                        'text': '',
                        'buf': [],
                        'depth': len(self.stack)
                    }
                    
    def handle_endtag(self, tag):
        if not self.stack:
            return
        node = self.stack.pop()
        
        if self.current_block and self.current_block['tag'] == tag and len(self.stack) + 1 == self.current_block['depth']:
            b = self.current_block
            buf = b.pop('buf')
            b.pop('depth', None)
            explicitos = any(l is not None for l, _ in buf)
            def junta(idiomas):
                return re.sub(r'\s+', ' ', ''.join(d for l, d in buf if l in idiomas)).strip()
            if explicitos:
                for idioma in ('pt', 'en'):
                    texto = junta((None, idioma))
                    if texto:
                        self.blocks.append({**b, 'lang': idioma, 'neutro': False, 'text': texto})
            else:
                texto = junta((None,))
                if texto:
                    self.blocks.append({**b, 'text': texto})
            self.current_block = None

    def handle_data(self, data):
        if not self.stack:
            return
        node = self.stack[-1]
        if not node['ignored'] and self.current_block:
            self.current_block['buf'].append((node['lang'] if node['explicit'] else None, data))

def get_first_sentence(text):
    idx = text.find('.')
    if idx != -1:
        fim = idx + 1
        while fim < len(text) and text[fim] in '"\u201d\u2019)':
            fim += 1
        return text[:fim].strip()
    return text.strip()

def generate_llms_txt(blocks, meta_desc, public_links, section_links, is_en=False):
    target_lang = 'en' if is_en else 'pt'
    lang_blocks = [b for b in blocks if b['lang'] == target_lang or b.get('neutro')]
    
    lines = []
    lines.append("# Augusto Menchaca")
    resumo = meta_desc
    if is_en:
        hero_p = [b['text'] for b in lang_blocks if b['section'] in [None, 'top'] and b['tag'] == 'p' and not b.get('neutro')]
        if hero_p:
            resumo = hero_p[0]
    lines.append(f"> {resumo}")
    lines.append("")
    
    hero_blocks = [b for b in lang_blocks if b['section'] in [None, 'top']]
    for b in hero_blocks:
        if b['tag'] in ['h1', 'p']:
            lines.append(b['text'])
            lines.append("")
            
    sections_def = [
        ("Projetos", "Projetos", ['idf', 'dvo', 'ciere', 'quantum']),
        ("Experiência", "Experiência", ['hut8', 'nip']),
        ("Sobre", "Sobre", ['about'])
    ]
    
    fallback = {'idf': 'IDF-BR', 'dvo': 'DVO', 'ciere': 'Ciere da Rosa', 'quantum': 'Quantum ML', 'hut8': 'Hut 8', 'nip': 'NIP', 'about': 'Sobre'}
    
    for _, title, s_ids in sections_def:
        if is_en and title == "Projetos": title = "Projects"
        if is_en and title == "Experiência": title = "Experience"
        if is_en and title == "Sobre": title = "About"
        
        lines.append(f"## {title}")
        for sid in s_ids:
            s_blocks = [b for b in lang_blocks if b['section'] == sid]
            if not s_blocks:
                continue
                
            s_title = fallback.get(sid, sid)
            if is_en and sid == 'about':
                s_title = 'About'
                    
            s_url = f"https://augustomenchaca.github.io/#{sid}"
            links = section_links.get(sid, [])
            for link in links:
                if link.startswith('http') and not link.startswith('https://augustomenchaca.github.io/#'):
                    s_url = link
                    break
                        
            s_desc = ""
            for b in s_blocks:
                text = b['text']
                if '.' in text:
                    s_desc = get_first_sentence(text)
                    if len(s_desc) > 220:
                        s_desc = s_desc[:220]
                    break
                    
            if s_desc:
                lines.append(f"- [{s_title}]({s_url}): {s_desc}")
            else:
                lines.append(f"- [{s_title}]({s_url})")
        lines.append("")
        
    lines.append("## Optional")
    if 'LinkedIn' in public_links:
        lines.append(f"- [LinkedIn]({public_links['LinkedIn']})")
    if 'GitHub' in public_links:
        lines.append(f"- [GitHub]({public_links['GitHub']})")
    
    if is_en:
        lines.append("- [llms-full.txt](https://augustomenchaca.github.io/llms-full.txt)")
        lines.append("- [llms.txt](https://augustomenchaca.github.io/llms.txt)")
    else:
        lines.append("- [llms-full.txt](https://augustomenchaca.github.io/llms-full.txt)")
        lines.append("- [llms-en.txt](https://augustomenchaca.github.io/llms-en.txt)")
        
    return "\n".join(lines) + "\n"

def generate_llms_full(blocks, meta_desc):
    lines = []
    lines.append("# Augusto Menchaca")
    lines.append(f"> {meta_desc}")
    lines.append("")
    
    def render_blocks(lang_blocks, block_ids):
        for sid in block_ids:
            s_blocks = [b for b in lang_blocks if b['section'] == sid]
            if not s_blocks:
                continue
            
            fallback = {'idf': 'IDF-BR', 'dvo': 'DVO', 'ciere': 'Ciere da Rosa', 'quantum': 'Quantum ML', 'hut8': 'Hut 8', 'nip': 'NIP', 'about': 'Sobre'}
            s_title = fallback.get(sid, sid)
                
            if sid in ['hut8', 'nip']:
                if sid == 'hut8':
                    lines.append("### Vivências")
                    lines.append("")
                for b in s_blocks:
                    if b['tag'] in ['h1', 'h2', 'h3']:
                        lines.append(f"#### {b['text']}")
                    elif b['tag'] == 'li':
                        lines.append(f"- {b['text']}")
                    else:
                        lines.append(b['text'])
                    lines.append("")
                continue
                
            lines.append(f"### {s_title}")
            lines.append("")
            anterior_li = False
            for b in s_blocks:
                if b['tag'] == 'li':
                    lines.append(f"- {b['text']}")
                    anterior_li = True
                    continue
                if anterior_li:
                    lines.append("")
                    anterior_li = False
                lines.append(b['text'])
                lines.append("")
            if anterior_li:
                lines.append("")
                
    order = ['idf', 'dvo', 'ciere', 'quantum', 'hut8', 'nip', 'about']
    
    lines.append("## Português")
    lines.append("")
    render_blocks([b for b in blocks if b['lang'] == 'pt' or b.get('neutro')], order)
    
    lines.append("## English")
    lines.append("")
    render_blocks([b for b in blocks if b['lang'] == 'en' or b.get('neutro')], order)
    
    return "\n".join(lines) + "\n"

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--raiz', default='.')
    args = parser.parse_args()
    
    base = pathlib.Path(args.raiz)
    html_path = base / 'index.html'
    
    if not html_path.exists():
        print(f"Error: {html_path} not found.")
        sys.exit(1)
        
    content = html_path.read_text(encoding='utf-8')
    p = IndexParser()
    p.feed(content)
    
    llms_pt = generate_llms_txt(p.blocks, p.meta_desc_pt, p.public_links, p.section_links, is_en=False)
    llms_en = generate_llms_txt(p.blocks, p.meta_desc_pt, p.public_links, p.section_links, is_en=True)
    llms_full = generate_llms_full(p.blocks, p.meta_desc_pt)
    
    files = {
        'llms.txt': llms_pt,
        'llms-en.txt': llms_en,
        'llms-full.txt': llms_full
    }
    
    if args.check:
        for fname, expected in files.items():
            fpath = base / fname
            if not fpath.exists():
                print(f"{fname} diff (missing)")
                sys.exit(1)
            actual = fpath.read_text(encoding='utf-8')
            if actual != expected:
                print(f"{fname} diff")
                sys.exit(1)
        sys.exit(0)
    else:
        for fname, expected in files.items():
            with open(base / fname, 'w', encoding='utf-8', newline='\n') as fh:  # sempre LF, igual no Windows e no CI
                fh.write(expected)

if __name__ == '__main__':
    main()
