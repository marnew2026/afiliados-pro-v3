import express from "express";

const router = express.Router();

router.post("/withdraw", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;

    console.log("NOVO SAQUE:");
    console.log(userEmail);
    console.log(pixKey);
    console.log(amount);

    if (!userEmail || !pixKey || !amount) {
      return res.status(400).json({
        message: "Dados inválidos",
      });
    }

    return res.json({
      success: true,
      message: "Saque solicitado com sucesso",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Erro interno",
    });
  }
});

export default router;