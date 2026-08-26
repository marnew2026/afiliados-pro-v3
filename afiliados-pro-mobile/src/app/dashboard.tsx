import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState, useCallback, useRef } from "react";
import { AppState } from "react-native";
import { copyToClipboard } from "../utils/copyToClipboard";
import { formatMoney } from "../utils/formatMoney";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "expo-router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SummaryCards from "../components/dashboard/SummaryCards";
import DashboardCard from "../components/dashboard/DashboardCard";
import CampaignCardV2 from "../components/dashboard/CampaignCardV2";
import useDashboard from "../hooks/useDashboard";
import PerformanceCard from "../components/dashboard/PerformanceCard";
import BalanceCard from "../components/dashboard/BalanceCard";
import HomeHeader from "../components/dashboard/HomeHeader";
import StatsCards from "../components/dashboard/StatsCards";


import Kael from "../components/kael/Kael";
import api from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";
import useDashboardService from "../hooks/useDashboardService";
type Campaign = {
  _id: string;
  nome: string;
  link: string;
  active: boolean;
  clicks?: number;
  sales?: number;
  earnings?: number;
  createdAt?: string;
  status?: string;
};

type DashboardState = {
  totalEarnings: number;
  totalWithdrawn: number;
  availableBalance: number;
  totalClicks: number;
  isPro: boolean;

  user?: {
    _id: string;
    name: string;
    email: string;
    plan: string;
    isPro: boolean;
  };

};

export default function Dashboard() {
 const {
  loading,
  setLoading,

  refreshing,
  setRefreshing,

  campaigns,
  setCampaigns,

  dashboard,
  setDashboard,

  formatMoney,
} = useDashboard();
const firstFocus = useRef(true);




  // 🔥 LOAD DASHBOARD
  const { loadDashboard: loadDashboardService } = useDashboardService();
const loadDashboard = useCallback(async (userId: string) => {
  const token = await AsyncStorage.getItem("token");


  console.log("🔥 LOAD DASHBOARD EXECUTOU");
 
  if (!userId) return;

  try {
  const dashboardRes = await api.get(`/dashboard/${userId}`);

const dashboardData = dashboardRes.data;
    console.log("🔥 DASHBOARD API:");
   

  

    console.log("🔥 USER ID:");
    
setDashboard({
  totalEarnings:
    dashboardData.wallet?.totalEarned || 0,

  totalWithdrawn:
    dashboardData.wallet?.totalWithdrawn || 0,

  availableBalance:
    dashboardData.wallet?.availableBalance || 0,

  totalClicks:
    dashboardData.metrics?.totalClicks || 0,

  isPro:
    dashboardData.user?.isPro || false,

  user: dashboardData.user,
});

console.log("========== CAMPANHAS ==========");
console.log("TOTAL:", dashboardData.campaigns?.length);

console.log("===============================");
    setCampaigns(dashboardData.campaigns || []);


  } catch (err: any) {

  console.log("========== DASHBOARD ERROR ==========");

  console.log("Message:", err.message);

  console.log("Status:", err.response?.status);

 

  console.log("URL:", err.config?.url);

  console.log("====================================");

} finally {
  setLoading(false);
  setRefreshing(false);
}
}, []);

  // 🔥 AUTH LISTENER
 // 🔥 AUTH MONGO + JWT
useEffect(() => {

  console.log("🚀 DASHBOARD MONTADO");

  async function initDashboard() {

    try {

      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      console.log("==============================");
      console.log("🔐 INICIANDO DASHBOARD");
      console.log("TOKEN EXISTE:", token ? "SIM" : "NÃO");
      console.log("USER ID:", userId);
      console.log("==============================");

      if (!token || !userId) {

        console.log(
          "❌ SESSÃO NÃO ENCONTRADA"
        );

        return;
      }

      console.log(
        "✅ SESSÃO MONGO ENCONTRADA"
      );

      await loadDashboard(userId);

    } catch (error: any) {

      console.log(
        "❌ ERRO AO INICIAR DASHBOARD:",
        error.message
      );

    }

  }

  initDashboard();

}, [loadDashboard]);

useFocusEffect(
  useCallback(() => {

    if (firstFocus.current) {
      firstFocus.current = false;
      return;
    }

    async function reload() {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
       console.log("🔄 RECARREGANDO DASHBOARD");

setLoading(true);

await loadDashboard(userId);
      }
    }

    reload();

  }, [loadDashboard])
);

