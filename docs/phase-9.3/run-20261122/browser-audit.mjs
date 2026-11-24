
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/0ping/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const root=path.resolve(process.env.NAGI_QA_DIST);
const out=process.env.NAGI_QA_OUT;
fs.mkdirSync(out,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg'};
const server=createServer((q,s)=>{
 const u=new URL(q.url,'http://localhost');
 let f=path.resolve(root,'.'+u.pathname);
 if(u.pathname.endsWith('/'))f=path.join(f,'index.html');
 if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){s.writeHead(404).end();return}
 if(u.searchParams.has('nojs'))s.setHeader('Content-Security-Policy',"script-src 'none'");
 s.setHeader('Content-Type',types[path.extname(f)]??'application/octet-stream');
 fs.createReadStream(f).pipe(s);
});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',resolve).on('error',reject));
const origin='http://127.0.0.1:'+server.address().port;
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const timeout=setTimeout(()=>{console.error('Global QA timeout');process.exit(1)},300000).unref();
const ranges=[[320,800],[768,1024],[1440,1000]];
const cases=[
 ['en','/journal/article-foundation-qa/','/journal/','Home','Journal','Breadcrumb','On this page','Published','January 10, 2026','min read','Copy code','Copied','Copy failed','Link to section','Reading progress','Back to Journal'],
 ['zh-TW','/zh/journal/reading-qa-zh/','/zh/journal/','\u9996\u9801','\u672d\u8a18','\u9eb5\u5305\u5c51\u5c0e\u89bd','\u672c\u9801\u76ee\u9304','\u767c\u5e03\u65bc','2026\u5e741\u670810\u65e5','\u95b1\u8b80\u7d04','\u8907\u88fd\u7a0b\u5f0f\u78bc','\u5df2\u8907\u88fd','\u8907\u88fd\u5931\u6557','\u7ae0\u7bc0\u9023\u7d50','\u95b1\u8b80\u9032\u5ea6','\u56de\u5230\u672d\u8a18']
];
const results={engines:[]};
const motionProbe="if (PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) { window.__layoutShifts=[]; new PerformanceObserver(list=>window.__layoutShifts.push(...list.getEntries().filter(e=>!e.hadRecentInput).map(e=>e.value))).observe({type:'layout-shift',buffered:true}); }";
async function createChromium(){
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,ignoreDefaultArgs:['--no-sandbox'],chromiumSandbox:true});
 const ctx=await browser.newContext({reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
 await ctx.addInitScript(motionProbe);
 const page=await ctx.newPage();
 const cdp=await ctx.newCDPSession(page);
 const nojs=await browser.newContext({reducedMotion:'reduce',javaScriptEnabled:false});
 const without=await nojs.newPage();
 let active=page;
 return {name:'Chromium',version:browser.version(),motion:'emulated reduce',nojs:'browser context JavaScript disabled',
   async viewport(width,height){await Promise.all([page.setViewportSize({width,height}),without.setViewportSize({width,height})]);},
   async nav(route,off=false){active=off?without:page;await active.goto(origin+route);},
   ev(expr){return active.evaluate(expr)}, key(key){return active.keyboard.press(key)},
   async click(expression){const rect=await active.evaluate('(()=>{const e='+expression+';e.scrollIntoView({block:"center"});const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()');await active.mouse.click(rect.x,rect.y)}, shot(file){return active.screenshot({path:file})}, ax(){return cdp.send('Accessibility.getFullAXTree')},
   async denyClipboard(){const {targetInfo}=await cdp.send('Target.getTargetInfo');await cdp.send('Browser.setPermission',{permission:{name:'clipboard-write',allowWithoutSanitization:false},setting:'denied',origin,browserContextId:targetInfo.browserContextId});},
   allowClipboard(){return ctx.grantPermissions(['clipboard-read','clipboard-write'],{origin});},
   close(){return browser.close()}};
}
async function createFirefox(){
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'nagi-gecko-qa-'));
 fs.writeFileSync(path.join(profile,'user.js'),'user_pref("ui.prefersReducedMotion", 1);\nuser_pref("focusmanager.testmode", true);\n');
 const proc=spawn('C:/Program Files/Mozilla Firefox/firefox.exe',['-headless','-no-remote','-profile',profile,'--remote-debugging-port','0','about:blank'],{windowsHide:true});
 const url=await new Promise((resolve,reject)=>{
   const t=setTimeout(()=>reject(Error('Firefox BiDi startup timeout')),12000);
   proc.once('error',reject);
   proc.stderr.on('data',d=>{const match=d.toString().match(/ws:\/\/127\.0\.0\.1:\d+/);if(match){clearTimeout(t);resolve(match[0]+'/session');}});
 }).catch(e=>{proc.kill();throw e});
 const ws=new WebSocket(url);
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
 let id=0;const pending=new Map();
 ws.onmessage=message=>{
   const data=JSON.parse(message.data);const p=pending.get(data.id);if(!p)return;
   pending.delete(data.id);clearTimeout(p.timer);
   if(data.type==='error')p.reject(Error(data.error+' '+data.message));else p.resolve(data.result);
 };
 function send(method,params={}){
   return new Promise((resolve,reject)=>{
     const key=++id;
     const timer=setTimeout(()=>{pending.delete(key);reject(Error(method+' timed out'))},7500);
     pending.set(key,{resolve,reject,timer});
     ws.send(JSON.stringify({id:key,method,params}));
   });
 }
 const session=await send('session.new',{capabilities:{alwaysMatch:{acceptInsecureCerts:false}}});
 const {context}=await send('browsingContext.create',{type:'tab',background:false});
 await send('script.addPreloadScript',{functionDeclaration:'()=>{'+motionProbe+'}'});
 const code={Tab:'\uE004',Enter:'\uE007',Space:'\uE00D'};
 return {name:'Firefox',version:session.capabilities.browserVersion,motion:'isolated profile reduce',nojs:'script execution blocked by browser-enforced CSP',
   viewport(width,height){return send('browsingContext.setViewport',{context,viewport:{width,height},devicePixelRatio:1});},
   async nav(route,off=false){await send('browsingContext.navigate',{context,url:origin+route+(off?'?nojs=1':''),wait:'complete'});await send('browsingContext.activate',{context});},
   async ev(expression){
     const r=await send('script.evaluate',{expression:'(async()=>JSON.stringify(await ('+expression+')))()',target:{context},awaitPromise:true,resultOwnership:'none'});
     if(r.type==='exception')throw Error(r.exceptionDetails.text);
     return r.result.type==='undefined'?undefined:JSON.parse(r.result.value);
   },
   async click(expression){const [x,y]=await this.ev("(()=>{const e="+expression+";e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return [Math.round(r.left+r.width/2),Math.round(r.top+r.height/2)];})()");return send('input.performActions',{context,actions:[{type:'pointer',id:'mouse',parameters:{pointerType:'mouse'},actions:[{type:'pointerMove',x,y},{type:'pointerDown',button:0},{type:'pointerUp',button:0}]}]});},
   key(key){return send('input.performActions',{context,actions:[{type:'key',id:'keyboard',actions:[{type:'keyDown',value:code[key]},{type:'keyUp',value:code[key]}]}]});},
   async shot(file){const r=await send('browsingContext.captureScreenshot',{context});fs.writeFileSync(file,Buffer.from(r.data,'base64'));},
   async close(){try{await send('session.end')}finally{ws.close();proc.kill();}}
 };
}
const lc=rgb=>rgb.match(/\d+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
const ratio=(a,b)=>(Math.max(lc(a),lc(b))+.05)/(Math.min(lc(a),lc(b))+.05);
async function wait(b,x){for(let i=0;i<55;i++){if(await b.ev(x))return;await delay(25)}throw Error('Timed out: '+x);}
async function run(create){
 let b;
 const engine={name:create===createChromium?'Chromium':'Firefox',rows:[]};results.engines.push(engine);
 try{
 b=await create();Object.assign(engine,{version:b.version,reducedMotion:b.motion,noJavaScript:b.nojs});
 for(const [width,height] of ranges){
  await b.viewport(width,height);
  for(const [locale,route,journal,homeLabel,journalLabel,breadcrumbLabel,tocLabel,published,date,reading,copy,copied,failed,section,progress,back] of cases){
   const row={width,locale,checks:{}};engine.rows.push(row);
   async function check(name,callback){try{await callback();row.checks[name]='PASS'}catch(e){row.checks[name]='FAIL';(row.failures??={})[name]=e.message;}}
   const selector=width===1440?'.journal-toc-desktop':'.journal-toc-mobile';
   const nav='document.querySelector('+JSON.stringify(selector)+')';
   const details=nav+".querySelector('details')";
   const focus="document.activeElement";
   const hash=id=>"decodeURIComponent(location.hash.slice(1))==="+JSON.stringify(id);
   await b.nav(route);
   await wait(b,"document.querySelectorAll('.journal-copy').length===2");
   await check('visualLayout',async()=>{
    const g=await b.ev("(()=>{const h=document.documentElement,p=document.querySelector('.article-prose'),c=document.querySelector('.journal-content');return {bg:getComputedStyle(h).backgroundColor,sw:h.scrollWidth,w:innerWidth,c:c.clientWidth,text:getComputedStyle(p).color,size:parseFloat(getComputedStyle(p).fontSize),line:parseFloat(getComputedStyle(p).lineHeight),reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,motion:getComputedStyle(document.querySelector('progress')).transitionDuration,pre:getComputedStyle(p.querySelector('pre')).backgroundColor}})()");
    row.geometry=g;
    assert.equal(g.bg,'rgb(0, 0, 0)');assert.equal(g.pre,'rgb(16, 16, 16)');assert.equal(g.text,'rgb(212, 212, 212)');
    assert.equal(g.w,width);assert.ok(g.sw<=width&&g.c<=720&&g.size>=17&&g.line>=30);if(width===1440)assert.equal(g.c,720);
    assert.equal(g.reduce,true);assert.equal(g.motion,'0s');
   });
   await check('localization',async()=>{
    const labels=await b.ev("(()=>{const b=document.querySelector('.journal-header nav'),m=document.querySelector('.journal-meta');return [document.documentElement.lang,b.getAttribute('aria-label'),...Array.from(b.querySelectorAll('a'),a=>a.textContent),m.textContent,m.querySelector('time').textContent,"+nav+".getAttribute('aria-label'),document.querySelector('.journal-footer a').textContent,document.querySelector('.journal-footer a').getAttribute('href'),document.querySelector('progress').getAttribute('aria-label'),document.querySelector('.journal-copy').textContent,document.querySelector('.journal-permalink').getAttribute('aria-label')];})()");
    assert.deepEqual(labels.slice(0,4),[locale,breadcrumbLabel,homeLabel,journalLabel]);assert.ok(labels[4].includes(published)&&labels[4].includes(reading));
    assert.deepEqual(labels.slice(5,7),[date,tocLabel]);assert.ok(labels[7].includes(back));assert.deepEqual(labels.slice(8,11),[journal,progress,copy]);assert.ok(labels[11].startsWith(section+': '));
   });
   const ids=await b.ev("Array.from("+nav+".querySelectorAll('[data-section]'),a=>a.dataset.section)");
   const duplicates=ids.filter(id=>id==='\u91cd\u8907\u6a19\u984c'||id.startsWith('\u91cd\u8907\u6a19\u984c-'));
   await check('tocIdsAndStructure',async()=>{
    const state=await b.ev("(()=>{const n="+nav+";return {display:getComputedStyle(n).display,position:getComputedStyle(n).position,open:n.querySelector('details').open,nested:n.querySelectorAll('ol ol a').length,headings:Array.from(document.querySelectorAll('[data-article-body] h2[id], [data-article-body] h3[id]'),h=>h.id),h1:document.querySelectorAll('h1').length,links:Array.from(n.querySelectorAll('a'),a=>decodeURIComponent(a.hash.slice(1))),landmarks:['header','main','article','footer'].every(s=>document.querySelector(s))};})()");
    assert.equal(state.h1,1);assert.ok(state.landmarks&&state.nested>0&&state.display!=='none');
    assert.equal(state.open,width===1440);assert.equal(state.position,width===1440?'sticky':'static');
    assert.deepEqual(ids,state.headings);assert.deepEqual(ids,state.links);assert.equal(new Set(ids).size,ids.length);assert.equal(duplicates.length,2);
   });
   await check('keyboardFocusAndDisclosure',async()=>{
    const evidence=await b.ev("(()=>{const n="+nav+";const p=document.querySelector('.journal-permalink');const c=document.querySelector('.journal-copy');const s=n.querySelector('summary'); const rect=e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height};};return {permalink:rect(p),copy:rect(c),summary:rect(s)};})()");
    row.targets=evidence;
    for(const target of Object.values(evidence))assert.ok(target.width>=24&&target.height>=24,JSON.stringify(evidence));
    await b.key('Tab');const initialFocus=await b.ev("({outer:document.activeElement.outerHTML.slice(0,140),hasFocus:document.hasFocus(),focus:document.activeElement.matches(':focus'),visible:document.activeElement.matches(':focus-visible'),outline:getComputedStyle(document.activeElement).outlineStyle,top:document.activeElement.getBoundingClientRect().top})");row.initialFocus=initialFocus;assert.equal(initialFocus.visible,true);assert.equal(initialFocus.outline,'solid');assert.equal(await b.ev(focus+".matches('.skip')"),true);
    await b.key('Enter');await wait(b,focus+".id==='main'");
    await b.ev(details+".querySelector('summary').focus()");
    assert.equal(await b.ev("getComputedStyle("+focus+").outlineStyle"),'solid');
    assert.equal(await b.ev("(()=>{const e=document.activeElement,r=e.getBoundingClientRect();const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return e.contains(hit)})()"),true,'Summary center is hit-testable while focused');
    if(width!==1440){await b.key('Enter');await wait(b,details+'.open');await b.click(details+".querySelector('summary')");await wait(b,'!'+details+'.open');await b.click(details+".querySelector('summary')");await wait(b,details+'.open');}
   });
   await check('keyboardOrder',async()=>{
    await b.ev("document.querySelector('.journal-breadcrumb li:last-child a').focus()");
    await b.key('Tab');
    const next=await b.ev("document.activeElement.tagName");
    row.afterBreadcrumb=next;
    assert.equal(next,'SUMMARY','The visible TOC follows the breadcrumbs in keyboard order.');
   });
   await check('anchorActiveAndSticky',async()=>{
    await b.ev(details+".open=true");
    const target=duplicates[0];
    const link=nav+".querySelectorAll('a')["+ids.indexOf(target)+"]";
    await b.ev(link+".focus()");await b.key('Enter');await wait(b,hash(target));
    await wait(b,nav+".querySelector('[aria-current=location]')?.dataset.section==="+JSON.stringify(target));
    if(width===1440){
     const readingTop=await b.ev("(()=>{const n="+nav+",r=document.querySelector('.journal-reading').getBoundingClientRect();window.scrollTo(0,scrollY+r.top+55);return getComputedStyle(n).insetBlockStart})()");
     await delay(60);
     const top=await b.ev(nav+'.getBoundingClientRect().top');
     assert.ok(Math.abs(top-parseFloat(readingTop))<=2||top<parseFloat(readingTop));
    }
   });
   await check('scrollActiveTracking',async()=>{
 const target=ids[0];
 await b.ev("(()=>{history.replaceState(null,'',location.pathname);const h=document.getElementById("+JSON.stringify(target)+");scrollTo(0,scrollY+h.getBoundingClientRect().top-70)})()");
 await wait(b,nav+".querySelector('[aria-current=location]')?.dataset.section==="+JSON.stringify(target));
 });
 await check('permalink',async()=>{
    const target=duplicates[1];const p="document.getElementById("+JSON.stringify(target)+").querySelector('a.journal-permalink')";
    assert.ok((await b.ev(p+".getAttribute('aria-label')")).startsWith(section));
    await b.ev(p+".focus()");await b.key('Enter');await wait(b,hash(target));
   });
   await check('progressAndShort',async()=>{
    await b.ev('window.scrollTo(0,0)');await delay(60);
    assert.ok(await b.ev("Number.isFinite(document.querySelector('progress').value)&&document.querySelector('progress').value<100"));
    await b.ev("window.scrollTo(0,document.documentElement.scrollHeight)");await wait(b,"document.querySelector('progress').value===100");
   });
   await check('contrast',async()=>{
    const colors=await b.ev("(()=>{const c=e=>getComputedStyle(e).color;return [c(document.querySelector('h1')),c(document.querySelector('.article-prose')),c(document.querySelector('.journal-meta')),c("+nav+".querySelector('summary')),c(document.querySelector('.journal-copy')),...new Set(Array.from(document.querySelectorAll('pre span[style]'),c))]})()");
    const pageRatios=colors.slice(0,5).map(c=>ratio(c,'rgb(0,0,0)'));
    const codeRatios=colors.slice(5).map(c=>ratio(c,'rgb(16,16,16)'));
    row.minimumContrast=Math.min(...pageRatios,...codeRatios);
    assert.ok(row.minimumContrast>=4.5);
   });
   await check('clipboardWrite',async()=>{
    await b.ev("(()=>{const clipboard=navigator.clipboard;const native=clipboard.writeText.bind(clipboard);Object.defineProperty(clipboard,'writeText',{configurable:true,value:async text=>{window.__copiedText=text;window.__nativeWrite=false;await native(text);window.__nativeWrite=true;}})})()");
    for(let i=0;i<2;i++){
      await b.ev("(()=>{window.__nativeWrite=false;document.querySelectorAll('.journal-copy')["+i+"].focus()})()");
      await b.click("document.querySelectorAll('.journal-copy')["+i+"]");await wait(b,"window.__nativeWrite===true");
      await wait(b,"document.querySelector('[role=status]').textContent==="+JSON.stringify(copied));
      const payload=await b.ev("window.__copiedText");
      assert.equal(payload,await b.ev("document.querySelectorAll('pre > code')["+i+"].textContent"));
      if(i===1)assert.ok(payload.startsWith('  ')&&payload.split('\n')[1].startsWith('    '));
      if(b.name==='Chromium')assert.equal((await b.ev("navigator.clipboard.readText()")).replaceAll('\r\n','\n'),payload);
    }
   });
   await check('clipboardDenialFeedback',async()=>{
    await b.ev("(()=>{Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:()=>Promise.reject(new DOMException('Denied','NotAllowedError'))}); document.querySelector('.journal-copy').focus()})()");
    await b.click("document.querySelector('.journal-copy')");await wait(b,"document.querySelector('[role=status]').textContent==="+JSON.stringify(failed));
    const label=await b.ev("(()=>{const e=document.querySelector('.journal-copy');return {text:e.textContent,accessible:e.getAttribute('aria-label')??e.textContent};})()");
    row.failureLabel=label;
    assert.equal(label.text,failed);
    assert.ok(label.accessible.includes(label.text),'Visible button text must be part of its accessible name.');
   });
   await check(b.denyClipboard?'nativeClipboardPermissionDenial':'clipboardWithoutUserActivation',async()=>{
    await b.nav(route+'?native-denial=1');
    await wait(b,"document.querySelectorAll('.journal-copy').length===2");
    if(b.denyClipboard)await b.denyClipboard();
    try{
      if(b.denyClipboard){await b.ev("document.querySelector('.journal-copy').focus()");await b.key('Enter');}
      else await b.ev("document.querySelector('.journal-copy').click()");
      await wait(b,"document.querySelector('[role=status]').textContent==="+JSON.stringify(failed));
    }finally{if(b.allowClipboard)await b.allowClipboard();}
   });
   if(b.ax)await check('accessibilityTree',async()=>{
    const ax=await b.ax();const nodes=ax.nodes.filter(n=>!n.ignored);
    for(const role of ['navigation','heading','button','progressbar','status','DisclosureTriangle'])assert.ok(nodes.some(n=>n.role?.value===role),role);
    assert.ok(nodes.find(n=>n.role?.value==='status').properties.some(p=>p.name==='live'&&p.value.value==='polite'));
   });
   row.cumulativeLayoutShift=await b.ev("window.__layoutShifts?.reduce((a,b)=>a+b,0) ?? null");
   if(width===320||width===1440){
    await b.ev("(()=>{document.activeElement.blur();"+details+".open=true;"+nav+".scrollIntoView({block:'center'})})()");
    await b.shot(path.join(out,b.name.toLowerCase()+'-'+locale+'-'+width+'.png'));
   }
   await check('shortArticle',async()=>{
    await b.nav(journal+'reading-qa-short/');await wait(b,"!document.querySelector('progress').hidden&&document.querySelector('progress').value===100");
    assert.equal(await b.ev("!document.querySelector('.journal-toc')&&document.querySelector('progress').value===100"),true);
   });
   await check('scriptDisabled',async()=>{
    await b.nav(route,true);
    assert.equal(await b.ev("!document.querySelector('.journal-copy, .journal-permalink')&&document.querySelector('progress').hidden"),true);
    if(width!==1440){
      await b.ev(details+".querySelector('summary').focus()");
      await b.click(details+".querySelector('summary')");await wait(b,details+'.open');
    }
    await b.ev(nav+".querySelectorAll('a')["+ids.indexOf(duplicates[1])+"].focus()");
    await b.key('Enter');await wait(b,hash(duplicates[1]));
    assert.equal(await b.ev("(()=>{const code=document.querySelector('pre code'),r=document.createRange();r.selectNodeContents(code);const s=getSelection();s.removeAllRanges();s.addRange(r);return s.toString().trim().length>0&&document.documentElement.scrollWidth<=innerWidth&&document.querySelector('article h1').getClientRects().length>0;})()"),true);
   });
   console.log(b.name,width,locale,JSON.stringify(row.checks),JSON.stringify(row.failures??{}));
  }
 }
 }catch(e){engine.error=e.stack;console.error(engine.name,e.stack);}finally{if(b)await b.close();}
}
try{for(const create of [createChromium,createFirefox])await run(create);}
finally{fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2)+'\n');server.closeAllConnections();server.close();clearTimeout(timeout);}

