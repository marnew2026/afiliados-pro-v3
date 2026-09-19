import test from "node:test";
import assert from "node:assert/strict";

import {
  applyStripeSubscriptionEvent,
  buildProCheckoutSession,
} from "../services/billing/StripeSubscriptionService.js";

test("checkout usa somente identidade do usuario autenticado", () => {
  const params = buildProCheckoutSession({
    user: { _id: "user-123", email: "Pessoa@Exemplo.com" },
    priceId: "price_pro",
    baseUrl: "https://app.exemplo.com/",
  });

  assert.equal(params.customer_email, "pessoa@exemplo.com");
  assert.equal(params.client_reference_id, "user-123");
  assert.deepEqual(params.metadata, {
    userId: "user-123",
    purpose: "pro_subscription",
  });
  assert.deepEqual(params.subscription_data.metadata, params.metadata);
  assert.match(params.success_url, /CHECKOUT_SESSION_ID/);
});

test("checkout concluido ativa exatamente o usuario dos metadados", async () => {
  let filter;
  let update;
  const UserModel = {
    async findOneAndUpdate(receivedFilter, receivedUpdate) {
      filter = receivedFilter;
      update = receivedUpdate;
      return { _id: "user-123" };
    },
  };

  const result = await applyStripeSubscriptionEvent({
    event: {
      id: "evt_1",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_1",
          customer: "cus_1",
          subscription: "sub_1",
          metadata: { userId: "user-123", purpose: "pro_subscription" },
        },
      },
    },
    UserModel,
  });

  assert.equal(result.action, "activated");
  assert.equal(filter._id, "user-123");
  assert.deepEqual(filter.stripeLastCheckoutSessionId, { $ne: "cs_1" });
  assert.equal(update.$set.accessSource, "STRIPE");
  assert.equal(update.$set.stripeSubscriptionId, "sub_1");
});

test("evento repetido do mesmo checkout nao concede acesso novamente", async () => {
  let updates = 0;
  const UserModel = {
    async findOneAndUpdate() {
      updates += 1;
      return null;
    },
    async findById() {
      return { stripeLastCheckoutSessionId: "cs_duplicada" };
    },
  };

  const result = await applyStripeSubscriptionEvent({
    event: {
      id: "evt_repetido",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_duplicada",
          metadata: { userId: "user-123", purpose: "pro_subscription" },
        },
      },
    },
    UserModel,
  });

  assert.equal(updates, 1);
  assert.equal(result.action, "duplicate");
});

test("checkout sem userId seguro e recusado", async () => {
  await assert.rejects(
    applyStripeSubscriptionEvent({
      event: {
        id: "evt_inseguro",
        type: "checkout.session.completed",
        data: { object: { id: "cs_insegura", customer_email: "alvo@exemplo.com" } },
      },
      UserModel: {},
    }),
    /sem vinculo seguro/
  );
});

test("cancelamento remove apenas acesso Stripe da assinatura correspondente", async () => {
  let filter;
  let update;
  const UserModel = {
    async findOneAndUpdate(receivedFilter, receivedUpdate) {
      filter = receivedFilter;
      update = receivedUpdate;
      return { _id: "user-123" };
    },
  };

  await applyStripeSubscriptionEvent({
    event: {
      id: "evt_cancel",
      type: "customer.subscription.deleted",
      data: {
        object: { id: "sub_1", metadata: { userId: "user-123" } },
      },
    },
    UserModel,
  });

  assert.deepEqual(filter, {
    _id: "user-123",
    accessSource: "STRIPE",
    stripeSubscriptionId: "sub_1",
  });
  assert.equal(update.$set.plan, "FREE");
  assert.equal(update.$set.stripeSubscriptionStatus, "canceled");
});
