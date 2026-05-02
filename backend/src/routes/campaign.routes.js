import express from "express";

const router = express.Router();

// listar campanhas
router.get("/", async (req, res) => {
  try {
    res.json([
      {
        _id: "demo123",
        name: "Campanha Demo",
        link: "https://meli.la/demo",
        clicks: 0,
        sales: 0,
        revenue: 0,
      },
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// rastreamento
router.get("/r/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Clique rastreado:", id);

    // aqui depois você troca pelo link salvo no banco
    return res.redirect("https://mercadolivre.com");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;