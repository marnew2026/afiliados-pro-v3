import crypto from "node:crypto";
import TuaiEvent from "../../models/TuaiEvent.js";
import TuaiProduct from "../../models/TuaiProduct.js";
import {
  duplicateWindowMs,
  metricIncrement,
  validateEventInput,
} from "./TuaiEventPolicy.js";

const safeEqual = (provided, expected) => {
  if (!provided || !expected) return false;
  const left = Buffer.from(String(provided));
  const right = Buffer.from(String(expected));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
};

const hashSession = (sessionId, secret) =>
  crypto.createHmac("sha256", secret).update(sessionId).digest("hex");

export function isTrustedEventRequest(request, env = process.env) {
  return safeEqual(request.get("x-tuai-event-secret"), env.TUAI_EVENT_SECRET);
}

export async function registerTuaiEvent(input, { trusted = false } = {}) {
  const validation = validateEventInput(input, { trusted });
  if (!validation.ok) {
    const error = new Error(validation.errors.join("; "));
    error.statusCode = 400;
    throw error;
  }

  const { event } = validation;
  const sessionSecret =
    process.env.TUAI_SESSION_HASH_SECRET || process.env.TUAI_EVENT_SECRET;
  if (!sessionSecret) {
    const error = new Error("Coleta Tuaí aguardando segredo do servidor");
    error.statusCode = 503;
    throw error;
  }
  const product = await TuaiProduct.findOne({ _id: event.productId, active: true })
    .select("_id")
    .lean();
  if (!product) {
    const error = new Error("Produto nao encontrado");
    error.statusCode = 404;
    throw error;
  }

  const sessionHash = hashSession(event.sessionId, sessionSecret);
  const windowMs = duplicateWindowMs(event.type);

  if (windowMs > 0) {
    const duplicate = await TuaiEvent.exists({
      productId: event.productId,
      type: event.type,
      sessionHash,
      createdAt: { $gte: new Date(Date.now() - windowMs) },
    });
    if (duplicate) return { accepted: false, duplicate: true };
  }

  await TuaiEvent.create({
    productId: event.productId,
    type: event.type,
    sessionHash,
    value: event.type === "conversion" ? event.value : 0,
    trusted,
    context: { source: event.source, placement: event.placement },
  });

  await TuaiProduct.updateOne(
    { _id: event.productId },
    {
      $inc: metricIncrement(event.type, event.value),
      $set: { "metrics.lastEventAt": new Date() },
    }
  );

  return { accepted: true, duplicate: false };
}
