import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
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
  createFacebookReel,
  getFacebookReviewOptions,
  FacebookReviewOption,
} from "../services/facebookDistributionService";

export default function FacebookReelScreen() {
  const router = useRouter();

  const [connected, setConnected] = useState(false);
  const [destinationName, setDestinationName] = useState("");
  const [options, setOptions] = useState<FacebookReviewOption[]>([]);
  const [selectedMediaAssetId, setSelectedMediaAssetId] =
    useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadOptions() {
    try {
      setLoading(true);
      setError(null);

      const result = await getFacebookReviewOptions();

      setConnected(result.connected === true);
      setDestinationName(
        result.connection?.destinationName || "Conta Facebook"
      );
      setOptions(
        Array.isArray(result.options) ? result.options : []
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível carregar os vídeos do Facebook."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOptions();
  }, []);

  const selectedOption = useMemo(
    () =>
      options.find(
        (item) =>
          item.mediaAssetId === selectedMediaAssetId
      ),
    [options, selectedMediaAssetId]
  );

  const canSubmit =
    Boolean(selectedOption) &&
    caption.trim().length >= 10 &&
    !submitting;

  function confirmPublish() {
    if (!selectedOption) {
      Alert.alert(
        "V\u00eddeo obrigat\u00f3rio",
        "Selecione uma campanha com v\u00eddeo pronto."
      );
      return;
    }

    if (caption.trim().length < 10) {
      Alert.alert(
        "Legenda muito curta",
        "Digite pelo menos 10 caracteres."
      );
      return;
    }

    Alert.alert(
      "Publicar Reel no Facebook?",
      "O v\u00eddeo ser\u00e1 enviado para publica\u00e7\u00e3o imediata na P\u00e1gina " +
        destinationName +
        ". Confirme somente se a P\u00e1gina, o v\u00eddeo e a legenda estiverem corretos.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Publicar Reel",
          style: "destructive",
          onPress: sendReel,
        },
      ]
    );
  }

  async function sendReel() {
    if (!selectedOption || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      const result = await createFacebookReel({
        campaignId: selectedOption.campaignId,
        mediaAssetId: selectedOption.mediaAssetId,
        caption: caption.trim(),
      });

      if (!result.success) {
        throw new Error(
          result.error ||
            "N\u00e3o foi poss\u00edvel enviar o Reel para processamento."
        );
      }

      Alert.alert(
        "Reel enviado para processamento",
        "O Facebook est\u00e1 processando a publica\u00e7\u00e3o. " +
          "Acompanhe o status antes de realizar um novo envio."
      );

      setCaption("");
      setSelectedMediaAssetId("");
    } catch (err: any) {
      console.log(
        "CREATE FACEBOOK REEL ERROR:",
        err?.response?.data || err?.message
      );

      Alert.alert(
        "Falha na publica\u00e7\u00e3o",
        err?.response?.data?.error ||
          err?.message ||
          "N\u00e3o foi poss\u00edvel publicar o Reel no Facebook."
      );
    } finally {
      setSubmitting(false);
    }
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
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            alignSelf: "flex-start",
            marginBottom: 22,
          }}
        >
          <Text
            style={{
              color: "#38bdf8",
              fontSize: 17,
              fontWeight: "800",
            }}
          >
            ← Voltar
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons
            name="logo-facebook"
            size={34}
            color="#ffffff"
          />

          <Text
            style={{
              color: "#ffffff",
              fontSize: 30,
              fontWeight: "900",
              marginLeft: 12,
            }}
          >
            Publicar Reel no Facebook
          </Text>
        </View>

        <Text
          style={{
            color: "#94a3b8",
            fontSize: 15,
            lineHeight: 22,
            marginBottom: 24,
          }}
        >
          {"Revise o v\u00eddeo e a legenda com aten\u00e7\u00e3o. Ap\u00f3s sua confirma\u00e7\u00e3o, o Reel ser\u00e1 enviado para publica\u00e7\u00e3o."}
        </Text>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#a78bfa"
          />
        )}

        {!loading && error && (
          <View
            style={{
              backgroundColor: "#450a0a",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Text style={{ color: "#fecaca" }}>
              {error}
            </Text>

            <TouchableOpacity
              onPress={loadOptions}
              style={{ marginTop: 14 }}
            >
              <Text
                style={{
                  color: "#38bdf8",
                  fontWeight: "800",
                }}
              >
                Tentar novamente
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && !connected && (
          <View
            style={{
              backgroundColor: "#451a03",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Text style={{ color: "#fde68a" }}>
              {"Conecte sua conta Facebook antes de publicar um Reel."}
            </Text>
          </View>
        )}

        {!loading && !error && connected && (
          <>
            <View
              style={{
                backgroundColor: "#052e16",
                borderColor: "#22c55e",
                borderWidth: 1,
                borderRadius: 16,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  color: "#86efac",
                  fontWeight: "900",
                }}
              >
                Facebook conectado
              </Text>

              <Text
                style={{
                  color: "#ffffff",
                  marginTop: 5,
                }}
              >
                {destinationName}
              </Text>
            </View>

            <Text
              style={{
                color: "#ffffff",
                fontSize: 17,
                fontWeight: "900",
                marginBottom: 12,
              }}
            >
              Selecione o vídeo
            </Text>

            {options.length === 0 && (
              <View
                style={{
                  backgroundColor: "#1e293b",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 22,
                }}
              >
                <Text
                  style={{
                    color: "#cbd5e1",
                    lineHeight: 21,
                  }}
                >
                  Nenhuma campanha possui vídeo pronto. Gere
                  ou conclua um vídeo antes de continuar.
                </Text>
              </View>
            )}

            {options.map((item) => {
              const selected =
                item.mediaAssetId === selectedMediaAssetId;

              return (
                <TouchableOpacity
                  key={item.mediaAssetId}
                  onPress={() =>
                    setSelectedMediaAssetId(
                      item.mediaAssetId
                    )
                  }
                  style={{
                    backgroundColor: "#1e293b",
                    borderRadius: 16,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected
                      ? "#a78bfa"
                      : "#334155",
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="videocam-outline"
                    size={24}
                    color="#c4b5fd"
                  />

                  <Text
                    style={{
                      flex: 1,
                      color: "#ffffff",
                      fontWeight: "800",
                      marginLeft: 12,
                    }}
                  >
                    {item.campaignName}
                  </Text>

                  <Ionicons
                    name={
                      selected
                        ? "checkmark-circle"
                        : "ellipse-outline"
                    }
                    size={24}
                    color={
                      selected ? "#a78bfa" : "#64748b"
                    }
                  />
                </TouchableOpacity>
              );
            })}

            <Text
              style={{
                color: "#ffffff",
                fontSize: 17,
                fontWeight: "900",
                marginTop: 14,
                marginBottom: 10,
              }}
            >
              Legenda do vídeo
            </Text>

            <TextInput
              value={caption}
              onChangeText={setCaption}
              placeholder="Escreva a legenda do Facebook..."
              placeholderTextColor="#64748b"
              multiline
              maxLength={4000}
              style={{
                minHeight: 150,
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderWidth: 1,
                borderRadius: 16,
                padding: 16,
                color: "#ffffff",
                textAlignVertical: "top",
                fontSize: 15,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                textAlign: "right",
                marginTop: 6,
                marginBottom: 24,
              }}
            >
              {caption.length}/4000
            </Text>

            <TouchableOpacity
              onPress={confirmPublish}
              disabled={!canSubmit}
              style={{
                backgroundColor: canSubmit
                  ? "#7c3aed"
                  : "#334155",
                borderRadius: 16,
                paddingVertical: 16,
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
                  : "Publicar Reel no Facebook"}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: "#94a3b8",
                textAlign: "center",
                fontSize: 12,
                lineHeight: 18,
                marginTop: 12,
              }}
            >
              {"A publica\u00e7\u00e3o somente ser\u00e1 iniciada ap\u00f3s sua confirma\u00e7\u00e3o."}
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
