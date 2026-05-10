import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Plano PRO"
            },
            unit_amount: 2900
          },
          quantity: 1
        }
      ],
      success_url: "https://seusite.com/sucesso",
      cancel_url: "https://seusite.com/cancelado"
    });

    res.json({ url: session.url });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
const API_URL = "https://afiliados-pro-v3-2.onrender.com/campaigns"; // troque pelo seu IP

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar campanhas");
    }
  };

  const deleteCampaign = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      loadCampaigns();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível apagar campanha");
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const renderItem = ({ item }) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(item.link)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(item.link)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(item.link)}`;

    return (
      <View style={styles.card}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : null}

        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.link}>{item.link}</Text>
        <Text>Cliques: {item.clicks}</Text>
        <Text>Receita: R$ {item.revenue}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => Linking.openURL(whatsappUrl)}
          >
            <Text>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => Linking.openURL(facebookUrl)}
          >
            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => Linking.openURL(twitterUrl)}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteCampaign(item._id)}
        >
          <Text style={{ color: "#fff" }}>Apagar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚀 Dashboard SaaS</Text>

      <TouchableOpacity
        style={styles.newBtn}
        onPress={() => router.push("/create")}
      >
        <Text style={{ color: "#fff" }}>Nova Campanha</Text>
      </TouchableOpacity>

      <FlatList
        data={campaigns}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  newBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  shareBtn: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
});