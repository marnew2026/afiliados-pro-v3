import express from "express";
import User from "../models/User.js";
import Click from "../models/Click.js";

const router = express.Router();

/* GERAR LINK */
router.get("/link/:affiliateCode/:offerId", async (req, res) => {
  try {
    const { affiliateCode, offerId } = req.params;

    const affiliate = await User.findOne({ affiliateCode });

    if (!affiliate) {
      return res.status(404).json({ error: "Afiliado não encontrado" });
    }

    const baseUrl = "http://192.168.0.9:3001";

    const link = `${baseUrl}/checkout/a/${affiliateCode}/${offerId}`;

    res.json({ link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;