export function hasExpiredFounderAccess(user, now = new Date()) {
  if (user?.accessSource !== "FOUNDER_TRIAL") return false;
  if (!user.proAccessEndsAt) return true;
  return new Date(user.proAccessEndsAt).getTime() <= now.getTime();
}

export async function refreshUserAccess(user, now = new Date()) {
  if (!user || !hasExpiredFounderAccess(user, now)) return user;

  user.plan = "FREE";
  user.isPro = false;
  user.accessSource = "FREE";
  user.proAccessEndsAt = null;
  await user.save();

  return user;
}

export function publicAccessDetails(user) {
  return {
    plan: user?.plan || "FREE",
    isPro: user?.isPro === true,
    accessSource: user?.accessSource || (user?.isPro ? "LEGACY" : "FREE"),
    proAccessEndsAt: user?.proAccessEndsAt || null,
    founderTrialClaimNumber: user?.founderTrialClaimNumber || null,
  };
}
