import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, statSync, existsSync } from 'node:fs';
// Never print matched values. Current working tree including untracked source, not Git history.
const paths = execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
const patterns = [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /\bAKIA[A-Z0-9]{16}\b/, /\bgh[pousr]_[A-Za-z0-9]{30,}\b/, /\bgithub_pat_[A-Za-z0-9_]{50,}\b/, /\bsk-[A-Za-z0-9]{32,}\b/];
patterns.push(/"(?:TunnelSecret|private_key)"\s*:\s*"[A-Za-z0-9+/=\\]{24,}"/);
let count=0;
for(const path of paths){
  if(!existsSync(path)) continue; // Tracked deletions are not release inputs.
  if(/^(node_modules|dist)\//.test(path) || statSync(path).size>2_000_000) continue;
  if(/(^|\/)\.env(?:\.|$)/.test(path) && !path.endsWith('.example')) throw new Error(`Private environment file in release source: ${path}`);
  const text=readFileSync(path,'utf8');
  if(patterns.some(p=>p.test(text))) throw new Error(`Potential secret requires review: ${path}`);
  count++;
}
console.log(`Secret pattern scan PASS: ${count} source files; excludes binaries/large files and Git history; not a full secret audit`);
if(process.argv.includes('--history')){
  const revisions=execFileSync('git',['rev-list','--all'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
  const expression='-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|AKIA[A-Z0-9]{16}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,}|sk-[A-Za-z0-9]{32,}';
  for(const revision of revisions){
    const result=spawnSync('git',['grep','-I','-l','-E','-e',expression,revision,'--'],{encoding:'utf8'});
    if(result.status===0)throw new Error(`Potential historical secret; inspect privately at commit ${revision}`);
    assertStatus(result.status);
  }
  console.log(`Reachable Git history pattern scan PASS: ${revisions.length} commits; known credential patterns only, no entropy/binary/unreachable-object scan`);
}
function assertStatus(status){if(status!==1)throw new Error('Historical secret scanner failed');}
