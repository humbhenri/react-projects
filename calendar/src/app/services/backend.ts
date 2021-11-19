export interface ICalendar {
    id: number;
    name: string;
    color: string;
}

export interface IEvent {
    id: number;
    date: string;
    time?: string;
    desc: string;
    calendarId: number;
}

export async function getCalendarsEndpoint(): Promise<ICalendar[]> {
    const resp = await fetch('http://127.0.0.1:8080/calendars');
    return resp.json();
}

export async function getEventsEndpoint(
    from: string,
    to: string
): Promise<IEvent[]> {
    const resp = await fetch(
        `http://127.0.0.1:8080/events?date_gte=${from}&date_lte=${to}&_sort=date,time`
    );
    return resp.json();
}
