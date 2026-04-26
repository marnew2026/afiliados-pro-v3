import { db } from "./firebase";
import { ref, push, get, remove } from "firebase/database";

export const addCampaign = async (data) => {
  const campaignsRef = ref(db, "campaigns");
  return await push(campaignsRef, data);
};

export const getCampaigns = async (userEmail) => {
  const snapshot = await get(ref(db, "campaigns"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.keys(data)
    .map((key) => ({
      id: key,
      ...data[key]
    }))
    .filter((item) => item.user === userEmail);
};

export const deleteCampaign = async (id) => {
  return await remove(ref(db, `campaigns/${id}`));
};