export function fraudEngine(event) {
  let score = 0;

  if (event.ipReputation === "bad") score += 40;
  if (event.clickVelocity > 15) score += 30;
  if (event.newDevice === true) score += 20;
  if (event.countryMismatch) score += 25;

  return {
    score,
    isFraud: score >= 70
  };
}