import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACvARdX_5t5z-NdqJuf5C7y_NuvtMdUQw",
  authDomain: "todo-f92f9.firebaseapp.com",
  projectId: "todo-f92f9",
  storageBucket: "todo-f92f9.appspot.com",
  messagingSenderId: "639063530366",
  appId: "1:639063530366:web:b96fc48f959b733a87f12f",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
