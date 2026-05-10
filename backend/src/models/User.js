import mongoose from "mongoose";
import User from "./User.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout", async (req, res) => {
  const { uid } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",

    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: "Plano PRO Afiliados"
          },
          unit_amount: 2900, // R$29
          recurring: {
            interval: "month"
          }
        },
        quantity: 1
      }
    ],

    success_url: "https://seuapp.com/success",
    cancel_url: "https://seuapp.com/cancel",

    metadata: {
      uid
    }
  });

  res.json({ url: session.url });
});
let user = await User.findOne({ firebaseId: userId });

if (!user) {
  user = await User.create({
    firebaseId: userId,
    plan: "free"
  });
}
const CampaignSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    link: String,

    price: Number,

    clicks: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },

    ownerId: String
  },
  { timestamps: true }
);
const UserSchema = new mongoose.Schema({
  uid: String,
  email: String,

  plan: { type: String, default: "free" }, // free | pro
  campaignsLimit: { type: Number, default: 3 }
});

const User = mongoose.model("User", UserSchema);
app.post("/user", async (req, res) => {
  const { uid, email } = req.body;

  let user = await User.findOne({ uid });

  if (!user) {
    user = await User.create({ uid, email });
  }

  res.json(user);
});

app.post("/campaigns", async (req, res) => {
  const { ownerId } = req.body;

  const user = await User.findOne({ uid: ownerId });

  const total = await Campaign.countDocuments({ ownerId });

  if (user.plan === "free" && total >= 3) {
    return res.status(403).json({
      error: "Limite do plano free atingido"
    });
  }

  const campanha = await Campaign.create(req.body);

  res.json(campanha);
});

app.post("/webhook", async (req, res) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const uid = session.metadata.uid;

    await User.findOneAndUpdate(
      { uid },
      { plan: "pro", campaignsLimit: 999 }
    );
  }

  res.json({ received: true });
});

export default mongoose.model("User", UserSchema);