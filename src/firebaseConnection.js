import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
   apiKey: "AIzaSyCFwAfP0ctdQ7pgOzO8mElUZGMkJjDtJI0",
   authDomain: "curso-b0ce5.firebaseapp.com",
   projectId: "curso-b0ce5",
   storageBucket: "curso-b0ce5.appspot.com",
   messagingSenderId: "125104651580",
   appId: "1:125104651580:web:f6a3da8bd65473467db239",
   measurementId: "G-0B3XDC6QE3",
}

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth };
