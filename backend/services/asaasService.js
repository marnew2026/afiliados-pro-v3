import dotenv from "dotenv";

import axios from "axios";
console.log("ASAAS TOKEN:");

console.log(process.env.ASAAS_API_KEY);

console.log("PIX PAYLOAD:");

console.log({
  pixAddressKey: withdraw.pixKey,
  value: withdraw.amount,
});

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

  const res = await api.post("/transfers", {
    value: Number(value),
    pixAddressKey: pixKey,
    pixAddressKeyType: pixKeyType,
    externalReference: externalId,
  });

  return res.data;
}