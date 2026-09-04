import test from "node:test";
import assert from "node:assert/strict";

import {
  retrieveKaelMediaGeneration,
} from "../services/media/generation/KaelMediaGenerationRetrieveService.js";

test(
  "recupera PROCESSING stale e conclui a mesma task e o mesmo MediaAsset",
  async () => {
    const staleTask = {
      _id: "task-1",
      userId: "user-stale",
      campaignId: "campaign-stale",
      externalTaskId: "runway-1",
      status: "PROCESSING",
    };

    const reclaimedTask = {
      ...staleTask,
      userId: "user-1",
      campaignId: "campaign-1",
      processingStartedAt: new Date(),
    };

    const calls = [];

    const result = await retrieveKaelMediaGeneration({
      generationTask: staleTask,
      provider: {
        retrieveGeneration: async ({ externalTaskId }) => {
          calls.push(["provider", externalTaskId]);

          return {
            status: "SUCCEEDED",
            generationResult: {
              provider: "runway",
              externalTaskId,
              mediaType: "video",
              sourceUrl: "https://example.test/video.mp4",
              extension: "mp4",
              contentType: "video/mp4",
            },
          };
        },
      },
      leaseCutoffResolver: () =>
        new Date("2026-09-04T12:00:00.000Z"),
      taskReclaimer: async ({ taskId, staleBefore }) => {
        calls.push(["reclaim", taskId, staleBefore.toISOString()]);
        return reclaimedTask;
      },
      taskClaimer: async () => {
        throw new Error("taskClaimer nao deve rodar apos reclaim");
      },
      mediaProcessor: async (input) => {
        calls.push([
          "media",
          input.userId,
          input.campaignId,
          input.generationTaskId,
        ]);

        return {
          mediaAsset: {
            _id: "asset-1",
            generationTaskId: input.generationTaskId,
            status: "ready",
            assetUrl: "https://cdn.example.test/task-1.mp4",
          },
        };
      },
      taskSucceededMarker: async ({ taskId, mediaAssetId }) => {
        calls.push(["succeeded", taskId, mediaAssetId]);

        return {
          ...reclaimedTask,
          status: "SUCCEEDED",
          mediaAssetId,
          processingStartedAt: null,
        };
      },
    });

    assert.equal(result.status, "SUCCEEDED");
    assert.equal(result.mediaAsset._id, "asset-1");
    assert.equal(result.mediaAsset.generationTaskId, "task-1");
    assert.equal(result.generationTask.status, "SUCCEEDED");
    assert.equal(result.generationTask.mediaAssetId, "asset-1");

    assert.deepEqual(calls, [
      ["reclaim", "task-1", "2026-09-04T12:00:00.000Z"],
      ["provider", "runway-1"],
      ["media", "user-1", "campaign-1", "task-1"],
      ["succeeded", "task-1", "asset-1"],
    ]);
  }
);
