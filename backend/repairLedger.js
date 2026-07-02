import "dotenv/config";
import mongoose from "mongoose";

import Ledger from "./models/Ledger.js";
import Withdraw from "./models/Withdraw.js";

import { rebuildWallet } from "./src/services/rebuildWallet.js";

await mongoose.connect(process.env.MONGO_URI);

const ledgers = await Ledger.find({
    type: "debit",
    status: "pending"
});

for (const l of ledgers) {

    const w = await Withdraw.findOne({
        withdrawId: l.referenceId
    });

    if (!w) {

        console.log("SEM WITHDRAW:", l.referenceId);

        await Ledger.updateOne(
            { _id: l._id },
            {
                $set: {
                    status: "failed"
                }
            }
        );

        continue;
    }

    if (w.status === "failed") {

        console.log("FAILED:", l.referenceId);

        await Ledger.updateOne(
            { _id: l._id },
            {
                $set: {
                    status: "failed"
                }
            }
        );

        continue;
    }

    if (w.status === "paid") {

        console.log("PAID:", l.referenceId);

        await Ledger.updateOne(
            { _id: l._id },
            {
                $set: {
                    status: "confirmed"
                }
            }
        );
    }
}

await rebuildWallet("6a341138e88c46dc47af06f5");

console.log("REPARADO");

process.exit();