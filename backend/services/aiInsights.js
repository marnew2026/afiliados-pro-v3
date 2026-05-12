export function predictConversion(clicks, sales) {
  if (clicks === 0) return 0;

  const rate = sales / clicks;

  if (rate > 0.1) return "HIGH";
  if (rate > 0.03) return "MEDIUM";
  return "LOW";
}