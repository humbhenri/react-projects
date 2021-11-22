export const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function getToday(): string {
    return new Date().toISOString().slice(0, 10);
}

export function getTodayMonth(): string {
    return new Date().toISOString().slice(0, 7);
}

export function formatMonth(isoMonth: string): string {
    const date = new Date(`${isoMonth}-01T12:00:00`);
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
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