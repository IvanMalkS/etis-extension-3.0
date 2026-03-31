import { render } from 'preact';
import ThemeSwitcher from './components/ThemeSwitcher.tsx';
import { CLASSES, SELECTORS, PAGES } from './constants';

/**
 * Находит и модифицирует боковую панель.
 */
export function modifySidebar(): void {
    const sidebar = document.querySelector<HTMLElement>(SELECTORS.common.sidebar);
    if (!sidebar) return;

    restoreScrollPosition(sidebar);
    highlightActiveMenuItem();
    addCustomElements(sidebar);
    addPointIndicators();
}

/**
 * Сохраняет и восстанавливает позицию скролла боковой панели.
 */
function restoreScrollPosition(sidebar: HTMLElement): void {
    const top = sessionStorage.getItem('sidebar-scroll');
    if (top) {
        sidebar.scrollTop = parseInt(top, 10);
    }
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('sidebar-scroll', Math.round(sidebar.scrollTop).toString());
    });
}

/**
 * Находит текущую страницу в меню и добавляет ей класс 'active'.
 */
function highlightActiveMenuItem(): void {
    const menuItems = document.querySelectorAll<HTMLLIElement>(SELECTORS.sidebar.menuItems);
    for (const item of menuItems) {
        const link = item.querySelector(SELECTORS.common.anchor);
        if (link && link.href === window.location.href) {
            item.classList.add(CLASSES.common.active);
            break;
        }
    }
}

/**
 * Добавляет иконки в меню навигации и внедряет Preact-компонент ThemeSwitcher.
 */
function addCustomElements(sidebar: HTMLElement): void {
    const lastNav = sidebar.querySelector<HTMLUListElement>(SELECTORS.sidebar.lastNav);
    if (!lastNav) return;

    const themeSwitcherLi = document.createElement('li');
    lastNav.prepend(themeSwitcherLi);
    render(<ThemeSwitcher />, themeSwitcherLi);

    const links = lastNav.querySelectorAll<HTMLAnchorElement>(`li > ${SELECTORS.common.anchor}`);
    links.forEach((link) => {
        const parentLi = link.parentElement;
        if (!(parentLi instanceof HTMLLIElement) || link.parentElement === themeSwitcherLi) return;

        const navIcon = document.createElement('span');
        navIcon.className = CLASSES.common.materialIcons;

        switch (link.getAttribute('href')) {
            case PAGES.changePassForm:
                navIcon.innerHTML = 'vpn_key';
                break;
            case PAGES.changeEmail:
                navIcon.innerHTML = 'alternate_email';
                break;
            case PAGES.changePrPage:
                navIcon.innerHTML = 'account_box';
                break;
            case PAGES.logout:
                navIcon.innerHTML = 'exit_to_app';
                break;
        }
        if (navIcon.innerHTML) {
            link.prepend(navIcon);
        }
    });
}

/**
 * Добавляет цветные точки-индикаторы к важным пунктам меню.
 */
function addPointIndicators(): void {
    const menuItems = document.querySelectorAll<HTMLLIElement>(SELECTORS.sidebar.menuItems);
    menuItems.forEach((li) => {
        const link = li.querySelector(SELECTORS.common.anchor);
        if (link) {
            const href = link.getAttribute('href');
            if (
                href === PAGES.addSnils ||
                href === PAGES.eblChoice ||
                li.classList.contains(CLASSES.sidebar.warnMenu)
            ) {
                const indicator = document.createElement('span');
                indicator.className = CLASSES.sidebar.badgePoint;
                link.appendChild(indicator);
            }
        }
    });
}
