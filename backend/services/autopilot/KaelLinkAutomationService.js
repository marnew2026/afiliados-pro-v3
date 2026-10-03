import crypto from "node:crypto";
import AutopilotSettings from "../../models/AutopilotSettings.js";
import CampaignVideoTask from "../../models/CampaignVideoTask.js";
import Campaign from "../../models/Campaign.js";
import ChannelConnection from "../../models/ChannelConnection.js";
import Distribution from "../../models/Distribution.js";
import MediaAsset from "../../models/MediaAsset.js";
import { assertVideoAutopilotAllowed } from "./KaelVideoAutopilotService.js";
import { assertIntegrationOperational } from "../readiness/IntegrationExecutionGate.js";
import { getIntegrationReadiness } from "../readiness/IntegrationReadinessService.js";
import { resolveKaelDistributionCreator } from "../distribution/KaelDistributionCreatorResolver.js";
import { buildProductAdScript } from "../media/template/ProductAdScript.js";

export async function scheduleLinkDistribution(input) {
  const { distributionQueue, scheduleDistribution } = await import("../../queue/distributionQueue.js");
  const existing = await distributionQueue.getJob(String(input.distributionId));
  if (existing && await existing.getState() === "failed") await existing.retry();
  return existing ? { jobId: existing.id } : scheduleDistribution(input);
}

