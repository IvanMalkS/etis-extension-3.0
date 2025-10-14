/**
 * Находит все таблицы с классом .common на странице и оборачивает их
 * в контейнер с горизонтальной прокруткой для адаптивности.
 */
export function makeTablesScrollable(): void {
    const tables = document.querySelectorAll<HTMLTableElement>('table.common');

    if (tables.length === 0) {
        return;
    }

    tables.forEach((table) => {
        if (table.parentElement?.classList.contains('table-scroll-wrapper')) {
            return;
        }

        if (table.style.width === '100%') {
            table.style.width = '';
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'table-scroll-wrapper';

        table.parentElement?.insertBefore(wrapper, table);

        wrapper.appendChild(table);
    });
}
