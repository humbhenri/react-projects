import { ICalendar, IEvent } from "./services/backend";

export interface ICalendarScreenState {
  events: IEvent[];
  calendars: ICalendar[];
  selectedCalendars: boolean[];
  editingEvent: IEvent | null;
}

export type ICalendarScreenAction =
  | {
      type: "load";
      payload: { events: IEvent[]; calendars?: ICalendar[] };
    }
  | { type: "closeDialog" }
  | { type: "new"; payload: string }
  | { type: "toggleSelectedCalendar"; payload: number }
  | { type: "edit"; payload: IEvent };

export function reducer(
  state: ICalendarScreenState,
  action: ICalendarScreenAction
): ICalendarScreenState {
  switch (action.type) {
    case "load":
      const _calendars = action.payload.calendars ?? state.calendars;
      const _selectedCalendars = action.payload.calendars
        ? action.payload.calendars.map(() => true)
        : state.selectedCalendars;
      return {
        ...state,
        events: action.payload.events,
        calendars: _calendars,
        selectedCalendars: _selectedCalendars,
      };
    case "closeDialog":
      return {
        ...state,
        editingEvent: null,
      };
    case "new":
      return {
        ...state,
        editingEvent: {
          date: action.payload,
          desc: "",
          calendarId: state.calendars[0].id,
        },
      };
    case "toggleSelectedCalendar":
      const newValue = [...state.selectedCalendars];
      newValue[action.payload] = !newValue[action.payload];
      return { ...state, selectedCalendars: newValue };
    case "edit":
      return { ...state, editingEvent: action.payload };
    default:
      return state;
  }
}
