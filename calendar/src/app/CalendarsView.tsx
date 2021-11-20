import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { makeStyles } from "@mui/styles";
import { ICalendar } from "./services/backend";

const useStyles = makeStyles((theme?: any) => ({
  agenda: {
    minWidth: "16em",
    padding: "8px 16px",
  },
}));

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toggleSelectedCalendar: (i: number) => void;
  selectedCalendars: boolean[];
}

export default function CalendarsView(props: ICalendarsViewProps) {
  const { calendars, toggleSelectedCalendar, selectedCalendars } = props;

  const classes = useStyles();

  return (
    <Box className={classes.agenda}>
      <h1>Agenda</h1>
      <Button variant="contained" color="primary">
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
                onChange={() => toggleSelectedCalendar(i)}
              />
            }
            label={calendar.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
