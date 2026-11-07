import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

// Run only for intentional re-imports. The generated JSON/assets are build inputs;
// normal development/builds never read the legacy repositories.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const legacy = path.resolve(root, '..');
const read = p => fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
const walk = p => fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):/\.md$/.test(e.name)?[path.join(p,e.name)]:[]).sort();
const slash = p => p.replaceAll('\\','/');
const config = YAML.parse(read(path.join(legacy,'_config.yml')));
const exclusions = config.exclude ?? [];
const portfolio = JSON.parse(read(path.join(legacy,'source/_data/portfolio.json')));
const identities = [portfolio.identity.name,portfolio.identity.brand].filter(Boolean);
// Recover identity labels from existing public source metadata; never embed them in generated output.
const siteFile = path.join(root,'src/data/site.ts');
if(fs.existsSync(siteFile)) for(const m of read(siteFile).matchAll(/name:\s*'([^']+)'/g)) identities.push(m[1].split('/')[0].trim());
const sanitize = s => {
  let result = String(s ?? '');
  for(const name of identities) if(name && name !== 'Nagi') result=result.split(name).join('Nagi');
  return result.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[contact omitted]').replace(/\bJay\b/g,'a teammate').replace(/^.*(?:OSCP|生日|出生日期|聯絡電話|手機號碼|date of birth|phone number).*$/gim,'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi,'').replace(/\{%[\s\S]*?%\}/g,'').trim();
};
const records = [...walk(path.join(legacy,'source')),...walk(path.join(legacy,'notes.nagi.tw/articles'))].map(file=>{
 const original=slash(path.relative(legacy,file)); const text=read(file); const match=text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/); const meta=match?(YAML.parse(match[1])??{}):{}; const body=match?text.slice(match[0].length):text;
 const notes=original.startsWith('notes.');const relative=original.replace(/^source\//,''); const stem=path.basename(file,'.md').replace(/\.(en|ja)$/,'');
 const key=meta.translation_key??meta.slug??(notes||relative.startsWith('_posts/')?stem:relative.replace(/^(zh|en)\//,'').replace(/\/index\.md$/,''));
 const locale=/\.ja\.md$/.test(file)||meta.site_lang==='ja'?'ja':/\.en\.md$/.test(file)||meta.site_lang?.startsWith('en')?'en':meta.site_lang?.startsWith('zh')||notes||relative.startsWith('zh/')?'zh': /^(labs|projects|experience|systems)\//.test(relative)?'en':'zh';
 const excluded=!notes&&exclusions.some(x=>x.endsWith('/**')?relative.startsWith(x.slice(0,-2)):relative===x);
 return {file,original,relative,notes,stem,key,locale,meta,body,excluded};
});
const privateKeys = new Set(records.filter(r=>r.meta.published===false||r.excluded).map(r=>r.key));
const output=[]; const inventory=[];const notesKeys=new Set(records.filter(r=>r.notes).map(r=>r.key+':'+r.locale));
function htmlToMarkdown(body){return body.replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi,'').replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi,(_,n,t)=>'\n\n'+'#'.repeat(Number(n))+' '+t+'\n\n').replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,'[$2]($1)').replace(/<li[^>]*>/gi,'\n- ').replace(/<dt[^>]*>/gi,'\n\n').replace(/<\/dt>/gi,': ').replace(/<\/(p|div|section|article|header|ul|ol|dd)>/gi,'\n\n').replace(/<span[^>]*>/gi,' ').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/^[ \t]+/gm,'').replace(/\n{3,}/g,'\n\n').trim();}
for(const r of records){
 const row={original:r.original,language:r.locale,publish:r.meta.published===false?'false':r.excluded?'excluded by legacy config':privateKeys.has(r.key)?'translation-group quarantine':r.meta.published===true?'true':'public by legacy default',target:'—',decision:''};inventory.push(row);
 if(privateKeys.has(r.key)){row.decision='Not copied: unpublished/excluded translation group';continue;}
 if(r.locale==='ja'){row.decision='Retained externally: Japanese edition; no new language added';row.target='https://notes.nagi.tw/ja/articles/'+(r.meta.slug??r.stem)+'/';continue;}
 if(!r.notes&&r.relative.startsWith('_posts/')&&notesKeys.has(r.key+':'+r.locale)){row.decision='Consolidated into current Notes edition';row.target=(r.locale==='zh'?'/zh':'')+'/journal/'+r.key+'/';continue;}
 let route,kind,status='published';
 if(r.notes||r.relative.startsWith('_posts/')){route='/journal/'+r.key+'/';kind='journal';}
 else {
 const rel=r.relative.replace(/^(zh|en)\//,'').replace(/\/index\.md$/,'');
 if(/^(labs|projects|systems)\/[^/]+$/.test(rel)){route='/'+rel+'/';kind=rel.startsWith('labs/')?'lab':'project';}
 else if(/^journal\/series\/medtrust\/\d+$/.test(rel)){route='/'+rel+'/';kind='journal';}
 else if(/^experience\/(awards|certifications|ctf|workshops)$/.test(rel)){route='/'+rel+'/';kind='experience';}
 else if(rel==='research'){route='/research/archive-notes/';kind='research';status='archival direction';}
 else if(rel==='archive'){route='/technical-reports/evidence-integrity-archive/';kind='report';status='archival summary';}
 else if(rel==='uses'){route='/uses/';kind='reference';}
 else {row.decision='Manual: navigation/profile/index replaced by new site; no article created';continue;}
 }
 if(r.body.trim().length<80){row.decision='Not copied: empty/template-only source, no finished content';continue;}
 let body=sanitize(r.body);if(/<section\b|<article\b/.test(body))body=htmlToMarkdown(body);
 if(kind==='lab')status=/Archived|封存|歸檔/i.test(body)?'archived learning note':/Completed|已完成/i.test(body)?'completed learning note':'learning plan / in progress';
 if(r.key.includes('medical-cybersecurity'))status='early research / public summary';
 if(r.key.includes('medtrust')&&kind==='project')status='prototype / public summary';
 if(r.key.includes('web-security'))status='learning plan';
 const originalRoute=r.notes?'https://notes.nagi.tw/'+(r.locale==='en'?'en/':'')+'articles/'+(r.meta.slug??r.stem)+'/':r.meta.permalink?'/'+r.meta.permalink.replace(/^\//,''):'/'+r.relative.replace(/index\.md$/,'').replace(/\.md$/,'/');
 route=(r.locale==='zh'?'/zh':'')+route;
 if(output.some(o=>o.route===route)){row.target=route;row.decision='Consolidated: canonical public version already imported';continue;}
 const date=r.meta.date?String(r.meta.date).slice(0,10):undefined;
 const entry={id:r.locale+'-'+r.key.replaceAll('/','-'),route,kind,title:sanitize(r.meta.article_title??r.meta.title??r.stem),description:sanitize(r.meta.description??r.meta.summary??''),locale:r.locale,...(date?{date}:{}),body,source:r.original,translationKey:r.key,aliases:[originalRoute],status,publicationStatus:'draft'};
 const cover=r.meta.cover??r.meta.banner;
 if(cover?.endsWith('/cybersec-2026.jpg')){const asset='/migrated/cybersec-2026.jpg';fs.copyFileSync(path.join(legacy,'notes.nagi.tw/public/assets/images/cybersec-2026.jpg'),path.join(root,'public',asset));entry.cover=asset;}
 output.push(entry);row.target=route;row.decision=/<section\b|<article\b/.test(r.body)?'Migrated: public HTML converted to plain Markdown; layout/scripts removed':'Migrated: published Markdown; identity/contact sanitization';
 if(cover&&!entry.cover)row.decision+='; identity/brand cover intentionally omitted';
}
// Preserve old dated URLs on the current edition, including renamed source filenames.
for(const r of records.filter(r=>!r.notes&&r.relative.startsWith('_posts/')&&!privateKeys.has(r.key))){const entry=output.find(e=>e.translationKey===r.key&&e.locale===r.locale);if(entry&&r.meta.permalink){const alias='/'+r.meta.permalink.replace(/^\//,'');if(!entry.aliases.includes(alias))entry.aliases.push(alias);}}
// Resolve local legacy links to imported canonical pages; unmatched links retain their original public origin.
const aliases=new Map(output.flatMap(e=>e.aliases.map(a=>[a,e.route])));
for(const e of output)e.body=e.body.replace(/\]\(([^)]+)\)/g,(match,href)=>{
 if(/^(https?:|mailto:|#)/.test(href))return match;
 const origin=e.source.startsWith('notes.')?'https://notes.nagi.tw':'https://nagi.tw';
 const sourceRoute=e.aliases[0].startsWith('https:')?e.aliases[0]:origin+e.aliases[0];
 const resolved=new URL(href,sourceRoute);const target=aliases.get(resolved.pathname)||aliases.get(resolved.href);
 return ']('+(target??resolved.href)+')';
});
fs.writeFileSync(path.join(root,'src/data/migrated.json'),JSON.stringify(output,null,2)+'\n');
const count=type=>output.filter(r=>r.kind===type).length;
const report=`# Content migration audit\n\nGenerated by \`node scripts/migrate-content.mjs\`. Only explicit migration reads legacy siblings. Site builds use the committed local JSON and image. No private archive or internal medical project source is read.\n\nInventoried ${records.length} Markdown files; imported ${output.length} public editions (${count('journal')} journal, ${count('project')} project, ${count('lab')} lab, ${count('research')} research, ${count('report')} report, ${count('experience')} experience, ${count('reference')} reference). Chinese and English are independent editions; unavailable translations are not invented.\n\n## Decisions and limits\n\n- Legacy config exclusions and published:false quarantine the full translation group, including the mismatched speaking/teaching pages. No teaching record is promoted from an unpublished source.\n- Current Notes articles supersede duplicate Hexo posts; original dated URLs are retained in aliases. Japanese editions remain on Notes and are inventoried, not imported.\n- Public medical reflections and public project summaries are retained. MedTrust public presentation HTML becomes inert Markdown, with explicit prototype limitations intact. No implementation repository or private archive is accessed.\n- Empty records and navigation templates do not become completed articles. Lab statuses distinguish archival notes, completed learning notes, and learning plans. Source claims are historical author statements, not independently verified outcomes.\n- CYBERSEC cover was visually checked: conference signage, no personal identity. It is copied locally. Identity/brand covers are omitted; no screenshot with personal identifiers is copied. No inline Markdown images were found in the imported source bodies.\n- Known identity labels and personal contact details are sanitized; named teammate attribution is generalized. No prohibited certification claim is imported.\n- The report records paths, not unpublished body text. A missing target means deliberate exclusion/manual review. Original navigation/profile pages are replaced by the new site's curated pages.\n- Local Markdown links map to imported canonical pages when available; other links preserve the original public origin. Publishing aliases/redirects is handled by the site route layer.\n\n## Complete source inventory\n\n| Original source | Language | Publish status | Target | Decision |\n|---|---|---|---|---|\n${inventory.map(r=>'| '+[r.original,r.language,r.publish,r.target,r.decision].map(x=>String(x).replaceAll('|','\\|')).join(' | ')+' |').join('\n')}\n`;
fs.writeFileSync(path.join(root,'docs/content-migration.md'),report);
console.log(JSON.stringify({inventoried:records.length,imported:output.length,kinds:Object.fromEntries([...new Set(output.map(e=>e.kind))].map(k=>[k,count(k)])),localAssets:1}));
