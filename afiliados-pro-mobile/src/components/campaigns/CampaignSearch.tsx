import React from "react";
import {
  View,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function CampaignSearch({
  value,
  onChangeText,
}: Props) {
  return (
    <View
      style={{
        marginTop: 24,
        backgroundColor: "#1e293b",
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        height: 56,
      }}
    >
      <Ionicons
        name="search"
        size={20}
        color="#94a3b8"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar campanha..."
        placeholderTextColor="#94a3b8"
        style={{
          flex: 1,
          color: "#fff",
          marginLeft: 10,
          fontSize: 15,
        }}
      />
    </View>
  );
}