import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// registrar clique
export async function registerClick(campaignId) {
  try {
    await addDoc(collection(db, "clicks"), {
      campaignId,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao registrar clique:", error);
    return { success: false };
  }
}

// pegar cliques de uma campanha
export async function getClicksByCampaign(campaignId) {
  const q = query(
    collection(db, "clicks"),
    where("campaignId", "==", campaignId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}