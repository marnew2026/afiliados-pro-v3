import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// criar campanha
router.post("/add", async (req, res) => {
  const { name, url } = req.body;

  const campaign = await Campaign.create({
    nome: name,
    link: url,
    active: true,
    earnings: 0,
    clicks: 0,
  });

  res.json(campaign);
});

// listar campanhas
router.get("/list", async (req, res) => {
  const campaigns = await Campaign.find({ active: true });
  res.json(campaigns);
});

// desativar campanha
router.post("/disable", async (req, res) => {
  const { id } = req.body;

  await Campaign.findByIdAndUpdate(id, { active: false });

  res.json({ ok: true });
});

export default router;