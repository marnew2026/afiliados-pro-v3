import test from "node:test";
import assert from "node:assert/strict";

import {
  uploadManualVideo,
} from "../services/media/ManualVideoUploadService.js";

test("envia MP4 somente para campanha ativa do proprio usuario", async () => {
  const searches = [];
  const campaignModel = {
    async findOne(filter) {
      searches.push(filter);
      return { _id: "campaign-1", active: true };
    },
  };

  let uploadInput;
  const uploader = async (input) => {
    uploadInput = input;
    return {
      _id: "asset-1",
      campaignId: "campaign-1",
      status: "ready",
      assetUrl: "https://cdn.example/video.mp4",
    };
  };

  const body = Buffer.from("fake-mp4");
  const result = await uploadManualVideo({
    userId: "user-1",
    campaignId: "campaign-1",
    body,
    campaignModel,
    uploader,
  });

  assert.deepEqual(searches[0], {
    _id: "campaign-1",
    userId: "user-1",
    active: true,
  });
  assert.equal(uploadInput.type, "video");
  assert.equal(uploadInput.source, "upload");
  assert.equal(uploadInput.extension, "mp4");
  assert.equal(uploadInput.contentType, "video/mp4");
  assert.equal(uploadInput.body, body);
  assert.equal(result.status, "ready");
});

test("bloqueia upload quando a campanha nao pertence ao usuario", async () => {
  let uploaded = false;

  await assert.rejects(
    uploadManualVideo({
      userId: "user-1",
      campaignId: "campaign-de-outro-usuario",
      body: Buffer.from("fake-mp4"),
      campaignModel: { async findOne() { return null; } },
      uploader: async () => { uploaded = true; },
    }),
    (error) => error.statusCode === 404
  );

  assert.equal(uploaded, false);
});

test("rejeita corpo vazio antes de consultar a campanha", async () => {
  let searched = false;

  await assert.rejects(
    uploadManualVideo({
      userId: "user-1",
      campaignId: "campaign-1",
      body: Buffer.alloc(0),
      campaignModel: { async findOne() { searched = true; } },
    }),
    (error) => error.statusCode === 400
  );

  assert.equal(searched, false);
});

