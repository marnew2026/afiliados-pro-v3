import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");

        console.log("================================");
        console.log("🔐 VERIFICANDO LOGIN PERSISTENTE");
        console.log("TOKEN EXISTE:", token ? "SIM" : "NÃO");
        console.log("USER ID:", userId);
        console.log("================================");

        if (token && userId) {
          // Existe uma sessão salva
          setLogged(true);
        } else {
          // Não existe sessão
          setLogged(false);
        }
      } catch (error) {
        console.log("❌ ERRO AO VERIFICAR LOGIN:", error);

        setLogged(false);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  if (loading) {
    return null;
  }

  if (logged) {
    return <Redirect href={"/dashboard" as any} />;
  }

  return <Redirect href={"/login" as any} />;
}