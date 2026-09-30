import test from "node:test";
import assert from "node:assert/strict";

import {
  prepareKaelMedia,
} from "../services/media/KaelMediaPreparationService.js";

test("KAEL nao prepara midia quando conteudo nao exige video", async () => {
  let resolverCalled = false;
  let generationCalled = false;

  const content = {
    contentType: "text",
    text: "Oferta de teste",
    media: {},
  };

  const result = await prepareKaelMedia({
    userId: "user-test",
    campaign: {
      _id: "campaign-test",
    },
    content,
    mediaResolver: async () => {
      resolverCalled = true;
      throw new Error(
        "Resolver nao deveria ser chamado."
      );
    },
    generationEnsurer: async () => {
      generationCalled = true;
      throw new Error(
        "Geracao nao deveria ser chamada."
      );
    },
  });

  assert.equal(result.status, "READY");
  assert.equal(result.content, content);
  assert.equal(result.reason, "media_not_required");
  assert.equal(resolverCalled, false);
  assert.equal(generationCalled, false);
});
test("KAEL reutiliza video pronto sem iniciar geracao", async () => {
  let generationCalled = false;

  const resolvedContent = {
    contentType: "short_video",
    caption: "Produto de teste",
    media: {
      type: "video",
      assetUrl: "https://example.test/video.mp4",
    },
  };

  const result = await prepareKaelMedia({
    userId: "user-test",
    campaign: {
      _id: "campaign-test",
    },
    content: {
      contentType: "short_video",
      caption: "Produto de teste",
      media: {
        type: "video",
        assetUrl: "",
      },
    },
    mediaResolver: async () => resolvedContent,
    generationEnsurer: async () => {
      generationCalled = true;
      throw new Error(
        "Geracao nao deveria ser chamada."
      );
    },
  });

  assert.equal(result.status, "READY");
  assert.equal(result.content, resolvedContent);
  assert.equal(result.reason, "media_asset_ready");
  assert.equal(generationCalled, false);
});
test("KAEL inicia geracao quando short_video nao possui video pronto", async () => {
  let generationInput = null;

  const unresolvedContent = {
    contentType: "short_video",
    caption: "Produto de teste",
    media: {
      type: "video",
      assetUrl: "",
    },
  };

  const generationTask = {
    _id: "generation-task-test",
  };

  const result = await prepareKaelMedia({
    userId: "user-test",
    campaign: {
      _id: "campaign-test",
    },
    content: unresolvedContent,
    mediaResolver: async () => unresolvedContent,
    generationEnsurer: async (input) => {
      generationInput = input;

      return {
        status: "STARTED",
        generation: {
          provider: "runway",
          externalTaskId: "runway-task-test",
        },
        generationTask,
      };
    },
    providerResolver: async () => ({
      providerName: "runway",
    }),
  });

  assert.equal(result.status, "PENDING");
  assert.equal(result.content, unresolvedContent);
  assert.equal(result.reason, "media_generation_started");
  assert.equal(result.generationTask, generationTask);

  assert.equal(generationInput.userId, "user-test");
  assert.equal(
    generationInput.campaign._id,
    "campaign-test"
  );
  assert.equal(generationInput.content, unresolvedContent);
  assert.equal(
    generationInput.provider.providerName,
    "runway"
  );
});
