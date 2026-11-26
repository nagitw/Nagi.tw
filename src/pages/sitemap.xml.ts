import type { APIRoute } from 'astro';
import { detailCollections, getPublished, contentHref } from '../lib/content';
import { withBase } from '../lib/i18n';
import { publicDisclosures } from '../lib/disclosures';

export const GET: APIRoute = async ({ site }) => {
  const sections = [
    '',
    'projects/',
    'research/',
    'journal/',
    'photography/',
    'experience/',
    'about/',
    'search/',
    'disclosures/',
  ];
  const paths = sections.flatMap((section) => [
    withBase(`/${section}`),
    withBase(`/zh/${section}`),
  ]);
  for (const record of publicDisclosures)
    paths.push(
      withBase(`/disclosures/${record.slug}/`),
      withBase(`/zh/disclosures/${record.slug}/`),
    );
  for (const collection of detailCollections) {
    for (const entry of await getPublished(collection))
      paths.push(contentHref(entry));
  }
  const escape = (value: string) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('"', '&quot;');
  const urls = [...new Set(paths)]
    .sort()
    .map((path) => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    },
  );
};
