import test from "node:test";
import assert from "node:assert/strict";

import {
  getFoundingCohortConfig,
  grantFoundingAccess,
} from "../services/founding/FoundingCohortService.js";

function user(overrides = {}) {
  return {
    plan: "FREE",
    isPro: false,
    accessSource: "FREE",
    founderTrialGrantedAt: null,
    founderTrialClaimNumber: null,
    async save() {},
    ...overrides,
  };
}

function cohortModel({ claimedCount = 0, allowClaim = true } = {}) {
  const calls = [];
  return {
    calls,
    async updateOne(filter, update, options) {
      calls.push({ type: "updateOne", filter, update, options });
      return { acknowledged: true };
    },
    async findOneAndUpdate() {
      calls.push({ type: "claim" });
      if (!allowClaim) return null;
      return { claimedCount: claimedCount + 1 };
    },
  };
}

test("campanha fundadora fica desativada por padrao", async () => {
  const member = user();
  const model = cohortModel();
  const result = await grantFoundingAccess({ user: member, env: {}, cohortModel: model });

  assert.equal(result.granted, false);
  assert.equal(result.reason, "campaign_closed");
  assert.equal(member.isPro, false);
  assert.equal(model.calls.length, 0);
});

test("concede 30 dias Pro e registra o numero atomico da vaga", async () => {
  const member = user();
  const model = cohortModel({ claimedCount: 41 });
  const now = new Date("2026-10-01T12:00:00.000Z");

  const result = await grantFoundingAccess({
    user: member,
    env: {
      FOUNDING_COHORT_ENABLED: "true",
      FOUNDING_COHORT_LIMIT: "1000",
      FOUNDING_COHORT_DURATION_DAYS: "30",
    },
    cohortModel: model,
    now: () => now,
  });

  assert.equal(result.granted, true);
  assert.equal(result.claimNumber, 42);
  assert.equal(member.plan, "PRO");
  assert.equal(member.isPro, true);
  assert.equal(member.accessSource, "FOUNDER_TRIAL");
  assert.equal(member.founderTrialClaimNumber, 42);
  assert.equal(member.proAccessEndsAt.toISOString(), "2026-10-31T12:00:00.000Z");
});

test("nao concede quando as mil vagas estiverem ocupadas", async () => {
  const member = user();
  const result = await grantFoundingAccess({
    user: member,
    env: { FOUNDING_COHORT_ENABLED: "true", FOUNDING_COHORT_LIMIT: "1000" },
    cohortModel: cohortModel({ allowClaim: false }),
  });

  assert.equal(result.granted, false);
  assert.equal(result.reason, "limit_reached");
  assert.equal(member.isPro, false);
});

test("configuracao aplica limites seguros", () => {
  const config = getFoundingCohortConfig({
    FOUNDING_COHORT_ENABLED: "true",
    FOUNDING_COHORT_LIMIT: "9999999",
    FOUNDING_COHORT_DURATION_DAYS: "0",
  });

  assert.equal(config.enabled, true);
  assert.equal(config.limit, 100000);
  assert.equal(config.durationDays, 1);
});

test("devolve a vaga e restaura o usuario quando a persistencia falha", async () => {
  const member = user({
    async save() { throw new Error("falha simulada"); },
  });
  const model = cohortModel({ claimedCount: 9 });

  await assert.rejects(
    grantFoundingAccess({
      user: member,
      env: { FOUNDING_COHORT_ENABLED: "true" },
      cohortModel: model,
    }),
    /falha simulada/
  );

  assert.equal(member.plan, "FREE");
  assert.equal(member.isPro, false);
  assert.equal(member.accessSource, "FREE");
  assert.equal(member.founderTrialGrantedAt, null);
  assert.equal(
    model.calls.some((call) => call.update?.$inc?.claimedCount === -1),
    true
  );
});
