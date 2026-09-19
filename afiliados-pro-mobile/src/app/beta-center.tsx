import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import api from "../services/api";

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={{ width: "48%", backgroundColor: "#1e293b", borderRadius: 16, padding: 16, marginBottom: 12 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>{value}</Text>
      <Text style={{ color: "#94a3b8", marginTop: 5 }}>{label}</Text>
    </View>
  );
}

export default function BetaCenter() {
  const [cohort, setCohort] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setError("");
      const { data } = await api.get("/admin/founding-cohort");
      setCohort(data.cohort);
    } catch (requestError: any) {
      setError(requestError.response?.data?.error || "Não foi possível carregar o Centro da Beta.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: "#0f172a", justifyContent: "center" }}><ActivityIndicator size="large" color="#38bdf8" /></View>;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
    >
      <View style={{ padding: 20, paddingBottom: 48 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#38bdf8", marginBottom: 20 }}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>Centro da Beta</Text>
        <Text style={{ color: "#94a3b8", marginTop: 6, marginBottom: 20 }}>Evolução dos usuários fundadores</Text>

        {error ? <Text style={{ color: "#fca5a5" }}>{error}</Text> : null}
        {cohort ? (
          <>
            <View style={{ backgroundColor: cohort.enabled ? "#064e3b" : "#3f2d16", borderRadius: 14, padding: 14, marginBottom: 18 }}>
              <Text style={{ color: cohort.enabled ? "#6ee7b7" : "#fcd34d", fontWeight: "bold" }}>
                Campanha {cohort.enabled ? "ATIVA" : "DESATIVADA"}
              </Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Metric label="Vagas ocupadas" value={`${cohort.claimed}/${cohort.limit}`} />
              <Metric label="Testes ativos" value={cohort.activeTrials} />
              <Metric label="Criaram campanha" value={cohort.activation?.createdCampaign || 0} />
              <Metric label="Primeira divulgação" value={cohort.activation?.completedDistribution || 0} />
              <Metric label="Usaram KAEL" value={cohort.activation?.usedKael || 0} />
              <Metric label="Conversão paga" value={`${cohort.conversionRate}%`} />
            </View>

            <Text style={{ color: "#fff", fontSize: 19, fontWeight: "bold", marginTop: 12, marginBottom: 12 }}>Retenção</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Metric label="Dia 7" value={cohort.retention?.day7 || 0} />
              <Metric label="Dia 14" value={cohort.retention?.day14 || 0} />
              <Metric label="Dia 28" value={cohort.retention?.day28 || 0} />
              <Metric label="Expirados" value={cohort.expiredTrials} />
            </View>

            <Text style={{ color: "#fff", fontSize: 19, fontWeight: "bold", marginTop: 12, marginBottom: 12 }}>Opiniões</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Metric label="Respostas" value={cohort.feedback?.responses || 0} />
              <Metric label="Nota média" value={cohort.feedback?.averageRating || 0} />
              <Metric label="Recomendariam" value={`${cohort.feedback?.recommendationRate || 0}%`} />
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}
