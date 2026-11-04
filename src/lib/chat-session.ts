/** Invalidates asynchronous callbacks when the dialog closes or a request is replaced. */
export class ChatSession {
  private current?: AbortController;
  start(): AbortController { this.close(); this.current = new AbortController(); return this.current; }
  close(): void { this.current?.abort(); this.current = undefined; }
  owns(request: AbortController): boolean { return this.current === request; }
  interrupt(): void { this.current?.abort(); }
}
