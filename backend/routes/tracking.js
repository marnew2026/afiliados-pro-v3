import express from "express";
import Click from "../models/Click.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { offerId, affiliateId } = req.body;

  await Click.create({
    offerId,
    affiliateId,
    createdAt: new Date(),
  });

  res.json({ ok: true });
});

export default router;