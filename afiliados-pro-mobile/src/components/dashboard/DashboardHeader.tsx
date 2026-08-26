import { View, Text } from "react-native";

type Props = {
  name?: string;
  isPro?: boolean;
};

export default function DashboardHeader({
  
  name,
  isPro,
}: Props) {
  console.log("HEADER RECEBEU:", {
  name,
  isPro,
});

  const hoje = new Date().toLocaleDateString("pt-BR", {
    
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View
      style={{
        marginBottom: 35,
      }}
    >
      <Text
        style={{
          color: "#94a3b8",
          fontSize: 16,
        }}
      >
        👋 Olá Mariel
      </Text>



      <Text
        style={{
          color: "#64748b",
          marginTop: 6,
          fontSize: 15,
        }}
      >
        Bem-vindo ao Afiliados Pro
      </Text>

      <Text
        style={{
          color: "#64748b",
          fontSize: 13,
          marginTop: 6,
        }}
      >
        {hoje}
      </Text>

      <View
        style={{
          alignSelf: "flex-start",
          marginTop: 16,
          backgroundColor: isPro ? "#14532d" : "#78350f",
          paddingHorizontal: 14,
          paddingVertical: 7,
          borderRadius: 18,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
       {isPro ? "👑 PRO" : "🟡 FREE"}
        </Text>
      </View>
    </View>
  );
}