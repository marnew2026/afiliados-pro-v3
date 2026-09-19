import test from "node:test";
import assert from "node:assert/strict";

import { requireIntegrationAdmin } from "../middlewares/integrationAdminMiddleware.js";

function responseRecorder() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("bloqueia usuario fora da lista administrativa", () => {
  const previous = process.env.INTEGRATION_ADMIN_EMAILS;
  process.env.INTEGRATION_ADMIN_EMAILS = "admin@example.com";

  try {
    const res = responseRecorder();
    let called = false;
    requireIntegrationAdmin(
      { user: { email: "user@example.com" } },
      res,
      () => {
        called = true;
      }
    );

    assert.equal(res.statusCode, 403);
    assert.equal(called, false);
  } finally {
    if (previous === undefined) delete process.env.INTEGRATION_ADMIN_EMAILS;
    else process.env.INTEGRATION_ADMIN_EMAILS = previous;
  }
});

test("autoriza email administrativo sem diferenciar maiusculas", () => {
  const previous = process.env.INTEGRATION_ADMIN_EMAILS;
  process.env.INTEGRATION_ADMIN_EMAILS = "ADMIN@example.com";

  try {
    const res = responseRecorder();
    let called = false;
    requireIntegrationAdmin(
      { user: { email: "admin@EXAMPLE.com" } },
      res,
      () => {
        called = true;
      }
    );

    assert.equal(called, true);
    assert.equal(res.statusCode, null);
  } finally {
    if (previous === undefined) delete process.env.INTEGRATION_ADMIN_EMAILS;
    else process.env.INTEGRATION_ADMIN_EMAILS = previous;
  }
});

