import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
export const environment={
    production: false,
    firebaseConfig : {
      apiKey: "AIzaSyBus6sVtC-PldZjkqZBV1C0375iraa18zk",
      authDomain: "feedstoryapp-25fc5.firebaseapp.com",
      projectId: "feedstoryapp-25fc5",
      storageBucket: "feedstoryapp-25fc5.appspot.com",
      messagingSenderId: "180671224272",
      appId: "1:180671224272:web:0a747cd2c3c33dd784c1d5",
      measurementId: "G-6CWL99YNBN"
      }
}

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app)



export const baseUrl = "https://feedstoryapp-default-rtdb.firebaseio.com/"
