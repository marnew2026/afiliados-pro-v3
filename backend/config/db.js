import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🔥 MongoDB conectado");
  } catch (err) {
    console.log("❌ Mongo error:", err.message);
  }
};

export default connectDB;