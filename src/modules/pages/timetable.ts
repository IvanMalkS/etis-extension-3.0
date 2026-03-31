import browser from 'webextension-polyfill';
import { CLASSES, SELECTORS } from '../constants';

export function modifyTimetablePage(): void {
    const mainContent = document.querySelector<HTMLElement>(SELECTORS.common.mainContent);
    if (!mainContent) {
        console.error('ETIS 3.0: Main content container (.span9) not found on timetable page.');
        return;
    }

    const buttonbar = document.createElement('div');
    buttonbar.className = CLASSES.pages.timetable.buttonbar;

    mainContent.prepend(buttonbar);

    const consultations = mainContent.querySelector(SELECTORS.timetable.consultations);
    if (consultations) {
        consultations.classList.add(CLASSES.pages.timetable.button);
        buttonbar.appendChild(consultations);
    } else {
        const oldConsultations = mainContent.querySelector(SELECTORS.timetable.oldConsultations);
        if (oldConsultations) {
            oldConsultations.className = `${CLASSES.pages.timetable.button} ${CLASSES.pages.timetable.consultations}`;
            buttonbar.appendChild(oldConsultations);
        }
    }

    const feedbackLink = mainContent.querySelector<HTMLAnchorElement>(
        SELECTORS.timetable.feedbackLink,
    );
    if (feedbackLink) {
        feedbackLink.className = `${CLASSES.pages.timetable.button} ${CLASSES.common.iconButton} ${CLASSES.pages.timetable.iconFeedback}`;
        feedbackLink.innerText = 'Оставить отзыв';
        buttonbar.appendChild(feedbackLink);
    }

    const todayLink = mainContent.querySelector<HTMLAnchorElement>(SELECTORS.timetable.todayLink);
    if (todayLink) {
        todayLink.className = `${CLASSES.pages.timetable.button} ${CLASSES.common.iconButton} ${CLASSES.pages.timetable.iconToday}`;
        buttonbar.appendChild(todayLink);
    }

    const scheduleClone = mainContent.cloneNode(true) as HTMLElement;

    scheduleClone.querySelectorAll('*').forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
            if (attr.name.startsWith('on')) {
                el.removeAttribute(attr.name);
            }
        });
        if (el.tagName === 'SCRIPT') {
            el.remove();
        }
    });

    const scheduleHtml = scheduleClone.innerHTML;
    browser.storage.local.set({
        cached_timetable: {
            html: scheduleHtml,
            timestamp: new Date().getTime(),
        },
    });

    const pairs = mainContent.querySelectorAll<HTMLTableRowElement>(SELECTORS.timetable.pairs);
    pairs.forEach((pair) => {
        const teacherSpan = pair.querySelector<HTMLElement>(SELECTORS.timetable.teacherSpan);

        if (teacherSpan) {
            const pairTeacherCell = document.createElement('td');
            pairTeacherCell.className = CLASSES.pages.timetable.pairTeacher;
            pairTeacherCell.innerHTML = teacherSpan.innerHTML;

            pair.appendChild(pairTeacherCell);

            pair.querySelector(SELECTORS.timetable.pairJour)?.remove();

            teacherSpan.remove();
        }
    });
}
