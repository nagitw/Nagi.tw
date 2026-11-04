export type PenguinState = 'idle' | 'welcome' | 'curious' | 'thinking' | 'talking' | 'sleeping' | 'error';
export type PenguinEvent = 'wake' | 'enter' | 'leave' | 'ask' | 'chunk' | 'done' | 'sleep' | 'fail' | 'close';
export function transition(state: PenguinState, event: PenguinEvent): PenguinState {
  if (event === 'close' || event === 'done') return 'idle';
  if (event === 'ask') return 'thinking';
  if (event === 'fail') return 'error';
  if (event === 'chunk') return 'talking';
  if (state === 'thinking' || state === 'talking') return state;
  return ({ wake: 'welcome', enter: 'curious', leave: 'idle', sleep: 'sleeping' } as const)[event];
}
