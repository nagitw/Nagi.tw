import { content } from '../lib/content';

// Public, build-time retrieval manifest. No draft source or backend configuration is serialized.
// The existing Raspberry Pi/API client contract is unchanged.
export function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return Response.json(content.map(({ title, description, route, locale, kind }) => ({
    title, description, url: base + route, locale, kind,
  })));
}
