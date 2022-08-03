// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDN2quhCeyg_sZ5ATc9J1giSPZEnpw0U6U",
   authDomain: "twitter-clone-f5962.firebaseapp.com",
   projectId: "twitter-clone-f5962",
   storageBucket: "twitter-clone-f5962.appspot.com",
   messagingSenderId: "320209005438",
   appId: "1:320209005438:web:005ba5cc91dd1217c7a12f",
   measurementId: "G-6Q9PDSXWWX",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFireStore();
const storage = getStorage();

export { app, db, storage };
