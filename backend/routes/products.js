import express from "express";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    console.log("📦 PRODUTO:", req.body);

    return res.json({
      ok: true,
      produto: req.body,
    });
  } catch (err) {
    return res.status(500).json({ error: "erro salvar" });
  }
});

export default router;