import mongoose from "mongoose";
import dotenv from "dotenv";

import Wallet from "../../models/Wallet.js";
import { rebuildWallet } from "../services/rebuildWallet.js";

dotenv.config({
  path: "./.env",
});

await mongoose.connect(process.env.MONGO_URI);

console.log("==================================");
console.log("REBUILD DE TODAS AS WALLETS");
console.log("==================================");

const wallets = await Wallet.find();

for (const wallet of wallets) {

    console.log("🔄 Reconstruindo wallet");

    await rebuildWallet(wallet.userId.toString());

}

console.log("==================================");
console.log("TODAS AS WALLETS FORAM RECONSTRUÍDAS");
console.log("==================================");

process.exit();