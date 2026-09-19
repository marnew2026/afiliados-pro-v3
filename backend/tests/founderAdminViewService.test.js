import test from "node:test";
import assert from "node:assert/strict";

import {
  buildFeedbackAdminRows,
  buildFounderAdminRows,
} from "../services/founding/FounderAdminViewService.js";

test("painel administrativo nao expoe identidade do fundador", () => {
  const rows = buildFounderAdminRows({
    founders: [{
      _id: "user-1",
      email: "nao-pode-vazar@example.com",
      name: "Nome privado",
      accessSource: "FOUNDER_TRIAL",
      founderTrialClaimNumber: 2,
      founderTrialGrantedAt: new Date("2026-09-19T00:00:00Z"),
      proAccessEndsAt: new Date("2026-10-19T00:00:00Z"),
    }],
    activityDays: [{ userId: "user-1", day: new Date("2026-09-20T00:00:00Z") }],
    now: new Date("2026-09-21T00:00:00Z"),
  });

  assert.equal(rows[0].founderNumber, 2);
  assert.equal(rows[0].status, "active");
  assert.equal(rows[0].activeDays, 1);
  assert.equal("email" in rows[0], false);
  assert.equal("name" in rows[0], false);
  assert.equal("userId" in rows[0], false);
});

test("opinioes administrativas usam rotulos e omitem identificadores", () => {
  const rows = buildFeedbackAdminRows({
    feedbackItems: [{
      userId: "user-1",
      rating: 5,
      wouldRecommend: true,
      mostValuable: "kael",
      biggestDifficulty: "none",
      comment: "Muito bom",
      status: "new",
    }],
    founderNumberById: new Map([["user-1", 7]]),
  });

  assert.deepEqual(rows[0].mostValuable, "KAEL");
  assert.deepEqual(rows[0].biggestDifficulty, "Nenhuma");
  assert.equal(rows[0].founderNumber, 7);
  assert.equal("userId" in rows[0], false);
});
