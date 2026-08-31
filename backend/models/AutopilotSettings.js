import mongoose from "mongoose";

const AutopilotSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    enabled: {
      type: Boolean,
      default: false,
    },

    mode: {
      type: String,
      enum: ["assistido", "automatico"],
      default: "assistido",
    },

    channels: {
      type: [String],
      enum: ["telegram"],
      default: ["telegram"],
    },

    dailyLimit: {
      type: Number,
      default: 2,
      min: 1,
      max: 10,
    },

    minIntervalMinutes: {
      type: Number,
      default: 180,
      min: 30,
    },

    lastRunAt: {
      type: Date,
      default: null,
    },
    
    runLockedUntil: {
      type: Date,
      default: null,
    },

    runLockToken: {
      type: String,
      default: null,
      select: false,
    },

    lastPublishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "AutopilotSettings",
  AutopilotSettingsSchema
);