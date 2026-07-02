export async function canUserAct(tenant, usageToday) {
  return usageToday < tenant.limits.postsPerDay;
}