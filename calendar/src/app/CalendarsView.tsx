import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import EventFormDialog from './EventFormDialog';
import { ICalendar, IEvent } from './services/backend';
import { getToday } from './services/date';

const useStyles = makeStyles((theme?: any) => ({
    agenda: {
        minWidth: '16em',
        padding: '8px 16px',
    },
}));

interface ICalendarsViewProps {
    calendars: ICalendar[];
    toggleSelectedCalendar: (i: number) => void;
    selectedCalendars: boolean[];
    refreshEvents: () => void;
}

export default function CalendarsView(props: ICalendarsViewProps) {
    const {
        calendars,
        toggleSelectedCalendar,
        selectedCalendars,
        refreshEvents,
    } = props;
    const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);

    const classes = useStyles();

    function handleNovoEvento() {
        setEditingEvent({
            date: getToday(),
            desc: '',
            calendarId: calendars[0].id,
        });
    }

    function handleEventSave() {
        setEditingEvent(null);
        refreshEvents();
    }

    return (
        <Box className={classes.agenda}>
            <h1>Agenda</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={handleNovoEvento}
            >
                Novo evento
            </Button>
            <h2 style={{ marginTop: '2em' }}>Agendas</h2>
            <FormGroup>
                {calendars.map((calendar, i) => (
                    <FormControlLabel
                        key={calendar.id}
                        control={
                            <Checkbox
                                name={calendar.name}
                                sx={{
                                    '&.Mui-checked': {
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
            <EventFormDialog
                open={!!editingEvent}
                onCancel={() => setEditingEvent(null)}
                onSave={handleEventSave}
                calendars={calendars}
                event={editingEvent}
            />
        </Box>
    );
}
