import mongoose from "mongoose";

const TuaiProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, default: "", trim: true, maxlength: 2000 },
    imageUrl: { type: String, default: "", trim: true },
    category: { type: String, default: "geral", trim: true, index: true },
    sourcePlatform: { type: String, required: true, trim: true, index: true },
    sourceProductId: { type: String, default: "", trim: true },
    affiliateUrl: { type: String, required: true, trim: true },
    price: { type: Number, default: null, min: 0 },
    currency: { type: String, default: "BRL", uppercase: true, maxlength: 3 },
    active: { type: Boolean, default: true, index: true },
    trustScore: { type: Number, default: 70, min: 0, max: 100 },
    metrics: {
      impressions: { type: Number, default: 0, min: 0 },
      clicks: { type: Number, default: 0, min: 0 },
      saves: { type: Number, default: 0, min: 0 },
      conversions: { type: Number, default: 0, min: 0 },
      revenue: { type: Number, default: 0, min: 0 },
      lastEventAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

TuaiProductSchema.index(
  { sourcePlatform: 1, sourceProductId: 1 },
  {
    unique: true,
    partialFilterExpression: { sourceProductId: { $type: "string", $gt: "" } },
  }
);

export default mongoose.model("TuaiProduct", TuaiProductSchema);
