import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { formatMoney } from "./services/money";
import { IDespesaCategoria } from "./despesasScreenReducer";

const useStyles = makeStyles(() => ({
  table: {
    margin: "4em",
  },
  tableContainer: {
    display: "flex",
  },
}));

interface IResumoProps {
  despesas: IDespesaCategoria[];
}

export default function Resumo(props: IResumoProps) {
  const classes = useStyles();

  return (
    <TableContainer component="div" className={classes.tableContainer}>
      <Table size="small" aria-label="despesas" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="right">Valor(R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.despesas.map(({ categoria, valor }) => (
            <TableRow key={categoria}>
              <TableCell align="left">{categoria}</TableCell>
              <TableCell align="right">
                {formatMoney(valor).substr(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
