importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
    apiKey: "AIzaSyApw4fL9QVmVyqKLwrJIFp3JqP9uU_IwQk",
    authDomain: "jin1107-c14a2.firebaseapp.com",
    projectId: "jin1107-c14a2",
    storageBucket: "jin1107-c14a2.firebasestorage.app",
    messagingSenderId: "1052337642045",
    appId: "1:1052337642045:web:7d690f0630b00c1a61e854",
    measurementId: "G-1B0D6X39YP"
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

