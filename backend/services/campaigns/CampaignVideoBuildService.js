import { movieDiagnosticCode } from '../media/movie/MovieHttp.js';
import { findProductFootage } from "../media/ProductFootageCatalog.js";
import Campaign from "../../models/Campaign.js";
import CampaignVideoTask from "../../models/CampaignVideoTask.js";
import { resolveMercadoLivreProduct } from "./MercadoLivreProductResolver.js";
import { renderProductVideo } from "../media/template/ProductVideoRenderer.js";
import { findReadyCampaignVideo } from "../media/MediaAssetService.js";
import { uploadMediaAsset } from "../media/MediaAssetUploadService.js";

export async function buildCampaignVideo({ taskId, taskModel = CampaignVideoTask, campaignModel = Campaign,
  resolver = resolveMercadoLivreProduct, renderer = renderProductVideo, footageFinder = findProductFootage,
  readyFinder = findReadyCampaignVideo, uploader = uploadMediaAsset }) {
  const task = await taskModel.findById(taskId);
  if (!task) throw new Error("Tarefa de campanha nao encontrada.");
  if (task.status === "ready") return { alreadyReady: true, campaignId: String(task.campaignId) };
  task.status = "processing"; task.lastError = ""; task.movieErrorCode = ""; await task.save();
  try {
    const product = task.product?.title ? task.product : await resolver({ link: task.link });
    task.product = product; await task.save();
    // ID persistido na tarefa antes da criacao: uma retomada nao cria outra campanha.
    const campaign = task.previewOnly ? { active: true, status: "active" } : await campaignModel.findOneAndUpdate({ _id: task.campaignId, userId: task.userId },
      { $setOnInsert: { nome: product.title, link: task.link, active: true } },
      { upsert: true, new: true, setDefaultsOnInsert: true });
    if (!campaign.active || campaign.status !== "active") throw new Error("Campanha pausada ou arquivada. Video nao gerado.");
    const movieMode = task.renderStyle === "movie_v1" || (!task.renderStyle && process.env.KAEL_PRODUCT_VIDEO_STYLE === "movie_v1");
    let asset = movieMode ? null : await readyFinder({ userId: task.userId, campaignId: task.campaignId });
    if (!asset) {
      const footage = await footageFinder({ product });
      const ensureActive = async () => {
        if (task.previewOnly) return;
        const active = await campaignModel.findOne({ _id: task.campaignId, userId: task.userId, active: true, status: "active" });
        if (!active) throw new Error("Campanha pausada ou arquivada durante a geração.");
      };
      const video = await renderer({ product, footage, task, ensureActive,
        ...(task.renderStyle ? { style: task.renderStyle } : {}) });
      task.caption = String(video.caption || "").slice(0, 1800);
      await task.save();
      // Revalida antes do upload se o usuario arquivou a campanha durante a renderizacao.
      const current = task.previewOnly ? true : await campaignModel.findOne({ _id: task.campaignId, userId: task.userId, active: true, status: "active" });
      if (!current) throw new Error("Campanha arquivada durante a montagem do video.");
      asset = await uploader({ userId: task.userId, campaignId: task.campaignId, type: "video", source: "kael",
        extension: "mp4", body: video.body, contentType: "video/mp4",
        ...(movieMode ? { generationTaskId: task._id } : {}) });
    }
    task.mediaAssetId = asset._id; task.status = "ready"; task.lastError = ""; await task.save();
    return { campaignId: String(task.campaignId), mediaAssetId: String(asset._id) };
  } catch (error) {
    task.status = "failed";
    task.movieErrorCode = task.renderStyle === "movie_v1" ? movieDiagnosticCode(error) : "";
    // Nao registra resposta bruta, URL de autorizacao nem segredos do provedor.
    task.lastError = error.isAxiosError ? `Falha ao consultar produto/imagem (HTTP ${error.response?.status || "indisponivel"}).` : String(error.message || "Falha ao criar video.").slice(0, 500);
    await task.save(); throw error;
  }
}
