import mongoose from "mongoose";

export const connectDB = async () => {
console.log("DB FILE VERSION 2");

  try {
    const uri = process.env.MONGO_URL;

    console.log("MONGO_URL existe?", !!uri);

    if (!uri) {
      throw new Error("MONGO_URL não definida");
    }

    await mongoose.connect(uri);

    console.log("🔥 MongoDB conectado");
  } catch (error) {
    console.log("❌ erro Mongo:", error.message);
  }
};