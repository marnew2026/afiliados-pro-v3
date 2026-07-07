import dotenv from "dotenv";
import axios from "axios";

dotenv.config();


console.log("🔥 ASAAS URL:", process.env.ASAAS_URL);

console.log(
  "🔥 ASAAS TOKEN EXISTE:",
  !!process.env.ASAAS_API_KEY
);


const api = axios.create({
  baseURL: process.env.ASAAS_URL,
  headers: {
    access_token: process.env.ASAAS_API_KEY,
    "Content-Type": "application/json",
  },
});


export async function sendPixToAsaas({
  value,
  pixKey,
  pixKeyType,
  externalId,
}) {

  console.log("📤 ENVIANDO PIX ASAAS:");

  console.log({
    value,
    pixAddressKey: pixKey,
    pixAddressKeyType: pixKeyType,
    externalReference: externalId,
  });


  try {

    const res = await api.post("/transfers", {

      value: Number(value),

      pixAddressKey: pixKey,

      pixAddressKeyType: pixKeyType,

      externalReference: externalId,

    });


    console.log(
      "✅ ASAAS TRANSFER OK:",
      res.data
    );


    return res.data;


  } catch(err){


    console.log(
      "🔥 ASAAS ERRO STATUS:",
      err.response?.status
    );


    console.log(
      "🔥 ASAAS ERRO DATA:",
      JSON.stringify(
        err.response?.data,
        null,
        2
      )
    );


    throw err;

  }

}