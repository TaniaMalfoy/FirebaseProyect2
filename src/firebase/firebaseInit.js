import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FieldValue, getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  // Config Proyect
  };

  // Initialize Firebase / Auth / Firestore
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);


//https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
//const timestamp = FieldValue.serverTimestamp();

// Colletion reference
//const colRef = collection(db,'Post');

export { auth, db, firebaseApp, storage }
