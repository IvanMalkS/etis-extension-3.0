(async () => {
    const src = chrome.runtime.getURL('theme-loader.js');
    await import(src);
})();
