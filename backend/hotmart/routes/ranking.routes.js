import express from "express";
import {
  getTopAffiliates,
  getTopClicks,
} from "../../services/rankingService.js";

const router = express.Router();

router.get("/earnings", async (req, res) => {
  try {
    const data = await getTopAffiliates(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/clicks", async (req, res) => {
  try {
    const data = await getTopClicks(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;