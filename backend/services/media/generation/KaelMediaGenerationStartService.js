import {
  attachGenerationProviderTask,
  markGenerationTaskFailed,
  reserveGenerationTask,
} from "./MediaGenerationTaskService.js";

import {
  buildMediaGenerationKey,
} from "./MediaGenerationKeyService.js";

export async function startKaelMediaGeneration({
  userId,
  campaign,
  content,
  mediaType,
  provider,
  generationKeyBuilder = buildMediaGenerationKey,
  taskReserver = reserveGenerationTask,
  providerTaskAttacher = attachGenerationProviderTask,
  taskFailureMarker = markGenerationTaskFailed,
}) {
  if (!userId) {
    throw new Error(
      "Usuario para geracao de midia nao informado."
    );
  }

  if (!campaign?._id) {
    throw new Error(
      "Campanha para geracao de midia nao informada."
    );
  }

  if (
    !provider ||
    typeof provider.startGeneration !== "function"
  ) {
    throw new Error(
      "Provider de geracao de midia invalido."
    );
  }

  const providerName = String(
    provider.providerName || ""
  ).trim();

  if (!providerName) {
    throw new Error(
      "Identificador do provider de geracao nao informado."
    );
  }

  const generationKey =
    generationKeyBuilder({
      userId,
      campaignId: campaign._id,
      mediaType,
      content,
    });

  const reservation =
    await taskReserver({
      userId,
      campaignId: campaign._id,
      generationKey,
      provider: providerName,
      mediaType,
    });

  if (!reservation.reserved) {
    return {
      generation: null,
      generationTask: reservation.generationTask,
      reserved: false,
    };
  }

  const reservedTask =
    reservation.generationTask;

  try {
    const generation =
      await provider.startGeneration({
        campaign,
        content,
        mediaType,
      });

    if (
      !generation?.provider ||
      !generation?.externalTaskId ||
      !generation?.mediaType
    ) {
      throw new Error(
        "Provider retornou tarefa de geracao invalida."
      );
    }

    const generationTask =
      await providerTaskAttacher({
        taskId: reservedTask._id,
        externalTaskId:
          generation.externalTaskId,
        status:
          generation.status || "PENDING",
      });

    return {
      generation,
      generationTask,
      reserved: true,
    };
  } catch (error) {
    await taskFailureMarker({
      taskId: reservedTask._id,
      error,
    });

    throw error;
  }
}
