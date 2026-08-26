import React from "react";
import {
  View,
  Text,
} from "react-native";

type Props = {
  message?: string;
};

export default function CampaignEmpty({
  message = "Em breve suas campanhas aparecerão aqui.",
}: Props) {
  return (
    <View
      style={{
        marginTop: 30,
        paddingVertical: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#94a3b8",
          fontSize: 15,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
}