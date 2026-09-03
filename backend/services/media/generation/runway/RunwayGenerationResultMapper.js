export function mapRunwayGenerationResult({
  externalTaskId,
  task,
}) {
  const taskId = String(
    externalTaskId || ""
  ).trim();

  if (!taskId) {
    throw new Error(
      "Identificador da tarefa da Runway nao informado."
    );
  }

  const status = String(
    task?.status || ""
  ).toUpperCase();

  if (status !== "SUCCEEDED") {
    throw new Error(
      "Tarefa da Runway ainda nao concluida com sucesso."
    );
  }

  const sourceUrl = Array.isArray(task?.output)
    ? String(task.output[0] || "").trim()
    : "";

  if (!sourceUrl) {
    throw new Error(
      "Runway nao retornou URL do video gerado."
    );
  }

  return {
    provider: "runway",
    externalTaskId: taskId,
    mediaType: "video",
    sourceUrl,
    extension: "mp4",
    contentType: "video/mp4",
  };
}
