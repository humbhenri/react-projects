import Box from '@material-ui/core/Box';
import { makeStyles } from '@mui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import { IconButton } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';

import { DAYS_OF_WEEK, ICalendarCell, generateCalendar } from './services/date';
import { useEffect, useState } from 'react';
import { getEventsEndpoint, IEvent } from './services/backend';

const useStyles = makeStyles((theme?: any) => ({
    table: {
        height: '100%',
        '& td ~ td, & th ~ th': {
            borderLeft: '1px solid rgb(224, 224, 224)',
        },
        '& td': {
            verticalAlign: 'top',
            overflow: 'hidden',
            padding: '8px 4px',
        },
        borderTop: '1px solid rgb(224, 224, 224)',
        tableLayout: 'fixed',
    },
    tbody: {
        height: '100%',
    },
    agenda: {
        minWidth: '16em',
        padding: '8px 16px',
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgb(224, 224, 224)',
    },
    dayOfMonth: {
        fontWeight: 500,
        marginBottom: '4px',
    },
    event: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        display: 'flex',
        margin: '4px 0',
        alignItems: 'center',
    },
}));

export default function CalendarScreen() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const classes = useStyles();
    const weeks = generateCalendar(
        new Date().toISOString().slice(0, 10),
        events
    );
    const firstDate = weeks[0][0].date;
    const lastDate = weeks[weeks.length - 1][6].date;
    useEffect(() => {
        getEventsEndpoint(firstDate, lastDate).then((events) => {
            setEvents(events);
        });
        return () => {};
    }, [firstDate, lastDate]);
    return (
        <Box display="flex" height="100%">
            <Box className={classes.agenda}>
                <h1>Agenda</h1>
                <Button variant="contained" color="primary">
                    Novo evento
                </Button>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox name="agenda 1" />}
                        label="Agenda 1"
                    />
                    <FormControlLabel
                        control={<Checkbox name="agenda 2" />}
                        label="Agenda 2"
                    />
                </FormGroup>
            </Box>
            <TableContainer
                component={'div'}
                className={classes.tableContainer}
            >
                <Box display="flex" padding="8px 16px">
                    <IconButton>
                        <Icon>chevron_left</Icon>
                    </IconButton>
                    <IconButton>
                        <Icon>chevron_right</Icon>
                    </IconButton>
                    <Box flex="1" textAlign="center">
                        <h3>Novembro de 2021</h3>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyItems="center"
                    >
                        <IconButton>
                            <Avatar alt="avatar">
                                <Icon>person</Icon>
                            </Avatar>
                        </IconButton>
                    </Box>
                </Box>
                <Table
                    size="small"
                    aria-label="a dense table"
                    className={classes.table}
                >
                    <TableHead>
                        <TableRow>
                            {DAYS_OF_WEEK.map((day) => (
                                <TableCell align="center" key={day}>
                                    {day}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tbody}>
                        {weeks.map((week) => (
                            <TableRow>
                                {week.map((cell) => (
                                    <TableCell align="center" key={cell.date}>
                                        <div className={classes.dayOfMonth}>
                                            {cell.dayOfMonth}
                                        </div>
                                        {cell.events.map((event) => (
                                            <Button
                                                key={event.id}
                                                className={classes.event}
                                            >
                                                {event.time && (
                                                    <Icon fontSize="inherit">
                                                        watch_later
                                                    </Icon>
                                                )}
                                                {event.time && (
                                                    <Box
                                                        component="span"
                                                        margin="0 4px"
                                                    >
                                                        {event.time}
                                                    </Box>
                                                )}
                                                <span>{event.desc}</span>
                                            </Button>
                                        ))}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
