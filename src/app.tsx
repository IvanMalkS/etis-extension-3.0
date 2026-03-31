import { useEffect } from 'preact/hooks';
import { initializeTheme } from './modules/theme';
import { modifySidebar } from './modules/sidebar';
import { useMediaQuery } from './hooks/useMediaQuery';
import MobileNavbar from './modules/components/MobileNavbar';
import Onboarding from './modules/components/Onboarding';
import { makeTablesScrollable } from './modules/tables';
import { SELECTORS, PAGES } from './modules/constants';

import * as Pages from './modules/pages';

const PAGE_HANDLERS: Record<string, () => void> = {
    [PAGES.timetable]: Pages.modifyTimetablePage,
    [PAGES.teachers]: Pages.modifyTeachersPage,
    [PAGES.announce]: Pages.modifyAnnouncementsPage,
    [PAGES.teacherNotes]: Pages.modifyTeacherNotesPage,
    [PAGES.teachPlan]: Pages.modifyTeachPlanPage,
    [PAGES.portfolio]: Pages.modifyPortfolioPage,
    [PAGES.changePassForm]: Pages.modifyChangePasswordPage,
    [PAGES.changePass]: Pages.modifyChangePasswordPage,
    [PAGES.changeEmail]: Pages.modifyChangeEmailPage,
    [PAGES.certificates]: Pages.modifyCertificatesPage,
    [PAGES.signs]: Pages.modifySignsPage,
};

function ensureViewportMetaTag(): void {
    if (document.querySelector(SELECTORS.common.viewportMeta)) {
        return;
    }

    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';

    document.head.appendChild(meta);
    console.log('ETIS 3.0: Viewport meta tag injected.');
}

export function App() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        console.log('ETIS 3.0 App: Applying modifications...');
        ensureViewportMetaTag();

        initializeTheme();

        const page = window.location.pathname.split('/').pop() || '';
        const mainContent = document.querySelector(SELECTORS.common.mainContent);
        const loginPage = document.querySelector(SELECTORS.login.pageBody);

        if (mainContent) {
            modifySidebar();
            makeTablesScrollable();

            const handler = PAGE_HANDLERS[page];
            if (handler) {
                handler();
            }
        } else if (loginPage) {
            Pages.modifyLoginPage();
        }
    }, []);

    return (
        <>
            {isMobile && <MobileNavbar />}
            <Onboarding />
        </>
    );
}

export default App;
