import {
  startKaelMediaGeneration,
} from "./KaelMediaGenerationStartService.js";

export async function ensureKaelMediaGeneration({
  userId,
  campaign,
  content,
  provider,
  generationStarter = startKaelMediaGeneration,
}) {
  if (!userId) {
    throw new Error(
      "Usuario para orquestracao de midia nao informado."
    );
  }

  if (!campaign?._id) {
    throw new Error(
      "Campanha para orquestracao de midia nao informada."
    );
  }

  if (!content) {
    throw new Error(
      "Conteudo para orquestracao de midia nao informado."
    );
  }

  if (content.contentType !== "short_video") {
    return {
      status: "SKIPPED",
      generation: null,
      generationTask: null,
      reason: "media_generation_not_required",
    };
  }

  if (content.media?.assetUrl) {
    return {
      status: "SKIPPED",
      generation: null,
      generationTask: null,
      reason: "media_asset_already_ready",
    };
  }

  const started =
    await generationStarter({
      userId,
      campaign,
      content,
      mediaType: "video",
      provider,
    });

  return {
    status: "STARTED",
    generation: started.generation,
    generationTask: started.generationTask,
  };
}
