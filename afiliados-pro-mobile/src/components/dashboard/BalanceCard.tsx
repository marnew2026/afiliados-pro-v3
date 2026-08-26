import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  balance: number;
  formatMoney: (value: number) => string;
  onWithdraw: () => void;
  onCampaign: () => void;
};

export default function BalanceCard({
  balance,
  formatMoney,
  onWithdraw,
  onCampaign,
}: Props) {
  return (
  <View
  style={{
    backgroundColor: "#172554",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 22,
    marginBottom: 25,
    borderWidth: 1.5,
    borderColor: "#22c55e",
  }}
>
  <Text
    style={{
      color: "#FFD700",
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center",
    }}
  >
    🏛️ Patrimônio Disponível
  </Text>

  <Text
    style={{
      color: "#fff",
      fontSize: 42,
      fontWeight: "bold",
      marginTop: 12,
      textAlign: "center",
    }}
  >
    R$ {formatMoney(balance)}
  </Text>

  <Text
    style={{
      color: "#d1fae5",
      fontSize: 14,
      marginTop: 18,
      textAlign: "center",
      fontWeight: "600",
    }}
  >
    Este patrimônio representa a evolução da sua empresa.
  </Text>

  <Text
    style={{
      color: "#94a3b8",
      fontSize: 13,
      marginTop: 8,
      textAlign: "center",
      lineHeight: 20,
    }}
  >
    Cada clique e cada campanha fortalecem o patrimônio que você está construindo.
  </Text>

  <Text
    style={{
      color: "#22c55e",
      fontSize: 13,
      marginTop: 14,
      textAlign: "center",
      fontWeight: "600",
    }}
  >
    🟢 Seu patrimônio está seguro. Continue evoluindo.
  </Text>
</View>

  );
}