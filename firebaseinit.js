// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1J2AAgb4IvIBHSO4EsGfRCdb5PLrAiYg",
  authDomain: "make-it-a2928.firebaseapp.com",
  projectId: "make-it-a2928",
  storageBucket: "make-it-a2928.appspot.com",
  messagingSenderId: "35087997569",
  appId: "1:35087997569:web:87151e5c5776ff740b0b80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export default db;
