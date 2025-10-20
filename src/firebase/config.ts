import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIV4WWqWle4GX8JGGf-TI7tbsp5CbLvvU",
  authDomain: "ustatop-uz.firebaseapp.com",
  projectId: "ustatop-uz",
  storageBucket: "ustatop-uz.firebasestorage.app",
  messagingSenderId: "87197808851",
  appId: "1:87197808851:web:bd9786c8b2ae85f16f3c26",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
