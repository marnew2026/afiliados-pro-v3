export class MediaGenerationProvider {
  async startGeneration({
    campaign,
    content,
    mediaType,
  }) {
    throw new Error(
      "MediaGenerationProvider.startGeneration nao implementado."
    );
  }

  async retrieveGeneration({
    externalTaskId,
  }) {
    throw new Error(
      "MediaGenerationProvider.retrieveGeneration nao implementado."
    );
  }
}
