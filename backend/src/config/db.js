import mongoose from "mongoose";

export const connectDB = async () => {


  try {
    const uri = process.env.MONGO_URL;

        if (!uri) {
      throw new Error("MONGO_URL não definida");
    }

    await mongoose.connect(uri);

    console.log("🔥 MongoDB conectado");
  } catch (error) {
    
  }
};