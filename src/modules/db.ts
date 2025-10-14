import { openDB } from 'idb';
import type {DBSchema} from 'idb';
import type { DaySchedule } from './parser';


interface TimetableDB extends DBSchema {
  timetable: {
    key: string;
    value: {
      timestamp: number;
      data: DaySchedule[];
    };
  };
}

const dbPromise = openDB<TimetableDB>('etis-2-1-db', 1, {
  upgrade(db) {
    db.createObjectStore('timetable');
  },
});


const TIMETABLE_KEY = 'current-week';

/**
 * Сохраняет данные расписания в IndexedDB.
 * @param {DaySchedule[]} data - Массив с данными расписания, полученный от парсера.
 */
export async function saveTimetable(data: DaySchedule[]): Promise<void> {
  try {
    const db = await dbPromise;
    await db.put('timetable', {
      timestamp: Date.now(),
      data: data,
    }, TIMETABLE_KEY);
    console.log('ETIS 2.1: Timetable saved to IndexedDB.');
  } catch (error) {
    console.error('ETIS 2.1: Failed to save timetable to IndexedDB.', error);
  }
}

/**
 * Извлекает сохраненные данные расписания из IndexedDB.
 * @returns {Promise<{ timestamp: number; data: DaySchedule[] } | undefined>} - Объект с данными и временной меткой, или undefined, если ничего не найдено.
 */
export async function getTimetable(): Promise<{ timestamp: number; data: DaySchedule[] } | undefined> {
  try {
    const db = await dbPromise;
    const savedData = await db.get('timetable', TIMETABLE_KEY);
    if (savedData) {
        console.log('ETIS 2.1: Timetable retrieved from IndexedDB.');
    } else {
        console.log('ETIS 2.1: No timetable found in IndexedDB.');
    }
    return savedData;
  } catch (error) {
    console.error('ETIS 2.1: Failed to get timetable from IndexedDB.', error);
    return undefined;
  }
}