import { useCallback, useState } from "react";

export interface DashboardState {
  totalEarnings: number;
  totalWithdrawn: number;
  availableBalance: number;
  totalClicks: number;
  isPro: boolean;
  user?: any;
}

export interface Campaign {
  _id: string;
  nome: string;
  link: string;
  clicks: number;
  earnings: number;
  active: boolean;
  createdAt?: string;
}

export default function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [dashboard, setDashboard] = useState<DashboardState>({
    totalEarnings: 0,
    totalWithdrawn: 0,
    availableBalance: 0,
    totalClicks: 0,
    isPro: false,
  });

  const formatMoney = useCallback((value: any) => {
    const num = Number(value);

    if (!isFinite(num)) return "0,00";

    return num.toFixed(2);
  }, []);

  return {
    loading,
    setLoading,

    refreshing,
    setRefreshing,

    campaigns,
    setCampaigns,

    dashboard,
    setDashboard,

    formatMoney,
  };
}