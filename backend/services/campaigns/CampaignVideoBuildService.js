import Campaign from "../../models/Campaign.js";
import CampaignVideoTask from "../../models/CampaignVideoTask.js";
import { resolveMercadoLivreProduct } from "./MercadoLivreProductResolver.js";
import { renderProductVideo } from "../media/template/ProductVideoRenderer.js";
import { findReadyCampaignVideo } from "../media/MediaAssetService.js";
import { uploadMediaAsset } from "../media/MediaAssetUploadService.js";

export async function buildCampaignVideo({ taskId, taskModel = CampaignVideoTask, campaignModel = Campaign,
  resolver = resolveMercadoLivreProduct, renderer = renderProductVideo,
  readyFinder = findReadyCampaignVideo, uploader = uploadMediaAsset }) {
  const task = await taskModel.findById(taskId);
  if (!task) throw new Error("Tarefa de campanha nao encontrada.");
  if (task.status === "ready") return { alreadyReady: true, campaignId: String(task.campaignId) };
  task.status = "processing"; task.lastError = ""; await task.save();
  try {
    const product = task.product?.title ? task.product : await resolver({ link: task.link });
    task.product = product; await task.save();
    // ID persistido na tarefa antes da criacao: uma retomada nao cria outra campanha.
    const campaign = await campaignModel.findOneAndUpdate({ _id: task.campaignId, userId: task.userId },
      { $setOnInsert: { nome: product.title, link: task.link, active: true } },
      { upsert: true, new: true, setDefaultsOnInsert: true });
    if (!campaign.active || campaign.status !== "active") throw new Error("Campanha pausada ou arquivada. Video nao gerado.");
    let asset = await readyFinder({ userId: task.userId, campaignId: task.campaignId });
    if (!asset) {
      const video = await renderer({ product });
      task.caption = String(video.caption || "").slice(0, 1800);
      await task.save();
      // Revalida antes do upload se o usuario arquivou a campanha durante a renderizacao.
      const current = await campaignModel.findOne({ _id: task.campaignId, userId: task.userId, active: true, status: "active" });
      if (!current) throw new Error("Campanha arquivada durante a montagem do video.");
      asset = await uploader({ userId: task.userId, campaignId: task.campaignId, type: "video", source: "kael",
        extension: "mp4", body: video.body, contentType: "video/mp4" });
    }
    task.mediaAssetId = asset._id; task.status = "ready"; task.lastError = ""; await task.save();
    return { campaignId: String(task.campaignId), mediaAssetId: String(asset._id) };
  } catch (error) {
    task.status = "failed";
    // Nao registra resposta bruta, URL de autorizacao nem segredos do provedor.
    task.lastError = error.isAxiosError ? `Falha ao consultar produto/imagem (HTTP ${error.response?.status || "indisponivel"}).` : String(error.message || "Falha ao criar video.").slice(0, 500);
    await task.save(); throw error;
  }
}
