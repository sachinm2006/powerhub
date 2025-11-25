/*
  Firebase init file (compat SDK expected)
  Replace the values in firebaseConfig with your Firebase project's settings
  Enable Email/Password and Phone sign-in providers in the Firebase Console

  Note: This project uses the compat CDN scripts in login.html so this file can call `firebase.auth()` directly.
*/

// Example placeholder - REPLACE with your project's real values
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJKZHxl9oC621mvFNc4p8mk4Xxg6oDmnQ",
  authDomain: "powerhub-6206c.firebaseapp.com",
  projectId: "powerhub-6206c",
  storageBucket: "powerhub-6206c.firebasestorage.app",
  messagingSenderId: "766142476352",
  appId: "1:766142476352:web:d7d333aad2f94630eaefa5",
  measurementId: "G-YRYQNC5FG5"
};

// Initialize Firebase if available
try{
  if(typeof firebase !== 'undefined' && typeof firebase.initializeApp === 'function'){
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized — replace placeholders in firebase-config.js with your config');
  }else{
    console.warn('Firebase SDK not available. Make sure to include it on the page.');
  }
}catch(e){console.error('Firebase init error',e)}
