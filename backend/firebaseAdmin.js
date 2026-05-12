import admin from "firebase-admin";

/**
 * Firebase Admin inicializado via ENV (PRODUÇÃO)
 * Não usa arquivo serviceAccountKey.json
 */

let firebaseApp;

const initFirebaseAdmin = () => {
  if (firebaseApp) return firebaseApp;

  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT não configurado no ambiente");
  }

  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
  );

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("🔥 Firebase Admin inicializado");

  return firebaseApp;
};

initFirebaseAdmin();

export default admin;