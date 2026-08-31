import React, { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  useDistributionCampaigns,
} from "../hooks/useDistributionCampaigns";

import {
  useDistributionChannels,
} from "../hooks/useDistributionChannels";

import {
  createDistribution,
} from "../services/distributionService";

export default function NewDistributionScreen() {
  const router = useRouter();
  const {
  campaigns,
  loading: campaignsLoading,
  error: campaignsError,
  reload: reloadCampaigns,
} = useDistributionCampaigns();
  const {
  connections,
  loading: channelsLoading,
  error: channelsError,
  reload: reloadChannels,
} = useDistributionChannels();

const telegramConnection = connections.find(
  (connection) =>
    connection.provider === "telegram" &&
    connection.active !== false
);

  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [text, setText] = useState("");
  const [scheduleMode, setScheduleMode] = useState<"now" | "later">("now");
  const [submitting, setSubmitting] = useState(false);
 const canContinue = useMemo(() => {
  return selectedCampaignId.length > 0 && text.trim().length >= 10;
}, [selectedCampaignId, text]);

async function handlePublish() {
  if (submitting) {
    return;
  }

  if (!selectedCampaignId) {
    Alert.alert(
      "Campanha obrigatória",
      "Informe uma campanha para continuar."
    );
    return;
  }

  if (text.trim().length < 10) {
    Alert.alert(
      "Texto muito curto",
      "Digite pelo menos 10 caracteres para a divulgação."
    );
    return;
  }

  if (!telegramConnection) {
    Alert.alert(
      "Telegram não conectado",
      "Nenhum destino Telegram ativo foi encontrado."
    );
    return;
  }

  if (scheduleMode !== "now") {
    Alert.alert(
      "Agendamento ainda indisponível",
      "Nesta etapa, use a opção Agora."
    );
    return;
  }

  Alert.alert(
    "Confirmar publicação",
    "A mensagem será publicada agora no Telegram conectado.",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Publicar",
        onPress: async () => {
          try {
            setSubmitting(true);

            const result = await createDistribution({
              campaignId: selectedCampaignId,
              destinationId:
                telegramConnection.destinationId,
              text: text.trim(),
            });

            if (!result.success) {
              throw new Error(
                result.error ||
                  "Não foi possível criar a divulgação."
              );
            }

            Alert.alert(
              "Divulgação enviada",
              "A publicação foi enviada para processamento."
            );

            setText("");
          } catch (err: any) {
            console.log(
              "CREATE DISTRIBUTION ERROR:",
              err?.response?.data || err?.message
            );

            Alert.alert(
              "Falha na divulgação",
              err?.response?.data?.error ||
                err?.message ||
                "Não foi possível enviar a divulgação."
            );
          } finally {
            setSubmitting(false);
          }
        },
      },
    ]
  );
}

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
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
              Nova divulgação
            </Text>

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 14,
                marginTop: 3,
              }}
            >
              Prepare sua publicação
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#4c1d95",
            borderRadius: 22,
            padding: 20,
            borderWidth: 1,
            borderColor: "#8b5cf6",
            marginBottom: 22,
          }}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={30}
            color="#ddd6fe"
          />

          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: "900",
              marginTop: 12,
            }}
          >
            Modo de preparação
          </Text>

          <Text
            style={{
              color: "#ddd6fe",
              fontSize: 13,
              lineHeight: 19,
              marginTop: 6,
            }}
          >
            Revise a campanha, o canal e o conteúdo antes de publicar.
          </Text>
        </View>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 15,
            fontWeight: "800",
            marginBottom: 8,
          }}
        >
          Campanha
        </Text>

        {campaignsLoading && (
  <View
    style={{
      backgroundColor: "#1e293b",
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
    }}
  >
    <Text
      style={{
        color: "#94a3b8",
        fontSize: 13,
      }}
    >
      Carregando campanhas...
    </Text>
  </View>
)}

{!campaignsLoading && campaignsError && (
  <TouchableOpacity
    onPress={reloadCampaigns}
    style={{
      backgroundColor: "#1e293b",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#475569",
      padding: 16,
      marginBottom: 20,
    }}
  >
    <Text
      style={{
        color: "#fca5a5",
        fontSize: 13,
      }}
    >
      {campaignsError}
    </Text>

    <Text
      style={{
        color: "#c4b5fd",
        fontSize: 12,
        fontWeight: "800",
        marginTop: 8,
      }}
    >
      Tentar novamente
    </Text>
  </TouchableOpacity>
)}

