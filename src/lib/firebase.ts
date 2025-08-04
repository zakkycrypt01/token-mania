// @ts-nocheck
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "meme-token-mania",
  "appId": "1:230253776218:web:4f5625f2311d4d9b31b763",
  "storageBucket": "meme-token-mania.firebasestorage.app",
  "apiKey": "AIzaSyBEWKD703pZ98LHoZl0wZ3jpe31-ibnJsA",
  "authDomain": "meme-token-mania.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "230253776218"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

export { app, firestore };
