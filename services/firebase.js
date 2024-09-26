import React from 'react';
import * as firebase from firebase;
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
const analytics = getAnalytics(app);

export default firebase;