import { useState, useEffect } from 'preact/hooks';
import ThemeSwitcherButton from './ThemeSwitcher';
import { CLASSES, SELECTORS, PAGES } from '../constants';

type NavLink = {
    href: string;
    icon?: string;
    text: string;
    rawHtml?: string;
    hasIndicator?: boolean;
};

/**
 * Парсит десктопный сайдбар и генерирует массив объектов NavLink.
 * @returns Массив ссылок, найденных в сайдбаре.
 */
function generateLinksFromSidebar(): NavLink[] {
    const sidebar = document.querySelector<HTMLElement>(SELECTORS.common.sidebar);
    if (!sidebar) {
        return [];
    }

    const links: NavLink[] = [];
    const anchorElements = sidebar.querySelectorAll<HTMLAnchorElement>('ul.nav > li > a');

    anchorElements.forEach((anchor) => {
        const themeSwitcherIcon = anchor.querySelector(SELECTORS.sidebar.themeSwitcherIcon);

        if (
            themeSwitcherIcon instanceof HTMLElement &&
            themeSwitcherIcon.innerText === 'brightness_6'
        ) {
            return;
        }

        const href = anchor.getAttribute('href');
        if (href) {
            links.push({
                href,
                text: anchor.innerText.trim(),
                rawHtml: anchor.children.length > 0 ? anchor.innerHTML : undefined,
                hasIndicator: !!anchor.querySelector(`.${CLASSES.sidebar.badgePoint}`),
            });
        }
    });

    return links;
}

export default function MobileNavbar() {
    const [isSheetOpen, setSheetOpen] = useState(false);
    const [activePage, setActivePage] = useState('');
    const [allLinks, setAllLinks] = useState<NavLink[]>([]);

    useEffect(() => {
        const currentPage = window.location.pathname.split('/').pop() || '';
        setActivePage(currentPage);
        setAllLinks(generateLinksFromSidebar());
    }, []);

    const toggleSheet = () => setSheetOpen(!isSheetOpen);

    const mainButtonHrefs: string[] = [PAGES.timetable, PAGES.signs, PAGES.announce];
    const mainButtons: NavLink[] = [
        { href: PAGES.timetable, icon: 'today', text: 'Расписание' },
        { href: PAGES.signs, icon: 'assessment', text: 'Оценки' },
        { href: PAGES.announce, icon: 'campaign', text: 'Объявления' },
    ];

    const moreLinks = allLinks.filter((link) => !mainButtonHrefs.includes(link.href.split('?')[0]));


    return (
        <div className={CLASSES.mobile.container}>
            <nav className={CLASSES.mobile.nav}>
                {mainButtons.map((btn) => (
                    <a
                        key={btn.href}
                        href={btn.href}
                        className={`${CLASSES.mobile.button} ${
                            activePage.split('?')[0] === btn.href ? CLASSES.common.active : ''
                        }`}
                    >
                        <span className={CLASSES.common.materialIcons}>{btn.icon}</span>
                    </a>
                ))}
                <button
                    className={CLASSES.mobile.button}
                    onClick={toggleSheet}
                    aria-label="Открыть больше опций"
                >
                    <span className={CLASSES.common.materialIcons}>menu</span>
                </button>
            </nav>

            <div
                className={`${CLASSES.mobile.overlay} ${isSheetOpen ? CLASSES.mobile.visible : ''}`}
                onClick={toggleSheet}
            />
            <div className={`${CLASSES.mobile.sheet} ${isSheetOpen ? CLASSES.mobile.visible : ''}`}>
                <div className={CLASSES.mobile.handle} />
                <div className={CLASSES.mobile.links}>
                    <ThemeSwitcherButton />
                    {moreLinks.map((link) => (
                        <a key={link.href} href={link.href}>
                            {link.icon && (
                                <span className={CLASSES.common.materialIcons}>{link.icon}</span>
                            )}
                            {link.rawHtml ? (
                                <span dangerouslySetInnerHTML={{ __html: link.rawHtml }} />
                            ) : (
                                <span>{link.text}</span>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}


