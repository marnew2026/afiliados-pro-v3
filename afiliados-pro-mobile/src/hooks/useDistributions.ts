import { useCallback, useEffect, useState } from "react";

import distributionApi from "../services/distributionApi";

export type DistributionStatus =
  | "draft"
  | "scheduled"
  | "processing"
  | "published"
  | "failed"
  | "cancelled";

export type DistributionItem = {
  _id: string;
  status: DistributionStatus;
  channel: string;
  destinationId: string;
  attempts: number;
  scheduledAt?: string;
  publishedAt?: string;
  createdAt?: string;
};

export function useDistributions() {
  const [distributions, setDistributions] = useState<DistributionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDistributions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await distributionApi.get("/distribution");

      const items = Array.isArray(data?.distributions)
        ? data.distributions
        : [];

      setDistributions(items);
    } catch (err: any) {
      console.log(
        "DISTRIBUTION LIST ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível carregar as divulgações."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDistributions();
  }, [loadDistributions]);

  return {
    distributions,
    loading,
    error,
    reload: loadDistributions,
  };
}