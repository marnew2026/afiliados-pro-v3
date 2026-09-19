import mongoose from "mongoose";

const FoundingCohortStateSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "founding-users-v1",
    },
    claimedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    limit: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FoundingCohortState", FoundingCohortStateSchema);
