import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "../services/sessionStorage";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restoring, setRestoring] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    async function restoreSession() {
      try {
        const [[, token], [, userId]] = await AsyncStorage.multiGet(["token", "userId"]);
        if (active && token && userId) router.replace("/dashboard");
      } catch {
        console.warn("Não foi possível ler a sessão salva.");
      } finally {
        if (active) setRestoring(false);
      }
    }
    void restoreSession();
    return () => { active = false; };
  }, []);

  async function entrar() {
    if (submitting) return;
    if (!email.trim() || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/login", {
        email: email.trim().toLowerCase(), password,
      });
      if (!data?.token || !data?.user?._id || !data?.user?.email) {
        throw new Error("Backend não retornou uma sessão completa");
      }
      await AsyncStorage.multiSet([
        ["token", data.token], ["userId", data.user._id], ["email", data.user.email],
      ]);
      router.replace("/dashboard");
    } catch (err: any) {
      Alert.alert("Erro", err?.response?.data?.error || err.message || "Falha no login");
    } finally {
      setSubmitting(false);
    }
  }

  if (restoring) {
    return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator accessibilityLabel="Restaurando sessão" /></View>;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity onPress={entrar} disabled={submitting} accessibilityRole="button">
        <Text>{submitting ? "Entrando..." : "Entrar"}</Text>
      </TouchableOpacity>
    </View>
  );
}
