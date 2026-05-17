import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const produto = await Product.create(req.body);
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const produtos = await Product.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;