import { createIndex } from 'pagefind';
import { readdirSync, readFileSync } from 'node:fs';
const { index } = await createIndex({
  excludeSelectors: [
    '[data-pagefind-ignore]',
    'header.site-header',
    'footer.site-footer',
  ],
});
if (!index) throw new Error('Pagefind index could not be created');
let count = 0;
for (const file of readdirSync('dist', { recursive: true }).filter((file) =>
  file.endsWith('.html'),
)) {
  const path = file.replaceAll('\\', '/');
  const content = readFileSync(`dist/${path}`, 'utf8');
  if (
    /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(content) ||
    /(?:^|\/)search\/index\.html$/.test(path)
  )
    continue;
  const result = await index.addHTMLFile({
    url: '/' + path.replace(/index\.html$/, ''),
    content,
  });
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  count++;
}
const output = await index.writeFiles({ outputPath: 'dist/pagefind' });
if (output.errors.length) throw new Error(output.errors.join('\n'));
await index.deleteIndex();
console.log(
  `Pagefind: indexed ${count} public pages; noindex/search pages excluded`,
);
