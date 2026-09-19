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
