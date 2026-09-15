import test from "node:test";
import assert from "node:assert/strict";

import { publishFacebook } from "../services/distribution/FacebookAdapter.js";

test("publica Reel do Facebook pelo fluxo start upload finish", async () => {
  const calls = [];
  const httpClient = {
    post: async (url, body, config) => {
      calls.push({ url, body, config });

      if (config.params?.upload_phase === "start") {
        return {
          data: {
            video_id: "video-1",
            upload_url: "https://rupload.facebook.com/video-upload",
          },
        };
      }

      if (url === "https://rupload.facebook.com/video-upload") {
        return { data: { success: true } };
      }

      if (config.params?.upload_phase === "finish") {
        return { data: { success: true, video_id: "video-1" } };
      }

      throw new Error(`POST inesperado: ${url}`);
    },
  };

  const result = await publishFacebook({
    credential: JSON.stringify({
      pageAccessToken: "page-token-1",
      pageId: "page-1",
    }),
    destinationId: "page-1",
    content: {
      channel: "facebook",
      contentType: "short_video",
      caption: "Oferta especial",
      cta: "Confira agora",
      trackingUrl: "https://example.test/r/oferta",
      hashtags: ["oferta", "#afiliados"],
      media: { assetUrl: "https://cdn.example.test/video.mp4" },
    },
    apiVersion: "v99.0",
    httpClient,
  });

  assert.equal(result.success, true);
  assert.equal(result.externalId, "video-1");
  assert.equal(calls.length, 3);
  assert.equal(calls[0].config.params.upload_phase, "start");
  assert.equal(calls[1].config.headers.Authorization, "OAuth page-token-1");
  assert.equal(
    calls[1].config.headers.file_url,
    "https://cdn.example.test/video.mp4"
  );
  assert.equal(calls[2].config.params.upload_phase, "finish");
  assert.equal(calls[2].config.params.video_state, "PUBLISHED");
  assert.match(calls[2].config.params.description, /#oferta #afiliados/);
});

test("bloqueia publicacao quando destino difere da credencial", async () => {
  await assert.rejects(
    publishFacebook({
      credential: JSON.stringify({
        pageAccessToken: "page-token-1",
        pageId: "page-1",
      }),
      destinationId: "page-2",
      content: {
        channel: "facebook",
        contentType: "short_video",
        caption: "Teste",
        media: { assetUrl: "https://cdn.example.test/video.mp4" },
      },
      apiVersion: "v99.0",
    }),
    /Destino nao corresponde/
  );
});
