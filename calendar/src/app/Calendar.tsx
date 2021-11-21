import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@mui/styles';
import { DAYS_OF_WEEK, ICalendarCell } from './services/date';

const useStyles = makeStyles(() => ({
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

interface ICalendarProps {
    weeks: ICalendarCell[][];
}

export default function Calendar(props: ICalendarProps) {
    const { weeks } = props;

    const classes = useStyles();

    return (
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
                {weeks.map((week, i) => (
                    <TableRow key={i}>
                        {week.map((cell) => (
                            <TableCell align="center" key={cell.date}>
                                <div className={classes.dayOfMonth}>
                                    {cell.dayOfMonth}
                                </div>
                                {cell.events.map((event) => (
                                    <Button
                                        key={event.id}
                                        className={classes.event}
                                        style={{
                                            backgroundColor:
                                                event.calendar.color,
                                            color: 'white',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {event.time && (
                                            <Icon
                                                fontSize="inherit"
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
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
    );
}
