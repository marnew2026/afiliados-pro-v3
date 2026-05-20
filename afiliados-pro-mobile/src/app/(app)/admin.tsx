import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

export default function Admin() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const carregar = async () => {
    try {
      const res = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/admin/users"
      );

      const data = await res.json();

      setUsuarios(data);
    } catch (e) {
      console.log(e);
    }
  };

  const liberarPro = async (email: string) => {
    try {
      await fetch(
        "https://afiliados-pro-v3-2.onrender.com/admin/pro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      carregar();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111827", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 26, marginBottom: 20 }}>
        Painel Admin
      </Text>

      {usuarios.map((u) => (
        <View
          key={u._id}
          style={{
            backgroundColor: "#1F2937",
            padding: 15,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {u.email}
          </Text>

          <Text style={{ color: "#9CA3AF", marginTop: 6 }}>
            PRO: {u.isPro ? "SIM" : "NÃO"}
          </Text>

          <TouchableOpacity
            onPress={() => liberarPro(u.email)}
            style={{
              backgroundColor: "#10B981",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Liberar PRO
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}