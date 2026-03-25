import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8IOk98T5KHEqJnf9-T03jqK_aGQzPy3E",
  authDomain: "cp-4-mobile.firebaseapp.com",
  projectId: "cp-4-mobile",
  storageBucket: "cp-4-mobile.firebasestorage.app",
  messagingSenderId: "328484162239",
  appId: "1:328484162239:web:6e5262e6a1fb13d2b2940a",
  measurementId: "G-8XCMC9MQC5"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
