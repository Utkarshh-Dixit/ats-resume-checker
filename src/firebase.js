import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const firebaseConfig = {
  apiKey: "AIzaSyCgTFZZ3HFuLY_cYBa6Jk-sFcjfEQu0RAk",
  authDomain: "unified-fa415.firebaseapp.com",
  projectId: "unified-fa415",
  storageBucket: "unified-fa415.appspot.com",
  messagingSenderId: "942170810009",
  appId: "1:942170810009:web:f6dac8830df4342539ba08",
  measurementId: "G-2841TFCXVY",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const Provider = new GoogleAuthProvider();

export { db, auth, Provider };
