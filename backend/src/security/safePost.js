import axios from "axios";

export async function postToMeta(message) {
  try {
    return await axios.post(
      "https://graph.facebook.com/v19.0/me/feed",
      {
        message,
        access_token: process.env.META_TOKEN,
      }
    );
  } catch (err) {
    console.log("META ERROR:", err.response?.data || err.message);
  }
}