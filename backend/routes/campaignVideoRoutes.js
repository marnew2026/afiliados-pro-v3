import express from "express";
import mongoose from "mongoose";
import { protect } from "../middlewares/authMiddleware.js";
import CampaignVideoTask from "../models/CampaignVideoTask.js";
import Campaign from "../models/Campaign.js";
import Distribution from "../models/Distribution.js";
import AutopilotSettings from "../models/AutopilotSettings.js";
import { campaignVideoTaskView } from "../services/campaigns/CampaignVideoTaskView.js";
import { scheduleCampaignLinks } from "../services/campaigns/CampaignLinkBatchService.js";
import { linkDailyStart, LINK_CHANNELS, linkChannelAllowed } from "../services/autopilot/KaelLinkAutomationService.js";
import { campaignVideoQueue, enqueueCampaignVideo } from "../queue/campaignVideoQueue.js";
const router = express.Router();
router.use(protect);
router.use((req, res, next) => process.env.KAEL_PRODUCT_VIDEO_ENABLED === "true" ? next() :
  res.status(503).json({ success: false, error: "Criacao automatica por link desativada." }));
const view = task => campaignVideoTaskView(task, id => campaignVideoQueue.getJob(id));
router.post("/", async (req, res) => {
  try {
    const batch = Array.isArray(req.body?.links);
    const results = await scheduleCampaignLinks({ userId: req.user._id, links: batch ? req.body.links : [req.body?.link], enqueue: enqueueCampaignVideo });
    if (!batch) {
      const first = results[0];
      if (!first.accepted) return res.status(503).json({ success: false, error: first.error });
      return res.status(first.task.status === "ready" ? 200 : 202).json({ success: true, task: await view(first.task) });
    }
    return res.status(202).json({ success: true, results: await Promise.all(results.map(async item =>
      item.accepted ? { link: item.link, accepted: true, task: await view(item.task) } : item)) });
  } catch (error) { return res.status(error.statusCode || 400).json({ success: false, error: error.message || "Nao foi possivel agendar." }); }
});
router.get("/summary", async (req, res) => {
  try {
    const userId = req.user._id, since = linkDailyStart(new Date());
    const [settings, rows, campaigns, waiting, failed] = await Promise.all([
      AutopilotSettings.findOne({ userId }).lean(),
      Distribution.aggregate([{ $match: { userId, automationKey: { $exists: true }, publishedAt: { $gte: since }, status: "published" } },
        { $group: { _id: "$channel", count: { $sum: 1 } } }]),
      CampaignVideoTask.distinct("campaignId", { userId }),
      CampaignVideoTask.countDocuments({ userId, status: { $in: ["queued", "processing"] } }),
      Distribution.countDocuments({ userId, automationKey: { $exists: true }, status: "failed" }),
    ]);
    const clicks = await Campaign.aggregate([{ $match: { userId, _id: { $in: campaigns } } }, { $group: { _id: null, count: { $sum: "$clicks" } } }]);
    res.json({ success: true, summary: { enabled: settings?.enabled === true && settings?.linkAutomation === true && settings?.mode === "automatico",
      serverEnabled: process.env.KAEL_LINK_AUTOMATION_ENABLED === "true", publishedToday: rows.reduce((n, row) => n + row.count, 0),
      byChannel: Object.fromEntries(rows.map(row => [row._id, row.count])), generating: waiting, failedPublications: failed,
      campaignClicksTotal: clicks[0]?.count || 0, channels: LINK_CHANNELS.map(channel => ({ channel, available: linkChannelAllowed(channel) })) } });
  } catch { res.status(503).json({ success: false, error: "Nao foi possivel consultar a atividade do KAEL." }); }
});
router.get("/", async (req, res) => {
  try {
    const tasks = await CampaignVideoTask.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(50).lean();
    const distributions = await Distribution.find({ userId: req.user._id, campaignId: { $in: tasks.map(task => task.campaignId) }, automationKey: { $exists: true } })
      .select("campaignId channel status lastError").lean();
    res.json({ success: true, tasks: await Promise.all(tasks.map(async task => ({ ...await view(task),
      publications: distributions.filter(row => String(row.campaignId) === String(task.campaignId)).map(row => ({ channel: row.channel, status: row.status,
        error: row.status === "failed" ? "Falha na divulgacao. Confira a autorizacao da rede e o diagnostico no dashboard." : null })) }))) });
  } catch { res.status(503).json({ success: false, error: "Nao foi possivel consultar seus links." }); }
});
router.get("/:taskId", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.taskId)) return res.status(400).json({ success: false, error: "Tarefa invalida." });
  try {
    const task = await CampaignVideoTask.findOne({ _id: req.params.taskId, userId: req.user._id });
    if (!task) return res.status(404).json({ success: false, error: "Tarefa nao encontrada." });
    return res.json({ success: true, task: await view(task) });
  } catch { return res.status(503).json({ success: false, error: "Falha ao consultar tarefa." }); }
});
export default router;
