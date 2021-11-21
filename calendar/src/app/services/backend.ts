export interface ICalendar {
    id: number;
    name: string;
    color: string;
}

export interface IEvent {
    id?: number;
    date: string;
    time?: string;
    desc: string;
    calendarId: number;
}

const baseUrl = 'http://127.0.0.1:8080';

export type EventWithCalendar = IEvent & { calendar: ICalendar };

export async function getCalendarsEndpoint(): Promise<ICalendar[]> {
    const resp = await fetch(`${baseUrl}/calendars`);
    return resp.json();
}

export async function getEventsEndpoint(
    from: string,
    to: string
): Promise<IEvent[]> {
    const resp = await fetch(
        `${baseUrl}/events?date_gte=${from}&date_lte=${to}&_sort=date,time`
    );
    return resp.json();
}

export async function createEventEndpoint(event: IEvent): Promise<IEvent> {
    const resp = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
    });
    return resp.json();
}
