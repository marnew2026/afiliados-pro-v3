import express from "express";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
  const { ownerId } = req.query;
  const campaigns = await Campaign.find({ ownerId });
  res.json(campaigns);
});

// CRIAR
router.post("/", async (req, res) => {
  const { name, link, ownerId, email } = req.body;

  const user = await User.findOne({ email });

  if (!user?.isPro) {
    return res.status(403).json({ error: "PRO necessário" });
  }

  const campaign = await Campaign.create({
    name,
    link,
    ownerId,
    email,
  });

  res.json(campaign);
});

export default router;