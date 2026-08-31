import { useCallback, useEffect, useState } from "react";
import distributionApi from "../services/distributionApi";

export type DistributionChannelConnection = {
  _id: string;
  provider: string;
  destinationId: string;
  destinationName?: string;
  active: boolean;
  connectedAt?: string;
  lastUsedAt?: string | null;
};

export function useDistributionChannels() {
  const [connections, setConnections] = useState<
    DistributionChannelConnection[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConnections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await distributionApi.get("/channel");

      const rawConnections = Array.isArray(data?.connections)
        ? data.connections
        : [];

      const activeConnections = rawConnections.filter(
        (connection: DistributionChannelConnection) =>
          connection.active !== false
      );

      console.log(
        "📣 DISTRIBUTION CHANNELS:",
        activeConnections.length
      );

      setConnections(activeConnections);
    } catch (err: any) {
      console.log(
        "DISTRIBUTION CHANNELS ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível carregar os canais."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  return {
    connections,
    loading,
    error,
    reload: loadConnections,
  };
}