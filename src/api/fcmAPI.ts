import axios, { AxiosError } from "axios";

// 서버 URL 가져오기
const USER_SERVER_URL = import.meta.env.VITE_USER_SERVER_URL || "";
const STORE_SERVER_URL = import.meta.env.VITE_STORE_SERVER_URL || "";

// FCM Token 등록 응답 타입
interface FCMRegisterResponse {
    success: boolean;
    message: string;
}

// 테스트 알림 전송 응답 타입
interface TestNotificationResponse {
    success: boolean;
    message: string;
}

// 공통 에러 핸들링 함수
const getErrorMessage = (error: unknown): string => {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || axiosError.message || "알 수 없는 오류 발생";
};

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

        console.log("FCM Token 등록 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("FCM Token 등록 실패:", getErrorMessage(error));
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

        console.log("테스트 알림 전송 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("테스트 알림 전송 실패:", getErrorMessage(error));
        return null;
    }
};
