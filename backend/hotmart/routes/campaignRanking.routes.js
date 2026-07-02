import express from "express";
import Campaign from "../../models/Campaign.js";

const router = express.Router();

// 📊 TOP CAMPANHAS
router.get("/", async (req, res) => {
  const top = await Campaign.find({})
    .sort({ clicks: -1 })
    .limit(10);

  res.json(top);
});

export default router;