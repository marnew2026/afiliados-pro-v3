import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  productId: String,

  productName: String,

  producerId: String,

  affiliateId: String,

  buyerEmail: String,

  amount: Number,

  commission: Number,

  stripeSessionId: String,

  status: {
    type: String,
    default: "paid",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Sale", SaleSchema);