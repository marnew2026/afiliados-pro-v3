import {
  prepareKaelMedia,
} from "./KaelMediaPreparationService.js";
import {
  resolveKaelMedia,
} from "./KaelMediaResolver.js";
import {
  ensureKaelMediaGeneration,
} from "./generation/KaelMediaGenerationOrchestrator.js";
import {
  getMediaGenerationProviderName,
} from "./generation/MediaGenerationProviderConfig.js";
import {
  resolveMediaGenerationProvider,
} from "./generation/MediaGenerationProviderResolver.js";

export async function runKaelMediaPreparation({
  userId,
  campaign,
  content,
  providerNameGetter = getMediaGenerationProviderName,
  providerResolver = resolveMediaGenerationProvider,
  mediaPreparer = prepareKaelMedia,
  mediaResolver = resolveKaelMedia,
  generationEnsurer = ensureKaelMediaGeneration,
}) {
  const providerName = providerNameGetter();

  const provider = await providerResolver({
    provider: providerName,
  });

  return mediaPreparer({
    userId,
    campaign,
    content,
    mediaResolver,
    generationEnsurer,
    provider,
  });
}
