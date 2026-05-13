import express from "express";
import Click from "../models/Click.js";
import Offer from "../models/Offer.js";

const router = express.Router();

router.get("/:affiliateId/:offerId", async (req, res) => {
  try {
    const { affiliateId, offerId } = req.params;

    console.log("🔥 tracking hit", affiliateId, offerId);

    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).send("Oferta não encontrada");
    }

    await Click.create({
      affiliateId,
      offerId,
      ip: req.ip,
      createdAt: new Date(),
    });

    const redirectUrl = offer.checkoutUrl || "https://google.com";

    console.log("🔥 redirect:", redirectUrl);

    return res.redirect(redirectUrl);
  } catch (err) {
    console.error("❌ tracking:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;