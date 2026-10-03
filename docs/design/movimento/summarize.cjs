const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
for (const name of ['aelixa','paulkalkbrenner','white_desert','lxlcreative','illoca']) {
  const file = path.join(__dirname, name + '.json.gz');
  if (!fs.existsSync(file)) continue;
  const r = JSON.parse(zlib.gunzipSync(fs.readFileSync(file)));
  console.log('\n' + name, r.timestamp, r.errors);
  for (const a of r.actions) {
    if (!a.before) { console.log(a.label, a.target?.text || a.error || ''); continue; }
    const before = new Map(a.before.elements.map(e => [e.uid, e]));
    const changes = [];
    for (const s of a.samples) for (const e of s.elements) {
      const b = before.get(e.uid);
      if (!b) continue;
      const delta = {};
      for (const k of ['transform','opacity','color','background','outline']) if (e[k] !== b[k]) delta[k] = [b[k],e[k]];
      if (Object.keys(delta).length) changes.push({ uid:e.uid, target:e.target, text:e.text, delta, transition:e.transition, animation:e.animation });
    }
    const unique = [...new Map(changes.map(e => [e.uid,e])).values()];
    const events = [...new Map(a.events.filter(e => e.visible).map(e => [e.target+'|'+e.property, {target:e.target,property:e.property,transition:e.transition,animation:e.animationCss}])).values()];
    console.log(a.label, JSON.stringify({ scroll:[a.before.scrollY,a.samples.at(-1).scrollY], active:a.samples.at(-1).active, events:events.slice(0,6), changes:unique.slice(0,7) }));
  }
}
