export function getMediaGenerationProviderName({
  configuredProvider = process.env.KAEL_MEDIA_GENERATION_PROVIDER,
} = {}) {
  const providerName = String(
    configuredProvider || ""
  )
    .trim()
    .toLowerCase();

  if (!providerName) {
    throw new Error(
      "Provider de geracao de midia nao configurado."
    );
  }

  return providerName;
}
