import { seedUserCampaigns } from "../services/seedUserCampaigns.js";
import User from "../../models/User.js";
import Campaign from "../../models/Campaign.js";
import { generatePost } from "../services/aiTextGenerator.js";
import { publishPost } from "../services/metaPublisher.js";

export async function runTest() {
  try {
    console.log("🚀 Robô multiusuário rodando...");

    const users = await User.find({
  email: {
    $exists: true,
    $ne: ""
  }
});

await new Promise((r) => setTimeout(r, 1500));

    for (const user of users) {

      

      await seedUserCampaigns(user._id);

      const campaigns = await Campaign.find({
        userId: user._id,
        active: true,
      });

   

      if (!campaigns.length) {
        continue;
      }

      const random =
        campaigns[Math.floor(Math.random() * campaigns.length)];

      try {

        const text = await generatePost(random.link);

     

        const result = await publishPost(
          text + "\n\n👉 " + random.link
        );

        console.log("✅ META:", result);

      } catch (err) {

        

       
      }
    }

  } catch (err) {

    ;

  }
}