import express from "express";
import Offer from "../models/Offer.js";

const router = express.Router();

/* =========================
   GET ALL OFFERS
========================= */
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();

    res.json(offers);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro buscar ofertas",
    });
  }
});

/* =========================
   CREATE TEST OFFER
========================= */
router.get("/create-test", async (req, res) => {
  try {
    const offer = await Offer.create({
      name: "Curso IA Bilionária",
      price: 97,
      commissionPercent: 50,
      producerId: "produtor123",
    });

    res.json(offer);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro criar oferta",
    });
  }
});

export default router;