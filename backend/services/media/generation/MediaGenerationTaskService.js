import {
  MediaGenerationTask,
} from "../../../models/MediaGenerationTask.js";

export async function createGenerationTask({
  userId,
  campaignId,
  generationKey,
  provider,
  externalTaskId = null,
  mediaType,
}) {
  return MediaGenerationTask.create({
    userId,
    campaignId,
    generationKey,
    provider,
    externalTaskId,
    mediaType,
    status: "PENDING",
  });
}

export async function findActiveGenerationTaskByKey({
  generationKey,
}) {
  return MediaGenerationTask.findOne({
    generationKey,
    status: {
      $in: [
        "PENDING",
        "RUNNING",
        "PROCESSING",
      ],
    },
  });
}

export async function reserveGenerationTask({
  userId,
  campaignId,
  generationKey,
  provider,
  mediaType,
  taskCreator = createGenerationTask,
  activeTaskFinder = findActiveGenerationTaskByKey,
}) {
  try {
    const generationTask =
      await taskCreator({
        userId,
        campaignId,
        generationKey,
        provider,
        externalTaskId: null,
        mediaType,
      });

    return {
      reserved: true,
      generationTask,
    };
  } catch (error) {
    if (error?.code !== 11000) {
      throw error;
    }

    const existingGenerationTask =
      await activeTaskFinder({
        generationKey,
      });

    if (!existingGenerationTask) {
      throw error;
    }

    return {
      reserved: false,
      generationTask: existingGenerationTask,
    };
  }
}

export async function attachGenerationProviderTask({
  taskId,
  externalTaskId,
  status = "PENDING",
}) {
  if (!taskId) {
    throw new Error(
      "Tarefa de geracao para vinculo do provider nao informada."
    );
  }

  const cleanExternalTaskId = String(
    externalTaskId || ""
  ).trim();

  if (!cleanExternalTaskId) {
    throw new Error(
      "Identificador externo da geracao nao informado."
    );
  }

  return MediaGenerationTask.findByIdAndUpdate(
    taskId,
    {
      $set: {
        externalTaskId: cleanExternalTaskId,
        status,
        lastError: null,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
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
        processingStartedAt: null,
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
        processingStartedAt: null,
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
        processingStartedAt: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
export async function reclaimStaleGenerationTask({
  taskId,
  staleBefore,
}) {
  if (!(staleBefore instanceof Date)) {
    throw new Error(
      "Data limite para reclaim da geracao nao informada."
    );
  }

  return MediaGenerationTask.findOneAndUpdate(
    {
      _id: taskId,
      status: "PROCESSING",
      mediaAssetId: null,
      processingStartedAt: {
        $lt: staleBefore,
      },
    },
    {
      $set: {
        processingStartedAt: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
