import type { APIRoute } from 'astro';
import { journalFeed } from '../lib/feed';
export const GET: APIRoute = ({ site }) => journalFeed(site!, 'en');
