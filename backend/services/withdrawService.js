import Ledger from "../models/Ledger.js";
import Withdraw from "../models/Withdraw.js";
import crypto from "crypto";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
export async function createWithdraw(userId, amount, pixKey) {
  const referenceId = crypto.randomUUID();

  // 🔒 1. cria ledger DEBIT primeiro (RESERVA SALDO)
 await safeCreateLedger({
    userId,
    amount,
    type: "debit",
    source: "withdraw",
    referenceId,
    status: "pending",
    metadata: { pixKey }
});

  // 📦 2. fila de saque
  const withdraw = await Withdraw.create({
    userId,
    amount,
    pixKey,
    status: "pending",
    referenceId
  });

  return withdraw;
}