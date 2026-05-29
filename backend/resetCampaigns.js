import mongoose from "mongoose";
import dotenv from "dotenv";

import Campaign from "./models/Campaign.js";

dotenv.config();

console.log("MONGO:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI não encontrada");
  process.exit();
}

await mongoose.connect(process.env.MONGO_URI);

console.log("🔥 Mongo conectado");

await Campaign.updateMany(
  {},
  {
    $set: {
      earnings: 0,
      clicks: 0,
      sales: 0,
    },
  }
);

console.log("🔥 Campanhas resetadas");

process.exit();