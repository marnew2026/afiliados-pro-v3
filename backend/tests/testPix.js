import dotenv from "dotenv";
dotenv.config();

import { sendPixToAsaas } from "../services/asaasService.js";

async function testPix() {
  try {
    const response = await sendPixToAsaas({
      value: 0.03,
      pixKey: "marielsantana@bol.com.br",
      pixKeyType: "EMAIL",
      externalId: "test-" + Date.now(),
    });

    console.log("✅ PIX ENVIADO COM SUCESSO");
    console.log(response);

  } catch (err) {
    console.log("❌ ERRO AO ENVIAR PIX:");
    console.log(err.response?.data || err.message);
  }
}

testPix();