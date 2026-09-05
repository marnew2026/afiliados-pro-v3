import test from "node:test";
import assert from "node:assert/strict";

import {
  completeInstagramOAuth,
  createInstagramAuthorizationUrl,
} from "../services/connections/InstagramOAuthService.js";
import { decryptCredential } from "../utils/credentialCrypto.js";

const env = {
  INSTAGRAM_APP_ID: "app-123",
  INSTAGRAM_APP_SECRET: "secret-456",
  INSTAGRAM_REDIRECT_URI: "https://staging.example/channel/instagram/oauth/callback",
  JWT_SECRET: "jwt-secret-for-test",
};

test("gera URL OAuth oficial com state assinado e permissoes de publicacao", () => {
  const authorizationUrl = createInstagramAuthorizationUrl({
    userId: "user-1",
    env,
  });
  const url = new URL(authorizationUrl);

  assert.equal(url.origin + url.pathname, "https://www.instagram.com/oauth/authorize");
  assert.equal(url.searchParams.get("client_id"), "app-123");
  assert.equal(url.searchParams.get("redirect_uri"), env.INSTAGRAM_REDIRECT_URI);
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(
    url.searchParams.get("scope"),
    "instagram_business_basic,instagram_business_content_publish"
  );
  assert.ok(url.searchParams.get("state"));
});

test("troca o codigo, busca perfil e salva credencial criptografada", async () => {
  process.env.CHANNEL_CREDENTIAL_KEY =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const authorizationUrl = createInstagramAuthorizationUrl({ userId: "user-1", env });
  const state = new URL(authorizationUrl).searchParams.get("state");
  const calls = [];

  const httpClient = {
    async post(url, body, config) {
      calls.push({ method: "post", url, body, config });
      return { data: { access_token: "short-token", user_id: "ig-1" } };
    },
    async get(url, config) {
      calls.push({ method: "get", url, config });
      if (url.endsWith("/access_token")) {
        return { data: { access_token: "long-token", token_type: "bearer" } };
      }
      return { data: { id: "ig-1", username: "afiliados_teste" } };
    },
  };

  let saved;
  const connectionModel = {
    async findOneAndUpdate(filter, update, options) {
      saved = { filter, update, options };
      return { _id: "connection-1" };
    },
  };

  const result = await completeInstagramOAuth({
    code: "authorization-code",
    state,
    env,
    httpClient,
    connectionModel,
  });

  assert.equal(result.instagramUserId, "ig-1");
  assert.equal(result.username, "afiliados_teste");
  assert.equal(calls.length, 3);
  assert.deepEqual(saved.filter, {
    userId: "user-1",
    provider: "instagram",
    destinationId: "ig-1",
  });
  assert.equal(saved.options.upsert, true);

  const credential = JSON.parse(decryptCredential(saved.update.$set.credential));
  assert.deepEqual(credential, {
    accessToken: "long-token",
    instagramUserId: "ig-1",
  });
});

test("rejeita state adulterado antes de chamar a Meta", async () => {
  let called = false;
  const httpClient = {
    async post() {
      called = true;
    },
  };

  await assert.rejects(
    completeInstagramOAuth({
      code: "code",
      state: "state-invalido",
      env,
      httpClient,
      connectionModel: {},
    })
  );

  assert.equal(called, false);
});
