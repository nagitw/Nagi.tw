export function initPhotoViewer() {
  const dialog = document.querySelector<HTMLDialogElement>(
    '[data-photo-dialog]',
  );
  const full = dialog?.querySelector<HTMLImageElement>('[data-photo-full]');
  const caption = dialog?.querySelector<HTMLElement>('[data-photo-caption]');
  if (!dialog || !full || !caption || dialog.dataset.enhanced) return;
  dialog.dataset.enhanced = 'true';
  for (const image of document.querySelectorAll<HTMLImageElement>(
    '.photo-gallery img',
  )) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-open';
    button.setAttribute(
      'aria-label',
      `${document.documentElement.lang === 'en' ? 'View photo' : '檢視圖片'}: ${image.alt}`,
    );
    image.before(button);
    button.append(image);
    button.addEventListener('click', () => {
      full.src = image.currentSrc || image.src;
      full.alt = image.alt;
      caption.textContent =
        image.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
      dialog.showModal();
    });
  }
  dialog
    .querySelector('[data-photo-close]')
    ?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
