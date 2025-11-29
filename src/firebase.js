import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEvWfbpEqpuNh-ZWowN3fNOz0Hkh_q3lU",
  authDomain: "capstone-project-1fa1a.firebaseapp.com",
  projectId: "capstone-project-1fa1a",
  storageBucket: "capstone-project-1fa1a.firebasestorage.app",
  messagingSenderId: "881810351030",
  appId: "1:881810351030:web:12201360afc92726a4d717"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

// Add these export statements
export { app, firestore, auth };