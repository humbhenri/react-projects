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

export interface IUser {
    name: string;
    email: string;
}

const baseUrl = 'http://127.0.0.1:8080';

export type EventWithCalendar = IEvent & { calendar: ICalendar };

export async function getCalendarsEndpoint(): Promise<ICalendar[]> {
    const resp = await fetch(`${baseUrl}/calendars`, {
        credentials: "include",
    });
    return handleResponse(resp);
}

export async function getEventsEndpoint(
    from: string,
    to: string
): Promise<IEvent[]> {
    const resp = await fetch(
        `${baseUrl}/events?date_gte=${from}&date_lte=${to}&_sort=date,time`, 
        {credentials: "include",}
    );
    return handleResponse(resp);
}

export async function createOrUpdateEventEndpoint(
    event: IEvent
): Promise<IEvent> {
    const isNew = !event.id;
    const id = event.id ?? '';
    const resp = await fetch(`${baseUrl}/events/${id}`, {
        credentials: "include",
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(resp);
}

export async function deleteEventEndpoint(eventId: number): Promise<void> {
    await fetch(`${baseUrl}/events/${eventId}`, {
        method: 'DELETE',
        credentials: "include",
    });
}

async function handleResponse(resp: Response): Promise<any> {
    if (resp.ok) {
        return await resp.json();
    }
    if (resp.status === 404) {
        return [];
    }
    throw new Error(resp.statusText);
}

export async function getUserEndpoint(): Promise<IUser> {
    const resp = await fetch(`${baseUrl}/auth/user`, {credentials: "include",});
    return handleResponse(resp);
}

export async function signInEndpoint(email: string, password: string): Promise<IUser> {
    const resp = await fetch(`${baseUrl}/auth/login`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    });
    return handleResponse(resp);
}

export async function signOutEndpoint(): Promise<void> {
    const resp = await fetch(`${baseUrl}/auth/logout`, {
        credentials: "include",
        method: "POST",
    });
    return handleResponse(resp);
}