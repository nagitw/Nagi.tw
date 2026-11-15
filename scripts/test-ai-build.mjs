import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const out=mkdtempSync(join(tmpdir(),'nagi-api-build-'));
try{
  for(const mode of ['mock','api']){
    const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build','--outDir',out],{encoding:'utf8',env:{...process.env,PUBLIC_PENGUIN_AI_MODE:mode,PUBLIC_PENGUIN_API_URL:'https://api.nagi.tw/chat'},maxBuffer:4*1024*1024});
    if(mode==='mock') {assert.equal(result.status,0,result.stdout+result.stderr);assert.match(readFileSync(join(out,'index.html'),'utf8'),/data-mode="mock" data-endpoint(?:="")?(?=\s|>)/);}
    else {assert.equal(result.status,0,result.stdout+result.stderr);assert.match(readFileSync(join(out,'index.html'),'utf8'),/data-mode="api" data-endpoint="https:\/\/api.nagi.tw\/chat"/);}
  }
  console.log('Actual production builds: network-free Mock and configured HTTPS API serialized: PASS');
} finally {rmSync(out,{recursive:true,force:true});}
