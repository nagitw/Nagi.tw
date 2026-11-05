import { content } from '../lib/content';
export function GET() {
 const base = import.meta.env.BASE_URL.replace(/\/$/, '');
 return Response.json(content.map(({ title, description, route, locale, kind }) => ({ title, description, url: base + route, locale, kind })));
}
