import crypto from "node:crypto";
import Campaign from "../../models/Campaign.js";
import ChannelConnection from "../../models/ChannelConnection.js";
import Distribution from "../../models/Distribution.js";
import AutopilotSettings from "../../models/AutopilotSettings.js";
import { buildKaelDistributionContent } from "../distribution/KaelDistributionContentBuilder.js";
import { runKaelDistribution } from "../distribution/KaelDistributionRunner.js";
import { assertIntegrationOperational } from "../readiness/IntegrationExecutionGate.js";
import { getIntegrationReadiness } from "../readiness/IntegrationReadinessService.js";

export const VIDEO_CHANNELS = ["instagram", "facebook", "tiktok", "kwai"];
const skip = (reason) => ({ success: true, skipped: true, reason });

export function assertVideoAutopilotAllowed(channel, env = process.env) {
  if (!VIDEO_CHANNELS.includes(channel)) throw new Error("Canal de video invalido.");
  if (env.KAEL_VIDEO_AUTOPILOT_ENABLED !== "true") return false;
  const deployment = env.KAEL_VIDEO_AUTOPILOT_ENV;
  if (!["staging", "production"].includes(deployment)) return false;
  assertIntegrationOperational(channel, env);
  const readiness = getIntegrationReadiness(env).channels.find((item) => item.channel === channel);
  // NODE_ENV=production must never bypass the production release locks.
  return env.NODE_ENV === "production" || deployment === "production"
    ? readiness.readyForProduction : readiness.readyForStaging;
}

export async function runKaelVideoAutopilotOnce(userId, {
  channel,
  env = process.env,
  settingsModel = AutopilotSettings,
  campaignModel = Campaign,
  connectionModel = ChannelConnection,
  distributionModel = Distribution,
  contentBuilder = buildKaelDistributionContent,
  runner = runKaelDistribution,
  gate = assertVideoAutopilotAllowed,
  now = () => new Date(),
  tokenFactory = () => crypto.randomUUID(),
} = {}) {
  if (!userId) throw new Error("userId nao informado ao KAEL Autopilot.");
  const allowed = () => {
    try { return gate(channel, env); }
    catch (error) {
      if (error.code === "INTEGRATION_NOT_OPERATIONAL") return false;
      throw error;
    }
  };
  if (!allowed()) return skip("video_autopilot_blocked");
  const current = await settingsModel.findOne({ userId }).lean();
  if (!current) return skip("settings_not_found");
  if (!current.enabled) return skip("autopilot_disabled");
  if (current.mode !== "automatico") return skip("autopilot_not_automatic");
  if (!current.channels?.includes(channel)) return skip("channel_not_enabled");
  const lockToken = tokenFactory();
  const startedAt = now();
  const settings = await settingsModel.findOneAndUpdate({
    userId, enabled: true, mode: "automatico", channels: channel,
    $or: [{ runLockedUntil: null }, { runLockedUntil: { $lte: startedAt } }],
  }, { $set: { runLockToken: lockToken, runLockedUntil: new Date(startedAt.getTime() + 300000) } }, { new: true });
  if (!settings) return skip("autopilot_locked");
  const ownedLock = { _id: settings._id, runLockToken: lockToken };
  try {
    if (!Number.isInteger(settings.dailyLimit) || settings.dailyLimit < 1 || settings.dailyLimit > 10 ||
        !Number.isFinite(settings.minIntervalMinutes) || settings.minIntervalMinutes < 30) {
      return skip("invalid_autopilot_limits");
    }
    const connection = await connectionModel.findOne({ userId, provider: channel, active: true }).lean();
    if (!connection) return skip("channel_connection_not_found");
    const startOfDay = new Date(startedAt);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const dailyFilter = { userId, channel, status: { $in: ["scheduled", "processing", "published"] }, createdAt: { $gte: startOfDay } };
    if (await distributionModel.countDocuments(dailyFilter) >= settings.dailyLimit) return skip("daily_limit_reached");
    // One queued/in-flight publication per channel prevents duplicate retry cycles.
    const inflightFilter = { userId, channel, source: "autopilot", status: { $in: ["scheduled", "processing"] } };
    if (await distributionModel.exists(inflightFilter)) return skip("distribution_in_progress");
    const last = await distributionModel.findOne({ userId, channel, status: "published", publishedAt: { $ne: null } })
      .sort({ publishedAt: -1 }).select("publishedAt campaignId").lean();
    if (last?.publishedAt && startedAt.getTime() < new Date(last.publishedAt).getTime() + settings.minIntervalMinutes * 60000) {
      return skip("cooldown_active");
    }
    const pendingId = settings.videoPendingCampaigns?.get?.(channel) || settings.videoPendingCampaigns?.[channel];
    const campaignFilter = { userId, active: true, status: "active" };
    let campaign = pendingId
      ? await campaignModel.findOne({ ...campaignFilter, _id: pendingId }).lean() : null;
    if (!campaign) {
      campaign = await campaignModel.findOne({ ...campaignFilter, ...(last?.campaignId ? { _id: { $ne: last.campaignId } } : {}) })
        .sort({ clicks: 1, createdAt: 1 }).lean();
      if (!campaign && last?.campaignId) campaign = await campaignModel.findOne(campaignFilter).sort({ clicks: 1, createdAt: 1 }).lean();
    }
    if (!campaign) return skip("campaign_not_found");
    const content = await contentBuilder({ userId, campaign, channel,
      trackingUrl: `${String(env.BASE_URL || "").replace(/\/+$/, "")}/campaigns/r/${campaign._id}` });
    const beforeCreate = async () => {
      if (!allowed()) return false;
      if (!(await settingsModel.exists({ userId, enabled: true, mode: "automatico", channels: channel,
        runLockToken: lockToken, runLockedUntil: { $gt: now() },
        dailyLimit: settings.dailyLimit, minIntervalMinutes: settings.minIntervalMinutes }))) return false;
      if (!(await campaignModel.exists({ ...campaignFilter, _id: campaign._id }))) return false;
      if (!(await connectionModel.exists({ userId, provider: channel, active: true }))) return false;
      if (await distributionModel.exists(inflightFilter)) return false;
      return await distributionModel.countDocuments(dailyFilter) < settings.dailyLimit;
    };
    const result = await runner({ userId, campaign, channel, content, beforeCreate });
    if (result?.status === "PENDING") {
      await settingsModel.updateOne(ownedLock, { $set: { [`videoPendingCampaigns.${channel}`]: campaign._id } });
      return { ...skip("media_pending"), mediaStatus: "PENDING", campaignId: campaign._id };
    }
    if (result?.skipped) return result;
    if (!result?.distribution?._id || !result?.queue?.jobId) throw new Error("Resultado de distribuicao invalido.");
    await settingsModel.updateOne(ownedLock, { $set: { lastRunAt: now() }, $unset: { [`videoPendingCampaigns.${channel}`]: "" } });
    return { success: true, skipped: false, channel, campaignId: campaign._id,
      distributionId: result.distribution._id, queueJobId: result.queue.jobId };
  } finally {
    await settingsModel.updateOne(ownedLock, { $set: { runLockedUntil: null, runLockToken: null } });
  }
}
