import axios from "axios";

import {
  parseFacebookCredential,
} from "../connections/FacebookConnectionService.js";

const DEFAULT_API_BASE_URL = "https://graph.facebook.com";

function buildFacebookDescription(content) {
  const hashtags = Array.isArray(content.hashtags)
    ? content.hashtags
        .map((item) => String(item || "").trim())
        .filter(Boolean)
        .map((item) => item.startsWith("#") ? item : `#${item}`)
        .join(" ")
    : "";

  const description = [
    content.caption,
    content.cta,
    content.trackingUrl,
    hashtags,
  ]
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .join("\n\n");

  if (!description) {
    throw new Error("FacebookAdapter exige descricao para publicacao.");
  }

  if (description.length > 5000) {
    throw new Error("Descricao do Facebook excede 5000 caracteres.");
  }

  return description;
}

export async function publishFacebook({
  credential,
  destinationId,
  content,
  apiVersion = process.env.META_GRAPH_API_VERSION,
  apiBaseUrl = DEFAULT_API_BASE_URL,
  httpClient = axios,
}) {
  if (!credential) {
    throw new Error("Credencial nao informada para FacebookAdapter.");
  }

  if (!destinationId) {
    throw new Error("Destino nao informado para FacebookAdapter.");
  }

  if (!content) {
    throw new Error("Conteudo nao informado para FacebookAdapter.");
  }

  const cleanApiVersion = String(apiVersion || "").trim();

  if (!/^v\d+\.\d+$/.test(cleanApiVersion)) {
    throw new Error("META_GRAPH_API_VERSION ausente ou invalida.");
  }

  if (content.channel !== "facebook") {
    throw new Error(
      `FacebookAdapter recebeu canal invalido: ${content.channel}`
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error("FacebookAdapter exige conteudo do tipo short_video.");
  }

  const facebookCredential = parseFacebookCredential(credential);

  if (facebookCredential.pageId !== String(destinationId)) {
    throw new Error("Destino nao corresponde a credencial do Facebook.");
  }

  const assetUrl = String(content.media?.assetUrl || "").trim();
  let parsedAssetUrl;

  try {
    parsedAssetUrl = new URL(assetUrl);
  } catch {
    throw new Error("FacebookAdapter recebeu assetUrl invalida.");
  }

  if (parsedAssetUrl.protocol !== "https:") {
    throw new Error("FacebookAdapter exige assetUrl publica em HTTPS.");
  }

  const description = buildFacebookDescription(content);
  const normalizedBaseUrl = String(apiBaseUrl).trim().replace(/\/+$/, "");
  const reelsUrl =
    `${normalizedBaseUrl}/${cleanApiVersion}/` +
    `${facebookCredential.pageId}/video_reels`;

  const startResponse = await httpClient.post(reelsUrl, null, {
    params: {
      upload_phase: "start",
      access_token: facebookCredential.pageAccessToken,
    },
    timeout: 30000,
  });

  const videoId = String(startResponse.data?.video_id || "").trim();
  const uploadUrl = String(startResponse.data?.upload_url || "").trim();

  if (!videoId || !uploadUrl) {
    throw new Error("Facebook nao retornou os dados para upload do Reel.");
  }

  let parsedUploadUrl;

  try {
    parsedUploadUrl = new URL(uploadUrl);
  } catch {
    throw new Error("Facebook retornou upload_url invalida.");
  }

  if (parsedUploadUrl.protocol !== "https:") {
    throw new Error("Facebook retornou upload_url sem HTTPS.");
  }

  const uploadResponse = await httpClient.post(uploadUrl, null, {
    headers: {
      Authorization: `OAuth ${facebookCredential.pageAccessToken}`,
      file_url: assetUrl,
    },
    timeout: 120000,
  });

  if (uploadResponse.data?.success !== true) {
    throw new Error("Facebook nao confirmou o upload do Reel.");
  }

  const finishResponse = await httpClient.post(reelsUrl, null, {
    params: {
      upload_phase: "finish",
      video_id: videoId,
      video_state: "PUBLISHED",
      description,
      access_token: facebookCredential.pageAccessToken,
    },
    timeout: 30000,
  });

  if (finishResponse.data?.success !== true) {
    throw new Error("Facebook nao confirmou a publicacao do Reel.");
  }

  return {
    success: true,
    externalId: String(finishResponse.data?.video_id || videoId),
    videoId,
  };
}
