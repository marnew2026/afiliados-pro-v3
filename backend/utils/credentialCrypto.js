import crypto from "crypto";

const PREFIX = "enc:v1:";

function getEncryptionKey() {
  const rawKey =
    process.env.CHANNEL_CREDENTIAL_KEY || "";

  if (!/^[a-fA-F0-9]{64}$/.test(rawKey)) {
    throw new Error(
      "CHANNEL_CREDENTIAL_KEY ausente ou inválida."
    );
  }

  return Buffer.from(rawKey, "hex");
}

export function encryptCredential(value) {
  const plainText = String(value || "");

  if (!plainText) {
    throw new Error(
      "Credencial vazia não pode ser criptografada."
    );
  }

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    key,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

    return `${PREFIX}${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptCredential(value) {
  const storedValue = String(value || "");

  if (!storedValue) {
    throw new Error("Credencial vazia.");
  }

  // Compatibilidade temporária com conexões antigas,
  // que foram gravadas antes da criptografia.
  if (!storedValue.startsWith(PREFIX)) {
    return storedValue;
  }

  const payload = storedValue.slice(PREFIX.length);

  const parts = payload.split(":");

  if (parts.length !== 3) {
    throw new Error(
      "Formato de credencial criptografada inválido."
    );
  }

  const [ivBase64, authTagBase64, encryptedBase64] =
    parts;

  const key = getEncryptionKey();

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(ivBase64, "base64")
  );

  decipher.setAuthTag(
    Buffer.from(authTagBase64, "base64")
  );

  const decrypted = Buffer.concat([
    decipher.update(
      Buffer.from(encryptedBase64, "base64")
    ),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}