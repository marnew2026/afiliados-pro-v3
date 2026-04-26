import { db } from "./firebase";
import { ref, push, get, remove } from "firebase/database";

export const addCampaign = async (data) => {
  return await push(ref(db, "campaigns"), data);
};

export const getCampaigns = async () => {
  const snapshot = await get(ref(db, "campaigns"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key]
  }));
};

export const deleteCampaign = async (id) => {
  return await remove(ref(db, `campaigns/${id}`));
};