import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    pixKey: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "queued",
        "processing",
        "paid",
        "failed",
      ],
     default: "paid",
    },

    externalId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
WithdrawSchema.pre("save", function(next) {
  console.log(
    "MONGOOSE SAVE =>",
    this._id,
    this.status
  );

  next();
});
export default mongoose.model("Withdraw", WithdrawSchema);