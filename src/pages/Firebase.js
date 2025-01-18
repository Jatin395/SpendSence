import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC5-DYR514IP7BxPjMWiZuD43-95_85SDw",
  authDomain: "spendsense-d25ba.firebaseapp.com",
  projectId: "spendsense-d25ba",
  storageBucket: "spendsense-d25ba.firebasestorage.app",
  messagingSenderId: "762402797863",
  appId: "1:762402797863:web:fc42ba388786b7aa619102"
};

const app = initializeApp(firebaseConfig);
const MyDB = getFirestore(app);
const Auth = getAuth(app);

export  { Auth,MyDB };