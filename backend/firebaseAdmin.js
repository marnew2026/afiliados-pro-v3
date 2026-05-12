import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;