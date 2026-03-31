/**
 * Этот скрипт предназначен для мгновенной установки темы при загрузке страницы.
 * Он должен быть внедрен на этапе 'document_start' (до отрисовки DOM).
 */
(function () {
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
