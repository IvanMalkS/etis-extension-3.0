/**
 * Модифицирует страницы учебного плана ("stu.teach_plan", "stu.tpr").
 * Определяет, какая версия страницы открыта (короткая, расширенная, темы),
 * и применяет соответствующие стили и классы.
 */
export function modifyTeachPlanPage(): void {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
    if (!mainContent) {
        console.error('ETIS 2.1: Main content container (.span9) not found on teach plan page.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const pageMode = urlParams.get('p_mode');
    const page = window.location.pathname.split('/').pop() || '';

    if (page === 'stu.teach_plan') {
        handleTeachPlanPage(mainContent, pageMode);
    } else if (page === 'stu.tpr') {
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
        case 'advanced':
            const feedbackLinkAdvanced =
                mainContent.querySelector<HTMLAnchorElement>('a:nth-child(2)');
            if (feedbackLinkAdvanced) {
                feedbackLinkAdvanced.className = 'icon-button icon-feedback';
                feedbackLinkAdvanced.innerText = 'Оставить отзыв';
            }
            break;

        case 'short':
        case null:
            const teachPlanContainer = mainContent.querySelector<HTMLElement>('div:nth-child(2)');
            if (teachPlanContainer) {
                teachPlanContainer.className = 'teach-plan';
            }

            const feedbackLinkShort = mainContent.querySelector<HTMLAnchorElement>(
                'div.teach-plan > div > a',
            );
            if (feedbackLinkShort) {
                feedbackLinkShort.className = 'icon-button icon-feedback';
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
    const feedbackLink = mainContent.querySelector<HTMLAnchorElement>('a');
    if (feedbackLink) {
        feedbackLink.className = 'icon-button icon-feedback';
        feedbackLink.innerText = 'Оставить отзыв';
    }
}
