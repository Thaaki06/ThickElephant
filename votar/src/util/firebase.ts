import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDfqXlDnv538083vWJzELdmtp87Xh_Eou0",
    authDomain: "election-aeee0.firebaseapp.com",
    projectId: "election-aeee0",
    storageBucket: "election-aeee0.appspot.com",
    messagingSenderId: "204942425737",
    appId: "1:204942425737:web:39e854d4d822fd1b385058",
    measurementId: "G-MKXB5T7XJZ"
  };


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }