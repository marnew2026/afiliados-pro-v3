import stripe from "./stripe.js";

export async function processPayout(user, amount) {
  return await stripe.transfers.create({
    amount: Math.floor(amount * 100),
    currency: "brl",
    destination: user.stripeAccountId,
  });
}