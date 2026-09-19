import FoundingCohortState from "../../models/FoundingCohortState.js";

const COHORT_ID = "founding-users-v1";
const TRUE_VALUES = new Set(["true", "1", "yes", "on"]);

function isTrue(value) {
  return TRUE_VALUES.has(String(value || "").trim().toLowerCase());
}

function integerSetting(value, fallback, minimum, maximum) {
  const parsed = Number.parseInt(String(value || ""), 10);
  if (!Number.isInteger(parsed)) return fallback;
  return Math.min(Math.max(parsed, minimum), maximum);
}

function optionalDate(value) {
  const cleanValue = String(value || "").trim();
  if (!cleanValue) return null;
  const date = new Date(cleanValue);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getFoundingCohortConfig(env = process.env) {
  return {
    enabled: isTrue(env.FOUNDING_COHORT_ENABLED),
    limit: integerSetting(env.FOUNDING_COHORT_LIMIT, 1000, 1, 100000),
    durationDays: integerSetting(env.FOUNDING_COHORT_DURATION_DAYS, 30, 1, 365),
    startsAt: optionalDate(env.FOUNDING_COHORT_START_AT),
    endsAt: optionalDate(env.FOUNDING_COHORT_END_AT),
  };
}

export function isFoundingCohortOpen(config, now = new Date()) {
  if (!config.enabled) return false;
  if (config.startsAt && now < config.startsAt) return false;
  if (config.endsAt && now >= config.endsAt) return false;
  return true;
}

export async function grantFoundingAccess({
  user,
  env = process.env,
  cohortModel = FoundingCohortState,
  now = () => new Date(),
}) {
  if (!user) throw new Error("Usuario obrigatorio para concessao fundadora.");

  if (user.founderTrialGrantedAt) {
    return {
      granted: false,
      reason: "already_granted",
      claimNumber: user.founderTrialClaimNumber || null,
    };
  }

  const config = getFoundingCohortConfig(env);
  const grantedAt = now();

  if (!isFoundingCohortOpen(config, grantedAt)) {
    return { granted: false, reason: "campaign_closed" };
  }

  await cohortModel.updateOne(
    { _id: COHORT_ID },
    { $setOnInsert: { claimedCount: 0, limit: config.limit } },
    { upsert: true }
  );

  const state = await cohortModel.findOneAndUpdate(
    { _id: COHORT_ID, claimedCount: { $lt: config.limit } },
    {
      $inc: { claimedCount: 1 },
      $set: { limit: config.limit },
    },
    { new: true }
  );

  if (!state) return { granted: false, reason: "limit_reached" };

  const endsAt = new Date(
    grantedAt.getTime() + config.durationDays * 24 * 60 * 60 * 1000
  );

  const previousAccess = {
    plan: user.plan,
    isPro: user.isPro,
    accessSource: user.accessSource,
    proAccessEndsAt: user.proAccessEndsAt,
    founderTrialGrantedAt: user.founderTrialGrantedAt,
    founderTrialClaimNumber: user.founderTrialClaimNumber,
  };

  user.plan = "PRO";
  user.isPro = true;
  user.accessSource = "FOUNDER_TRIAL";
  user.proAccessEndsAt = endsAt;
  user.founderTrialGrantedAt = grantedAt;
  user.founderTrialClaimNumber = state.claimedCount;

  try {
    await user.save();
  } catch (error) {
    Object.assign(user, previousAccess);
    try {
      await cohortModel.updateOne(
        { _id: COHORT_ID, claimedCount: { $gt: 0 } },
        { $inc: { claimedCount: -1 } }
      );
    } catch (rollbackError) {
      console.error("ERRO FOUNDING COHORT ROLLBACK:", rollbackError.message);
    }
    throw error;
  }

  return {
    granted: true,
    reason: "granted",
    claimNumber: state.claimedCount,
    startsAt: grantedAt,
    endsAt,
  };
}
