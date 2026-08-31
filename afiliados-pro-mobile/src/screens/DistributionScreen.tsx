import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useDistributions } from "../hooks/useDistributions";

export default function DistributionScreen() {
  const router = useRouter();

  const {
    distributions,
    loading,
    error,
    reload,
  } = useDistributions();

  const scheduledCount = distributions.filter(
    (item) => item.status === "scheduled"
  ).length;

  const publishedCount = distributions.filter(
    (item) => item.status === "published"
  ).length;

  const failedCount = distributions.filter(
    (item) => item.status === "failed"
  ).length;

  const totalCount = distributions.length;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* CABECALHO */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: "#1e293b",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#ffffff"
            />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: "900",
              }}
            >
              Central de Divulgação
            </Text>

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 14,
                marginTop: 3,
              }}
            >
              Automatize suas campanhas
            </Text>
          </View>
        </View>

        {/* DESTAQUE */}
        <View
          style={{
            backgroundColor: "#4c1d95",
            borderRadius: 24,
            padding: 22,
            borderWidth: 1,
            borderColor: "#8b5cf6",
            marginBottom: 24,
          }}
        >
          <Ionicons
            name="megaphone"
            size={38}
            color="#ddd6fe"
          />

          <Text
            style={{
              color: "#ffffff",
              fontSize: 22,
              fontWeight: "900",
              marginTop: 16,
            }}
          >
            Suas campanhas trabalhando por você
          </Text>

          <Text
            style={{
              color: "#ddd6fe",
              fontSize: 14,
              lineHeight: 21,
              marginTop: 8,
            }}
          >
            Prepare, agende e acompanhe suas divulgações em um só lugar.
          </Text>

         <TouchableOpacity
  onPress={() => router.push("/nova-divulgacao" as any)}
  style={{
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  }}
>
            <Text
              style={{
                color: "#4c1d95",
                fontSize: 16,
                fontWeight: "900",
              }}
            >
              Nova divulgação
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "#c4b5fd",
              fontSize: 11,
              textAlign: "center",
              marginTop: 8,
            }}
          >
           Prepare sua divulgação antes de publicar
          </Text>
        </View>

        {/* RESUMO */}
        <Text
          style={{
            color: "#ffffff",
            fontSize: 19,
            fontWeight: "900",
            marginBottom: 14,
          }}
        >
          Visão geral
        </Text>

        {loading && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <ActivityIndicator
              size="small"
              color="#c4b5fd"
            />

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 13,
                marginLeft: 10,
              }}
            >
              Carregando divulgações...
            </Text>
          </View>
        )}

        {!loading && error && (
          <View
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 15,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#475569",
            }}
          >
            <Text
              style={{
                color: "#fca5a5",
                fontSize: 13,
                lineHeight: 19,
              }}
            >
              {error}
            </Text>

            <TouchableOpacity
              onPress={reload}
              style={{
                marginTop: 12,
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#c4b5fd",
                  fontSize: 13,
                  fontWeight: "900",
                }}
              >
                Tentar novamente
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <StatusCard
            icon="time-outline"
            title="Agendadas"
            value={String(scheduledCount)}
          />

          <StatusCard
            icon="checkmark-circle-outline"
            title="Publicadas"
            value={String(publishedCount)}
          />

          <StatusCard
            icon="alert-circle-outline"
            title="Falhas"
            value={String(failedCount)}
          />

          <StatusCard
            icon="layers-outline"
            title="Total"
            value={String(totalCount)}
          />
        </View>

        {/* CANAIS */}
        <Text
          style={{
            color: "#ffffff",
            fontSize: 19,
            fontWeight: "900",
            marginTop: 12,
            marginBottom: 14,
          }}
        >
          Canais
        </Text>

        <View
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 20,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 15,
              backgroundColor: "#334155",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            <Ionicons
              name="paper-plane"
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
              Telegram
            </Text>

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              Primeiro canal da Central
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#334155",
              borderRadius: 20,
              paddingHorizontal: 11,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: "#cbd5e1",
                fontSize: 11,
                fontWeight: "800",
              }}
            >
              CONECTADO
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusCard({
  icon,
  title,
  value,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  value: string;
}) {
  return (
    <View
      style={{
        width: "48%",
        backgroundColor: "#1e293b",
        borderRadius: 20,
        padding: 17,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#334155",
      }}
    >
      <Ionicons
        name={icon}
        size={24}
        color="#c4b5fd"
      />

      <Text
        style={{
          color: "#ffffff",
          fontSize: 25,
          fontWeight: "900",
          marginTop: 13,
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          color: "#94a3b8",
          fontSize: 13,
          marginTop: 3,
        }}
      >
        {title}
      </Text>
    </View>
  );
}