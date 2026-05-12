import admin from "firebase-admin";

const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;

if (!base64) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_B64 não configurado no ambiente");
}

const serviceAccount = JSON.parse(
  Buffer.from(base64, "base64").toString("utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;