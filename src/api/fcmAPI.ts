import axios from "axios";

// 서버 URL 가져오기
const USER_SERVER_URL = import.meta.env.VITE_USER_SERVER_URL || "http://localhost:8081";
const STORE_SERVER_URL = import.meta.env.VITE_STORE_SERVER_URL || "http://localhost:8081";

// FCM Token 등록 응답 타입 정의
interface FCMRegisterResponse {
    success: boolean;
    message: string;
}

// 테스트 알림 전송 응답 타입 정의
interface TestNotificationResponse {
    success: boolean;
    message: string;
}

// 에러 객체 타입 정의
interface AxiosErrorResponse {
    response?: {
        data: {
            message: string;
        };
    };
    message: string;
}

// FCM 토큰 등록 API
export const registerFCMToken = async (
    token: string,
    email: string,
    isUser: boolean
): Promise<FCMRegisterResponse | null> => {
    try {
        const serverUrl = isUser ? USER_SERVER_URL : STORE_SERVER_URL;
        const response = await axios.post<FCMRegisterResponse>(`${serverUrl}/api/fcm/register`, {
            fcmToken: token,
            email: email,
        });

        console.log("FCM Token registered successfully:", response.data);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosErrorResponse;
        console.error(
            "Error registering FCM token:",
            axiosError.response?.data.message || axiosError.message
        );
        return null;
    }
};

// 테스트용 알림 전송 API
export const sendTestNotification = async (
    email: string,
    message: string,
    isUser: boolean
): Promise<TestNotificationResponse | null> => {
    try {
        const serverUrl = isUser ? USER_SERVER_URL : STORE_SERVER_URL;
        const response = await axios.post<TestNotificationResponse>(`${serverUrl}/api/fcm/test`, {
            email: email,
            message: message,
        });

        console.log("Notification sent successfully:", response.data);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosErrorResponse;
        console.error(
            "Error sending notification:",
            axiosError.response?.data.message || axiosError.message
        );
        return null;
    }
};
