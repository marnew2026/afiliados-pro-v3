import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  name: String,
  plan: {
    type: String,
    enum: ["FREE", "PRO", "ENTERPRISE"],
    default: "FREE"
  },

  status: {
    type: String,
    default: "ACTIVE"
  },

  stripeCustomerId: String,

  limits: {
    postsPerDay: Number,
    concurrency: Number
  }
});

export default mongoose.model("Tenant", TenantSchema);