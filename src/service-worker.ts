declare const browser: any;
import 'webextension-polyfill';

const CACHE_NAME = 'etis-2-1-offline-cache-v1';
const OFFLINE_FALLBACK_PAGE_PATH = 'offline.html';

/**
 * Обработчик установки Service Worker.
 * Вызывается один раз при установке или обновлении расширения.
 * Кеширует страницу для офлайн-доступа.
 */
self.addEventListener('install', (event) => {
    console.log('ETIS 2.1 Service Worker: Install event triggered.');
    const e = event as ExtendableEvent;
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            const offlineUrl = browser.runtime.getURL(OFFLINE_FALLBACK_PAGE_PATH);
            console.log(`ETIS 2.1 Service Worker: Caching offline fallback page from URL: ${offlineUrl}`);
            return cache.add(offlineUrl);
        }),
    );
});

/**
 * Обработчик активации Service Worker.
 * Вызывается после установки и отвечает за очистку старых кешей.
 */
self.addEventListener('activate', (event) => {
    console.log('ETIS 2.1 Service Worker: Activate event triggered.');
    const e = event as ExtendableEvent;
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log(`ETIS 2.1 Service Worker: Deleting old cache: ${key}`);
                        return caches.delete(key);
                    }
                }),
            );
        }),
    );
});

/**
 * Обработчик перехвата сетевых запросов.
 * Если сетевой запрос навигации не удается,
 * он отвечает закешированной офлайн-страницей.
 */
self.addEventListener('fetch', (event) => {
    const e = event as FetchEvent;

    if (e.request.mode === 'navigate') {
        e.respondWith(
            (async () => {
                try {
                    return await fetch(e.request);
                } catch (error) {
                    console.log('ETIS 2.1 Service Worker: Network request failed. Serving offline page.');
                    const cache = await caches.open(CACHE_NAME);
                    const offlineUrl = browser.runtime.getURL(OFFLINE_FALLBACK_PAGE_PATH);
                    const cachedResponse = await cache.match(offlineUrl);
                    return cachedResponse!;
                }
            })(),
        );
    }
});