{!campaignsLoading &&
  !campaignsError &&
  campaigns.map((item) => {
    const selected =
      selectedCampaignId === item._id;

    return (
      <TouchableOpacity
        key={item._id}
        onPress={() =>
          setSelectedCampaignId(item._id)
        }
        style={{
          backgroundColor: selected
            ? "#4c1d95"
            : "#1e293b",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: selected
            ? "#8b5cf6"
            : "#334155",
          padding: 16,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 15,
              fontWeight: "800",
            }}
          >
            {item.nome}
          </Text>

          {!!item.link && (
            <Text
              numberOfLines={1}
              style={{
                color: "#94a3b8",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {item.link}
            </Text>
          )}
        </View>

        <Ionicons
          name={
            selected
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={23}
          color={
            selected
              ? "#ddd6fe"
              : "#64748b"
          }
        />
      </TouchableOpacity>
    );
  })}

{!campaignsLoading &&
  !campaignsError &&
  campaigns.length === 0 && (
    <View
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: "#94a3b8",
          fontSize: 13,
        }}
      >
        Nenhuma campanha ativa encontrada.
      </Text>
    </View>
  )}

        <Text
          style={{
            color: "#ffffff",
            fontSize: 15,
            fontWeight: "800",
            marginBottom: 8,
          }}
        >
          Texto da divulgação
        </Text>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Escreva a mensagem que será enviada junto com o link da campanha..."
          placeholderTextColor="#64748b"
          multiline
          maxLength={3500}
          textAlignVertical="top"
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#334155",
            color: "#ffffff",
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 15,
            minHeight: 150,
          }}
        />

        <Text
          style={{
            color: "#64748b",
            fontSize: 12,
            textAlign: "right",
            marginTop: 6,
            marginBottom: 22,
          }}
        >
          {text.length}/3500
        </Text>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 15,
            fontWeight: "800",
            marginBottom: 10,
          }}
        >
          Canal
        </Text>

        <View
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#8b5cf6",
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <Ionicons
            name="paper-plane"
            size={24}
            color="#c4b5fd"
          />

          <View
            style={{
              flex: 1,
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 15,
                fontWeight: "800",
              }}
            >
              Telegram
            </Text>

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 12,
                marginTop: 3,
              }}
            >
              Primeiro canal da Central
            </Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={22}
            color="#c4b5fd"
          />
        </View>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 15,
            fontWeight: "800",
            marginBottom: 10,
          }}
        >
          Quando publicar
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <OptionButton
            active={scheduleMode === "now"}
            icon="flash-outline"
            label="Agora"
            onPress={() => setScheduleMode("now")}
          />

          <OptionButton
            active={scheduleMode === "later"}
            icon="calendar-outline"
            label="Agendar"
            onPress={() => setScheduleMode("later")}
          />
        </View>

        {scheduleMode === "later" && (
          <View
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#334155",
              padding: 16,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                color: "#cbd5e1",
                fontSize: 13,
                lineHeight: 19,
              }}
            >
              O seletor de data e horário será conectado na próxima etapa.
            </Text>
          </View>
        )}

        <TouchableOpacity
         onPress={handlePublish}
disabled={submitting || !canContinue}
          style={{
            backgroundColor: canContinue
              ? "#7c3aed"
              : "#334155",
            borderRadius: 16,
            paddingVertical: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 16,
              fontWeight: "900",
            }}
          >
            {submitting
  ? "Publicando..."
  : "Publicar agora"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#64748b",
            fontSize: 11,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          A publicação só será enviada após sua confirmação.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function OptionButton({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: active
          ? "#4c1d95"
          : "#1e293b",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: active
          ? "#8b5cf6"
          : "#334155",
        paddingVertical: 15,
        alignItems: "center",
      }}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#ddd6fe" : "#94a3b8"}
      />

      <Text
        style={{
          color: active ? "#ffffff" : "#cbd5e1",
          fontSize: 13,
          fontWeight: "800",
          marginTop: 7,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}