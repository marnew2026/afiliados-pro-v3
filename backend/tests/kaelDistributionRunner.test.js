import test from "node:test";
import assert from "node:assert/strict";
import { runKaelDistribution, scheduleKaelDistribution } from "../services/distribution/KaelDistributionRunner.js";

test("runner fornece scheduler de producao sem carregar Redis", async () => {
  const content = { caption: "Oferta" };
  const campaign = { _id: "campaign" };
  const expected = { status: "PENDING" };
  const result = await runKaelDistribution({
    userId: "user", campaign, channel: "instagram", content,
    executor: async (input) => {
      assert.deepEqual(input, { userId: "user", campaign, channel: "instagram", content, scheduler: scheduleKaelDistribution });
      return expected;
    },
  });
  assert.equal(result, expected);
});

test("runner preserva scheduler injetado e propaga resultado e erro", async () => {
  const scheduler = async () => ({ jobId: "job" });
  const result = await runKaelDistribution({ scheduler, executor: async (input) => input.scheduler({}) });
  assert.deepEqual(result, { jobId: "job" });
  await assert.rejects(runKaelDistribution({ scheduler, executor: async () => { throw new Error("falha"); } }), /falha/);
});
