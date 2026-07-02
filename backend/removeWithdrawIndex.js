import mongoose from "mongoose";
import "dotenv/config";

await mongoose.connect(process.env.MONGO_URI);

await mongoose.connection.db
  .collection("withdraws")
  .dropIndex("externalId_1");

console.log("✅ INDEX REMOVIDO");

process.exit();