import { useState, useCallback } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function useCampaigns() {
  const [search, setSearch] = useState("");

  const [campaigns, setCampaigns] = useState<any[]>([]);

  const totalCampaigns = campaigns.length;
  const campaignsFiltered = campaigns.filter((item) =>
  item.nome
    ?.toLowerCase()
    .includes(search.toLowerCase())
);
const totalClicks = campaigns.reduce(
  (total, item) => total + (item.clicks || 0),
  0
);
const totalEarningsCents = campaigns.reduce(
  (total, item) =>
    total + Math.round(Number(item.earnings || 0) * 100),
  0
);

const totalEarnings = totalEarningsCents / 100;
const loadCampaigns = useCallback(async () => {

  console.log("🚀 LOAD CAMPAIGNS EXECUTOU");

 try {

  console.log("🚀 TRY LOAD CAMPAIGNS");

const userId = await AsyncStorage.getItem("userId");

console.log("USER ID:");


const response = await api.get(`/campaigns/user/${userId}`);

  console.log("========== CAMPAIGNS API ==========");

  console.log(JSON.stringify(response.data, null, 2));

setCampaigns(response.data);

console.log("===================================");

} catch (error: any) {

    console.log("========== CAMPAIGNS ERROR ==========");

    console.log(error.message);

    console.log("====================================");

  }

}, []);

  return {
  search,
  setSearch,

  campaigns: campaignsFiltered,
  setCampaigns,

  totalCampaigns,
  totalClicks,
  totalEarnings,

  loadCampaigns,
};
}