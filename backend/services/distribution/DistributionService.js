import Campaign from "../../models/Campaign.js";
import Distribution from "../../models/Distribution.js";
import ChannelConnection from "../../models/ChannelConnection.js";
import { getChannelAdapter } from "./ChannelAdapterResolver.js";
import { decryptCredential } from "../../utils/credentialCrypto.js";
import { applyChannelPolicy } from "../policies/ChannelPolicyResolver.js";

export async function publishDistribution(distributionId) {
  const distribution =
    await Distribution.findOneAndUpdate(
      {
        _id: distributionId,
        status: {
          $in: ["scheduled", "failed"],
        },
      },
      {
        $set: {
          status: "processing",
          lastError: null,
        },
        $inc: {
          attempts: 1,
        },
      },
      {
        new: true,
      }
    );

  if (!distribution) {
    const existing =
      await Distribution.findById(distributionId);

    if (!existing) {
      throw new Error(
        "DistribuiÃ§Ã£o nÃ£o encontrada."
      );
    }

    if (existing.status === "published") {
      return {
        success: true,
        alreadyPublished: true,
        distribution: existing,
      };
    }

    if (existing.status === "cancelled") {
      throw new Error(
        "DistribuiÃ§Ã£o cancelada."
      );
    }

    if (existing.status === "processing") {
      return {
        success: true,
        alreadyProcessing: true,
        distribution: existing,
      };
    }

    throw new Error(
      `DistribuiÃ§Ã£o em estado invÃ¡lido: ${existing.status}`
    );
  }

  try {
  const campaign = await Campaign.findOne({
    _id: distribution.campaignId,
    userId: distribution.userId,
    active: true,
  });

    if (!campaign) {
    throw new Error("Campanha nÃ£o encontrada ou inativa.");
  }

    const connection = await ChannelConnection.findOne({
    userId: distribution.userId,
    provider: distribution.channel,
    destinationId: distribution.destinationId,
    active: true,
  }).select("+credential");

    if (!connection) {
    throw new Error("ConexÃ£o do canal nÃ£o encontrada ou inativa.");
  }



    let result;

    if (distribution.channel === "telegram") {
      const botToken = decryptCredential(
        connection.credential
      );

      const telegramContent = applyChannelPolicy({
        channel: distribution.channel,
        content: {
          channel: distribution.channel,
          text: distribution.content.text,
        },
        trackingUrl:
          distribution.content.trackingUrl,
      });

      const channelAdapter = getChannelAdapter(
        distribution.channel
      );

      result = await channelAdapter({
        botToken,
        destinationId: distribution.destinationId,
        text: telegramContent.finalText,
      });
    } else {
      throw new Error(
        `Canal nÃ£o suportado: ${distribution.channel}`
      );
    }

    distribution.status = "published";
    distribution.publishedAt = new Date();
    distribution.externalMessageId = result.messageId;
    distribution.lastError = null;

    await distribution.save();

    connection.lastUsedAt = new Date();
    await connection.save();

    return {
      success: true,
      distribution,
      providerResult: result,
    };
  } catch (error) {
    distribution.status = "failed";
    distribution.lastError = error.message;

    await distribution.save();

    throw error;
  }
}
