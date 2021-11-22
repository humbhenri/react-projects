import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
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
  IUser,
} from "./services/backend";
import { generateCalendar, getToday } from "./services/date";
import UserMenu from "./UserMenu";

const useStyles = makeStyles(() => ({
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid rgb(224, 224, 224)",
  },
}));

interface CalendarScreenProps {
  user: IUser;
  onLogout: () => void;
}

export default function CalendarScreen(props: CalendarScreenProps) {
  const { month } = useParams<"month">();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);

  const selectedCalendarEvents: IEvent[] = [];
  for (const event of events) {
    const index = calendars.findIndex((cal) => cal.id === event.calendarId);
    if (selectedCalendars[index]) {
      selectedCalendarEvents.push(event);
    }
  }

  const weeks = generateCalendar(
    month + "-01",
    selectedCalendarEvents,
    calendars
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

  function toggleSelectedCalendar(index: number) {
    setSelectedCalendars((oldCalendars) => {
      const newCalendars = [...oldCalendars];
      newCalendars[index] = !oldCalendars[index];
      return newCalendars;
    });
  }

  function handleNovoEvento(date: string) {
    setEditingEvent({
      date,
      desc: "",
      calendarId: calendars[0].id,
    });
  }

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
      <CalendarsView
        calendars={calendars}
        toggleSelectedCalendar={toggleSelectedCalendar}
        selectedCalendars={selectedCalendars}
        onNewEvent={() => handleNovoEvento(getToday())}
      />
      <TableContainer component={"div"} className={classes.tableContainer}>
        <CalendarHeader month={month ?? ""}>
          <UserMenu user={props.user} onLogout={props.onLogout} />
        </CalendarHeader>
        <Calendar
          weeks={weeks}
          onDayClicked={handleNovoEvento}
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
