import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { userEmail, nome, preco, link, imagem } = req.body;

    const produto = await Product.create({
      userEmail,
      nome,
      preco,
      link,
      imagem,
    });

    res.json(produto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "erro ao salvar produto" });
  }
});

router.get("/mine/:email", async (req, res) => {
  const produtos = await Product.find({ userEmail: req.params.email });
  res.json(produtos);
});

export default router;