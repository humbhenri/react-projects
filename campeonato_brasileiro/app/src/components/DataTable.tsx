import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface IRow {
  id: string;
  values: any[];
}

interface IDataTableProps {
  headers: string[];
  rows: IRow[];
}

export default function DataTable(props: IDataTableProps) {
  const { headers, rows } = props;
  return (
    <TableContainer component={"div"}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell>{i + 1}</TableCell>
              {row.values.map((value) => (
                <TableCell>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
