import api from "./api";
import { API_BASE_URL } from "./apiEnvironment";

export type CampaignVideoTask = {
  id: string;
  status: "queued" | "processing" | "ready" | "failed";
  campaignId: string;
  title: string | null;
  mediaAssetId: string | null;
  lastError: string;
  updatedAt: string;
};
export function campaignVideoStorageKey(userId: string) {
  return `@afiliados-pro/campaign-video/${encodeURIComponent(API_BASE_URL)}/${userId}`;
}
export function extractProductLink(value: string) {
  const link = value.trim().match(/https:\/\/[^\s]+/i)?.[0];
  if (!link) throw new Error("Cole o link HTTPS de afiliado do produto.");
  const parsed = new URL(link);
  if (parsed.username || parsed.password || parsed.port ||
      !["meli.la", "mercadolivre.com.br", "www.mercadolivre.com.br", "produto.mercadolivre.com.br"].includes(parsed.hostname)) {
    throw new Error("Nesta etapa, use um link do Mercado Livre.");
  }
  return parsed.href;
}
function readTask(data: any): CampaignVideoTask {
  if (!data?.success || !data?.task?.id || !["queued", "processing", "ready", "failed"].includes(data.task.status)) {
    throw new Error("O servidor não retornou o acompanhamento da campanha.");
  }
  return data.task;
}
export async function createCampaignVideo(link: string) {
  const { data } = await api.post("/campaigns/from-link", { link }, { timeout: 30000 });
  return readTask(data);
}
export async function getCampaignVideo(taskId: string, signal?: AbortSignal) {
  const { data } = await api.get(`/campaigns/from-link/${encodeURIComponent(taskId)}`, { timeout: 20000, signal });
  return readTask(data);
}
export function campaignVideoError(error: any) {
  if (error?.response?.status === 404) return "Esta tarefa não foi encontrada neste ambiente.";
  return error?.response?.data?.error || error?.message || "Não foi possível consultar a campanha. Tente novamente.";
}
