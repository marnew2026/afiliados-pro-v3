import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import api from "../services/api";

type MuseumCampaign = {
  _id: string;
  nome?: string;
  link?: string;
  clicks?: number;
  earnings?: number;
  sales?: number;
  archivedAt?: string | null;
  createdAt?: string;
};

export default function CampaignMuseumScreen() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<MuseumCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadMuseum = useCallback(async (refresh = false) => {
    try {
      setError("");

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get("/campaigns/museum");
      setCampaigns(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          "Não foi possível carregar o Museu de Campanhas."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMuseum();
    }, [loadMuseum])
  );

  const formatMoney = (value: number | undefined) =>
    Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const formatDate = (value?: string | null) => {
    if (!value) {
      return "Data não informada";
    }

    return new Date(value).toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={26} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Museu de Campanhas</Text>
          <Text style={styles.subtitle}>
            A história das campanhas que construíram seu patrimônio.
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fbbf24" />
          <Text style={styles.loadingText}>Carregando seu Museu...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadMuseum(true)}
              tintColor="#fbbf24"
              colors={["#fbbf24"]}
            />
          }
        >
          {error ? (
            <View style={styles.messageCard}>
              <Ionicons name="alert-circle" size={42} color="#f87171" />
              <Text style={styles.errorText}>{error}</Text>

              <TouchableOpacity
                onPress={() => loadMuseum()}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : campaigns.length === 0 ? (
            <View style={styles.messageCard}>
              <Ionicons name="library" size={58} color="#fbbf24" />
              <Text style={styles.emptyTitle}>Seu Museu está começando</Text>
              <Text style={styles.emptyText}>
                Quando uma campanha for arquivada, ela aparecerá aqui com seus
                cliques, ganhos e vendas preservados.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.summaryCard}>
                <Ionicons name="library" size={34} color="#fbbf24" />
                <View style={styles.summaryText}>
                  <Text style={styles.summaryValue}>{campaigns.length}</Text>
                  <Text style={styles.summaryLabel}>
                    {campaigns.length === 1
                      ? "campanha preservada"
                      : "campanhas preservadas"}
                  </Text>
                </View>
              </View>

              {campaigns.map((campaign) => (
                <View key={campaign._id} style={styles.campaignCard}>
                  <View style={styles.cardHeader}>
                    <Ionicons name="trophy" size={28} color="#fbbf24" />

                    <View style={styles.cardTitleArea}>
                      <Text style={styles.campaignName}>
                        {campaign.nome || "Campanha sem nome"}
                      </Text>
                      <Text style={styles.archivedDate}>
                        Arquivada em {formatDate(campaign.archivedAt)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.metrics}>
                    <View style={styles.metric}>
                      <Text style={styles.metricValue}>
                        {Number(campaign.clicks || 0)}
                      </Text>
                      <Text style={styles.metricLabel}>Cliques</Text>
                    </View>

                    <View style={styles.metric}>
                      <Text style={styles.metricValue}>
                        {Number(campaign.sales || 0)}
                      </Text>
                      <Text style={styles.metricLabel}>Vendas</Text>
                    </View>

                    <View style={styles.metric}>
                      <Text style={styles.moneyValue}>
                        {formatMoney(campaign.earnings)}
                      </Text>
                      <Text style={styles.metricLabel}>Resultado</Text>
                    </View>
                  </View>

                  <View style={styles.preservedBadge}>
                    <Ionicons
                      name="shield-checkmark"
                      size={18}
                      color="#4ade80"
                    />
                    <Text style={styles.preservedText}>
                      Histórico preservado
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 20,
    backgroundColor: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    marginRight: 14,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: "#fbbf24",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#cbd5e1",
    marginTop: 14,
  },
  messageCard: {
    alignItems: "center",
    backgroundColor: "#172554",
    borderWidth: 1,
    borderColor: "#fbbf24",
    borderRadius: 24,
    padding: 28,
    marginTop: 30,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 18,
  },
  emptyText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 12,
  },
  errorText: {
    color: "#fecaca",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 14,
  },
  retryButton: {
    backgroundColor: "#b45309",
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 12,
    marginTop: 20,
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#422006",
    borderColor: "#fbbf24",
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },
  summaryText: {
    marginLeft: 16,
  },
  summaryValue: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },
  summaryLabel: {
    color: "#fde68a",
    fontSize: 14,
  },
  campaignCard: {
    backgroundColor: "#172554",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#d97706",
    padding: 18,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitleArea: {
    flex: 1,
    marginLeft: 12,
  },
  campaignName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  archivedDate: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  metric: {
    width: "31%",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  metricValue: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  moneyValue: {
    color: "#4ade80",
    fontSize: 16,
    fontWeight: "bold",
  },
  metricLabel: {
    color: "#94a3b8",
    fontSize: 11,
    marginTop: 4,
  },
  preservedBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#14532d",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
  },
  preservedText: {
    color: "#bbf7d0",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 7,
  },
});