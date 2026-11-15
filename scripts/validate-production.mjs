import assert from 'node:assert/strict';
import { readFileSync, readdirSync, lstatSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
const walk=d=>readdirSync(d).flatMap(n=>{const p=join(d,n);assert.ok(!lstatSync(p).isSymbolicLink(),'No artifact symlinks');return lstatSync(p).isDirectory()?walk(p):[p];});
const paths=walk('dist');
assert.ok(!existsSync('dist/CNAME'), 'Custom domain must be configured explicitly when switching hosting');
for(const path of paths){
  const name=relative('dist',path).replaceAll('\\','/');
  assert.ok(!/(^|\/)(?:\.env[^/]*|\.git|backend|node_modules)(\/|$)|\.(?:pem|key|py|map)$/.test(name),`Forbidden production file: ${name}`);
  if(/\.(?:html|js|json|xml|txt|css|svg)$/.test(name)) {
    const text=readFileSync(path,'utf8');
    assert.ok(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bAKIA[A-Z0-9]{16}\b|\bghp_[A-Za-z0-9]{30,}\b/.test(text),`Potential public secret: ${name}`);
    assert.ok(!/https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?=[:/])/.test(text),`Loopback URL leaked: ${name}`);
  }
}
console.log(`Production artifact PASS: ${paths.length} files; no CNAME/source maps/private files/symlinks/loopback URLs`);
