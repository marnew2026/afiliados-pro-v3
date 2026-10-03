import api from "./api";
import { API_BASE_URL } from "./apiEnvironment";

export type CampaignVideoTask = {
  id: string;
  status: "queued" | "processing" | "ready" | "failed";
  campaignId: string;
  title: string | null;
  mediaAssetId: string | null;
  previewUrl?: string | null;
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

export type LinkCampaignTask = CampaignVideoTask & {
  publications?: { channel: string; status: string; error: string | null }[];
};
export function extractProductLinks(value: string) {
  const candidates = value.match(/https:\/\/[^\s]+/gi) || [];
  if (!candidates.length || candidates.length > 10) throw new Error("Cole de 1 a 10 links, um por linha.");
  return [...new Set(candidates.map(extractProductLink))];
}
export async function createCampaignVideoBatch(links: string[]) {
  const { data } = await api.post("/campaigns/from-link", { links }, { timeout: 45000 });
  if (!data?.success || !Array.isArray(data.results)) throw new Error("Não foi possível cadastrar os links.");
  return data.results as { link: string; accepted: boolean; error?: string; task?: LinkCampaignTask }[];
}
export async function listCampaignVideos(signal?: AbortSignal) {
  const { data } = await api.get("/campaigns/from-link", { timeout: 20000, signal });
  if (!data?.success || !Array.isArray(data.tasks)) throw new Error("Não foi possível consultar os links.");
  return data.tasks as LinkCampaignTask[];
}
export type KaelLinkSummary = {
  enabled: boolean; serverEnabled: boolean; publishedToday: number; byChannel: Record<string, number>;
  generating: number; failedPublications: number; campaignClicksTotal: number;
  channels: { channel: string; available: boolean }[];
};
export async function getKaelLinkSummary(signal?: AbortSignal) {
  const { data } = await api.get("/campaigns/from-link/summary", { timeout: 20000, signal });
  if (!data?.success || !data.summary) throw new Error("Não foi possível consultar o KAEL.");
  return data.summary as KaelLinkSummary;
}
