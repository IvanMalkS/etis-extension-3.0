import { useState, useEffect } from 'preact/hooks';
import ThemeSwitcherButton from './ThemeSwitcher';

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
    const sidebar = document.querySelector<HTMLElement>('div.span3');
    if (!sidebar) {
        return [];
    }

    const links: NavLink[] = [];
    const anchorElements = sidebar.querySelectorAll<HTMLAnchorElement>('ul.nav > li > a');

    anchorElements.forEach((anchor) => {
        const themeSwitcherIcon = anchor.querySelector('.material-icons');

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
                hasIndicator: !!anchor.querySelector('.badge-point'),
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

    const mainButtonHrefs = ['stu.timetable', 'stu.signs', 'stu.announce'];
    const mainButtons: NavLink[] = [
        { href: 'stu.timetable', icon: 'today', text: 'Расписание' },
        { href: 'stu.signs', icon: 'assessment', text: 'Оценки' },
        { href: 'stu.announce', icon: 'campaign', text: 'Объявления' },
    ];

    const moreLinks = allLinks.filter((link) => !mainButtonHrefs.includes(link.href.split('?')[0]));

    return (
        <div className="mobile-nav-container">
            <nav className="mobile-nav">
                {mainButtons.map((btn) => (
                    <a
                        key={btn.href}
                        href={btn.href}
                        className={`mobile-nav-button ${activePage.split('?')[0] === btn.href ? 'active' : ''}`}
                    >
                        <span className="material-icons">{btn.icon}</span>
                    </a>
                ))}
                <button
                    className="mobile-nav-button"
                    onClick={toggleSheet}
                    aria-label="Открыть больше опций"
                >
                    <span className="material-icons">menu</span>
                </button>
            </nav>

            <div
                className={`bottom-sheet-overlay ${isSheetOpen ? 'visible' : ''}`}
                onClick={toggleSheet}
            />
            <div className={`bottom-sheet ${isSheetOpen ? 'visible' : ''}`}>
                <div className="bottom-sheet-handle" />
                <div className="bottom-sheet-links">
                    <ThemeSwitcherButton />
                    {moreLinks.map((link) => (
                        <a key={link.href} href={link.href}>
                            {link.icon && <span className="material-icons">{link.icon}</span>}
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
