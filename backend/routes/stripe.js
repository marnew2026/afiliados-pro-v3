import express from "express";
import stripe from "../services/stripe.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/create-checkout", async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",metadata: {
  offerId: offer._id.toString(),
  affiliateId: req.query.aff || "organic",
  commission: commission.toString(),
},
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "checkout error" });
  }
});

export default router;