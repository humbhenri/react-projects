import { IEvent, ICalendar, EventWithCalendar } from './backend';

export interface ICalendarCell {
    date: string;
    events: EventWithCalendar[];
    dayOfMonth: number;
}

export const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function getToday(): string {
    return new Date().toISOString().slice(0, 10);
}

export function formatMonth(isoMonth: string): string {
    const date = new Date(`${isoMonth}-01T12:00:00`);
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
    }).format(date);
    return formattedDate[0].toUpperCase() + formattedDate.slice(1);
}

export function previousMonth(isoMonth: string): string {
    return addMonth(isoMonth, -1);
}

export function nextMonth(isoMonth: string): string {
    return addMonth(isoMonth, 1);
}

function addMonth(isoMonth: string, ammount: number): string {
    const date = new Date(`${isoMonth}-01T12:00:00`);
    date.setMonth(date.getMonth() + ammount);
    return date.toISOString().slice(0, 7);
}

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
