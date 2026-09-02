import {
  R2StorageProvider,
} from "./R2StorageProvider.js";

export function createR2StorageProvider() {
  const bucket = String(
    process.env.R2_BUCKET || ""
  ).trim();

  const publicBaseUrl = String(
    process.env.R2_PUBLIC_BASE_URL || ""
  ).trim();

  const endpoint = String(
    process.env.R2_ENDPOINT || ""
  ).trim();

  const accessKeyId = String(
    process.env.R2_ACCESS_KEY_ID || ""
  ).trim();

  const secretAccessKey = String(
    process.env.R2_SECRET_ACCESS_KEY || ""
  ).trim();

  return new R2StorageProvider({
    bucket,
    publicBaseUrl,
    endpoint,
    accessKeyId,
    secretAccessKey,
  });
}
