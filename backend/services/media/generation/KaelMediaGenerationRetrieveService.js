import {
  updateGenerationTaskStatus,
  markGenerationTaskSucceeded,
  markGenerationTaskFailed,
  claimGenerationTaskForProcessing,
  reclaimStaleGenerationTask,
} from "./MediaGenerationTaskService.js";

import {
  processGeneratedMedia,
} from "./KaelMediaGenerationPipeline.js";

import {
  getProcessingLeaseCutoff,
} from "./MediaGenerationLeasePolicy.js";

const ACTIVE_STATUSES = new Set([
  "PENDING",
  "RUNNING",
]);

export async function retrieveKaelMediaGeneration({
  generationTask,
  provider,
  taskStatusUpdater = updateGenerationTaskStatus,
  taskSucceededMarker = markGenerationTaskSucceeded,
  taskFailedMarker = markGenerationTaskFailed,
  taskClaimer = claimGenerationTaskForProcessing,
  taskReclaimer = reclaimStaleGenerationTask,
  leaseCutoffResolver = getProcessingLeaseCutoff,
  mediaProcessor = processGeneratedMedia,
}) {
  if (!generationTask?._id) {
    throw new Error(
      "Tarefa de geracao de midia nao informada."
    );
  }

  if (!generationTask?.externalTaskId) {
    throw new Error(
      "Identificador externo da geracao nao informado."
    );
  }

  if (
    !provider ||
    typeof provider.retrieveGeneration !== "function"
  ) {
    throw new Error(
      "Provider de geracao de midia invalido."
    );
  }

  const wasProcessing =
    generationTask.status === "PROCESSING";

  if (wasProcessing) {
    const staleBefore =
      leaseCutoffResolver();

    const reclaimedTask =
      await taskReclaimer({
        taskId: generationTask._id,
        staleBefore,
      });

    if (!reclaimedTask) {
      return {
        status: "SKIPPED",
        generationTask: null,
        mediaAsset: null,
        reason: "generation_task_processing",
      };
    }
  }

  const retrieval = await provider.retrieveGeneration({
    externalTaskId: generationTask.externalTaskId,
  });

  const status = String(
    retrieval?.status || ""
  ).toUpperCase();

  if (!status) {
    throw new Error(
      "Provider retornou status de geracao invalido."
    );
  }

  if (ACTIVE_STATUSES.has(status)) {
    const updatedTask = await taskStatusUpdater({
      taskId: generationTask._id,
      status,
    });

    return {
      status,
      generationTask: updatedTask,
      mediaAsset: null,
    };
  }

  if (status === "CANCELED") {
    const canceledTask = await taskStatusUpdater({
      taskId: generationTask._id,
      status: "CANCELED",
    });

    return {
      status,
      generationTask: canceledTask,
      mediaAsset: null,
    };
  }

  if (status === "FAILED") {
    const errorMessage =
      retrieval?.error ||
      "Geracao de midia encerrada com falha.";

    const failedTask = await taskFailedMarker({
      taskId: generationTask._id,
      error: errorMessage,
    });

    return {
      status,
      generationTask: failedTask,
      mediaAsset: null,
    };
  }

  if (status !== "SUCCEEDED") {
    throw new Error(
      `Status de geracao nao suportado: ${status}.`
    );
  }

  if (!retrieval?.generationResult) {
    throw new Error(
      "Provider concluiu a geracao sem resultado de midia."
    );
  }

  const claimedTask =
    wasProcessing
      ? generationTask
      : await taskClaimer({
          taskId: generationTask._id,
        });

  if (!claimedTask) {
    return {
      status: "SKIPPED",
      generationTask: null,
      mediaAsset: null,
      reason: "generation_task_not_claimed",
    };
  }

  const processed = await mediaProcessor({
    userId: generationTask.userId,
    campaignId: generationTask.campaignId,
    generationResult: retrieval.generationResult,
  });

  const mediaAsset =
    processed?.mediaAsset;

  if (!mediaAsset?._id) {
    throw new Error(
      "Pipeline de midia nao retornou MediaAsset valido."
    );
  }

  const succeededTask =
    await taskSucceededMarker({
      taskId: generationTask._id,
      mediaAssetId: mediaAsset._id,
    });

  return {
    status,
    generationTask: succeededTask,
    mediaAsset,
  };
}
