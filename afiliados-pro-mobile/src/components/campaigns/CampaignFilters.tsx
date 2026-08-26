import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

export default function CampaignFilters() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#1e293b",
          paddingVertical: 12,
          borderRadius: 14,
          marginRight: 6,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Todas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#1e293b",
          paddingVertical: 12,
          borderRadius: 14,
          marginHorizontal: 6,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#94a3b8",
          }}
        >
          Ativas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#1e293b",
          paddingVertical: 12,
          borderRadius: 14,
          marginLeft: 6,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#94a3b8",
          }}
        >
          Pausadas
        </Text>
      </TouchableOpacity>
    </View>
  );
}