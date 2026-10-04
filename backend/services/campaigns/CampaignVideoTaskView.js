import MediaAsset from "../../models/MediaAsset.js";

export async function campaignVideoTaskView(task, getJob, assetModel = MediaAsset) {
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
  let previewUrl = null;
  if (status === "ready" && task.mediaAssetId) {
    const asset = await assetModel.findOne({ _id: task.mediaAssetId, userId: task.userId,
      campaignId: task.campaignId, type: "video", status: "ready" });
    if (asset?.assetUrl) {
      try {
        const url = new URL(asset.assetUrl);
        if (url.protocol === "https:" && !url.username && !url.password) previewUrl = url.href;
      } catch { /* Material sem URL valida nao oferece pre-visualizacao. */ }
    }
  }
  const movie = task.movie?.plan ? { provider: task.movie.provider, phase: task.moviePhase || "",
    totalScenes: task.movie.plan.scenes.length,
    completedScenes: (task.movie.scenes || []).filter(row => row?.state === "ready").length,
    disclosure: task.movie.plan.disclosure } : null;
  return { movie, previewOnly: task.previewOnly === true, previewUrl, id: String(task._id), status, campaignId: String(task.campaignId),
    title: task.product?.title || null, mediaAssetId: task.mediaAssetId ? String(task.mediaAssetId) : null,
    lastError, updatedAt: task.updatedAt };
}
