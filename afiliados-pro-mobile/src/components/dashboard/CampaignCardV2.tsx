import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

type Props = {
  item: any;
  copiar: (texto: string) => void;
  formatMoney: (valor: number) => string;
  loadDashboard: (userId: string) => Promise<void>;
};

export default function CampaignCardV2({
    
  item,
  copiar,
  formatMoney,
  loadDashboard,
}: Props) {
  const progress = useSharedValue(0);
  const clicks = Number(item.clicks || 0);

const performance =
  clicks >= 80
    ? {
  label: "👑 Top Campanha",
  color: "#fbbf24",
  progress: 100,
  nextGoal: "Elite em breve",
}
    : clicks >= 30
    ? {
  label: "🟢 Excelente",
  color: "#22c55e",
  progress: 80,
  nextGoal: `Faltam ${80 - clicks} cliques para Top Campanha`,
}
    : clicks >= 10
    ? {
  label: "🟡 Boa",
  color: "#facc15",
  progress: 55,
  nextGoal: `Faltam ${30 - clicks} cliques para Excelente`,
}
    : clicks >= 1
    ? {
  label: "🔴 Baixa",
  color: "#ef4444",
  progress: 20,
  nextGoal: `Faltam ${10 - clicks} cliques para Boa`,
}
    :  {
    label: "⚪ Nova",
    color: "#94a3b8",
    progress: 0,
    nextGoal: "Conquiste seu primeiro clique 🚀",
  };

  useEffect(() => {
  progress.value = withTiming(
    performance.progress,
    {
      duration: 900,
    }
  );
}, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });
  
async function excluirCampanha() {
  Alert.alert(
    "Excluir campanha",
    "Tem certeza que deseja excluir esta campanha?\n\nEssa ação não poderá ser desfeita.",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/campaigns/${item._id}`);

            const userId = await AsyncStorage.getItem("userId");

            if (userId) {
              await loadDashboard(userId);
            }

            Alert.alert("Sucesso", "Campanha excluída.");
          } catch (err: any) {
            console.log(err);

            Alert.alert(
              "Erro",
              err?.response?.data?.error || "Não foi possível excluir."
            );
          }
        },
      },
    ]
  );
}
  return (

<View
  style={{
    backgroundColor: "#172554",   // mesmo azul do Saldo Disponível
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: "#334155",

    shadowColor: "#1d4ed8",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 8,
  }}
>

<View
  style={{
    flexDirection: "column",
  }}
>

 <View
  style={{
    flex: 1,
    marginRight: 12,
    flexShrink: 1,
  }}
>

  <Text
  style={{
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 30,
    letterSpacing: 0.4,
    flexWrap: "wrap",
  }}
>
  🚀 {item.nome}
</Text>
<Text
  style={{
    color: performance.color,
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 10,
  }}
>
  {performance.label}
</Text>

<Text
  style={{
    color:"#94a3b8",
    marginTop:4,
    fontSize:14,
    fontWeight:"600",
  }}
>
  💼 Trabalhando para você
</Text>

  </View>
<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    gap: 12,
  }}
>

  <View
    style={{
      backgroundColor: "#16a34a",

paddingHorizontal: 16,
paddingVertical: 7,

borderRadius: 25,

shadowColor: "#22c55e",
shadowOffset: {
  width: 0,
  height: 0,
},
shadowOpacity: 0.45,
shadowRadius: 8,

elevation: 8,
    }}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 0.5,
      }}
    >
      {item.active ? "🟢 ATIVA" : "🔴 PAUSADA"}
    </Text>
  </View>

  <Text
  style={{
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  }}
>
  ID #{item._id.slice(-6)}
</Text>

</View>

</View>
<Text
  style={{
    color: "#94a3b8",
    marginTop: 14,
    fontSize: 13,
  }}
>
📅 Criada em{" "}
{item.createdAt
  ? new Date(item.createdAt).toLocaleDateString("pt-BR")
  : "--"}
</Text>
<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  }}
>

  <View style={{ alignItems: "center" }}>
    <Text
      style={{
        color: "#94a3b8",
        fontSize: 12,
      }}
    >
   ⚡ Pessoas acessando
    </Text>

    <Text
      style={{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
      }}
    >
      {item.clicks || 0}
    </Text>
  </View>

  <View style={{ alignItems: "center" }}>
    <Text
      style={{
        color: "#94a3b8",
        fontSize: 12,
      }}
    >
      💵 Resultado do seu trabalho
    </Text>

    <Text
      style={{
        color: "#22c55e",
        fontWeight: "bold",
        fontSize: 20,
      }}
    >
      {Number(item.earnings || 0).toFixed(2)}
    </Text>
  </View>

</View>
{/* BARRA DE DESEMPENHO */}

<View
  style={{
    marginTop: 20,
  }}
>
  <View
    style={{
      height: 10,
      backgroundColor: "#334155",
      borderRadius: 20,
      overflow: "hidden",
    }}
  >
    <Animated.View
  style={[
    {
      height: "100%",
      backgroundColor: performance.color,
      borderRadius: 20,
    },
    animatedStyle,
  ]}
/>
  </View>

 <Text
  style={{
    color: "#e2e8f0",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 20,
  }}
>
  🎯 {performance.nextGoal}
</Text>
</View>

{/* PRIMEIRA LINHA */}
<View
  style={{
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  }}
>
  <TouchableOpacity
  style={{
    flex: 1,
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  }}
 onPress={() => {

  console.log("================================");
  console.log("🚀 BOTÃO ABRIR PRESSIONADO");
  console.log("================================");

  console.log("ID DA CAMPANHA:");
  console.log(item._id);

  console.log("LINK ORIGINAL:");
  console.log(item.link);

  const trackingUrl =
    `https://afiliados-pro-v3-2.onrender.com/campaigns/r/${item._id}`;

  console.log("LINK TRACKING:");
  console.log(trackingUrl);

  console.log("================================");

  Linking.openURL(trackingUrl);

}}
>
  <Text
    style={{
      color: "#fff",
      fontWeight: "bold",
    }}
  >
    🌐 Acessar campanha
  </Text>
</TouchableOpacity>
</View>

{/* SEGUNDA LINHA */}
<View
  style={{
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  }}
>
<TouchableOpacity
    style={{
      flex: 1,
      backgroundColor: "#f59e0b",
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
    }}
    onPress={() => {
 router.push({
  pathname: "/edit-campaign" as any,
  params: {
    id: item._id,
    nome: item.nome,
    link: item.link,
  },
});
}}
>
    <Text style={{ color: "#fff", fontWeight: "bold" }}>
      ✏️ Editar
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={{
      flex: 1,
      backgroundColor: "#dc2626",
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
    }}
    onPress={excluirCampanha}
  >
    <Text style={{ color: "#fff", fontWeight: "bold" }}>
      🗑 Excluir
    </Text>
  </TouchableOpacity>
</View>

</View>

);
}