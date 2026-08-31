import { useCallback, useEffect, useState } from "react";

import distributionApi from "../services/distributionApi";
import { getDistributionSession } from "../services/distributionAuth";

export type DistributionCampaign = {
  _id: string;
  nome: string;
  link?: string;
  active?: boolean;
  status?: string;
};

export function useDistributionCampaigns() {
  const [campaigns, setCampaigns] = useState<DistributionCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const session = await getDistributionSession();

      if (!session.authenticated || !session.userId) {
        throw new Error("Sessão V4 não encontrada.");
      }

      const { data } = await distributionApi.get(
        `/campaigns/user/${session.userId}`
      );

      const rawCampaigns = Array.isArray(data)
        ? data
        : Array.isArray(data?.campaigns)
        ? data.campaigns
        : [];

      const activeCampaigns = rawCampaigns.filter(
        (campaign: DistributionCampaign) =>
          campaign.active !== false &&
          campaign.status !== "inactive"
      );

      console.log(
        "📣 DISTRIBUTION CAMPAIGNS:",
        activeCampaigns.length
      );

      setCampaigns(activeCampaigns);
    } catch (err: any) {
      console.log(
        "DISTRIBUTION CAMPAIGNS ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível carregar as campanhas."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  return {
    campaigns,
    loading,
    error,
    reload: loadCampaigns,
  };
}