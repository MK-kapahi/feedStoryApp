import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
export const environment={
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyAkdqEwAzjlgxu9jb0rI8vW5Y2-tW6gp1s",
        authDomain: "feedstoryapp.firebaseapp.com",
        projectId: "feedstoryapp",
        storageBucket: "feedstoryapp.appspot.com",
        messagingSenderId: "895380207026",
        appId: "1:895380207026:web:119a7c8d21f26646c0a0ab",
        measurementId: "G-NYKB9WVLH9"
      }
}

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)



export const baseUrl = "https://feedstoryapp-default-rtdb.firebaseio.com/"
