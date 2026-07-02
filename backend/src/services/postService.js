import axios from "axios";

export async function postToMeta(payload) {
  try {
    const res = await axios.post(
      "https://graph.facebook.com/v20.0/me/feed",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.META_TOKEN}`
        }
      }
    );

    return res.data;

  } catch (err) {
    console.log("❌ META ERROR:", err.response?.data);
    return null;
  }
}