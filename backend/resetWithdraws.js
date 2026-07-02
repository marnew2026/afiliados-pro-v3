import dotenv from "dotenv";


import mongoose from "mongoose";
import Withdraw from "./models/Withdraw.js";

console.log("MONGO:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI não encontrada");
  process.exit();
}

await mongoose.connect(process.env.MONGO_URI);

console.log("🔥 Mongo conectado");

await Withdraw.deleteMany({});

console.log("🔥 Saques resetados");

process.exit();