import { IEvent, ICalendar, EventWithCalendar } from './backend';

export interface ICalendarCell {
    date: string;
    events: EventWithCalendar[];
    dayOfMonth: number;
}

export const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function generateCalendar(
    date: string,
    events: IEvent[],
    calendars: ICalendar[]
): ICalendarCell[][] {
    const weeks: ICalendarCell[][] = [];
    const jsDate = new Date(`${date}T12:00:00`);
    jsDate.setDate(1);
    const currentMonth = jsDate.getMonth();
    let currentDay = new Date(jsDate.valueOf());
    const dayOfWeek = currentDay.getDay();
    currentDay.setDate(1 - dayOfWeek);
    do {
        const week: ICalendarCell[] = [];
        for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
            const monthStr = (currentDay.getMonth() + 1)
                .toString()
                .padStart(2, '0');
            const dayStr = currentDay.getDate().toString().padStart(2, '0');
            const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;
            week.push({
                date: isoDate,
                events: events
                    .filter((event) => event.date === isoDate)
                    .map((e) => {
                        const calendar: ICalendar = calendars.find(
                            (cal) => cal.id === e.calendarId
                        )!;
                        return { ...e, calendar };
                    }),
                dayOfMonth: currentDay.getDate(),
            });
            currentDay.setDate(currentDay.getDate() + 1);
        }
        weeks.push(week);
    } while (currentDay.getMonth() === currentMonth);
    return weeks;
}
