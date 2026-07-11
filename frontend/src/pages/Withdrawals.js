import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

const API_URL = "https://afiliados-pro-v3-2.onrender.com";

export default function Withdrawals() {

  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/withdrawals`);
      const json = await res.json();
      setData(json.withdrawals || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>💰 Saques</Text>

      {data.map((w) => (
        <View key={w._id} style={{ marginTop: 10, padding: 10, borderWidth: 1 }}>
          <Text>Valor: R$ {w.amount}</Text>
          <Text>PIX: {w.pixKey}</Text>
          <Text>Status: {w.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}