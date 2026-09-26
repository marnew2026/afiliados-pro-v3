import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(testsDir, "..");
const rootDir = path.resolve(backendDir, "..");

function read(relativePath) {
  return fs.readFileSync(
    path.join(rootDir, relativePath),
    "utf8"
  );
}

test("KAEL Autopilot preserva gates de seguranca", () => {
  const source = read(
    "backend/services/autopilot/KaelAutopilotService.js"
  );

  assert.match(source, /reason:\s*"autopilot_disabled"/);
  assert.match(source, /reason:\s*"autopilot_not_automatic"/);
  assert.match(source, /reason:\s*"autopilot_locked"/);
  assert.match(source, /reason:\s*"daily_limit_reached"/);
  assert.match(source, /reason:\s*"cooldown_active"/);
  assert.match(source, /reason:\s*"autopilot_state_changed"/);
});

test("KAEL Autopilot revalida estado antes da Distribution", () => {
  const source = read(
    "backend/services/autopilot/KaelAutopilotService.js"
  );

  const recheckPosition = source.indexOf(
    "const stillAutomatic"
  );
  const createPosition = source.indexOf(
    "const distribution = await Distribution.create"
  );

  assert.ok(recheckPosition >= 0);
  assert.ok(createPosition >= 0);
  assert.ok(recheckPosition < createPosition);
});

test("Distribution criada pelo KAEL identifica origem autopilot", () => {
  const service = read(
    "backend/services/autopilot/KaelAutopilotService.js"
  );
  const model = read(
    "backend/models/Distribution.js"
  );

  assert.match(service, /source:\s*"autopilot"/);
  assert.match(
    model,
    /enum:\s*\["manual",\s*"autopilot"\]/
  );
});

test("KAEL Autopilot permanece limitado ao Telegram nesta fase", () => {
  const settings = read(
    "backend/models/AutopilotSettings.js"
  );
  const service = read(
    "backend/services/autopilot/KaelAutopilotService.js"
  );

  assert.match(settings, /enum:\s*\["telegram"\]/);
  assert.match(
    service,
    /channels\.includes\("telegram"\)/
  );
});

test("KAEL evita repetir imediatamente a ultima campanha do Autopilot", () => {
  const source = read(
    "backend/services/autopilot/KaelAutopilotService.js"
  );

  assert.match(
    source,
    /source:\s*"autopilot"[\s\S]*?campaignId/
  );

  assert.match(
    source,
    /_id:\s*\{\s*\$ne:/
  );
});
