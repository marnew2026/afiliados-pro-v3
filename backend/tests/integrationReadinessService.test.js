import test from "node:test";
import assert from "node:assert/strict";

import { getIntegrationReadiness } from "../services/readiness/IntegrationReadinessService.js";

const credentialKey = "a".repeat(64);

test("integracoes ficam bloqueadas por padrao e nao expoem segredos", () => {
  const readiness = getIntegrationReadiness({
    FACEBOOK_APP_SECRET: "segredo-nao-pode-aparecer",
  });

  const serialized = JSON.stringify(readiness);
  const facebook = readiness.channels.find(
    (item) => item.channel === "facebook"
  );
  const kwai = readiness.channels.find((item) => item.channel === "kwai");

  assert.equal(readiness.safeByDefault, true);
  assert.equal(facebook.readyForStaging, false);
  assert.equal(facebook.readyForProduction, false);
  assert.equal(kwai.configured, false);
  assert.ok(kwai.blockers.includes("official_configuration_pending"));
  assert.doesNotMatch(serialized, /segredo-nao-pode-aparecer/);
});

test("Facebook fica pronto para staging somente com aprovacao configuracao e chave ativa", () => {
  const readiness = getIntegrationReadiness({
    FACEBOOK_API_APPROVAL_STATUS: "approved",
    FACEBOOK_ENABLED: "true",
    FACEBOOK_APP_ID: "app-id",
    FACEBOOK_APP_SECRET: "app-secret",
    FACEBOOK_REDIRECT_URI:
      "https://staging.example/channel/facebook/oauth/callback",
    META_GRAPH_API_VERSION: "v24.0",
    JWT_SECRET: "jwt-secret",
    CHANNEL_CREDENTIAL_KEY: credentialKey,
  });

  const facebook = readiness.channels.find(
    (item) => item.channel === "facebook"
  );

  assert.equal(facebook.configured, true);
  assert.equal(facebook.readyForStaging, true);
  assert.equal(facebook.readyForProduction, false);
  assert.ok(facebook.blockers.includes("staging_not_tested"));
  assert.ok(facebook.blockers.includes("production_not_released"));
});

test("liberacao de producao exige teste e liberacao explicitos", () => {
  const readiness = getIntegrationReadiness({
    TIKTOK_API_APPROVAL_STATUS: "approved",
    TIKTOK_ENABLED: "true",
    TIKTOK_STAGING_TESTED: "true",
    TIKTOK_PRODUCTION_RELEASED: "true",
    TIKTOK_CLIENT_KEY: "client-key",
    TIKTOK_CLIENT_SECRET: "client-secret",
    TIKTOK_REDIRECT_URI:
      "https://staging.example/channel/tiktok/oauth/callback",
    JWT_SECRET: "jwt-secret",
    CHANNEL_CREDENTIAL_KEY: credentialKey,
  });

  const tiktok = readiness.channels.find(
    (item) => item.channel === "tiktok"
  );

  assert.equal(tiktok.readyForProduction, true);
  assert.deepEqual(tiktok.blockers, []);
});

test("desligamento emergencial prevalece sobre todas as aprovacoes", () => {
  const readiness = getIntegrationReadiness({
    INSTAGRAM_API_APPROVAL_STATUS: "approved",
    INSTAGRAM_ENABLED: "true",
    INSTAGRAM_STAGING_TESTED: "true",
    INSTAGRAM_PRODUCTION_RELEASED: "true",
    INSTAGRAM_EMERGENCY_DISABLED: "true",
    INSTAGRAM_APP_ID: "app-id",
    INSTAGRAM_APP_SECRET: "app-secret",
    INSTAGRAM_REDIRECT_URI:
      "https://staging.example/channel/instagram/oauth/callback",
    JWT_SECRET: "jwt-secret",
    CHANNEL_CREDENTIAL_KEY: credentialKey,
  });

  const instagram = readiness.channels.find(
    (item) => item.channel === "instagram"
  );

  assert.equal(instagram.readyForStaging, false);
  assert.equal(instagram.readyForProduction, false);
  assert.ok(instagram.blockers.includes("emergency_disabled"));
});

test("redirect inseguro e chave de criptografia invalida contam como configuracao ausente", () => {
  const readiness = getIntegrationReadiness({
    FACEBOOK_API_APPROVAL_STATUS: "approved",
    FACEBOOK_ENABLED: "true",
    FACEBOOK_APP_ID: "app-id",
    FACEBOOK_APP_SECRET: "app-secret",
    FACEBOOK_REDIRECT_URI: "http://localhost/callback",
    META_GRAPH_API_VERSION: "v24.0",
    JWT_SECRET: "jwt-secret",
    CHANNEL_CREDENTIAL_KEY: "curta",
  });

  const facebook = readiness.channels.find(
    (item) => item.channel === "facebook"
  );

  assert.equal(facebook.configured, false);
  assert.deepEqual(facebook.missingEnvironmentKeys, [
    "FACEBOOK_REDIRECT_URI",
    "CHANNEL_CREDENTIAL_KEY",
  ]);
});

