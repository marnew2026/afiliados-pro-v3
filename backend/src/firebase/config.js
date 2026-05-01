import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpN43wG6Y_EbyPRNL8h_DqnBvEq6Flc0s",
  authDomain: "afiliados-pro-v3.firebaseapp.com",
  databaseURL: "https://afiliados-pro-v3-default-rtdb.firebaseio.com",
  projectId: "afiliados-pro-v3",
  storageBucket: "afiliados-pro-v3.appspot.com",
  messagingSenderId: "219554193987",
  appId: "1:219554193987:web:7f3ec088d2dc6fc035aaf6",
  measurementId: "G-Q0N2LSB5QN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// analytics (opcional)
export const analytics = getAnalytics(app);