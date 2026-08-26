import axios from "axios";

export async function publishPost(text) {
  const pageId = process.env.META_PAGE_ID;
  const token = process.env.META_TOKEN;



  const url = `https://graph.facebook.com/v19.0/${pageId}/feed`;

  const response = await axios.post(url, null, {
    params: {
      message: text,
      access_token: token,
    },
  });
console.log("POST META OK");

  return response.data;
}