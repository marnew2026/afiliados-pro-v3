import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function useDashboardService() {

  async function loadDashboard(
    userId: string,
    actions: {
      setDashboard: (data: any) => void;
      setCampaigns: (data: any[]) => void;
      setLoading: (v: boolean) => void;
      setRefreshing: (v: boolean) => void;
    }
  ) {

    const token = await AsyncStorage.getItem("token");

    console.log("TOKEN NO DASHBOARD:");
  

    console.log("🔥 LOAD DASHBOARD EXECUTOU");

    if (!userId) return;

    // AQUI vai entrar o try no próximo passo.
try {

  const dashboardRes = await api.get(`/dashboard/${userId}`);

  const dashboardData = dashboardRes.data;

  console.log("🔥 DASHBOARD API:");
 

  console.log("🔥 USER ID:");
  

} catch (err: any) {

  console.log("========== DASHBOARD ERROR ==========");

  console.log("Message:", err.message);

  console.log("Status:", err.response?.status);

  console.log("Data:", err.response?.data);

  console.log("URL:", err.config?.url);

  console.log("====================================");

} finally {

  actions.setLoading(false);

  actions.setRefreshing(false);

}
  }

  return {
    loadDashboard,
  };

}