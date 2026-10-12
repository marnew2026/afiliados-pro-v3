import crypto from "node:crypto";
import TuaiProduct from "../../models/TuaiProduct.js";
import {
  resolveMercadoLivreProduct,
  validateProductLink,
} from "../campaigns/MercadoLivreProductResolver.js";

export async function inspectAffiliateProduct(
  affiliateUrl,
  { resolver = resolveMercadoLivreProduct } = {}
) {
  const originalUrl = validateProductLink(affiliateUrl).href;
  const resolved = await resolver({ link: originalUrl });
  const title = String(resolved?.title || "").trim();
  const imageUrl = String(resolved?.images?.[0] || "").trim();
  if (!title || !imageUrl) {
    throw Object.assign(new Error("Nao foi possivel identificar titulo e imagem do produto"), {
      statusCode: 422,
    });
  }
  const stableId = String(resolved.itemId || "").trim() ||
    `affiliate-${crypto.createHash("sha256").update(originalUrl).digest("hex").slice(0, 24)}`;
  return {
    title: title.slice(0, 180),
    description: "",
    imageUrl,
    category: "geral",
    sourcePlatform: "mercado_livre",
    sourceProductId: stableId,
    affiliateUrl: originalUrl,
    price: null,
    currency: "BRL",
    trustScore: 70,
  };
}

export async function importAffiliateProduct(affiliateUrl, options = {}) {
  const inspected = await inspectAffiliateProduct(affiliateUrl, options);
  return TuaiProduct.findOneAndUpdate(
    { sourcePlatform: inspected.sourcePlatform, sourceProductId: inspected.sourceProductId },
    { $set: { ...inspected, active: true } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  ).lean();
}
