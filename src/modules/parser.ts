// Определяем типы для наших данных
export type Pair = {
  number: string;
  time: string;
  name: string;
  type: string; // лек, практ
  room: string;
  teacher: string;
  zoomLink?: string;
};

export type DaySchedule = {
  dayTitle: string;
  pairs: Pair[];
};

/**
 * Парсит HTML-элемент с расписанием и возвращает структурированный массив данных.
 * @param timetableContainer - DOM-элемент с классом .timetable
 * @returns Массив объектов DaySchedule.
 */
export function parseTimetable(timetableContainer: HTMLElement): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  const dayElements = timetableContainer.querySelectorAll<HTMLElement>('.day');

  dayElements.forEach(dayEl => {
    const dayTitle = (dayEl.querySelector('h3') as HTMLElement)?.innerText || 'Неизвестный день';
    const pairs: Pair[] = [];
    
    const pairRows = dayEl.querySelectorAll<HTMLTableRowElement>('tbody > tr');
    pairRows.forEach(row => {
      const numCell = row.querySelector<HTMLTableCellElement>('.pair_num');
      const infoCell = row.querySelector<HTMLTableCellElement>('.pair_info');
      const teacherCell = row.querySelector<HTMLTableCellElement>('.pair_teacher');

      if (!numCell || !infoCell || infoCell.innerText.trim() === '') return;

      const [pairNumber, time] = numCell.innerText.split('\n');

      const nameLink = infoCell.querySelector<HTMLAnchorElement>('.dis a');
      const nameText = nameLink?.innerText || 'Без названия';
      let type = 'практ';
      if (nameText.includes('(лек)')) type = 'лек';

      const roomElement = infoCell.querySelector<HTMLElement>('.aud');
      const room = roomElement?.innerText || '';
      const zoomLink = roomElement?.querySelector<HTMLAnchorElement>('a[target="_blank"]')?.href;

      const teacher = teacherCell?.querySelector('a')?.innerText || 'Не указан';
      
      pairs.push({
        number: pairNumber.trim(),
        time: time.trim(),
        name: nameText.replace(/\s\((лек|практ)\)/, '').trim(),
        type,
        room: room.trim(),
        teacher: teacher.trim(),
        zoomLink,
      });
    });

    if (pairs.length > 0) {
        schedule.push({ dayTitle, pairs });
    }
  });

  return schedule;
}