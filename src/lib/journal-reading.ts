export function enhanceJournal(article: HTMLElement) {
  const content = article.querySelector<HTMLElement>('.journal-content');
  const body = article.querySelector<HTMLElement>('[data-article-body]');
  const progress = article.querySelector<HTMLProgressElement>('.journal-progress');
  if (!content || !body || !progress) return;

  const labels = article.dataset;
  const headings = Array.from(body.querySelectorAll<HTMLElement>('h2[id], h3[id]'));
  const links = Array.from(article.querySelectorAll<HTMLAnchorElement>('[data-section]'));
  const sectionIds = new Set(links.map(link => link.dataset.section));
  const sections = headings.filter(heading => sectionIds.has(heading.id));
  for (const heading of headings) {
    const title = heading.textContent?.trim();
    const permalink = document.createElement('a');
    permalink.className = 'journal-permalink';
    permalink.href = `#${encodeURIComponent(heading.id)}`;
    permalink.setAttribute('aria-label', title ? `${labels.permalink}: ${title}` : labels.permalink!);
    if (title && !heading.hasAttribute('aria-label') && !heading.hasAttribute('aria-labelledby')) {
      heading.setAttribute('aria-label', title);
    }
    heading.append(permalink);
  }

  addCodeControls(body, labels);

  let active: string | undefined;
  let frame: number | undefined;
  const update = () => {
    frame = undefined;
    const viewport = document.documentElement.clientHeight;
    const bounds = content.getBoundingClientRect();
    const visible = viewport - bounds.top;
    const percent = bounds.height ? Math.floor(Math.min(1, Math.max(0, visible / bounds.height)) * 100) : 0;
    if (progress.value !== percent) progress.value = percent;
    const atBottom = window.scrollY + viewport >= document.documentElement.scrollHeight - 1;
    const target = atBottom ? body.querySelector<HTMLElement>(':target') : null;
    const targetTop = target?.getBoundingClientRect().top;
    // A fragment near the end may be visible even when it cannot scroll to the reading line.
    const next = target && sections.includes(target) && targetTop !== undefined && targetTop >= 0 && targetTop < viewport
      ? target.id
      : sections.findLast(heading => heading.getBoundingClientRect().top <= Math.min(96, viewport / 4))?.id;
    if (active === next) return;
    active = next;
    for (const link of links) {
      if (link.dataset.section === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  const schedule = () => { frame ??= requestAnimationFrame(update); };
  progress.hidden = false;
  schedule();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  new ResizeObserver(schedule).observe(article);
}

function addCodeControls(body: HTMLElement, labels: DOMStringMap) {
  const blocks = body.querySelectorAll<HTMLElement>('pre > code');
  if (!blocks.length || !labels.copyCode || !labels.copied || !labels.copyFailed) return;
  const { copyCode, copied, copyFailed } = labels;
  const status = document.createElement('span');
  status.className = 'journal-copy-status';
  status.setAttribute('role', 'status');
  body.append(status);
  let announcement: number | undefined;

  for (const code of blocks) {
    const pre = code.parentElement!;
    const wrapper = document.createElement('div');
    wrapper.className = 'journal-code-block';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'journal-copy';
    button.textContent = copyCode;
    let reset: number | undefined;
    button.addEventListener('click', async () => {
      let message: string;
      try {
        await navigator.clipboard.writeText(code.textContent ?? '');
        message = copied;
      } catch {
        message = copyFailed;
      }
      button.textContent = message;
      status.textContent = '';
      window.clearTimeout(announcement);
      announcement = window.setTimeout(() => { status.textContent = message; }, 50);
      window.clearTimeout(reset);
      reset = window.setTimeout(() => { button.textContent = copyCode; }, 2000);
    });
    pre.before(wrapper);
    wrapper.append(button, pre);
  }
}
