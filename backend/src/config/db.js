import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL não definida");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("🔥 MongoDB conectado");
  } catch (error) {
    console.log("❌ erro Mongo:", error.message);
    process.exit(1);
  }
};