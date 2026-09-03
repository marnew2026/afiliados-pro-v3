import mongoose from "mongoose";

const mediaGenerationTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      enum: ["runway"],
      required: true,
    },

    externalTaskId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    mediaType: {
      type: String,
      enum: ["video"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "RUNNING",
        "PROCESSING",
        "SUCCEEDED",
        "FAILED",
        "CANCELED",
      ],
      default: "PENDING",
      required: true,
      index: true,
    },

    processingStartedAt: {
      type: Date,
      default: null,
      index: true,
    },

    mediaAssetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MediaAsset",
      default: null,
    },

    lastError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

mediaGenerationTaskSchema.index({
  provider: 1,
  externalTaskId: 1,
});

mediaGenerationTaskSchema.index({
  status: 1,
  updatedAt: 1,
});

export const MediaGenerationTask =
  mongoose.models.MediaGenerationTask ||
  mongoose.model(
    "MediaGenerationTask",
    mediaGenerationTaskSchema
  );