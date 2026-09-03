import {
  MediaGenerationProvider,
} from "../MediaGenerationProvider.js";

export class RunwayMediaGenerationProvider extends MediaGenerationProvider {
  constructor({
    apiSecret,
    client = null,
  } = {}) {
    super();

    this.apiSecret = String(
      apiSecret || ""
    ).trim();

    this.client = client;
  }

  async generate({
    campaign,
    content,
    mediaType,
  }) {
    if (!this.apiSecret && !this.client) {
      throw new Error(
        "Credencial da Runway nao configurada."
      );
    }

    if (mediaType !== "video") {
      throw new Error(
        "RunwayMediaGenerationProvider suporta apenas video nesta etapa."
      );
    }

    throw new Error(
      "RunwayMediaGenerationProvider.generate ainda nao conectado a API."
    );
  }
}
