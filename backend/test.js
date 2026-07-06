import mongoose from "mongoose";
import User from "./models/User.js";

await mongoose.connect("SUA_MONGO_URL");

const users = await User.find();

console.log(users);
process.exit();