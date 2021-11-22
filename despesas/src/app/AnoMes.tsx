import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { formatMonth } from "./services/date";

const ANOS: string[] = Array.from({ length: 100 }, (_, i) => i + 1950).map(
  (v) => v.toString()
);

const format = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format;
const MESES: string[] = [...Array.from({ length: 12 }, (_, i) => i + 1)].map(
  (m) => {
    const mes = format(new Date(Date.UTC(2021, m)));
    return mes[0].toUpperCase() + mes.substr(1);
  }
);
interface IAnoMesProps {
  onMesSelected: (anoMes: string) => void;
  anoMes: string;
}

export default function AnoMes(props: IAnoMesProps) {
  const { onMesSelected, anoMes } = props;
  const [valorAno, setValorAno] = useState<string>(anoMes.substr(0, 4));
  const [valorMes, setValorMes] = useState<string>(formatMonth(anoMes));

  useEffect(() => {
    setValorAno(anoMes.substr(0, 4));
    setValorMes(formatMonth(anoMes));
  }, [anoMes]);

  function getNumeroMes(mes: string): string {
    const numero = MESES.findIndex((value) => value === mes) + 1;
    return numero.toString().padStart(2, "0");
  }

  function handleAnoSelected(evt: SelectChangeEvent) {
    const ano = evt.target.value;
    setValorAno(ano);
    onMesSelected(`${ano}-${getNumeroMes(valorMes)}`);
  }

  function handleMesSelected(evt: SelectChangeEvent) {
    const mes = evt.target.value;
    setValorMes(mes);
    onMesSelected(`${valorAno}-${getNumeroMes(mes)}`);
  }

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Ano</InputLabel>
        <Select label="Ano" value={valorAno} onChange={handleAnoSelected}>
          {ANOS.map((ano) => (
            <MenuItem key={ano} value={ano}>
              {ano}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Mês</InputLabel>
        <Select label="Mês" value={valorMes} onChange={handleMesSelected}>
          {MESES.map((mes) => (
            <MenuItem key={mes} value={mes}>
              {mes}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
