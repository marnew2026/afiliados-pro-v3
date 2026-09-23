import "dotenv/config";
import mongoose from "mongoose";
import Ledger from "../models/Ledger.js";
import Wallet from "../models/Wallet.js";
import User from "../models/User.js";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não encontrada.");
}

function toCents(value) {
  return Math.round(Number(value || 0) * 100);
}

function toReais(cents) {
  return Number((cents / 100).toFixed(2));
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function classify(entry) {
  const type = normalize(entry.type);
  const source = normalize(entry.source);
  const description = normalize(entry.description);

  if (
    type === "credit" &&
    source === "campaign" &&
    description === "clique em campanha"
  ) {
    return "CLICK_AUTO";
  }

  if (
    type === "credit" &&
    source === "campaign" &&
    description === "clique manual"
  ) {
    return "CLICK_MANUAL";
  }

  if (
    type === "credit" &&
    (source === "sale" || description.includes("comissao"))
  ) {
    return "COMMISSION_OR_SALE";
  }

  if (type === "credit" && source === "adjustment") {
    return "ADJUSTMENT";
  }

  if (type === "debit" && source === "withdraw") {
    return "WITHDRAW";
  }

  return "OTHER";
}

await mongoose.connect(process.env.MONGO_URI);

try {
  const [entries, wallets, users] = await Promise.all([
    Ledger.find({}).sort({ createdAt: 1 }).lean(),
    Wallet.find({}).lean(),
    User.find({}).select("_id email name").lean(),
  ]);

  const walletsByUser = new Map(
    wallets.map((wallet) => [String(wallet.userId), wallet])
  );

  const usersById = new Map(
    users.map((user) => [String(user._id), user])
  );

  const classifications = new Map();
  const perUser = new Map();

  for (const entry of entries) {
    const userId = String(entry.userId);
    const category = classify(entry);
    const status = normalize(entry.status);
    const amountCents = toCents(entry.amount);
    const classificationKey =
      `${category}|${entry.type}|${entry.source}|${status}`;

    if (!classifications.has(classificationKey)) {
      classifications.set(classificationKey, {
        category,
        type: entry.type,
        source: entry.source,
        status,
        entries: 0,
        totalCents: 0,
        users: new Set(),
      });
    }

    const classification = classifications.get(classificationKey);
    classification.entries += 1;
    classification.totalCents += amountCents;
    classification.users.add(userId);

    if (!perUser.has(userId)) {
      perUser.set(userId, {
        userId,
        confirmedCreditsCents: 0,
        confirmedDebitsCents: 0,
        pendingDebitsCents: 0,
        clickAutoCents: 0,
        clickManualCents: 0,
        legitimateConfirmedCreditsCents: 0,
      });
    }

    const summary = perUser.get(userId);

    if (entry.type === "credit" && status === "confirmed") {
      summary.confirmedCreditsCents += amountCents;

      if (category === "CLICK_AUTO") {
        summary.clickAutoCents += amountCents;
      } else if (category === "CLICK_MANUAL") {
        summary.clickManualCents += amountCents;
      } else {
        summary.legitimateConfirmedCreditsCents += amountCents;
      }
    }

    if (entry.type === "debit" && status === "confirmed") {
      summary.confirmedDebitsCents += amountCents;
    }

    if (entry.type === "debit" && status === "pending") {
      summary.pendingDebitsCents += amountCents;
    }
  }

  const classificationReport = [...classifications.values()]
    .map((item) => ({
      category: item.category,
      type: item.type,
      source: item.source,
      status: item.status,
      entries: item.entries,
      total: toReais(item.totalCents),
      affectedUsers: item.users.size,
    }))
    .sort((a, b) =>
      `${a.category}|${a.status}`.localeCompare(
        `${b.category}|${b.status}`
      )
    );

  const userReport = [...perUser.values()].map((summary) => {
    const user = usersById.get(summary.userId);
    const wallet = walletsByUser.get(summary.userId);

    const suspectClickCents =
      summary.clickAutoCents + summary.clickManualCents;

    const correctedAvailableCents = Math.max(
      0,
      summary.legitimateConfirmedCreditsCents -
        summary.confirmedDebitsCents -
        summary.pendingDebitsCents
    );

    const storedAvailableCents = toCents(
      wallet?.availableBalance || 0
    );

    return {
      userId: summary.userId,
      email: user?.email || "(não localizado)",
      confirmedCredits: toReais(summary.confirmedCreditsCents),
      clickAuto: toReais(summary.clickAutoCents),
      clickManual: toReais(summary.clickManualCents),
      suspectClickCredits: toReais(suspectClickCents),
      legitimateConfirmedCredits: toReais(
        summary.legitimateConfirmedCreditsCents
      ),
      confirmedWithdrawals: toReais(
        summary.confirmedDebitsCents
      ),
      pendingWithdrawals: toReais(
        summary.pendingDebitsCents
      ),
      storedAvailableBalance: toReais(storedAvailableCents),
      theoreticalCorrectedAvailable: toReais(
        correctedAvailableCents
      ),
      possibleExcessAvailable: toReais(
        Math.max(0, storedAvailableCents - correctedAvailableCents)
      ),
    };
  });

  console.log("\n===== CLASSIFICAÇÃO HISTÓRICA DO LEDGER =====");
  console.table(classificationReport);

  console.log("\n===== IMPACTO FINANCEIRO POR USUÁRIO =====");
  console.table(userReport);

  console.log(
    "\nAUDITORIA SOMENTE LEITURA: nenhum documento foi alterado."
  );
} finally {
  await mongoose.disconnect();
}