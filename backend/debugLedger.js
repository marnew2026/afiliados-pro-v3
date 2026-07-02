import "dotenv/config";
import mongoose from "mongoose";
import Ledger from "./models/Ledger.js";

await mongoose.connect(process.env.MONGO_URI);

const ledger = await Ledger.find({
    userId: "6a341138e88c46dc47af06f5"
}).sort({ createdAt: 1 });

console.table(
    ledger.map(l => ({
        id: l._id.toString(),
        type: l.type,
        status: l.status,
        amount: l.amount,
        referenceId: l.referenceId,
        source: l.source,
        createdAt: l.createdAt
    }))
);

process.exit();