import test from "node:test";
import assert from "node:assert/strict";
import { normalizeCampaignLinks, scheduleCampaignLinks } from "../services/campaigns/CampaignLinkBatchService.js";
import { linkDailyStart, linkCampaignContent, runLinkAutomationUser, runLinkAutomationScheduler, linkChannelAllowed } from "../services/autopilot/KaelLinkAutomationService.js";
import Distribution from "../models/Distribution.js";
const image = "https://http2.mlstatic.com/product.webp";
const chain = value => ({ sort() { return this; }, select() { return this; }, limit() { return this; }, lean: async () => value });
test("lote invalido e recusado antes de gravar; limite 10 e repeticoes normalizadas", async () => {
  assert.equal(normalizeCampaignLinks(["https://meli.la/a", "https://meli.la/a"]).length, 1);
  assert.throws(() => normalizeCampaignLinks(Array(11).fill("https://meli.la/a")), /10/);
  await assert.rejects(scheduleCampaignLinks({ userId: "u", links: ["https://meli.la/a", "https://127.0.0.1/private"],
    taskModel: { init() { throw new Error("nao pode gravar"); } } }), /HTTPS/);
});
test("repeticao do cadastro reutiliza tarefa pronta sem gerar de novo", async () => {
  const task = { _id: "task", status: "ready" };
  const result = await scheduleCampaignLinks({ userId: "u", links: ["https://meli.la/a"],
    taskModel: { init: async () => {}, findOne: async filter => { assert.equal(filter.userId, "u"); return task; } },
    enqueue: async () => { throw new Error("nao deve gerar"); } });
  assert.equal(result[0].task, task);
});
test("falha parcial preserva tarefas aceitas e permite retomar o mesmo lote", async () => {
  const created = [];
  const result = await scheduleCampaignLinks({ userId: "u", links: ["https://meli.la/a", "https://meli.la/b"],
    taskModel: { init: async () => {}, findOne: async () => null, countDocuments: async () => 0,
      create: async row => { const task = { ...row, _id: row.link }; created.push(task); return task; } },
    campaignModel: { findOne: async () => null }, idFactory: () => "campaign",
    enqueue: async id => { if (id.endsWith("b")) throw new Error("fila indisponivel"); } });
  assert.equal(created.length, 2); assert.equal(result[0].accepted, true); assert.equal(result[1].accepted, false);
  assert.equal(result[1].taskId, "https://meli.la/b");
});
test("limite diario considera UTC-3 e legenda gerada e reaproveitada", () => {
  assert.equal(linkDailyStart(new Date("2026-10-03T02:30:00Z")).toISOString(), "2026-10-02T03:00:00.000Z");
  assert.equal(linkDailyStart(new Date("2026-10-03T03:00:00Z")).toISOString(), "2026-10-03T03:00:00.000Z");
  assert.equal(linkCampaignContent({ caption: "Minha legenda", product: { title: "Mouse", images: [image] } }, "tiktok").caption, "Minha legenda");
});
function dependencies({ enabled = true, blocked = [], used = [], pause = false, daily = 0, reserved = null, denied = null } = {}) {
  const calls = [], updates = [];
  const settings = { _id: "s", userId: "u", dailyLimit: 2, minIntervalMinutes: 30, channels: ["tiktok", "instagram"] };
  const task = { _id: "task", userId: "u", campaignId: "campaign", mediaAssetId: "asset", product: { title: "Mouse", images: [image] } };
  const deps = {
    env: { KAEL_LINK_AUTOMATION_ENABLED: "true", KAEL_PRODUCT_VIDEO_ENABLED: "true" }, gate: channel => !blocked.includes(channel),
    settingsModel: { findOneAndUpdate: async query => { assert.equal(query.linkAutomation, true); return enabled ? settings : null; }, exists: async () => !pause,
      updateOne: async (...args) => updates.push(args) },
    taskModel: { findOne: filter => chain(used.includes("campaign") ? null : task) },
    campaignModel: { distinct: async () => ["campaign"], findOne: () => chain({ _id: "campaign", active: true }), exists: async () => true },
    assetModel: { findOne: filter => { assert.equal(filter.userId, "u"); assert.equal(filter._id, "asset"); return chain({ _id: "asset", assetUrl: "https://assets.example/video.mp4" }); } },
    connectionModel: { findOne: () => chain({ _id: "connection", destinationId: "dest", connectedAt: "2026-10-03T10:00:00Z" }), exists: async () => true },
    distributionModel: { countDocuments: async () => daily, exists: async () => false, distinct: async () => used,
      findOne: filter => chain(filter.status === "scheduled" ? reserved : filter.status === "failed" ? denied : null),
      findOneAndUpdate: async (filter, update) => { calls.push({ recovered: filter._id }); return { _id: filter._id, ...update.$set }; } },
    creatorResolver: ({ channel }) => async input => { calls.push({ channel, ...input }); return { distribution: { _id: `${channel}-post` } }; },
    scheduler: async input => { calls.push({ restored: input.distributionId }); return { jobId: input.distributionId }; },
    now: () => new Date("2026-10-03T12:00:00Z"), tokenFactory: () => "owner-token",
  };
  return { deps, calls, updates };
}
test("automatico desligado nunca cria publicacoes", async () => {
  const { deps, calls } = dependencies({ enabled: false });
  assert.deepEqual(await runLinkAutomationUser("u", deps), []); assert.equal(calls.length, 0);
});
test("canal bloqueado nao impede outra rede e cada criador recebe a campanha exata e chave unica", async () => {
  const { deps, calls, updates } = dependencies({ blocked: ["instagram"] });
  const results = await runLinkAutomationUser("u", deps);
  assert.equal(results[0].reason, "scheduled"); assert.equal(results[1].reason, "channel_not_ready");
  assert.equal(calls.length, 1); assert.equal(calls[0].campaignId, "campaign");
  assert.equal(calls[0].automationKey, "links/u/campaign/tiktok"); assert.equal(calls[0].source, "autopilot");
  assert.deepEqual(updates.at(-1)[0], { _id: "s", runLockToken: "owner-token" });
});
test("campanha ja divulgada nao e selecionada novamente", async () => {
  const { deps, calls } = dependencies({ used: ["campaign"] });
  assert.ok((await runLinkAutomationUser("u", deps)).every(row => row.reason === "waiting_for_links")); assert.equal(calls.length, 0);
});
test("pausa durante preparacao e limite diario impedem criacao", async () => {
  for (const options of [{ pause: true }, { daily: 2 }]) {
    const { deps, calls } = dependencies(options);
    await runLinkAutomationUser("u", deps); assert.equal(calls.length, 0);
  }
});
test("queda entre reserva Mongo e fila retoma o mesmo id sem outra publicacao", async () => {
  const { deps, calls } = dependencies({ reserved: { _id: "reserved", scheduledAt: "2026-10-03T11:00:00Z" } });
  await runLinkAutomationUser("u", deps);
  assert.ok(calls.every(row => row.restored === "reserved"));
});
test("401 so retoma depois de autorizacao renovada e reutiliza a publicacao", async () => {
  const { deps, calls } = dependencies({ denied: { _id: "denied", campaignId: "campaign", authorizationAt: "2026-10-02T10:00:00Z" } });
  await runLinkAutomationUser("u", deps);
  assert.equal(calls[0].recovered, "denied"); assert.equal(calls[1].restored, "denied");
});
test("chave de automacao tem indice unico parcial, sem alterar registros manuais", () => {
  const [fields, options] = Distribution.schema.indexes().find(([fields]) => fields.automationKey);
  assert.equal(fields.automationKey, 1); assert.equal(options.unique, true);
  assert.deepEqual(options.partialFilterExpression, { automationKey: { $type: "string" } });
});
test("scheduler desativado nao consulta usuarios e libera trava depois de erro", async () => {
  await runLinkAutomationScheduler({ env: {}, settingsModel: { find() { throw new Error("nao consultar"); } } });
  let runs = 0;
  const deps = { env: { KAEL_LINK_AUTOMATION_ENABLED: "true", KAEL_PRODUCT_VIDEO_ENABLED: "true" }, settingsModel: { find: () => chain([{ userId: "u" }]) }, runner: async () => { runs++; throw new Error("temporario"); } };
  await runLinkAutomationScheduler(deps); await runLinkAutomationScheduler(deps); assert.equal(runs, 2);
});
test("ausencia de liberacao de video mantem bloqueio", () => {
  assert.equal(linkChannelAllowed("tiktok", {}), false);
});

