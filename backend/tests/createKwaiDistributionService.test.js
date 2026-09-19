import test from "node:test";
import assert from "node:assert/strict";

import {
  createKwaiDistribution,
} from "../services/distribution/CreateKwaiDistributionService.js";

function dependencies(overrides = {}) {
  let created;
  const distribution = {
    _id: "distribution-1",
    channel: "kwai",
    source: "manual",
    status: "scheduled",
    scheduledAt: new Date("2026-09-18T12:00:00Z"),
    async save() {},
  };

  return {
    campaignModel: { async findOne() { return { _id: "campaign-1" }; } },
    mediaAssetModel: {
      async findOne() {
        return { _id: "asset-1", assetUrl: "https://cdn.example/kwai.mp4" };
      },
    },
    connectionModel: {
      async findOne() { return { destinationId: "kwai-1", active: true }; },
    },
    distributionModel: {
      async create(input) { created = input; return distribution; },
    },
    scheduler: async () => ({ jobId: "job-1" }),
    now: () => new Date("2026-09-18T12:00:00Z"),
    getCreated: () => created,
    ...overrides,
  };
}

test("nao cria distribuicao enquanto Kwai estiver desativado", async () => {
  let queried = false;
  const deps = dependencies({
    campaignModel: { async findOne() { queried = true; } },
  });

  await assert.rejects(
    createKwaiDistribution({
      userId: "user-1",
      campaignId: "campaign-1",
      mediaAssetId: "asset-1",
      caption: "Teste",
      env: { BASE_URL: "https://staging.example" },
      ...deps,
    }),
    (error) => error.statusCode === 503
  );

  assert.equal(queried, false);
  assert.equal(deps.getCreated(), undefined);
});

test("cria video do Kwai quando a integracao for explicitamente habilitada", async () => {
  const deps = dependencies();
  const result = await createKwaiDistribution({
    userId: "user-1",
    campaignId: "campaign-1",
    mediaAssetId: "asset-1",
    caption: "Produto selecionado pelo KAEL.",
    hashtags: ["#oferta", "oferta", "kwai"],
    env: {
      BASE_URL: "https://staging.example/",
      KWAI_API_APPROVAL_STATUS: "approved",
      KWAI_ENABLED: "true",
    },
    ...deps,
  });

  const created = deps.getCreated();
  assert.equal(created.channel, "kwai");
  assert.equal(created.destinationId, "kwai-1");
  assert.equal(created.content.contentType, "short_video");
  assert.equal(created.content.media.aspectRatio, "9:16");
  assert.deepEqual(created.content.hashtags, ["oferta", "kwai"]);
  assert.equal(result.queue.jobId, "job-1");
});
