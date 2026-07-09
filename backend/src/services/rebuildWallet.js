import Ledger from "../../models/Ledger.js";
import Wallet from "../../models/Wallet.js";

export async function rebuildWallet(
    userId,
    session = null
) {
 const ledger = await Ledger.find({ userId })
    .session(session)
    .lean();

  console.log("📦 LEDGER TOTAL:", ledger.length);

let credit = 0;
let confirmedDebit = 0;
let pendingDebit = 0;

  for (const l of ledger) {
    const type = l.type?.toLowerCase();
    const status = l.status?.toLowerCase();

    if (!["confirmed", "pending"].includes(status)) {
      continue;
    }

 if (type === "credit") {
  credit += Number(l.amount || 0);
}

if (type === "debit") {

  if (status === "confirmed") {
    confirmedDebit += Number(l.amount || 0);
  }

  if (status === "pending") {
    pendingDebit += Number(l.amount || 0);
  }

}
  }

 const availableBalance = Number(
   Math.max(
      0,
      credit - confirmedDebit - pendingDebit
   ).toFixed(2)
);

const lockedBalance = Number(
   Math.max(
      0,
      pendingDebit
   ).toFixed(2)
);

  console.log("💰 CREDIT:", credit);
  console.log("💸 CONFIRMED:", confirmedDebit);
  console.log("🔒 LOCKED:", lockedBalance);
  console.log("📊 BALANCE:", availableBalance);

 const wallet = await Wallet.findOneAndUpdate(
  { userId },
  {
    $set: {
      availableBalance,
      lockedBalance,
      totalEarned: credit,
    },
  },
  {
    upsert: true,
    new: true,
    session,
  }
);
  return wallet;
}