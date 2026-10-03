import express from "express";
import mongoose from "mongoose";
import { createHash } from "node:crypto";
import { protect } from "../middlewares/authMiddleware.js";
import Campaign from "../models/Campaign.js";
import CampaignVideoTask from "../models/CampaignVideoTask.js";
import { validateProductLink } from "../services/campaigns/MercadoLivreProductResolver.js";
import { campaignVideoTaskView } from "../services/campaigns/CampaignVideoTaskView.js";
import { campaignVideoQueue, enqueueCampaignVideo } from "../queue/campaignVideoQueue.js";
const router = express.Router();
router.use(protect);
router.use((req, res, next) => process.env.KAEL_PRODUCT_VIDEO_ENABLED === "true" ? next() :
  res.status(503).json({ success: false, error: "Criacao automatica por link desativada." }));
router.post("/", async (req, res) => {
  let link;
  try { link = validateProductLink(req.body?.link).href; }
  catch (error) { return res.status(400).json({ success: false, error: error.message }); }
  try {
    await CampaignVideoTask.init();
    const userId = req.user._id;
    const linkHash = createHash("sha256").update(link).digest("hex");
    let task = await CampaignVideoTask.findOne({ userId, linkHash });
    if (!task) {
      if (await CampaignVideoTask.countDocuments({ userId, status: { $in: ["queued", "processing"] } }) >= 3) {
        return res.status(429).json({ success: false, error: "Aguarde as campanhas em processamento." });
      }
      const existingCampaign = await Campaign.findOne({ userId, link });
      if (existingCampaign && (!existingCampaign.active || existingCampaign.status !== "active")) {
        return res.status(409).json({ success: false, error: "Esta campanha esta pausada ou arquivada." });
      }
      try { task = await CampaignVideoTask.create({ userId, linkHash, link, campaignId: existingCampaign?._id || new mongoose.Types.ObjectId() }); }
      catch (error) { if (error.code !== 11000) throw error; task = await CampaignVideoTask.findOne({ userId, linkHash }); }
    }
    if (task.status !== "ready") await enqueueCampaignVideo(task._id);
    return res.status(task.status === "ready" ? 200 : 202).json({ success: true, task: await campaignVideoTaskView(task, id => campaignVideoQueue.getJob(id)) });
  } catch { return res.status(503).json({ success: false, error: "Nao foi possivel agendar. Tente novamente com o mesmo link." }); }
});
router.get("/:taskId", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.taskId)) return res.status(400).json({ success: false, error: "Tarefa invalida." });
  try {
    const task = await CampaignVideoTask.findOne({ _id: req.params.taskId, userId: req.user._id });
    if (!task) return res.status(404).json({ success: false, error: "Tarefa nao encontrada." });
    return res.json({ success: true, task: await campaignVideoTaskView(task, id => campaignVideoQueue.getJob(id)) });
  } catch { return res.status(503).json({ success: false, error: "Falha ao consultar tarefa." }); }
});
export default router;
