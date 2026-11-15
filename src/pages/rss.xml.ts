import { content } from '../lib/content';
import type { APIRoute } from 'astro';
const xml = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const GET: APIRoute = ({ site }) => {
 const base = import.meta.env.BASE_URL.replace(/\/$/, '');
 const origin = site!.origin;
 const items = content.filter(r => r.kind === 'journal').map(r => `<item><title>${xml(r.title)}</title><link>${origin}${base}${r.route}</link><guid>${origin}${base}${r.route}</guid><description>${xml(r.description)}</description></item>`).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Nagi</title><link>${origin}${base}/zh/</link><description>Nagi public journal / 公開日誌</description>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
