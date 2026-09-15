import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import axios from "axios";

import ChannelConnection from "../../models/ChannelConnection.js";
import { buildFacebookCredential } from "./FacebookConnectionService.js";

const OAUTH_PURPOSE = "facebook-oauth";
const OAUTH_SCOPES = [
  "pages_show_list",
  "pages_read_engagement",
  "pages_manage_posts",
];

function requiredEnv(name, env = process.env) {
  const value = String(env[name] || "").trim();

  if (!value) {
    throw new Error(`Configuracao ausente: ${name}.`);
  }

  return value;
}

function apiVersion(env) {
  const value = requiredEnv("META_GRAPH_API_VERSION", env);

  if (!/^v\d+\.\d+$/.test(value)) {
    throw new Error("META_GRAPH_API_VERSION invalida.");
  }

  return value;
}

export function createFacebookAuthorizationUrl({ userId, env = process.env }) {
  const version = apiVersion(env);
  const appId = requiredEnv("FACEBOOK_APP_ID", env);
  const redirectUri = requiredEnv("FACEBOOK_REDIRECT_URI", env);
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
      audience: "facebook-oauth",
    }
  );

  const url = new URL(`https://www.facebook.com/${version}/dialog/oauth`);
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", OAUTH_SCOPES.join(","));
  url.searchParams.set("auth_type", "rerequest");
  url.searchParams.set("state", state);

  return url.toString();
}

export function verifyFacebookOAuthState(state, env = process.env) {
  const jwtSecret = requiredEnv("JWT_SECRET", env);
  const decoded = jwt.verify(String(state || ""), jwtSecret, {
    issuer: "afiliados-pro",
    audience: "facebook-oauth",
  });

  if (decoded?.purpose !== OAUTH_PURPOSE || !decoded?.sub || !decoded?.nonce) {
    throw new Error("Estado OAuth do Facebook invalido.");
  }

  return { userId: String(decoded.sub) };
}

export async function completeFacebookOAuth({
  code,
  state,
  env = process.env,
  httpClient = axios,
  connectionModel = ChannelConnection,
}) {
  const cleanCode = String(code || "").trim();

  if (!cleanCode) {
    throw new Error("Codigo OAuth do Facebook nao informado.");
  }

  const { userId } = verifyFacebookOAuthState(state, env);
  const version = apiVersion(env);
  const appId = requiredEnv("FACEBOOK_APP_ID", env);
  const appSecret = requiredEnv("FACEBOOK_APP_SECRET", env);
  const redirectUri = requiredEnv("FACEBOOK_REDIRECT_URI", env);
  const graphBaseUrl = `https://graph.facebook.com/${version}`;

  const shortResponse = await httpClient.get(`${graphBaseUrl}/oauth/access_token`, {
    params: {
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: redirectUri,
      code: cleanCode,
    },
    timeout: 15000,
  });

  const shortToken = String(shortResponse.data?.access_token || "").trim();

  if (!shortToken) {
    throw new Error("Facebook nao retornou o token inicial.");
  }

  const longResponse = await httpClient.get(`${graphBaseUrl}/oauth/access_token`, {
    params: {
      grant_type: "fb_exchange_token",
      client_id: appId,
      client_secret: appSecret,
      fb_exchange_token: shortToken,
    },
    timeout: 15000,
  });

  const userAccessToken = String(
    longResponse.data?.access_token || ""
  ).trim();

  if (!userAccessToken) {
    throw new Error("Facebook nao retornou o token de longa duracao.");
  }

  const pagesResponse = await httpClient.get(`${graphBaseUrl}/me/accounts`, {
    params: {
      fields: "id,name,access_token,tasks",
      access_token: userAccessToken,
    },
    timeout: 15000,
  });

  const pages = Array.isArray(pagesResponse.data?.data)
    ? pagesResponse.data.data
    : [];
  const preferredPageId = String(env.FACEBOOK_PAGE_ID || "").trim();
  const eligiblePages = pages.filter((page) => {
    const tasks = Array.isArray(page?.tasks) ? page.tasks : [];
    return page?.id && page?.access_token &&
      (tasks.length === 0 || tasks.includes("CREATE_CONTENT") || tasks.includes("MANAGE"));
  });
  const selectedPage = preferredPageId
    ? eligiblePages.find((page) => String(page.id) === preferredPageId)
    : eligiblePages.length === 1
      ? eligiblePages[0]
      : null;

  if (!selectedPage) {
    if (eligiblePages.length > 1 && !preferredPageId) {
      throw new Error("Mais de uma Pagina autorizada. Configure FACEBOOK_PAGE_ID.");
    }

    throw new Error("Pagina autorizada do Facebook nao encontrada.");
  }

  const pageId = String(selectedPage.id).trim();
  const pageName = String(selectedPage.name || "").trim();
  const pageAccessToken = String(selectedPage.access_token).trim();
  const connection = await connectionModel.findOneAndUpdate(
    { userId, provider: "facebook", destinationId: pageId },
    {
      $set: {
        destinationName: pageName,
        credential: buildFacebookCredential({ pageAccessToken, pageId }),
        active: true,
        connectedAt: new Date(),
      },
    },
    { new: true, upsert: true, runValidators: true }
  );

  return { userId, pageId, pageName, connection };
}

