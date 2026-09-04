import test from "node:test";
import assert from "node:assert/strict";

import {
  runKaelMediaGenerationRecoveryOnce,
} from "../services/media/generation/KaelMediaGenerationRecoveryService.js";

test(
  "recovery run-once processa sequencialmente com limite e isolamento",
  async () => {
    const calls = [];
    let activeRetrievals = 0;

    const result = await runKaelMediaGenerationRecoveryOnce({
      userId: "user-1",
      limit: 3,
      leaseCutoffResolver: () =>
        new Date("2026-09-05T10:00:00.000Z"),
      taskFinder: async (input) => {
        calls.push(["find", input.userId, input.limit]);
        return [
          { _id: "task-1", provider: "runway" },
          { _id: "task-2", provider: "runway" },
          { _id: "task-3", provider: "runway" },
        ];
      },
      providerResolver: async ({ provider }) => ({
        providerName: provider,
      }),
      generationRetriever: async ({ generationTask }) => {
        activeRetrievals += 1;
        assert.equal(activeRetrievals, 1);
        calls.push(["retrieve", generationTask._id]);

        try {
          if (generationTask._id === "task-2") {
            throw new Error("CONTROLLED_RECOVERY_FAILURE");
          }

          if (generationTask._id === "task-3") {
            return {
              status: "RUNNING",
              mediaAsset: null,
            };
          }

          return {
            status: "SUCCEEDED",
            mediaAsset: { _id: "asset-1" },
          };
        } finally {
          activeRetrievals -= 1;
        }
      },
      logger: {
        info: () => {},
        error: () => {},
      },
    });

    assert.deepEqual(calls, [
      ["find", "user-1", 3],
      ["retrieve", "task-1"],
      ["retrieve", "task-2"],
      ["retrieve", "task-3"],
    ]);

    assert.equal(result.mode, "run-once");
    assert.equal(result.scanned, 3);
    assert.equal(result.succeeded, 1);
    assert.equal(result.active, 1);
    assert.equal(result.errors, 1);
    assert.equal(result.results[0].mediaAssetId, "asset-1");
    assert.equal(
      result.results[1].reason,
      "media_generation_recovery_failed"
    );
  }
);

test(
  "recovery run-once rejeita limite acima do teto seguro",
  async () => {
    await assert.rejects(
      runKaelMediaGenerationRecoveryOnce({
        userId: "user-1",
        limit: 6,
      }),
      /entre 1 e 5/
    );
  }
);
