import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.json({ isPro: false });
    }

    res.json({
      isPro: user.isPro || false,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro" });
  }
});

export default router;