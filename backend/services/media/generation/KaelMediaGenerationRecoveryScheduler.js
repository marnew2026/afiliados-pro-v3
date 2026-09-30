import {
  findRecoverableGenerationUserIds,
} from "./MediaGenerationTaskService.js";

import {
  getProcessingLeaseCutoff,
} from "./MediaGenerationLeasePolicy.js";

import {
  runKaelMediaGenerationRecoveryOnce,
} from "./KaelMediaGenerationRecoveryService.js";

export async function runKaelMediaGenerationRecoveryScheduler({
  leaseCutoffResolver = getProcessingLeaseCutoff,
  userFinder = findRecoverableGenerationUserIds,
  recoveryRunner = runKaelMediaGenerationRecoveryOnce,
  logger = console,
} = {}) {
  const staleBefore = leaseCutoffResolver();

  const userIds = await userFinder({
    staleBefore,
  });

  let usersProcessed = 0;
  let errors = 0;

  for (const userId of userIds) {
    try {
      await recoveryRunner({
        userId,
      });

      usersProcessed += 1;

      logger.info?.(
        "KAEL MEDIA RECOVERY SCHEDULER USER:",
        String(userId),
        "processed"
      );
    } catch (error) {
      errors += 1;

      logger.error?.(
        "KAEL MEDIA RECOVERY SCHEDULER USER ERROR:",
        String(userId),
        error?.message || "erro desconhecido"
      );
    }
  }

  return {
    success: true,
    usersScanned: userIds.length,
    usersProcessed,
    errors,
  };
}
