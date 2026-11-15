import { publicApiEndpoint } from './penguin-ai.ts';
export function resolveChatConfig(settings: { mode?: string; endpoint?: string }, _production: boolean): { mode: 'offline' | 'mock' | 'api'; endpoint: string } {
  const mode = settings.mode || 'offline';
  if (mode === 'mock') {
    return { mode, endpoint: '' };
  }
  if (mode === 'offline') return { mode, endpoint: '' };
  if (mode !== 'api' || !settings.endpoint || !publicApiEndpoint(settings.endpoint)) throw new Error('API mode requires an explicit HTTPS endpoint');
  return { mode, endpoint: settings.endpoint };
}
