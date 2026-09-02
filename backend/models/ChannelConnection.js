import mongoose from "mongoose";

const ChannelConnectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      enum: ["telegram", "instagram"],
      required: true,
      default: "telegram",
    },

    destinationId: {
      type: String,
      required: true,
      trim: true,
    },

    destinationName: {
      type: String,
      default: "",
      trim: true,
    },

    credential: {
      type: String,
      required: true,
      select: false,
    },

    active: {
      type: Boolean,
      default: true,
    },

    connectedAt: {
      type: Date,
      default: Date.now,
    },

    lastUsedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ChannelConnectionSchema.index(
  {
    userId: 1,
    provider: 1,
    destinationId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "ChannelConnection",
  ChannelConnectionSchema
);