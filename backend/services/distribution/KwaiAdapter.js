function serviceUnavailable(message) {
  const error = new Error(message);
  error.statusCode = 503;
  return error;
}

export function isKwaiEnabled(env = process.env) {
  return String(env.KWAI_ENABLED || "").trim().toLowerCase() === "true";
}

export async function publishKwai({
  credential,
  destinationId,
  content,
  env = process.env,
  providerClient = null,
}) {
  if (!isKwaiEnabled(env)) {
    throw serviceUnavailable(
      "Integracao Kwai desativada enquanto o acesso oficial a API nao for aprovado."
    );
  }

  if (!providerClient || typeof providerClient.publishVideo !== "function") {
    throw serviceUnavailable(
      "Cliente oficial do Kwai ainda nao configurado."
    );
  }

  const cleanCredential = String(credential || "").trim();
  const cleanDestinationId = String(destinationId || "").trim();
  const assetUrl = String(content?.media?.assetUrl || "").trim();
  const caption = String(content?.caption || "").trim();

  if (!cleanCredential || !cleanDestinationId) {
    throw new Error("Credencial ou destino do Kwai nao informado.");
  }

  if (content?.channel !== "kwai" || content?.contentType !== "short_video") {
    throw new Error("Conteudo invalido para publicacao no Kwai.");
  }

  if (!assetUrl.startsWith("https://") || !caption) {
    throw new Error("Video publico e legenda sao obrigatorios para o Kwai.");
  }

  const result = await providerClient.publishVideo({
    credential: cleanCredential,
    destinationId: cleanDestinationId,
    assetUrl,
    caption,
    hashtags: Array.isArray(content.hashtags) ? content.hashtags : [],
    cta: String(content.cta || "").trim(),
    trackingUrl: String(content.trackingUrl || "").trim(),
  });

  const externalId = String(result?.externalId || "").trim();

  if (!result?.success || !externalId) {
    throw new Error("Kwai nao confirmou a publicacao do video.");
  }

  return {
    success: true,
    externalId,
    distributionStatus: result.distributionStatus || "published",
    providerData: result,
  };
}
