import test from "node:test";
import assert from "node:assert/strict";
import { runKaelVideoAutopilotOnce, assertVideoAutopilotAllowed } from "../services/autopilot/KaelVideoAutopilotService.js";
import { executeKaelDistribution } from "../services/distribution/KaelDistributionExecutor.js";

function fixture(o = {}) {
  const settings = { _id: "settings", enabled: true, mode: "automatico", channels: ["instagram"], dailyLimit: 2, minIntervalMinutes: 180, ...o.settings };
  const calls = { creates: 0, schedules: 0, updates: [], queries: [] };
  const q = (value) => ({ lean: async () => value, sort() { return this; }, select() { return this; } });
  const deps = {
    channel: "instagram", gate: () => true, now: () => new Date("2026-10-01T14:00:00Z"), tokenFactory: () => "lock",
    settingsModel: {
      findOne: () => q(settings), findOneAndUpdate: async () => o.locked ? null : settings,
      exists: async (f) => { calls.recheck = f; return !o.changed; },
      updateOne: async (filter, update) => calls.updates.push({ filter, update }),
    },
    connectionModel: { findOne: () => q(o.noConnection ? null : {}), exists: async () => !o.disconnected },
    campaignModel: { findOne: (f) => { calls.queries.push(f); return q(o.noCampaign ? null : { _id: "campaign", nome: "Produto" }); }, exists: async () => !o.archived },
    distributionModel: { countDocuments: async () => o.dailyCount || 0, exists: async () => o.inflight || false, findOne: () => q(o.last || null) },
    contentBuilder: async () => ({ contentType: "short_video", mediaAssetId: "asset", caption: "Oferta" }),
    runner: (input) => executeKaelDistribution({ ...input,
      mediaPreparer: async () => { if (o.onPrepare) o.onPrepare(deps); return { status: o.pending ? "PENDING" : "READY", content: input.content }; },
      distributionCreator: async ({ source, scheduler, ...rest }) => {
        assert.equal(source, "autopilot"); assert.equal(Object.hasOwn(rest, "review"), false); calls.creates++;
        return { distribution: { _id: "distribution" }, queue: await scheduler({}) };
      },
      scheduler: async () => { calls.schedules++; if (o.queueError) throw new Error("queue unavailable"); return { jobId: "job" }; },
    }),
  };
  return { deps, calls };
}
for (const [name, options, reason] of [
  ["desligado", { settings: { enabled: false } }, "autopilot_disabled"],
  ["assistido", { settings: { mode: "assistido" } }, "autopilot_not_automatic"],
  ["canal ausente", { settings: { channels: ["telegram"] } }, "channel_not_enabled"],
  ["lock", { locked: true }, "autopilot_locked"],
  ["conexao", { noConnection: true }, "channel_connection_not_found"],
  ["limite", { dailyCount: 2 }, "daily_limit_reached"],
  ["duplicacao", { inflight: true }, "distribution_in_progress"],
  ["cooldown", { last: { publishedAt: "2026-10-01T13:00:00Z" } }, "cooldown_active"],
  ["campanha", { noCampaign: true }, "campaign_not_found"],
  ["limite invalido", { settings: { dailyLimit: 0 } }, "invalid_autopilot_limits"],
]) test(`video bloqueia ${name}`, async () => {
  const { deps, calls } = fixture(options);
  assert.equal((await runKaelVideoAutopilotOnce("user", deps)).reason, reason);
  assert.equal(calls.creates, 0); assert.equal(calls.schedules, 0);
});

