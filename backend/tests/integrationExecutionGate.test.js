import test from "node:test";
import assert from "node:assert/strict";

import { assertIntegrationOperational } from "../services/readiness/IntegrationExecutionGate.js";

test("libera canal aprovado habilitado e sem emergencia", () => {
  assert.equal(assertIntegrationOperational("facebook", {
    FACEBOOK_API_APPROVAL_STATUS: "approved",
    FACEBOOK_ENABLED: "true",
    FACEBOOK_EMERGENCY_DISABLED: "false",
  }), true);
});

test("bloqueia por padrao quando aprovacao e habilitacao nao existem", () => {
  assert.throws(
    () => assertIntegrationOperational("instagram", {}),
    (error) => error.statusCode === 503 && error.reason === "approval_not_confirmed"
  );
});

test("desligamento emergencial prevalece sobre aprovacao e habilitacao", () => {
  assert.throws(
    () => assertIntegrationOperational("tiktok", {
      TIKTOK_API_APPROVAL_STATUS: "approved",
      TIKTOK_ENABLED: "true",
      TIKTOK_EMERGENCY_DISABLED: "true",
    }),
    (error) => error.statusCode === 503 && error.reason === "emergency_disabled"
  );
});

test("telegram exige habilitacao mas nao aprovacao externa", () => {
  assert.equal(assertIntegrationOperational("telegram", {
    TELEGRAM_ENABLED: "true",
  }), true);
});
test("libera Instagram review somente quando explicitamente habilitado fora de producao", () => {
  assert.equal(
    assertIntegrationOperational(
      "instagram",
      {
        INSTAGRAM_REVIEW_ENV: "staging",
        INSTAGRAM_API_APPROVAL_STATUS: "pending",
        INSTAGRAM_ENABLED: "false",
        INSTAGRAM_REVIEW_ENABLED: "true",
        INSTAGRAM_EMERGENCY_DISABLED: "false",
      },
      { review: true }
    ),
    true
  );
});

test("Instagram review continua bloqueado sem flag explicita de review", () => {
  assert.throws(
    () =>
      assertIntegrationOperational("instagram", {
        INSTAGRAM_REVIEW_ENV: "staging",
        INSTAGRAM_API_APPROVAL_STATUS: "pending",
        INSTAGRAM_ENABLED: "false",
        INSTAGRAM_REVIEW_ENABLED: "true",
      }),
    (error) =>
      error.statusCode === 503 &&
      error.reason === "approval_not_confirmed"
  );
});

test("Instagram review exige ambiente de review staging explicito", () => {
  assert.throws(
    () =>
      assertIntegrationOperational(
        "instagram",
        {
          INSTAGRAM_REVIEW_ENV: "production",
          INSTAGRAM_API_APPROVAL_STATUS: "pending",
          INSTAGRAM_ENABLED: "false",
          INSTAGRAM_REVIEW_ENABLED: "true",
        },
        { review: true }
      ),
    (error) =>
      error.statusCode === 503 &&
      error.reason === "approval_not_confirmed"
  );
});

test("desligamento emergencial tambem bloqueia Instagram review", () => {
  assert.throws(
    () =>
      assertIntegrationOperational(
        "instagram",
        {
          INSTAGRAM_REVIEW_ENV: "staging",
          INSTAGRAM_API_APPROVAL_STATUS: "pending",
          INSTAGRAM_ENABLED: "false",
          INSTAGRAM_REVIEW_ENABLED: "true",
          INSTAGRAM_EMERGENCY_DISABLED: "true",
        },
        { review: true }
      ),
    (error) =>
      error.statusCode === 503 &&
      error.reason === "emergency_disabled"
  );
});


test("producao nao usa a excecao de review com flags de staging", () => {
  assert.throws(
    () => assertIntegrationOperational("instagram", {
      NODE_ENV: "production",
      INSTAGRAM_REVIEW_ENV: "staging",
      INSTAGRAM_REVIEW_ENABLED: "true",
      INSTAGRAM_API_APPROVAL_STATUS: "pending",
      INSTAGRAM_ENABLED: "false",
    }, { review: true }),
    (error) => error.reason === "approval_not_confirmed"
  );
});

test("producao aprovada e habilitada preserva o fluxo normal", () => {
  assert.equal(assertIntegrationOperational("instagram", {
    NODE_ENV: "production",
    INSTAGRAM_REVIEW_ENV: "staging",
    INSTAGRAM_REVIEW_ENABLED: "true",
    INSTAGRAM_API_APPROVAL_STATUS: "approved",
    INSTAGRAM_ENABLED: "true",
  }, { review: true }), true);
});
