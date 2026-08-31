import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { loginDistribution } from "../services/distributionAuth";

export default function DistributionLoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrar() {
    if (!email.trim() || !password) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);

      await loginDistribution(
        email.trim(),
        password
      );

      router.replace("/divulgacao" as any);
    } catch (error: any) {
      console.log(
        "DISTRIBUTION LOGIN ERROR:",
        error?.response?.data || error?.message
      );

      Alert.alert(
        "Não foi possível entrar",
        error?.response?.data?.error ||
          error?.message ||
          "Falha no login da Central."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 24,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: "#1e293b",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            color="#ffffff"
          />
        </TouchableOpacity>

        <Ionicons
          name="megaphone"
          size={46}
          color="#c4b5fd"
        />

        <Text
          style={{
            color: "#ffffff",
            fontSize: 28,
            fontWeight: "900",
            marginTop: 18,
          }}
        >
          Central de Divulgação
        </Text>

        <Text
          style={{
            color: "#94a3b8",
            fontSize: 14,
            lineHeight: 21,
            marginTop: 8,
            marginBottom: 28,
          }}
        >
          Ambiente V4 de testes. Esta sessão é separada do login principal do Afiliados Pro.
        </Text>

        <Text
          style={{
            color: "#cbd5e1",
            fontSize: 13,
            fontWeight: "700",
            marginBottom: 7,
          }}
        >
          Email
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email do staging"
          placeholderTextColor="#64748b"
          editable={!loading}
          style={{
            backgroundColor: "#1e293b",
            borderWidth: 1,
            borderColor: "#334155",
            borderRadius: 16,
            color: "#ffffff",
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 15,
            marginBottom: 18,
          }}
        />

        <Text
          style={{
            color: "#cbd5e1",
            fontSize: 13,
            fontWeight: "700",
            marginBottom: 7,
          }}
        >
          Senha
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#64748b"
          editable={!loading}
          style={{
            backgroundColor: "#1e293b",
            borderWidth: 1,
            borderColor: "#334155",
            borderRadius: 16,
            color: "#ffffff",
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 15,
          }}
        />

        <TouchableOpacity
          onPress={entrar}
          disabled={loading}
          style={{
            backgroundColor: "#7c3aed",
            borderRadius: 17,
            paddingVertical: 15,
            alignItems: "center",
            marginTop: 24,
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 16,
              fontWeight: "900",
            }}
          >
            {loading ? "Entrando..." : "Entrar na Central"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}