import test from "node:test";
import assert from "node:assert/strict";
import { listFacebookReviewOptions } from "../services/distribution/FacebookReviewOptionsService.js";

function query(result) {
  return {
    select() { return this; },
    sort() { return this; },
    lean() { return Promise.resolve(result); },
  };
}

test("lista somente videos prontos do usuario e informa a conexao Facebook", async () => {
  const result = await listFacebookReviewOptions({
    userId: "user-1",
    connectionModel: {
      findOne(filter) {
        assert.deepEqual(filter, {
          userId: "user-1",
          provider: "facebook",
          active: true,
        });
        return query({ destinationName: "creator", connectedAt: new Date(0) });
      },
    },
    campaignModel: {
      find(filter) {
        assert.deepEqual(filter, { userId: "user-1", active: true });
        return query([{ _id: "campaign-1", nome: "Oferta" }]);
      },
    },
    mediaAssetModel: {
      find(filter) {
        assert.deepEqual(filter, {
          userId: "user-1",
          type: "video",
          status: "ready",
        });
        return query([
          { _id: "asset-1", campaignId: "campaign-1", createdAt: new Date(0) },
          { _id: "asset-2", campaignId: "other", createdAt: new Date(0) },
        ]);
      },
    },
  });

  assert.equal(result.connected, true);
  assert.equal(result.connection.destinationName, "creator");
  assert.deepEqual(result.options.map((item) => item.mediaAssetId), ["asset-1"]);
});
