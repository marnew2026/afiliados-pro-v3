import React from "react";
import {
  View,
  Text,
} from "react-native";

type Props = {
  totalCampaigns: number;
  totalClicks: number;
  totalEarnings: string;
};

export default function CampaignStats({
  totalCampaigns,
  totalClicks,
  totalEarnings,
}: Props) {
  return (
    <View
      style={{
        marginTop: 24,
        backgroundColor: "#172554",
        borderRadius: 22,
        padding: 20,
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
        📊 Estatísticas
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: "#94a3b8",
          }}
        >
          Campanhas
        </Text>

        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {totalCampaigns}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: "#94a3b8",
          }}
        >
          Cliques
        </Text>

        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {totalClicks}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#94a3b8",
          }}
        >
          Ganhos
        </Text>

        <Text
          style={{
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          {totalEarnings}
        </Text>
      </View>
    </View>
  );
}