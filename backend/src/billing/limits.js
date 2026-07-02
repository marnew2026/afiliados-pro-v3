export function canPost(user, todayCount) {
  return todayCount < user.limits.postsPerDay;
}
export function canRunRobot(user) {
  if (user.isPro) return true;

  // free tier limit
  return user.riskScore < 70;
}

export function campaignLimit(user) {
  return user.isPro ? 9999 : 5;
}