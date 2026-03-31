import browser from 'webextension-polyfill';
import { initializeTheme } from './modules/theme';

interface CachedTimetable {
    html: string;
    timestamp: number;
}

document.addEventListener('DOMContentLoaded', async () => {
    initializeTheme();

    const data = (await browser.storage.local.get('cached_timetable')) as {
        cached_timetable?: CachedTimetable;
    };
    const viewer = document.getElementById('content-viewer');
    const timestampElem = document.getElementById('offline-timestamp');

    if (data.cached_timetable && viewer && timestampElem) {
        const { html, timestamp } = data.cached_timetable;

        const dateStr = new Date(timestamp).toLocaleString('ru-RU');
        timestampElem.innerText = `Последнее обновление: ${dateStr}`;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const allElements = tempDiv.querySelectorAll('*');
        allElements.forEach((el) => {
            Array.from(el.attributes).forEach((attr) => {
                if (attr.name.startsWith('on')) {
                    el.removeAttribute(attr.name);
                }
            });
            if (el.tagName === 'SCRIPT') {
                el.remove();
            }
        });

        viewer.innerHTML = `<div class="container-fluid"><div class="row-fluid"><div class="span9">${tempDiv.innerHTML}</div></div></div>`;

        const tables = viewer.querySelectorAll('table');
        tables.forEach((t) => {
            if (!t.parentElement?.classList.contains('table-scroll-wrapper')) {
                const wrap = document.createElement('div');
                wrap.className = 'table-scroll-wrapper';
                t.parentElement?.insertBefore(wrap, t);
                wrap.appendChild(t);
            }
        });
    }
});
