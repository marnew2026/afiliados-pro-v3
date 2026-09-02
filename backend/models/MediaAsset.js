import mongoose from "mongoose";

const MediaAssetSchema = new mongoose.Schema(
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

    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "ready", "failed"],
      default: "pending",
      index: true,
    },

    assetUrl: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      enum: ["campaign", "kael", "upload"],
      required: true,
    },

    lastError: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

MediaAssetSchema.index({
  userId: 1,
  campaignId: 1,
  status: 1,
});

export default mongoose.model(
  "MediaAsset",
  MediaAssetSchema
);
