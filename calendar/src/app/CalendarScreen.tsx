import Box from "@material-ui/core/Box";
import { makeStyles } from "@mui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import { IconButton } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme?: any) => ({
  table: {
    height: "100%",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)",
    },
  },
  tbody: {
    height: "100%",
  },
  agenda: {
    minWidth: "16em",
    padding: "8px 16px",
  },
}));

const rows = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
export default function CalendarScreen() {
  const classes = useStyles();
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
      <TableContainer component={"div"}>
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
          <Box display="flex" alignItems="center" justifyItems="center">
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
              {rows.map((row) => (
                <TableCell align="center" key={row}>
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            <TableRow>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
              <TableCell align="center">x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
