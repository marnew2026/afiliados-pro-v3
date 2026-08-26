import Ledger from "../../models/Ledger.js";
import Wallet from "../../models/Wallet.js";
import { toCents, toReais } from "../../utils/money.js";
export async function rebuildWallet(
  userId,
  session = null
) {
  console.log("🔥 rebuildWallet EXECUTOU");
  
 

  const ledger = await Ledger.find({ userId })
    .session(session)
    .lean();

  

  // Trabalhamos internamente em CENTAVOS
 let creditCents = 0;
let confirmedDebitCents = 0;
let pendingDebitCents = 0;

for (const l of ledger) {
  const type = String(l.type || "").toLowerCase();
  const status = String(l.status || "").toLowerCase();

  if (!["confirmed", "pending"].includes(status)) {
    continue;
  }

  const amountCents = toCents(l.amount || 0);

  if (type === "credit") {
    creditCents += amountCents;
  }

  if (type === "debit") {
    if (status === "confirmed") {
      confirmedDebitCents += amountCents;
    }

    if (status === "pending") {
      pendingDebitCents += amountCents;
    }
  }
}

// Conversão final para reais
const credit = toReais(creditCents);
const confirmedDebit = toReais(confirmedDebitCents);
const pendingDebit = toReais(pendingDebitCents);

const availableBalance = toReais(
  Math.max(
    0,
    creditCents -
      confirmedDebitCents -
      pendingDebitCents
  )
);

const lockedBalance = toReais(
  Math.max(0, pendingDebitCents)
);

 

  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    {
      $set: {
        availableBalance,
        lockedBalance,
        totalEarned: credit,
        totalWithdrawn: confirmedDebit,
      },
    },
    {
      upsert: true,
      new: true,
      session,
    }
  );

console.log("✅ WALLET REBUILD CONCLUÍDO");

  return wallet;
}