// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5nQcBjbw_MTBWqeTs_OKG-eAc6QmCBSU",
  authDomain: "alap-42677.firebaseapp.com",
  projectId: "alap-42677",
  storageBucket: "alap-42677.appspot.com",
  messagingSenderId: "172614996681",
  appId: "1:172614996681:web:facf8e1b21987e9a93b318",
  measurementId: "G-B12J3XZQJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;