import { View, Text } from "react-native";

type Props = {
  name?: string;
};

export default function HomeHeader({ name }: Props) {
  const hour = new Date().getHours();

  let saudacao = "Boa noite";

  if (hour >= 5 && hour < 12) {
    saudacao = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    saudacao = "Boa tarde";
  }

  return (
    <View
      style={{
        marginBottom: 28,
      }}
    >
      <Text
        style={{
          color: "#FFD700",
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        🏛️ CENTRO DE COMANDO
      </Text>

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: "700",
          marginTop: 18,
        }}
      >
        {saudacao}, {name || "Afiliado"}.
      </Text>

      <Text
        style={{
          color: "#4ADE80",
          fontSize: 18,
          marginTop: 12,
          fontWeight: "600",
        }}
      >
        Hoje você está construindo sua independência.
      </Text>

      <Text
        style={{
          color: "#CBD5E1",
          fontSize: 15,
          marginTop: 16,
          lineHeight: 24,
        }}
      >
        Não é apenas mais um dia.
      </Text>

      <Text
        style={{
          color: "#CBD5E1",
          fontSize: 15,
          lineHeight: 24,
        }}
      >
        É mais um passo na construção do seu patrimônio.
      </Text>
    </View>
  );
}