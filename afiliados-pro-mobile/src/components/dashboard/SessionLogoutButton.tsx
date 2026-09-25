import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Platform, Text, TouchableOpacity } from "react-native";
import { logoutDistribution } from "../../services/distributionAuth";

export default function SessionLogoutButton() {
  async function performLogout() {
    await Promise.all([
      AsyncStorage.multiRemove([
        "token",
        "userId",
        "email",
      ]),
      logoutDistribution(),
    ]);

    router.replace("/login" as any);
  }

  function confirmLogout() {
    if (Platform.OS === "web") {
      const confirmed =
        typeof window !== "undefined"
          ? window.confirm("Deseja encerrar esta sessão?")
          : true;

      if (confirmed) {
        void performLogout();
      }

      return;
    }

    Alert.alert(
      "Sair da conta",
      "Deseja encerrar esta sessão?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            void performLogout();
          },
        },
      ]
    );
  }

  return (
    <TouchableOpacity
      onPress={confirmLogout}
      accessibilityRole="button"
      accessibilityLabel="Sair da conta"
      style={{
        alignSelf: "flex-end",
        backgroundColor: "#1E293B",
        borderColor: "#475569",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: -16,
        marginBottom: 18,
      }}
    >
      <Text
        style={{
          color: "#FCA5A5",
          fontSize: 14,
          fontWeight: "700",
        }}
      >
        Sair
      </Text>
    </TouchableOpacity>
  );
}