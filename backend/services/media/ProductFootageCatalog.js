import { readFile, realpath, stat } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";

// Acervo administrado pelo operador; nunca aceita caminhos enviados pelo usuario.
export async function findProductFootage({ product, root = process.env.KAEL_PRODUCT_FOOTAGE_DIR, now = new Date() }) {
  if (!root) return null;
  const directory = await realpath(root);
  const manifest = JSON.parse(await readFile(resolve(directory, "catalog.json"), "utf8"));
  if (manifest.version !== 1 || !Array.isArray(manifest.entries)) throw new Error("Acervo de videos invalido.");
  const entry = manifest.entries.find(item => item.provider === product.provider && item.itemId === product.itemId &&
    item.active === true && item.rights?.editing === true && item.rights?.socialPublishing === true &&
    String(item.rights?.evidence || "").trim() && Number.isFinite(Date.parse(item.rights?.expiresAt)) &&
    Date.parse(item.rights.expiresAt) > now.getTime());
  if (!entry) return null;
  if (!Array.isArray(entry.files) || !entry.files.length || entry.files.length > 4) throw new Error("Filmagens do produto invalidas.");
  const files = [];
  for (const file of entry.files) {
    if (typeof file !== "string" || isAbsolute(file) || !/\.mp4$/i.test(file)) throw new Error("Arquivo do acervo invalido.");
    const path = await realpath(resolve(directory, file));
    const local = relative(directory, path);
    if (local.startsWith("..") || isAbsolute(local)) throw new Error("Arquivo fora do acervo.");
    const info = await stat(path);
    if (!info.isFile() || info.size === 0 || info.size > 100 * 1024 * 1024) throw new Error("Filmagem fora do limite permitido.");
    files.push(path);
  }
  return { files, evidence: entry.rights.evidence };
}
