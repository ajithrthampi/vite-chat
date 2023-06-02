import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAQHxRYkgu21hJjuKT8E2W4q5blUvRqPkw",
  authDomain: "vite-chat-730ce.firebaseapp.com",
  projectId: "vite-chat-730ce",
  storageBucket: "vite-chat-730ce.appspot.com",
  messagingSenderId: "70604548527",
  appId: "1:70604548527:web:df0493af40d98165aa275a"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()