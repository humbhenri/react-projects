const baseUrl = "http://127.0.0.1:3001";

export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUser {
  id?: number;
  nome: string;
  email: string;
}

export async function getDespesas(anoMes: string): Promise<IDespesa[]> {
  const resp = await fetch(`${baseUrl}/despesas?mes=${anoMes}&_sort=dia`, {
    credentials: "include",
  });
  return handleResponse(resp);
}

export async function login(email: string, senha: string): Promise<IUser> {
  const resp = await fetch(`${baseUrl}/sessao/criar`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });
  return handleResponse(resp);
}

export async function logout(): Promise<void> {
  const resp = await fetch(`${baseUrl}/sessao/finalizar`, {
    credentials: "include",
    method: "POST",
  });
  return handleResponse(resp);
}

export async function getUser(): Promise<IUser> {
  const resp = await fetch(`${baseUrl}/sessao/usuario`, {
    credentials: "include",
  });
  return handleResponse(resp);
}

async function handleResponse(resp: Response): Promise<any> {
  if (resp.ok) {
    return await resp.json();
  }
  if (resp.status === 404) {
    return null;
  }
  throw new Error(resp.statusText);
}
