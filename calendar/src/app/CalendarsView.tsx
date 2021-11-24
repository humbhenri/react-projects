import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { makeStyles } from "@mui/styles";
import React from "react";
import { ICalendarScreenAction } from "./calendarScreenReducer";
import { ICalendar } from "./services/backend";
import { getToday } from "./services/date";

const useStyles = makeStyles((theme?: any) => ({
  agenda: {
    minWidth: "16em",
    padding: "8px 16px",
  },
}));

interface ICalendarsViewProps {
  calendars: ICalendar[];
  selectedCalendars: boolean[];
  dispatch: React.Dispatch<ICalendarScreenAction>;
}

const CalendarsView = React.memo((props: ICalendarsViewProps) => {
  console.log("CalendarsView");
  const { calendars, dispatch, selectedCalendars } = props;
  const classes = useStyles();

  return (
    <Box className={classes.agenda}>
      <h1>Agenda</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: "new", payload: getToday() })}
      >
        Novo evento
      </Button>
      <h2 style={{ marginTop: "2em" }}>Agendas</h2>
      <FormGroup>
        {calendars.map((calendar, i) => (
          <FormControlLabel
            key={calendar.id}
            control={
              <Checkbox
                name={calendar.name}
                sx={{
                  "&.Mui-checked": {
                    color: calendar.color,
                  },
                }}
                checked={selectedCalendars[i]}
                onChange={() =>
                  dispatch({ type: "toggleSelectedCalendar", payload: i })
                }
              />
            }
            label={calendar.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
});

export default CalendarsView;
