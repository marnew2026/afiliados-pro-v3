import axios from "axios";
import Withdraw from "../models/Withdraw.js";

export async function processWithdraw(withdraw) {
  if (withdraw.externalId) {
    throw new Error("PIX já enviado");
  }

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

  withdraw.externalId = response.data.id;
  await withdraw.save();

  return response.data;


 

    console.log(
      "STATUS:",
      err.response?.status
    );

    console.log(
      "ASAAS ERRO:",
      JSON.stringify(
        err.response?.data,
        null,
        2
      )
    );

    throw err;
  }
