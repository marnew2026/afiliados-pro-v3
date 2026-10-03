import mongoose from "mongoose";
import { createHash } from "node:crypto";
import Campaign from "../../models/Campaign.js";
import CampaignVideoTask from "../../models/CampaignVideoTask.js";
import { validateProductLink } from "./MercadoLivreProductResolver.js";

export function normalizeCampaignLinks(links) {
  if (!Array.isArray(links) || !links.length || links.length > 10) {
    throw Object.assign(new Error("Cadastre de 1 a 10 links por vez."), { statusCode: 400 });
  }
  // Valida o lote inteiro antes de gravar qualquer tarefa; nao aceita URLs extras de um compartilhamento.
  return [...new Set(links.map(link => validateProductLink(link).href))];
}
export async function scheduleCampaignLinks({ userId, links, enqueue,
  taskModel = CampaignVideoTask, campaignModel = Campaign, idFactory = () => new mongoose.Types.ObjectId() }) {
  const normalized = normalizeCampaignLinks(links);
  await taskModel.init();
  const results = [];
  for (const link of normalized) {
    let task;
    try {
      const linkHash = createHash("sha256").update(link).digest("hex");
      task = await taskModel.findOne({ userId, linkHash });
      if (!task) {
        if (await taskModel.countDocuments({ userId, status: { $in: ["queued", "processing"] } }) >= 30) {
          throw new Error("Sua fila tem 30 campanhas. Aguarde para adicionar mais links.");
        }
        const campaign = await campaignModel.findOne({ userId, link });
        if (campaign && (!campaign.active || campaign.status !== "active")) throw new Error("Esta campanha esta pausada ou arquivada.");
        try { task = await taskModel.create({ userId, linkHash, link, campaignId: campaign?._id || idFactory() }); }
        catch (error) {
          if (error.code !== 11000) throw error;
          task = await taskModel.findOne({ userId, linkHash });
          if (!task) throw error;
        }
      }
      if (task.status !== "ready") await enqueue(task._id);
      results.push({ link, accepted: true, task });
    } catch (error) {
      results.push({ link, accepted: false, taskId: task ? String(task._id) : null,
        error: error.isAxiosError ? "Falha temporaria ao agendar." : String(error.message || "Nao foi possivel agendar.").slice(0, 200) });
    }
  }
  return results;
}
