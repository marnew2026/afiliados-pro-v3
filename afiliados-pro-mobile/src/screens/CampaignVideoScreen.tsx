import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, AppState, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import storage from "../services/sessionStorage";
import { CampaignVideoTask, campaignVideoError, campaignVideoStorageKey, createCampaignVideo, extractProductLink, getCampaignVideo } from "../services/campaignVideoService";

const statusText = {
  queued: "Na fila de criação",
  processing: "Criando sua campanha e montando o vídeo",
  ready: "Campanha e vídeo prontos",
  failed: "Não foi possível concluir",
};
export default function CampaignVideoScreen() {
  const [userId, setUserId] = useState("");
  const [link, setLink] = useState("");
  const [task, setTask] = useState<CampaignVideoTask | null>(null);
  const [taskId, setTaskId] = useState("");
  const [hydrating, setHydrating] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [openingVideo, setOpeningVideo] = useState(false);
  const submitLock = useRef(false);
  const mounted = useRef(true);
  const pending = task?.status === "queued" || task?.status === "processing";

  useEffect(() => {
    mounted.current = true;
    async function restore() {
      try {
        const id = await storage.getItem("userId");
        const token = await storage.getItem("token");
        if (!mounted.current) return;
        if (!id || !token) { router.replace("/login" as any); return; }
        setUserId(id);
        const saved = await storage.getItem(campaignVideoStorageKey(id));
        if (!mounted.current || !saved) return;
        try {
          const data = JSON.parse(saved);
          if (/^[a-f\d]{24}$/i.test(data.taskId) && typeof data.link === "string") {
            setLink(data.link); setTaskId(data.taskId);
          }
        } catch { /* Um registro incompleto nao impede uma nova criacao. */ }
      } catch { if (mounted.current) setError("Não foi possível recuperar o acompanhamento salvo."); }
      finally { if (mounted.current) setHydrating(false); }
    }
    void restore();
      return () => { mounted.current = false; };
  }, []);

  useFocusEffect(useCallback(() => {
    if (!taskId || !userId) return;
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    let inFlight = false;
    let terminal = false;
    async function check() {
      if (!active || inFlight || (AppState.currentState && AppState.currentState !== "active")) return;
      inFlight = true;
      controller = new AbortController();
      try {
        const updated = await getCampaignVideo(taskId, controller.signal);
        if (!active) return;
        setTask(updated); setError("");
        terminal = updated.status === "ready" || updated.status === "failed";
      } catch (requestError: any) {
        if (!active || controller.signal.aborted) return;
        setError(campaignVideoError(requestError));
        terminal = [401, 404, 503].includes(requestError?.response?.status);
      } finally {
        inFlight = false;
        if (active && !terminal && (!AppState.currentState || AppState.currentState === "active")) {
          timer = setTimeout(() => void check(), 5000);
        }
      }
    }
    void check();
    const subscription = AppState.addEventListener("change", state => {
      if (timer) clearTimeout(timer);
      if (state === "active") void check();
      else controller?.abort();
    });
    return () => { active = false; if (timer) clearTimeout(timer); controller?.abort(); subscription.remove(); };
  }, [taskId, userId, refresh]));

  async function submit() {
    if (submitLock.current || pending || !userId) return;
    let cleanLink;
    try { cleanLink = extractProductLink(link); }
    catch (validationError: any) { setError(validationError.message); return; }
    submitLock.current = true; setSubmitting(true); setError("");
    try {
      const created = await createCampaignVideo(cleanLink);
      // Guarda o acompanhamento mesmo que o usuario tenha saido desta tela.
      try {
        await storage.setItem(campaignVideoStorageKey(userId), JSON.stringify({ taskId: created.id, link: cleanLink }));
      } catch { if (mounted.current) setError("A criação começou, mas não foi possível salvar o acompanhamento. Mantenha esta tela aberta."); }
      if (!mounted.current) return;
      setLink(cleanLink); setTask(created); setTaskId(created.id); setRefresh(value => value + 1);
    } catch (requestError: any) {
      if (mounted.current) setError(campaignVideoError(requestError));
    } finally {
      submitLock.current = false;
      if (mounted.current) setSubmitting(false);
    }
  }
  async function startAnother() {
    if (pending || submitting) return;
    try { await storage.removeItem(campaignVideoStorageKey(userId)); }
    catch { setError("Não foi possível limpar o acompanhamento anterior. Tente novamente."); return; }
    if (!mounted.current) return;
    setTask(null); setTaskId(""); setLink(""); setError("");
  }

  async function watchVideo() {
    if (!taskId || openingVideo) return;
    setOpeningVideo(true);
    setError("");
    try {
      const updated = await getCampaignVideo(taskId);
      if (!mounted.current) return;
      setTask(updated);
      if (updated.status !== "ready" || !updated.previewUrl) {
        throw new Error("O vídeo ainda não está disponível para assistir. Atualize o acompanhamento.");
      }
      const url = new URL(updated.previewUrl);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error("Endereço do vídeo inválido.");
      await Linking.openURL(url.href);
    } catch (requestError) {
      if (mounted.current) setError(campaignVideoError(requestError));
    } finally {
      if (mounted.current) setOpeningVideo(false);
    }
  }

  if (hydrating) return <View style={styles.loading}><ActivityIndicator color="#a78bfa" /></View>;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Criar com KAEL</Text>
      <Text style={styles.description}>Cole seu link de afiliado do Mercado Livre. O KAEL cria a campanha e monta um vídeo vertical com as fotos do produto.</Text>
      <Text style={styles.label}>Link de afiliado</Text>
      <TextInput accessibilityLabel="Link de afiliado do produto" placeholder="https://meli.la/..." placeholderTextColor="#94a3b8" value={link}
        onChangeText={setLink} editable={!submitting && !pending && !taskId} autoCapitalize="none" autoCorrect={false}
        keyboardType="url" multiline style={styles.input} />
      {!taskId && <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: submitting, busy: submitting }}
        disabled={submitting} onPress={() => void submit()} style={[styles.primary, submitting && styles.disabled]}>
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Criar campanha e vídeo</Text>}
      </TouchableOpacity>}
      {taskId && !task && <View style={styles.card}><ActivityIndicator color="#a78bfa" /><Text style={styles.description}>Recuperando sua criação…</Text></View>}
      {task && <View style={styles.card}>
        {pending && <ActivityIndicator color="#a78bfa" />}
        <Text accessibilityLiveRegion="polite" style={styles.status}>{statusText[task.status]}</Text>
        {!!task.title && <Text style={styles.description}>{task.title}</Text>}
        {pending && <Text style={styles.description}>O acompanhamento atualiza automaticamente. A montagem continua se você fechar o aplicativo.</Text>}
        {task.status === "failed" && <>
          <Text style={styles.error}>{task.lastError || "Tente novamente para retomar a criação."}</Text>
          <TouchableOpacity accessibilityRole="button" disabled={submitting} onPress={() => void submit()} style={styles.primary}>
            {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Tentar novamente</Text>}
          </TouchableOpacity>
        </>}
        {task.status === "ready" && <>
          <Text style={styles.description}>Seu vídeo está disponível para divulgação.</Text>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Assistir ao vídeo"
            accessibilityState={{ disabled: openingVideo, busy: openingVideo }} disabled={openingVideo}
            onPress={() => void watchVideo()} style={styles.primary}>
            {openingVideo ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Assistir ao vídeo</Text>}
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/nova-divulgacao" as any)} style={styles.primary}>
            <Text style={styles.buttonText}>Abrir divulgação</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" onPress={() => router.replace("/dashboard")} style={styles.secondary}>
            <Text style={styles.buttonText}>Ver minhas campanhas</Text>
          </TouchableOpacity>
        </>}
      </View>}
      {!!error && <View style={styles.card}><Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>
        {!!taskId && <TouchableOpacity accessibilityRole="button" onPress={() => setRefresh(value => value + 1)} style={styles.secondary}><Text style={styles.buttonText}>Atualizar acompanhamento</Text></TouchableOpacity>}
      </View>}
      {!!taskId && (!!task || !!error) && !pending && !submitting && <TouchableOpacity accessibilityRole="button" onPress={() => void startAnother()} style={styles.secondary}><Text style={styles.buttonText}>Criar outra campanha</Text></TouchableOpacity>}
      <TouchableOpacity accessibilityRole="button" onPress={() => router.back()} style={styles.secondary}><Text style={styles.buttonText}>Voltar</Text></TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0f172a" }, container: { padding: 22, paddingBottom: 48 },
  loading: { flex: 1, backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", marginBottom: 14 },
  description: { color: "#cbd5e1", fontSize: 15, lineHeight: 23, marginBottom: 14 },
  label: { color: "#e2e8f0", fontSize: 14, fontWeight: "700", marginTop: 12, marginBottom: 8 },
  input: { color: "#fff", backgroundColor: "#1e293b", padding: 15, borderRadius: 12, minHeight: 80, marginBottom: 14 },
  primary: { backgroundColor: "#7c3aed", borderRadius: 12, padding: 16, alignItems: "center", marginTop: 8 },
  secondary: { backgroundColor: "#1e293b", borderRadius: 12, padding: 15, alignItems: "center", marginTop: 12 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 }, disabled: { opacity: 0.6 },
  card: { backgroundColor: "#1e293b", padding: 18, borderRadius: 16, marginTop: 20 },
  status: { color: "#c4b5fd", fontSize: 18, fontWeight: "700", marginVertical: 12 },
  error: { color: "#fca5a5", fontSize: 14, lineHeight: 22 },
});
