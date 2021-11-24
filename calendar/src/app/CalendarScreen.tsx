import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@mui/styles";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useParams } from "react-router";
import Calendar from "./Calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarsView from "./CalendarsView";
import EventFormDialog from "./EventFormDialog";
import {
  deleteEventEndpoint,
  getCalendarsEndpoint,
  getEventsEndpoint,
  ICalendar,
  IEvent,
} from "./services/backend";
import { generateCalendar, getToday } from "./services/date";

const useStyles = makeStyles(() => ({
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid rgb(224, 224, 224)",
  },
}));

interface ICalendarScreenState {
  events: IEvent[];
  calendars: ICalendar[];
  selectedCalendars: boolean[];
  editingEvent: IEvent | null;
}

type ICalendarScreenAction =
  | {
      type: "load";
      payload: { events: IEvent[]; calendars?: ICalendar[] };
    }
  | { type: "closeDialog" }
  | { type: "new"; payload: string }
  | { type: "toggleSelectedCalendar"; payload: number }
  | { type: "edit"; payload: IEvent };

function reducer(
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

export default function CalendarScreen() {
  const { month } = useParams<"month">();

  const [state, dispatch] = useReducer(reducer, {
    calendars: [],
    selectedCalendars: [],
    events: [],
    editingEvent: null,
  });

  const { calendars, events, selectedCalendars, editingEvent } = state;

  const selectedCalendarEvents: IEvent[] = useMemo(() => {
    const _selectedCalendarEvents = [];
    for (const event of events) {
      const index = calendars.findIndex((cal) => cal.id === event.calendarId);
      if (selectedCalendars[index]) {
        _selectedCalendarEvents.push(event);
      }
    }
    return _selectedCalendarEvents;
  }, [calendars, events, selectedCalendars]);

  const weeks = useMemo(
    () => generateCalendar(month + "-01", selectedCalendarEvents, calendars),
    [month, selectedCalendarEvents, calendars]
  );

  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([
      getCalendarsEndpoint(),
      getEventsEndpoint(firstDate, lastDate),
    ]).then(([calendars, events]) => {
      dispatch({ type: "load", payload: { events, calendars } });
    });
  }, [firstDate, lastDate]);

  const toggleSelectedCalendar = useCallback((index: number) => {
    dispatch({ type: "toggleSelectedCalendar", payload: index });
  }, []);

  const handleEditingEvent = useCallback((event: IEvent) => {
    dispatch({ type: "edit", payload: event });
  }, []);

  const handleNovoEventoHoje = useCallback(
    () => dispatch({ type: "new", payload: getToday() }),
    []
  );

  const handleDayClicked = useCallback(
    (date: string) => dispatch({ type: "new", payload: date }),
    []
  );

  async function refreshEvents() {
    const events = await getEventsEndpoint(firstDate, lastDate);
    dispatch({ type: "load", payload: { events } });
  }

  function handleEventSave() {
    closeDialog();
    refreshEvents();
  }

  function closeDialog() {
    dispatch({ type: "closeDialog" });
  }

  async function handleEventDelete() {
    if (editingEvent?.id) {
      await deleteEventEndpoint(editingEvent?.id);
      handleEventSave();
    }
  }

  const classes = useStyles();

  return (
    <Box display="flex" height="100%">
      {/* <ReactFnCompPropsChecker
        childrenProps={{
          calendars,
          toggleSelectedCalendar,
          selectedCalendars,
          onNewEvent: handleNovoEventoHoje,
        }}
      >
        {(props) => <CalendarsView {...props} />}
        </ReactFnCompPropsChecker> */}
      <CalendarsView
        calendars={calendars}
        toggleSelectedCalendar={toggleSelectedCalendar}
        selectedCalendars={selectedCalendars}
        onNewEvent={handleNovoEventoHoje}
      />
      <TableContainer component={"div"} className={classes.tableContainer}>
        <CalendarHeader month={month ?? ""}></CalendarHeader>
        <Calendar
          weeks={weeks}
          onDayClicked={handleDayClicked}
          onEventClicked={handleEditingEvent}
        />
      </TableContainer>
      <EventFormDialog
        open={!!editingEvent}
        onCancel={closeDialog}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        calendars={calendars}
        event={editingEvent}
      />
    </Box>
  );
}
