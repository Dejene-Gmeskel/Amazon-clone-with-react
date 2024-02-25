// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_cy4vu66Fg8QnJ0rCWqGgS_1LAFh-k-c",
  authDomain: "clone-765c6.firebaseapp.com",
  projectId: "clone-765c6",
  storageBucket: "clone-765c6.appspot.com",
  messagingSenderId: "540331092347",
  appId: "1:540331092347:web:0d7ab9909a99a6ca74f5de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
// export const db = app.firestore()