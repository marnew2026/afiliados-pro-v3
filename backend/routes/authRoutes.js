import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { protect } from "../middlewares/authMiddleware.js";
import { grantFoundingAccess } from "../services/founding/FoundingCohortService.js";
import {
  publicAccessDetails,
  refreshUserAccess,
} from "../services/founding/UserAccessService.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  console.log("🚀 ENTROU NA ROTA /auth/register");

  try {
    const { name, password } = req.body;
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

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

    try {
      await grantFoundingAccess({ user });
    } catch (founderError) {
      console.error("ERRO FOUNDING COHORT:", founderError.message);
    }

    console.log("✅ USUÁRIO CRIADO NO MONGO");

    const token = jwt.sign(
      { id: user._id, tokenVersion: Number(user.tokenVersion || 0) },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        ...publicAccessDetails(user),
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
    const { password } = req.body;
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

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

    await refreshUserAccess(user);

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
        tokenVersion: Number(user.tokenVersion || 0),
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
        ...publicAccessDetails(user),
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


/* LOGOUT */
router.post("/logout", protect, async (req, res) => {
  try {
    req.user.tokenVersion = Number(req.user.tokenVersion || 0) + 1;
    await req.user.save();

    return res.json({ message: "Logout realizado com sucesso" });
  } catch (err) {
    console.error("ERRO LOGOUT:", err);
    return res.status(500).json({ error: "Erro interno no logout" });
  }
});

export default router;
