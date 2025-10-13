import { useEffect } from 'preact/hooks';

import { initializeTheme } from './modules/theme';
import { modifySidebar } from './modules/sidebar';

import * as Pages from './modules/pages';

export function App() {
    useEffect(() => {
        console.log('ETIS 2.1 App: Applying modifications...');

        initializeTheme();

        const page = window.location.pathname.split('/').pop() || '';
        const mainContent = document.querySelector('div.span9');
        const loginPage = document.querySelector('body > div.login');

        if (mainContent) {
            modifySidebar();

            switch (page) {
                case 'stu.timetable':
                    Pages.modifyTimetablePage();
                    break;
                case 'stu.teachers':
                    Pages.modifyTeachersPage();
                    break;
                case 'stu.announce':
                    Pages.modifyAnnouncementsPage();
                    break;
                case 'stu.teacher_notes':
                    Pages.modifyTeacherNotesPage();
                    break;
                case 'stu.teach_plan':      
                    Pages.modifyTeachPlanPage(); 
                    break;
                case 'stu.sc_portfolio':    
                    Pages.modifyPortfolioPage(); 
                    break;
                case 'stu.change_pass_form':
                case 'stu.change_pass':    
                    Pages.modifyChangePasswordPage(); 
                    break;
                case 'stu_email_pkg.change_email': 
                    Pages.modifyChangeEmailPage(); 
                    break;
                case 'cert_pkg.stu_certif': 
                    Pages.modifyCertificatesPage(); 
                    break;
                case 'stu.signs':           
                    Pages.modifySignsPage(); 
                    break;
            }
        } else if (loginPage) {
            Pages.modifyLoginPage();
        }
    }, []);

    return null;
}

export default App;
