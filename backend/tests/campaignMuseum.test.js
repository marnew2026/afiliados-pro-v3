import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(testsDir, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(backendDir, relativePath), "utf8");
}

function between(source, start, end) {
  const startIndex = source.indexOf(start);
  assert.notEqual(startIndex, -1, `Bloco inicial não encontrado: ${start}`);

  const endIndex = source.indexOf(end, startIndex + start.length);
  assert.notEqual(endIndex, -1, `Bloco final não encontrado: ${end}`);

  return source.slice(startIndex, endIndex);
}

test("modelo Campaign preserva campanhas arquivadas", () => {
  const source = read("models/Campaign.js");

  assert.match(source, /enum:\s*\["active",\s*"paused",\s*"archived"\]/);
  assert.match(source, /archivedAt:\s*\{\s*type:\s*Date,\s*default:\s*null/);
});

test("Museu usa somente o usuário autenticado", () => {
  const source = read("routes/campaigns.js");
  const route = between(
    source,
    'router.get("/museum"',
    'router.get("/user/:userId"'
  );

  assert.match(route, /router\.get\("\/museum",\s*protect/);
  assert.match(route, /const userId = req\.user\?\._id \|\| req\.user\?\.id/);
  assert.match(route, /Campaign\.find\(\{\s*userId,\s*status:\s*"archived"/);
  assert.doesNotMatch(route, /req\.params\.userId|req\.body\.userId/);
  assert.match(route, /return res\.json\(campaignsFixed\)/);
});

test("exclusão arquiva sem apagar o histórico", () => {
  const source = read("routes/campaigns.js");
  const route = between(
    source,
    'router.delete("/:id"',
    'router.get("/r/:id"'
  );

  assert.match(route, /campaign\.active = false/);
  assert.match(route, /campaign\.status = "archived"/);
  assert.match(route, /campaign\.archivedAt = new Date\(\)/);
  assert.match(route, /await campaign\.save\(\)/);
  assert.doesNotMatch(route, /deleteOne|findByIdAndDelete|findOneAndDelete/);
});

test("campanha arquivada retorna 410 antes de gerar clique", () => {
  const source = read("routes/campaigns.js");
  const route = source.slice(source.indexOf('router.get("/r/:id"'));

  const guardIndex = route.indexOf("campaign.active !== true");
  const statusIndex = route.indexOf('campaign.status === "archived"');
  const responseIndex = route.indexOf("res.status(410)");
  const clickIndex = route.indexOf("campaign.clicks += 1");

  assert.ok(guardIndex >= 0);
  assert.ok(statusIndex >= 0);
  assert.ok(responseIndex >= 0);
  assert.ok(clickIndex >= 0);
  assert.ok(responseIndex < clickIndex);
});

test("dashboard e ranking ignoram campanhas arquivadas", () => {
  const controller = read("controllers/dashboardController.js");
  const dashboard = read("routes/dashboardRoutes.js");
  const ranking = read("hotmart/routes/campaignRanking.routes.js");

  assert.match(
    controller,
    /Campaign\.find\(\{\s*userId:[\s\S]*?active:\s*true/
  );

  const activeDashboardFilters =
    dashboard.match(/Campaign\.find\(\{[\s\S]*?active:\s*true[\s\S]*?\}\)/g) || [];

  assert.ok(activeDashboardFilters.length >= 2);
  assert.match(ranking, /Campaign\.find\(\{\s*active:\s*true\s*\}\)/);
});