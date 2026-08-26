import React from "react";
import { Image, View } from "react-native";

type Props = {
  state?: "idle" | "working" | "success" | "warning";
};

export default function KaelCore({ state = "idle" }: Props) {
  let haloColor = "#2E7DFF22"; // idle = azul

if (state === "working") {
  haloColor = "#FFD70033"; // dourado
}

if (state === "success") {
  haloColor = "#00FF8833"; // verde
}

if (state === "warning") {
  haloColor = "#FF3B3033"; // vermelho
}
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Halo */}

      <View
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: 110,
            backgroundColor: haloColor,
        }}
      />

      {/* Core */}

      <Image
        source={require("../../assets/kael/KaelCore.png")}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
        }}
      />
    </View>
  );
}