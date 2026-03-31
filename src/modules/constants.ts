/**
 * Константы для CSS-классов.
 */
export const CLASSES = {
    common: {
        materialIcons: 'material-icons',
        active: 'active',
        iconButton: 'icon-button',
        iconButton2: 'icon-button2',
        tableScrollWrapper: 'table-scroll-wrapper',
        flexRow: 'flex-row',
    },
    mobile: {
        container: 'mobile-nav-container',
        nav: 'mobile-nav',
        button: 'mobile-nav-button',
        overlay: 'bottom-sheet-overlay',
        sheet: 'bottom-sheet',
        handle: 'bottom-sheet-handle',
        links: 'bottom-sheet-links',
        visible: 'visible',
    },
    sidebar: {
        badgePoint: 'badge-point',
        warnMenu: 'warn_menu',
    },
    pages: {
        timetable: {
            buttonbar: 'timetable-buttonbar',
            button: 'timetable-btn',
            consultations: 'consultations',
            iconFeedback: 'icon-feedback',
            iconToday: 'icon-today',
            pairTeacher: 'pair_teacher',
        },
        login: {
            container: 'login-container',
            forgotPassword: 'forgot-password',
            footer: 'footer',
            psuLogo: 'psu-logo',
            loginActions: 'login-actions',
            formInfo: 'form-info',
        },
        teachPlan: {
            container: 'teach-plan',
        },
        certificates: {
            info: 'certificates-info',
        },
        signs: {
            tooltip: 'sign-tooltip',
            tooltipWrapper: 'sign-tooltip-wrapper',
            tooltipTriangle: 'sign-tooltip-triangle',
            triangleLegacy: 'tooltipTriangle',
        },
        announce: {
            message: 'message',
            header: 'message-header',
            pages: 'message-pages',
            item: 'item',
            items: 'items',
        },
    },
} as const;

/**
 * Константы для путей страниц ETIS.
 */
export const PAGES = {
    timetable: 'stu.timetable',
    teachers: 'stu.teachers',
    announce: 'stu.announce',
    teacherNotes: 'stu.teacher_notes',
    teachPlan: 'stu.teach_plan',
    tpr: 'stu.tpr',
    portfolio: 'stu.sc_portfolio',
    changePassForm: 'stu.change_pass_form',
    changePass: 'stu.change_pass',
    changeEmail: 'stu_email_pkg.change_email',
    sendREmail: 'stu_email_pkg.send_r_email',
    certificates: 'cert_pkg.stu_certif',
    signs: 'stu.signs',
    logout: 'stu.logout',
    changePrPage: 'stu.change_pr_page',
    addSnils: 'stu_plus.add_snils',
    eblChoice: 'ebl_stu.ebl_choice',
} as const;

/**
 * Константы для селекторов (querySelector, getElementById и др.).
 */
export const SELECTORS = {
    common: {
        mainContent: 'div.span9',
        sidebar: 'div.span3',
        viewportMeta: 'meta[name="viewport"]',
        tablesCommon: 'table.common, table.slimtab_nice',
        anchor: 'a',
        input: 'input',
        label: 'label',
        img: 'img',
        h3: 'h3',
        li: 'li',
        bold: 'b',
    },
    sidebar: {
        menuItems: '.nav.nav-tabs.nav-stacked > li',
        lastNav: 'ul:nth-last-child(1)',
        themeSwitcherIcon: `.${CLASSES.common.materialIcons}`,
    },
    login: {
        pageBody: 'body > div.login',
        form: '#form',
        items: '.items',
        container: `.${CLASSES.pages.login.container}`,
        submitButton: 'sbmt', // ID
        optionalChoose: 'div.choose',
        headerMessage: 'div.header_message',
        errorMessage: 'div.error_message',
    },
    timetable: {
        consultations: `div.${CLASSES.pages.timetable.consultations}`,
        oldConsultations: 'div:nth-child(6)',
        feedbackLink: 'a.estimate_tt',
        todayLink: 'a[href*="p_what=1"]',
        pairs: 'div.day > table > tbody > tr',
        teacherSpan: 'span.teacher',
        pairJour: 'td.pair_jour',
    },
    announce: {
        message: `.${CLASSES.pages.announce.message}`,
        pages: `.${CLASSES.pages.announce.pages}`,
        brElements: 'li > br',
        listItems: 'li',
        boldNode: 'b',
    },
    signs: {
        tooltipTriangle: 'path.tooltipTriangle',
    },
    teachPlan: {
        feedbackLinkAdvanced: 'a:nth-child(2)',
        container: 'div:nth-child(2)',
        feedbackLinkShort: 'div.teach-plan > div > a',
    },
} as const;

/**
 * Константы для параметров страниц (p_mode и др.).
 */
export const MODES = {
    teachPlan: {
        advanced: 'advanced',
        short: 'short',
    },
} as const;
