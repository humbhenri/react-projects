import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDataForYear, headers } from "../services/backend";
import ButtonAppBar from "./ButtonAppBar";
import DataTable from "./DataTable";
import Team from "./Team";
import YearSelect from "./YearSelect";

export default function MainScreen() {
  const { year } = useParams<"year">();
  const [yearValue, setYearValue] = useState(+year!);
  const navigate = useNavigate();

  function handleYearSelected(_year: number) {
    setYearValue(_year);
    navigate(`/year/${_year}`);
  }

  const rows = getDataForYear(yearValue);
  rows[0].values[0] = <Team src="/img/cruzeiro.png" label="Cruzeiro" />

  return (
    <>
      <ButtonAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <YearSelect year={yearValue} onYearSelected={handleYearSelected} />
        <h2>Campeonato brasileiro de {yearValue}</h2>
        <h3>Classificação</h3>
        <DataTable headers={headers} rows={rows} />
      </Box>
    </>
  );
}
