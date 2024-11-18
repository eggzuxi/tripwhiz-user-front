// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyCJXyfRRftFsYPOUMm4fYXsoFh-UKWmlO8",
    authDomain: "tripwhiz-c6891.firebaseapp.com",
    projectId: "tripwhiz-c6891",
    storageBucket: "tripwhiz-c6891.firebasestorage.app",
    messagingSenderId: "433365700615",
    appId: "1:433365700615:web:7c8bce5d4705db4acadaa2",
    measurementId: "G-XRBE89YGZ9"
};

firebase.initializeApp(firebaseConfig);


// Retrieve firebase messaging
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };


    self.registration.showNotification(notificationTitle, notificationOptions);
});