test("PENDING preserva campanha e libera lock sem publicar", async () => {
  const { deps, calls } = fixture({ pending: true });
  assert.equal((await runKaelVideoAutopilotOnce("user", deps)).reason, "media_pending");
  assert.equal(calls.creates, 0); assert.equal(calls.schedules, 0);
  assert.equal(calls.updates[0].update.$set["videoPendingCampaigns.instagram"], "campaign");
  assert.deepEqual(calls.updates.at(-1), { filter: { _id: "settings", runLockToken: "lock" }, update: { $set: { runLockedUntil: null, runLockToken: null } } });
});
test("READY revalida estado e agenda uma Distribution", async () => {
  const { deps, calls } = fixture();
  assert.equal((await runKaelVideoAutopilotOnce("user", deps)).queueJobId, "job");
  assert.equal(calls.creates, 1); assert.equal(calls.schedules, 1);
  assert.equal(calls.recheck.runLockToken, "lock"); assert.equal(calls.recheck.dailyLimit, 2);
  assert.deepEqual(calls.recheck.runLockedUntil, { $gt: deps.now() });
  assert.equal(calls.updates[0].update.$unset["videoPendingCampaigns.instagram"], "");
});
for (const option of ["changed", "archived", "disconnected"]) test(`rechecagem bloqueia ${option}`, async () => {
  const { deps, calls } = fixture({ [option]: true });
  assert.equal((await runKaelVideoAutopilotOnce("user", deps)).reason, "autopilot_state_changed");
  assert.equal(calls.creates, 0); assert.equal(calls.schedules, 0);
  assert.equal(calls.updates.at(-1).update.$set.runLockToken, null);
});
test("kill switch alterado durante preparacao bloqueia", async () => {
  let enabled = true;
  const { deps, calls } = fixture({ onPrepare: () => { enabled = false; } });
  deps.gate = () => enabled;
  assert.equal((await runKaelVideoAutopilotOnce("user", deps)).reason, "autopilot_state_changed");
  assert.equal(calls.creates, 0);
});
test("erro na fila libera lock", async () => {
  const { deps, calls } = fixture({ queueError: true });
  await assert.rejects(runKaelVideoAutopilotOnce("user", deps), /queue unavailable/);
  assert.equal(calls.updates.at(-1).update.$set.runLockToken, null);
});
test("retoma campanha pendente", async () => {
  const { deps, calls } = fixture({ settings: { videoPendingCampaigns: new Map([["instagram", "pending-campaign"]]) } });
  await runKaelVideoAutopilotOnce("user", deps); assert.equal(calls.queries[0]._id, "pending-campaign");
});
function env(extra = {}) {
  return { KAEL_VIDEO_AUTOPILOT_ENABLED: "true", KAEL_VIDEO_AUTOPILOT_ENV: "staging", INSTAGRAM_ENABLED: "true", INSTAGRAM_API_APPROVAL_STATUS: "approved", INSTAGRAM_APP_ID: "id", INSTAGRAM_APP_SECRET: "secret", INSTAGRAM_REDIRECT_URI: "https://example.test/callback", JWT_SECRET: "jwt", CHANNEL_CREDENTIAL_KEY: "a".repeat(64), ...extra };
}
test("rollout bloqueado por padrao e ambiente explicito", () => {
  assert.equal(assertVideoAutopilotAllowed("instagram", {}), false);
  assert.equal(assertVideoAutopilotAllowed("instagram", env({ KAEL_VIDEO_AUTOPILOT_ENV: "" })), false);
  assert.equal(assertVideoAutopilotAllowed("instagram", env()), true);
});
test("producao exige tested e released mesmo com flag staging", () => {
  assert.equal(assertVideoAutopilotAllowed("instagram", env({ NODE_ENV: "production" })), false);
  assert.equal(assertVideoAutopilotAllowed("instagram", env({ NODE_ENV: "production", INSTAGRAM_STAGING_TESTED: "true", INSTAGRAM_PRODUCTION_RELEASED: "true" })), true);
});
test("review nao substitui aprovacao normal e emergencia bloqueia", () => {
  assert.throws(() => assertVideoAutopilotAllowed("instagram", env({ INSTAGRAM_API_APPROVAL_STATUS: "pending", INSTAGRAM_REVIEW_ENABLED: "true", INSTAGRAM_REVIEW_ENV: "staging" })), /aprovacao/);
  assert.throws(() => assertVideoAutopilotAllowed("instagram", env({ INSTAGRAM_EMERGENCY_DISABLED: "true" })), /emergencial/);
});
test("bloqueio operacional ocorre antes de consultar banco", async () => {
  assert.equal((await runKaelVideoAutopilotOnce("user", { channel: "instagram", env: {}, settingsModel: { findOne() { assert.fail("Banco consultado"); } } })).reason, "video_autopilot_blocked");
});

for (const channel of ["instagram", "facebook", "tiktok", "kwai"]) {
  test(`ciclo READY encaminha canal ${channel} ao executor`, async () => {
    const { deps, calls } = fixture({ settings: { channels: [channel] } });
    deps.channel = channel;
    const runner = deps.runner;
    deps.runner = (input) => { assert.equal(input.channel, channel); return runner(input); };
    assert.equal((await runKaelVideoAutopilotOnce("user", deps)).channel, channel);
    assert.equal(calls.creates, 1);
  });
}
for (const condition of ["daily", "inflight"]) {
  test(`rechecagem bloqueia ${condition} surgindo durante preparacao`, async () => {
    const { deps, calls } = fixture({ onPrepare: (deps) => {
      if (condition === "daily") deps.distributionModel.countDocuments = async () => 2;
      else deps.distributionModel.exists = async () => true;
    } });
    assert.equal((await runKaelVideoAutopilotOnce("user", deps)).reason, "autopilot_state_changed");
    assert.equal(calls.creates, 0); assert.equal(calls.schedules, 0);
  });
}
