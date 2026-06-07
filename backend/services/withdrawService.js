import LedgerEntry from "../models/LedgerEntry.js";
import { getBalance } from "./walletBalanceService.js";
import Wallet from "../models/Wallet.js";
import Withdraw from "../models/Withdraw.js";
import { addDebit } from "./ledgerService.js";
import { checkFraudRules } from "./fraudService.js";


export async function requestWithdraw({ userEmail, amount, pixKey }) {
  const email = userEmail;
  console.log("EMAIL RECEBIDO:", email);



const wallet = await Wallet.findOne({ userEmail: email });

console.log("EMAIL RECEBIDO:", email);
console.log("WALLET ENCONTRADA:", wallet);

if (!wallet) {
  throw new Error("Wallet não encontrada");
}

const balance = Number(wallet.availableBalance || 0);
const value = Number(String(amount).replace(",", "."));

console.log("BALANCE:", balance);
console.log("VALUE:", value);
console.log("COMPARAÇÃO:", balance < value);

if (balance < value) {
  throw new Error("Saldo insuficiente");
}

  checkFraudRules(wallet, value);

  wallet.availableBalance = balance - value;
  wallet.lastWithdrawAt = new Date();

  await wallet.save();

  const withdraw = await Withdraw.create({
    userEmail: email,
    amount: value,
    pixKey,
    status: "queued",
  });

  return withdraw;
}