// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApJUIEv4uums1qIDGD5HMUauj4S-mTTQc",
  authDomain: "react-basic-ce77b.firebaseapp.com",
  projectId: "react-basic-ce77b",
  storageBucket: "react-basic-ce77b.appspot.com",
  messagingSenderId: "1017073059334",
  appId: "1:1017073059334:web:44c8ebdd625b18cefda587"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);