useEffect(() => {
  const subscription = AppState.addEventListener("change", async (state) => {
   if (state === "active") {
  const userId = await AsyncStorage.getItem("userId");

  if (userId) {
    console.log("🔄 App voltou para frente. Atualizando dashboard...");

    setRefreshing(true);

    try {
      await loadDashboard(userId);
    } finally {
      setRefreshing(false);
    }
  }
}
  });

  return () => subscription.remove();
}, [loadDashboard]);
  // 🔥 REFRESH
  async function handleRefresh() {
    setRefreshing(true);

    try {
     const userId = await AsyncStorage.getItem("userId");

if (userId) {
  await loadDashboard(userId);
}
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Falha ao atualizar");
    } finally {
      setRefreshing(false);
    }
  }

 

  const d = dashboard;
  const list = campaigns;
  


  // 🔥 LOADING UI
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0f172a",
        }}
      >
        
         <Kael state="working" />
      </View>
    );
  }

 return (
  <>
    {refreshing && <Kael state="working" />}

    <ScrollView
  showsVerticalScrollIndicator={false}
  style={{ flex: 1, backgroundColor: "#0f172a" }}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
         tintColor="#FFD700"
      colors={["#FFD700"]}
    />
  }
>
  <View style={{ padding: 20 }}>
    
 <HomeHeader
  name={d.user?.name}
/>

<Kael />

    <BalanceCard
  balance={d.availableBalance}
  formatMoney={formatMoney}
  onWithdraw={() => router.push("/saque" as any)}
  onCampaign={() => router.push("/create" as any)}
/>


<SummaryCards
  isPro={d.isPro}
  totalCampaigns={list.length}
  totalClicks={d.totalClicks}
  totalEarnings={d.totalEarnings}
  availableBalance={d.availableBalance}
  formatMoney={formatMoney}
/>


      {/* TOTAL SACADO */}
    <View
  style={{
    backgroundColor:"#2a2110",
    padding:20,
    borderRadius:24,
    marginTop:16,

    borderWidth:1,
    borderColor:"#D4AF37",

    shadowColor:"#D4AF37",
    shadowOpacity:0.18,
    shadowRadius:8,
    elevation:6,
  }}
>

        <View
          style={{
            flexDirection:"row",
            alignItems:"center",
          }}
        >

       

      <Text
  style={{
    color:"#FFD700",
    fontSize:18,
    fontWeight:"bold",
  }}
>
  💰💰 Total Sacado 💰💰
</Text>

        </View>


     <Text
  style={{
    color:"#FFD700",
    fontSize:28,
    fontWeight:"bold",
    marginTop:8,
  }}
>
  {formatMoney(d.totalWithdrawn)}
</Text>

      </View>

        {/* AÇÕES */}
      <View
        style={{
          flexDirection:"row",
          flexWrap:"wrap",
          justifyContent:"space-between",
          marginTop:22,
        }}
      >


       {/* CAMPANHAS */}
<TouchableOpacity
  onPress={() => router.push("/campanhas" as any)}
         style={{
  width:"48%",
  backgroundColor:"#1e3a8a",   // mantém exatamente esse azul

  borderRadius:22,

  paddingVertical:20,
  paddingHorizontal:16,

  marginBottom:16,

  borderWidth:1,
  borderColor:"#2563eb",      

  shadowColor:"#22c55e",
  shadowOpacity:0.10,
  shadowRadius:6,

  elevation:4,
}}
        >

        <Ionicons
  name="add-circle"
  size={34}
  color="#60a5fa"
