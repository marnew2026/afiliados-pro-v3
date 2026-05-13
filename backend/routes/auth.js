import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // verifica se já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    // gera affiliate code
    const affiliateCode = crypto.randomBytes(4).toString("hex");

    // hash senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "affiliate",
      affiliateCode,
    });

    return res.json({
      message: "Usuário criado com sucesso",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        affiliateCode: user.affiliateCode,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    return res.json({
      message: "Login OK",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        affiliateCode: user.affiliateCode,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;