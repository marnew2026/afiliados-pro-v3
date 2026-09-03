import {
  createGenerationTask,
} from "./MediaGenerationTaskService.js";

export async function startKaelMediaGeneration({
  userId,
  campaign,
  content,
  mediaType,
  provider,
  taskCreator = createGenerationTask,
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

  const generation = await provider.startGeneration({
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

  const generationTask = await taskCreator({
    userId,
    campaignId: campaign._id,
    provider: generation.provider,
    externalTaskId: generation.externalTaskId,
    mediaType: generation.mediaType,
  });

  return {
    generation,
    generationTask,
  };
}
