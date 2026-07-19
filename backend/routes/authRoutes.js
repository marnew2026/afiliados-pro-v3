import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
console.log("🔥🔥🔥 TESTE AUTH 19-07-02 CARREGADO 🔥🔥🔥");
const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const affiliateCode = crypto.randomBytes(4).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "affiliate",
      affiliateCode,
    });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
    console.log("🔥 ENTROU NA ROTA /auth/login");
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });
console.log("🔥 USER ENCONTRADO NO LOGIN:");
console.log(JSON.stringify(user, null, 2));

 console.log("PASSWORD RECEBIDO:", password);
console.log("PASSWORD BANCO:", user.password);

if (!password) {
  return res.status(400).json({
    error:"PASSWORD VEIO VAZIO"
  });
}

if (!user.password) {
  return res.status(400).json({
    error:"USUARIO SEM PASSWORD NO BANCO"
  });
}

const ok = await bcrypt.compare(
  String(password).trim(),
  String(user.password).trim()
);

console.log("RESULTADO BCRYPT:", ok);
    console.log("🔥 RESULTADO BCRYPT:");
    console.log(ok);
    if (!ok) return res.status(400).json({ error: "Senha inválida" });
    console.log("🔥 GERANDO JWT");
console.log("JWT SECRET EXISTE:", !!process.env.JWT_SECRET);

  const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "30d",
  }
);
console.log("🔥 TOKEN GERADO");
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
    return res.status(500).json({ error: err.message });
  }
});
/* FIREBASE LOGIN */
router.post("/firebase-login", async (req, res) => {
  try {
    const { email, firebaseUid } = req.body;

    if (!email || !firebaseUid) {
      return res.status(400).json({
        error: "email e firebaseUid são obrigatórios",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        firebaseUid,
        name: "",
      });
    } else if (!user.firebaseUid) {
      user.firebaseUid = firebaseUid;
      await user.save();
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
        email: user.email,
        name: user.name,
        plan: user.plan,
        isPro: user.isPro,
      },
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
export default router;