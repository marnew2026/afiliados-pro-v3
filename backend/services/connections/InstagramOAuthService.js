import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import axios from "axios";

import ChannelConnection from "../../models/ChannelConnection.js";
import { buildInstagramCredential } from "./InstagramConnectionService.js";

const AUTHORIZE_URL = "https://www.instagram.com/oauth/authorize";
const TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const LONG_LIVED_TOKEN_URL = "https://graph.instagram.com/access_token";
const PROFILE_URL = "https://graph.instagram.com/me";
const OAUTH_PURPOSE = "instagram-oauth";
const OAUTH_SCOPES = [
  "instagram_business_basic",
  "instagram_business_content_publish",
];

function requiredEnv(name, env = process.env) {
  const value = String(env[name] || "").trim();

  if (!value) {
    throw new Error(`Configuracao ausente: ${name}.`);
  }

  return value;
}

export function createInstagramAuthorizationUrl({ userId, env = process.env }) {
  const appId = requiredEnv("INSTAGRAM_APP_ID", env);
  const redirectUri = requiredEnv("INSTAGRAM_REDIRECT_URI", env);
  const jwtSecret = requiredEnv("JWT_SECRET", env);

  const state = jwt.sign(
    {
      sub: String(userId),
      purpose: OAUTH_PURPOSE,
      nonce: crypto.randomBytes(24).toString("hex"),
    },
    jwtSecret,
    {
      expiresIn: "10m",
      issuer: "afiliados-pro",
      audience: "instagram-oauth",
    }
  );

  const url = new URL(AUTHORIZE_URL);
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", OAUTH_SCOPES.join(","));
  url.searchParams.set("force_reauth", "true");
  url.searchParams.set("state", state);

  return url.toString();
}

export function verifyInstagramOAuthState(state, env = process.env) {
  const jwtSecret = requiredEnv("JWT_SECRET", env);
  const decoded = jwt.verify(String(state || ""), jwtSecret, {
    issuer: "afiliados-pro",
    audience: "instagram-oauth",
  });

  if (decoded?.purpose !== OAUTH_PURPOSE || !decoded?.sub || !decoded?.nonce) {
    throw new Error("Estado OAuth invalido.");
  }

  return { userId: String(decoded.sub) };
}

export async function completeInstagramOAuth({
  code,
  state,
  env = process.env,
  httpClient = axios,
  connectionModel = ChannelConnection,
}) {
  const cleanCode = String(code || "").trim();

  if (!cleanCode) {
    throw new Error("Codigo OAuth nao informado.");
  }

  const { userId } = verifyInstagramOAuthState(state, env);
  const appId = requiredEnv("INSTAGRAM_APP_ID", env);
  const appSecret = requiredEnv("INSTAGRAM_APP_SECRET", env);
  const redirectUri = requiredEnv("INSTAGRAM_REDIRECT_URI", env);

  const tokenForm = new URLSearchParams({
    client_id: appId,
    client_secret: appSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: cleanCode,
  });

  const shortResponse = await httpClient.post(TOKEN_URL, tokenForm.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    timeout: 15000,
  });

  const shortToken = String(shortResponse.data?.access_token || "").trim();
  const tokenUserId = String(shortResponse.data?.user_id || "").trim();

  if (!shortToken) {
    throw new Error("Instagram nao retornou o token inicial.");
  }

  const longResponse = await httpClient.get(LONG_LIVED_TOKEN_URL, {
    params: {
      grant_type: "ig_exchange_token",
      client_secret: appSecret,
      access_token: shortToken,
    },
    timeout: 15000,
  });

  const accessToken = String(longResponse.data?.access_token || "").trim();

  if (!accessToken) {
    throw new Error("Instagram nao retornou o token de longa duracao.");
  }

  const profileResponse = await httpClient.get(PROFILE_URL, {
    params: {
      fields: "id,user_id,username",
      access_token: accessToken,
    },
    timeout: 15000,
  });

  const instagramUserId = String(
    profileResponse.data?.user_id || profileResponse.data?.id || tokenUserId || ""
  ).trim();
  const username = String(profileResponse.data?.username || "").trim();

  if (!instagramUserId) {
    throw new Error("Instagram nao retornou o identificador da conta.");
  }

  const connection = await connectionModel.findOneAndUpdate(
    { userId, provider: "instagram", destinationId: instagramUserId },
    {
      $set: {
        destinationName: username,
        credential: buildInstagramCredential({ accessToken, instagramUserId }),
        active: true,
        connectedAt: new Date(),
      },
    },
    { new: true, upsert: true, runValidators: true }
  );

  return {
    userId,
    instagramUserId,
    username,
    connection,
  };
}

