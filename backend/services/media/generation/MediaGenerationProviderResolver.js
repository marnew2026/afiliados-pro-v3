export async function resolveMediaGenerationProvider({
  provider,
}) {
  const providerName = String(
    provider || ""
  )
    .trim()
    .toLowerCase();

  if (providerName !== "runway") {
    throw new Error(
      `Provider de geracao nao suportado: ${providerName || "vazio"}.`
    );
  }

  const {
    createRunwayMediaGenerationProvider,
  } = await import(
    "./runway/createRunwayMediaGenerationProvider.js"
  );

  return createRunwayMediaGenerationProvider();
}
