import React from "react";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { formatMoney } from "../utils/formatMoney";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CampaignCardV2 from "../components/dashboard/CampaignCardV2";
import CampaignSearch from "../components/campaigns/CampaignSearch";
import CampaignStats from "../components/campaigns/CampaignStats";
import CampaignEmpty from "../components/campaigns/CampaignEmpty";
import CampaignList from "../components/campaigns/CampaignList";
import CampaignFilters from "../components/campaigns/CampaignFilters";
import useCampaigns from "../hooks/useCampaigns";

export default function CampaignsScreen() {

 const {
  search,
  setSearch,

  campaigns,

  totalCampaigns,
  totalClicks,
  totalEarnings,

  loadCampaigns,
} = useCampaigns();

React.useEffect(() => {

  loadCampaigns();

}, [loadCampaigns]);

useFocusEffect(
  useCallback(() => {

    console.log("🔄 RECARREGANDO CAMPANHAS");

    loadCampaigns();

  }, [loadCampaigns])
);
React.useEffect(() => {

  const subscription = AppState.addEventListener(
    "change",
    async (state) => {

      if (state === "active") {

        console.log("🔄 APP VOLTOU - RECARREGANDO CAMPANHAS");

        await loadCampaigns();

      }

    }
  );

  return () => subscription.remove();

}, [loadCampaigns]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {/* TÍTULO */}

        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "900",
          }}
        >
          🚀 Campanhas
        </Text>

        <Text
          style={{
            color: "#94a3b8",
            marginTop: 6,
            fontSize: 15,
          }}
        >
          Gerencie todas as suas campanhas.
        </Text>

        {/* BUSCA */}

       <CampaignSearch
  value={search}
  onChangeText={setSearch}
/>

        {/* NOVA CAMPANHA */}

        <TouchableOpacity
  onPress={() => router.push("/create" as any)}
  style={{
            marginTop: 20,
            backgroundColor: "#2563eb",
            height: 58,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            ➕ Nova Campanha
          </Text>
        </TouchableOpacity>

        {/* ESTATÍSTICAS */}

  <CampaignStats
  totalCampaigns={totalCampaigns}
  totalClicks={totalClicks}
  totalEarnings={formatMoney(totalEarnings)}
/>
<CampaignFilters />

    {/* LISTA */}

<View
  style={{
    marginTop: 24,
  }}
>
  <Text
    style={{
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    }}
  >
    Minhas Campanhas
  </Text>

  {/* Lista de campanhas virá aqui */}

 <CampaignList
  campaigns={campaigns}
  copiar={() => {}}
  formatMoney={(v) => String(v)}
  loadDashboard={loadCampaigns}
/>

</View>

      </ScrollView>
    </SafeAreaView>
  );
}