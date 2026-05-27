import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";

import * as WebBrowser from "expo-web-browser";

import {
  useRouter,
  useFocusEffect,
} from "expo-router";

import {
  useState,
  useCallback,
} from "react";

import { auth } from "../firebase";

export default function Dashboard() {
  const router = useRouter();

  const [isPro, setIsPro] = useState(false);

  const [campanhas, setCampanhas] = useState<any[]>([]);

  const adminEmail = "marielsantana@bol.com.br";

  const currentUser = auth.currentUser;
  const [withdraws, setWithdraws] = useState([]);
  async function assinarPlano() {
    try {
      const res = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser?.email,
          }),
        }
      );

      const text = await res.text();

      console.log("CHECKOUT RAW:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        Alert.alert("Erro no checkout Stripe");
        return;
      }

      if (data?.url) {
        await WebBrowser.openBrowserAsync(data.url);
      } else {
        Alert.alert("URL checkout não encontrada");
      }

    } catch (error) {
      console.log("ERRO CHECKOUT:", error);
      Alert.alert("Erro ao abrir checkout");
    }
  }

  async function verificarPlano() {
    try {
      const email = currentUser?.email;

      if (!email) return;

      const res = await fetch(
        `https://afiliados-pro-v3-2.onrender.com/user/${email}`
      );

      const text = await res.text();

      console.log("USER RAW:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.log("Erro parse USER");
        return;
      }

      console.log("USER DATA:", data);

      setIsPro(data?.isPro === true);

    } catch (error) {
      console.log("ERRO USER:", error);
    }
  }

  async function carregarCampanhas() {
    try {
      const email = currentUser?.email;

      if (!email) return;

      const res = await fetch(
        `https://afiliados-pro-v3-2.onrender.com/campaigns/${email}`
      );
  
      const text = await res.text();

      console.log("CAMPAIGNS RAW:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.log("Erro parse CAMPAIGNS");
        return;
      }

      setCampanhas(Array.isArray(data) ? data : []);

    } catch (error) {
      console.log("Erro campanhas:", error);
    }
  }
  async function loadWithdraws() {
  try {
    const response = await fetch(
      "https://afiliados-pro-v3-2.onrender.com/admin/withdraws"
    );

    const data = await response.json();

    const userWithdraws = data.filter(
      (item: any) =>
        item.userEmail === currentUser?.email &&
        item.status === "approved"
    );

    setWithdraws(userWithdraws);

  } catch (error) {
    console.log("Erro withdraws:", error);
  }
}   
  const campanhasValidas = campanhas.filter(
    (item) =>
      item?.nome &&
      item?.link &&
      item.nome.trim() !== "" &&
      item.link.trim() !== ""
  );

  const totalCliques = campanhasValidas.reduce(
    (acc, item) => acc + (item.clicks || 0),
    0
  );

  const totalVendas = campanhasValidas.reduce(
    (acc, item) => acc + (item.sales || 0),
    0
  );

  const totalGanhos = campanhasValidas.reduce(
    (acc, item) => acc + (item.earnings || 0),
    0
  );
  const totalSacado = withdraws.reduce(
  (acc: number, item: any) =>
    acc + (item.amount || 0),
  0
);

const saldoDisponivel =
  totalGanhos - totalSacado;

  const handleUpgrade = async () => {
    try {
      await Linking.openURL(
        "https://afiliados-pro-v3-2.onrender.com/stripe/create-checkout-session"
      );
    } catch (err) {
      console.log(err);
      Alert.alert("Erro no pagamento");
    }
  };

  useFocusEffect(
  useCallback(() => {
    verificarPlano();
    carregarCampanhas();
    loadWithdraws();
  }, [])
);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1120",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 34,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        Afiliados PRO
      </Text>

      <TouchableOpacity
        onPress={assinarPlano}
        style={{
          backgroundColor: "#F59E0B",
          padding: 16,
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          ⭐ Virar PRO
        </Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: 25,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Resumo Geral
        </Text>

        <Text
          style={{
            color: "#60A5FA",
            fontSize: 22,
            marginBottom: 12,
          }}
        >
          👆 Cliques: {totalCliques}
        </Text>

        <Text
          style={{
            color: "#10B981",
            fontSize: 22,
            marginBottom: 12,
          }}
        >
          💰 Vendas: {totalVendas}
        </Text>

        <Text
          style={{
            color: "#FACC15",
            fontSize: 22,
            marginBottom: 12,
          }}
        >
          🤑 Saldo: R$ {saldoDisponivel.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/produto" as any)}
        style={{
          backgroundColor: "#2563EB",
          padding: 20,
          borderRadius: 16,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          ➕ Cadastrar Produto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/campanhas" as any)}
        style={{
          backgroundColor: "#059669",
          padding: 20,
          borderRadius: 16,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          📊 Ver Campanhas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/saque" as any)}
        style={{
          backgroundColor: "#7C3AED",
          padding: 20,
          borderRadius: 16,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          💸 Sacar via Pix
        </Text>
      </TouchableOpacity>

      {currentUser?.email === adminEmail && (
        <TouchableOpacity
          onPress={() => router.push("/admin" as any)}
          style={{
            backgroundColor: "#DC2626",
            padding: 20,
            borderRadius: 16,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            🛠 Painel Admin
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}