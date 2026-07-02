export function routeJob(user) {
  if (user.plan === "FREE") {
    return { queue: "low" };
  }

  if (user.plan === "PRO") {
    return { queue: "medium" };
  }

  return { queue: "high" };
}