export const LINK_CHANNELS = ["telegram", "tiktok", "instagram", "facebook", "kwai"];
export function linkChannelAllowed(channel, env = process.env) {
  try {
    if (!["staging", "production"].includes(env.KAEL_VIDEO_AUTOPILOT_ENV)) return false;
    if (channel !== "telegram") return assertVideoAutopilotAllowed(channel, env);
    assertIntegrationOperational(channel, env);
    const ready = getIntegrationReadiness(env).channels.find(item => item.channel === channel);
    return env.NODE_ENV === "production" || env.KAEL_VIDEO_AUTOPILOT_ENV === "production"
      ? ready.readyForProduction : ready.readyForStaging;
  } catch (error) {
    if (error.code === "INTEGRATION_NOT_OPERATIONAL") return false;
    throw error;
  }
}
export function linkDailyStart(date) {
  // Dia comercial brasileiro (UTC-3), sem depender do fuso do servidor Render.
  const day = new Date(date.getTime() - 3 * 3600000);
  day.setUTCHours(0, 0, 0, 0);
  return new Date(day.getTime() + 3 * 3600000);
}
export function linkCampaignContent(task, channel) {
  const script = buildProductAdScript(task.product);
  const caption = String(task.caption || script.caption).slice(0, 1700);
  return { caption, text: caption, hashtags: script.hashtags || [], cta: "Confira os detalhes no link da campanha." };
}
export async function runLinkAutomationUser(userId, {
  env = process.env, settingsModel = AutopilotSettings, taskModel = CampaignVideoTask,
  campaignModel = Campaign, connectionModel = ChannelConnection, distributionModel = Distribution,
  assetModel = MediaAsset, creatorResolver = resolveKaelDistributionCreator, scheduler = scheduleLinkDistribution,
  gate = linkChannelAllowed, contentBuilder = linkCampaignContent, now = () => new Date(), tokenFactory = () => crypto.randomUUID(),
} = {}) {
  if (env.KAEL_LINK_AUTOMATION_ENABLED !== "true" || env.KAEL_PRODUCT_VIDEO_ENABLED !== "true") return [];
  const started = now(), lockToken = tokenFactory();
  const settings = await settingsModel.findOneAndUpdate({ userId, enabled: true, mode: "automatico", linkAutomation: true,
    $or: [{ runLockedUntil: null }, { runLockedUntil: { $lte: started } }] },
    { $set: { runLockToken: lockToken, runLockedUntil: new Date(started.getTime() + 300000), linkLastRunAt: started } }, { new: true });
  if (!settings) return [];
  const results = [];
  try {
    if (!Number.isInteger(settings.dailyLimit) || settings.dailyLimit < 1 || settings.dailyLimit > 10 ||
      !Number.isFinite(settings.minIntervalMinutes) || settings.minIntervalMinutes < 30) return [{ reason: "invalid_limits" }];
    for (const channel of [...new Set(settings.channels || [])].filter(c => LINK_CHANNELS.includes(c))) {
      try {
        if (!gate(channel, env)) { results.push({ channel, reason: "channel_not_ready" }); continue; }
        const connection = await connectionModel.findOne({ userId, provider: channel, active: true }).lean();
        if (!connection) { results.push({ channel, reason: "connection_required" }); continue; }
        const base = { userId, channel };
        // Uma reserva pode sobreviver a queda entre MongoDB e Redis, ou a uma pausa do usuario.
        const reserved = await distributionModel.findOne({ ...base, automationKey: { $exists: true }, status: "scheduled" }).lean();
        if (reserved && await settingsModel.exists({ _id: settings._id, enabled: true, linkAutomation: true, mode: "automatico", channels: channel,
          runLockToken: lockToken, runLockedUntil: { $gt: now() } })) {
          await scheduler({ distributionId: reserved._id, scheduledAt: reserved.scheduledAt });
          results.push({ channel, reason: "in_progress" }); continue;
        }
        const daily = { ...base, status: { $in: ["scheduled", "processing", "published", "delivered"] }, createdAt: { $gte: linkDailyStart(started) } };
        if (await distributionModel.countDocuments(daily) >= settings.dailyLimit) { results.push({ channel, reason: "daily_limit" }); continue; }
        if (await distributionModel.exists({ ...base, status: { $in: ["scheduled", "processing"] } })) { results.push({ channel, reason: "in_progress" }); continue; }
        const last = await distributionModel.findOne({ ...base, status: { $in: ["published", "delivered"] } }).sort({ updatedAt: -1 }).lean();
        if (last && started.getTime() < new Date(last.publishedAt || last.updatedAt).getTime() + settings.minIntervalMinutes * 60000) {
          results.push({ channel, reason: "interval" }); continue;
        }
        // Somente uma autorizacao realmente renovada retoma um 401 definitivo; mesmo registro/fila.
        const denied = await distributionModel.findOne({ ...base, automationKey: { $exists: true }, status: "failed",
          authorizationRecoveries: { $lt: 3 },
          $or: [{ lastError: /access_token_invalid|HTTP 401/ }, { attempts: 0, lastError: /^Falha ao agendar/ }] }).sort({ createdAt: 1 }).lean();
        if (denied && ((denied.attempts === 0 && /^Falha ao agendar/.test(denied.lastError || "")) ||
          (connection.connectedAt && new Date(connection.connectedAt).getTime() > new Date(denied.authorizationAt || denied.createdAt).getTime())) &&
          await campaignModel.exists({ _id: denied.campaignId, userId, active: true, status: "active" }) &&
          await settingsModel.exists({ _id: settings._id, enabled: true, linkAutomation: true, mode: "automatico", channels: channel,
            runLockToken: lockToken, runLockedUntil: { $gt: now() } })) {
          const recovered = await distributionModel.findOneAndUpdate({ _id: denied._id, status: "failed", authorizationRecoveries: { $lt: 3 } },
            { $set: { status: "scheduled", authorizationAt: connection.connectedAt, destinationId: connection.destinationId, lastError: null },
              $inc: { authorizationRecoveries: 1 } }, { new: true });
          if (recovered) await scheduler({ distributionId: recovered._id, scheduledAt: now() });
          results.push({ channel, reason: "authorization_renewed" }); continue;
        }
        // Falhas ficam visiveis; nao cria outra publicacao para contornar uma falha de autorizacao.
        const used = await distributionModel.distinct("campaignId", { ...base, source: "autopilot" });
        const activeIds = await campaignModel.distinct("_id", { userId, active: true, status: "active" });
        const task = await taskModel.findOne({ userId, status: "ready", campaignId: { $in: activeIds, $nin: used } }).sort({ createdAt: 1 }).lean();
        if (!task) { results.push({ channel, reason: "waiting_for_links" }); continue; }
        const campaignFilter = { _id: task.campaignId, userId, active: true, status: "active" };
        const campaign = await campaignModel.findOne(campaignFilter).lean();
        if (!campaign) { results.push({ channel, reason: "campaign_inactive" }); continue; }
        const asset = await assetModel.findOne({ _id: task.mediaAssetId, userId, campaignId: task.campaignId, type: "video", status: "ready" }).lean();
        if (channel !== "telegram" && !asset?.assetUrl?.startsWith("https://")) { results.push({ channel, reason: "video_unavailable" }); continue; }
        const automationKey = `links/${userId}/${task.campaignId}/${channel}`;
        const content = contentBuilder(task, channel);
        const stillAutomatic = async () => gate(channel, env) &&
          await settingsModel.exists({ _id: settings._id, enabled: true, linkAutomation: true, mode: "automatico", channels: channel,
            runLockToken: lockToken, runLockedUntil: { $gt: now() }, dailyLimit: settings.dailyLimit, minIntervalMinutes: settings.minIntervalMinutes }) &&
          await campaignModel.exists(campaignFilter) &&
          await connectionModel.exists({ _id: connection._id, userId, active: true }) &&
          await distributionModel.countDocuments(daily) < settings.dailyLimit;
        if (!(await stillAutomatic())) { results.push({ channel, reason: "state_changed" }); continue; }
        let result;
        if (channel === "telegram") {
          const trackingUrl = `${String(env.BASE_URL || "").replace(/\/+$/, "")}/campaigns/r/${task.campaignId}`;
          if (!trackingUrl.startsWith("https://")) throw new Error("BASE_URL HTTPS nao configurada.");
          const distribution = await distributionModel.create({ userId, campaignId: task.campaignId, channel, source: "autopilot", automationKey, authorizationAt: connection.connectedAt,
            destinationId: connection.destinationId, content: { ...content, contentType: "text", trackingUrl }, scheduledAt: now(), status: "scheduled" });
          try { result = { distribution, queue: await scheduler({ distributionId: distribution._id, scheduledAt: distribution.scheduledAt }) }; }
          catch (error) { distribution.status = "failed"; distribution.lastError = "Falha ao agendar divulgacao automatica."; await distribution.save(); throw error; }
        } else {
          result = await creatorResolver({ channel })({ userId, campaignId: String(task.campaignId), mediaAssetId: String(asset._id),
            ...content, source: "autopilot", automationKey, scheduler, env });
        }
        results.push({ channel, reason: "scheduled", campaignId: String(task.campaignId), distributionId: String(result.distribution._id) });
      } catch (error) {
        results.push({ channel, reason: error.code === 11000 ? "already_scheduled" : "scheduling_failed" });
        console.warn("KAEL LINKS: canal pendente", channel, error.code === 11000 ? "duplicacao evitada" : "falha ao agendar");
      }
    }
    return results;
  } finally { await settingsModel.updateOne({ _id: settings._id, runLockToken: lockToken }, { $set: { runLockedUntil: null, runLockToken: null } }); }
}
let running = false;
export async function runLinkAutomationScheduler({ env = process.env, settingsModel = AutopilotSettings,
  runner = runLinkAutomationUser, taskModel = CampaignVideoTask, enqueue } = {}) {
  if (running || env.KAEL_LINK_AUTOMATION_ENABLED !== "true" || env.KAEL_PRODUCT_VIDEO_ENABLED !== "true") return;
  running = true;
  try {
    // Recupera tarefas gravadas antes de uma queda da conexao com Redis.
    if (enqueue) {
      const waiting = await taskModel.find({ status: "queued" }).sort({ createdAt: 1 }).limit(30).select("_id").lean();
      for (const task of waiting) { try { await enqueue(task._id); } catch { console.warn("KAEL LINKS: fila indisponivel"); break; } }
    }
    const users = await settingsModel.find({ enabled: true, mode: "automatico", linkAutomation: true })
      .sort({ linkLastRunAt: 1, _id: 1 }).limit(20).select("userId").lean();
    for (const user of users) { try { await runner(user.userId, { env }); } catch { console.warn("KAEL LINKS: ciclo de usuario pendente"); } }
  } finally { running = false; }
}
