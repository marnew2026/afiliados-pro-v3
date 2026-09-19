import test from "node:test";
import assert from "node:assert/strict";

import {
  requireSelfBody,
  requireSelfParam,
} from "../middlewares/userOwnershipMiddleware.js";

function responseRecorder() {
  return {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function run(middleware, req) {
  const res = responseRecorder();
  let called = false;
  middleware(req, res, () => { called = true; });
  return { res, called };
}

test("permite consultar somente o proprio id informado na URL", () => {
  const allowed = run(requireSelfParam(), {
    user: { _id: "user-1" },
    params: { userId: "user-1" },
  });
  const blocked = run(requireSelfParam(), {
    user: { _id: "user-1" },
    params: { userId: "user-2" },
  });

  assert.equal(allowed.called, true);
  assert.equal(blocked.called, false);
  assert.equal(blocked.res.statusCode, 403);
});

test("permite criar operacao somente para o proprio id no corpo", () => {
  const allowed = run(requireSelfBody(), {
    user: { _id: "user-1" },
    body: { userId: "user-1" },
  });
  const blocked = run(requireSelfBody(), {
    user: { _id: "user-1" },
    body: { userId: "user-2" },
  });

  assert.equal(allowed.called, true);
  assert.equal(blocked.called, false);
  assert.equal(blocked.res.statusCode, 403);
});
