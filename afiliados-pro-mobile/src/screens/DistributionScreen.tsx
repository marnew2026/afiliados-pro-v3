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
import { useAutopilotSettings } from "../hooks/useAutopilotSettings";

export default function DistributionScreen() {
  const router = useRouter();
  const {
  settings: autopilotSettings,
  loading: autopilotLoading,
  updating: autopilotUpdating,
  error: autopilotError,
  updateEnabled: updateAutopilotEnabled,
  updateMode: updateAutopilotMode,
  updateDailyLimit: updateAutopilotDailyLimit,
  updateMinInterval: updateAutopilotMinInterval,
  } = useAutopilotSettings();

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

const getAutopilotOperationalStatus = () => {
  if (!autopilotSettings) {
    return null;
  }

  if (!autopilotSettings.enabled) {
    return {
      label: "KAEL desativado",
      description:
        "Ative o KAEL quando quiser iniciar a operação configurada.",
      icon: "pause-circle-outline" as const,
    };
  }

  if (autopilotSettings.mode === "assistido") {
    return {
      label: "Modo assistido configurado",
      description:
        "O KAEL está ativo, mas não fará publicações autônomas neste modo.",
      icon: "person-circle-outline" as const,
    };
  }

  return {
    label: "Modo automático configurado",
    description:
      "O KAEL está habilitado para operar conforme os limites definidos.",
    icon: "flash-outline" as const,
  };
};

const autopilotOperationalStatus =
  getAutopilotOperationalStatus();

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
         {/* KAEL AUTOPILOT */}
<View
  style={{
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: autopilotSettings?.enabled
      ? "#22c55e"
      : "#334155",
  }}
>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 15,
          backgroundColor: "#1e293b",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 13,
        }}
      >
        <Ionicons
          name="sparkles"
          size={24}
          color="#c4b5fd"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 17,
            fontWeight: "900",
          }}
        >
          KAEL Autopilot
        </Text>

        <Text
          style={{
            color: "#94a3b8",
            fontSize: 12,
            marginTop: 4,
          }}
        >
          Automação inteligente das suas campanhas
        </Text>
      </View>
    </View>

    {!autopilotLoading && autopilotSettings && (
      <View
        style={{
          backgroundColor: autopilotSettings.enabled
            ? "#14532d"
            : "#334155",
          borderRadius: 20,
          paddingHorizontal: 11,
          paddingVertical: 6,
        }}
      >
        <Text
          style={{
            color: autopilotSettings.enabled
              ? "#bbf7d0"
              : "#cbd5e1",
            fontSize: 11,
            fontWeight: "900",
          }}
        >
          {autopilotSettings.enabled
            ? "ATIVO"
            : "DESATIVADO"}
        </Text>
      </View>
    )}
  </View>

  {autopilotLoading && (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
      }}
    >
      <ActivityIndicator
        size="small"
        color="#c4b5fd"
      />

      <Text
        style={{
          color: "#94a3b8",
          fontSize: 12,
          marginLeft: 9,
        }}
      >
        Carregando estado do KAEL...
      </Text>
    </View>
  )}

  {!autopilotLoading && autopilotError && (
    <Text
      style={{
        color: "#fca5a5",
        fontSize: 12,
        marginTop: 16,
        lineHeight: 18,
      }}
    >
      {autopilotError}
    </Text>
  )}

  {!autopilotLoading &&
  !autopilotError &&
  autopilotSettings && (
    <View
      style={{
        marginTop: 18,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#334155",
      }}
    >
      {/* MODO ATUAL */}
      <Text
        style={{
          color: "#cbd5e1",
          fontSize: 13,
          lineHeight: 20,
        }}
      >
        Modo:{" "}
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "800",
          }}
        >
          {autopilotSettings.mode === "automatico"
            ? "Automático"
            : "Assistido"}
        </Text>
      </Text>

      {/* SELEÇÃO DO MODO */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        {/* ASSISTIDO */}
        <TouchableOpacity
          disabled={autopilotUpdating}
          onPress={async () => {
            try {
              await updateAutopilotMode("assistido");
            } catch {
              // O erro já é tratado pelo hook.
            }
          }}
          style={{
            flex: 1,
            backgroundColor:
              autopilotSettings.mode === "assistido"
                ? "#4c1d95"
                : "#1e293b",
            borderRadius: 12,
            paddingVertical: 11,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 6,
            borderWidth: 1,
            borderColor:
              autopilotSettings.mode === "assistido"
                ? "#8b5cf6"
                : "#334155",
            opacity: autopilotUpdating ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 13,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Assistido
          </Text>
        </TouchableOpacity>

        {/* AUTOMÁTICO */}
        <TouchableOpacity
          disabled={autopilotUpdating}
          onPress={async () => {
            try {
              await updateAutopilotMode("automatico");
            } catch {
              // O erro já é tratado pelo hook.
            }
          }}
          style={{
            flex: 1,
            backgroundColor:
              autopilotSettings.mode === "automatico"
                ? "#4c1d95"
                : "#1e293b",
            borderRadius: 12,
            paddingVertical: 11,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 6,
            borderWidth: 1,
            borderColor:
              autopilotSettings.mode === "automatico"
                ? "#8b5cf6"
                : "#334155",
            opacity: autopilotUpdating ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 13,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Automático
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIMITE DIÁRIO */}
      <View
  style={{
    marginTop: 12,
  }}
>
  <Text
    style={{
      color: "#cbd5e1",
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 8,
    }}
  >
    Limite diário
  </Text>

  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <TouchableOpacity
      disabled={
        autopilotUpdating ||
        autopilotSettings.dailyLimit <= 1
      }
      onPress={async () => {
        if (autopilotSettings.dailyLimit <= 1) {
          return;
        }

        try {
          await updateAutopilotDailyLimit(
            autopilotSettings.dailyLimit - 1
          );
        } catch {
          // O erro já é tratado pelo hook.
        }
      }}
      style={{
        width: 52,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#1e293b",
        borderWidth: 1,
        borderColor: "#334155",
        alignItems: "center",
        justifyContent: "center",
        opacity:
          autopilotUpdating ||
          autopilotSettings.dailyLimit <= 1
            ? 0.45
            : 1,
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: "900",
        }}
      >
        −
      </Text>
    </TouchableOpacity>

    <View
      style={{
        flex: 1,
        height: 44,
        marginHorizontal: 12,
        borderRadius: 12,
        backgroundColor: "#0f172a",
        borderWidth: 1,
        borderColor: "#334155",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {autopilotUpdating ? (
        <ActivityIndicator
          size="small"
          color="#c4b5fd"
        />
      ) : (
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          {autopilotSettings.dailyLimit}
        </Text>
      )}
    </View>

    <TouchableOpacity
      disabled={
        autopilotUpdating ||
        autopilotSettings.dailyLimit >= 10
      }
      onPress={async () => {
        if (autopilotSettings.dailyLimit >= 10) {
          return;
        }

        try {
          await updateAutopilotDailyLimit(
            autopilotSettings.dailyLimit + 1
          );
        } catch {
          // O erro já é tratado pelo hook.
        }
      }}
      style={{
        width: 52,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#4c1d95",
        borderWidth: 1,
        borderColor: "#8b5cf6",
        alignItems: "center",
        justifyContent: "center",
        opacity:
          autopilotUpdating ||
          autopilotSettings.dailyLimit >= 10
            ? 0.45
            : 1,
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: "900",
        }}
      >
        +
      </Text>
    </TouchableOpacity>
  </View>

  <Text
    style={{
      color: "#64748b",
      fontSize: 11,
      marginTop: 7,
    }}
  >
    Entre 1 e 10 publicações por dia
  </Text>
</View>

        <View
  style={{
    marginTop: 14,
  }}
>
  <Text
    style={{
      color: "#cbd5e1",
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 8,
    }}
  >
    Intervalo mínimo
  </Text>

  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    }}
  >
    {[
      { label: "30 min", value: 30 },
      { label: "1 h", value: 60 },
      { label: "3 h", value: 180 },
      { label: "6 h", value: 360 },
    ].map((option) => {
      const selected =
        autopilotSettings.minIntervalMinutes ===
        option.value;

      return (
        <TouchableOpacity
          key={option.value}
          disabled={autopilotUpdating}
          onPress={async () => {
            try {
              await updateAutopilotMinInterval(
                option.value
              );
            } catch {
              // O erro já é tratado pelo hook.
            }
          }}
          style={{
            width: "48%",
            backgroundColor: selected
              ? "#4c1d95"
              : "#1e293b",
            borderRadius: 12,
            paddingVertical: 11,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: selected
              ? "#8b5cf6"
              : "#334155",
            opacity: autopilotUpdating ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 13,
              fontWeight: "900",
            }}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>

  <Text
    style={{
      color: "#64748b",
      fontSize: 11,
      marginTop: 1,
    }}
  >
    Tempo mínimo entre publicações automáticas
  </Text>
  </View>
    {autopilotOperationalStatus && (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#0f172a",
      borderRadius: 14,
      padding: 13,
      marginTop: 14,
      borderWidth: 1,
      borderColor: autopilotSettings.enabled
        ? "#4c1d95"
        : "#334155",
    }}
  >
    <View
      style={{
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: autopilotSettings.enabled
          ? "#4c1d95"
          : "#1e293b",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
      }}
    >
      <Ionicons
        name={autopilotOperationalStatus.icon}
        size={21}
        color="#ffffff"
      />
    </View>

    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: "#ffffff",
          fontSize: 13,
          fontWeight: "900",
        }}
      >
        {autopilotOperationalStatus.label}
      </Text>

      <Text
        style={{
          color: "#94a3b8",
          fontSize: 11,
          lineHeight: 16,
          marginTop: 3,
        }}
      >
        {autopilotOperationalStatus.description}
      </Text>
    </View>
  </View>
)}


        <TouchableOpacity
  disabled={autopilotUpdating}
  onPress={async () => {
    if (!autopilotSettings) {
      return;
    }

    try {
      await updateAutopilotEnabled(
        !autopilotSettings.enabled
      );
    } catch {
      // O erro já é tratado pelo hook.
    }
  }}
  style={{
    backgroundColor: autopilotSettings.enabled
      ? "#7f1d1d"
      : "#4c1d95",
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    opacity: autopilotUpdating ? 0.6 : 1,
  }}
>
  {autopilotUpdating ? (
    <ActivityIndicator
      size="small"
      color="#ffffff"
    />
  ) : (
    <Text
      style={{
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "900",
      }}
    >
      {autopilotSettings.enabled
        ? "Desativar KAEL"
        : "Ativar KAEL"}
    </Text>
  )}
</TouchableOpacity>

        </View>
        )}
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