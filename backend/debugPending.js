import "dotenv/config";

import connectDB from "./config/db.js";
import Withdraw from "./models/Withdraw.js";

await connectDB();

const withdraws = await Withdraw.find({
  status: {
    $in: [
      "pending",
      "processing",
      "sent",
    ],
  },
});

console.table(
  withdraws.map(w => ({
    id: w._id.toString(),
    status: w.status,
    withdrawId: w.withdrawId,
    asaasTransferId: w.asaasTransferId,
    asaasStatus: w.asaasStatus,
    createdAt: w.createdAt,
  }))
);

process.exit();