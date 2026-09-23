import "dotenv/config";
import mongoose from "mongoose";
import Campaign from "../models/Campaign.js";

const USER_ID = "6a341138e88c46dc47af06f5";
const EXPECTED_CAMPAIGNS = 97;
const EXPECTED_EARNINGS_CENTS = 6790;
const APPLY_TOKEN = "INVALIDATE-CAMPAIGN-EARNINGS-6790";

const applyRequested = process.argv.includes("--apply");
const applyAuthorized =
  process.env.CONFIRM_CAMPAIGN_EARNINGS_INVALIDATION ===
  APPLY_TOKEN;

function toCents(value) {
  return Math.round(Number(value || 0) * 100);
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não encontrada.");
}

await mongoose.connect(process.env.MONGO_URI);

try {
  const campaigns = await Campaign.find({
    userId: USER_ID,
    earnings: { $ne: 0 },
  })
    .sort({ createdAt: 1 })
    .lean();

  const totalEarningsCents = campaigns.reduce(
    (total, campaign) =>
      total + toCents(campaign.earnings),
    0
  );

  const inconsistent = campaigns.filter(
    (campaign) =>
      Number(campaign.sales || 0) !== 0 ||
      toCents(campaign.earnings) !==
        Number(campaign.clicks || 0) * 10
  );

  console.log("\n===== SIMULAÇÃO DAS CAMPANHAS =====");
  console.table([
    {
      userId: USER_ID,
      campaignsToCorrect: campaigns.length,
      earningsToInvalidate: totalEarningsCents / 100,
      inconsistentCampaigns: inconsistent.length,
      clicksPreserved: campaigns.reduce(
        (total, campaign) =>
          total + Number(campaign.clicks || 0),
        0
      ),
      salesPreserved: campaigns.reduce(
        (total, campaign) =>
          total + Number(campaign.sales || 0),
        0
      ),
      expectedEarningsAfter: 0,
    },
  ]);

  if (
    campaigns.length !== EXPECTED_CAMPAIGNS ||
    totalEarningsCents !== EXPECTED_EARNINGS_CENTS ||
    inconsistent.length !== 0
  ) {
    throw new Error(
      "Proteção acionada: os dados diferem da auditoria aprovada."
    );
  }

  if (!applyRequested) {
    console.log(
      "\nDRY-RUN concluído. Nenhuma campanha foi alterada."
    );
  } else {
    if (!applyAuthorized) {
      throw new Error(
        "Aplicação bloqueada: confirmação explícita ausente."
      );
    }

    const session = await mongoose.startSession();

    try {
      let result;

      await session.withTransaction(async () => {
        const invalidatedAt = new Date();

        const operations = campaigns.map((campaign) => ({
          updateOne: {
            filter: {
              _id: campaign._id,
              userId: USER_ID,
              earnings: campaign.earnings,
            },
            update: {
              $set: {
                earnings: 0,
                earningsAudit: {
                  invalidatedAmount: campaign.earnings,
                  invalidatedAt,
                  reason:
                    "historical_click_value_not_real_commission",
                },
              },
            },
          },
        }));

        result = await Campaign.bulkWrite(
          operations,
          { session }
        );

        if (result.modifiedCount !== EXPECTED_CAMPAIGNS) {
          throw new Error(
            `Atualização incompleta: ${result.modifiedCount} campanhas.`
          );
        }
      });

      console.log("\n===== CORREÇÃO APLICADA =====");
      console.table([
        {
          modifiedCampaigns: result.modifiedCount,
          invalidatedEarnings:
            EXPECTED_EARNINGS_CENTS / 100,
          expectedEarningsAfter: 0,
        },
      ]);
    } finally {
      await session.endSession();
    }
  }
} finally {
  await mongoose.disconnect();
}