import mongoose from "mongoose";

const FounderActivityDaySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    day: {
      type: Date,
      required: true,
      index: true,
    },
    requestCount: {
      type: Number,
      min: 0,
    },
    firstSeenAt: {
      type: Date,
      required: true,
    },
    lastSeenAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

FounderActivityDaySchema.index({ userId: 1, day: 1 }, { unique: true });

export default mongoose.model("FounderActivityDay", FounderActivityDaySchema);
