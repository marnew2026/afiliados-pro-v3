import { encryptCredential } from "../../utils/credentialCrypto.js";

export function buildFacebookCredential({ pageAccessToken, pageId }) {
  const cleanToken = String(pageAccessToken || "").trim();
  const cleanPageId = String(pageId || "").trim();

  if (!cleanToken) {
    throw new Error("Token da Pagina do Facebook nao informado.");
  }

  if (!cleanPageId) {
    throw new Error("ID da Pagina do Facebook nao informado.");
  }

  return encryptCredential(
    JSON.stringify({
      pageAccessToken: cleanToken,
      pageId: cleanPageId,
    })
  );
}

export function parseFacebookCredential(value) {
  let credential;

  try {
    credential = JSON.parse(String(value || ""));
  } catch {
    throw new Error("Credencial do Facebook possui formato invalido.");
  }

  const pageAccessToken = String(
    credential?.pageAccessToken || ""
  ).trim();
  const pageId = String(credential?.pageId || "").trim();

  if (!pageAccessToken || !pageId) {
    throw new Error("Credencial do Facebook esta incompleta.");
  }

  return { pageAccessToken, pageId };
}

