import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildApiUrl } from "./apiEnvironment";

const READINESS_URL = buildApiUrl("/admin/integrations/readiness");

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type ChannelReadiness = {
  channel: string;
  approvalStatus: ApprovalStatus;
  configured: boolean;
  enabled: boolean;
  emergencyDisabled: boolean;
  stagingTested: boolean;
  productionReleased: boolean;
  readyForStaging: boolean;
  readyForProduction: boolean;
  missingEnvironmentKeys: string[];
  blockers: string[];
};

export type IntegrationReadiness = {
  generatedAt: string;
  safeByDefault: boolean;
  channels: ChannelReadiness[];
  summary: {
    total: number;
    approved: number;
    readyForStaging: number;
    readyForProduction: number;
  };
};

export async function fetchIntegrationReadiness() {
  const distributionToken = await AsyncStorage.getItem("distributionToken");
  const mainToken = await AsyncStorage.getItem("token");
  const token = distributionToken || mainToken;

  if (!token) {
    const error = new Error("Sessao administrativa nao encontrada.");
    (error as any).code = "NO_SESSION";
    throw error;
  }

  const { data } = await axios.get(READINESS_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 20000,
  });

  if (!data?.success || !data?.readiness) {
    throw new Error("O servidor nao retornou o estado das integracoes.");
  }

  return data.readiness as IntegrationReadiness;
}
