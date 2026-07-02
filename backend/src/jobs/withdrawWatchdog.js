import Withdraw from "../../models/Withdraw.js";
import Ledger from "../../models/Ledger.js";
import { rebuildWallet } from "../services/rebuildWallet.js";

export async function withdrawWatchdog() {
  try {
    console.log("🩺 WITHDRAW WATCHDOG");

    const limit = new Date(Date.now() - 5 * 60 * 1000);

    const stuck = await Withdraw.find({
      status: "processing",
      processingAt: {
        $lt: limit,
      },
    });

    if (!stuck.length) {
      console.log("✅ Nenhum saque preso.");
      return;
    }

    for (const withdraw of stuck) {
      console.log(
        "⚠️ Recuperando saque:",
        withdraw._id.toString()
      );

      await Withdraw.updateOne(
        {
          _id: withdraw._id,
          status: "processing",
        },
        {
          $set: {
            status: "pending",
          },
          $unset: {
            processingAt: "",
          },
        }
      );

      await Ledger.updateOne(
        {
          referenceId: withdraw.withdrawId,
          type: "debit",
        },
        {
          $set: {
            status: "pending",
          },
        }
      );

      await rebuildWallet(withdraw.userId);
    }

    console.log("✅ WATCHDOG FINALIZADO");
  } catch (err) {
    console.error("WATCHDOG ERROR");
    console.error(err);
  }
}