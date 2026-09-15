import test from "node:test";
import assert from "node:assert/strict";

import {
  completeFacebookOAuth,
  createFacebookAuthorizationUrl,
} from "../services/connections/FacebookOAuthService.js";
import { decryptCredential } from "../utils/credentialCrypto.js";

const env = {
  FACEBOOK_APP_ID: "facebook-app-1",
  FACEBOOK_APP_SECRET: "facebook-secret-1",
  FACEBOOK_REDIRECT_URI: "https://staging.example/channel/facebook/oauth/callback",
  META_GRAPH_API_VERSION: "v25.0",
  JWT_SECRET: "jwt-secret-for-facebook-test",
};

test("gera URL OAuth do Facebook com state e permissoes minimas", () => {
  const authorizationUrl = createFacebookAuthorizationUrl({
    userId: "user-1",
    env,
  });
  const url = new URL(authorizationUrl);

  assert.equal(
    url.origin + url.pathname,
    "https://www.facebook.com/v25.0/dialog/oauth"
  );
  assert.equal(url.searchParams.get("client_id"), "facebook-app-1");
  assert.equal(url.searchParams.get("redirect_uri"), env.FACEBOOK_REDIRECT_URI);
  assert.equal(
    url.searchParams.get("scope"),
    "pages_show_list,pages_read_engagement,pages_manage_posts"
  );
  assert.ok(url.searchParams.get("state"));
});

test("troca codigo, escolhe Pagina autorizada e salva token criptografado", async () => {
  process.env.CHANNEL_CREDENTIAL_KEY =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const state = new URL(
    createFacebookAuthorizationUrl({ userId: "user-1", env })
  ).searchParams.get("state");
  const calls = [];
  const httpClient = {
    async get(url, config) {
      calls.push({ url, config });

      if (calls.length === 1) return { data: { access_token: "short-user-token" } };
      if (calls.length === 2) return { data: { access_token: "long-user-token" } };
      return {
        data: {
          data: [{
            id: "page-1",
            name: "Ofertas do Mariel",
            access_token: "page-token",
            tasks: ["CREATE_CONTENT", "MANAGE"],
          }],
        },
      };
    },
  };
  let saved;
  const connectionModel = {
    async findOneAndUpdate(filter, update, options) {
      saved = { filter, update, options };
      return { _id: "connection-1" };
    },
  };

  const result = await completeFacebookOAuth({
    code: "authorization-code",
    state,
    env,
    httpClient,
    connectionModel,
  });

  assert.equal(result.pageId, "page-1");
  assert.equal(result.pageName, "Ofertas do Mariel");
  assert.equal(calls.length, 3);
  assert.deepEqual(saved.filter, {
    userId: "user-1",
    provider: "facebook",
    destinationId: "page-1",
  });
  const credential = JSON.parse(decryptCredential(saved.update.$set.credential));
  assert.deepEqual(credential, {
    pageAccessToken: "page-token",
    pageId: "page-1",
  });
});

test("rejeita varias Paginas sem selecao explicita", async () => {
  const state = new URL(
    createFacebookAuthorizationUrl({ userId: "user-1", env })
  ).searchParams.get("state");
  let call = 0;
  const httpClient = {
    async get() {
      call += 1;
      if (call <= 2) return { data: { access_token: `token-${call}` } };
      return {
        data: {
          data: [
            { id: "page-1", access_token: "page-token-1", tasks: ["CREATE_CONTENT"] },
            { id: "page-2", access_token: "page-token-2", tasks: ["CREATE_CONTENT"] },
          ],
        },
      };
    },
  };

  await assert.rejects(
    completeFacebookOAuth({
      code: "code",
      state,
      env,
      httpClient,
      connectionModel: {},
    }),
    /FACEBOOK_PAGE_ID/
  );
});

test("rejeita state adulterado antes de chamar o Facebook", async () => {
  let called = false;

  await assert.rejects(
    completeFacebookOAuth({
      code: "code",
      state: "state-invalido",
      env,
      httpClient: { async get() { called = true; } },
      connectionModel: {},
    })
  );

  assert.equal(called, false);
});

