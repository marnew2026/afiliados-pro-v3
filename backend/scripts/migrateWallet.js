import mongoose from "mongoose";
import Campaign from "../models/Campaign.js";
import Wallet from "../models/Wallet.js";

await mongoose.connect(process.env.MONGO_URI);

const campaigns = await Campaign.find();

const map = {};

for (const c of campaigns) {
  const email = c.userEmail;

  if (!map[email]) {
    map[email] = 0;
  }

  map[email] += c.earnings || 0;
}

for (const email in map) {
  await Wallet.updateOne(
    { userEmail: email },
    {
      $set: {
        availableBalance: map[email],
        totalEarned: map[email],
      },
    },
    { upsert: true }
  );
}

console.log("MIGRAÇÃO WALLET CONCLUÍDA");
process.exit();