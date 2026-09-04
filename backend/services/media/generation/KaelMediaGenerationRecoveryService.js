import {
  findRecoverableGenerationTasks,
} from "./MediaGenerationTaskService.js";

import {
  getProcessingLeaseCutoff,
} from "./MediaGenerationLeasePolicy.js";

import {
  retrieveKaelMediaGeneration,
} from "./KaelMediaGenerationRetrieveService.js";

import {
  resolveMediaGenerationProvider,
} from "./MediaGenerationProviderResolver.js";

const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 5;

export async function runKaelMediaGenerationRecoveryOnce({
  userId,
  limit = DEFAULT_LIMIT,
  taskFinder = findRecoverableGenerationTasks,
  leaseCutoffResolver = getProcessingLeaseCutoff,
  providerResolver = resolveMediaGenerationProvider,
  generationRetriever = retrieveKaelMediaGeneration,
  logger = console,
}) {
  if (!userId) {
    throw new Error(
      "Usuario para recovery de geracao nao informado."
    );
  }

  const parsedLimit = Number(limit);

  if (
    !Number.isInteger(parsedLimit) ||
    parsedLimit < 1 ||
    parsedLimit > MAX_LIMIT
  ) {
    throw new Error(
      `Limite do recovery deve estar entre 1 e ${MAX_LIMIT}.`
    );
  }

  const staleBefore = leaseCutoffResolver();
  const tasks = await taskFinder({
    userId,
    staleBefore,
    limit: parsedLimit,
  });

  const results = [];

  for (const task of tasks) {
    const taskId = String(task._id);

    try {
      const provider = await providerResolver({
        provider: task.provider,
      });

      const result = await generationRetriever({
        generationTask: task,
        provider,
      });

      results.push({
        taskId,
        status: result.status,
        reason: result.reason || null,
        mediaAssetId: result.mediaAsset?._id
          ? String(result.mediaAsset._id)
          : null,
      });

      logger.info?.(
        "KAEL MEDIA RECOVERY RESULT:",
        taskId,
        result.status,
        result.reason || "processed"
      );
    } catch (error) {
      const message = String(
        error?.message || "Falha desconhecida no recovery de midia."
      );

      results.push({
        taskId,
        status: "ERROR",
        reason: "media_generation_recovery_failed",
        error: message,
        mediaAssetId: null,
      });

      logger.error?.(
        "KAEL MEDIA RECOVERY ERROR:",
        taskId,
        message
      );
    }
  }

  const countStatus = (status) =>
    results.filter((result) => result.status === status).length;

  return {
    success: true,
    mode: "run-once",
    limit: parsedLimit,
    scanned: tasks.length,
    succeeded: countStatus("SUCCEEDED"),
    active:
      countStatus("PENDING") +
      countStatus("RUNNING"),
    canceled: countStatus("CANCELED"),
    providerFailed: countStatus("FAILED"),
    skipped: countStatus("SKIPPED"),
    errors: countStatus("ERROR"),
    results,
  };
}
