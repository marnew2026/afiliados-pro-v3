import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

import { useDistributionChannels } from "../../hooks/useDistributionChannels";
import distributionApi from "../../services/distributionApi";

export default function FacebookConnectionCard() {
  const { connections, loading, error, reload } =
    useDistributionChannels();

  const [connecting, setConnecting] = useState(false);

  const connection = connections.find(
    (item) => item.provider === "facebook" && item.active !== false
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        void reload();
      }
    });

    return () => subscription.remove();
  }, [reload]);

  const connectFacebook = useCallback(async () => {
    if (connecting) return;

    try {
      setConnecting(true);

      const { data } = await distributionApi.get(
        "/channel/facebook/oauth/start"
      );

      const authorizationUrl = data?.authorizationUrl;

      if (!data?.success || !authorizationUrl) {
        throw new Error(
          "O servidor não retornou a autorização do Facebook."
        );
      }

      if (Platform.OS === "web") {
        await Linking.openURL(authorizationUrl);
      } else if (Platform.OS === "android") {
        const browsers =
          await WebBrowser.getCustomTabsSupportingBrowsersAsync();

        console.log(
          "FACEBOOK BROWSERS:",
          browsers.browserPackages
        );

        const browserPackage = browsers.browserPackages.includes(
          "com.android.chrome"
        )
          ? "com.android.chrome"
          : browsers.preferredBrowserPackage ||
            browsers.browserPackages[0];

        if (!browserPackage) {
          throw new Error(
            "Nenhum navegador compatível foi encontrado."
          );
        }

        const browserResult = await WebBrowser.openBrowserAsync(
          authorizationUrl,
          {
            browserPackage,
            createTask: false,
          }
        );

        console.log(
          "FACEBOOK BROWSER RESULT:",
          browserResult.type
        );

        await reload();
      } else {
        await WebBrowser.openBrowserAsync(authorizationUrl);
        await reload();
      }
    } catch (requestError: any) {
      console.log(
        "FACEBOOK CONNECTION ERROR:",
        requestError?.response?.data || requestError?.message
      );

      Alert.alert(
        "Falha ao conectar Facebook",
        requestError?.response?.data?.error ||
          requestError?.message ||
          "Não foi possível iniciar a conexão."
      );
    } finally {
      setConnecting(false);
    }
  }, [connecting, reload]);

  return (
    <View
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: connection ? "#22c55e" : "#334155",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 15,
            backgroundColor: "#111827",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
          }}
        >
          <Ionicons
            name="logo-facebook"
            size={25}
            color="#ffffff"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            Facebook
          </Text>

          <Text
            style={{
              color: "#94a3b8",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {connection
              ? connection.destinationName || "Página conectada"
              : "Conecte sua Página oficial"}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#c4b5fd" />
        ) : connection ? (
          <View
            style={{
              backgroundColor: "#14532d",
              borderRadius: 20,
              paddingHorizontal: 11,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: "#bbf7d0",
                fontSize: 11,
                fontWeight: "800",
              }}
            >
              CONECTADO
            </Text>
          </View>
        ) : null}
      </View>

      {!loading && (
        <TouchableOpacity
          onPress={connectFacebook}
          disabled={connecting}
          accessibilityRole="button"
          accessibilityLabel={
            connection ? "Reconectar Facebook" : "Conectar Facebook"
          }
          accessibilityState={{
            disabled: connecting,
            busy: connecting,
          }}
          style={{
            backgroundColor: "#111827",
            borderRadius: 14,
            paddingVertical: 13,
            alignItems: "center",
            marginTop: 15,
            borderWidth: 1,
            borderColor: "#64748b",
            opacity: connecting ? 0.6 : 1,
          }}
        >
          {connecting ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: "900",
              }}
            >
              {connection
                ? "Reconectar Facebook"
                : "Conectar Facebook"}
            </Text>
          )}
        </TouchableOpacity>
      )}

      {!!error && !connection && (
        <TouchableOpacity
          onPress={reload}
          style={{
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fca5a5", fontSize: 12 }}>
            {error}
          </Text>

          <Text
            style={{
              color: "#c4b5fd",
              fontSize: 12,
              fontWeight: "800",
              marginTop: 5,
            }}
          >
            Tentar novamente
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}