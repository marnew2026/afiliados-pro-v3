import Withdraw from "../models/Withdraw.js";
import Ledger from "../models/Ledger.js";
import axios from "axios";
import { rebuildWallet } from "../src/services/rebuildWallet.js";
let isProcessing = false;

export async function processWithdrawQueue() {
  if (isProcessing) return;

  isProcessing = true;

  let withdraw = null;

  try {
    // 🔒 Operação atômica:
    // procura o pending mais antigo
    // e já marca como processing
    withdraw = await Withdraw.findOneAndUpdate(
      {
        status: "pending",
      },
      {
        $set: {
          status: "processing",
          processingAt: new Date(),
        },
      },
      {
        sort: { createdAt: 1 },
        new: true,
      }
    );

    if (!withdraw) {
  isProcessing = false;
  return;
}

    console.log("💸 PROCESSANDO SAQUE:", withdraw._id.toString());

    console.log("ASAAS TOKEN:");
    console.log(process.env.ASAAS_API_KEY);

    console.log("PIX PAYLOAD:");
    console.log({
      pixAddressKey: withdraw.pixKey,
      pixAddressKeyType: "EMAIL",
      value: Number(withdraw.amount),
    });

    // Evita envio duplicado
const currentWithdraw = await Withdraw.findOne({
  _id: withdraw._id,
});

if (!currentWithdraw) {
  console.log("⚠️ Saque não encontrado.");
  return;
}

if (["done", "paid"].includes(currentWithdraw.status)) {
  console.log("✅ Saque já concluído.");
  return;
}

if (currentWithdraw.status === "sent") {
  console.log("⚠️ PIX já enviado. Aguardando confirmação do Asaas.");
  return;
}

if (currentWithdraw.asaasTransferId) {
  console.log("⚠️ Transferência já registrada:");
  console.log(currentWithdraw.asaasTransferId);
  return;
}

if (currentWithdraw.status !== "processing") {
  console.log("⚠️ Estado inesperado:", currentWithdraw.status);
  return;
}

   const pix = await axios.post(
  "https://api.asaas.com/v3/transfers",
  {
    pixAddressKey: withdraw.pixKey,
    pixAddressKeyType: "EMAIL",
    value: Number(withdraw.amount),

    externalReference: withdraw.withdrawId,
  },
  {
    headers: {
      access_token: process.env.ASAAS_API_KEY,
      "Content-Type": "application/json",
    },
  }
);

    console.log("ASAAS RESPONSE:");
    console.log(JSON.stringify(pix.data, null, 2));

   const sentResult = await Withdraw.updateOne(
  {
    _id: withdraw._id,
    status: "processing",
  },
  {
    $set: {
      status: "sent",
      sentAt: new Date(),
      errorMessage: null,
      asaasTransferId: pix.data.id,
      asaasStatus: pix.data.status,
      asaasOperationType: pix.data.operationType,
      asaasResponse: pix.data,
    },
  }
);

console.log("UPDATE RESULT:");
console.log(sentResult);

if (sentResult.modifiedCount !== 1) {
  console.log("⚠️ Outro processo já registrou esta transferência.");
  return;
}

const saved = await Withdraw.findById(withdraw._id);

console.log("DOCUMENTO ATUALIZADO:");
console.log({
  status: saved.status,
  asaasTransferId: saved.asaasTransferId,
  withdrawId: saved.withdrawId,
});

console.log("✅ PIX ENVIADO:", pix.data.id);   


console.log("ASAAS ID SALVO:");
console.log(saved.asaasTransferId);
  } catch (err) {
    console.log("🔥 ASAAS ERROR FULL:");

    console.log(
      JSON.stringify(
        err.response?.data,
        null,
        2
      )
    );

    console.log("STATUS:", err.response?.status);
    console.log("MESSAGE:", err.message);

    if (withdraw) {
      // Consulta o estado REAL do saque no banco
  

      // Só marca como failed se ainda estiver em processing
     // Marca como failed somente se ainda estiver em processing
const failedResult = await Withdraw.updateOne(
  {
    _id: withdraw._id,
    status: "processing",
  },
  {
    $set: {
      status: "failed",
      errorMessage: err.message,
    },
  }
);

if (failedResult.modifiedCount !== 1) {
  console.log("⚠️ Saque já mudou de estado.");
  return;
}

const ledgerResult = await Ledger.updateOne(
  {
    referenceId: withdraw.withdrawId,
    type: "debit",
  },
  {
    $set: {
      status: "failed",
    },
  }
);

if (ledgerResult.matchedCount !== 1) {
  console.log(
    "⚠️ Ledger não encontrado:",
    withdraw.withdrawId
  );
}



await rebuildWallet(withdraw.userId);

console.log("✅ SAQUE MARCADO COMO FAILED");   }
  } finally {
    isProcessing = false;
  }
}