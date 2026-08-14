import mongoose from "mongoose";
import dotenv from "dotenv";

import Campaign from "../../models/Campaign.js";

dotenv.config({
  path: "./.env",
});

await mongoose.connect(process.env.MONGO_URI);

console.log("================================");
console.log("CORRIGINDO CAMPAIGNS...");
console.log("================================");

const campaigns = await Campaign.find();

let total = 0;

for (const campaign of campaigns) {

  campaign.earnings = Number(
    Number(campaign.earnings || 0).toFixed(2)
  );

  await campaign.save();

  total++;

  if (total % 100 === 0) {
    console.log("Corrigidas:", total);
  }
}

console.log("===============================");
console.log("TOTAL CORRIGIDAS:", total);
console.log("===============================");

process.exit();