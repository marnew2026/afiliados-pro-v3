import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import api from "../services/api";

export default function Admin() {

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [stats, setStats] = useState({
  paid: 0,
  sent: 0,
  processing: 0,
  failed: 0,
  totalPaid: 0,
  totalUsers: 0,
  totalWithdraws: 0,
});

const [search, setSearch] = useState("");

const [filter, setFilter] = useState("all");



  useEffect(() => {
    loadAdminData();
  }, []);

async function loadAdminData() {
  try {
    setLoading(true);
    const [statsResponse, withdrawalsResponse] = await Promise.all([
      api.get("/adminWithdraw/stats"),
      api.get("/adminWithdraw"),
    ]);
    setStats(statsResponse.data);
    setWithdraws(withdrawalsResponse.data.withdrawals ?? []);
    setAuthorized(true);
  } catch (error: any) {
    console.log(error.response?.data || error.message);
    setAuthorized(false);
  } finally {
    setLoading(false);
  }
}
  
async function loadStats() {
  try {
    const { data } = await api.get("/adminWithdraw/stats");
    setStats(data);
  } catch (err) {
    console.log(err);
  }
}
  async function loadWithdraws() {
  try {
    setLoading(true);

    const { data } = await api.get("/adminWithdraw");

    setWithdraws(data.withdrawals ?? []);
  } catch (e: any) {
    console.log(e.response?.data || e.message);
  } finally {
    setLoading(false);
  }
}
const filteredWithdraws = withdraws.filter((item: any) => {
  const nome = item.user?.name?.toLowerCase() || "";
  const email = item.user?.email?.toLowerCase() || "";
  const pix = item.pixKey?.toLowerCase() || "";

  const texto = search.toLowerCase();

  const pesquisaOk =
    texto === "" ||
    nome.includes(texto) ||
    email.includes(texto) ||
    pix.includes(texto);

  let filtroOk = true;

  if (filter === "paid") {
    filtroOk = item.status === "paid";
  }

  if (filter === "pending") {
    filtroOk =
      item.status === "pending" ||
      item.status === "processing" ||
      item.status === "sent";
  }

  if (filter === "failed") {
    filtroOk = item.status === "failed";
  }

  return pesquisaOk && filtroOk;
});


const total = filteredWithdraws.length;

const paid = filteredWithdraws.filter(
  (w) => w.status === "paid"
).length;

const pending = filteredWithdraws.filter(
  (w) =>
    w.status === "pending" ||
    w.status === "processing" ||
    w.status === "sent"
).length;

const failed = filteredWithdraws.filter(
  (w) => w.status === "failed"
).length;

  if (loading) {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0f172a",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (authorized === false) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Acesso administrativo restrito</Text>
        <Text style={{ color: "#94a3b8", marginTop: 10, textAlign: "center" }}>Esta área está disponível somente para administradores autorizados.</Text>
        <TouchableOpacity onPress={() => router.replace("/dashboard" as any)} style={{ backgroundColor: "#2563eb", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, marginTop: 22 }}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Voltar ao painel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <View 
      style={{ padding: 20 }}>

        <TouchableOpacity
          onPress={() =>
            router.replace("/dashboard" as any)
          }
        >
          <Text
            style={{
              color: "#38bdf8",
              marginBottom: 20,
            }}
          >
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text
  style={{
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  }}
>
  🛠 Painel Admin
</Text>

<TouchableOpacity
  onPress={() => router.push("/beta-center" as any)}
  style={{
    backgroundColor: "#0f766e",
    borderColor: "#5eead4",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  }}
>
  <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
    Centro da Beta
  </Text>
  <Text style={{ color: "#ccfbf1", marginTop: 5 }}>
    Acompanhe ativação, retenção, conversão e opiniões dos fundadores.
  </Text>
</TouchableOpacity>
<View
  style={{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  }}
>
  <Card
    titulo="Usuários"
   valor={String(stats.totalUsers)}
  />

  <Card
    titulo="Saques"
valor={String(stats.totalWithdraws)}
  />

  <Card
    titulo="Pagos"
    valor={stats.paid}
  />

  <Card
    titulo="Falhou"
    valor={stats.failed}
  />

  <Card
    titulo="Total Pago"
  valor={`R$ ${(stats.totalPaid ?? 0).toFixed(2)}`}
  />
</View>

<TouchableOpacity
  onPress={() => router.push("/integration-readiness" as any)}
  style={{
    backgroundColor: "#0f766e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  }}
>
  <Text
    style={{
      color: "#fff",
      fontSize: 17,
      fontWeight: "bold",
    }}
  >
    Centro de Prontidão das Integrações
  </Text>
  <Text
    style={{
      color: "#ccfbf1",
      marginTop: 5,
    }}
  >
    Consulte Meta, TikTok, Kwai e Telegram com segurança
  </Text>
</TouchableOpacity>

 
 <TextInput
  placeholder="Pesquisar nome, email ou PIX..."
  placeholderTextColor="#94a3b8"
  value={search}
  onChangeText={setSearch}
  style={{
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
  }}
/>
<View
  style={{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  }}
>
  {[
    { label: "Todos", value: "all" },
    { label: "Pagos", value: "paid" },
    { label: "Pendentes", value: "pending" },
    { label: "Falhou", value: "failed" },
  ].map((item) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => setFilter(item.value)}
      style={{
        backgroundColor:
          filter === item.value ? "#2563eb" : "#1e293b",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  ))}
</View>
        <View
          style={{
            backgroundColor: "#1e293b",
            padding: 18,
            borderRadius: 14,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#fff" }}>
            📊 Total: {total}
          </Text>

          <Text style={{ color: "#22c55e" }}>
            ✅ Pagos: {paid}
          </Text>

          <Text style={{ color: "#facc15" }}>
            🟡 Pendentes: {pending}
          </Text>

          <Text style={{ color: "#ef4444" }}>
            ❌ Falharam: {failed}
          </Text>
        </View>
 
       {filteredWithdraws.map((item: any) => (
  <View
    key={item._id}
    style={{
      backgroundColor: "#1e293b",
      borderRadius: 16,
      padding: 18,
      marginBottom: 16,
    }}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
      }}
    >
    💰 R$ {Number(item.amount ?? 0).toFixed(2)}
    </Text>

    <Text
      style={{
        color: "#38bdf8",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 6,
      }}
    >
      👤 {item.user?.name}
    </Text>

    <Text
      style={{
        color: "#cbd5e1",
        fontSize: 18,
        marginBottom: 4,
      }}
    >
      📧 {item.user?.email}
    </Text>

    <Text
      style={{
        color: "#cbd5e1",
        fontSize: 18,
        marginBottom: 12,
      }}
    >
      🔑 {item.pixKey}
    </Text>

    <Text
      style={{
        fontSize: 20,
        fontWeight: "bold",
        color:
          item.status === "paid"
            ? "#22c55e"
            : item.status === "failed"
            ? "#ef4444"
            : "#facc15",
      }}
    >
     Status: {(item.status || "pending").toUpperCase()}
    </Text>
  </View>
))}
      </View>
    </ScrollView>
  );
}
function Card({
  titulo,
  valor,
}: {
  titulo: string;
  valor: any;
}) {

  return (
    <View
      style={{
        width: "48%",
        backgroundColor: "#1e293b",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        {titulo}
      </Text>

      <Text
        style={{
          color: "#22c55e",
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 8,
        }}
      >
        {String(valor)}
      </Text>
    </View>
  );
}
