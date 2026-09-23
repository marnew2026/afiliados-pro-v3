import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";

export default function SessionLogoutButton() {
  function confirmLogout() {
    Alert.alert(
      "Sair da conta",
      "Deseja encerrar esta sess?o?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.multiRemove([
              "token",
              "userId",
              "email",
            ]);

            router.replace("/login" as any);
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
