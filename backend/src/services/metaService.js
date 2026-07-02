import axios from "axios";

export async function postToMeta(message) {
  try {
    const res = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.META_PAGE_ID}/feed`,
      {
        message,
        access_token: process.env.META_TOKEN
      }
    );

    console.log("✅ POST OK:", res.data.id);
  } catch (err) {
    console.error("❌ META ERROR:", err.response?.data || err.message);
  }
}