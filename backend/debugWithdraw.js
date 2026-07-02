import "dotenv/config";
import mongoose from "mongoose";
import Withdraw from "./models/Withdraw.js";

await mongoose.connect(process.env.MONGO_URI);

const withdraws = await Withdraw.find({
    userId: "6a341138e88c46dc47af06f5"
}).sort({ createdAt: 1 });

console.table(
  withdraws.map(w => ({
    id: w._id.toString(),
    status: w.status,
    amount: w.amount,
    withdrawId: w.withdrawId,
  }))
);

process.exit();