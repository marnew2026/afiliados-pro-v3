import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Text,
  View,
} from "react-native";

type Props = {
  state?: "idle" | "working" | "success" | "warning";
};

export default function KaelCore({ state = "idle" }: Props) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.65)).current;

  const nameGlow = useRef(new Animated.Value(0.7)).current;
  const nameScale = useRef(new Animated.Value(1)).current;

  const spark1 = useRef(new Animated.Value(0)).current;
  const spark2 = useRef(new Animated.Value(0)).current;
  const spark3 = useRef(new Animated.Value(0)).current;
  const spark4 = useRef(new Animated.Value(0)).current;
  const spark5 = useRef(new Animated.Value(0)).current;

  let haloColor = "#2E7DFF33";
  let electricColor = "#00A8FF";
  let glowColor = "#5EDBFF";

  if (state === "working") {
    haloColor = "#FFD70033";
    electricColor = "#FFD700";
    glowColor = "#FFF09A";
  }

  if (state === "success") {
    haloColor = "#00FF8833";
    electricColor = "#00E98A";
    glowColor = "#7DFFD0";
  }

  if (state === "warning") {
    haloColor = "#FF3B3033";
    electricColor = "#FF453A";
    glowColor = "#FF8B85";
  }

  useEffect(() => {
    const floating = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.035,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.45,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    const nameAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(nameGlow, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(nameScale, {
            toValue: 1.04,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(nameGlow, {
            toValue: 0.65,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(nameScale, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    const createSparkAnimation = (
      value: Animated.Value,
      delay: number
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),

          Animated.timing(value, {
            toValue: 1,
            duration: 90,
            useNativeDriver: true,
          }),

          Animated.timing(value, {
            toValue: 0,
            duration: 140,
            useNativeDriver: true,
          }),

          Animated.delay(delay + 300),
        ])
      );

    const sparks = [
      createSparkAnimation(spark1, 350),
      createSparkAnimation(spark2, 700),
      createSparkAnimation(spark3, 1100),
      createSparkAnimation(spark4, 500),
      createSparkAnimation(spark5, 1450),
    ];

    floating.start();
    pulse.start();
    glow.start();
    nameAnimation.start();

    sparks.forEach((animation) => animation.start());

    return () => {
      floating.stop();
      pulse.stop();
      glow.stop();
      nameAnimation.stop();

      sparks.forEach((animation) => animation.stop());
    };
  }, [
    floatAnim,
    pulseAnim,
    glowAnim,
    nameGlow,
    nameScale,
    spark1,
    spark2,
    spark3,
    spark4,
    spark5,
  ]);

  const ElectricBolt = ({
    anim,
    top,
    left,
    rotate = "0deg",
    boltScale = 1,
  }: {
    anim: Animated.Value;
    top: number;
    left: number;
    rotate?: string;
    boltScale?: number;
  }) => {
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top,
          left,
          width: 70,
          height: 70,
          opacity: anim,
          transform: [
            { rotate },
            { scale: anim },
            { scale: boltScale },
          ],
        }}
      >
        <View
          style={{
            position: "absolute",
            width: 30,
            height: 2,
            top: 18,
            left: 2,
            borderRadius: 2,
            backgroundColor: "#E9FBFF",
            shadowColor: electricColor,
            shadowOpacity: 1,
            shadowRadius: 12,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 12,
            transform: [{ rotate: "35deg" }],
          }}
        />

        <View
          style={{
            position: "absolute",
            width: 28,
            height: 2,
            top: 31,
            left: 24,
            borderRadius: 2,
            backgroundColor: "#BFEFFF",
            shadowColor: electricColor,
            shadowOpacity: 1,
            shadowRadius: 12,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 12,
            transform: [{ rotate: "-35deg" }],
          }}
        />

        <View
          style={{
            position: "absolute",
            width: 24,
            height: 2,
            top: 43,
            left: 43,
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            shadowColor: glowColor,
            shadowOpacity: 1,
            shadowRadius: 14,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 14,
            transform: [{ rotate: "28deg" }],
          }}
        />
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        width: 340,
        height: 390,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 55,
          width: 230,
          height: 230,
          borderRadius: 115,
          backgroundColor: haloColor,
          opacity: glowAnim,
          transform: [{ scale: pulseAnim }],
        }}
      />

      <ElectricBolt
        anim={spark1}
        top={62}
        left={28}
        rotate="-35deg"
        boltScale={1.05}
      />

      <ElectricBolt
        anim={spark2}
        top={90}
        left={250}
        rotate="25deg"
        boltScale={0.9}
      />

      <ElectricBolt
        anim={spark3}
        top={215}
        left={20}
        rotate="145deg"
        boltScale={0.85}
      />

      <ElectricBolt
        anim={spark4}
        top={230}
        left={255}
        rotate="35deg"
        boltScale={1}
      />

      <ElectricBolt
        anim={spark5}
        top={40}
        left={185}
        rotate="-70deg"
        boltScale={0.75}
      />

      <Animated.View
        style={{
          backgroundColor: "transparent",
          transform: [
            { translateY: floatAnim },
            { scale: pulseAnim },
          ],
        }}
      >
        <Image
          source={require("../../assets/kael/KaelElectricCore.png")}
          fadeDuration={0}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain",
            backgroundColor: "transparent",
          }}
        />
      </Animated.View>

      <View
        style={{
          marginTop: -38,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
                <Animated.View
  style={{
    opacity: nameGlow,
    transform: [{ scale: nameScale }],
  }}
>
  <Image
    source={require("../../assets/kael/KaelName.png")}
    fadeDuration={0}
    style={{
      width: 210,
      height: 85,
      resizeMode: "contain",
      backgroundColor: "transparent",
    }}
  />
</Animated.View>
      </View>
    </View>
  );
}