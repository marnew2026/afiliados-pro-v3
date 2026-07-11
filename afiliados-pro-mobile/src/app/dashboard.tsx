import { router } from "expo-router";
import { useEffect, useState, useCallback } from "react";

import * as Clipboard from "expo-clipboard";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";

import api from "../services/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Campaign = {
  _id: string;
  nome: string;
  link: string;
  clicks?: number;
  sales?: number;
  earnings?: number;
};

type DashboardState = {
  totalEarnings: number;
  totalWithdrawn: number;
  availableBalance: number;
  totalClicks: number;
  isPro: boolean;
};

export default function Dashboard() {
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



  // 🔥 FORMAT MONEY
  const formatMoney = (value: any) => {
    const num = Number(value);
    if (!isFinite(num)) return "0.00";
    return num.toFixed(2);
  };

  // 🔥 LOAD DASHBOARD
const loadDashboard = useCallback(async (userId: string) => {
  if (!userId) return;

  try {
    const [dashboardRes, walletRes] = await Promise.all([
      api.get(`/dashboard/${userId}`),
      api.get(`/wallet/${userId}`),
    ]);

    const dashboardData = dashboardRes.data;
    const walletData = walletRes.data;
    console.log("🔥 DASHBOARD API:");
    console.log(JSON.stringify(dashboardData, null, 2));

    console.log("🔥 WALLET API:");
    console.log(JSON.stringify(walletData, null, 2));

    console.log("🔥 USER ID:");
    console.log(userId);
    setDashboard({
      totalEarnings: dashboardData.metrics?.totalEarnings || 0,
      totalWithdrawn: 0,
      availableBalance:
        walletData.wallet?.availableBalance || 0,
      totalClicks:
        dashboardData.metrics?.totalClicks || 0,
      isPro:
        dashboardData.user?.isPro || false,
    });

    setCampaigns(dashboardData.campaigns || []);

  } catch (err: any) {

  console.log("========== DASHBOARD ERROR ==========");

  console.log("Message:", err.message);

  console.log("Status:", err.response?.status);

  console.log("Data:", err.response?.data);

  console.log("URL:", err.config?.url);

  console.log("====================================");

} finally {
  setLoading(false);
  setRefreshing(false);
}
}, []);

  // 🔥 AUTH LISTENER
 useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    console.log("🔥 AUTH USER:", user?.uid);


    if (!user) {

      setDashboard({
        totalEarnings: 0,
        totalWithdrawn: 0,
        availableBalance: 0,
        totalClicks: 0,
        isPro:false,
      });

      setCampaigns([]);

      setLoading(false);

      return;
    }


    console.log(
      "📦 USER ID STORAGE:",
      await AsyncStorage.getItem("userId")
    );


    let userId = await AsyncStorage.getItem("userId");


    // recuperação automática Mongo
    if (!userId) {

      console.log(
        "⚠️ Mongo ID não encontrado. Recuperando..."
      );


      try {

       const response = await api.get(
  `/user/firebase/${user.uid}`
);


        console.log(
          "🔥 RESPOSTA MONGO:",
          response.data
        );


        if (response.data?._id) {

  userId = response.data._id;

  await AsyncStorage.setItem(
    "userId",
    response.data._id
  );

  console.log(
    "✅ Mongo UserId recuperado:",
    response.data._id
  );

} else {

  console.log(
    "❌ RESPOSTA SEM ID:",
    response.data
  );

}

        console.log(
          "✅ Mongo UserId recuperado:",
          userId
        );


      } catch(error:any){

        console.log(
          
          "❌ ERRO:",
          error.response?.data || error.message
        );

      }

    }

setLoading(false);
    if(userId){

      await loadDashboard(userId);

    }


  });


  return unsubscribe;


}, []);

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

  // 🔥 COPY LINK
  async function copiar(link: string) {
    await Clipboard.setStringAsync(link);
    Alert.alert("Sucesso", "Link copiado!");
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
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={{ padding: 20 }}>
        <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
          🚀 Dashboard
        </Text>

        {/* CARD */}
        <View
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#94a3b8" }}>💰 Total ganho</Text>
          <Text style={{ color: "#fff", fontSize: 28 }}>
            R$ {formatMoney(d.totalEarnings)}
          </Text>

          <Text style={{ color: "#94a3b8", marginTop: 10 }}>💸 Sacado</Text>
          <Text style={{ color: "#fff", fontSize: 22 }}>
            R$ {formatMoney(d.totalWithdrawn)}
          </Text>

          <Text style={{ color: "#94a3b8", marginTop: 10 }}>👆 Clicks</Text>
          <Text style={{ color: "#fff", fontSize: 22 }}>
            {d.totalClicks}
          </Text>

          <Text style={{ color: "#94a3b8", marginTop: 10 }}>📈 Disponível</Text>
          <Text style={{ color: "#22c55e", fontSize: 28 }}>
            R$ {formatMoney(d.availableBalance)}
          </Text>
        </View>

        {/* ACTIONS */}
        <TouchableOpacity
          onPress={() => router.push("/create" as any)}
          style={{
            backgroundColor: "#2563eb",
            padding: 16,
            borderRadius: 12,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            ➕ Nova campanha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (Number(d.availableBalance || 0) <= 0) {
              Alert.alert("Erro", "Sem saldo disponível");
              return;
            }
            router.push("/saque" as any);
          }}
          style={{
            backgroundColor: "#16a34a",
            padding: 16,
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            💸 Saque PIX
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (d?.isPro) {
              Alert.alert("Info", "Você já é PRO");
              return;
            }
            router.push("/checkout" as any);
          }}
          style={{
            backgroundColor: "#f59e0b",
            padding: 16,
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            ⭐ PRO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/admin" as any)}
          style={{
            backgroundColor: "#ef4444",
            padding: 16,
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            🛠 Admin
          </Text>
        </TouchableOpacity>

        {/* CAMPAIGNS */}
        <Text
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          📢 Campanhas
        </Text>

        {list.map((item) => (
          <View
            key={item._id}
            style={{
              backgroundColor: "#1e293b",
              padding: 15,
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {item.nome}
            </Text>

            <Text style={{ color: "#94a3b8" }}>
              Cliques: {Number(item?.clicks ?? 0)}
            </Text>

            <Text style={{ color: "#22c55e" }}>
              R$ {formatMoney(item?.earnings)}
            </Text>

            <TouchableOpacity
              onPress={() => copiar(item.link)}
              style={{
                backgroundColor: "#2563eb",
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Copiar link
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}