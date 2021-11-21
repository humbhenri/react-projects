import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createEventEndpoint, ICalendar, IEvent } from './services/backend';

interface IEventFormDialogProps {
    open: boolean;
    onCancel: () => void;
    onSave: () => void;
    calendars: ICalendar[];
    event: IEvent | null;
}

export default function EventFormDialog(props: IEventFormDialogProps) {
    const { open, onCancel, onSave, calendars } = props;
    const [event, setEvent] = useState(props.event);

    // sem isso o event fica null pra sempre, porque o useState só é executado
    // uma vez
    useEffect(() => {
        setEvent(props.event);
    }, [props.event]);

    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
        const { id, value } = evt.target;
        const newEvent = { ...event!, [id]: value };
        setEvent(newEvent);
    }

    function handleSelectedCalendarChange(evt: SelectChangeEvent<Number>) {
        const newEvent = { ...event!, calendarId: +evt.target.value };
        setEvent(newEvent);
    }

    async function save(evt: FormEvent) {
        evt.preventDefault();
        await createEventEndpoint(event!);
        onSave();
    }

    return (
        <div>
            <Dialog open={open} onClose={onCancel}>
                <form onSubmit={save}>
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
                        <Button type="button" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
