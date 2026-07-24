import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRjTlheTROnG4k_jSfheZVl4nvnGS-u4Y",
  authDomain: "nivoxhub.firebaseapp.com",
  projectId: "nivoxhub",
  storageBucket: "nivoxhub.firebasestorage.app",
  messagingSenderId: "328822906864",
  appId: "1:328822906864:web:3d3a1a05b280c509880735",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
