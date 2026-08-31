import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import DistributionScreen from "../screens/DistributionScreen";
import { getDistributionSession } from "../services/distributionAuth";

export default function Divulgacao() {
  const router = useRouter();

  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const session = await getDistributionSession();

        if (!active) {
          return;
        }

        if (!session.authenticated) {
          router.replace("/divulgacao-login" as any);
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        console.log(
          "DISTRIBUTION SESSION ERROR:",
          error
        );

        if (active) {
          router.replace("/divulgacao-login" as any);
        }
      } finally {
        if (active) {
          setCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  if (checkingSession || !authenticated) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f172a",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#c4b5fd"
        />

        <Text
          style={{
            color: "#94a3b8",
            fontSize: 14,
            marginTop: 14,
          }}
        >
          Abrindo Central de Divulgação...
        </Text>
      </View>
    );
  }

  return <DistributionScreen />;
}