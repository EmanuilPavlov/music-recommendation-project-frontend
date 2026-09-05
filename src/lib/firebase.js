// lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCWXcwWC_HPAaaJZP6OMphw4If_Oc0w9PU",
    authDomain: "music-recommendation-app-f7fbb.firebaseapp.com",
    projectId: "music-recommendation-app-f7fbb",
    storageBucket: "music-recommendation-app-f7fbb.firebasestorage.app",
    messagingSenderId: "678814327356",
    appId: "1:678814327356:web:b0b654ad759043be2d9939",
    measurementId: "G-NMC8C55GT8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
};