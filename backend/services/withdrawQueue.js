import Withdraw from "../models/Withdraw.js";
import axios from "axios";
let isProcessing = false;

export async function processWithdrawQueue() {
  if (isProcessing) return;

  isProcessing = true;

  try {
    const withdraw = await Withdraw.findOne({
      status: "pending",
    }).sort({ createdAt: 1 });

    if (!withdraw) {
      isProcessing = false;
      return;
    }
async function sendPix(withdraw) {
  const response = await axios.post(
    "https://api.asaas.com/v3/transfers",
    {
      pixAddressKey: withdraw.pixKey,
      operationType: "PIX",
      value: withdraw.amount,
    },
    {
      headers: {
        access_token: process.env.ASAAS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
    // 🔒 marca como processando
    withdraw.status = "processing";
    await withdraw.save();

    console.log(
  "PROCESSANDO PIX:",
  withdraw._id.toString()
);

    console.log("💸 PROCESSANDO SAQUE:", withdraw._id);
if (withdraw.externalId) {
  throw new Error("PIX já foi enviado para este saque");
}
    const pix = await sendPix(withdraw);

withdraw.externalId = pix.id;

console.log(
  "PIX CONFIRMADO:",
  withdraw._id.toString()
);

console.log(
  "PIX ENVIADO:",
  pix.data.id
);

withdraw.status = "paid";

await withdraw.save();
    // await sendPix(withdraw)

    withdraw.status = "paid";
    await withdraw.save();

    console.log("✅ SAQUE PAGO:", withdraw._id);

  } catch (err) {
    console.log("❌ ERRO FILA SAQUE:", err.message);
  }

  isProcessing = false;

  // 🔁 loop automático
  setTimeout(processWithdrawQueue, 2000);
}