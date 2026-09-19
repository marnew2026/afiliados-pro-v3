const VALUE_LABELS = {
  campaigns: "Campanhas",
  kael: "KAEL",
  distribution: "Divulgacao",
  dashboard: "Painel",
  withdrawals: "Saque",
  other: "Outro",
};

const DIFFICULTY_LABELS = {
  none: "Nenhuma",
  onboarding: "Primeiros passos",
  campaigns: "Campanhas",
  connections: "Conectar canais",
  publishing: "Publicar",
  understanding_results: "Entender resultados",
  other: "Outra",
};

export function buildFounderAdminRows({ founders = [], activityDays = [], now = new Date() }) {
  const activityByUser = new Map();

  for (const activity of activityDays) {
    const key = String(activity.userId);
    const current = activityByUser.get(key) || { activeDays: 0, lastActiveAt: null };
    current.activeDays += 1;
    if (!current.lastActiveAt || new Date(activity.day) > new Date(current.lastActiveAt)) {
      current.lastActiveAt = activity.day;
    }
    activityByUser.set(key, current);
  }

  return founders
    .map((founder) => {
      const activity = activityByUser.get(String(founder._id)) || {};
      const endsAt = founder.proAccessEndsAt || null;
      let status = "expired";
      if (founder.accessSource === "STRIPE") status = "converted";
      else if (founder.accessSource === "FOUNDER_TRIAL" && endsAt && new Date(endsAt) > now) status = "active";

      return {
        founderNumber: Number(founder.founderTrialClaimNumber || 0),
        status,
        accessSource: founder.accessSource,
        grantedAt: founder.founderTrialGrantedAt || null,
        accessEndsAt: endsAt,
        activeDays: Number(activity.activeDays || 0),
        lastActiveAt: activity.lastActiveAt || null,
      };
    })
    .sort((a, b) => a.founderNumber - b.founderNumber);
}

export function buildFeedbackAdminRows({ feedbackItems = [], founderNumberById = new Map() }) {
  return feedbackItems.map((item) => ({
    founderNumber: Number(founderNumberById.get(String(item.userId)) || 0),
    rating: Number(item.rating),
    wouldRecommend: Boolean(item.wouldRecommend),
    mostValuable: VALUE_LABELS[item.mostValuable] || "Outro",
    biggestDifficulty: DIFFICULTY_LABELS[item.biggestDifficulty] || "Outra",
    comment: String(item.comment || ""),
    status: item.status,
    submittedAt: item.updatedAt || item.createdAt || null,
  }));
}
