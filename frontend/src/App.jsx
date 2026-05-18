import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as Linking from "expo-linking";

const firebaseConfig = {
  apiKey: "AIzaSyDpN43wG6Y_EbyPRNL8h_DqnBvEq6Flc0s",
  authDomain: "afiliados-pro-v3.firebaseapp.com",
  projectId: "afiliados-pro-v3",
  appId: "1:219554193987:web:160e1967808c9e7635aaf6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const API_URL = "https://afiliados-pro-v3-2.onrender.com";

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const isPro = user?.isPro === true;

  // 🔐 LOGIN
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser({
          email: u.email,
          uid: u.uid,
          isPro: false,
        });
      } else setUser(null);
    });

    return () => unsub();
  }, []);

  // 📦 CAMPANHAS
  const loadCampaigns = async () => {
    if (!user) return;

    const res = await fetch(
      `${API_URL}/campaigns?ownerId=${user.uid}`
    );

    const data = await res.json();
    setCampaigns(data);
  };

  useEffect(() => {
    loadCampaigns();
  }, [user]);

  // 💳 PRO
  const comprarPro = async () => {
    const res = await fetch(`${API_URL}/checkout/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    const data = await res.json();

    if (data.url) {
      Linking.openURL(data.url);
    }
  };

  // 🚀 CAMPANHA
  const createCampaign = async () => {
    if (!isPro) return Alert.alert("PRO necessário");

    const res = await fetch(`${API_URL}/campaigns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        link,
        ownerId: user.uid,
        email: user.email,
      }),
    });

    if (res.status === 403) {
      return Alert.alert("PRO necessário");
    }

    setName("");
    setLink("");
    loadCampaigns();
  };

  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>🔐 Faça login</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>🚀 Afiliados Pro</Text>

      <Text>
        Status: {isPro ? "PRO" : "FREE"}
      </Text>

      {!isPro && (
        <Button title="🔥 Virar PRO" onPress={comprarPro} />
      )}

      <TextInput
        placeholder="Nome campanha"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 5 }}
      />

      <TextInput
        placeholder="Link"
        value={link}
        onChangeText={setLink}
        style={{ borderWidth: 1, marginVertical: 5 }}
      />

      <Button title="Criar campanha" onPress={createCampaign} />

      <Text style={{ marginTop: 20 }}>Campanhas:</Text>

      {campaigns.map((c) => (
        <View key={c._id}>
          <Text>{c.name}</Text>
          <Text>{c.link}</Text>
          <Text>👁 {c.clicks}</Text>
        </View>
      ))}
    </ScrollView>
  );
}