import axios from "axios";

export async function sendPix({
  pixKey,
  amount,
}) {
  try {
    const response = await axios.post(
      "https://api.asaas.com/v3/transfers",
      {
        value: Number(amount),
        operationType: "PIX",
        pixAddressKey: pixKey,
      },
      {
        headers: {
          access_token:
            process.env.ASAAS_API_KEY,
          "Content-Type":
            "application/json",
        },
      }
    );

    return response.data;

  } catch (err) {
    console.log(
      "ASAAS PIX ERROR:",
      err.response?.data || err.message
    );

    throw new Error("Erro ao enviar PIX");
  }
}