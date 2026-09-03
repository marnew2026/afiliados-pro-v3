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

  ensureConfigured() {
    if (!this.apiSecret && !this.client) {
      throw new Error(
        "Credencial da Runway nao configurada."
      );
    }
  }

  async startGeneration({
    campaign,
    content,
    mediaType,
  }) {
    this.ensureConfigured();

    if (mediaType !== "video") {
      throw new Error(
        "RunwayMediaGenerationProvider suporta apenas video nesta etapa."
      );
    }

    if (
      !this.client ||
      !this.client.imageToVideo ||
      typeof this.client.imageToVideo.create !== "function"
    ) {
      throw new Error(
        "Cliente da Runway nao configurado para iniciar geracao."
      );
    }

    const promptText = String(
      content?.caption ||
      content?.text ||
      campaign?.description ||
      campaign?.name ||
      ""
    ).trim();

    if (!promptText) {
      throw new Error(
        "Prompt para geracao de video nao informado."
      );
    }

    const task = await this.client.imageToVideo.create({
      model: "gen4.5",
      promptText,
      ratio: "720:1280",
    });

    if (!task?.id) {
      throw new Error(
        "Runway nao retornou identificador da tarefa."
      );
    }

    return {
      provider: "runway",
      externalTaskId: String(task.id),
      mediaType: "video",
      status: "PENDING",
    };
  }

  async retrieveGeneration({
    externalTaskId,
  }) {
    this.ensureConfigured();

    const taskId = String(
      externalTaskId || ""
    ).trim();

    if (!taskId) {
      throw new Error(
        "Identificador da tarefa da Runway nao informado."
      );
    }

    if (
      !this.client ||
      !this.client.tasks ||
      typeof this.client.tasks.retrieve !== "function"
    ) {
      throw new Error(
        "Cliente da Runway nao configurado para recuperar geracao."
      );
    }

    const task = await this.client.tasks.retrieve(taskId);

    return {
      provider: "runway",
      externalTaskId: taskId,
      status: String(task?.status || "").toUpperCase(),
      output: Array.isArray(task?.output)
        ? task.output
        : [],
    };
  }
}
