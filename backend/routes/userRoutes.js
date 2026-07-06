import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
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
        role: user.role,
        isPro: user.isPro,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/pro/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    return res.json({
      isPro: user?.isPro || false,
      plan: user?.plan || "FREE",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;