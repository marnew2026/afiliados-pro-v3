import mongoose from "mongoose";

const ConversionSchema = new mongoose.Schema({
  userId: String,
  campaignId: String,
  clickId: String,
  value: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Conversion", ConversionSchema);