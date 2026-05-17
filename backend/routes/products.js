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

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/r/:codigo", async (req, res) => {
  try {
    const produto = await Product.findOne({
      affiliateLink: {
        $regex: req.params.codigo,
      },
    });

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    res.redirect(produto.link);
  } catch {
    res.status(500).send("Erro");
  }
});

router.get("/go/:id", async (req, res) => {
  try {
    const produto = await Product.findById(req.params.id);

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    return res.redirect(produto.link);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Erro");
  }
});

router.post("/:id/click", async (req, res) => {
  try {
    const produto = await Product.findById(req.params.id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    produto.clicks = (produto.clicks || 0) + 1;
    await produto.save();

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post("/", async (req, res) => {
  try {
    const novoProduto = new Product(req.body);

    novoProduto.affiliateLink =
      `https://afiliados-pro-v3-2.onrender.com/r/${Date.now()}`;

    await novoProduto.save();

    res.json(novoProduto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao salvar produto" });
  }
});

export default router;