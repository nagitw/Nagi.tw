import { createIndex } from 'pagefind';
const { index } = await createIndex({
  excludeSelectors: [
    '[data-pagefind-ignore]',
    'header.site-header',
    'footer.site-footer',
  ],
});
if (!index) throw new Error('Pagefind index could not be created');
const result = await index.addDirectory({ path: 'dist' });
if (result.errors.length) throw new Error(result.errors.join('\n'));
const output = await index.writeFiles({ outputPath: 'dist/pagefind' });
if (output.errors.length) throw new Error(output.errors.join('\n'));
await index.deleteIndex();
console.log(`Pagefind: indexed ${result.page_count} public pages`);
