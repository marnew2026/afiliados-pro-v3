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
console.log(
  "TOKEN INICIO:",
  process.env.META_TOKEN?.substring(0, 15)
);
console.log(
  "TOKEN FIM:",
  process.env.META_TOKEN?.substring(process.env.META_TOKEN.length - 15)
);
  console.log("POST OK:", response.data);

  return response.data;
}