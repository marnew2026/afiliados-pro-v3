import crypto from "node:crypto";

import ChannelConnection from "../../models/ChannelConnection.js";

function decodeBase64Url(value) {
  return Buffer.from(String(value || ""), "base64url");
}

export function verifyInstagramSignedRequest(signedRequest, appSecret) {
  const cleanRequest = String(signedRequest || "").trim();
  const cleanSecret = String(appSecret || "").trim();

  if (!cleanRequest || !cleanSecret) {
    throw new Error("Solicitacao de desautorizacao invalida.");
  }

  const [encodedSignature, encodedPayload, extra] = cleanRequest.split(".");

  if (!encodedSignature || !encodedPayload || extra) {
    throw new Error("Solicitacao de desautorizacao invalida.");
  }

  const providedSignature = decodeBase64Url(encodedSignature);
  const expectedSignature = crypto
    .createHmac("sha256", cleanSecret)
    .update(encodedPayload)
    .digest();

  if (
    providedSignature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(providedSignature, expectedSignature)
  ) {
    throw new Error("Assinatura de desautorizacao invalida.");
  }

  let payload;

  try {
    payload = JSON.parse(decodeBase64Url(encodedPayload).toString("utf8"));
  } catch {
    throw new Error("Conteudo de desautorizacao invalido.");
  }

  if (String(payload?.algorithm || "").toUpperCase() !== "HMAC-SHA256") {
    throw new Error("Algoritmo de desautorizacao invalido.");
  }

  const instagramUserId = String(payload?.user_id || "").trim();

  if (!instagramUserId) {
    throw new Error("Conta Instagram nao informada.");
  }

  return { instagramUserId };
}

export async function deactivateInstagramConnection({
  signedRequest,
  appSecret = process.env.INSTAGRAM_APP_SECRET,
  connectionModel = ChannelConnection,
}) {
  const { instagramUserId } = verifyInstagramSignedRequest(
    signedRequest,
    appSecret
  );

  const result = await connectionModel.updateMany(
    {
      provider: "instagram",
      destinationId: instagramUserId,
      active: true,
    },
    {
      $set: { active: false },
    }
  );

  return {
    instagramUserId,
    deactivatedCount: Number(result?.modifiedCount || 0),
  };
}
