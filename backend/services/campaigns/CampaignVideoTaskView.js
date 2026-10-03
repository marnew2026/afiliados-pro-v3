export async function campaignVideoTaskView(task, getJob) {
  let status = task.status;
  let lastError = task.lastError;
  // A primeira tentativa pode falhar enquanto BullMQ aguarda a repeticao automatica.
  // A interface so apresenta falha final quando a fila tambem terminou em falha.
  if (status === "failed") {
    const job = await getJob(String(task._id));
    const state = job ? await job.getState() : "failed";
    if (["waiting", "delayed", "prioritized", "waiting-children"].includes(state)) { status = "queued"; lastError = ""; }
    else if (state === "active") { status = "processing"; lastError = ""; }
  }
  return { id: String(task._id), status, campaignId: String(task.campaignId),
    title: task.product?.title || null, mediaAssetId: task.mediaAssetId ? String(task.mediaAssetId) : null,
    lastError, updatedAt: task.updatedAt };
}
