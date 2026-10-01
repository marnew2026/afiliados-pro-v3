import test from "node:test";
import assert from "node:assert/strict";
import { runKaelAutopilotScheduler } from "../services/autopilot/KaelAutopilotScheduler.js";
import { buildKaelDistributionContent } from "../services/distribution/KaelDistributionContentBuilder.js";
import { runKaelDistribution } from "../services/distribution/KaelDistributionRunner.js";
const settingsModel = (rows, capture) => ({ find(filter) {
  capture(filter);
  return { select() { return this; }, limit() { return this; }, lean: async () => rows };
} });
test("scheduler padrao executa apenas Telegram", async () => {
  const calls = [];
  await runKaelAutopilotScheduler({ env: {},
    settingsModel: settingsModel([{ userId: "user", channels: ["telegram", "instagram"] }], (f) => assert.equal(f.channels, "telegram")),
    runner: async (user, { channel }) => { calls.push(channel); return { skipped: true }; },
  });
  assert.deepEqual(calls, ["telegram"]);
});
test("scheduler habilitado isola falha de rede e deduplica canais", async () => {
  const calls = [];
  await runKaelAutopilotScheduler({ env: { KAEL_VIDEO_AUTOPILOT_ENABLED: "true" },
    settingsModel: settingsModel([{ userId: "user", channels: ["instagram", "facebook", "facebook"] }], (f) => assert.ok(f.channels.$in.includes("instagram"))),
    runner: async (user, { channel }) => { calls.push(channel); if (channel === "instagram") throw new Error("falha de rede"); return { skipped: true }; },
  });
  assert.deepEqual(calls, ["instagram", "facebook"]);
});
test("scheduler impede ciclos sobrepostos", async () => {
  let release;
  let consulted = false;
  const first = runKaelAutopilotScheduler({ env: {}, settingsModel: settingsModel([], () => {}),
    runner: async () => {},
  });
  await first;
  const blocking = { find() { return { select() { return this; }, limit() { return this; }, lean: () => new Promise((resolve) => { release = () => resolve([]); }) }; } };
  const cycle = runKaelAutopilotScheduler({ settingsModel: blocking });
  await runKaelAutopilotScheduler({ settingsModel: { find() { consulted = true; throw new Error("overlap"); } } });
  assert.equal(consulted, false); release(); await cycle;
});
test("content builder preserva identidade do video pronto", async () => {
  const result = await buildKaelDistributionContent({ userId: "user", campaign: { _id: "campaign" }, channel: "instagram",
    contentEngine: () => ({ contentType: "short_video" }),
    mediaResolver: async () => ({ contentType: "short_video", mediaAssetId: "asset", media: { type: "video", assetUrl: "https://example.test/video.mp4" } }),
  });
  assert.equal(result.mediaAssetId, "asset"); assert.equal(result.channel, "instagram");
});
test("runner encaminha rechecagem ao executor", async () => {
  const beforeCreate = async () => false;
  const result = await runKaelDistribution({ beforeCreate, executor: async (input) => {
    assert.equal(input.beforeCreate, beforeCreate); return input.beforeCreate();
  } });
  assert.equal(result, false);
});
