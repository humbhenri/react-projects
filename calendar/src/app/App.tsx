import './App.css';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const rows = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

function App() {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="stretch">
      <Box>
        <h1>Test</h1>
      </Box>
      <TableContainer component={"div"}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          {rows.map((row) => (
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default App;
