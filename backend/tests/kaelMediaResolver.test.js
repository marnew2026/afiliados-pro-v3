import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveKaelMedia,
} from "../services/media/KaelMediaResolver.js";

test("KAEL nao busca MediaAsset quando conteudo nao exige video", async () => {
  const content = {
    contentType: "text",
    text: "Oferta de teste",
    media: {},
  };

  const result = await resolveKaelMedia({
    userId: "user-test",
    campaignId: "campaign-test",
    content,
  });

  assert.equal(result, content);
});
test("KAEL mantem video sem assetUrl quando nao existe MediaAsset pronto", async () => {
  let finderInput = null;

  const content = {
    contentType: "short_video",
    caption: "Produto de teste",
    media: {
      type: "video",
      assetUrl: "",
    },
  };

  const result = await resolveKaelMedia({
    userId: "user-test",
    campaignId: "campaign-test",
    content,
    mediaAssetFinder: async (input) => {
      finderInput = input;
      return null;
    },
  });

  assert.equal(result.contentType, "short_video");
  assert.equal(result.media.type, "video");
  assert.equal(result.media.assetUrl, "");
  assert.equal(finderInput.userId, "user-test");
  assert.equal(finderInput.campaignId, "campaign-test");
});
test("KAEL preserva identidade do MediaAsset quando video pronto existe", async () => {
  const mediaAsset = {
    _id: "media-asset-test",
    assetUrl: "https://example.test/video.mp4",
  };

  const result = await resolveKaelMedia({
    userId: "user-test",
    campaignId: "campaign-test",
    content: {
      contentType: "short_video",
      caption: "Produto de teste",
      media: {
        type: "video",
        assetUrl: "",
      },
    },
    mediaAssetFinder: async () => mediaAsset,
  });

  assert.equal(
    result.media.assetUrl,
    "https://example.test/video.mp4"
  );
  assert.equal(
    result.mediaAssetId,
    "media-asset-test"
  );
});

