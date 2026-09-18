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
      enum: ["telegram", "instagram", "facebook", "tiktok", "kwai"],
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
      contentType: {
        type: String,
        enum: ["text", "short_video"],
        default: "text",
      },

      deliveryMode: {
        type: String,
        enum: ["direct", "draft"],
        default: "direct",
      },

      privacyLevel: {
        type: String,
        enum: ["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "FOLLOWER_OF_CREATOR", "SELF_ONLY"],
        default: "SELF_ONLY",
      },

      disableComment: { type: Boolean, default: true },
      disableDuet: { type: Boolean, default: true },
      disableStitch: { type: Boolean, default: true },

      caption: {
        type: String,
        default: "",
        trim: true,
      },

      hashtags: {
        type: [String],
        default: [],
      },

      cta: {
        type: String,
        default: "",
        trim: true,
      },

      media: {
        type: {
          type: String,
          enum: ["video"],
          default: undefined,
        },

        aspectRatio: {
          type: String,
          default: null,
        },

        required: {
          type: Boolean,
          default: false,
        },

        assetUrl: {
          type: String,
          default: "",
          trim: true,
        },
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
        "delivered",
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
