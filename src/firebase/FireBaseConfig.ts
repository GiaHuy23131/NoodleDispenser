// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxs8PYB0C9RkHH0yDSFw2xB-0ks4GpLWI",
    authDomain: "noodledispenser-b279d.firebaseapp.com",
    projectId: "noodledispenser-b279d",
    storageBucket: "noodledispenser-b279d.firebasestorage.app",
    messagingSenderId: "52129423366",
    appId: "1:52129423366:web:4dd6955f01e765f023e387",
    measurementId: "G-6SCLBJL7VC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);