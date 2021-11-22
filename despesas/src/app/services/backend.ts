const baseUrl = 'http://127.0.0.1:3001';

export interface IDespesa {
    id: number;
    descricao: string;
    categoria: string;
    valor: number;
    mes: string;
    dia: string
}

export async function getDespesas(anoMes: string): Promise<IDespesa[]> {
    const resp = await fetch(`${baseUrl}/despesas?mes=${anoMes}&_sort=dia`);
    return resp.json();
}

