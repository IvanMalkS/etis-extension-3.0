import { PAGES, SELECTORS, CLASSES, MODES } from '../constants';

/**
 * Модифицирует страницы учебного плана ("stu.teach_plan", "stu.tpr").
 * Определяет, какая версия страницы открыта (короткая, расширенная, темы),
 * и применяет соответствующие стили и классы.
 */
export function modifyTeachPlanPage(): void {
    const mainContent = document.querySelector<HTMLElement>(SELECTORS.common.mainContent);
    if (!mainContent) {
        console.error('ETIS 3.0: Main content container (.span9) not found on teach plan page.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const pageMode = urlParams.get('p_mode');
    const page = window.location.pathname.split('/').pop() || '';

    if (page === PAGES.teachPlan) {
        handleTeachPlanPage(mainContent, pageMode);
    } else if (page === PAGES.tpr) {
        handleTprPage(mainContent);
    }
}

/**
 * Обрабатывает основную страницу учебного плана (stu.teach_plan).
 * @param mainContent - Основной контейнер контента.
 * @param pageMode - Параметр p_mode из URL ('advanced', 'short', или null).
 */
function handleTeachPlanPage(mainContent: HTMLElement, pageMode: string | null): void {
    switch (pageMode) {
        case MODES.teachPlan.advanced:
            const feedbackLinkAdvanced = mainContent.querySelector<HTMLAnchorElement>(
                SELECTORS.teachPlan.feedbackLinkAdvanced,
            );
            if (feedbackLinkAdvanced) {
                feedbackLinkAdvanced.className = `${CLASSES.common.iconButton} ${CLASSES.pages.timetable.iconFeedback}`;
                feedbackLinkAdvanced.innerText = 'Оставить отзыв';
            }
            break;

        case MODES.teachPlan.short:
        case null:
            const teachPlanContainer = mainContent.querySelector<HTMLElement>(
                SELECTORS.teachPlan.container,
            );
            if (teachPlanContainer) {
                teachPlanContainer.className = CLASSES.pages.teachPlan.container;
            }

            const feedbackLinkShort = mainContent.querySelector<HTMLAnchorElement>(
                SELECTORS.teachPlan.feedbackLinkShort,
            );
            if (feedbackLinkShort) {
                feedbackLinkShort.className = `${CLASSES.common.iconButton} ${CLASSES.pages.timetable.iconFeedback}`;
                feedbackLinkShort.innerText = 'Оставить отзыв';
            }
            break;
    }
}

/**
 * Обрабатывает страницу тем и разделов (stu.tpr).
 * @param mainContent - Основной контейнер контента.
 */
function handleTprPage(mainContent: HTMLElement): void {
    const feedbackLink = mainContent.querySelector<HTMLAnchorElement>(SELECTORS.common.anchor);
    if (feedbackLink) {
        feedbackLink.className = `${CLASSES.common.iconButton} ${CLASSES.pages.timetable.iconFeedback}`;
        feedbackLink.innerText = 'Оставить отзыв';
    }
}
