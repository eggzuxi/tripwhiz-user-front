import { useEffect } from "react";
import { requestFCMToken, registerServiceWorker, onMessageListener } from "../firebase/firebaseConfig";

const useFCM = (email: string | null) => {
    useEffect(() => {
        const initializeFCM = async () => {
            try {
                await registerServiceWorker();
                const token = await requestFCMToken();
                if (token) {
                    console.log("FCM 토큰:", token);
                    if (email) {
                        console.log(`서버에 FCM 토큰 등록: ${email}`);
                        // 서버에 토큰 등록 API 호출 로직
                    }
                }
            } catch (error) {
                console.error("FCM 초기화 오류:", error);
            }
        };

        const listenToMessages = () => {
            onMessageListener()
                .then((payload) => {
                    console.log("포그라운드 알림 수신:", payload);
                })
                .catch((err) => console.error("알림 수신 오류:", err));
        };

        if (email) {
            initializeFCM();
            listenToMessages();
        }
    }, [email]); // email이 변경될 때마다 실행
};

export default useFCM;
