import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqKlWvTNQrP2reWNUhT1sVqa3x8ERE_pI",
  authDomain: "jobtracker-bd571.firebaseapp.com",
  projectId: "jobtracker-bd571",
  storageBucket: "jobtracker-bd571.firebasestorage.app",
  messagingSenderId: "953715415272",
  appId: "1:953715415272:web:75231e724d180b58f6115d",
  measurementId: "G-L8LD37X12N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};