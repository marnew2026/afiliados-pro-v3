import express from "express";
import admin from "../firebaseAdmin.js";

const router = express.Router();

/* =========================
   VERIFY TOKEN
========================= */
router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        error: "Token obrigatório",
      });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    res.json({
      uid: decoded.uid,
      email: decoded.email,
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(401).json({
      error: "Token inválido",
    });
  }
});

/* =========================
   ME
========================= */
router.get("/me", async (req, res) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No token",
      });
    }

    const token = header.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);

    res.json({
      uid: decoded.uid,
      email: decoded.email,
    });
  } catch (err) {
    console.log(err);

    res.status(401).json({
      error: "Unauthorized",
    });
  }
});

export default router;