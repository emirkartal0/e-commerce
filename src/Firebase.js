import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC51TY-s8-hs7gUgsYmsa0FDqxpkZ11PFw",
  authDomain: "e-commerce-d5c3c.firebaseapp.com",
  projectId: "e-commerce-d5c3c",
  storageBucket: "e-commerce-d5c3c.appspot.com",
  messagingSenderId: "604382037014",
  appId: "1:604382037014:web:2d5ee2754ca1be50142137"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export default db;
export { auth, storage, provider }