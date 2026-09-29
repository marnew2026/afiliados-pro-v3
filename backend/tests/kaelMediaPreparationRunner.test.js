import test from "node:test";
import assert from "node:assert/strict";

import {
  runKaelMediaPreparation,
} from "../services/media/KaelMediaPreparationRunner.js";

test("KAEL compoe provider configurado antes de preparar midia", async () => {
  let resolvedProviderName = null;
  let preparationInput = null;

  const provider = {
    providerName: "runway",
  };

  const content = {
    contentType: "short_video",
    media: {
      type: "video",
      assetUrl: "",
    },
  };

  const result = await runKaelMediaPreparation({
    userId: "user-test",
    campaign: {
      _id: "campaign-test",
    },
    content,
    providerNameGetter: () => "runway",
    providerResolver: async ({ provider: providerName }) => {
      resolvedProviderName = providerName;
      return provider;
    },
    mediaPreparer: async (input) => {
      preparationInput = input;

      return {
        status: "PENDING",
        content,
        reason: "media_generation_started",
      };
    },
  });

  assert.equal(resolvedProviderName, "runway");
  assert.equal(preparationInput.userId, "user-test");
  assert.equal(
    preparationInput.campaign._id,
    "campaign-test"
  );
  assert.equal(preparationInput.content, content);
  assert.equal(preparationInput.provider, provider);
  assert.equal(result.status, "PENDING");
});
