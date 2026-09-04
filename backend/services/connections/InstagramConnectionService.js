import {
  encryptCredential,
} from "../../utils/credentialCrypto.js";

export function buildInstagramCredential({
  accessToken,
  instagramUserId,
}) {
  const cleanAccessToken = String(
    accessToken || ""
  ).trim();

  const cleanInstagramUserId = String(
    instagramUserId || ""
  ).trim();

  if (!cleanAccessToken) {
    throw new Error(
      "Access token do Instagram nao informado."
    );
  }

  if (!cleanInstagramUserId) {
    throw new Error(
      "Instagram user id nao informado."
    );
  }

  return encryptCredential(
    JSON.stringify({
      accessToken: cleanAccessToken,
      instagramUserId: cleanInstagramUserId,
    })
  );
}

export function parseInstagramCredential(value) {
  let credential;

  try {
    credential = JSON.parse(String(value || ""));
  } catch {
    throw new Error(
      "Credencial do Instagram possui formato invalido."
    );
  }

  const accessToken = String(
    credential?.accessToken || ""
  ).trim();

  const instagramUserId = String(
    credential?.instagramUserId || ""
  ).trim();

  if (!accessToken || !instagramUserId) {
    throw new Error(
      "Credencial do Instagram esta incompleta."
    );
  }

  return {
    accessToken,
    instagramUserId,
  };
}
