import express from "express";

const router = express.Router();

console.log("🔥 CHECKOUT LOADED");

router.get("/a/:affiliateCode/:offerId", (req, res) => {
  console.log("🔥 CHEGOU NA ROTA");
  res.json({ ok: true });
});

export default router;