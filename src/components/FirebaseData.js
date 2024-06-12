import { firebaseConfig } from "./Firebase-config.jsx";
import storage from'firebase/storage';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebase = initializeApp(firebaseConfig);


const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore };
