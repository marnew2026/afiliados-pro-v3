import { View, Text } from "react-native";

type Props = {
  clicks: number;
  earnings: number;
};

export default function PerformanceCard({
  clicks,
  earnings,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 18,
        }}
      >
        📈 Desempenho
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ color: "#94a3b8" }}>
            Cliques 
          </Text>

          <Text
            style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            {clicks}
          </Text>
        </View>

        <View>
          <Text style={{ color: "#94a3b8" }}>
            Ganhos
          </Text>

          <Text
            style={{
              color: "#22c55e",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            R$ {earnings.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}