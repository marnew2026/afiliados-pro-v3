import Withdraw from "../models/Withdraw.js";
import axios from "axios";

let isProcessing = false;

export async function processWithdrawQueue() {
  if (isProcessing) return;

  isProcessing = true;

  let withdraw;

  try {

    withdraw = await Withdraw.findOne({
      status: "queued",
    }).sort({ createdAt: 1 });

    if (!withdraw) {
  return;
}

if (withdraw.externalId) {
  return;
}

    withdraw.status = "processing";
    await withdraw.save();

    let pix;

try {

  pix = await axios.post(
    "https://api.asaas.com/v3/transfers",
    {
      pixAddressKey: withdraw.pixKey,
      operationType: "PIX",
      value: withdraw.amount,
    },
    {
      headers: {
        access_token: process.env.ASAAS_API_KEY,
      },
    }
  );

  console.log("ASAAS OK:");
  console.log(JSON.stringify(pix.data, null, 2));

} catch (err) {

  console.log("STATUS:");
  console.log(err.response?.status);

  console.log("DATA:");
  console.log(
    JSON.stringify(
      err.response?.data,
      null,
      2
    )
  );

  throw err;
}

     if (!pix.data?.id) {
        throw new Error("Asaas não retornou ID da transferência");
}
    withdraw.externalId = pix.data.id;

     await withdraw.save();
// aguardando confirmação do webhook
    withdraw.status = "processing";



  } catch (err) {

    if (withdraw) {
      withdraw.status = "failed";
      await withdraw.save();
    }

    console.log(
      "QUEUE ERROR:",
      err.message
    );

  } finally {

    isProcessing = false;

    setTimeout(
      processWithdrawQueue,
      2000
    );

  }
}