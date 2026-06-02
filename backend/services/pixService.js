import axios from "axios";

export async function sendPix({
  pixKey,
  amount,
}) {
  try {

    console.log("CHAVE:", process.env.ASAAS_API_KEY?.substring(0,20));

    const response = await axios.post(
      "https://api.asaas.com/api/v3/transfers",
      {
        value: Number(amount),
        operationType: "PIX",
        pixAddressKey: pixKey,
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ASAAS OK:", response.data);

    return response.data;

  } catch (err) {

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
}