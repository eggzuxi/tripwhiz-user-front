import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import mainRouter from "./routes/mainRouter.tsx";
import { registerServiceWorker, requestFCMToken, onMessageListener } from "./firebase/firebaseConfig";

const clientId = "107035162244-df08rm5qe4b2h780nuphhm5murf91lha.apps.googleusercontent.com";

// Service Worker 등록
registerServiceWorker().then(() => {
    console.log("Service Worker 등록 완료");

    // FCM 토큰 요청 (옵션)
    requestFCMToken().then((token) => {
        if (token) {
            console.log("FCM 토큰:", token);
            // 여기에 서버로 토큰을 전송하는 로직 추가 가능
        }
    });

    // 알림 수신 이벤트 리스너
    onMessageListener().then((payload) => {
        console.log("포그라운드 알림 수신:", payload);
    });
});

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <RouterProvider router={mainRouter} />
    </GoogleOAuthProvider>
);
