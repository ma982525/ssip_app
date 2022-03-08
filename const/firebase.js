import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { ReactNativeAsyncStorage } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA7HKrZGRNDoZyCTnKWnFt5O5H_ZR3cTc",
  authDomain: "testdb-2f319.firebaseapp.com",
  databaseURL: "https://testdb-2f319-default-rtdb.firebaseio.com",
  projectId: "testdb-2f319",
  storageBucket: "testdb-2f319.appspot.com",
  messagingSenderId: "859421121302",
  appId: "1:859421121302:web:67e815d2768fde78f60e37",
  measurementId: "G-VK8KTK6CW0"
};
 const appp = initializeApp(firebaseConfig); 
 export const database = getDatabase(appp); 
 export const authicaton= getAuth(appp);
 export const firestore = getFirestore(appp);