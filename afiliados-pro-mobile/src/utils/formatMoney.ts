export function formatMoney(value: any): string {
     
  console.log(value);
  const num = Number(value);

  if (!isFinite(num)) {
    return "0,00";
  }

  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}