/>

          <Text
            style={{
              color:"#fff",
              fontSize:18,
              fontWeight:"bold",
              marginTop:12,
            }}
          >
        Campanhas
          </Text>

          <Text
            style={{
              color:"#cbd5e1",
              fontSize:13,
              marginTop:6,
            }}
          >
           🚀 Crie, edite e acompanhe suas campanhas.
          </Text>

        </TouchableOpacity>



        {/* SAQUE */}
        <TouchableOpacity
          onPress={()=>{
            if(Number(d.availableBalance || 0) <= 0){
              Alert.alert(
                "Erro",
                "Sem saldo disponível"
              );
              return;
            }

            router.push("/saque" as any);
          }}
       style={{
  width:"48%",
  backgroundColor:"#14532d",

  borderRadius:22,

  paddingVertical:20,
  paddingHorizontal:16,

  marginBottom:16,

  borderWidth:1,
  borderColor:"#4ade80",

  shadowColor:"#4ade80",
  shadowOpacity:0.12,
  shadowRadius:6,

  elevation:4,
}}
        >

          <Ionicons
            name="wallet"
            size={34}
            color="#4ade80"
          />


          <Text
            style={{
              color:"#fff",
              fontSize:18,
              fontWeight:"bold",
              marginTop:12,
            }}
          >
            Saque PIX
          </Text>


          <Text
            style={{
              color:"#cbd5e1",
              fontSize:13,
              marginTop:6,
            }}
          >
            💸 Transfira seu dinheiro quando quiser.
          </Text>

        </TouchableOpacity>




        {/* PLANO PRO */}
        <TouchableOpacity
          onPress={() => {

  if (d.isPro) {
Alert.alert(
  "👑 Benefícios PRO",
  "Sua assinatura está ativa.\n\nTodos os recursos já estão liberados."
);
    return;
  }

  router.push("/checkout" as any);

}}
          style={{
  width:"48%",
  backgroundColor:"#78350f",

  borderRadius:22,

  paddingVertical:20,
  paddingHorizontal:16,

  marginBottom:16,

  borderWidth:1,
  borderColor:"#fbbf24",

  shadowColor:"#fbbf24",
  shadowOpacity:0.12,
  shadowRadius:6,

  elevation:4,
}}
        >

          <Ionicons
            name="diamond"
            size={34}
            color="#fbbf24"
          />


         <Text
  style={{
    color:"#fff",
    fontSize:18,
    fontWeight:"bold",
    marginTop:12,
  }}
>
  {d.isPro ? "Benefícios PRO" : "Plano PRO"}
</Text>


          <Text
  style={{
    color:"#fde68a",
    fontSize:13,
    marginTop:6,
  }}
>
  {d.isPro
    ? "Todos os recursos premium estão disponíveis."
    : "⭐ Experimente o máximo do Afiliados Pro."}
</Text>


        </TouchableOpacity>




        {/* ADMIN */}
        <TouchableOpacity
          onPress={()=>{
            router.push("/admin" as any);
          }}
         style={{
  width:"48%",
  backgroundColor:"#7f1d1d",

  borderRadius:22,

  paddingVertical:20,
  paddingHorizontal:16,

  marginBottom:16,

  borderWidth:1,
  borderColor:"#f87171",

  shadowColor:"#f87171",
  shadowOpacity:0.12,
  shadowRadius:6,

  elevation:4,
}}
        >

          <Ionicons
            name="settings"
            size={34}
            color="#f87171"
          />


          <Text
            style={{
              color:"#fff",
              fontSize:18,
              fontWeight:"bold",
              marginTop:12,
            }}
          >
           Painel Financeiro
          </Text>


          <Text
            style={{
              color:"#fecaca",
              fontSize:13,
              marginTop:6,
            }}
          >
       Saques, extrato e movimentações.
          </Text>


        </TouchableOpacity>


      </View>
        {/* ATIVIDADE RECENTE */}
<View
  style={{
    backgroundColor: "#172554",
    borderRadius: 22,
    padding: 18,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#22c55e",
  }}
>
  <Text
    style={{
      color: "#fff",
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
    }}
  >
    📈 Atividade Recente
  </Text>
</View>

    <StatsCards
  balance={d.availableBalance}
  totalEarned={d.totalEarnings}
  campaigns={campaigns.length}
  clicks={d.totalClicks}
  isPro={d.isPro}
  withdrawn={d.totalWithdrawn}
  formatMoney={formatMoney}
/>



{false && (
  <>
    {list.map((item) => (
      <CampaignCardV2
        key={item._id}
        item={item}
        copiar={copyToClipboard}
        formatMoney={formatMoney}
        loadDashboard={loadDashboard}
      />
    ))}
  </>
)}


    </View>

    </ScrollView>
  </>
);
}