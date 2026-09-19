const CHECKOUT_PURPOSE = "pro_subscription";

function required(value, name) {
  if (!value) throw new Error(`Configuracao ausente: ${name}`);
  return value;
}

export function buildProCheckoutSession({ user, priceId, baseUrl }) {
  const userId = user?._id?.toString?.() || String(user?._id || "");
  const email = String(user?.email || "").trim().toLowerCase();

  required(userId, "usuario autenticado");
  required(email, "email do usuario");
  required(priceId, "STRIPE_PRICE_ID");
  required(baseUrl, "BASE_URL");

  const metadata = {
    userId,
    purpose: CHECKOUT_PURPOSE,
  };

  return {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    client_reference_id: userId,
    metadata,
    subscription_data: { metadata },
    success_url: `${baseUrl.replace(/\/$/, "")}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl.replace(/\/$/, "")}/cancel`,
  };
}

function eventUserId(object) {
  return object?.metadata?.userId || object?.client_reference_id || null;
}

export async function applyStripeSubscriptionEvent({ event, UserModel, now = new Date() }) {
  const object = event?.data?.object;

  if (!event?.id || !event?.type || !object) {
    throw new Error("Evento Stripe invalido");
  }

  if (event.type === "checkout.session.completed") {
    const userId = eventUserId(object);
    if (!userId || object.metadata?.purpose !== CHECKOUT_PURPOSE) {
      throw new Error("Checkout sem vinculo seguro com o usuario");
    }

    const updated = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        stripeLastCheckoutSessionId: { $ne: object.id },
      },
      {
        $set: {
          isPro: true,
          plan: "PRO",
          accessSource: "STRIPE",
          proAccessEndsAt: null,
          stripeCustomerId: object.customer || null,
          stripeSubscriptionId: object.subscription || null,
          stripeSubscriptionStatus: "active",
          stripeLastCheckoutSessionId: object.id,
          stripeLastEventId: event.id,
          status: "done",
          lastProcessedAt: now,
        },
      },
      { new: true }
    );

    if (updated) return { action: "activated", userId };

    const existing = await UserModel.findById(userId);
    if (!existing) throw new Error("Usuario do checkout nao encontrado");
    if (existing.stripeLastCheckoutSessionId === object.id) {
      return { action: "duplicate", userId };
    }
    throw new Error("Checkout nao aplicado");
  }

  if (event.type === "customer.subscription.deleted") {
    const userId = eventUserId(object);
    if (!userId) throw new Error("Assinatura sem vinculo seguro com o usuario");

    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        accessSource: "STRIPE",
        stripeSubscriptionId: object.id,
      },
      {
        $set: {
          isPro: false,
          plan: "FREE",
          accessSource: "FREE",
          proAccessEndsAt: null,
          stripeSubscriptionStatus: "canceled",
          stripeLastEventId: event.id,
          lastProcessedAt: now,
        },
      },
      { new: true }
    );

    return { action: "canceled", userId };
  }

  if (event.type === "invoice.payment_failed") {
    const subscriptionId =
      typeof object.subscription === "string"
        ? object.subscription
        : object.subscription?.id;

    if (subscriptionId) {
      await UserModel.findOneAndUpdate(
        { stripeSubscriptionId: subscriptionId, accessSource: "STRIPE" },
        {
          $set: {
            stripeSubscriptionStatus: "past_due",
            stripeLastEventId: event.id,
            lastProcessedAt: now,
          },
        },
        { new: true }
      );
    }

    return { action: "payment_failed" };
  }

  return { action: "ignored" };
}
