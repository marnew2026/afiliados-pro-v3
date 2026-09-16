import test from "node:test";
import assert from "node:assert/strict";

import {
  completeTikTokOAuth,
  createTikTokAuthorizationUrl,
} from "../services/connections/TikTokOAuthService.js";
import { decryptCredential } from "../utils/credentialCrypto.js";

const env = {
  TIKTOK_CLIENT_KEY: "tiktok-client-key",
  TIKTOK_CLIENT_SECRET: "tiktok-client-secret",
  TIKTOK_REDIRECT_URI: "https://staging.example/channel/tiktok/oauth/callback",
  JWT_SECRET: "jwt-secret-for-tiktok-test",
};

test("gera URL OAuth do TikTok com state e permissoes minimas", () => {
  const url = new URL(createTikTokAuthorizationUrl({ userId: "user-1", env }));
  assert.equal(url.origin + url.pathname, "https://www.tiktok.com/v2/auth/authorize/");
  assert.equal(url.searchParams.get("client_key"), env.TIKTOK_CLIENT_KEY);
  assert.equal(url.searchParams.get("redirect_uri"), env.TIKTOK_REDIRECT_URI);
  assert.equal(
    url.searchParams.get("scope"),
    "user.info.basic,video.publish,video.upload"
  );
  assert.ok(url.searchParams.get("state"));
});

test("troca codigo e salva tokens do TikTok criptografados", async () => {
  process.env.CHANNEL_CREDENTIAL_KEY =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const state = new URL(
    createTikTokAuthorizationUrl({ userId: "user-1", env })
  ).searchParams.get("state");
  const calls = [];
  const httpClient = {
    async post(url, body, config) {
      calls.push({ method: "post", url, body, config });
      return { data: {
        access_token: "access-token",
        refresh_token: "refresh-token",
        open_id: "open-1",
        scope: "user.info.basic,video.publish,video.upload",
        expires_in: 86400,
        refresh_expires_in: 31536000,
      } };
    },
    async get(url, config) {
      calls.push({ method: "get", url, config });
      return { data: { data: { user: {
        open_id: "open-1",
        display_name: "Mariel TikTok",
        avatar_url: "https://example/avatar.jpg",
      } } } };
    },
  };
  let saved;
  const connectionModel = {
    async findOneAndUpdate(filter, update, options) {
      saved = { filter, update, options };
      return { _id: "connection-1" };
    },
  };

  const result = await completeTikTokOAuth({
    code: "authorization-code",
    state,
    env,
    httpClient,
    connectionModel,
  });
  assert.equal(result.openId, "open-1");
  assert.equal(result.displayName, "Mariel TikTok");
  assert.equal(calls.length, 2);
  assert.deepEqual(saved.filter, {
    userId: "user-1",
    provider: "tiktok",
    destinationId: "open-1",
  });
  const credential = JSON.parse(decryptCredential(saved.update.$set.credential));
  assert.equal(credential.accessToken, "access-token");
  assert.equal(credential.refreshToken, "refresh-token");
  assert.equal(credential.openId, "open-1");
});

test("rejeita state adulterado antes de chamar o TikTok", async () => {
  let called = false;
  await assert.rejects(completeTikTokOAuth({
    code: "code",
    state: "state-invalido",
    env,
    httpClient: {
      async post() { called = true; },
      async get() { called = true; },
    },
    connectionModel: {},
  }));
  assert.equal(called, false);
});
