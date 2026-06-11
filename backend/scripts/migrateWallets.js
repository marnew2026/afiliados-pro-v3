import mongoose from "mongoose";
import dotenv from "dotenv";

import Campaign from "../models/Campaign.js";
import Wallet from "../models/Wallet.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const campaigns = await Campaign.find();

const map = {};

for (const c of campaigns) {
  const email = c.userId;

  if (!map[email]) {
    map[email] = 0;
  }

  map[email] += Number(c.earnings || 0);
}

for (const email in map) {
  await Wallet.updateOne(
    { userId: email },
    {
      $set: {
        availableBalance: map[email],
        totalEarned: map[email],
      },
    },
    { upsert: true }
  );

  console.log(
    "Wallet criada:",
    email,
    map[email]
  );
}

console.log("MIGRAÇÃO WALLET CONCLUÍDA");

process.exit();