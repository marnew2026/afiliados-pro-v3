/**
 * Resultado esperado de generate():
 *
 * {
 *   provider: String,
 *   externalTaskId: String,
 *   mediaType: "image" | "video",
 *   sourceUrl: String,
 *   extension: String,
 *   contentType: String,
 * }
 */
export class MediaGenerationProvider {
  async generate({
    campaign,
    content,
    mediaType,
  }) {
    throw new Error(
      "MediaGenerationProvider.generate nao implementado."
    );
  }
}
