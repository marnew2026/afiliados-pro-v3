import {
  isKaelMediaRecoveryCronEnabled,
} from "./KaelMediaRecoveryCronConfig.js";

import {
  runKaelMediaGenerationRecoveryScheduler,
} from "./KaelMediaGenerationRecoveryScheduler.js";

const RECOVERY_CRON_EXPRESSION = "*/5 * * * *";

export function registerKaelMediaRecoveryCron({
  cron,
  enabledChecker = isKaelMediaRecoveryCronEnabled,
  recoveryScheduler = runKaelMediaGenerationRecoveryScheduler,
  logger = console,
} = {}) {
  if (!enabledChecker()) {
    logger.info?.(
      "KAEL MEDIA RECOVERY CRON DESATIVADO"
    );

    return {
      enabled: false,
    };
  }

  cron.schedule(
    RECOVERY_CRON_EXPRESSION,
    async () => {
      try {
        await recoveryScheduler();
      } catch (error) {
        logger.error?.(
          "KAEL MEDIA RECOVERY CRON ERROR:",
          error?.message || "erro desconhecido"
        );
      }
    }
  );

  logger.info?.(
    "KAEL MEDIA RECOVERY CRON ATIVO: a cada 5 minutos"
  );

  return {
    enabled: true,
    expression: RECOVERY_CRON_EXPRESSION,
  };
}
