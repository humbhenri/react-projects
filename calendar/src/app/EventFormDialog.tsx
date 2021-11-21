import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@material-ui/core';
import { ICalendar, IEvent } from './services/backend';
import { useState, useEffect, ChangeEvent } from 'react';

interface IEventFormDialogProps {
    open: boolean;
    onClose: () => void;
    calendars: ICalendar[];
    event: IEvent | null;
}

export default function EventFormDialog(props: IEventFormDialogProps) {
    const { open, onClose, calendars } = props;
    const [event, setEvent] = useState(props.event);

    useEffect(() => {
        setEvent(props.event);
    }, [props.event]);

    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
        if (!event) {
            return;
        }
        const { id, value } = evt.target;
        const newEvent = { ...event, [id]: value };
        setEvent(newEvent);
    }

    function handleSelectedCalendarChange(evt: SelectChangeEvent<Number>) {
        if (!event) {
            return;
        }
        const newEvent = { ...event, calendarId: +evt.target.value };
        setEvent(newEvent);
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>New event</DialogTitle>
                <DialogContent>
                    {event && (
                        <>
                            <TextField
                                type="date"
                                margin="normal"
                                label="Date"
                                fullWidth
                                value={event.date}
                                onChange={handleChange}
                                id="date"
                            />
                            <TextField
                                autoFocus
                                margin="normal"
                                label="Descrição"
                                fullWidth
                                value={event.desc}
                                onChange={handleChange}
                                id="desc"
                            />
                            <TextField
                                type="time"
                                margin="normal"
                                label="Hora"
                                fullWidth
                                value={event.time ?? ''}
                                onChange={handleChange}
                                id="time"
                            />
                        </>
                    )}
                    <FormControl fullWidth>
                        <InputLabel>Agenda</InputLabel>
                        {event && (
                            <Select
                                labelId="select-calendar"
                                value={event.calendarId}
                                onChange={handleSelectedCalendarChange}
                            >
                                {calendars.map((calendar) => (
                                    <MenuItem
                                        key={calendar.id}
                                        value={calendar.id}
                                    >
                                        {calendar.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={onClose}
                        color="primary"
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
