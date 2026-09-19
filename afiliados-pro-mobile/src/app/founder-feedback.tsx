import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import api from "../services/api";

const VALUE_OPTIONS = [
  ["campaigns", "Campanhas"],
  ["kael", "KAEL"],
  ["distribution", "Divulgação"],
  ["dashboard", "Painel"],
  ["withdrawals", "Saque"],
  ["other", "Outro"],
] as const;

const DIFFICULTY_OPTIONS = [
  ["none", "Nenhuma"],
  ["onboarding", "Primeiros passos"],
  ["campaigns", "Campanhas"],
  ["connections", "Conectar canais"],
  ["publishing", "Publicar"],
  ["understanding_results", "Entender resultados"],
  ["other", "Outra"],
] as const;

function Choice({ selected, label, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? "#0f766e" : "#1e293b",
        borderColor: selected ? "#5eead4" : "#334155",
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: selected ? "bold" : "normal" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function FounderFeedback() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [rating, setRating] = useState(5);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [mostValuable, setMostValuable] = useState("kael");
  const [biggestDifficulty, setBiggestDifficulty] = useState("none");
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get("/beta/feedback")
      .then(({ data }) => {
        if (!data.feedback) return;
        setRating(data.feedback.rating);
        setWouldRecommend(data.feedback.wouldRecommend);
        setMostValuable(data.feedback.mostValuable);
        setBiggestDifficulty(data.feedback.biggestDifficulty);
        setComment(data.feedback.comment || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function submit() {
    if (wouldRecommend === null) {
      Alert.alert("Falta uma resposta", "Informe se você recomendaria o Afiliados Pro.");
      return;
    }
    try {
      setSaving(true);
      await api.post("/beta/feedback", {
        rating,
        wouldRecommend,
        mostValuable,
        biggestDifficulty,
        comment,
      });
      Alert.alert("Obrigado!", "Sua opinião foi registrada e ajudará a melhorar o aplicativo.");
      router.back();
    } catch (error: any) {
      Alert.alert("Não foi possível enviar", error.response?.data?.error || error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0f172a", justifyContent: "center" }}>
        <ActivityIndicator color="#5eead4" size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <View style={{ padding: 20, paddingBottom: 48 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#38bdf8", marginBottom: 20 }}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
          Opinião do Fundador
        </Text>
        <Text style={{ color: "#94a3b8", marginTop: 8, marginBottom: 24 }}>
          Conte como está sendo sua experiência. Leva menos de dois minutos.
        </Text>

        <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>
          Que nota você dá ao aplicativo?
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <Choice key={value} selected={rating === value} label={`${value} ★`} onPress={() => setRating(value)} />
          ))}
        </View>

        <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>
          Você recomendaria o Afiliados Pro?
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Choice selected={wouldRecommend === true} label="Sim" onPress={() => setWouldRecommend(true)} />
          <Choice selected={wouldRecommend === false} label="Ainda não" onPress={() => setWouldRecommend(false)} />
        </View>

        <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>
          O que gerou mais valor?
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
          {VALUE_OPTIONS.map(([value, label]) => (
            <Choice key={value} selected={mostValuable === value} label={label} onPress={() => setMostValuable(value)} />
          ))}
        </View>

        <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>
          Qual foi a maior dificuldade?
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
          {DIFFICULTY_OPTIONS.map(([value, label]) => (
            <Choice key={value} selected={biggestDifficulty === value} label={label} onPress={() => setBiggestDifficulty(value)} />
          ))}
        </View>

        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="O que deveríamos melhorar? (opcional)"
          placeholderTextColor="#64748b"
          multiline
          maxLength={1000}
          style={{
            minHeight: 120,
            color: "#fff",
            backgroundColor: "#1e293b",
            borderColor: "#334155",
            borderWidth: 1,
            borderRadius: 14,
            padding: 14,
            textAlignVertical: "top",
          }}
        />

        <TouchableOpacity
          disabled={saving}
          onPress={submit}
          style={{
            backgroundColor: saving ? "#475569" : "#0f766e",
            borderRadius: 14,
            padding: 16,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            {saving ? "Enviando..." : "Enviar opinião"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
