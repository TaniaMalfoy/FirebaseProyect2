import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FieldValue, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
//firebase Proyect configuration
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
