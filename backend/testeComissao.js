import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import crypto from "crypto";
import User from "./models/User.js";
import Ledger from "./models/Ledger.js";

import { rebuildWallet } from "./src/services/rebuildWallet.js";

async function main() {
  try {
    console.log("================================");
    console.log("TESTE DE COMISSÃO");
    console.log("================================");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Mongo conectado");

    // coloque aqui o seu usuário
    const userId = "6a341138e88c46dc47af06f5";

    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ Usuário não encontrado");
      process.exit(0);
    }

    console.log("Usuário:");
    console.log(user.email);

    const amount = 15.50;

const saleId = "VENDA-000002";

const exists = await Ledger.findOne({
    referenceId: saleId,
    type: "credit",
});

if (exists) {
    console.log("⚠️ Venda já processada.");
    return;
}

const ledger = await Ledger.create({
    userId,
    type: "credit",
    source: "campaign",
    amount,
    status: "confirmed",
    referenceId: saleId,
    description: "Comissão da venda",
});

console.log("✅ Ledger criado");
console.log(ledger._id.toString());

const wallet = await rebuildWallet(userId);
    console.log("================================");
    console.log("WALLET");
    console.log(wallet);
    console.log("================================");

    console.log("✅ TESTE FINALIZADO");

    process.exit(0);

  } catch (err) {

    console.error(err);

    process.exit(1);
  }
}

main();