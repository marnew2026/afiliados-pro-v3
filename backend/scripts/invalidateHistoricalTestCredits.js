import "dotenv/config";
import mongoose from "mongoose";
import Ledger from "../models/Ledger.js";
import Wallet from "../models/Wallet.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";

const TARGET_USER_ID = "6a341138e88c46dc47af06f5";
const EXPECTED_ENTRIES = 727;
const EXPECTED_TOTAL_CENTS = 71830;
const APPLY_TOKEN = "INVALIDATE-TEST-CREDITS-71830";

const applyRequested = process.argv.includes("--apply");
const applyAuthorized =
  process.env.CONFIRM_FINANCIAL_HISTORY_INVALIDATION === APPLY_TOKEN;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não encontrada.");
}

function toCents(value) {
  return Math.round(Number(value || 0) * 100);
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function isInvalidTestCredit(entry) {
  if (entry.type !== "credit" || entry.status !== "confirmed") {
    return false;
  }

  const source = normalize(entry.source);
  const description = normalize(entry.description);
  const referenceId = String(entry.referenceId || "");

  return (
    (source === "campaign" &&
      description === "clique em campanha") ||
    (source === "campaign" &&
      description === "clique manual") ||
    (source === "adjustment" &&
      referenceId.startsWith("test-")) ||
    description === "comissao de teste" ||
    referenceId === "TESTE-COMISSAO-000001" ||
    referenceId === "VENDA-000002"
  );
}

await mongoose.connect(process.env.MONGO_URI);

try {
  const confirmedCredits = await Ledger.find({
    userId: TARGET_USER_ID,
    type: "credit",
    status: "confirmed",
  })
    .sort({ createdAt: 1 })
    .lean();

  const targets = confirmedCredits.filter(isInvalidTestCredit);
  const totalCents = targets.reduce(
    (sum, entry) => sum + toCents(entry.amount),
    0
  );

  const walletBefore = await Wallet.findOne({
    userId: TARGET_USER_ID,
  }).lean();

  console.log("\n===== SIMULAÇÃO DA INVALIDAÇÃO =====");
  console.table([
    {
      userId: TARGET_USER_ID,
      entriesToInvalidate: targets.length,
      totalToInvalidate: totalCents / 100,
      availableBefore: walletBefore?.availableBalance ?? 0,
      totalEarnedBefore: walletBefore?.totalEarned ?? 0,
      totalWithdrawnPreserved:
        walletBefore?.totalWithdrawn ?? 0,
      expectedAvailableAfter: 0,
      expectedTotalEarnedAfter: 0,
    },
  ]);

  if (
    targets.length !== EXPECTED_ENTRIES ||
    totalCents !== EXPECTED_TOTAL_CENTS
  ) {
    throw new Error(
      `Proteção acionada: esperado ${EXPECTED_ENTRIES} registros e ` +
      `${EXPECTED_TOTAL_CENTS} centavos; encontrados ` +
      `${targets.length} registros e ${totalCents} centavos.`
    );
  }

  if (!applyRequested) {
    console.log(
      "\nDRY-RUN concluído. Nenhum documento foi alterado."
    );
    process.exitCode = 0;
  } else {
    if (!applyAuthorized) {
      throw new Error(
        "Aplicação bloqueada: confirmação explícita ausente."
      );
    }

    const session = await mongoose.startSession();

    try {
      let updateResult;
      let walletAfter;

      await session.withTransaction(async () => {
        updateResult = await Ledger.updateMany(
          {
            _id: { $in: targets.map((entry) => entry._id) },
            userId: TARGET_USER_ID,
            type: "credit",
            status: "confirmed",
          },
          {
            $set: {
              status: "failed",
              "metadata.financialAudit.invalidated": true,
              "metadata.financialAudit.reason":
                "historical_test_credit_not_backed_by_real_revenue",
              "metadata.financialAudit.invalidatedAt":
                new Date(),
            },
          },
          { session }
        );

        if (updateResult.modifiedCount !== EXPECTED_ENTRIES) {
          throw new Error(
            `Atualização incompleta: ${updateResult.modifiedCount} registros.`
          );
        }

        walletAfter = await rebuildWallet(
          TARGET_USER_ID,
          session
        );
      });

      console.log("\n===== CORREÇÃO APLICADA =====");
      console.table([
        {
          modifiedEntries: updateResult.modifiedCount,
          availableBalance: walletAfter.availableBalance,
          lockedBalance: walletAfter.lockedBalance,
          totalEarned: walletAfter.totalEarned,
          totalWithdrawn: walletAfter.totalWithdrawn,
        },
      ]);
    } finally {
      await session.endSession();
    }
  }
} finally {
  await mongoose.disconnect();
}