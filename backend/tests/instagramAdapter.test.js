import test from "node:test";
import assert from "node:assert/strict";

import {
  parseInstagramCredential,
} from "../services/connections/InstagramConnectionService.js";

import {
  publishInstagram,
} from "../services/distribution/InstagramAdapter.js";

test(
  "credencial do Instagram e interpretada depois de uma unica descriptografia",
  () => {
    assert.deepEqual(
      parseInstagramCredential(
        JSON.stringify({
          accessToken: "token-1",
          instagramUserId: "ig-1",
        })
      ),
      {
        accessToken: "token-1",
        instagramUserId: "ig-1",
      }
    );
  }
);

test(
  "publica Reel somente depois do container ficar FINISHED",
  async () => {
    const calls = [];
    let statusCalls = 0;

    const httpClient = {
      post: async (url, body, config) => {
        calls.push(["POST", url, body, config.params]);

        if (url.endsWith("/media")) {
          return { data: { id: "container-1" } };
        }

        if (url.endsWith("/media_publish")) {
          return { data: { id: "reel-1" } };
        }

        throw new Error(`POST inesperado: ${url}`);
      },
      get: async (url, config) => {
        calls.push(["GET", url, config.params]);
        statusCalls += 1;

        return {
          data: {
            status_code:
              statusCalls === 1
                ? "IN_PROGRESS"
                : "FINISHED",
          },
        };
      },
    };

    const result = await publishInstagram({
      credential: JSON.stringify({
        accessToken: "token-1",
        instagramUserId: "ig-1",
      }),
      destinationId: "ig-1",
      content: {
        channel: "instagram",
        contentType: "short_video",
        caption: "Oferta especial",
        cta: "Confira agora",
        trackingUrl: "https://example.test/r/oferta",
        hashtags: ["oferta", "#afiliados"],
        media: {
          assetUrl: "https://cdn.example.test/video.mp4",
        },
      },
      apiVersion: "v99.0",
      httpClient,
      pollIntervalMs: 0,
      sleep: async () => {},
    });

    assert.equal(result.success, true);
    assert.equal(result.containerId, "container-1");
    assert.equal(result.externalId, "reel-1");
    assert.equal(statusCalls, 2);

    assert.deepEqual(
      calls.map((call) => [call[0], call[1]]),
      [
        [
          "POST",
          "https://graph.instagram.com/v99.0/ig-1/media",
        ],
        [
          "GET",
          "https://graph.instagram.com/v99.0/container-1",
        ],
        [
          "GET",
          "https://graph.instagram.com/v99.0/container-1",
        ],
        [
          "POST",
          "https://graph.instagram.com/v99.0/ig-1/media_publish",
        ],
      ]
    );

    const createParams = calls[0][3];
    assert.equal(createParams.media_type, "REELS");
    assert.equal(createParams.video_url,
      "https://cdn.example.test/video.mp4");
    assert.equal(createParams.share_to_feed, true);
    assert.match(createParams.caption, /#oferta #afiliados/);
  }
);
