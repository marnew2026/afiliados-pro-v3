import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import axios from "axios";

import ChannelConnection from "../../models/ChannelConnection.js";
import { buildTikTokCredential } from "./TikTokConnectionService.js";

const OAUTH_PURPOSE = "tiktok-oauth";
const OAUTH_SCOPES = ["user.info.basic", "video.publish", "video.upload"];

function requiredEnv(name, env = process.env) {
  const value = String(env[name] || "").trim();
  if (!value) throw new Error(`Configuracao ausente: ${name}.`);
  return value;
}

export function createTikTokAuthorizationUrl({ userId, env = process.env }) {
  const clientKey = requiredEnv("TIKTOK_CLIENT_KEY", env);
  const redirectUri = requiredEnv("TIKTOK_REDIRECT_URI", env);
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
      audience: "tiktok-oauth",
    }
  );
  const url = new URL("https://www.tiktok.com/v2/auth/authorize/");
  url.searchParams.set("client_key", clientKey);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", OAUTH_SCOPES.join(","));
  url.searchParams.set("state", state);
  return url.toString();
}

export function verifyTikTokOAuthState(state, env = process.env) {
  const decoded = jwt.verify(
    String(state || ""),
    requiredEnv("JWT_SECRET", env),
    { issuer: "afiliados-pro", audience: "tiktok-oauth" }
  );

  if (decoded?.purpose !== OAUTH_PURPOSE || !decoded?.sub || !decoded?.nonce) {
    throw new Error("Estado OAuth do TikTok invalido.");
  }

  return { userId: String(decoded.sub) };
}

export async function completeTikTokOAuth({
  code,
  state,
  env = process.env,
  httpClient = axios,
  connectionModel = ChannelConnection,
}) {
  const cleanCode = String(code || "").trim();
  if (!cleanCode) throw new Error("Codigo OAuth do TikTok nao informado.");

  const { userId } = verifyTikTokOAuthState(state, env);
  const clientKey = requiredEnv("TIKTOK_CLIENT_KEY", env);
  const clientSecret = requiredEnv("TIKTOK_CLIENT_SECRET", env);
  const redirectUri = requiredEnv("TIKTOK_REDIRECT_URI", env);
  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    code: cleanCode,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });
  const tokenResponse = await httpClient.post(
    "https://open.tiktokapis.com/v2/oauth/token/",
    body.toString(),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 15000,
    }
  );
  const token = tokenResponse.data || {};
  const accessToken = String(token.access_token || "").trim();
  const refreshToken = String(token.refresh_token || "").trim();
  const openId = String(token.open_id || "").trim();

  if (!accessToken || !refreshToken || !openId) {
    throw new Error("TikTok nao retornou uma credencial completa.");
  }

  const profileResponse = await httpClient.get(
    "https://open.tiktokapis.com/v2/user/info/",
    {
      params: { fields: "open_id,display_name,avatar_url" },
      headers: { Authorization: `Bearer ${accessToken}` },
      timeout: 15000,
    }
  );
  const profile = profileResponse.data?.data?.user || {};
  const destinationId = String(profile.open_id || openId).trim();
  const destinationName = String(profile.display_name || "Conta TikTok").trim();
  const connection = await connectionModel.findOneAndUpdate(
    { userId, provider: "tiktok", destinationId },
    {
      $set: {
        destinationName,
        credential: buildTikTokCredential({
          accessToken,
          refreshToken,
          openId: destinationId,
          scope: token.scope,
          expiresIn: token.expires_in,
          refreshExpiresIn: token.refresh_expires_in,
        }),
        active: true,
        connectedAt: new Date(),
      },
    },
    { new: true, upsert: true, runValidators: true }
  );

  return { userId, openId: destinationId, displayName: destinationName, connection };
}
