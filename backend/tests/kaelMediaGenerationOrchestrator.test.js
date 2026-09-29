import test from "node:test";
import assert from "node:assert/strict";

import {
  ensureKaelMediaGeneration,
} from "../services/media/generation/KaelMediaGenerationOrchestrator.js";

const userId = "user-test";
const campaign = {
  _id: "campaign-test",
};

test("KAEL nao inicia geracao quando conteudo nao exige video", async () => {
  let starterCalled = false;

  const result = await ensureKaelMediaGeneration({
    userId,
    campaign,
    content: {
      contentType: "text",
      media: {},
    },
    provider: {},
    generationStarter: async () => {
      starterCalled = true;
      throw new Error("Nao deveria iniciar geracao.");
    },
  });

  assert.equal(result.status, "SKIPPED");
  assert.equal(
    result.reason,
    "media_generation_not_required"
  );
  assert.equal(starterCalled, false);
});

test("KAEL reutiliza video pronto sem iniciar nova geracao", async () => {
  let starterCalled = false;

  const result = await ensureKaelMediaGeneration({
    userId,
    campaign,
    content: {
      contentType: "short_video",
      media: {
        assetUrl: "https://example.test/video.mp4",
      },
    },
    provider: {},
    generationStarter: async () => {
      starterCalled = true;
      throw new Error("Nao deveria iniciar geracao.");
    },
  });

  assert.equal(result.status, "SKIPPED");
  assert.equal(
    result.reason,
    "media_asset_already_ready"
  );
  assert.equal(starterCalled, false);
});

test("KAEL inicia geracao quando short_video nao possui asset pronto", async () => {
  let receivedInput = null;

  const generationTask = {
    _id: "generation-task-test",
  };

  const generation = {
    provider: "runway",
    externalTaskId: "runway-task-test",
    mediaType: "video",
    status: "PENDING",
  };

  const result = await ensureKaelMediaGeneration({
    userId,
    campaign,
    content: {
      contentType: "short_video",
      caption: "Produto de teste",
      media: {
        type: "video",
        assetUrl: "",
      },
    },
    provider: {
      providerName: "runway",
    },
    generationStarter: async (input) => {
      receivedInput = input;

      return {
        generation,
        generationTask,
        reserved: true,
      };
    },
  });

  assert.equal(result.status, "STARTED");
  assert.equal(result.generation, generation);
  assert.equal(result.generationTask, generationTask);

  assert.equal(receivedInput.userId, userId);
  assert.equal(receivedInput.campaign, campaign);
  assert.equal(receivedInput.mediaType, "video");
  assert.equal(
    receivedInput.provider.providerName,
    "runway"
  );
});
