export const headers = ["", "Total", "V", "E", "D", "GP", "GC", "S"];

export async function getDataForYear(year: number): Promise<any> {
  const res = await fetch(`http://localhost:3001/${year}`);
  const data: any = await res.json();
  return ranking(data);
}

function sortData(data: any[] | undefined) {
  if (!data) {
    return;
  }
  data.sort((rodada1, rodada2) => rodada2.numero - rodada1.numero);
}

function score(general: {
  total_pontos: any;
  total_vitorias: any;
  total_empates: any;
  total_derrotas: any;
  total_gols_marcados: any;
  total_gols_sofridos: any;
}) {
  const {
    total_pontos,
    total_vitorias,
    total_empates,
    total_derrotas,
    total_gols_marcados,
    total_gols_sofridos,
  } = general;
  return [
    total_pontos,
    total_vitorias,
    total_empates,
    total_derrotas,
    total_gols_marcados,
    total_gols_sofridos,
    total_gols_marcados - total_gols_sofridos,
  ];
}

export function ranking(data: any[] | undefined) {
  if (!data) {
    return null;
  }
  sortData(data);
  const rodadaFinal = data[0].partidas;
  const ranking = [];
  for (let partida of rodadaFinal) {
    const mandante = partida.mandante;
    ranking.push({
      id: mandante,
      values: score(partida.pontuacao_geral_mandante),
    });
    const visitante = partida.visitante;
    ranking.push({
      id: visitante,
      values: score(partida.pontuacao_geral_visitante),
    });
  }
  ranking.sort((team1, team2) => {
    const total1 = team1.values[0];
    const total2 = team2.values[0];
    return +total2 - +total1;
  });
  return ranking;
}
