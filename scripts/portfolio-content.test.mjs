import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
for (const prefix of ['', 'zh/']) {
  const html = readFileSync(`dist/${prefix}index.html`, 'utf8');
  const titles = prefix
    ? ['精選研究', '精選專案', '漏洞通報', '最新札記', '在經歷中累積視角。']
    : [
        'Selected Research',
        'Selected Projects',
        'Vulnerability Disclosure',
        'Latest Journal',
        'Perspective, over time.',
      ];
  let position = 0;
  for (const title of titles) {
    const next = html.indexOf(title, position);
    assert.ok(next >= position, title);
    position = next + title.length;
  }
  const projects = html.slice(
    html.indexOf(prefix ? '精選專案' : 'Selected Projects'),
    html.indexOf('id="vulnerability-disclosure"'),
  );
  assert.equal(
    (projects.match(/<article/g) ?? []).length,
    6,
    'Six author-approved public projects',
  );
  assert.match(projects, /aeust-life-overview/);
  assert.match(projects, /aeust-research-overview/);
  assert.match(
    readFileSync(`dist/${prefix}projects/index.html`, 'utf8'),
    /medtrust/,
  );
  assert.match(
    readFileSync(`dist/${prefix}projects/index.html`, 'utf8'),
    /bugtraceai-cli-contributions/,
  );
  assert.ok(
    existsSync(`dist/${prefix}projects/aeust-life-overview/index.html`),
  );
  const disclosure = readFileSync(
    `dist/${prefix}disclosures/index.html`,
    'utf8',
  );
  assert.match(disclosure, /ZD-2026-01297/);
  assert.doesNotMatch(disclosure, /CVE-\d/);
  assert.match(html, /disclosures\/zd-2026-01297\//);
  const detail = readFileSync(
    `dist/${prefix}disclosures/zd-2026-01297/index.html`,
    'utf8',
  );
  assert.match(detail, /大家都是電神/);
  assert.match(detail, /Low/);
  assert.match(
    detail,
    /https:\/\/zeroday.hitcon.org\/vulnerability\/all\/page\/16/,
  );
  assert.doesNotMatch(
    detail,
    /Web Application Logic Flaw|2026-10-22|<time|CVE-\d/,
  );
  for (const slug of [
    'nagi-zero',
    'ruralmed-sat',
    'nagi-medical-agent',
    'nagi-smart-hospital',
    'aeust-research',
  ])
    assert.ok(
      existsSync(`dist/${prefix}projects/${slug}-overview/index.html`),
      'Author-approved public summaries have bilingual routes',
    );
}
console.log(
  'PASS bilingual ordering, six selected projects, preserved projects and confirmed public disclosure without unverified fields',
);
