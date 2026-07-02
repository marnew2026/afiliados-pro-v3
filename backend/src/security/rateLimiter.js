export function delayByPlan(plan) {
  if (plan === "FREE") return 5000;
  if (plan === "PRO") return 2000;
  return 500;
}