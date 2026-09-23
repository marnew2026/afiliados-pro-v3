import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(testsDir, "..");

function read(relativePath) {
  return fs.readFileSync(
    path.join(backendDir, relativePath),
    "utf8"
  );
}

test("Campaign preserva a auditoria dos ganhos invalidados", () => {
  const source = read("models/Campaign.js");

  assert.match(source, /earningsAudit:\s*\{/);
  assert.match(
    source,
    /invalidatedAmount:\s*\{\s*type:\s*Number,\s*default:\s*null/
  );
  assert.match(
    source,
    /invalidatedAt:\s*\{\s*type:\s*Date,\s*default:\s*null/
  );
  assert.match(
    source,
    /reason:\s*\{\s*type:\s*String,\s*default:\s*null/
  );
});

test("auditoria financeira permanece somente leitura", () => {
  const source = read("scripts/auditFinancialHistory.js");

  assert.doesNotMatch(
    source,
    /\.(updateOne|updateMany|findOneAndUpdate|bulkWrite|create|save|deleteOne)\s*\(/
  );

  assert.match(
    source,
    /AUDITORIA SOMENTE LEITURA/
  );
});

test("invalidação de créditos exige confirmação e limites exatos", () => {
  const source = read(
    "scripts/invalidateHistoricalTestCredits.js"
  );

  assert.match(
    source,
    /process\.argv\.includes\("--apply"\)/
  );
  assert.match(source, /EXPECTED_ENTRIES = 727/);
  assert.match(source, /EXPECTED_TOTAL_CENTS = 71830/);
  assert.match(source, /withTransaction/);
  assert.match(source, /modifiedCount !== EXPECTED_ENTRIES/);
});

test("invalidação das campanhas exige confirmação e limites exatos", () => {
  const source = read(
    "scripts/invalidateHistoricalCampaignEarnings.js"
  );

  assert.match(
    source,
    /process\.argv\.includes\("--apply"\)/
  );
  assert.match(source, /EXPECTED_CAMPAIGNS = 97/);
  assert.match(source, /EXPECTED_EARNINGS_CENTS = 6790/);
  assert.match(source, /withTransaction/);
  assert.match(
    source,
    /modifiedCount !== EXPECTED_CAMPAIGNS/
  );
});

test("scripts permanentes não contêm caminhos pessoais", () => {
  const files = [
    "scripts/auditFinancialHistory.js",
    "scripts/invalidateHistoricalTestCredits.js",
    "scripts/invalidateHistoricalCampaignEarnings.js",
  ];

  for (const file of files) {
    const source = read(file);

    assert.doesNotMatch(source, /C:\\\\Users\\\\/);
    assert.doesNotMatch(source, /AfiliadosPro-.*backup/);
  }
});