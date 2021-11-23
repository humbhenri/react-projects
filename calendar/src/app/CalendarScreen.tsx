import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@mui/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import Calendar from "./Calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarsView from "./CalendarsView";
import EventFormDialog from "./EventFormDialog";
import { ReactFnCompPropsChecker } from "./ReactFnCompPropsChecker";
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

export default function CalendarScreen() {
  const { month } = useParams<"month">();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);

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
      setSelectedCalendars(calendars.map((_) => true));
      setCalendars(calendars);
      setEvents(events);
    });
    return () => {};
  }, [firstDate, lastDate]);

  const toggleSelectedCalendar = useCallback(
    (index: number) => {
      const newValue = [...selectedCalendars];
      newValue[index] = !newValue[index];
      setSelectedCalendars(newValue);
    },
    [selectedCalendars]
  );

  const handleEditingEvent = useCallback(
    (date: string) => {
      setEditingEvent({
        date,
        desc: "",
        calendarId: calendars[0].id,
      });
    },
    [calendars]
  );

  const handleNovoEventoHoje = useCallback(
    () => handleEditingEvent(getToday()),
    [handleEditingEvent]
  );

  async function refreshEvents() {
    const events = await getEventsEndpoint(firstDate, lastDate);
    setEvents(events);
  }

  function handleEventSave() {
    setEditingEvent(null);
    refreshEvents();
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
          onDayClicked={handleEditingEvent}
          onEventClicked={setEditingEvent}
        />
      </TableContainer>
      <EventFormDialog
        open={!!editingEvent}
        onCancel={() => setEditingEvent(null)}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        calendars={calendars}
        event={editingEvent}
      />
    </Box>
  );
}
