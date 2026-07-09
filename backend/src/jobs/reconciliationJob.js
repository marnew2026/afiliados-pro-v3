import Withdraw from "../../models/Withdraw.js";

import axios from "axios";
import Ledger from "../../models/Ledger.js";
import { rebuildWallet } from "../services/rebuildWallet.js";
export async function reconciliationJob() {
  const list = await Withdraw.find({
    status: { $in: ["processing", "sent"] }
  });

  for (const w of list) {
    try {
      if (!w.asaasTransferId) {
  console.log(
    "Ignorando saque sem asaasTransferId:",
    w._id.toString()
  );

  continue;
}
      const res = await axios.get(
        `https://api.asaas.com/v3/transfers/${w.asaasTransferId}`,
        {
          headers: {
            access_token: process.env.ASAAS_API_KEY,
          },
        }
      );

      const status = res.data.status;
      console.log("================================");
console.log("RECONCILIATION");
console.log("Withdraw:", w.withdrawId);
console.log("Status:", status);
console.log(JSON.stringify(res.data, null, 2));
console.log("================================");
      if (status === "DONE") {

  const result = await Withdraw.updateOne(
    {
      _id: w._id,
      status: "sent",
    },
    {
      $set: {
        status: "paid",
        paidAt: new Date(),
        asaasStatus: status,
        asaasResponse: res.data,
      },
    }
  );

  if (result.modifiedCount !== 1) {
    continue;
  }

  // ============================================
// ALTERAÇÃO 01 - PÓS TESTES
// Auditoria da atualização do Ledger
// Data: 08/07/2026
// ============================================

const ledgerResult = await Ledger.updateOne(
  {
    referenceId: w.withdrawId,
    type: "debit",
  },
  {
    $set: {
      status: "confirmed",
      confirmedAt: new Date(),
    },
  }
);

if (ledgerResult.matchedCount !== 1) {
  console.log("❌ Ledger não encontrado:", w.withdrawId);
} else if (ledgerResult.modifiedCount === 1) {
  console.log("✅ Ledger confirmado:", w.withdrawId);
} else {
  console.log("ℹ️ Ledger já estava confirmado:", w.withdrawId);
}

await rebuildWallet(w.userId);

  console.log("✅ SAQUE CONCILIADO:", w._id.toString());
}
else if (status === "FAILED") {

  const result = await Withdraw.updateOne(
    {
      _id: w._id,
      status: { $in: ["processing", "sent"] },
    },
    {
      $set: {
        status: "failed",
        errorMessage: "Transferência recusada pelo Asaas",
        asaasStatus: status,
        asaasResponse: res.data,
      },
    }
  );

  if (result.modifiedCount !== 1) {
    continue;
  }

  // ============================================
  // ALTERAÇÃO 01 - PÓS TESTES
  // Auditoria da atualização do Ledger
  // ============================================

  const ledgerResult = await Ledger.updateOne(
    {
      referenceId: w.withdrawId,
      type: "debit",
    },
    {
      $set: {
        status: "failed",
      },
    }
  );

  if (ledgerResult.matchedCount !== 1) {
    console.log("❌ Ledger não encontrado:", w.withdrawId);
  } else if (ledgerResult.modifiedCount === 1) {
    console.log("⚠️ Ledger marcado como FAILED:", w.withdrawId);
  } else {
    console.log("ℹ️ Ledger já estava FAILED:", w.withdrawId);
  }

  await rebuildWallet(w.userId);

  console.log("✅ SAQUE DEVOLVIDO:", w._id.toString());
}
  
    } catch (err) {

  console.log("================================");

  console.log("RECONCILIATION ERROR");

  console.log("Withdraw:", w._id.toString());

  console.log("Asaas ID:", w.asaasTransferId);

  console.log("HTTP:", err.response?.status);

  console.log(
    JSON.stringify(
      err.response?.data,
      null,
      2
    )
  );

  console.log("Message:", err.message);

  console.log("================================");
}
  }
}