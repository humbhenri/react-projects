import { IDespesa } from "./services/backend";

export interface IDespesaCategoria {
  categoria: string;
  valor: number;
}

export interface IDespesasScreenState {
  anoMes: string;
  despesas: IDespesa[];
  despesaTotal: number;
  despesasCategoria: IDespesaCategoria[];
}

export type IDespesasScreenAction =
  | {
      type: "load";
      payload: { anoMes: string; despesas: IDespesa[] };
    }
  | { type: "trocaMes"; payload: string };

function groupBy(xs: any[], key: string) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function calculaDespesaPorCategoria(despesas: IDespesa[]): IDespesaCategoria[] {
  const grupo = groupBy(despesas, "categoria");
  const retorno: IDespesaCategoria[] = [];
  Object.keys(grupo).forEach((categoria) => {
    const valor = grupo[categoria]
      .map((obj: IDespesa) => obj.valor)
      .reduce((prev: number, current: number) => prev + current, 0);
    retorno.push({ categoria, valor });
  });
  return retorno.sort((obj1, obj2) =>
    obj1.categoria.localeCompare(obj2.categoria)
  );
}

export function reducer(
  state: IDespesasScreenState,
  action: IDespesasScreenAction
): IDespesasScreenState {
  switch (action.type) {
    case "load":
      return {
        ...state,
        anoMes: action.payload.anoMes,
        despesas: action.payload.despesas,
        despesaTotal: action.payload.despesas
          .map((d) => d.valor)
          .reduce((acc, valor) => acc + valor, 0),
        despesasCategoria: calculaDespesaPorCategoria(action.payload.despesas),
      };
    case "trocaMes":
      return {
        ...state,
        anoMes: action.payload,
      };
    default:
      return state;
  }
}
