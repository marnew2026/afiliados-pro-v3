import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());

app.use(express.json());

/* =========================
   MONGODB
========================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("🔥 MongoDB conectado");
  })
  .catch((err) => {
    console.log("Erro MongoDB:", err);
  });

/* =========================
   MODELS
========================= */
const UserSchema = new mongoose.Schema({
  email: String,
  isPro: {
    type: Boolean,
    default: false,
  },
});

const CampaignSchema = new mongoose.Schema({
  name: String,
  link: String,
  clicks: {
    type: Number,
    default: 0,
  },
  ownerId: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

const Campaign = mongoose.model(
  "Campaign",
  CampaignSchema
);

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.send("🚀 Backend OK");
});

/* =========================
   USER
========================= */
app.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res.json({
        isPro: false,
      });
    }

    res.json(user);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro user",
    });
  }
});

/* =========================
   LISTAR CAMPANHAS
========================= */
app.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      ownerId: req.query.ownerId,
    });

    res.json(campaigns);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro campanhas",
    });
  }
});

/* =========================
   CRIAR CAMPANHA
========================= */
app.post("/campaigns", async (req, res) => {
  try {
    const {
      name,
      link,
      ownerId,
      email,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user?.isPro) {
      return res.status(403).json({
        error: "PRO necessário",
      });
    }

    const campaign = await Campaign.create({
      name,
      link,
      ownerId,
      email,
    });

    res.json(campaign);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro criar campanha",
    });
  }
});

/* =========================
   STRIPE CHECKOUT
========================= */
app.post("/create-checkout", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email obrigatório",
      });
    }

    let user = await User.findOne({
      email,
    });

    if (!user) {
      user = await User.create({
        email,
        isPro: false,
      });
    }

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        mode: "payment",

        customer_email: email,

        line_items: [
          {
            price:
              process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],

        success_url:
          "https://afiliados-pro-v3-2.onrender.com/success",

        cancel_url:
          "https://afiliados-pro-v3-2.onrender.com/cancel",
      });

    res.json({
      url: session.url,
    });

  } catch (err) {
    console.log("ERRO STRIPE:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================
   SUCCESS
========================= */
app.get("/success", async (req, res) => {
  try {
    const email = req.query.email;

    if (email) {
      await User.findOneAndUpdate(
        { email },
        {
          isPro: true,
        }
      );
    }

    res.send("Pagamento aprovado");

  } catch (err) {
    console.log(err);

    res.send("Erro success");
  }
});

/* =========================
   CANCEL
========================= */
app.get("/cancel", (req, res) => {
  res.send("Pagamento cancelado");
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(
    `🚀 BACKEND RODANDO NA ${PORT}`
  );
});