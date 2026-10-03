import React, { useCallback, useState } from "react";
import { AppState, Text, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { getKaelLinkSummary, KaelLinkSummary, listCampaignVideos, LinkCampaignTask } from "../../services/campaignVideoService";
const names: Record<string, string> = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook", telegram: "Telegram", kwai: "Kwai" };
export default function KaelActivitySummary() {
  const [summary, setSummary] = useState<KaelLinkSummary | null>(null);
  const [failures, setFailures] = useState<LinkCampaignTask[]>([]);
  useFocusEffect(useCallback(() => {
    let active = true, inFlight = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    async function load() {
      if (!active || inFlight || (AppState.currentState && AppState.currentState !== "active")) return;
      inFlight = true; controller = new AbortController();
      try {
        const data = await getKaelLinkSummary(controller.signal);
        const rows = data.failedPublications ? await listCampaignVideos(controller.signal) : [];
        if (active) { setSummary(data); setFailures(rows.filter(row => row.publications?.some(item => item.status === "failed"))); }
      } catch { /* Servidores anteriores ao recurso mantem o dashboard principal disponivel. */ }
      finally { inFlight = false; if (active) timer = setTimeout(() => void load(), 30000); }
    }
    void load();
    const subscription = AppState.addEventListener("change", state => { if (timer) clearTimeout(timer); if (state === "active") void load(); else controller?.abort(); });
    return () => { active = false; if (timer) clearTimeout(timer); controller?.abort(); subscription.remove(); };
  }, []));
  if (!summary) return null;
  return <View style={{ backgroundColor: "#1e293b", borderRadius: 18, padding: 18, marginVertical: 14 }}>
    <Text style={{ color: "#c4b5fd", fontSize: 18, fontWeight: "800" }}>O trabalho do KAEL hoje</Text>
    <Text style={{ color: "white", fontSize: 22, fontWeight: "800", marginTop: 12 }}>{summary.publishedToday} divulgação(ões) publicada(s)</Text>
    <Text style={{ color: "#cbd5e1", marginTop: 8 }}>{Object.entries(summary.byChannel).map(([channel, count]) => `${count} no ${names[channel] || channel}`).join(" • ") || "As publicações concluídas aparecerão aqui."}</Text>
    <Text style={{ color: "#cbd5e1", marginTop: 8 }}>{summary.generating} campanha(s) em criação • {summary.campaignClicksTotal} cliques acumulados nas campanhas dos links</Text>
    <Text style={{ color: "#94a3b8", marginTop: 8 }}>{summary.enabled && summary.serverEnabled ? "Automático habilitado" : "Automático pausado"}</Text>
    {summary.failedPublications > 0 && <>
      <Text style={{ color: "#fca5a5", marginTop: 12 }}>{summary.failedPublications} divulgação(ões) com falha. A rede pode precisar de reconexão.</Text>
      {failures.slice(0, 3).map(task => <Text key={task.id} style={{ color: "#cbd5e1", marginTop: 8 }}>{task.title}: {task.publications?.filter(item => item.status === "failed").map(item => names[item.channel] || item.channel).join(", ")}</Text>)}
    </>}
    <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/divulgacao" as any)} style={{ paddingVertical: 14, marginTop: 10 }}>
      <Text style={{ color: "#c4b5fd", fontWeight: "700" }}>Adicionar links ou ajustar o automático</Text>
    </TouchableOpacity>
  </View>;
}
