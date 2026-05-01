import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🔥 MongoDB conectado");
  } catch (error) {
    console.error("❌ erro Mongo:", error.message);
  }
}