import { assertLinkAutomationAtDelivery } from "../services/autopilot/KaelLinkAutomationGuard.js";
test("pausa e canal removido bloqueiam envio na hora de executar o worker", async () => {
  const distribution = { automationKey: "links/u/c/tiktok", userId: "u", channel: "tiktok" };
  await assert.rejects(assertLinkAutomationAtDelivery(distribution, { env: {}, settingsModel: { exists() { throw new Error("nao consultar"); } } }), { code: "KAEL_AUTOMATION_PAUSED" });
  await assert.rejects(assertLinkAutomationAtDelivery(distribution, { env: { KAEL_LINK_AUTOMATION_ENABLED: "true" }, settingsModel: { exists: async query => {
    assert.equal(query.channels, "tiktok"); assert.equal(query.enabled, true); return false;
  } } }), { code: "KAEL_AUTOMATION_PAUSED" });
  await assertLinkAutomationAtDelivery({}, { env: {} });
});
test("apos liberar conta worker exige configuracao automatica ativa", async () => {
  await assertLinkAutomationAtDelivery({ automationKey: "key", userId: "u", channel: "tiktok" }, {
    env: { KAEL_LINK_AUTOMATION_ENABLED: "true" }, settingsModel: { exists: async () => true } });
});
test("falha antes de envio recupera fila sem exigir reconexao", async () => {
  const { deps, calls } = dependencies({ denied: { _id: "reserved", campaignId: "campaign", attempts: 0, lastError: "Falha ao agendar publicacao no TikTok.", authorizationAt: "2026-10-03T10:00:00Z" } });
  await runLinkAutomationUser("u", deps);
  assert.equal(calls[0].recovered, "reserved"); assert.equal(calls[1].restored, "reserved");
});
