import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createSubscription(customerId, plan) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: plan.priceId }]
  });
}