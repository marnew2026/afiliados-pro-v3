import test from "node:test";
import assert from "node:assert/strict";

import {
  runKaelMediaPreparation,
} from "../services/media/KaelMediaPreparationRunner.js";

test("KAEL delega resolucao lazy do provider para preparacao de midia", async () => {
  let providerGetterCalled = false;
  let providerResolverCalled = false;
  let preparationInput = null;

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
    providerNameGetter: () => {
      providerGetterCalled = true;
      return "runway";
    },
    providerResolver: async () => {
      providerResolverCalled = true;

      return {
        providerName: "runway",
      };
    },
    mediaPreparer: async (input) => {
      preparationInput = input;

      return {
        status: "READY",
        content,
        reason: "media_asset_ready",
      };
    },
  });

  assert.equal(providerGetterCalled, false);
  assert.equal(providerResolverCalled, false);

  assert.equal(preparationInput.userId, "user-test");
  assert.equal(
    preparationInput.campaign._id,
    "campaign-test"
  );
  assert.equal(preparationInput.content, content);
  assert.equal(
    typeof preparationInput.providerResolver,
    "function"
  );

  assert.equal(result.status, "READY");
});
