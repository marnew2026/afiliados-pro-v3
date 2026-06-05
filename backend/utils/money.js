export const toCents = (value) => {
  return Math.round(Number(value) * 100);
};

export const toReais = (cents) => {
  return cents / 100;
};

export const fixMoney = (value) => {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
};