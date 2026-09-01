const SUPPORTED_CHANNELS = [
  "telegram",
  "tiktok",
  "instagram",
  "kwai",
  "facebook",
];

const CHANNEL_PROFILES = {
  telegram: {
    contentType: "text",
    aspectRatio: null,
    maxDurationSeconds: null,
  },

  tiktok: {
    contentType: "short_video",
    aspectRatio: "9:16",
    maxDurationSeconds: null,
  },

  instagram: {
    contentType: "short_video",
    aspectRatio: "9:16",
    maxDurationSeconds: null,
  },

  kwai: {
    contentType: "short_video",
    aspectRatio: "9:16",
    maxDurationSeconds: null,
  },

  facebook: {
    contentType: "short_video",
    aspectRatio: "9:16",
    maxDurationSeconds: null,
  },
};

function normalizeCampaignName(campaign) {
  return String(campaign?.nome || "").trim();
}

function buildBaseContent(campaign) {
  const campaignName = normalizeCampaignName(campaign);

  if (!campaignName) {
    throw new Error(
      "Campanha sem nome para geracao de conteudo."
    );
  }

  return {
    title: "Oferta selecionada pelo KAEL",

    text: [
      "Oferta selecionada pelo KAEL",
      "",
      campaignName,
      "",
      "Confira os detalhes no link abaixo.",
    ].join("\n"),

    caption: campaignName,
    hashtags: [],
    cta: "Confira os detalhes.",
  };
}
export function buildKaelContent({
  campaign,
  channel,
}) {
  if (!campaign?._id) {
    throw new Error(
      "Campanha invalida para o KAEL Content Engine."
    );
  }

  if (!SUPPORTED_CHANNELS.includes(channel)) {
    throw new Error(
      `Canal nao suportado pelo KAEL Content Engine: ${channel}`
    );
  }

  const baseContent = buildBaseContent(campaign);
  const profile = CHANNEL_PROFILES[channel];

  return {
    campaignId: String(campaign._id),
    channel,

    contentType: profile.contentType,

    title: baseContent.title,
    text: baseContent.text,
    caption: baseContent.caption,
    hashtags: baseContent.hashtags,
    cta: baseContent.cta,

    media: {
      type:
        profile.contentType === "short_video"
          ? "video"
          : null,
      aspectRatio: profile.aspectRatio,
      maxDurationSeconds:
        profile.maxDurationSeconds,
    },
  };
}
