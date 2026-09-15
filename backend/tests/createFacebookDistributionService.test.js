import test from "node:test";
import assert from "node:assert/strict";

import {
  createFacebookDistribution,
} from "../services/distribution/CreateFacebookDistributionService.js";

function dependencies(overrides = {}) {
  let created;
  const distribution = {
    _id: "distribution-1",
    channel: "facebook",
    source: "manual",
    status: "scheduled",
    scheduledAt: new Date("2026-09-15T20:00:00Z"),
    async save() {},
  };

  return {
    campaignModel: { async findOne() { return { _id: "campaign-1" }; } },
    mediaAssetModel: {
      async findOne() {
        return { _id: "asset-1", assetUrl: "https://cdn.example/reel.mp4" };
      },
    },
    connectionModel: {
      async findOne() { return { destinationId: "page-1", active: true }; },
    },
    distributionModel: {
      async create(input) { created = input; return distribution; },
    },
    scheduler: async () => ({ jobId: "job-1" }),
    now: () => new Date("2026-09-15T20:00:00Z"),
    getCreated: () => created,
    ...overrides,
  };
}

test("cria Reel manual somente para Pagina conectada do usuario", async () => {
  const deps = dependencies();
  const result = await createFacebookDistribution({
    userId: "user-1",
    campaignId: "campaign-1",
    mediaAssetId: "asset-1",
    caption: "Patinete eletrico dobravel.",
    hashtags: ["#PatineteEletrico", "oferta", "oferta"],
    cta: "Confira a oferta",
    env: { BASE_URL: "https://staging.example/" },
    ...deps,
  });

  const created = deps.getCreated();
  assert.equal(created.channel, "facebook");
  assert.equal(created.source, "manual");
  assert.equal(created.destinationId, "page-1");
  assert.equal(created.content.contentType, "short_video");
  assert.equal(created.content.media.assetUrl, "https://cdn.example/reel.mp4");
  assert.equal(
    created.content.trackingUrl,
    "https://staging.example/campaigns/r/campaign-1"
  );
  assert.deepEqual(created.content.hashtags, ["PatineteEletrico", "oferta"]);
  assert.equal(result.queue.jobId, "job-1");
});

test("bloqueia asset de outro usuario ou campanha", async () => {
  let created = false;
  const deps = dependencies({
    mediaAssetModel: { async findOne() { return null; } },
    distributionModel: { async create() { created = true; } },
  });

  await assert.rejects(
    createFacebookDistribution({
      userId: "user-1",
      campaignId: "campaign-1",
      mediaAssetId: "asset-de-outro-usuario",
      caption: "Teste",
      env: { BASE_URL: "https://staging.example" },
      ...deps,
    }),
    (error) => error.statusCode === 404
  );

  assert.equal(created, false);
});

test("nao cria distribuicao sem conexao ativa do Facebook", async () => {
  let created = false;
  const deps = dependencies({
    connectionModel: { async findOne() { return null; } },
    distributionModel: { async create() { created = true; } },
  });

  await assert.rejects(
    createFacebookDistribution({
      userId: "user-1",
      campaignId: "campaign-1",
      mediaAssetId: "asset-1",
      caption: "Teste",
      env: { BASE_URL: "https://staging.example" },
      ...deps,
    }),
    (error) => error.statusCode === 400
  );

  assert.equal(created, false);
});
