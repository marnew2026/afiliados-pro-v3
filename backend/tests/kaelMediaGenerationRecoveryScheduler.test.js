import test from "node:test";
import assert from "node:assert/strict";

import {
  runKaelMediaGenerationRecoveryScheduler,
} from "../services/media/generation/KaelMediaGenerationRecoveryScheduler.js";

test("KAEL recovery scheduler processa usuarios recuperaveis", async () => {
  const staleBefore =
    new Date("2026-09-29T20:00:00.000Z");

  const recoveredUserIds = [];

  const result =
    await runKaelMediaGenerationRecoveryScheduler({
      leaseCutoffResolver: () => staleBefore,
      userFinder: async ({
        staleBefore: receivedStaleBefore,
      }) => {
        assert.equal(
          receivedStaleBefore,
          staleBefore
        );

        return [
          "user-1",
          "user-2",
        ];
      },
      recoveryRunner: async ({
        userId,
      }) => {
        recoveredUserIds.push(userId);

        return {
          success: true,
          scanned: 1,
        };
      },
      logger: {
        info() {},
        error() {},
      },
    });

  assert.deepEqual(recoveredUserIds, [
    "user-1",
    "user-2",
  ]);

  assert.equal(result.success, true);
  assert.equal(result.usersScanned, 2);
  assert.equal(result.usersProcessed, 2);
  assert.equal(result.errors, 0);
});
test("KAEL recovery scheduler isola falha por usuario", async () => {
  const attemptedUserIds = [];

  const result =
    await runKaelMediaGenerationRecoveryScheduler({
      leaseCutoffResolver: () =>
        new Date("2026-09-29T20:00:00.000Z"),
      userFinder: async () => [
        "user-1",
        "user-2",
        "user-3",
      ],
      recoveryRunner: async ({
        userId,
      }) => {
        attemptedUserIds.push(userId);

        if (userId === "user-2") {
          throw new Error(
            "falha simulada"
          );
        }

        return {
          success: true,
          scanned: 1,
        };
      },
      logger: {
        info() {},
        error() {},
      },
    });

  assert.deepEqual(attemptedUserIds, [
    "user-1",
    "user-2",
    "user-3",
  ]);

  assert.equal(result.success, true);
  assert.equal(result.usersScanned, 3);
  assert.equal(result.usersProcessed, 2);
  assert.equal(result.errors, 1);
});

test("KAEL recovery scheduler bloqueia execucao concorrente", async () => {
  let releaseFirstRun;

  const firstRunGate = new Promise((resolve) => {
    releaseFirstRun = resolve;
  });

  const firstRun = runKaelMediaGenerationRecoveryScheduler({
    leaseCutoffResolver: () =>
      new Date("2026-09-29T20:00:00.000Z"),
    userFinder: async () => ["user-1"],
    recoveryRunner: async () => {
      await firstRunGate;

      return {
        success: true,
        scanned: 1,
      };
    },
    logger: {
      info() {},
      error() {},
    },
  });

  await new Promise((resolve) => setImmediate(resolve));

  const secondRun =
    await runKaelMediaGenerationRecoveryScheduler({
      leaseCutoffResolver: () =>
        new Date("2026-09-29T20:00:00.000Z"),
      userFinder: async () => ["user-2"],
      recoveryRunner: async () => ({
        success: true,
        scanned: 1,
      }),
      logger: {
        info() {},
        error() {},
      },
    });

  assert.equal(secondRun.success, true);
  assert.equal(secondRun.skipped, true);
  assert.equal(
    secondRun.reason,
    "scheduler_already_running"
  );

  releaseFirstRun();
  await firstRun;
});
