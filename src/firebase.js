// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4G_kLA1oHVIMRKI8q5HBz8FHzkrSV8DE",
  authDomain: "tethered-26cf6.firebaseapp.com",
  projectId: "tethered-26cf6",
  storageBucket: "tethered-26cf6.appspot.com",
  messagingSenderId: "77491772655",
  appId: "1:77491772655:web:5c316cb6f719ece0e1cf1a",
  measurementId: "G-9W0LM18N40"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider, storage};
export default db;