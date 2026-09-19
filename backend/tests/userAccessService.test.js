import test from "node:test";
import assert from "node:assert/strict";

import {
  hasExpiredFounderAccess,
  refreshUserAccess,
} from "../services/founding/UserAccessService.js";

test("expira somente o acesso fundador depois da data final", async () => {
  let saved = 0;
  const user = {
    plan: "PRO",
    isPro: true,
    accessSource: "FOUNDER_TRIAL",
    proAccessEndsAt: new Date("2026-10-01T00:00:00.000Z"),
    async save() { saved += 1; },
  };

  assert.equal(
    hasExpiredFounderAccess(user, new Date("2026-10-01T00:00:00.000Z")),
    true
  );

  await refreshUserAccess(user, new Date("2026-10-02T00:00:00.000Z"));
  assert.equal(user.plan, "FREE");
  assert.equal(user.isPro, false);
  assert.equal(user.accessSource, "FREE");
  assert.equal(user.proAccessEndsAt, null);
  assert.equal(saved, 1);
});

test("assinatura Stripe nunca e expirada pela regra fundadora", async () => {
  let saved = 0;
  const user = {
    plan: "PRO",
    isPro: true,
    accessSource: "STRIPE",
    proAccessEndsAt: new Date("2020-01-01T00:00:00.000Z"),
    async save() { saved += 1; },
  };

  await refreshUserAccess(user, new Date("2026-10-02T00:00:00.000Z"));
  assert.equal(user.isPro, true);
  assert.equal(user.accessSource, "STRIPE");
  assert.equal(saved, 0);
});
