import mongoose from "mongoose";
import dotenv from "dotenv";

import Ledger from "../../models/Ledger.js";

dotenv.config({
  path: "./.env",
});



await mongoose.connect(process.env.MONGO_URI);

console.log("================================");
console.log("CORRIGINDO LEDGER...");
console.log("================================");

const registros = await Ledger.find();

let total = 0;

for (const item of registros) {

    item.amount = Number(
        Number(item.amount || 0).toFixed(2)
    );

    await item.save();

    total++;

    if (total % 100 === 0) {
        console.log("Corrigidos:", total);
    }
}

console.log("===============================");
console.log("TOTAL CORRIGIDOS:", total);
console.log("===============================");

process.exit();