import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { ReactNativeAsyncStorage } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs9WnU2Izg3shuoGD7NLoYk_bTWqztN-k",
  authDomain: "hello-f65d2.firebaseapp.com",
  projectId: "hello-f65d2",
  storageBucket: "hello-f65d2.appspot.com",
  messagingSenderId: "62360449736",
  appId: "1:62360449736:web:d36d269ecadab7eaa56bfd",
  measurementId: "G-XQRXL89GGW"
};


 const appp = initializeApp(firebaseConfig); 
 export const authicaton= getAuth(appp);
 export const database = getDatabase(appp);
 export const firestore = getFirestore(appp);