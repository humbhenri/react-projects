import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@mui/styles";
import { useEffect, useMemo, useReducer } from "react";
import { useParams } from "react-router";
import Calendar from "./Calendar";
import CalendarHeader from "./CalendarHeader";
import { reducer } from "./calendarScreenReducer";
import CalendarsView from "./CalendarsView";
import EventFormDialog from "./EventFormDialog";
import {
  deleteEventEndpoint,
  getCalendarsEndpoint,
  getEventsEndpoint,
  IEvent,
} from "./services/backend";
import { generateCalendar } from "./services/date";

const useStyles = makeStyles(() => ({
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid rgb(224, 224, 224)",
  },
}));

function useCalendarScreenState(month: string) {
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

  return {
    weeks,
    editingEvent,
    handleEventDelete,
    closeDialog,
    calendars,
    dispatch,
    selectedCalendars,
    handleEventSave,
  };
}

export default function CalendarScreen() {
  const { month } = useParams<"month">();
  const {
    weeks,
    editingEvent,
    handleEventDelete,
    closeDialog,
    calendars,
    dispatch,
    selectedCalendars,
    handleEventSave,
  } = useCalendarScreenState(month!);
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
        selectedCalendars={selectedCalendars}
        dispatch={dispatch}
      />
      <TableContainer component={"div"} className={classes.tableContainer}>
        <CalendarHeader month={month ?? ""}></CalendarHeader>
        <Calendar weeks={weeks} dispatch={dispatch} />
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
