import fs from 'node:fs';
import { parseArgs } from 'node:util';

const args = process.argv.slice(2);
const baseUrl = args.find(a => !a.startsWith('--'));
const isJson = args.includes('--json');

if (!baseUrl) {
  console.error("Uso: node auditar-seo.mjs <url-base> [--json]");
  process.exit(1);
}

const base = baseUrl.replace(/\/$/, '');
const results = [];
let allPassed = true;

function report(item, pass, detail) {
  results.push({ item, pass, detail });
  if (!pass) allPassed = false;
}

// Helpers
async function fetchText(path) {
  const r = await fetch(`${base}${path}`);
  if (!r.ok) return { ok: false, status: r.status, text: '' };
  return { ok: true, status: r.status, text: await r.text(), headers: r.headers };
}
async function fetchHead(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.ok;
  } catch (e) {
    return false;
  }
}
function matchOne(regex, text) {
  const m = text.match(regex);
  return m ? m[1] : null;
}
function matchAll(regex, text) {
  return [...text.matchAll(regex)].map(m => m[1]);
}

// 1. Fetch index.html
const htmlRes = await fetchText('/');
if (!htmlRes.ok) {
  report('index.html', false, `Status ${htmlRes.status}`);
  printAndExit();
}
const html = htmlRes.text;

// 1. Basic tags
const title = matchOne(/<title[^>]*>([\s\S]*?)<\/title>/i, html) || '';
report('<title>', title.length >= 30 && title.length <= 65, `Tamanho: ${title.length}`);

