import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  console.log("🚀 ENTROU NA ROTA /auth/register");

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Nome, email e senha são obrigatórios",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: "Usuário já existe",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const affiliateCode = crypto.randomBytes(4).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "affiliate",
      affiliateCode,
    });

    console.log("✅ USUÁRIO CRIADO NO MONGO");

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        isPro: user.isPro,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ ERRO REGISTER:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
/* LOGIN MONGO */
router.post("/login", async (req, res) => {
 

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        error: "Usuário não encontrado",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        error: "Usuário sem password no banco",
      });
    }

    const ok = await bcrypt.compare(
      password,
      user.password.trim()
    );

    if (!ok) {
      return res.status(400).json({
        error: "Senha inválida",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        isPro: user.isPro,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("ERRO LOGIN MONGO:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
