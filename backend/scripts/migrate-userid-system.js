import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Wallet from "../models/Wallet.js";
import Click from "../models/Click.js";
import Campaign from "../models/Campaign.js";
import Conversion from "../models/Conversion.js";
import Withdraw from "../models/Withdraw.js";
import User from "../models/User.js";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/afiliados";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("🔥 Mongo conectado");

  // USERS MAP
  const users = await User.find();
  const userMap = new Map(
    users.map(u => [u.email, u._id.toString()])
  );

  // =========================
  // WALLETS
  // =========================
  const wallets = await Wallet.find();

  for (const w of wallets) {
    try {
      if (!w.userId && w.userEmail) {
        w.userId = userMap.get(w.userEmail) || null;
      }

      if (!w.userId && !w.userEmail) {
        console.log("SKIP WALLET:", w._id);
        continue;
      }

      // proteção anti-bug financeiro
      if ((w.lockedBalance ?? 0) < 0) {
        w.lockedBalance = 0;
      }

      if (w.availableBalance < 0) {
        w.availableBalance = 0;
      }

      w.userEmail = undefined;

      await w.save();
    } catch (err) {
      console.log("❌ WALLET ERRO:", w._id);
      console.log(err.message);
      continue; // não quebra migração inteira
    }
  }

  console.log("💰 wallets OK");

  // =========================
  // CLICKS
  // =========================
  const clicks = await Click.find();

  for (const c of clicks) {
    try {
      if (c.affiliateId && !c.userId) {
        c.userId = c.affiliateId;
        c.affiliateId = undefined;
      }

      await c.save();
    } catch (err) {
      console.log("❌ CLICK ERRO:", c._id);
      continue;
    }
  }

  console.log("🖱 clicks OK");

  // =========================
  // CAMPAIGNS
  // =========================
  const campaigns = await Campaign.find();

  for (const c of campaigns) {
    try {
      if (c.userId && typeof c.userId !== "string") {
        c.userId = c.userId.toString();
      }

      if (c.affiliateId && !c.userId) {
        c.userId = c.affiliateId;
        c.affiliateId = undefined;
      }

      await c.save();
    } catch (err) {
      console.log("❌ CAMPAIGN ERRO:", c._id);
      continue;
    }
  }

  console.log("📢 campaigns OK");

  // =========================
  // CONVERSIONS
  // =========================
  const conversions = await Conversion.find();

  for (const c of conversions) {
    try {
      if (c.affiliateId && !c.userId) {
        c.userId = c.affiliateId;
        c.affiliateId = undefined;
      }

      await c.save();
    } catch (err) {
      console.log("❌ CONVERSION ERRO:", c._id);
      continue;
    }
  }

  console.log("💸 conversions OK");

  // =========================
  // WITHDRAW
  // =========================
  const withdraws = await Withdraw.find();

  for (const w of withdraws) {
    try {
      if (w.affiliateId && !w.userId) {
        w.userId = w.affiliateId;
        w.affiliateId = undefined;
      }

      await w.save();
    } catch (err) {
      console.log("❌ WITHDRAW ERRO:", w._id);
      continue;
    }
  }

  console.log("🏦 withdraw OK");

  console.log("✅ MIGRAÇÃO FINALIZADA");
  process.exit(0);
}

run().catch(err => {
  console.error("💥 FATAL MIGRATION ERROR:", err);
  process.exit(1);
});