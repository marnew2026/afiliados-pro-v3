import Ledger from "../models/Ledger.js";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { fixMoney } from "../utils/money.js";

export async function addCredit({
  userId,
  amount,
  referenceId,
  source = "campaign",
  description = "",
  status = "confirmed",
  metadata = {},
}) {
  const valor = fixMoney(amount);

  console.log("💰 ADD CREDIT INICIO");
  console.log("✅ Ledger gravado");

  await safeCreateLedger({
    userId,
    type: "credit",
    amount: valor,
    source,
    referenceId,
    description,
    status,
    metadata,
  });

  console.log("✅ Ledger gravado");
}
 
export async function addDebit({
  userId,
  amount,
  referenceId,
  source = "withdraw",
  description = "",
  status = "pending",
  metadata = {},
}) {
await safeCreateLedger({
    userId,
    type: "debit",
    amount,
    source,
    referenceId,
    description,
    status,
    metadata,
  });
}
  

export async function getBalance(userId) {
  const credits = await Ledger.aggregate([
    { $match: { userId, type: "credit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const debits = await Ledger.aggregate([
    { $match: { userId, type: "debit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const creditTotal = credits[0]?.total || 0;
  const debitTotal = debits[0]?.total || 0;

return fixMoney(creditTotal - debitTotal);
}