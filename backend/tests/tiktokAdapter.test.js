import test from "node:test";
import assert from "node:assert/strict";
import { publishTikTok } from "../services/distribution/TikTokAdapter.js";

test("publica video privado do TikTok por FILE_UPLOAD e confirma status", async () => {
  const calls = [];
  const video = Buffer.from("video-test");
  const httpClient = {
    async get(url) {
      calls.push({ method: "get", url });
      return { data: video };
    },
    async post(url, body, config) {
      calls.push({ method: "post", url, body, config });
      if (url.endsWith("/creator_info/query/")) {
        return { data: { data: { privacy_level_options: ["SELF_ONLY"] }, error: { code: "ok" } } };
      }
      if (url.endsWith("/video/init/")) {
        return { data: { data: { publish_id: "pub-1", upload_url: "https://upload.example/video" }, error: { code: "ok" } } };
      }
      return { data: { data: { status: "PUBLISH_COMPLETE", publicaly_available_post_id: [] }, error: { code: "ok" } } };
    },
    async put(url, body, config) {
      calls.push({ method: "put", url, body, config });
      return { status: 201 };
    },
  };
  const result = await publishTikTok({
    credential: JSON.stringify({ accessToken: "token", refreshToken: "refresh", openId: "open-1" }),
    destinationId: "open-1",
    content: {
      channel: "tiktok", contentType: "short_video", caption: "Oferta",
      hashtags: ["achado"], trackingUrl: "https://example/r/1",
      media: { assetUrl: "https://cdn.example/video.mp4" },
    },
    httpClient,
    pollIntervalMs: 0,
  });
  assert.equal(result.success, true);
  assert.equal(result.externalId, "pub-1");
  const init = calls.find((call) => call.url?.endsWith("/video/init/"));
  assert.equal(init.body.post_info.privacy_level, "SELF_ONLY");
  assert.equal(init.body.post_info.brand_content_toggle, true);
  assert.equal(init.body.source_info.source, "FILE_UPLOAD");
  const upload = calls.find((call) => call.method === "put");
  assert.equal(upload.config.headers["Content-Range"], `bytes 0-${video.length - 1}/${video.length}`);
});

test("bloqueia publicacao quando destino difere da credencial", async () => {
  await assert.rejects(publishTikTok({
    credential: JSON.stringify({ accessToken: "token", refreshToken: "refresh", openId: "open-1" }),
    destinationId: "open-2",
    content: { channel: "tiktok", contentType: "short_video", caption: "Teste", media: { assetUrl: "https://cdn.example/video.mp4" } },
  }), /Destino nao corresponde/);
});

test("identifica a etapa e o erro seguro quando TikTok responde 403", async () => {
  const httpClient = {
    async post() {
      const error = new Error("Request failed with status code 403");
      error.response = {
        status: 403,
        data: {
          error: {
            code: "scope_not_authorized",
            message: "The requested scope is not authorized",
            log_id: "safe-log-id",
          },
        },
      };
      throw error;
    },
  };

  await assert.rejects(publishTikTok({
    credential: JSON.stringify({ accessToken: "token", refreshToken: "refresh", openId: "open-1" }),
    destinationId: "open-1",
    content: {
      channel: "tiktok",
      contentType: "short_video",
      caption: "Teste",
      media: { assetUrl: "https://cdn.example/video.mp4" },
    },
    httpClient,
  }), /consulta do criador: HTTP 403, code scope_not_authorized, message The requested scope is not authorized, log_id safe-log-id/);
});
