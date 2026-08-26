import { View, Text } from "react-native";
import React from "react";
interface InfoCardProps {
  icon: string;
  title: string;
  value?: string | number;
  subtitle: string;
  description?: string;
  footer?: string;
}

export default function InfoCard({
  icon,
  title,
  value,
  subtitle,
  description,
  footer,
}: InfoCardProps) {
  return (
    <View
      style={{
        backgroundColor: "#172554",
        borderRadius: 24,
        paddingVertical: 24,
        paddingHorizontal: 22,
        marginBottom: 20,
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
        {icon} {title}
      </Text>

      {value !== undefined && (
        <Text
          style={{
            color: "#fff",
            fontSize: 38,
            fontWeight: "bold",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          {value}
        </Text>
      )}

      <Text
        style={{
          color: "#d1fae5",
          fontSize: 14,
          fontWeight: "600",
          marginTop: 18,
          textAlign: "center",
        }}
      >
        {subtitle}
      </Text>

      {description && (
        <Text
          style={{
            color: "#94a3b8",
            fontSize: 13,
            lineHeight: 20,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
      )}

      {footer && (
        <Text
          style={{
            color: "#22c55e",
            fontSize: 13,
            fontWeight: "600",
            marginTop: 14,
            textAlign: "center",
          }}
        >
          {footer}
        </Text>
      )}
    </View>
  );
}