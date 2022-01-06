import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDZg8JZviRHbwhpJsRyfTUCqHFpewnczDI",
  authDomain: "letsmove-f4378.firebaseapp.com",
  projectId: "letsmove-f4378",
  storageBucket: "letsmove-f4378.appspot.com",
  messagingSenderId: "908417939390",
  appId: "1:908417939390:web:f62a3ead08c00f255aabef"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const database = getDatabase(app)
const auth = getAuth()

export { provider,database,auth }