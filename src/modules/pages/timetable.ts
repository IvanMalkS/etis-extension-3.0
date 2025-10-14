import { parseTimetable, type DaySchedule } from '../parser';
import { saveTimetable, getTimetable } from '../db';

/**
 * Главная "точка входа" для страницы расписания.
 * Эта функция определяет, работает ли сайт, и в зависимости от этого
 * либо парсит онлайн-данные, либо рендерит офлайн-версию из IndexedDB.
 */
export async function handleTimetablePage(): Promise<void> {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
    if (!mainContent) {
        console.error('ETIS 2.1: Main content container (.span9) not found.');
        return;
    }

    const timetableContainer = mainContent.querySelector<HTMLElement>('.timetable');

    if (timetableContainer) {
        console.log('ETIS 2.1: Timetable page is online. Parsing and saving data.');
        modifyOnlineTimetable(mainContent);
        const parsedData = parseTimetable(timetableContainer);
        if (parsedData.length > 0) {
            await saveTimetable(parsedData);
        }
    } else {
        console.log('ETIS 2.1: Timetable page appears to be offline. Attempting to load from DB.');
        const savedTimetable = await getTimetable();
        if (savedTimetable && savedTimetable.data.length > 0) {
            renderOfflineTimetable(mainContent, savedTimetable);
        } else {
            renderOfflineError(
                mainContent,
                'Сайт недоступен, и в кэше нет сохраненного расписания.',
            );
        }
    }
}

/**
 * Модифицирует существующую (онлайн) версию расписания:
 * создает панель с кнопками и перемещает колонку с преподавателем.
 * @param mainContent - Основной контейнер контента страницы.
 */
function modifyOnlineTimetable(mainContent: HTMLElement): void {
    const buttonbar = document.createElement('div');
    buttonbar.className = 'timetable-buttonbar';
    mainContent.prepend(buttonbar);

    const consultations = mainContent.querySelector('div.consultations');
    if (consultations) {
        consultations.classList.add('timetable-btn');
        buttonbar.appendChild(consultations);
    } else {
        const oldConsultations = mainContent.querySelector('div:nth-child(6)');
        if (oldConsultations) {
            oldConsultations.className = 'timetable-btn consultations';
            buttonbar.appendChild(oldConsultations);
        }
    }

    const feedbackLink = mainContent.querySelector<HTMLAnchorElement>('a.estimate_tt');
    if (feedbackLink) {
        feedbackLink.className = 'timetable-btn icon-button icon-feedback';
        feedbackLink.innerText = 'Оставить отзыв';
        buttonbar.appendChild(feedbackLink);
    }

    const todayLink = mainContent.querySelector<HTMLAnchorElement>('a[href*="p_what=1"]');
    if (todayLink) {
        todayLink.className = 'timetable-btn icon-button icon-today';
        buttonbar.appendChild(todayLink);
    }

    const pairs = mainContent.querySelectorAll<HTMLTableRowElement>('div.day > table > tbody > tr');
    pairs.forEach((pair) => {
        const teacherSpan = pair.querySelector<HTMLElement>('span.teacher');

        if (teacherSpan) {
            const pairTeacherCell = document.createElement('td');
            pairTeacherCell.className = 'pair_teacher';
            pairTeacherCell.innerHTML = teacherSpan.innerHTML;
            pair.appendChild(pairTeacherCell);
            pair.querySelector('td.pair_jour')?.remove();
            teacherSpan.remove();
        }
    });
}

/**
 * Рендерит офлайн-версию расписания, полностью заменяя содержимое контейнера.
 * @param container - DOM-элемент, в который будет вставлено офлайн-расписание.
 * @param savedData - Объект с данными из IndexedDB.
 */
function renderOfflineTimetable(
    container: HTMLElement,
    savedData: { timestamp: number; data: DaySchedule[] },
): void {
    const date = new Date(savedData.timestamp).toLocaleString();
    let html = `
    <div class="offline-notification">
      Сайт ЕТИС недоступен. Показано расписание, сохраненное ${date}.
    </div>
    <div class="timetable offline-timetable">
  `;

    savedData.data.forEach((day) => {
        html += `
      <div class="day">
        <h3>${day.dayTitle}</h3>
        <table>
          <tbody>
            ${day.pairs
                .map(
                    (pair) => `
              <tr>
                <td class="pair_num">${pair.number}<br><font class="eval">${pair.time}</font></td>
                <td class="pair_info">
                  <div>
                    <div><span class="dis">${pair.name} (${pair.type})</span></div>
                    <div><span class="aud">${pair.room}</span></div>
                    ${
                        pair.zoomLink
                            ? `<div><a href="${pair.zoomLink}" target="_blank">Ссылка на занятие</a></div>`
                            : ''
                    }
                  </div>
                </td>
                <td class="pair_teacher">${pair.teacher}</td>
              </tr>
            `,
                )
                .join('')}
          </tbody>
        </table>
      </div>
    `;
    });

    html += '</div>';
    container.innerHTML = html;
}

/**
 * Рендерит сообщение об ошибке, если сайт и БД недоступны.
 * @param container - DOM-элемент для вывода сообщения.
 * @param message - Текст сообщения.
 */
function renderOfflineError(container: HTMLElement, message: string): void {
    container.innerHTML = `<div class="offline-error">${message}</div>`;
}