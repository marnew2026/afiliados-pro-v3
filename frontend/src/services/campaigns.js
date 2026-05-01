import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
const criarCheckout = async () => {
  const ref = localStorage.getItem("ref");

  const res = await fetch("https://SEU-BACKEND.onrender.com/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref }),
  });

  const data = await res.json();

  window.location.href = data.url;
};
const criarCampanha = async () => {
  const ref = localStorage.getItem("ref");

  try {
    const res = await fetch("https://SEU-BACKEND.onrender.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: ref || null,
      }),
    });

    const data = await res.json();

    window.location.href = data.url;

  } catch (error) {
    console.log("Erro checkout:", error.message);
  }
};
export async function createCampaign(data) {
  const user = auth.currentUser;

  if (!user) throw new Error("Usuário não logado");

  return await addDoc(collection(db, "campaigns"), {
    titulo: data.titulo,
    linkAfiliado: data.linkAfiliado,
    userId: user.uid,
    createdAt: Date.now()
  });
}

// 🟢 LISTAR CAMPANHAS DO USUÁRIO
export async function getCampaigns() {
  const user = auth.currentUser;

  if (!user) return [];

  const q = query(
    collection(db, "campaigns"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}