import axios from "axios";

import { parseInstagramCredential } from "../connections/InstagramConnectionService.js";

const DEFAULT_API_BASE_URL =
  "https://graph.instagram.com";
const DEFAULT_POLL_INTERVAL_MS = 5000;
const DEFAULT_MAX_POLL_ATTEMPTS = 12;

function buildInstagramCaption(content) {
  const hashtags = Array.isArray(content.hashtags)
    ? content.hashtags
        .map((item) => String(item || "").trim())
        .filter(Boolean)
        .map((item) =>
          item.startsWith("#") ? item : `#${item}`
        )
        .join(" ")
    : "";

  const caption = [
    content.caption,
    content.cta,
    content.trackingUrl,
    hashtags,
  ]
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .join("\n\n");

  if (!caption) {
    throw new Error(
      "InstagramAdapter exige legenda para publicacao."
    );
  }

  if (caption.length > 2200) {
    throw new Error(
      "Legenda do Instagram excede 2200 caracteres."
    );
  }

  return caption;
}

export async function publishInstagram({
  credential,
  destinationId,
  content,
  apiVersion = process.env.META_GRAPH_API_VERSION,
  apiBaseUrl = DEFAULT_API_BASE_URL,
  httpClient = axios,
  pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
  maxPollAttempts = DEFAULT_MAX_POLL_ATTEMPTS,
  sleep = (milliseconds) =>
    new Promise((resolve) =>
      setTimeout(resolve, milliseconds)
    ),
}) {
  if (!credential) {
    throw new Error(
      "Credencial nao informada para InstagramAdapter."
    );
  }

  if (!destinationId) {
    throw new Error(
      "Destino nao informado para InstagramAdapter."
    );
  }

  if (!content) {
    throw new Error(
      "Conteudo nao informado para InstagramAdapter."
    );
  }

  const cleanApiVersion = String(
    apiVersion || ""
  ).trim();

  if (!/^v\d+\.\d+$/.test(cleanApiVersion)) {
    throw new Error(
      "META_GRAPH_API_VERSION ausente ou invalida."
    );
  }

  if (
    !Number.isInteger(maxPollAttempts) ||
    maxPollAttempts < 1 ||
    maxPollAttempts > 24
  ) {
    throw new Error(
      "Limite de consultas do container do Instagram invalido."
    );
  }

  if (
    !Number.isFinite(pollIntervalMs) ||
    pollIntervalMs < 0
  ) {
    throw new Error(
      "Intervalo de consulta do container do Instagram invalido."
    );
  }

  if (content.channel !== "instagram") {
    throw new Error(
      `InstagramAdapter recebeu canal invalido: ${content.channel}`
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error(
      "InstagramAdapter exige conteudo do tipo short_video."
    );
  }

  const instagramCredential =
    parseInstagramCredential(credential);

  if (
    instagramCredential.instagramUserId !==
    String(destinationId)
  ) {
    throw new Error(
      "Destino nao corresponde a credencial do Instagram."
    );
  }

  const assetUrl = String(
    content.media?.assetUrl || ""
  ).trim();

  if (!assetUrl) {
    throw new Error(
      "InstagramAdapter exige assetUrl para publicacao de video."
    );
  }

  let parsedAssetUrl;

  try {
    parsedAssetUrl = new URL(assetUrl);
  } catch {
    throw new Error(
      "InstagramAdapter recebeu assetUrl invalida."
    );
  }

  if (parsedAssetUrl.protocol !== "https:") {
    throw new Error(
      "InstagramAdapter exige assetUrl publica em HTTPS."
    );
  }

  const caption = buildInstagramCaption(content);
  const normalizedBaseUrl = String(apiBaseUrl)
    .trim()
    .replace(/\/+$/, "");
  const accountUrl =
    `${normalizedBaseUrl}/${cleanApiVersion}/` +
    instagramCredential.instagramUserId;

  const containerResponse = await httpClient.post(
    `${accountUrl}/media`,
    null,
    {
      params: {
        media_type: "REELS",
        video_url: assetUrl,
        caption,
        share_to_feed: true,
        access_token: instagramCredential.accessToken,
      },
      timeout: 30000,
    }
  );

  const containerId = String(
    containerResponse.data?.id || ""
  ).trim();

  if (!containerId) {
    throw new Error(
      "Instagram nao retornou o container da publicacao."
    );
  }

  let containerReady = false;

  for (
    let attempt = 0;
    attempt < maxPollAttempts;
    attempt += 1
  ) {
    if (attempt > 0) {
      await sleep(pollIntervalMs);
    }

    const statusResponse = await httpClient.get(
      `${normalizedBaseUrl}/${cleanApiVersion}/${containerId}`,
      {
        params: {
          fields: "status_code,status",
          access_token: instagramCredential.accessToken,
        },
        timeout: 15000,
      }
    );

    const statusCode = String(
      statusResponse.data?.status_code || ""
    ).toUpperCase();

    if (statusCode === "FINISHED") {
      containerReady = true;
      break;
    }

    if (
      statusCode === "ERROR" ||
      statusCode === "EXPIRED"
    ) {
      throw new Error(
        `Instagram encerrou o container com status ${statusCode}.`
      );
    }
  }

  if (!containerReady) {
    throw new Error(
      "Instagram nao concluiu o processamento do container no prazo."
    );
  }

  const publishResponse = await httpClient.post(
    `${accountUrl}/media_publish`,
    null,
    {
      params: {
        creation_id: containerId,
        access_token: instagramCredential.accessToken,
      },
      timeout: 30000,
    }
  );

  const externalId = String(
    publishResponse.data?.id || ""
  ).trim();

  if (!externalId) {
    throw new Error(
      "Instagram nao retornou o id da publicacao."
    );
  }

  return {
    success: true,
    externalId,
    containerId,
  };
}
