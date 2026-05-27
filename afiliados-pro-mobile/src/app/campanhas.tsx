import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";

import { useEffect, useState } from "react";

import { auth } from "../firebase";

export default function Campanhas() {
  const [campanhas, setCampanhas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarCampanhas() {
    try {
      const email = auth.currentUser?.email;

      if (!email) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://afiliados-pro-v3-2.onrender.com/campaigns/${email}`
      );

      const text = await response.text();

      console.log("RAW:", text);

      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        setCampanhas([]);
        setLoading(false);
        return;
      }

      const validas = data.filter(
        (item: any) =>
          item?.nome &&
          item?.link &&
          item.nome.trim() !== "" &&
          item.link.trim() !== ""
      );

      setCampanhas(validas);
    } catch (error) {
      console.log("ERRO CAMPANHAS:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCampanhas();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#111827",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />

        <Text
          style={{
            color: "#fff",
            marginTop: 20,
          }}
        >
          Carregando campanhas...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#111827",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Minhas Campanhas
      </Text>

      {campanhas.length === 0 && (
        <Text
          style={{
            color: "#9CA3AF",
            textAlign: "center",
            marginTop: 40,
            fontSize: 16,
          }}
        >
          Nenhuma campanha encontrada
        </Text>
      )}

      {campanhas.map((item: any) => (
        <View
          key={item._id}
          style={{
            backgroundColor: "#1F2937",
            padding: 18,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {item.nome}
          </Text>

          <Text
            style={{
              color: "#9CA3AF",
              marginBottom: 5,
            }}
          >
            Cliques: {item.clicks || 0}
          </Text>

          <Text
            style={{
              color: "#10B981",
              marginBottom: 5,
            }}
          >
            Vendas: {item.sales || 0}
          </Text>

          <Text
            style={{
              color: "#FACC15",
              marginBottom: 15,
            }}
          >
            Ganhos: R$ {(item.earnings || 0).toFixed(2)}
          </Text>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(item.affiliateLink)
            }
            style={{
              backgroundColor: "#2563EB",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Abrir Link
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}