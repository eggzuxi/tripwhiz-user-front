import { useEffect } from "react";
import { requestFCMToken, onMessageListener } from "../firebase/firebaseConfig";
import { registerFCMToken } from "../api/fcmAPI";
import { MessagePayload } from "firebase/messaging";

const useFCMToken = (email: string | null) => {
    useEffect(() => {
        const fetchAndRegisterFCMToken = async () => {
            try {
                const token = await requestFCMToken();
                if (token && email) {
                    await registerFCMToken(token, email, true);
                    console.log("FCM 토큰 등록 성공:", token);
                }
            } catch (error) {
                console.error("FCM 토큰 등록 오류:", error);
            }
        };

        fetchAndRegisterFCMToken();

        // 알림 수신 리스너 설정
        onMessageListener()
            .then((payload) => {
                const messagePayload = payload as MessagePayload;
                console.log("알림 수신:", messagePayload);
                alert(`새 알림: ${messagePayload.notification?.title} - ${messagePayload.notification?.body}`);
            })
            .catch((err) => console.error("알림 수신 오류:", err));
    }, [email]);
};

export default useFCMToken;
