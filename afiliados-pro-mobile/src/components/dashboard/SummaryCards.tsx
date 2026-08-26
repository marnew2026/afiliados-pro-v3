import { View, Text } from "react-native";

type Props = {
  totalCampaigns: number;
  totalClicks: number;
  totalEarnings: number;
  availableBalance: number;
  isPro: boolean;
  formatMoney: (v: number) => string;
};

export default function SummaryCards({
  totalCampaigns,
  totalClicks,
  totalEarnings,
  availableBalance,
  isPro,
  formatMoney,
}: Props) {
  const card = {
  borderRadius: 22,
  padding: 18,
  width: "48%" as const,
  marginBottom: 15,
  borderWidth: 1,
};

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      {/* Campanhas */}

      <View
  style={{
    ...card,
    backgroundColor: "#1e3a8a",
    borderColor: "#2563eb",
  }}
>
        <Text style={{ fontSize: 28 }}>📢</Text>

        <Text
          style={{
            color: "#94a3b8",
            marginTop: 10,
          }}
        >
          🚀 Campanhas Trabalhando para Você
        </Text>

        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 6,
          }}
        >
          {totalCampaigns}
        </Text>
      </View>

      {/* Cliques */}

      <View
  style={{
    ...card,
    backgroundColor: "#4c1d95",
    borderColor: "#7c3aed",
  }}
>
        <Text style={{ fontSize: 28 }}>🖱️</Text>

        <Text
          style={{
            color: "#94a3b8",
            marginTop: 10,
          }}
        >
          Cliques 
          ⚡ Pessoas acessando seus links
        </Text>

        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 6,
          }}
        >
          {totalClicks}
        </Text>
      </View>

      {/* Ganhos */}

      <View
  style={{
    ...card,
    backgroundColor: "#14532d",
    borderColor: "#22c55e",
  }}
>
        <Text style={{ fontSize: 28 }}>💵</Text>

        <Text
          style={{
            color: "#94a3b8",
            marginTop: 10,
          }}
        >
        💵 Resultado do seu trabalho
        </Text>

        <Text
          style={{
            color: "#22c55e",
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 6,
          }}
        >
          R$ {formatMoney(totalEarnings)}
        </Text>
      </View>

      {/* Plano */}

     <View
  style={{
    ...card,
    backgroundColor: "#78350f",
    borderColor: "#fbbf24",
  }}
>
        <Text style={{ fontSize: 28 }}>
          {isPro ? "👑" : "⭐"}
        </Text>

        <Text
          style={{
            color: "#94a3b8",
            marginTop: 10,
          }}
        >
          Plano
        </Text>

        <Text
          style={{
            color: isPro ? "#22c55e" : "#facc15",
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 6,
          }}
        >
          {isPro ? "PRO" : "FREE"}
        </Text>
      </View>
    </View>
  );
}