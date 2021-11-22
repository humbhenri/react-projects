export function formatMoney(ammount: number): string {
    const format = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format;
    return format(ammount);
}