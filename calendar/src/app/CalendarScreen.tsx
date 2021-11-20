import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Calendar from "./Calendar";
import CalendarHeader from "./CalendarHeader";
import CalendarsView from "./CalendarsView";
import {
  getCalendarsEndpoint,
  getEventsEndpoint,
  ICalendar,
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

export default function CalendarScreen() {
  const { month } = useParams<"month">();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);

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

  const classes = useStyles();

  return (
    <Box display="flex" height="100%">
      <CalendarsView
        calendars={calendars}
        toggleSelectedCalendar={toggleSelectedCalendar}
        selectedCalendars={selectedCalendars}
      />
      <TableContainer component={"div"} className={classes.tableContainer}>
        <CalendarHeader month={month ?? ""} />
        <Calendar weeks={weeks} />
      </TableContainer>
    </Box>
  );
}
