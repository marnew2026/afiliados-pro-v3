import test from "node:test";
import assert from "node:assert/strict";
import { listTikTokReviewOptions } from "../services/distribution/TikTokReviewOptionsService.js";

function query(value) {
  return { select() { return this; }, sort() { return this; }, async lean() { return value; } };
}

test("lista apenas videos prontos de campanhas ativas do usuario", async () => {
  const result = await listTikTokReviewOptions({
    userId: "user-1",
    connectionModel: { findOne() { return query({ destinationName: "Conta Teste", connectedAt: new Date() }); } },
    campaignModel: { find() { return query([{ _id: "campaign-1", nome: "Oferta segura" }]); } },
    mediaAssetModel: { find(filter) {
      assert.deepEqual(filter, { userId: "user-1", type: "video", status: "ready" });
      return query([{ _id: "asset-1", campaignId: "campaign-1", createdAt: new Date() }, { _id: "asset-2", campaignId: "inactive", createdAt: new Date() }]);
    } },
  });
  assert.equal(result.connected, true);
  assert.equal(result.connection.destinationName, "Conta Teste");
  assert.deepEqual(result.options.map(({ campaignId, mediaAssetId, campaignName }) => ({ campaignId, mediaAssetId, campaignName })), [
    { campaignId: "campaign-1", mediaAssetId: "asset-1", campaignName: "Oferta segura" },
  ]);
});
