import test from "node:test";
import assert from "node:assert/strict";

import {
  isKwaiEnabled,
  publishKwai,
} from "../services/distribution/KwaiAdapter.js";

const validInput = {
  credential: "credential-1",
  destinationId: "kwai-user-1",
  content: {
    channel: "kwai",
    contentType: "short_video",
    caption: "Oferta especial",
    hashtags: ["oferta"],
    cta: "Confira agora",
    trackingUrl: "https://example.test/r/oferta",
    media: {
      assetUrl: "https://cdn.example.test/video.mp4",
    },
  },
};

test("Kwai fica desativado por padrao", async () => {
  assert.equal(isKwaiEnabled({}), false);

  await assert.rejects(
    publishKwai({ ...validInput, env: {} }),
    (error) => error.statusCode === 503 && /desativada/.test(error.message)
  );
});

test("Kwai nao publica sem cliente oficial configurado", async () => {
  await assert.rejects(
    publishKwai({
      ...validInput,
      env: { KWAI_ENABLED: "true" },
    }),
    (error) => error.statusCode === 503 && /Cliente oficial/.test(error.message)
  );
});

test("adapter delega ao cliente aprovado quando explicitamente habilitado", async () => {
  let received;
  const result = await publishKwai({
    ...validInput,
    env: { KWAI_ENABLED: "true" },
    providerClient: {
      async publishVideo(input) {
        received = input;
        return { success: true, externalId: "kwai-video-1" };
      },
    },
  });

  assert.equal(received.assetUrl, "https://cdn.example.test/video.mp4");
  assert.equal(received.destinationId, "kwai-user-1");
  assert.equal(result.externalId, "kwai-video-1");
  assert.equal(result.distributionStatus, "published");
});
