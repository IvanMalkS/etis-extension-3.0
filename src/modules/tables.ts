import { CLASSES, SELECTORS } from './constants';

/**
 * Находит все таблицы с классом .common на странице и оборачивает их
 * в контейнер с горизонтальной прокруткой для адаптивности.
 */
export function makeTablesScrollable(): void {
    const tables = document.querySelectorAll<HTMLTableElement>(SELECTORS.common.tablesCommon);

    if (tables.length === 0) {
        return;
    }

    tables.forEach((table) => {
        if (table.parentElement?.classList.contains(CLASSES.common.tableScrollWrapper)) {
            return;
        }

        if (table.style.width === '100%') {
            table.style.width = '';
        }

        const wrapper = document.createElement('div');
        wrapper.className = CLASSES.common.tableScrollWrapper;

        table.parentElement?.insertBefore(wrapper, table);

        wrapper.appendChild(table);
    });
}
