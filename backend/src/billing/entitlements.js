export function getPlanLimits(user) {
  if (user.isPro) {
    return {
      campaigns: 9999,
      dailyPosts: 1000,
    };
  }

  return {
    campaigns: 5,
    dailyPosts: 10,
  };
}