import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import {
  ChannelReadiness,
  fetchIntegrationReadiness,
  IntegrationReadiness,
} from "../services/integrationReadinessApi";

const CHANNEL_NAMES: Record<string, string> = {
  telegram: "Telegram",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  kwai: "Kwai",
};

const BLOCKER_LABELS: Record<string, string> = {
  approval_pending: "Aguardando aprovacao da plataforma",
  approval_rejected: "Aprovacao rejeitada",
  official_configuration_pending: "Configuracao oficial ainda nao definida",
  configuration_incomplete: "Configuracao incompleta",
  feature_disabled: "Integracao desativada",
  emergency_disabled: "Desligamento emergencial ativo",
  staging_not_tested: "Teste de staging pendente",
  production_not_released: "Producao ainda nao liberada",
};

function StateLine({ label, value }: { label: string; value: boolean }) {
  return (
    <View style={styles.stateLine}>
      <Text style={styles.stateLabel}>{label}</Text>
      <Text style={[styles.stateValue, value ? styles.ok : styles.pending]}>
        {value ? "Sim" : "Nao"}
      </Text>
    </View>
  );
}

function ChannelCard({ item }: { item: ChannelReadiness }) {
  const ready = item.readyForProduction;
  const staging = item.readyForStaging;

  return (
    <View style={styles.channelCard}>
      <View style={styles.channelHeader}>
        <Text style={styles.channelName}>
          {CHANNEL_NAMES[item.channel] || item.channel}
        </Text>
        <View
          style={[
            styles.badge,
            ready
              ? styles.badgeProduction
              : staging
              ? styles.badgeStaging
              : styles.badgeBlocked,
          ]}
        >
          <Text style={styles.badgeText}>
            {ready ? "Producao" : staging ? "Staging" : "Bloqueado"}
          </Text>
        </View>
      </View>

      <StateLine
        label="Aprovado"
        value={item.approvalStatus === "approved"}
      />
      <StateLine label="Configurado" value={item.configured} />
      <StateLine label="Habilitado" value={item.enabled} />
      <StateLine label="Testado em staging" value={item.stagingTested} />
      <StateLine label="Liberado em producao" value={item.productionReleased} />

      {item.blockers.length > 0 && (
        <View style={styles.blockers}>
          <Text style={styles.blockersTitle}>Pendencias</Text>
          {item.blockers.map((blocker) => (
            <Text key={blocker} style={styles.blockerText}>
              • {BLOCKER_LABELS[blocker] || blocker}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

export default function IntegrationReadinessScreen() {
  const [readiness, setReadiness] = useState<IntegrationReadiness | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);

  const load = useCallback(async (refresh = false) => {
    try {
      refresh ? setRefreshing(true) : setLoading(true);
      setError("");
      setNeedsLogin(false);
      setReadiness(await fetchIntegrationReadiness());
    } catch (requestError: any) {
      const status = requestError?.response?.status;
      const sessionError =
        requestError?.code === "NO_SESSION" || status === 401 || status === 403;

      setNeedsLogin(sessionError);
      setError(
        sessionError
          ? "Entre na area de Divulgacao V4 com a conta administrativa."
          : "Nao foi possivel consultar as integracoes. Tente novamente."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={styles.loadingText}>Consultando integracoes...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => load(true)}
          tintColor="#38bdf8"
        />
      }
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Centro de Prontidao</Text>
      <Text style={styles.subtitle}>
        Controle seguro das integracoes oficiais
      </Text>

      {error ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
          {needsLogin && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push("/divulgacao-login" as any)}
            >
              <Text style={styles.loginButtonText}>Entrar na Divulgacao V4</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.retryButton} onPress={() => load()}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : readiness ? (
        <>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{readiness.summary.total}</Text>
              <Text style={styles.summaryLabel}>Canais</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>
                {readiness.summary.readyForStaging}
              </Text>
              <Text style={styles.summaryLabel}>Staging</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>
                {readiness.summary.readyForProduction}
              </Text>
              <Text style={styles.summaryLabel}>Producao</Text>
            </View>
          </View>

          <View style={styles.safeNotice}>
            <Text style={styles.safeNoticeText}>
              Protecao ativa: integracoes pendentes permanecem bloqueadas.
            </Text>
          </View>

          {readiness.channels.map((item) => (
            <ChannelCard key={item.channel} item={item} />
          ))}

          <Text style={styles.updatedAt}>
            Atualizado em {new Date(readiness.generatedAt).toLocaleString("pt-BR")}
          </Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0f172a" },
  content: { padding: 20, paddingBottom: 48 },
  centered: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { color: "#cbd5e1", marginTop: 12 },
  back: { color: "#38bdf8", marginBottom: 20, fontWeight: "600" },
  title: { color: "#fff", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#94a3b8", marginTop: 6, marginBottom: 20 },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  summaryCard: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  summaryNumber: { color: "#fff", fontSize: 24, fontWeight: "800" },
  summaryLabel: { color: "#94a3b8", fontSize: 12, marginTop: 4 },
  safeNotice: {
    backgroundColor: "#052e2b",
    borderColor: "#14b8a6",
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
  },
  safeNoticeText: { color: "#99f6e4", lineHeight: 20 },
  channelCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },
  channelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  channelName: { color: "#fff", fontSize: 20, fontWeight: "800" },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  badgeProduction: { backgroundColor: "#166534" },
  badgeStaging: { backgroundColor: "#075985" },
  badgeBlocked: { backgroundColor: "#7f1d1d" },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  stateLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomColor: "#334155",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stateLabel: { color: "#cbd5e1" },
  stateValue: { fontWeight: "700" },
  ok: { color: "#22c55e" },
  pending: { color: "#f59e0b" },
  blockers: { marginTop: 14, backgroundColor: "#0f172a", borderRadius: 10, padding: 12 },
  blockersTitle: { color: "#f8fafc", fontWeight: "700", marginBottom: 6 },
  blockerText: { color: "#fbbf24", lineHeight: 20 },
  updatedAt: { color: "#64748b", textAlign: "center", marginTop: 8 },
  errorCard: { backgroundColor: "#1e293b", borderRadius: 16, padding: 20 },
  errorText: { color: "#fecaca", lineHeight: 21 },
  loginButton: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    padding: 13,
    marginTop: 16,
    alignItems: "center",
  },
  loginButtonText: { color: "#fff", fontWeight: "700" },
  retryButton: { padding: 13, marginTop: 8, alignItems: "center" },
  retryText: { color: "#38bdf8", fontWeight: "700" },
});

