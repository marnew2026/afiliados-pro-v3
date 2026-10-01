import {
  createFacebookDistribution,
} from "./CreateFacebookDistributionService.js";
import {
  createInstagramDistribution,
} from "./CreateInstagramDistributionService.js";
import {
  createTikTokDistribution,
} from "./CreateTikTokDistributionService.js";
import {
  createKwaiDistribution,
} from "./CreateKwaiDistributionService.js";

const DEFAULT_CREATORS = {
  facebook: createFacebookDistribution,
  instagram: createInstagramDistribution,
  tiktok: createTikTokDistribution,
  kwai: createKwaiDistribution,
};

export function resolveKaelDistributionCreator({
  channel,
  creators = DEFAULT_CREATORS,
}) {
  const normalizedChannel = String(
    channel || ""
  )
    .trim()
    .toLowerCase();

  const creator = creators[normalizedChannel];

  if (typeof creator !== "function") {
    throw new Error(
      `Criador de Distribution nao implementado para o canal: ${normalizedChannel}`
    );
  }

  return creator;
}
