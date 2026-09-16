import test from "node:test";
import assert from "node:assert/strict";
import { queryTikTokCreatorInfo } from "../services/connections/TikTokCreatorInfoService.js";

test("retorna somente opcoes seguras e atuais do criador TikTok", async () => {
  const httpClient = { async post(url, body, config) {
    assert.match(url, /creator_info\/query/);
    assert.equal(config.headers.Authorization, "Bearer token");
    return { data: { data: {
      creator_username: "creator",
      creator_nickname: "Conta Teste",
      privacy_level_options: ["FOLLOWER_OF_CREATOR", "SELF_ONLY"],
      comment_disabled: true,
      duet_disabled: true,
      stitch_disabled: false,
      max_video_post_duration_sec: 180,
    }, error: { code: "ok" } } };
  } };
  const result = await queryTikTokCreatorInfo({
    credential: JSON.stringify({ accessToken: "token", refreshToken: "refresh", openId: "open-1" }),
    httpClient,
  });
  assert.deepEqual(result.privacyLevelOptions, ["FOLLOWER_OF_CREATOR", "SELF_ONLY"]);
  assert.equal(result.commentDisabled, true);
  assert.equal(result.stitchDisabled, false);
  assert.equal(result.maxVideoPostDurationSec, 180);
  assert.equal("accessToken" in result, false);
});
