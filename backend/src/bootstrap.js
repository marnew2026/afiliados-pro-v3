import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não definido");
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log("🔥 MongoDB PRODUÇÃO conectado");
}