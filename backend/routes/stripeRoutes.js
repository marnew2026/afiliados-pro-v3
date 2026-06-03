import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

router.post(
  "/create-checkout-session",
  async (req, res) => {
    try {
      const { email } = req.body;

      const session =
        await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",

          customer_email: email,

          line_items: [
            {
              price_data: {
                currency: "brl",
                product_data: {
                  name: "Plano PRO",
                },
                unit_amount: 2900,
              },
              quantity: 1,
            },
          ],

          success_url:
            "https://google.com",

          cancel_url:
            "https://google.com",
        });

      res.json({
        url: session.url,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);
export default router;