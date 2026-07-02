import { safeCreateLedger } from "./safeCreateLedger.js";
import { rebuildWallet } from "./rebuildWallet.js";

export async function registerSale({
  userId,
  amount,
  referenceId,
}) {
  await safeCreateLedger({
    userId,
    type: "credit",
    amount,
    status: "confirmed",
    referenceId,
    source: "sale",
  });

  await rebuildWallet(userId);
}