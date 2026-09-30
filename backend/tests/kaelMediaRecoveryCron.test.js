import test from "node:test";
import assert from "node:assert/strict";

import {
  registerKaelMediaRecoveryCron,
} from "../services/media/generation/KaelMediaRecoveryCron.js";

test("KAEL media recovery cron nao registra quando desativado", () => {
  let schedules = 0;

  const result = registerKaelMediaRecoveryCron({
    cron: {
      schedule() {
        schedules += 1;
      },
    },
    enabledChecker: () => false,
    recoveryScheduler: async () => ({
      success: true,
    }),
    logger: {
      info() {},
      error() {},
    },
  });

  assert.equal(schedules, 0);
  assert.deepEqual(result, {
    enabled: false,
  });
});

test("KAEL media recovery cron registra a cada 5 minutos quando ativado", async () => {
  let registeredExpression = null;
  let registeredHandler = null;
  let schedulerRuns = 0;

  const result = registerKaelMediaRecoveryCron({
    cron: {
      schedule(expression, handler) {
        registeredExpression = expression;
        registeredHandler = handler;
      },
    },
    enabledChecker: () => true,
    recoveryScheduler: async () => {
      schedulerRuns += 1;

      return {
        success: true,
      };
    },
    logger: {
      info() {},
      error() {},
    },
  });

  assert.equal(registeredExpression, "*/5 * * * *");
  assert.equal(typeof registeredHandler, "function");
  assert.deepEqual(result, {
    enabled: true,
    expression: "*/5 * * * *",
  });

  await registeredHandler();

  assert.equal(schedulerRuns, 1);
});
