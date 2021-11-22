import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { IDespesa } from "./services/backend";

const useStyles = makeStyles(() => ({
  table: {
    margin: "4em",
  },
  tableContainer: {
    display: "flex",
  },
}));

export default function Despesas(props: { despesas: IDespesa[] }) {
  const { despesas } = props;
  const classes = useStyles();
  return (
    <TableContainer component="div" className={classes.tableContainer}>
      <Table size="small" aria-label="despesas" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Despesa</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Dia</TableCell>
            <TableCell align="left">Valor(R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map(({ id, descricao, categoria, valor, dia }) => (
            <TableRow key={id}>
              <TableCell align="left">{descricao}</TableCell>
              <TableCell align="left">{categoria}</TableCell>
              <TableCell align="left">{dia}</TableCell>
              <TableCell align="left">{valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
