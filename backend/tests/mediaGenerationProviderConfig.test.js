import test from "node:test";
import assert from "node:assert/strict";

import {
  getMediaGenerationProviderName,
} from "../services/media/generation/MediaGenerationProviderConfig.js";

test("KAEL usa provider de geracao configurado no ambiente", () => {
  const providerName = getMediaGenerationProviderName({
    configuredProvider: "runway",
  });

  assert.equal(providerName, "runway");
});

test("KAEL normaliza nome do provider configurado", () => {
  const providerName = getMediaGenerationProviderName({
    configuredProvider: "  RUNWAY  ",
  });

  assert.equal(providerName, "runway");
});

test("KAEL nao escolhe provider implicitamente quando configuracao esta ausente", () => {
  assert.throws(
    () =>
      getMediaGenerationProviderName({
        configuredProvider: "",
      }),
    /Provider de geracao de midia nao configurado/
  );
});

test("KAEL le provider de geracao da configuracao global", () => {
  const previousProvider =
    process.env.KAEL_MEDIA_GENERATION_PROVIDER;

  try {
    process.env.KAEL_MEDIA_GENERATION_PROVIDER =
      "  RUNWAY  ";

    const providerName =
      getMediaGenerationProviderName();

    assert.equal(providerName, "runway");
  } finally {
    if (previousProvider === undefined) {
      delete process.env.KAEL_MEDIA_GENERATION_PROVIDER;
    } else {
      process.env.KAEL_MEDIA_GENERATION_PROVIDER =
        previousProvider;
    }
  }
});
