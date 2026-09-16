import axios from "axios";

import { parseTikTokCredential } from "../connections/TikTokConnectionService.js";

const API_BASE_URL = "https://open.tiktokapis.com";
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

function buildTitle(content) {
  const hashtags = Array.isArray(content.hashtags)
    ? content.hashtags
        .map((item) => String(item || "").trim().replace(/^#+/, ""))
        .filter(Boolean)
        .map((item) => `#${item}`)
        .join(" ")
    : "";
  const title = [content.caption, content.cta, content.trackingUrl, hashtags]
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .join("\n\n");
  if (!title) throw new Error("TikTokAdapter exige legenda para publicacao.");
  if ([...title].length > 2200) {
    throw new Error("Legenda do TikTok excede 2200 caracteres.");
  }
  return title;
}

function assertTikTokOk(response, operation) {
  const code = String(response?.data?.error?.code || "ok");
  if (code !== "ok") {
    throw new Error(`${operation}: ${code}.`);
  }
}

function requestFailure(error, operation) {
  const status = Number(error?.response?.status || 0);
  const apiError = error?.response?.data?.error;
  const code = String(apiError?.code || "").trim();
  const message = String(apiError?.message || "").trim();
  const logId = String(apiError?.log_id || "").trim();
  const details = [
    status ? `HTTP ${status}` : "falha de rede",
    code && `code ${code}`,
    message && `message ${message}`,
    logId && `log_id ${logId}`,
  ].filter(Boolean).join(", ");
  const wrapped = new Error(`${operation}: ${details}.`);
  wrapped.cause = error;
  return wrapped;
}

export async function publishTikTok({
  credential,
  destinationId,
  content,
  httpClient = axios,
  apiBaseUrl = API_BASE_URL,
  pollIntervalMs = 5000,
  maxPollAttempts = 24,
  sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
}) {
  if (!credential) throw new Error("Credencial nao informada para TikTokAdapter.");
  if (!destinationId) throw new Error("Destino nao informado para TikTokAdapter.");
  if (!content) throw new Error("Conteudo nao informado para TikTokAdapter.");
  if (content.channel !== "tiktok" || content.contentType !== "short_video") {
    throw new Error("TikTokAdapter exige short_video do canal tiktok.");
  }
  const parsedCredential = parseTikTokCredential(credential);
  if (parsedCredential.openId !== String(destinationId)) {
    throw new Error("Destino nao corresponde a credencial do TikTok.");
  }
  const assetUrl = String(content.media?.assetUrl || "").trim();
  let parsedAssetUrl;
  try { parsedAssetUrl = new URL(assetUrl); } catch {
    throw new Error("TikTokAdapter recebeu assetUrl invalida.");
  }
  if (parsedAssetUrl.protocol !== "https:") {
    throw new Error("TikTokAdapter exige assetUrl publica em HTTPS.");
  }
  const baseUrl = String(apiBaseUrl).replace(/\/+$/, "");
  const headers = {
    Authorization: `Bearer ${parsedCredential.accessToken}`,
    "Content-Type": "application/json; charset=UTF-8",
  };
  let creatorResponse;
  try {
    creatorResponse = await httpClient.post(
      `${baseUrl}/v2/post/publish/creator_info/query/`,
      {},
      { headers, timeout: 15000 }
    );
  } catch (error) {
    throw requestFailure(error, "TikTok recusou a consulta do criador");
  }
  assertTikTokOk(creatorResponse, "TikTok recusou a consulta do criador");
  const creator = creatorResponse.data?.data || {};
  const privacyOptions = Array.isArray(creator.privacy_level_options)
    ? creator.privacy_level_options
    : [];
  if (!privacyOptions.includes("SELF_ONLY")) {
    throw new Error("TikTok nao autorizou publicacao privada para esta conta.");
  }

  let mediaResponse;
  try {
    mediaResponse = await httpClient.get(assetUrl, {
      responseType: "arraybuffer",
      timeout: 120000,
      maxContentLength: MAX_VIDEO_BYTES,
      maxBodyLength: MAX_VIDEO_BYTES,
    });
  } catch (error) {
    throw requestFailure(error, "Falha ao baixar o video para o TikTok");
  }
  const video = Buffer.from(mediaResponse.data);
  if (!video.length || video.length > MAX_VIDEO_BYTES) {
    throw new Error("Video do TikTok possui tamanho invalido.");
  }
  const title = buildTitle(content);
  let initResponse;
  try {
    initResponse = await httpClient.post(
      `${baseUrl}/v2/post/publish/video/init/`,
      {
      post_info: {
        title,
        privacy_level: "SELF_ONLY",
        disable_duet: true,
        disable_comment: true,
        disable_stitch: true,
        brand_content_toggle: true,
        brand_organic_toggle: false,
      },
      source_info: {
        source: "FILE_UPLOAD",
        video_size: video.length,
        chunk_size: video.length,
        total_chunk_count: 1,
      },
      },
      { headers, timeout: 30000 }
    );
  } catch (error) {
    throw requestFailure(error, "TikTok recusou o inicio da publicacao");
  }
  assertTikTokOk(initResponse, "TikTok recusou o inicio da publicacao");
  const publishId = String(initResponse.data?.data?.publish_id || "").trim();
  const uploadUrl = String(initResponse.data?.data?.upload_url || "").trim();
  if (!publishId || !uploadUrl.startsWith("https://")) {
    throw new Error("TikTok nao retornou os dados de upload.");
  }
  try {
    await httpClient.put(uploadUrl, video, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(video.length),
        "Content-Range": `bytes 0-${video.length - 1}/${video.length}`,
      },
      timeout: 180000,
      maxBodyLength: MAX_VIDEO_BYTES,
    });
  } catch (error) {
    throw requestFailure(error, "TikTok recusou o upload do video");
  }

  for (let attempt = 0; attempt < maxPollAttempts; attempt += 1) {
    if (attempt > 0) await sleep(pollIntervalMs);
    let statusResponse;
    try {
      statusResponse = await httpClient.post(
        `${baseUrl}/v2/post/publish/status/fetch/`,
        { publish_id: publishId },
        { headers, timeout: 15000 }
      );
    } catch (error) {
      throw requestFailure(error, "TikTok recusou a consulta do status");
    }
    assertTikTokOk(statusResponse, "TikTok recusou a consulta do status");
    const status = String(statusResponse.data?.data?.status || "").trim();
    if (status === "PUBLISH_COMPLETE") {
      const postIds = statusResponse.data?.data?.publicaly_available_post_id;
      return {
        success: true,
        externalId: Array.isArray(postIds) && postIds.length
          ? String(postIds[0])
          : publishId,
        publishId,
        status,
        privacyLevel: "SELF_ONLY",
      };
    }
    if (status === "FAILED") {
      const reason = String(statusResponse.data?.data?.fail_reason || "unknown");
      throw new Error(`Publicacao do TikTok falhou: ${reason}.`);
    }
  }
  throw new Error("TikTok ainda nao confirmou a publicacao apos o tempo limite.");
}
