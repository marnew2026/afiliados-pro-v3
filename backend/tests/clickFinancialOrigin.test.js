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
  assert.notEqual(startIndex, -1, `Bloco inicial nao encontrado: ${start}`);

  const endIndex = source.indexOf(end, startIndex + start.length);
  assert.notEqual(endIndex, -1, `Bloco final nao encontrado: ${end}`);

  return source.slice(startIndex, endIndex);
}

test("clique preserva tracking sem gerar credito monetario", () => {
  const source = read("routes/campaigns.js");
  const route = between(
    source,
    'router.get("/r/:id"',
    'router.post("/:id/click"'
  );

  assert.match(route, /campaign\.clicks \+= 1/);
  assert.match(route, /await campaign\.save\(\)/);
  assert.match(route, /await registerClick\(/);
  assert.match(route, /await ClickLog\.create\(/);
  assert.match(route, /return res\.redirect\(campaign\.link\)/);

  assert.doesNotMatch(route, /valorClique/);
  assert.doesNotMatch(route, /campaign\.earnings\s*=/);
  assert.doesNotMatch(route, /addCredit\(/);
  assert.doesNotMatch(route, /rebuildWallet\(/);
  assert.doesNotMatch(route, /toCents\(/);
  assert.doesNotMatch(route, /toReais\(/);
});

test("rota de campanhas nao importa servicos financeiros do clique", () => {
  const source = read("routes/campaigns.js");

  assert.doesNotMatch(source, /services\/ledgerService\.js/);
  assert.doesNotMatch(source, /services\/rebuildWallet\.js/);
  assert.doesNotMatch(source, /description:\s*"Clique em campanha"/);
});
