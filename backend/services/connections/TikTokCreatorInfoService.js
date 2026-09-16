import axios from "axios";
import { parseTikTokCredential } from "./TikTokConnectionService.js";

export async function queryTikTokCreatorInfo({
  credential,
  httpClient = axios,
  apiBaseUrl = "https://open.tiktokapis.com",
}) {
  const parsed = parseTikTokCredential(credential);
  let response;
  try {
    response = await httpClient.post(
      `${String(apiBaseUrl).replace(/\/+$/, "")}/v2/post/publish/creator_info/query/`,
      {},
      { headers: { Authorization: `Bearer ${parsed.accessToken}`, "Content-Type": "application/json; charset=UTF-8" }, timeout: 15000 }
    );
  } catch (error) {
    const status = Number(error?.response?.status || 0);
    const code = String(error?.response?.data?.error?.code || "unknown");
    throw new Error(`TikTok creator info: HTTP ${status || "network"}, code ${code}.`);
  }
  const code = String(response?.data?.error?.code || "ok");
  if (code !== "ok") throw new Error(`TikTok creator info: code ${code}.`);
  const data = response?.data?.data || {};
  return {
    username: String(data.creator_username || ""),
    nickname: String(data.creator_nickname || "Conta TikTok"),
    privacyLevelOptions: Array.isArray(data.privacy_level_options) ? data.privacy_level_options.map(String) : [],
    commentDisabled: data.comment_disabled === true,
    duetDisabled: data.duet_disabled === true,
    stitchDisabled: data.stitch_disabled === true,
    maxVideoPostDurationSec: Number(data.max_video_post_duration_sec || 0),
  };
}
