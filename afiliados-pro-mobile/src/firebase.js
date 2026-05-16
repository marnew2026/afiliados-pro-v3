import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpN43wG6Y_EbyPRNL8h_DqnBvEq6Flc0s",
  authDomain: "afiliados-pro-v3.firebaseapp.com",
  projectId:  "afiliados-pro-v3.firebasestorage.app",
  storageBucket: "afiliados-pro-v3.firebasestorage.app",
  messagingSenderId: "219554193987",
  appId: "1:219554193987:web:160e1967808c9e7635aaf6",
  measurementId: "G-8ZXRDN9ERB"
};
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app;