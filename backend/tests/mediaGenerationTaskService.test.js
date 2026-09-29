import test from "node:test";
import assert from "node:assert/strict";

import {
  findRecoverableGenerationUserIds,
} from "../services/media/generation/MediaGenerationTaskService.js";

test("KAEL descobre usuarios com geracoes recuperaveis", async () => {
  let receivedPipeline = null;

  const taskModel = {
    aggregate: async (pipeline) => {
      receivedPipeline = pipeline;

      return [
        {
          _id: "user-1",
        },
        {
          _id: "user-2",
        },
      ];
    },
  };

  const staleBefore =
    new Date("2026-09-29T20:00:00.000Z");

  const userIds =
    await findRecoverableGenerationUserIds({
      staleBefore,
      limit: 20,
      taskModel,
    });

  assert.deepEqual(userIds, [
    "user-1",
    "user-2",
  ]);

  assert.deepEqual(receivedPipeline, [
    {
      $match: {
        mediaAssetId: null,
        externalTaskId: {
          $type: "string",
          $ne: "",
        },
        $or: [
          {
            status: {
              $in: ["PENDING", "RUNNING"],
            },
          },
          {
            status: "PROCESSING",
            processingStartedAt: {
              $lt: staleBefore,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$userId",
      },
    },
    {
      $limit: 20,
    },
  ]);
});
