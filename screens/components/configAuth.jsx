//! FireBase a mettre dans app ?
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider,getAuth  } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq5rdA5vnOryouS5DCrtHozFybkfaq59Q",
  authDomain: "tendance-bccfa.firebaseapp.com",
  projectId: "tendance-bccfa",
  storageBucket: "tendance-bccfa.appspot.com",
  messagingSenderId: "201075651344",
  appId: "1:201075651344:web:117fa03026a349521a6b95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//! FireBase

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app); // a exporter ?