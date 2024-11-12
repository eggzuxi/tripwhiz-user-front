// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJXyfRRftFsYPOUMm4fYXsoFh-UKWmlO8",
    authDomain: "tripwhiz-c6891.firebaseapp.com",
    projectId: "tripwhiz-c6891",
    storageBucket: "tripwhiz-c6891.firebasestorage.app",
    messagingSenderId: "433365700615",
    appId: "1:433365700615:web:7c8bce5d4705db4acadaa2",
    measurementId: "G-XRBE89YGZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);