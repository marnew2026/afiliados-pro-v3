import express from "express";
import Wallet from "../models/Wallet.js";
import Campaign from "../models/Campaign.js";
import Click from "../models/Click.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * DEBUG GERAL DO MONGO
 */
router.get("/mongo-check", async (req, res) => {
  try {
    const wallets = await Wallet.find().limit(20);
    const campaigns = await Campaign.find().limit(20);
    const clicks = await Click.find().limit(20);
    const users = await User.find().limit(20);

    res.json({
      wallets: {
        total: wallets.length,
        sample: wallets,
      },
      campaigns: {
        total: campaigns.length,
        sample: campaigns,
      },
      clicks: {
        total: clicks.length,
        sample: clicks,
      },
      users: {
        total: users.length,
        sample: users.map((u) => ({
          _id: u._id,
          email: u.email,
          name: u.name,
        })),
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;