import { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Linking from "expo-linking";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const API_URL = "https://afiliados-pro-v3-2.onrender.com";

export default function Campaigns() {
  const [user, setUser] = useState<any>(null);

  const [campaigns, setCampaigns] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;

      setUser(u);

      loadCampaigns(u.uid);
    });

    return () => unsub();
  }, []);

  const loadCampaigns = async (uid: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/campaigns?ownerId=${uid}`
      );

      if (!res.ok) {
        Alert.alert("Erro ao carregar campanhas");
        return;
      }

      const data = await res.json();

      setCampaigns(Array.isArray(data) ? data : []);

    } catch (err) {
      console.log("Erro campanhas:", err);

      Alert.alert("Erro ao carregar campanhas");

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Carregando campanhas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Minhas campanhas
      </Text>

      {campaigns.length === 0 && (
        <Text>Nenhuma campanha encontrada.</Text>
      )}

      {campaigns.map((item) => (
        <View
          key={item._id}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL(item.link)}
          >
            <Text
              style={{
                color: "blue",
                marginTop: 8,
              }}
            >
              Abrir link
            </Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 8 }}>
            Cliques: {item.clicks || 0}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}