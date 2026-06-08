import Withdraw from "../models/Withdraw.js";
import axios from "axios";

let isProcessing = false;

async function sendPix(withdraw) {
  try {
    const response = await axios.post(
      "https://api.asaas.com/v3/transfers",
      {
        value: withdraw.amount,
        pixAddressKey: withdraw.pixKey,
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ASAAS RESPONSE:", response.data);

    return response.data;
  } catch (err) {
    console.log("🔥 ASAAS ERROR FULL:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });

    throw err;
  }
}

export async function processWithdrawQueue() {
  if (isProcessing) return;

  isProcessing = true;

  let withdraw;

  try {
    withdraw = await Withdraw.findOne({
      status: "queued",
    }).sort({ createdAt: 1 });

    if (!withdraw) return;

    // idempotência
    if (withdraw.externalId) return;

    withdraw.status = "processing";
    await withdraw.save();

    console.log(
      "💸 PROCESSANDO SAQUE:",
      withdraw._id.toString()
    );

    const pix = await sendPix(withdraw);

    if (!pix?.id) {
      throw new Error(
        "Asaas não retornou ID"
      );
    }

    withdraw.externalId = pix.id;

    // aguarda webhook confirmar
    withdraw.status = "processing";

    await withdraw.save();

    console.log(
      "✅ PIX ENVIADO:",
      pix.id
    );

  } catch (err) {

    if (withdraw) {
      withdraw.status = "failed";
      console.log(
  "STATUS ANTES DE SALVAR:",
  withdraw.status
);
      await withdraw.save();
    }

    console.log(
      "❌ ERRO FILA:",
      err.response?.data || err.message
    );

  } finally {

    isProcessing = false;

    setTimeout(
      processWithdrawQueue,
      2000
    );
  }
}