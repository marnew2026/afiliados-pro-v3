import test from "node:test";
import assert from "node:assert/strict";

import {
  executeKaelDistribution,
} from "../services/distribution/KaelDistributionExecutor.js";

test("KAEL nao cria Distribution enquanto a midia esta pendente", async () => {
  let creatorCalled = false;

  const pendingPreparation = {
    status: "PENDING",
    reason: "media_generation_started",
    content: {
      contentType: "short_video",
      channel: "instagram",
      caption: "Produto de teste",
      hashtags: [],
      cta: "Confira os detalhes.",
      media: {
        type: "video",
        assetUrl: "",
      },
    },
  };

  const result = await executeKaelDistribution({
    userId: "user-test",
    campaign: {
      _id: "campaign-test",
    },
    channel: "instagram",
    content: pendingPreparation.content,
    mediaPreparer: async () => pendingPreparation,
    distributionCreator: async () => {
      creatorCalled = true;

      throw new Error(
        "Distribution nao deveria ser criada."
      );
    },
  });

  assert.equal(result.status, "PENDING");
  assert.equal(result.reason, "media_generation_started");
  assert.equal(result.content, pendingPreparation.content);
  assert.equal(creatorCalled, false);
});
test("KAEL cria Distribution quando a midia esta pronta", async () => {
  let creatorInput = null;
  const scheduler = async () => ({
    jobId: "distribution-test",
  });
  const readyContent = {
    contentType: "short_video",
    channel: "instagram",
    caption: "Produto de teste",
    hashtags: ["oferta"],
    cta: "Confira os detalhes.",
    mediaAssetId: "media-asset-test",
    media: {
      type: "video",
      assetUrl: "https://example.test/video.mp4",
    },
  };

  const creationResult = {
    distribution: {
      _id: "distribution-test",
    },
    queue: {
      jobId: "distribution-test",
    },
  };

  const result = await executeKaelDistribution({
    userId: "user-test",
    campaign: {
      _id: "campaign-test",
    },
    channel: "instagram",
    content: readyContent,
    scheduler,
    mediaPreparer: async () => ({
      status: "READY",
      reason: "media_asset_ready",
      content: readyContent,
    }),
    distributionCreator: async (input) => {
      creatorInput = input;
      return creationResult;
    },
  });

  assert.equal(creatorInput.userId, "user-test");
  assert.equal(creatorInput.campaignId, "campaign-test");
  assert.equal(
    creatorInput.mediaAssetId,
    "media-asset-test"
  );
  assert.equal(
    creatorInput.caption,
    "Produto de teste"
  );
  assert.deepEqual(
    creatorInput.hashtags,
    ["oferta"]
  );
  assert.equal(
    creatorInput.cta,
    "Confira os detalhes."
  );
  assert.equal(
    creatorInput.source,
    "autopilot"
  );
  assert.equal(
    Object.hasOwn(creatorInput, "review"),
    false
  );
    assert.equal(
    creatorInput.scheduler,
    scheduler
  );
});
test("KAEL resolve o criador da Distribution pelo canal", async () => {
  let resolvedChannel = null;
  let creatorInput = null;

  const creationResult = {
    distribution: {
      _id: "distribution-test",
    },
    queue: {
      jobId: "distribution-test",
    },
  };

  const readyContent = {
    contentType: "short_video",
    channel: "facebook",
    caption: "Produto de teste",
    hashtags: ["oferta"],
    cta: "Confira os detalhes.",
    mediaAssetId: "media-asset-test",
    media: {
      type: "video",
      assetUrl: "https://example.test/video.mp4",
    },
  };

  const result = await executeKaelDistribution({
    userId: "user-test",
    campaign: {
      _id: "campaign-test",
    },
    channel: "facebook",
    content: readyContent,
    scheduler: async () => ({
      jobId: "distribution-test",
    }),
    mediaPreparer: async () => ({
      status: "READY",
      reason: "media_asset_ready",
      content: readyContent,
    }),
    creatorResolver: ({ channel }) => {
      resolvedChannel = channel;

      return async (input) => {
        creatorInput = input;
        return creationResult;
      };
    },
  });

  assert.equal(resolvedChannel, "facebook");
  assert.equal(creatorInput.source, "autopilot");
  assert.equal(
    creatorInput.mediaAssetId,
    "media-asset-test"
  );
  assert.equal(result, creationResult);
});

for (const status of ["FAILED", "UNKNOWN", undefined, null]) {
  test(`KAEL bloqueia preparacao sem READY: ${status}`, async () => {
    await assert.rejects(executeKaelDistribution({
      mediaPreparer: async () => ({ status }),
      creatorResolver: () => { assert.fail("Nao deve resolver criador"); },
      scheduler: () => { assert.fail("Nao deve agendar"); },
    }), /Estado de preparacao de midia invalido/);
  });
}
