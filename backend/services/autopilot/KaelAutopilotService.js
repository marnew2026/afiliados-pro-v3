import Campaign from "../../models/Campaign.js";
import ChannelConnection from "../../models/ChannelConnection.js";
import Distribution from "../../models/Distribution.js";
import AutopilotSettings from "../../models/AutopilotSettings.js";


import crypto from "crypto";

function buildKaelContent(campaign) {
  const campaignName = String(campaign.nome || "").trim();

  return [
    "Oferta selecionada pelo KAEL",
    "",
    campaignName,
    "",
    "Confira os detalhes no link abaixo.",
  ].join("\n");
}

export async function runKaelAutopilotOnce(userId) {
  if (!userId) {
    throw new Error("userId nao informado ao KAEL Autopilot.");
  }

  const currentSettings = await AutopilotSettings.findOne({
    userId,
  }).lean();

  if (!currentSettings) {
    return {
      success: true,
      skipped: true,
      reason: "settings_not_found",
    };
  }

  if (!currentSettings.enabled) {
    return {
      success: true,
      skipped: true,
      reason: "autopilot_disabled",
    };
  }

  if (currentSettings.mode !== "automatico") {
    return {
      success: true,
      skipped: true,
      reason: "autopilot_not_automatic",
    };
  }

  if (!currentSettings.channels.includes("telegram")) {
    return {
      success: true,
      skipped: true,
      reason: "telegram_not_enabled",
    };
  }

  const now = new Date();
  const lockToken = crypto.randomUUID();

  const lockUntil = new Date(
    now.getTime() + 5 * 60 * 1000
  );

  const settings =
    await AutopilotSettings.findOneAndUpdate(
      {
        userId,
        enabled: true,
        mode: "automatico",
        channels: "telegram",
        $or: [
          {
            runLockedUntil: null,
          },
          {
            runLockedUntil: {
              $lte: now,
            },
          },
        ],
      },
      {
        $set: {
          runLockedUntil: lockUntil,
          runLockToken: lockToken,
        },
      },
      {
        new: true,
      }
    );

  if (!settings) {
    return {
      success: true,
      skipped: true,
      reason: "autopilot_locked",
    };
  }

  try {
    const connection = await ChannelConnection.findOne({
      userId,
      provider: "telegram",
      active: true,
    }).lean();

    if (!connection) {
      return {
        success: true,
        skipped: true,
        reason: "telegram_connection_not_found",
      };
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const publicationsToday =
      await Distribution.countDocuments({
        userId,
        channel: "telegram",
        status: {
          $in: [
            "scheduled",
            "processing",
            "published",
          ],
        },
        createdAt: {
          $gte: startOfDay,
        },
      });

    if (publicationsToday >= settings.dailyLimit) {
      return {
        success: true,
        skipped: true,
        reason: "daily_limit_reached",
      };
    }

    const lastPublishedDistribution =
      await Distribution.findOne({
        userId,
        channel: "telegram",
        status: "published",
        publishedAt: {
          $ne: null,
        },
      })
        .sort({
          publishedAt: -1,
        })
        .select("publishedAt")
        .lean();

    if (lastPublishedDistribution?.publishedAt) {
      const minimumIntervalMs =
        settings.minIntervalMinutes * 60 * 1000;

      const lastPublishedAt =
        new Date(
          lastPublishedDistribution.publishedAt
        );

      const nextAllowedAt =
        lastPublishedAt.getTime() +
        minimumIntervalMs;

      if (Date.now() < nextAllowedAt) {
        return {
          success: true,
          skipped: true,
          reason: "cooldown_active",
          nextAllowedAt: new Date(nextAllowedAt),
        };
      }
    }

    const campaign = await Campaign.findOne({
      userId,
      active: true,
      status: "active",
    })
      .sort({
        clicks: 1,
        createdAt: 1,
      })
      .lean();

    if (!campaign) {
      return {
        success: true,
        skipped: true,
        reason: "campaign_not_found",
      };
    }

    const text = buildKaelContent(campaign);

    const trackingUrl =
      `${process.env.BASE_URL}/campaigns/r/${campaign._id}`;

    const finalTelegramMessage =
      `${text}\n\n${trackingUrl}`;

    if (finalTelegramMessage.length > 4096) {
      throw new Error(
        "Mensagem gerada pelo KAEL excede o limite do Telegram."
      );
    }

    // Revalida o estado imediatamente antes de criar a Distribution.
    // Evita publicação caso o Autopilot tenha sido desligado
    // ou alterado para modo assistido durante esta execução.
    const stillAutomatic = await AutopilotSettings.exists({
      userId,
      enabled: true,
      mode: "automatico",
      channels: "telegram",
      runLockToken: lockToken,
      runLockedUntil: { $gt: new Date() },
    });

    if (!stillAutomatic) {
      return {
        success: true,
        skipped: true,
        reason: "autopilot_state_changed",
      };
    }

    const publishAt = new Date();

    const distribution = await Distribution.create({
      userId,
      campaignId: campaign._id,
      channel: "telegram",
      destinationId: connection.destinationId,

      content: {
        text,
        trackingUrl,
      },

      scheduledAt: publishAt,
      status: "scheduled",
    });

   try {
  const { scheduleDistribution } =
    await import("../../queue/distributionQueue.js");

  const queued = await scheduleDistribution({
    distributionId: distribution._id,
    scheduledAt: publishAt,
  });

      await AutopilotSettings.updateOne(
        {
          _id: settings._id,
          runLockToken: lockToken,
        },
        {
          $set: {
            lastRunAt: new Date(),
          },
        }
      );

      return {
        success: true,
        skipped: false,
        campaignId: campaign._id,
        distributionId: distribution._id,
        queueJobId: queued.jobId,
      };
    } catch (error) {
      distribution.status = "failed";
      distribution.lastError =
        "Falha ao agendar publicacao automatica.";

      await distribution.save();

      throw error;
    }
  } finally {
    await AutopilotSettings.updateOne(
      {
        _id: settings._id,
        runLockToken: lockToken,
      },
      {
        $set: {
          runLockedUntil: null,
          runLockToken: null,
        },
      }
    );
  }
}