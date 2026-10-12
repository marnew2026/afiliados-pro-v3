import mongoose from "mongoose";

const TuaiEventSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TuaiProduct",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["impression", "click", "save", "conversion"],
      required: true,
      index: true,
    },
    sessionHash: { type: String, required: true, index: true },
    value: { type: Number, default: 0, min: 0 },
    trusted: { type: Boolean, default: false },
    context: {
      source: { type: String, default: "tuai" },
      placement: { type: String, default: "feed" },
    },
  },
  { timestamps: true }
);

TuaiEventSchema.index({ productId: 1, type: 1, sessionHash: 1, createdAt: -1 });

export default mongoose.model("TuaiEvent", TuaiEventSchema);
