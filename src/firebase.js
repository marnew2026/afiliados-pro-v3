import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpN43wG6Y_EbyPRNL8h_DqnBvEq6Flc0s",
  authDomain: "afiliados-pro-v3.firebaseapp.com",
  databaseURL: "https://afiliados-pro-v3-default-rtdb.firebaseio.com",
  projectId: "afiliados-pro-v3",
  storageBucket: "afiliados-pro-v3.firebasestorage.app",
  messagingSenderId: "219554193987",
  appId: "1:219554193987:web:160e1967808c9e7635aaf6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);