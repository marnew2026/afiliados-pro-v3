import test from "node:test";
import assert from "node:assert/strict";
import { createTikTokDistribution } from "../services/distribution/CreateTikTokDistributionService.js";

function dependencies(overrides = {}) {
  let created;
  const distribution = {
    _id: "distribution-1", channel: "tiktok", source: "manual",
    status: "scheduled", scheduledAt: new Date("2026-09-16T04:00:00Z"),
    async save() {},
  };
  return {
    campaignModel: { async findOne() { return { _id: "campaign-1" }; } },
    mediaAssetModel: { async findOne() {
      return { _id: "asset-1", assetUrl: "https://cdn.example/video.mp4" };
    } },
    connectionModel: { async findOne() {
      return { destinationId: "open-1", active: true };
    } },
    distributionModel: { async create(input) { created = input; return distribution; } },
    scheduler: async () => ({ jobId: "job-1" }),
    now: () => new Date("2026-09-16T04:00:00Z"),
    getCreated: () => created,
    ...overrides,
  };
}

test("cria video manual somente para conta TikTok conectada", async () => {
  const deps = dependencies();
  const result = await createTikTokDistribution({
    userId: "user-1", campaignId: "campaign-1", mediaAssetId: "asset-1",
    caption: "Patinete eletrico.", hashtags: ["#Oferta", "Oferta"],
    env: { BASE_URL: "https://staging.example/" }, ...deps,
  });
  const created = deps.getCreated();
  assert.equal(created.channel, "tiktok");
  assert.equal(created.destinationId, "open-1");
  assert.equal(created.content.media.assetUrl, "https://cdn.example/video.mp4");
  assert.deepEqual(created.content.hashtags, ["Oferta"]);
  assert.equal(result.queue.jobId, "job-1");
});

test("bloqueia video de outro usuario ou campanha", async () => {
  const deps = dependencies({ mediaAssetModel: { async findOne() { return null; } } });
  await assert.rejects(createTikTokDistribution({
    userId: "user-1", campaignId: "campaign-1", mediaAssetId: "other",
    caption: "Teste", env: { BASE_URL: "https://staging.example" }, ...deps,
  }), (error) => error.statusCode === 404);
});

test("nao cria distribuicao sem conexao ativa do TikTok", async () => {
  const deps = dependencies({ connectionModel: { async findOne() { return null; } } });
  await assert.rejects(createTikTokDistribution({
    userId: "user-1", campaignId: "campaign-1", mediaAssetId: "asset-1",
    caption: "Teste", env: { BASE_URL: "https://staging.example" }, ...deps,
  }), (error) => error.statusCode === 400);
});

test("cria envio de rascunho com modo draft", async () => {
  const created = [];
  const result = await createTikTokDistribution({
    userId: "user-1", campaignId: "campaign-1", mediaAssetId: "asset-1",
    caption: "Revisar no TikTok", deliveryMode: "draft",
    env: { BASE_URL: "https://example.com" },
    campaignModel: { async findOne() { return { _id: "campaign-1" }; } },
    mediaAssetModel: { async findOne() { return { assetUrl: "https://cdn.example/video.mp4" }; } },
    connectionModel: { async findOne() { return { destinationId: "open-1" }; } },
    distributionModel: { async create(value) { created.push(value); return { _id: "dist-draft", ...value }; } },
    async scheduler() { return { jobId: "dist-draft" }; },
  });
  assert.equal(created[0].content.deliveryMode, "draft");
  assert.equal(result.distribution._id, "dist-draft");
});
