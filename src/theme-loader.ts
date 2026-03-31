/**
 * Этот скрипт предназначен для мгновенной установки темы при загрузке страницы.
 * Он должен быть внедрен на этапе 'document_start' (до отрисовки DOM).
 */
(function () {
  // 1. Мгновенная установка Viewport для адаптива
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.head ? document.head.appendChild(meta) : document.documentElement.appendChild(meta);
  }

  const theme = localStorage.getItem('theme') || 'auto';
  let themeToApply = 'light';

  if (theme === 'dark') {
    themeToApply = 'dark';
  } else if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeToApply = prefersDark ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('theme', themeToApply);
})();
