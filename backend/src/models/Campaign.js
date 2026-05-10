import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {userId: {
  type: String,
  required: true
},
    name: String,
    link: String,image: String,ownerId: String,
    clicks: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const { name, link, image, ownerId } = req.body;

const campanha = await Campaign.create({
  name,
  link,
  image,
  ownerId
});
export default mongoose.model("Campaign", campaignSchema);
app.post("/campaigns", async (req, res) => {
  try {
    const { ownerId } = req.body;

    // 🔍 buscar usuário
    const user = await User.findOne({ email: ownerId });

    // ❌ bloqueio PRO
    if (!user || !user.isPro) {
      return res.status(403).json({
        error: "Apenas usuários PRO podem criar campanhas"
      });
    }

    const campaign = await Campaign.create(req.body);
    res.json(campaign);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});