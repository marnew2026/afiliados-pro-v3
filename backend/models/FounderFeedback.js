import mongoose from "mongoose";

const FounderFeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    wouldRecommend: {
      type: Boolean,
      required: true,
    },
    mostValuable: {
      type: String,
      enum: ["campaigns", "kael", "distribution", "dashboard", "withdrawals", "other"],
      required: true,
    },
    biggestDifficulty: {
      type: String,
      enum: ["none", "onboarding", "campaigns", "connections", "publishing", "understanding_results", "other"],
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "reviewed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FounderFeedback", FounderFeedbackSchema);
