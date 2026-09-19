import test from "node:test";
import assert from "node:assert/strict";

import {
  recordFounderActivity,
  utcDay,
} from "../services/founding/FounderActivityService.js";

test("normaliza atividade para o inicio do dia UTC", () => {
  assert.equal(
    utcDay(new Date("2026-09-19T23:59:59.000Z")).toISOString(),
    "2026-09-19T00:00:00.000Z"
  );
});

test("nao registra atividade de usuario que nunca foi fundador", async () => {
  let called = false;
  const result = await recordFounderActivity({
    user: { _id: "user-1", founderTrialGrantedAt: null },
    activityModel: { async updateOne() { called = true; } },
  });

  assert.equal(result.recorded, false);
  assert.equal(called, false);
});

test("registra no maximo um documento por usuario e dia via upsert", async () => {
  let call;
  const result = await recordFounderActivity({
    user: { _id: "user-1", founderTrialGrantedAt: new Date() },
    activityModel: { async updateOne(...args) { call = args; } },
    now: () => new Date("2026-09-19T21:30:00.000Z"),
  });

  assert.equal(result.recorded, true);
  assert.equal(call[0].userId, "user-1");
  assert.equal(call[0].day.toISOString(), "2026-09-19T00:00:00.000Z");
  assert.equal(call[1].$inc.requestCount, 1);
  assert.equal(call[2].upsert, true);
});
