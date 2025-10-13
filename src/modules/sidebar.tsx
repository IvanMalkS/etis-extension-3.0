import { render } from 'preact';
import ThemeSwitcher from './components/ThemeSwitcher.tsx';

/**
 * Находит и модифицирует боковую панель.
 */
export function modifySidebar(): void {
    const sidebar = document.querySelector<HTMLElement>('div.span3');
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
    const menuItems = document.querySelectorAll<HTMLLIElement>('.nav.nav-tabs.nav-stacked > li');
    for (const item of menuItems) {
        const link = item.querySelector('a');
        if (link && link.href === window.location.href) {
            item.classList.add('active');
            break;
        }
    }
}

/**
 * Добавляет иконки в меню навигации и внедряет Preact-компонент ThemeSwitcher.
 */
function addCustomElements(sidebar: HTMLElement): void {
    const lastNav = sidebar.querySelector<HTMLUListElement>('ul:nth-last-child(1)');
    if (!lastNav) return;

    const themeSwitcherLi = document.createElement('li');
    lastNav.prepend(themeSwitcherLi);
    render(<ThemeSwitcher />, themeSwitcherLi);

    const links = lastNav.querySelectorAll<HTMLAnchorElement>('li > a');
    links.forEach((link) => {
        const parentLi = link.parentElement;
        if (!(parentLi instanceof HTMLLIElement) || link.parentElement === themeSwitcherLi) return;

        const navIcon = document.createElement('span');
        navIcon.className = 'material-icons';

        switch (link.getAttribute('href')) {
            case 'stu.change_pass_form':
                navIcon.innerHTML = 'vpn_key';
                break;
            case 'stu_email_pkg.change_email':
                navIcon.innerHTML = 'alternate_email';
                break;
            case 'stu.change_pr_page':
                navIcon.innerHTML = 'account_box';
                break;
            case 'stu.logout':
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
    const menuItems = document.querySelectorAll<HTMLLIElement>('.nav.nav-tabs.nav-stacked > li');
    menuItems.forEach((li) => {
        const link = li.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (
                href === 'stu_plus.add_snils' ||
                href === 'ebl_stu.ebl_choice' ||
                li.classList.contains('warn_menu')
            ) {
                const indicator = document.createElement('span');
                indicator.className = 'badge-point';
                link.appendChild(indicator);
            }
        }
    });
}
