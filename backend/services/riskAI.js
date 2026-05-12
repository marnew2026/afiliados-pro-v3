export function riskAI(data) {
  let risk = 0;

  if (data.botPattern) risk += 40;
  if (data.sameIPMultipleAccounts) risk += 35;
  if (data.abnormalRevenueSpike) risk += 25;

  return {
    risk,
    status:
      risk > 70 ? "BLOCK" :
      risk > 40 ? "REVIEW" : "OK"
  };
}