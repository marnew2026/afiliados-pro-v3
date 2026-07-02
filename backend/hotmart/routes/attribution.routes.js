import express from "express";

const router = express.Router();

// 🔥 atribuição simples de afiliado
router.post("/track", async (req, res) => {
  const { userId, campaignId, source } = req.body;

  return res.json({
    message: "attribution recorded",
    userId,
    campaignId,
    source,
  });
});

export default router;