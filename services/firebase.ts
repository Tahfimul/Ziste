import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics'; // Keep this line
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyABNxS3MslHrEifIeFnJLVsDBQRAGL_s1w",
  authDomain: "zistechat.firebaseapp.com",
  projectId: "zistechat",
  storageBucket: "zistechat.appspot.com",
  messagingSenderId: "156729666335",
  appId: "1:156729666335:web:975870572398f45eb15e2a",
  measurementId: "G-23KX419485"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const db = getFirestore(app);
const firebaseAuth = getAuth(app);

export { app, db, analytics, firebaseAuth };