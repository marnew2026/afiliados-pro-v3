import "dotenv/config";
import mongoose from "mongoose";
import Wallet from "./models/Wallet.js";

await mongoose.connect(process.env.MONGO_URI);

const wallet = await Wallet.findOne({
    userId: "6a341138e88c46dc47af06f5"
});

console.log(wallet);

process.exit();