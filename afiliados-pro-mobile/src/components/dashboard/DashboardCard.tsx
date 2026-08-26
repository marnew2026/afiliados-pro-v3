import { View, Text } from "react-native";

type Props = {
  icon: string;
  title: string;
  value: string | number;
  valueColor?: string;
};

export default function DashboardCard({
  icon,
  title,
  value,
  valueColor = "#fff",
}: Props) {
  return (
    <View
      style={{
        width: "48%",
        backgroundColor: "#1e293b",
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#334155",
      }}
    >
      <Text
        style={{
          fontSize: 24,
        }}
      >
        {icon}
      </Text>

      <Text
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginTop: 10,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: valueColor,
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {value}
      </Text>
    </View>
  );
}