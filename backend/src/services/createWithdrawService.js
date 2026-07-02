import Wallet from "../models/Wallet.js";
import Withdraw from "../models/Withdraw.js";
import { withLock } from "../lib/lock.js";
import { safeCreateLedger } from "./safeCreateLedger.js";
import { rebuildWallet } from "./rebuildWallet.js";

export async function createWithdraw(
  userId,
  amount,
  pixKey
) {
  return await withLock(userId, async () => {

    const wallet = await Wallet.findOne({ userId });

    if (!wallet || wallet.availableBalance < amount) {
      throw new Error("Saldo insuficiente");
    }

    const withdraw = await Withdraw.create({
      userId,
      amount,
      pixKey,
      status: "processing",
    });

    await safeCreateLedger({
      userId,
      type: "debit",
      amount,
      status: "pending",
      referenceId: withdraw._id.toString(),
      source: "withdraw",
    });

    await rebuildWallet(userId);

    return withdraw;
  });
}