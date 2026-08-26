import dotenv from "dotenv";
import axios from "axios";

dotenv.config();







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



 


  try {

    const res = await api.post("/transfers", {

      value: Number(value),

      pixAddressKey: pixKey,

      pixAddressKeyType: pixKeyType,

      externalReference: externalId,

    });

    return res.data;


  } catch(err){
    throw err;

  }

}