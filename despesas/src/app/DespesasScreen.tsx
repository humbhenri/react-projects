import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AnoMes from "./AnoMes";
import Despesas from "./Despesas";
import Header from "./Header";
import { getDespesas, IDespesa } from "./services/backend";
import { getTodayMonth } from "./services/date";
import { formatMoney } from "./services/money";
import UserHeader from "./UserHeader";

const useStyles = makeStyles(() => ({
  table: {
    margin: "4em",
  },
  tableContainer: {
    display: "flex",
  },
  header: {
    display: "flex",
    margin: "1em 4em",
    padding: "6px 16px",
    alignItems: "center",
    justifyContent: "center",
  },
  despesaTotal: {
    marginTop: "16px",
  },
}));

export default function DespesasScreen() {
  const { month } = useParams<"month">();
  let navigate = useNavigate();
  const [anoMes, setAnoMes] = useState<string>(month ?? getTodayMonth());
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  const [despesaTotal, setDespesaTotal] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    setAnoMes(month!);
  }, [month]);

  useEffect(() => {
    getDespesas(anoMes).then((_despesas) => {
      setDespesas(_despesas);
      if (_despesas.length) {
        setDespesaTotal(
          _despesas.map((d) => d.valor).reduce((acc, valor) => acc + valor)
        );
      } else {
        setDespesaTotal(0);
      }
    });
  }, [anoMes]);

  function handleMesSelected(mes: string) {
    setAnoMes(mes);
    navigate(`/despesas/${mes}`);
  }

  return (
    <Box>
      <Header>
        <Box width="100%">
          <UserHeader />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
        >
          <AnoMes onMesSelected={handleMesSelected} anoMes={anoMes}></AnoMes>
          <Box flex="1"></Box>
          <span className={classes.despesaTotal}>
            Despesa total: <strong>{formatMoney(despesaTotal)}</strong>
          </span>
        </Box>
      </Header>
      <Despesas despesas={despesas}></Despesas>
    </Box>
  );
}
