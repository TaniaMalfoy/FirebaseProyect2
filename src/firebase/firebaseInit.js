import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FieldValue, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBQdSClUOPCMIL5nCf8ShG-mNTZCU3IUnA",
    authDomain: "docu-blog-frb.firebaseapp.com",
    projectId: "docu-blog-frb",
    storageBucket: "docu-blog-frb.appspot.com",
    messagingSenderId: "895747541706",
    appId: "1:895747541706:web:0143dd51d20b6e194c8233",
    measurementId: "G-8MCGBKRYJ3"
  };

  // Initialize Firebase / Auth / Firestore
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

//https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
//const timestamp = FieldValue.serverTimestamp();

// Colletion reference
//const colRef = collection(db,'Post');

export  { auth, db, firebaseApp }