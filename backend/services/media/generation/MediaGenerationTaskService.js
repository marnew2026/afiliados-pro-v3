import {
  MediaGenerationTask,
} from "../../../models/MediaGenerationTask.js";

export async function createGenerationTask({
  userId,
  campaignId,
  provider,
  externalTaskId,
  mediaType,
}) {
  return MediaGenerationTask.create({
    userId,
    campaignId,
    provider,
    externalTaskId,
    mediaType,
    status: "PENDING",
  });
}

export async function updateGenerationTaskStatus({
  taskId,
  status,
}) {
  return MediaGenerationTask.findByIdAndUpdate(
    taskId,
    {
      $set: {
        status,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function markGenerationTaskSucceeded({
  taskId,
  mediaAssetId,
}) {
  return MediaGenerationTask.findByIdAndUpdate(
    taskId,
    {
      $set: {
        status: "SUCCEEDED",
        mediaAssetId,
        lastError: null,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function markGenerationTaskFailed({
  taskId,
  error,
}) {
  const lastError = String(
    error?.message ||
    error ||
    "Falha desconhecida na geracao de midia."
  ).trim();

  return MediaGenerationTask.findByIdAndUpdate(
    taskId,
    {
      $set: {
        status: "FAILED",
        lastError,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
export async function claimGenerationTaskForProcessing({
  taskId,
}) {
  return MediaGenerationTask.findOneAndUpdate(
    {
      _id: taskId,
      status: {
        $in: [
          "PENDING",
          "RUNNING",
        ],
      },
      mediaAssetId: null,
    },
    {
      $set: {
        status: "PROCESSING",
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
