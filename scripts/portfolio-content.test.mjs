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
    5,
    'Five verified public projects',
  );
  assert.match(projects, /aeust-life-overview/);
  assert.match(projects, /medtrust/);
  assert.ok(
    existsSync(`dist/${prefix}projects/aeust-life-overview/index.html`),
  );
  const disclosure = readFileSync(
    `dist/${prefix}disclosures/index.html`,
    'utf8',
  );
  assert.doesNotMatch(disclosure, /ZD-2026-01297|CVE-\d/);
  for (const slug of [
    'nagi-zero',
    'ruralmed-sat',
    'nagi-medical-agent',
    'nagi-smart-hospital',
    'aeust-research',
  ])
    assert.ok(
      !existsSync(`dist/${prefix}projects/${slug}/index.html`),
      'Unverified projects stay private',
    );
}
console.log(
  'PASS bilingual ordering, five public projects, new routes and disclosure attribution gate',
);
