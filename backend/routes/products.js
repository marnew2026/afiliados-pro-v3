import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * CLICK (atualização segura)
 */
router.post("/:id/click", async (req, res) => {
  try {
    console.log("🔥 CLICK RECEBIDO:", req.params.id);

    const result = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          clicks: 1,
          earnings: 0, // mantemos compatível
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    console.log("🔥 RESULTADO:", result);

    return res.json({
      clicks: result.clicks,
      earnings: result.earnings,
    });
  } catch (err) {
    console.log("ERRO CLICK:", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * LISTAR PRODUTOS
 */
router.get("/", async (req, res) => {
  try {
    const produtos = await Product.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * CRIAR PRODUTO
 */
router.post("/", async (req, res) => {
  try {
    const novoProduto = new Product(req.body);

    novoProduto.clicks = 0;
    novoProduto.earnings = 0;

    novoProduto.affiliateLink = `https://afiliados-pro-v3-2.onrender.com/r/${Date.now()}`;

    await novoProduto.save();

    res.json(novoProduto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao salvar produto" });
  }
});

/**
 * DELETAR
 */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ATUALIZAR
 */
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

/**
 * REDIRECT POR LINK
 */
router.get("/go/:id", async (req, res) => {
  try {
    const produto = await Product.findById(req.params.id);

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    return res.redirect(produto.link);
  } catch (err) {
    return res.status(500).send("Erro");
  }
});

/**
 * REDIRECT POR CÓDIGO
 */
router.get("/r/:codigo", async (req, res) => {
  try {
    const produto = await Product.findOne({
      affiliateLink: { $regex: req.params.codigo },
    });

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    return res.redirect(produto.link);
  } catch {
    return res.status(500).send("Erro");
  }
});

export default router;