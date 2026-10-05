import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync('dist/main.js','utf8');
const html=fs.readFileSync('dist/index.html','utf8');
// Verify every direct ID-based script query has a corresponding element.
const ids=[...source.matchAll(/\$\('#([\w-]+)'\)/g)].map(m=>m[1]);
for(const id of new Set(ids))assert.ok(html.includes(`id="${id}"`),`Missing UI element #${id}`);
// Enforce self-contained module graph.
assert.ok(fs.existsSync('dist/vendor/three.module.js'));
assert.ok(fs.existsSync('dist/vendor/three.core.js'));
assert.ok(fs.existsSync('dist/vendor/THREE-LICENSE.txt'));
assert.ok(!/https?:\/\//.test(fs.readFileSync('dist/style.css','utf8')),'CSS must not fetch assets remotely');
assert.equal((html.match(/id="/g)||[]).length,new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1])).size,'Duplicate IDs');
const clamp=(v,a,b)=>Math.max(a,Math.min(v,b));
const body=source.match(/function height\(x,z\)\{([^}]+)\}/)[1];
const height=new Function('clamp',`return function(x,z){${body}}`)(clamp);
for(let x=-33;x<=33;x++)for(let z=-28;z<=28;z++)assert.ok(Number.isFinite(height(x,z)));
for(const [x,z]of[[-1,17],[-12,10],[18,4.5],[-15,-5.4],[2,-10]])assert.ok(height(x,z)>.16,'Required location must be above water');
assert.ok(height(32,25)<0,'Water boundary must be underwater');
console.log(`PASS: ${new Set(ids).size} UI targets, module assets, unique IDs, offline CSS, 3,819 terrain samples, quest locations, shoreline boundary`);
