import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

import {
  deactivateInstagramConnection,
  deleteInstagramConnectionData,
  verifyInstagramSignedRequest,
} from "../services/connections/InstagramDeauthorizationService.js";

function createSignedRequest(payload, secret) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");

  return `${signature}.${encodedPayload}`;
}

test("valida assinatura Meta e desativa somente a conexao Instagram correta", async () => {
  const secret = "instagram-secret-test";
  const signedRequest = createSignedRequest(
    { algorithm: "HMAC-SHA256", user_id: "ig-user-123" },
    secret
  );
  let receivedFilter;
  let receivedUpdate;

  const result = await deactivateInstagramConnection({
    signedRequest,
    appSecret: secret,
    connectionModel: {
      async updateMany(filter, update) {
        receivedFilter = filter;
        receivedUpdate = update;
        return { modifiedCount: 1 };
      },
    },
  });

  assert.deepEqual(receivedFilter, {
    provider: "instagram",
    destinationId: "ig-user-123",
    active: true,
  });
  assert.deepEqual(receivedUpdate, { $set: { active: false } });
  assert.equal(result.deactivatedCount, 1);
});

test("rejeita signed_request adulterado antes de acessar o banco", async () => {
  const secret = "instagram-secret-test";
  const signedRequest = createSignedRequest(
    { algorithm: "HMAC-SHA256", user_id: "ig-user-123" },
    secret
  );

  assert.throws(
    () => verifyInstagramSignedRequest(`${signedRequest}x`, secret),
    /Assinatura de desautorizacao invalida/
  );
});


test("exclui a conexao Instagram e retorna codigo de confirmacao", async () => {
  const secret = "instagram-secret-test";

  const signedRequest = createSignedRequest(
    {
      algorithm: "HMAC-SHA256",
      user_id: "ig-user-123",
    },
    secret
  );

  let receivedFilter;

  const result = await deleteInstagramConnectionData({
    signedRequest,
    appSecret: secret,
    confirmationCodeFactory: () => "confirmacao-123",
    connectionModel: {
      async deleteMany(filter) {
        receivedFilter = filter;
        return { deletedCount: 1 };
      },
    },
  });

  assert.deepEqual(receivedFilter, {
    provider: "instagram",
    destinationId: "ig-user-123",
  });

  assert.equal(result.deletedCount, 1);
  assert.equal(
    result.confirmationCode,
    "confirmacao-123"
  );
});
