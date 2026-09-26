import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
  // legado (pode ser removido futuramente)

  name: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
password: {
  type: String,
  required: true,
},

 
  tokenVersion: {
    type: Number,
    default: 0,
  },

  plan: {
    type: String,
    enum: ["FREE", "PRO", "SCALE"],
    default: "FREE",
  },

  isPro: {
    type: Boolean,
    default: false,
  },

  accessSource: {
    type: String,
    enum: ["FREE", "FOUNDER_TRIAL", "STRIPE", "LEGACY"],
    default: "FREE",
  },

  proAccessEndsAt: {
    type: Date,
    default: null,
  },

  founderTrialGrantedAt: {
    type: Date,
    default: null,
  },

  founderTrialClaimNumber: {
    type: Number,
    default: null,
  },

  stripeCustomerId: {
    type: String,
    default: null,
  },

  stripeSubscriptionId: {
    type: String,
    default: null,
  },

  stripeSubscriptionStatus: {
    type: String,
    default: null,
  },

  stripeLastCheckoutSessionId: {
    type: String,
    default: null,
  },

  stripeLastEventId: {
    type: String,
    default: null,
  },

  status: {
    type: String,
    enum: ["pending", "processing", "done", "failed"],
    default: "pending",
  },

  lastProcessedAt: {
    type: Date,
    default: null,
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("User", UserSchema);
