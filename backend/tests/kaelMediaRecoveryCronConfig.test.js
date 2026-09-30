import test from "node:test";
import assert from "node:assert/strict";

import {
  isKaelMediaRecoveryCronEnabled,
} from "../services/media/generation/KaelMediaRecoveryCronConfig.js";

test("KAEL media recovery cron ativa somente com true explicito", () => {
  assert.equal(
    isKaelMediaRecoveryCronEnabled({
      configuredValue: "true",
    }),
    true
  );
});

test("KAEL media recovery cron permanece desligado por padrao", () => {
  assert.equal(
    isKaelMediaRecoveryCronEnabled({
      configuredValue: undefined,
    }),
    false
  );

  assert.equal(
    isKaelMediaRecoveryCronEnabled({
      configuredValue: "false",
    }),
    false
  );

  assert.equal(
    isKaelMediaRecoveryCronEnabled({
      configuredValue: "TRUE",
    }),
    false
  );
});
