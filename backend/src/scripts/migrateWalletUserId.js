import mongoose from "mongoose";
import Wallet from "../models/Wallet.js";
import User from "../models/User.js";
import connectDB from "../config/db.js";

await connectDB();

const wallets = await Wallet.find({});

for (const wallet of wallets) {
  if (wallet.userEmail && !wallet.userId) {
    const user = await User.findOne({
      email: wallet.userEmail,
    });

    if (user) {
      wallet.userId = user._id.toString();
      await wallet.save();

      console.log("Migrado:", wallet.userEmail);
    }
  }
}

console.log("✔ MIGRAÇÃO FINALIZADA");
process.exit();