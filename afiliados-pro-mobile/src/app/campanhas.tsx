import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function Campanhas() {
  const [campanhas, setCampanhas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarCampanhas() {
  try {
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      setCampanhas([]);
      setLoading(false);
      return;
    }

const { data } = await api.get(`/campaigns/user/${userId}`);

    if (!Array.isArray(data)) {
      setCampanhas([]);
      return;
    }

    
      const validas = data.filter(
        (item: any) =>
          item?.nome?.trim() &&
          item?.link?.trim()
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
      <View style={{
        flex: 1,
        backgroundColor: "#111827",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 20 }}>
          Carregando campanhas
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: "#111827",
      padding: 20,
    }}>
      <Text style={{
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
      }}>
        Minhas Campanhas
      </Text>

      {campanhas.length === 0 && (
        <Text style={{
          color: "#9CA3AF",
          textAlign: "center",
          marginTop: 40,
          fontSize: 16,
        }}>
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
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}>
            {item.nome}
          </Text>

          <Text style={{ color: "#9CA3AF" }}>
            Cliques: {item.clicks || 0}
          </Text>

          <Text style={{ color: "#10B981" }}>
            Vendas: {item.sales || 0}
          </Text>

          <Text style={{ color: "#FACC15", marginBottom: 15 }}>
            Ganhos: R$ {(item.earnings || 0).toFixed(2)}
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL(item.link)}
            style={{
              backgroundColor: "#2563EB",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
            }}>
              Abrir Link
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}