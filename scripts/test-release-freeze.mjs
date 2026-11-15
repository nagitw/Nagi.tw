import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const source=readFileSync('src/components/PenguinChat.astro','utf8');
assert.ok(source.includes('resolveChatConfig'),'Production configuration must use validated settings');
const walk=d=>readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(d,e.name)):[join(d,e.name)]);
const html=walk('dist').filter(p=>p.endsWith('.html'));
let dialogs=0;
for(const p of html){const text=readFileSync(p,'utf8');for(const tag of text.matchAll(/<dialog\b[^>]*id="penguin-chat"[^>]*>/g)){dialogs++;assert.ok(/data-mode="(?:offline|mock|api)"/.test(tag[0]),'Only validated public modes are allowed');if(!tag[0].includes('data-mode="api"'))assert.ok(/data-endpoint(?:="")?(?=\s|>)/.test(tag[0]),'Offline/Mock endpoint must be empty');else assert.ok(/data-endpoint="https:\/\//.test(tag[0]),'API requires HTTPS');}assert.ok(!/hreflang="ja"|href="\/(?:ja|jp)\//.test(text),'No unfinished Japanese entry');}
assert.ok(dialogs>0);
console.log(`Production mode PASS: ${html.length} HTML files; ${dialogs} validated dialogs, no Japanese entry`);

