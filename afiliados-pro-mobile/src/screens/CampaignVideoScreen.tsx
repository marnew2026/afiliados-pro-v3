import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, AppState, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import api from "../services/api";
import { campaignVideoError, createCampaignVideoBatch, extractProductLinks, getCampaignVideo, getKaelLinkSummary,
  KaelLinkSummary, LinkCampaignTask, listCampaignVideos } from "../services/campaignVideoService";
import TikTokConnectionCard from "../components/distribution/TikTokConnectionCard";
import InstagramConnectionCard from "../components/distribution/InstagramConnectionCard";
import FacebookConnectionCard from "../components/distribution/FacebookConnectionCard";

const channels = ["tiktok", "instagram", "facebook", "kwai", "telegram"];
const names: Record<string, string> = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook", kwai: "Kwai", telegram: "Telegram" };
const statuses: Record<string, string> = { queued: "Na fila", processing: "Montando campanha e vídeo", ready: "Vídeo pronto", failed: "Criação pendente de correção",
  scheduled: "Na fila de divulgação", published: "Publicado", delivered: "Enviado à rede", cancelled: "Cancelado" };
export default function CampaignVideoScreen() {
  const [links, setLinks] = useState("");
  const [tasks, setTasks] = useState<LinkCampaignTask[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [summary, setSummary] = useState<KaelLinkSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [opening, setOpening] = useState("");
  const [revision, setRevision] = useState(0);
  const lock = useRef(false);
  const focused = useRef(false);
  useFocusEffect(useCallback(() => {
    focused.current = true;
    let active = true, inFlight = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    async function load(initial = false) {
      if (!active || inFlight || (AppState.currentState && AppState.currentState !== "active")) return;
      inFlight = true; controller = new AbortController();
      try {
        const [rows, activity, settingsResponse] = await Promise.all([
          listCampaignVideos(controller.signal), getKaelLinkSummary(controller.signal),
          initial ? api.get("/autopilot/settings", { signal: controller.signal }) : Promise.resolve(null),
        ]);
        if (!active) return;
        setTasks(rows); setSummary(activity); setEnabled(activity.enabled);
        if (settingsResponse && !lock.current) setSelected(settingsResponse.data?.settings?.channels || []);
      } catch (requestError: any) {
        if (active && !controller.signal.aborted) setError(campaignVideoError(requestError));
      } finally {
        inFlight = false;
        if (active) { setLoading(false); timer = setTimeout(() => void load(), 10000); }
      }
    }
    void load(true);
    const subscription = AppState.addEventListener("change", state => {
      if (timer) clearTimeout(timer);
      if (state === "active") void load(true); else controller?.abort();
    });
    return () => { active = false; focused.current = false; if (timer) clearTimeout(timer); controller?.abort(); subscription.remove(); };
  }, [revision]));

  async function submit() {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError(""); setMessage("");
    try {
      const results = await createCampaignVideoBatch(extractProductLinks(links));
      if (!focused.current) return;
      const accepted = results.filter(item => item.accepted), rejected = results.filter(item => !item.accepted);
      setLinks(rejected.map(item => item.link).join("\n"));
      setMessage(`${accepted.length} link(s) cadastrado(s). O KAEL continua a montagem no servidor.`);
      if (rejected.length) setError(rejected.map(item => item.error).join("\n"));
      setRevision(value => value + 1);
    } catch (requestError) { if (focused.current) setError(campaignVideoError(requestError)); }
    finally { lock.current = false; if (focused.current) setBusy(false); }
  }
  async function saveAutomation(nextEnabled: boolean, nextChannels = selected) {
    if (lock.current) return;
    if (nextEnabled && !nextChannels.length) { setError("Escolha pelo menos uma rede para divulgar."); return; }
    lock.current = true; setBusy(true); setError("");
    try {
      const { data } = await api.put("/autopilot/settings", { enabled: nextEnabled, mode: "automatico", linkAutomation: true,
        ...(nextChannels.length ? { channels: nextChannels } : {}) });
      if (!data?.settings) throw new Error("Não foi possível salvar o automático.");
      if (!focused.current) return;
      setSelected(data.settings.channels); setEnabled(data.settings.enabled);
      setMessage(nextEnabled ? "Automático habilitado. Os próximos links seguem esta configuração." : "Divulgação automática pausada.");
      setRevision(value => value + 1);
    } catch (requestError) { if (focused.current) setError(campaignVideoError(requestError)); }
    finally { lock.current = false; if (focused.current) setBusy(false); }
  }
  function selectChannel(channel: string) {
    const next = selected.includes(channel) ? selected.filter(item => item !== channel) : [...selected, channel];
    if (enabled) void saveAutomation(next.length > 0, next);
    else setSelected(next);
  }
  async function watch(task: LinkCampaignTask) {
    if (opening) return;
    setOpening(task.id); setError("");
    try {
      const current = await getCampaignVideo(task.id);
      if (!current.previewUrl) throw new Error("O vídeo ainda não está disponível.");
      const url = new URL(current.previewUrl);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error("Endereço do vídeo inválido.");
      await Linking.openURL(url.href);
    } catch (requestError) { if (focused.current) setError(campaignVideoError(requestError)); }
    finally { if (focused.current) setOpening(""); }
  }
  return <ScrollView style={styles.screen} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.title}>Divulgar com KAEL</Text>
    <Text style={styles.description}>Conecte suas redes uma vez, escolha onde divulgar e habilite o automático. Depois, basta adicionar links.</Text>
    <Text style={styles.heading}>Suas redes</Text>
    <TikTokConnectionCard /><InstagramConnectionCard /><FacebookConnectionCard />
    <View style={styles.card}>
      <Text style={styles.heading}>Onde divulgar</Text>
      {channels.map(channel => <TouchableOpacity key={channel} accessibilityRole="checkbox" accessibilityState={{ checked: selected.includes(channel), disabled: busy || loading }}
        disabled={busy || loading} onPress={() => selectChannel(channel)} style={styles.choice}>
        <Text style={styles.white}>{selected.includes(channel) ? "☑" : "☐"} {names[channel]}</Text>
        <Text style={styles.small}>{summary?.channels.find(item => item.channel === channel)?.available ? "Disponível no servidor" : "Aguardando liberação da integração"}</Text>
      </TouchableOpacity>)}
      <Text style={styles.small}>O Telegram usa o canal já cadastrado. Redes sem autorização ou liberação aguardam; as demais continuam. No staging, o TikTok usa publicação privada de teste.</Text>
      <TouchableOpacity accessibilityRole="switch" accessibilityState={{ checked: enabled, disabled: busy || loading }} disabled={busy || loading}
        onPress={() => void saveAutomation(!enabled)} style={[styles.primary, enabled && styles.active]}>
        {busy || loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.button}>{enabled ? "Automático habilitado • Pausar" : "Habilitar divulgação automática"}</Text>}
      </TouchableOpacity>
      <Text style={styles.small}>Os limites de frequência da sua conta são respeitados. Você acompanha as publicações e os resultados no dashboard.</Text>
    </View>
    <Text style={styles.heading}>Cadastrar links de afiliado</Text>
    <Text style={styles.description}>Cole até 10 links do Mercado Livre, um por linha. O KAEL cria os textos e os vídeos e divulga quando o automático estiver habilitado.</Text>
    <TextInput accessibilityLabel="Links de afiliado, um por linha" value={links} onChangeText={setLinks} editable={!busy} multiline
      autoCapitalize="none" autoCorrect={false} placeholder="https://meli.la/...\nhttps://meli.la/..." placeholderTextColor="#94a3b8" style={styles.input} />
    <TouchableOpacity accessibilityRole="button" disabled={busy || !links.trim()} onPress={() => void submit()} style={[styles.primary, (busy || !links.trim()) && styles.disabled]}>
      <Text style={styles.button}>Cadastrar links</Text>
    </TouchableOpacity>
    {!!message && <Text accessibilityLiveRegion="polite" style={styles.message}>{message}</Text>}
    {!!error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
    <Text style={styles.heading}>Links cadastrados</Text>
    {loading && <ActivityIndicator color="#a78bfa" />}
    {!loading && !tasks.length && <Text style={styles.description}>Seus links aparecerão aqui depois do cadastro.</Text>}
    {tasks.map(task => <View key={task.id} style={styles.card}>
      <Text style={styles.white}>{task.title || "Identificando produto"}</Text>
      <Text style={styles.small}>{statuses[task.status]}</Text>
      {task.movie && task.status !== "ready" && <Text style={styles.small}>
        {task.movie.phase || "Preparando cenas"} • {task.movie.completedScenes}/{task.movie.totalScenes}
      </Text>}
      {task.movie && task.status === "ready" && <Text style={styles.small}>Cenas produzidas com IA</Text>}
      {task.status === "failed" && <Text style={styles.error}>{task.lastError}</Text>}
      {task.status === "ready" && <TouchableOpacity accessibilityRole="button" disabled={!!opening} onPress={() => void watch(task)} style={styles.secondary}>
        <Text style={styles.button}>{opening === task.id ? "Abrindo…" : "Assistir ao vídeo"}</Text>
      </TouchableOpacity>}
    </View>)}
    <TouchableOpacity accessibilityRole="button" onPress={() => router.replace("/dashboard")} style={styles.secondary}><Text style={styles.button}>Ver resultados no dashboard</Text></TouchableOpacity>
    <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/divulgacao-manual" as any)} style={styles.secondary}><Text style={styles.button}>Opções de divulgação manual</Text></TouchableOpacity>
  </ScrollView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0f172a" }, container: { padding: 20, paddingBottom: 50 },
  title: { color: "white", fontSize: 28, fontWeight: "800", marginBottom: 12 },
  heading: { color: "#c4b5fd", fontSize: 18, fontWeight: "700", marginVertical: 14 },
  description: { color: "#cbd5e1", fontSize: 15, lineHeight: 22, marginBottom: 12 },
  card: { backgroundColor: "#1e293b", borderRadius: 16, padding: 16, marginVertical: 8 },
  choice: { paddingVertical: 12, borderBottomWidth: 1, borderColor: "#334155" },
  white: { color: "white", fontSize: 16, fontWeight: "600" }, small: { color: "#cbd5e1", fontSize: 13, lineHeight: 20, marginTop: 8 },
  input: { backgroundColor: "#1e293b", color: "white", borderRadius: 12, padding: 15, minHeight: 135, textAlignVertical: "top" },
  primary: { backgroundColor: "#7c3aed", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 16 },
  active: { backgroundColor: "#166534" }, secondary: { backgroundColor: "#334155", padding: 14, borderRadius: 12, marginTop: 12, alignItems: "center" },
  button: { color: "white", fontWeight: "700", fontSize: 15 }, disabled: { opacity: .5 },
  error: { color: "#fca5a5", marginTop: 12, lineHeight: 22 }, message: { color: "#86efac", marginTop: 12, lineHeight: 22 },
});
