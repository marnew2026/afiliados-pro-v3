import "dotenv/config";

import mongoose from "mongoose";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não definido");
}

await mongoose.connect(process.env.MONGO_URI);

const email = "marielsantana@bol.com.br";

let user = await User.findOne({ email });

if (!user) {
  user = await User.create({
    email,
    password: "admin",
    isPro: true,
    plan: "FREE",
    role: "admin",
  });
}

let wallet = await Wallet.findOne({
  userId: user._id.toString(),
});

if (!wallet) {
  wallet = await Wallet.create({
    userId: user._id.toString(),
    availableBalance: 0,
    lockedBalance: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
  });
}

console.log("✅ USER:", user._id.toString());
console.log("✅ WALLET:", wallet._id.toString());

process.exit(0);