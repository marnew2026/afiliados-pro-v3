import React from "react";
import { View } from "react-native";
import KaelCore from "./KaelCore";

type KaelState = "idle" | "working" | "success" | "warning";

type Props = {
  state?: KaelState;
};

export default function Kael({ state = "idle" }: Props) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 25,
      }}
    >
      <KaelCore state={state} />
    </View>
  );
}