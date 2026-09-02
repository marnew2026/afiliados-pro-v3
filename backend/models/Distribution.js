import mongoose from "mongoose";

const DistributionSchema = new mongoose.Schema(
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

    channel: {
      type: String,
      enum: ["telegram", "instagram"],
      required: true,
      default: "telegram",
    },

    source: {
      type: String,
      enum: ["manual", "autopilot"],
      default: "manual",
      index: true,
    },

    destinationId: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      title: {
        type: String,
        default: "",
        trim: true,
      },

      text: {
        type: String,
        required: true,
        trim: true,
      },

      trackingUrl: {
        type: String,
        default: "",
        trim: true,
      },
    },

    scheduledAt: {
      type: Date,
      default: null,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "scheduled",
        "processing",
        "published",
        "failed",
        "cancelled",
      ],
      default: "draft",
      index: true,
    },

    externalMessageId: {
      type: String,
      default: null,
    },

    attempts: {
      type: Number,
      default: 0,
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

DistributionSchema.index({
  userId: 1,
  status: 1,
  scheduledAt: 1,
});

export default mongoose.model("Distribution", DistributionSchema);