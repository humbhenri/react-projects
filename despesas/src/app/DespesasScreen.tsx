import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import AnoMes from "./AnoMes";
import BasicTabs from "./BasicTabs";
import Despesas from "./Despesas";
import { reducer } from "./despesasScreenReducer";
import Header from "./Header";
import Resumo from "./Resumo";
import { getDespesas } from "./services/backend";
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

function useDespesasScreenState(month: string) {
  const [state, dispatch] = useReducer(reducer, {
    anoMes: month ?? getTodayMonth(),
    despesas: [],
    despesaTotal: 0,
    despesasCategoria: [],
  });
  const { anoMes, despesas, despesaTotal, despesasCategoria } = state;

  useEffect(() => {
    dispatch({ type: "trocaMes", payload: month! });
  }, [month]);

  useEffect(() => {
    getDespesas(anoMes).then((_despesas) => {
      dispatch({ type: "load", payload: { anoMes, despesas: _despesas } });
    });
  }, [anoMes]);

  return { dispatch, anoMes, despesaTotal, despesas, despesasCategoria };
}

export default function DespesasScreen() {
  const { month } = useParams<"month">();
  let navigate = useNavigate();
  const classes = useStyles();
  const { dispatch, anoMes, despesaTotal, despesas, despesasCategoria } =
    useDespesasScreenState(month!);

  function handleMesSelected(mes: string) {
    dispatch({ type: "trocaMes", payload: mes });
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
      <BasicTabs>
        <Resumo despesas={despesasCategoria} />
        <Despesas despesas={despesas}></Despesas>
      </BasicTabs>
    </Box>
  );
}
