import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveKaelDistributionCreator,
} from "../services/distribution/KaelDistributionCreatorResolver.js";

test("KAEL resolve o criador correto para cada canal de video", () => {
  const creators = {
    instagram: async () => {},
    facebook: async () => {},
    tiktok: async () => {},
    kwai: async () => {},
  };

  for (const channel of Object.keys(creators)) {
    const creator = resolveKaelDistributionCreator({
      channel,
      creators,
    });

    assert.equal(creator, creators[channel]);
  }
});

test("KAEL rejeita canal sem criador de Distribution", () => {
  assert.throws(
    () => resolveKaelDistributionCreator({
      channel: "telegram",
      creators: {},
    }),
    /Criador de Distribution nao implementado/
  );
});

import { createInstagramDistribution } from "../services/distribution/CreateInstagramDistributionService.js";
import { createFacebookDistribution } from "../services/distribution/CreateFacebookDistributionService.js";
import { createTikTokDistribution } from "../services/distribution/CreateTikTokDistributionService.js";
import { createKwaiDistribution } from "../services/distribution/CreateKwaiDistributionService.js";

test("resolver seleciona os quatro servicos reais sem publicar", () => {
  for (const [channel, creator] of Object.entries({ instagram: createInstagramDistribution, facebook: createFacebookDistribution, tiktok: createTikTokDistribution, kwai: createKwaiDistribution })) {
    assert.equal(resolveKaelDistributionCreator({ channel }), creator);
  }
});
