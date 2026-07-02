import "dotenv/config";
import mongoose from "mongoose";

import Ledger from "./models/Ledger.js";
import Withdraw from "./models/Withdraw.js";

await mongoose.connect(process.env.MONGO_URI);

const pending = await Ledger.find({
    type: "debit",
    status: "pending"
});

for (const l of pending) {

    const w = await Withdraw.findOne({
        withdrawId: l.referenceId
    });

    console.log({
        ledger: l.referenceId,
        ledgerStatus: l.status,
        withdrawStatus: w?.status,
        amount: l.amount
    });

}

process.exit();