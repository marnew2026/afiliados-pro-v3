import { seedUserCampaigns } from "../services/seedUserCampaigns.js";
import User from "../../models/User.js";
import Campaign from "../../models/Campaign.js";
import { generatePost } from "../services/aiTextGenerator.js";
import { publishPost } from "../services/metaPublisher.js";

export async function runTest() {
  try {
    console.log("🚀 Robô multiusuário rodando...");

    const users = await User.find({});

    for (const user of users) {

      console.log("👤 USER:", user.email);

      await seedUserCampaigns(user._id);

      const campaigns = await Campaign.find({
        userId: user._id,
        active: true,
      });

      console.log(
        "📦 campanhas do usuário:",
        campaigns.length
      );

      if (!campaigns.length) {
        continue;
      }

      const random =
        campaigns[Math.floor(Math.random() * campaigns.length)];

      try {

        const text = await generatePost(random.link);

        console.log("📝 TEXTO:", text);

        const result = await publishPost(
          text + "\n\n👉 " + random.link
        );

        console.log("✅ META:", result);

      } catch (err) {

        console.log("❌ META ERROR:");

        console.log(
          err?.response?.data ||
          err?.message ||
          err
        );
      }
    }

  } catch (err) {

    console.log(
      "❌ ERRO ROBÔ:",
      err.message
    );

  }
}