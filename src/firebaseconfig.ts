// src/routes.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaUDBuMxzg9ouweRrNCc03xAlde54HIvc",
  authDomain: "todo-app-4ed47.firebaseapp.com",
  projectId: "todo-app-4ed47",
  storageBucket: "todo-app-4ed47.appspot.com",
  messagingSenderId: "997421881968",
  appId: "1:997421881968:web:6c54a7638e128b850332b5",
  measurementId: "G-S3BJXRHPQP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
