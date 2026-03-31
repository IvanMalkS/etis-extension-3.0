import browser from 'webextension-polyfill';

document.addEventListener('DOMContentLoaded', () => {
    const viewOfflineBtn = document.getElementById('view-offline');

    if (viewOfflineBtn) {
        viewOfflineBtn.addEventListener('click', () => {
            browser.tabs.create({
                url: browser.runtime.getURL('offline.html'),
            });
        });
    }
});
