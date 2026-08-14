import Ledger from "../../models/Ledger.js";
import Wallet from "../../models/Wallet.js";
import { toCents, toReais } from "../../utils/money.js";
export async function rebuildWallet(
  userId,
  session = null
) {
  console.log("🔥 rebuildWallet EXECUTOU");
  console.log("USER:", userId);
  console.log("######## REBUILD WALLET V4 ########");

  const ledger = await Ledger.find({ userId })
    .session(session)
    .lean();

  console.log("📦 LEDGER TOTAL:", ledger.length);

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

  console.log("=================================");
  console.log("🔥 REBUILD WALLET V4");
  console.log("USER:", userId);
  console.log("📦 LEDGER TOTAL:", ledger.length);
  console.log("💰 CREDIT CENTS:", creditCents);
  console.log("💸 DEBIT CONFIRMADO CENTS:", confirmedDebitCents);
  console.log("🔒 DEBIT PENDENTE CENTS:", pendingDebitCents);
  console.log("💰 CREDIT TOTAL:", credit.toFixed(2));
  console.log("💸 SAQUES CONFIRMADOS:", confirmedDebit.toFixed(2));
  console.log("🔒 SAQUES BLOQUEADOS:", pendingDebit.toFixed(2));
  console.log("💵 SALDO DISPONÍVEL:", availableBalance.toFixed(2));
  console.log("=================================");

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

  console.log("######## UPDATE EXECUTADO ########");

  console.log({
    userId: wallet.userId,
    availableBalance: Number(wallet.availableBalance).toFixed(2),
    lockedBalance: Number(wallet.lockedBalance).toFixed(2),
    totalEarned: Number(wallet.totalEarned).toFixed(2),
    totalWithdrawn: Number(wallet.totalWithdrawn).toFixed(2),
  });

  console.log("=============================");

  return wallet;
}