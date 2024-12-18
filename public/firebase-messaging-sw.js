importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js');

// Firebase 설정
firebase.initializeApp({
    apiKey: "AIzaSyAq4LWQ1QYwqK1xErJFBp3J9Pu1_Tw0K",
    authDomain: "jin1107-c14a2.firebaseapp.com",
    projectId: "jin1107-c14a2",
    storageBucket: "jin1107-c14a2.appspot.com",
    messagingSenderId: "11502337642045",
    appId: "1:11502337642045:web:7d696f03b008c1a616e854",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload);

    const { title, body } = payload.notification;
    self.registration.showNotification(title, {
        body,
        icon: '/firebase-logo.png',
    });
});
