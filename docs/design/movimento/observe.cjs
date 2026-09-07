// Read-only browser observation. Usage: node observe.cjs <playwright-module> [site]
// The module path is supplied by the caller; no dependency/build is added to the LP.
const { chromium } = require(process.argv[2] || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const sites = {
  aelixa: 'https://aelixa.webflow.io/',
  paulkalkbrenner: 'https://paulkalkbrenner.net/',
  white_desert: 'https://white-desert.com/',
  lxlcreative: 'https://lxlcreative.co.uk/',
  illoca: 'https://illoca.unseen.co/',
};
const out = __dirname;
async function observe(browser, name, url) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const record = { name, url, timestamp: new Date().toISOString(), viewport: '1440x900x1', browser: browser.version(), actions: [], errors: [] };
  await page.addInitScript(() => {
    const ids = new WeakMap(); let nextId = 1;
    const uid = el => { if (!ids.has(el)) ids.set(el, nextId++); return ids.get(el); };
    const identify = el => el?.tagName ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${String(el.className?.baseVal ?? el.className ?? '').trim().replace(/\s+/g, '.')}` : '';
    window.__motion = { events: [], identify };
    for (const type of ['transitionrun', 'transitionend', 'animationstart', 'animationend']) {
      document.addEventListener(type, e => {
        if (window.__motion.events.length >= 800) return;
        const cs = getComputedStyle(e.target);
        const box = e.target.getBoundingClientRect();
        window.__motion.events.push({ type, at: Math.round(performance.now()), target: identify(e.target), property: e.propertyName, animation: e.animationName, elapsed: e.elapsedTime, visible: box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight, transition: cs.transition, animationCss: cs.animation });
      }, true);
    }
    window.__motion.snap = () => {
      const elements = [...document.querySelectorAll('body *')].filter(el => {
        const b = el.getBoundingClientRect();
        return b.width > 0 && b.height > 0 && b.bottom > -900 && b.top < innerHeight + 900;
      }).slice(0, 1200);
      return {
        at: Math.round(performance.now()), scrollY, height: document.documentElement.scrollHeight,
        active: identify(document.activeElement), title: document.title,
        elements: elements.map(el => { const cs = getComputedStyle(el); return { uid: uid(el), target: identify(el), text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 65), transform: cs.transform, opacity: cs.opacity, color: cs.color, background: cs.backgroundColor, transition: cs.transition, animation: cs.animation, outline: cs.outline }; }),
        animations: document.getAnimations().slice(0, 30).map(a => ({ target: identify(a.effect?.target), state: a.playState, timing: a.effect?.getTiming(), keyframes: a.effect?.getKeyframes() })),
      };
    };
  });
  const snap = () => page.evaluate(() => window.__motion.snap());
  async function action(label, fn) {
    const before = await snap();
    const eventStart = await page.evaluate(() => window.__motion.events.length);
    try { await fn(); } catch (error) { record.actions.push({ label, error: String(error) }); return; }
    const samples = [];
    for (const delay of [60, 120, 220, 500]) { await page.waitForTimeout(delay); samples.push(await snap()); }
    const screenshot = `${name}-${label}.png`;
    await page.screenshot({ path: path.join(out, screenshot) });
    record.actions.push({ label, before, samples, events: await page.evaluate(start => window.__motion.events.slice(start), eventStart), screenshot });
  }
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    record.httpStatus = response?.status(); record.finalUrl = page.url();
    await action('load', async () => {});
    await page.waitForTimeout(8000);
    record.initialEvents = await page.evaluate(() => window.__motion.events);
    record.text = (await page.locator('body').innerText()).slice(0, 4500);
    const candidates = await page.locator('a,button,[role=button]').evaluateAll(nodes => nodes.map((el, i) => {
      const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { i, text: (el.textContent || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 80), visibility: cs.visibility, opacity: cs.opacity, x: b.x, y: b.y, width: b.width, height: b.height };
    }).filter(b => b.text && !/^home(page)?$/i.test(b.text) && b.visibility === 'visible' && Number(b.opacity) > 0 && b.width > 15 && b.height > 10 && b.y >= 0 && b.y + b.height < innerHeight && b.x >= 0 && b.x < innerWidth));
    record.candidates = candidates;
    for (const [j, target] of candidates.slice(0, 2).entries()) {
      record.actions.push({ label: `hover-target-${j}`, target });
      await action(`hover-${j}`, () => page.locator('a,button,[role=button]').nth(target.i).hover({ timeout: 5000 }));
      await action(`leave-${j}`, () => page.mouse.move(1430, 890));
    }
    await action('keyboard-tab', () => page.keyboard.press('Tab'));
    await action('neutral-before-scroll', async () => {
      await page.keyboard.press('Escape');
      await page.evaluate(() => document.activeElement?.blur());
      await page.mouse.move(1430, 890);
    });
    await action('scroll-down', () => page.mouse.wheel(0, 750));
    await action('scroll-return', () => page.mouse.wheel(0, -750));
    record.finalEvents = await page.evaluate(() => window.__motion.events);
    record.canvas = await page.locator('canvas').count();
  } catch (error) { record.errors.push(String(error)); }
  finally {
    fs.writeFileSync(path.join(out, `${name}.json`), JSON.stringify(record, null, 2));
    fs.writeFileSync(path.join(out, `${name}.json.gz`), require('node:zlib').gzipSync(JSON.stringify(record)));
    await context.close();
    console.log(JSON.stringify({ name, status: record.httpStatus, actions: record.actions.length, errors: record.errors }));
  }
}
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const entries = Object.entries(sites).filter(([name]) => !process.argv[3] || name === process.argv[3]);
    for (let i = 0; i < entries.length; i += 2) await Promise.all(entries.slice(i, i + 2).map(([name, url]) => observe(browser, name, url)));
  } finally { await browser.close(); }
})();
