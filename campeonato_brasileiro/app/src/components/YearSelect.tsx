import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

interface IYearSelectProps {
  year: number;
  onYearSelected: (year: number) => void;
}

const YEARS: number[] = [];
for (let i = 2003; i <= 2015; i++) {
  YEARS.push(i);
}

export default function YearSelect(props: IYearSelectProps) {
  const { year, onYearSelected } = props;
  const [yearValue, setYearValue] = useState<number | null>(year);

  useEffect(() => {
    setYearValue(year);
  }, [year]);

  function handleYearSelected(evt: SelectChangeEvent) {
    const _year = evt.target.value;
    setYearValue(+_year);
    onYearSelected(+_year);
  }

  return (
    <div>
      <Select label="Year" value={yearValue + ""} onChange={handleYearSelected}>
        {YEARS.map((i) => (
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
