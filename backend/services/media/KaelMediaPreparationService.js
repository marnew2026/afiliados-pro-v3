export async function prepareKaelMedia({
  userId,
  campaign,
  content,
  mediaResolver,
  generationEnsurer,
  provider,
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado ao KAEL Media Preparation."
    );
  }

  if (content.contentType !== "short_video") {
    return {
      status: "READY",
      content,
      reason: "media_not_required",
    };
  }

  if (typeof mediaResolver !== "function") {
    throw new Error(
      "Media Resolver nao informado ao KAEL Media Preparation."
    );
  }

  const resolvedContent = await mediaResolver({
    userId,
    campaignId: campaign?._id,
    content,
  });

  if (resolvedContent?.media?.assetUrl) {
    return {
      status: "READY",
      content: resolvedContent,
      reason: "media_asset_ready",
    };
  }

  if (typeof generationEnsurer !== "function") {
    throw new Error(
      "Generation Ensurer nao informado ao KAEL Media Preparation."
    );
  }

  const generationResult = await generationEnsurer({
    userId,
    campaign,
    content: resolvedContent,
    provider,
  });

  return {
    status: "PENDING",
    content: resolvedContent,
    reason: "media_generation_started",
    generation: generationResult.generation,
    generationTask: generationResult.generationTask,
  };
}
