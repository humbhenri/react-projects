import {
    Box,
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
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
    createOrUpdateEventEndpoint,
    ICalendar,
    IEvent,
} from './services/backend';

interface IEventFormDialogProps {
    open: boolean;
    onCancel: () => void;
    onSave: () => void;
    onDelete: () => void;
    calendars: ICalendar[];
    event: IEvent | null;
}

interface IValidationErrors {
    [field: string]: string;
}

export default function EventFormDialog(props: IEventFormDialogProps) {
    const { open, onCancel, onSave, calendars, onDelete } = props;
    const [event, setEvent] = useState(props.event);
    const [errors, setErrors] = useState<IValidationErrors>({});

    const inputDate = useRef<HTMLInputElement | null>(null);
    const inputDesc = useRef<HTMLInputElement | null>(null);

    // sem isso o event fica null pra sempre, porque o useState só é executado
    // uma vez
    useEffect(() => {
        setEvent(props.event);
        setErrors({});
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

    function validate(): boolean {
        if (event) {
            const currentErrors: IValidationErrors = {};
            const { date, desc } = event;
            if (!date) {
                currentErrors['date'] = 'Data deve ser preenchida';
                inputDate.current?.focus();
            }
            if (!desc) {
                currentErrors['desc'] = 'Descrição deve ser preenchida';
                inputDesc.current?.focus();
            }
            setErrors(currentErrors);
            return Object.keys(currentErrors).length === 0;
        }
        return false;
    }

    async function save(evt: FormEvent) {
        evt.preventDefault();
        if (validate()) {
            await createOrUpdateEventEndpoint(event!);
            onSave();
        }
    }

    return (
        <div>
            {event && (
                <Dialog open={open} onClose={onCancel}>
                    <form onSubmit={save}>
                        <DialogTitle>
                            {!!event.id ? 'Save event' : 'New event'}
                        </DialogTitle>
                        <DialogContent>
                            <>
                                <TextField
                                    type="date"
                                    margin="normal"
                                    label="Date"
                                    fullWidth
                                    value={event.date}
                                    onChange={handleChange}
                                    id="date"
                                    error={!!errors.date}
                                    helperText={errors.date}
                                    inputRef={inputDate}
                                />
                                <TextField
                                    margin="normal"
                                    label="Descrição"
                                    fullWidth
                                    value={event.desc}
                                    onChange={handleChange}
                                    id="desc"
                                    error={!!errors.desc}
                                    helperText={errors.desc}
                                    inputRef={inputDesc}
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
                            <FormControl fullWidth>
                                <InputLabel>Agenda</InputLabel>
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
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            {event.id && (
                                <>
                                    <Button
                                        type="button"
                                        onClick={onDelete}
                                        color="error"
                                    >
                                        Excluir
                                    </Button>
                                    <Box flex="1"></Box>
                                </>
                            )}
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
            )}
        </div>
    );
}