const desc = matchOne(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i, html) || 
             matchOne(/<meta[^>]*content=["']([^"']*)["'][^>]+name=["']description["']/i, html) || '';
report('<meta description>', desc.length >= 70 && desc.length <= 170, `Tamanho: ${desc.length}`);

const canon = matchOne(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i, html) || '';
const SITE = 'https://augustomenchaca.github.io/';
report('<link canonical>', canon === SITE, `Esperado ${SITE} e veio ${canon || '(vazio)'}`);

const htmlLang = matchOne(/<html[^>]+lang=["']([^"']+)["']/i, html);
report('<html lang>', !!htmlLang, `Valor: ${htmlLang}`);

const h1Pt = matchAll(/<h1[^>]*lang=["']pt["'][^>]*>[\s\S]*?<\/h1>/gi, html);
const h1En = matchAll(/<h1[^>]*lang=["']en["'][^>]*>[\s\S]*?<\/h1>/gi, html);
report('<h1> por idioma', h1Pt.length === 1 && h1En.length === 1, `pt: ${h1Pt.length}, en: ${h1En.length}`);

const robots = matchOne(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i, html) || '';
report('<meta robots>', !robots.includes('noindex'), `Valor: ${robots}`);

// 2. Open Graph & Twitter
const ogTags = ['og:title', 'og:description', 'og:url', 'og:type', 'og:image', 'og:image:alt', 'og:locale'];
const twTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
let ogMissing = [];
for (const tag of [...ogTags, ...twTags]) {
  const val = matchOne(new RegExp(`<meta[^>]+(?:property|name)=["']${tag}["'][^>]*content=["']([^"']*)["']`, 'i'), html) || 
              matchOne(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${tag}["']`, 'i'), html);
  if (!val) ogMissing.push(tag);
}
report('OG & Twitter tags', ogMissing.length === 0, ogMissing.length ? `Faltam: ${ogMissing.join(', ')}` : 'Todas presentes');

// Fetch OG image
const ogImage = matchOne(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']*)["']/i, html) || '';
if (ogImage) {
  const imgUrl = ogImage.startsWith('http') ? ogImage : `${base}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
  try {
    const r = await fetch(imgUrl);
    if (!r.ok) {
      report('OG Image 200', false, `Status ${r.status}`);
    } else {
      const buf = await r.arrayBuffer();
      const view = new DataView(buf);
      if (view.getUint32(0) === 0x89504E47) {
        // is PNG
        const w = view.getUint32(16);
        const h = view.getUint32(20);
        report('OG Image 1200x630', w === 1200 && h === 630, `${w}x${h}`);
      } else {
        report('OG Image 1200x630', false, `Não é PNG`);
      }
    }
  } catch (e) {
    report('OG Image 200', false, e.message);
  }
} else {
  report('OG Image', false, 'Faltando');
}

// 3. JSON-LD
const ldScripts = matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, html);
let jsonOk = true;
let hasPerson = false, hasWebSite = false, hasProfilePage = false;
let contactLeak = false;

function searchContact(obj) {
  if (typeof obj === 'string') {
    if (obj.includes('@')) return true;
    if (/\+?\d{2}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}/.test(obj)) return true;
  } else if (Array.isArray(obj)) {
    return obj.some(searchContact);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some(searchContact);
  }
  return false;
}

try {
  for (const str of ldScripts) {
    const data = JSON.parse(str);
    const items = data['@graph'] ? data['@graph'] : (Array.isArray(data) ? data : [data]);
    for (const item of items) {
      if (item['@type'] === 'Person' && item.name && item.url && item.sameAs) hasPerson = true;
      if (item['@type'] === 'WebSite' && item.name && item.url && item.inLanguage) hasWebSite = true;
      if (item['@type'] === 'ProfilePage' && item.mainEntity) hasProfilePage = true;
      if (searchContact(item)) contactLeak = true;
    }
  }
  report('JSON-LD Parse', true, `${ldScripts.length} tags lidas`);
  report('JSON-LD Entidades', hasPerson && hasWebSite && hasProfilePage, `Person:${hasPerson} WebSite:${hasWebSite} ProfilePage:${hasProfilePage}`);
  report('JSON-LD Contato Leak', !contactLeak, contactLeak ? 'E-mail ou telefone encontrado!' : 'Limpo');
} catch (e) {
  report('JSON-LD Parse', false, 'JSON Inválido');
}

// 4. robots.txt
const robotsRes = await fetchText('/robots.txt');
report('robots.txt 200', robotsRes.ok, robotsRes.ok ? 'OK' : `Status ${robotsRes.status}`);
if (robotsRes.ok) {
  const rb = robotsRes.text;
  report('robots.txt Sitemap', /Sitemap:\s*http/.test(rb), /Sitemap:\s*http/.test(rb) ? 'Encontrado' : 'Faltando');
  report('robots.txt Disallow /', !/^Disallow:\s*\/\s*$/m.test(rb), 'Sem disallow total');
  
  const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'Amazonbot'];
  const missingBots = bots.filter(b => !new RegExp(`User-agent:\\s*${b}`, 'i').test(rb));
  report('robots.txt AI Bots', missingBots.length === 0, missingBots.length ? `Faltam: ${missingBots.join(', ')}` : 'Todos presentes');
  
  report('robots.txt /docs/', /Disallow:\s*\/docs\//.test(rb), /Disallow:\s*\/docs\//.test(rb) ? 'OK' : 'Faltando');
  report('robots.txt /wireframes/', /Disallow:\s*\/wireframes\//.test(rb), /Disallow:\s*\/wireframes\//.test(rb) ? 'OK' : 'Faltando');
}

// 5. sitemap.xml
const sitemapRes = await fetchText('/sitemap.xml');
report('sitemap.xml 200', sitemapRes.ok, sitemapRes.ok ? 'OK' : `Status ${sitemapRes.status}`);
if (sitemapRes.ok) {
  const sm = sitemapRes.text;
  const locs = matchAll(/<loc>([^<]+)<\/loc>/g, sm);
  const dates = matchAll(/<lastmod>([^<]+)<\/lastmod>/g, sm);
  report('sitemap.xml Bem formado', locs.length > 0 && locs.length === dates.length, `Locs: ${locs.length}, Lastmods: ${dates.length}`);
  if (dates.length > 0) {
    const formatOk = dates.every(d => /^\d{4}-\d{2}-\d{2}$/.test(d) || /^\d{4}-\d{2}-\d{2}T/.test(d));
    report('sitemap.xml lastmod format', formatOk, formatOk ? 'AAAA-MM-DD' : 'Formato inválido');
  }
  let locsOk = true;
  for (const loc of locs) {
    const lUrl = loc.startsWith('http') ? loc : `${base}${loc.startsWith('/') ? '' : '/'}${loc}`;
    const ok = await fetchHead(lUrl);
    if (!ok) locsOk = false;
  }
  report('sitemap.xml links 200', locsOk && locs.length > 0, locsOk ? 'Todos 200' : 'Erro ao checar locs');
}

// 6. llms.txt files
for (const fname of ['/llms.txt', '/llms-en.txt', '/llms-full.txt']) {
  const lr = await fetchText(fname);
  report(`${fname} 200`, lr.ok, lr.ok ? 'OK' : `Status ${lr.status}`);
  if (lr.ok) {
    const text = lr.text;
    const ct = lr.headers.get('content-type') || '';
    report(`${fname} Content-Type`, ct.includes('text/plain') || ct.includes('text/markdown'), `Tipo: ${ct}`);
    report(`${fname} # e >`, text.startsWith('# ') && text.includes('\n> '), 'Formato inicial OK');
    
    // links
    const mdLinks = matchAll(/\[[^\]]+\]\(([^)]+)\)/g, text);
    let lOk = true;
    const quebrados = [];
    for (let l of mdLinks) {
      if (l.startsWith(SITE)) l = l.slice(SITE.length - 1);  // 'https://site/#x' vira '/#x'
      if (l.startsWith('/#')) l = l.slice(1);
      if (l.startsWith('http')) {
        const ok = await fetchHead(l);
        if (!ok) { lOk = false; quebrados.push(l); }
      } else if (l.startsWith('#')) {
        const hasId = html.includes(`id="${l.substring(1)}"`);
        if (!hasId) { lOk = false; quebrados.push(l); }
      } else if (l.startsWith('/')) {
        const ok = await fetchHead(`${base}${l}`);
        if (!ok) { lOk = false; quebrados.push(l); }
      }
    }
    report(`${fname} Links`, lOk, lOk ? `${mdLinks.length} válidos` : `Quebrados: ${quebrados.join(', ')}`);
    
    const leak = searchContact(text);
    report(`${fname} Leak`, !leak, leak ? 'Possível email/telefone' : 'Limpo');
  }
}

// 7. Favicons
const fav = await fetchHead(`${base}/favicon.ico`);
report('favicon.ico 200', fav, fav ? 'Encontrado' : 'Faltando');
const apple = await fetchHead(`${base}/apple-touch-icon.png`);
report('apple-touch-icon 200', apple, apple ? 'Encontrado' : 'Faltando');
const hasAppleLink = /<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["'][^"']+apple-touch-icon\.png["']/i.test(html) || /<link[^>]+href=["'][^"']+apple-touch-icon\.png["'][^>]+rel=["']apple-touch-icon["']/i.test(html);
report('<link apple-touch>', hasAppleLink, hasAppleLink ? 'Presente' : 'Faltando');

function printAndExit() {
  if (isJson) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.table(results, ['item', 'pass', 'detail']);
  }
  process.exit(allPassed ? 0 : 1);
}

printAndExit();
