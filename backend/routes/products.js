import express from "express";
import Product from "../models/Product.js";

export const registerClick = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    // aumenta clique
    product.clicks += 1;

    // calcula ganho por clique
    const gain = product.preco * product.commission;

    // soma no total
    product.earnings += gain;

    await product.save();

    return res.json({
      clicks: product.clicks,
      earnings: product.earnings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao registrar clique" });
  }
};
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
    console.log("🔥 CLICK RECEBIDO:", req.params.id);

    const result = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    console.log("🔥 RESULTADO BANCO:", result);

    if (!result) {
      return res.status(404).json({ error: "não encontrou produto" });
    }

    return res.json({
      clicks: result.clicks,
    });
  } catch (err) {
    console.log("ERRO CLICK:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const produtos = await Product.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
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