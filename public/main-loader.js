(async () => {
  const src = chrome.runtime.getURL('content-script.js');
  await import(src);
})();
