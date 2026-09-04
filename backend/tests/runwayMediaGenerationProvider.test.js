import test from "node:test";
import assert from "node:assert/strict";

import {
  RunwayMediaGenerationProvider,
} from "../services/media/generation/runway/RunwayMediaGenerationProvider.js";

test(
  "inicia video vertical com o cliente injetado sem polling pago",
  async () => {
    const calls = [];

    const provider = new RunwayMediaGenerationProvider({
      apiSecret: "test-secret",
      client: {
        imageToVideo: {
          create: async (input) => {
            calls.push(input);
            return { id: "runway-task-1" };
          },
        },
      },
    });

    const result = await provider.startGeneration({
      campaign: {
        _id: "campaign-1",
        name: "Campanha teste",
      },
      content: {
        caption: "Video vertical da oferta",
      },
      mediaType: "video",
    });

    assert.deepEqual(calls, [
      {
        model: "gen4.5",
        promptText: "Video vertical da oferta",
        ratio: "768:1280",
      },
    ]);

    assert.deepEqual(result, {
      provider: "runway",
      externalTaskId: "runway-task-1",
      mediaType: "video",
      status: "PENDING",
    });
  }
);

test(
  "recupera resultado concluido pelo mesmo cliente",
  async () => {
    const provider = new RunwayMediaGenerationProvider({
      apiSecret: "test-secret",
      client: {
        tasks: {
          retrieve: async (taskId) => ({
            id: taskId,
            status: "SUCCEEDED",
            output: ["https://cdn.example.test/video.mp4"],
          }),
        },
      },
    });

    const result = await provider.retrieveGeneration({
      externalTaskId: "runway-task-1",
    });

    assert.equal(result.status, "SUCCEEDED");
    assert.equal(
      result.generationResult.externalTaskId,
      "runway-task-1"
    );
    assert.equal(
      result.generationResult.sourceUrl,
      "https://cdn.example.test/video.mp4"
    );
  }
);
