// Import the functions you need from the SDKs
import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getDatabase, Database } from "firebase/database"; // Realtime Database 추가

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJXyfRRftFsYPOUMm4fYXsoFh-UKWmlO8",
    authDomain: "tripwhiz-c6891.firebaseapp.com",
    projectId: "tripwhiz-c6891",
    storageBucket: "tripwhiz-c6891.firebasestorage.app",
    messagingSenderId: "433365700615",
    appId: "1:433365700615:web:7c8bce5d4705db4acadaa2",
    measurementId: "G-XRBE89YGZ9",
};

const secondfirebaseConfig = {
    apiKey: "AIzaSyDSapVBODWN8Xt0hDuTKrP1KJfgE--aU5A",
    authDomain: "luggagelacation.firebaseapp.com",
    projectId: "luggagelacation",
    storageBucket: "luggagelacation.firebasestorage.app",
    messagingSenderId: "355881961377",
    appId: "1:355881961377:web:1d55e0aadff6509b9b6de0",
    measurementId: "G-K2R2D48SH8",
};

// Initialize Firebase apps
const app: FirebaseApp = initializeApp(firebaseConfig);
const secondaryApp: FirebaseApp = initializeApp(secondfirebaseConfig, "secondaryApp");

// Messaging services
export const messaging: Messaging = getMessaging(app);
export const secondaryMessaging: Messaging = getMessaging(secondaryApp);

// Realtime Database for secondary app
export const secondaryDatabase: Database = getDatabase(secondaryApp);

// Analytics (Browser-Only Initialization)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app); // Initialize only in browser
}

export { app, secondaryApp, analytics };
