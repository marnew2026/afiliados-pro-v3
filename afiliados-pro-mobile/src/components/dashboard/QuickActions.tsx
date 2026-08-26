import { View, TouchableOpacity, Text } from "react-native";

export default function QuickActions() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#1e293b",
          marginRight: 8,
          borderRadius: 18,
          padding: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 26 }}>💸</Text>

        <Text
          style={{
            color: "#fff",
            marginTop: 8,
            fontWeight: "700",
          }}
        >
          Sacar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#1e293b",
          marginLeft: 8,
          borderRadius: 18,
          padding: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 26 }}>📢</Text>

        <Text
          style={{
            color: "#fff",
            marginTop: 8,
            fontWeight: "700",
          }}
        >
          Nova campanha
        </Text>
      </TouchableOpacity>
    </View>
  );
}