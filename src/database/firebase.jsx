// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXTV72lkHxKTi2wWP2w76zwWBDDrANEbg",
  authDomain: "docskripsi.firebaseapp.com",
  projectId: "docskripsi",
  storageBucket: "docskripsi.appspot.com",
  messagingSenderId: "312725897297",
  appId: "1:312725897297:web:22db23bca57169c8afb870",
  measurementId: "G-6ZSQPQVMQS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);