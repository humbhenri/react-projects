import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import { getDataForYear, headers } from "../services/backend";
import ButtonAppBar from "./ButtonAppBar";
import DataTable from "./DataTable";
import Team from "./Team";
import YearSelect from "./YearSelect";

export default function MainScreen() {
  const { year } = useParams<"year">();
  const [yearValue, setYearValue] = useState(+year!);
  const [rows, setRows] = useState<any>([]);
  const navigate = useNavigate();

  function handleYearSelected(_year: number) {
    setYearValue(_year);
    navigate(`/year/${_year}`);
  }

  function setTeamShield(team: { id: string; values: any[] }) {
    const src = slugify(team.id, '_').toLowerCase();
    team.values.unshift(
      <Team label={team.id} src={`/img/${src}.png`} />
    );
  }

  useEffect(() => {
    getDataForYear(yearValue).then((data) => {
      data.forEach((team: { id: string; values: any[] }) =>
        setTeamShield(team)
      );
      setRows(data);
    });
  }, [yearValue]);

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
