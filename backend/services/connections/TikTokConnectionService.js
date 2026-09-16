import { encryptCredential } from "../../utils/credentialCrypto.js";

export function buildTikTokCredential({
  accessToken,
  refreshToken,
  openId,
  scope,
  expiresIn,
  refreshExpiresIn,
  now = Date.now(),
}) {
  const cleanAccessToken = String(accessToken || "").trim();
  const cleanRefreshToken = String(refreshToken || "").trim();
  const cleanOpenId = String(openId || "").trim();

  if (!cleanAccessToken || !cleanRefreshToken || !cleanOpenId) {
    throw new Error("Credencial do TikTok esta incompleta.");
  }

  const accessSeconds = Number(expiresIn);
  const refreshSeconds = Number(refreshExpiresIn);

  return encryptCredential(JSON.stringify({
    accessToken: cleanAccessToken,
    refreshToken: cleanRefreshToken,
    openId: cleanOpenId,
    scope: String(scope || "").trim(),
    accessExpiresAt: Number.isFinite(accessSeconds)
      ? new Date(now + accessSeconds * 1000).toISOString()
      : null,
    refreshExpiresAt: Number.isFinite(refreshSeconds)
      ? new Date(now + refreshSeconds * 1000).toISOString()
      : null,
  }));
}

export function parseTikTokCredential(value) {
  let credential;

  try {
    credential = JSON.parse(String(value || ""));
  } catch {
    throw new Error("Credencial do TikTok possui formato invalido.");
  }

  const accessToken = String(credential?.accessToken || "").trim();
  const refreshToken = String(credential?.refreshToken || "").trim();
  const openId = String(credential?.openId || "").trim();

  if (!accessToken || !refreshToken || !openId) {
    throw new Error("Credencial do TikTok esta incompleta.");
  }

  return { ...credential, accessToken, refreshToken, openId };
}
