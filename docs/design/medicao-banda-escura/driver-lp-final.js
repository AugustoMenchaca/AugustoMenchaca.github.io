// Driver de medição da lp-final.html — Puppeteer sobre o Chrome do sistema.
//
// Renomeado de `fix_lp_final.js`, nome que o agy deu e que engana: este script
// NÃO altera a lp-final. Ele mede.
//
// ATENÇÃO — este arquivo contém o defeito da P-012, de propósito, para o erro
// continuar visível: o pré-scroll aqui é o da §8.1 (700px / 90ms), e ele deixa
// 20 dos 25 elementos [data-reveal] da lp-final em `opacity: 0`. Foi assim que a
// slab-hut8 saiu da medição e a peça mediu metade do escuro que tem.
// Para remedir corretamente, use 400px / 120ms em duas passadas.
//
// Dependencia: puppeteer-core, declarada no package.json DESTA pasta — nao na
// raiz do repositorio, onde um manifesto faria a LP parecer ter dependencia de
// runtime que ela nao tem. Rodar daqui:  npm install && node driver-lp-final.js
// O caminho do Chrome abaixo e absoluto e do Windows; ajuste em outra maquina.

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const urls = [
    { url: "file:///" + path.resolve("wireframes/lp-final.html").replace(/\\/g, '/'), name: "lp-final" }
];

async function run() {
    console.log("Iniciando Puppeteer para lp-final...");
    const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
    
    for (const item of urls) {
        console.log(`Processando ${item.name}: ${item.url}`);
        const page = await browser.newPage();
        try {
            await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
            await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Pre-scroll
            const preScrollData = await page.evaluate(async () => {
                const h = document.documentElement.scrollHeight;
                for (let y = 0; y < h; y += 700) { 
                    window.scrollTo(0, y); 
                    await new Promise(r => setTimeout(r, 90)); 
                }
                window.scrollTo(0, 0); 
                await new Promise(r => setTimeout(r, 700));
                
                const imgs = [...document.querySelectorAll('img')];
                return { 
                    altura: document.documentElement.scrollHeight, 
                    imgs: imgs.length,
                    carregadas: imgs.filter(i => i.complete && i.naturalWidth > 0).length 
                };
            });
            
            // Sonda de DOM (M1)
            const domData = await page.evaluate(() => {
                const P = s => { 
                    const m = String(s).match(/rgba?\(([^)]+)\)/); 
                    if (!m) return null;
                    const p = m[1].split(/[,\s\/]+/).filter(Boolean).map(Number);
                    return (p.length < 3 || p.some(Number.isNaN)) ? null : { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; 
                };
                const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
                const oklch = ({ r, g, b }) => {
                    const R = lin(r), G = lin(g), B = lin(b);
                    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
                    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
                    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
                    const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
                    return { L };
                };
                
                let areaTotalConsiderada = 0;
                const cores = new Map();
                const todos = document.querySelectorAll('*');
                
                for (const el of todos) {
                    const cs = getComputedStyle(el);
                    const c = P(cs.backgroundColor);
                    if (!c || c.a !== 1) continue;
                    
                    const rc = el.getBoundingClientRect();
                    const ar = rc.width * rc.height;
                    if (ar <= 900) continue;
                    
                    areaTotalConsiderada += ar;
                    
                    const o = oklch(c);
                    if (o.L < 0.50) {
                        const k = `rgb(${c.r}, ${c.g}, ${c.b})`;
                        const p = cores.get(k) || { a: 0, L: o.L };
                        p.a += ar;
                        cores.set(k, p);
                    }
                }
                
                const tons = [...cores.entries()].map(([k, v]) => ({
                    rgb: k,
                    L: Math.round(v.L * 1000) / 1000,
                    area_px: v.a,
                    pct_area: areaTotalConsiderada ? Math.round((v.a / areaTotalConsiderada) * 10000) / 100 : 0
                })).sort((a, b) => b.area_px - a.area_px);
                
                return {
                    areaTotalConsiderada,
                    qtdTonsEscurosDistintos: cores.size,
                    tonsEscuros: tons
                };
            });
            
            // Screenshot capture
            let scaleFactor = 1.0;
            if (preScrollData.altura > 16384) {
                scaleFactor = 0.5;
            }
            await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: scaleFactor });
            await page.screenshot({ path: `docs/design/medicao-banda-escura/raw/${item.name}.png`, fullPage: true });
            
            fs.writeFileSync(`docs/design/medicao-banda-escura/raw/${item.name}_dom.json`, JSON.stringify({
                status: 'OK',
                nome: item.name,
                url: item.url,
                preScrollData,
                scaleFactor,
                domData
            }, null, 2));
            console.log("Sucesso para lp-final");
        } catch (e) {
            console.error(`Falha em ${item.name}: ${e.message}`);
            fs.writeFileSync(`docs/design/medicao-banda-escura/raw/${item.name}_dom.json`, JSON.stringify({
                status: 'FALHA',
                nome: item.name,
                url: item.url,
                erro: e.message
            }, null, 2));
        } finally {
            await page.close();
        }
    }
    await browser.close();
}
run();
