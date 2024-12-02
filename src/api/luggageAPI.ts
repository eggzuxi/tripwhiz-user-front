import axios from "axios";
import { ref, get, set } from "firebase/database";
import { secondaryDatabase } from "../firebase/firebaseConfig";
import { LuggageDTO, Point } from "../types/luggage";

// 백엔드 API 엔드포인트
const API_BASE_URL = "http://localhost:8081/luggage";

// Firebase에서 특정 위치 데이터를 가져오는 함수
export const fetchLocation = (key: string): Promise<Point | null> => {
    const locationRef = ref(secondaryDatabase, key);
    return get(locationRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val() as Point;
        }
        return null;
    });
};

// Firebase에서 편의점 데이터를 가져오는 함수
export const fetchConvenienceStores = (): Promise<{ lat: number; lng: number; name: string }[]> => {
    const storesRef = ref(secondaryDatabase, "convenienceStores");
    return get(storesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val() as Record<string, { lat: number; lng: number; name: string }>;
            return Object.values(data);
        }
        return [];
    });
};

// 이메일을 Firebase 경로에 사용할 수 있는 형식으로 변환
const formatEmailForPath = (email: string) => {
    return email.replace(/[@.]/g, (match) => (match === '@' ? '_at_' : '_dot_'));
};

// Firebase에 출발지, 도착지 데이터를 저장하는 함수
export const savePointsToFirebase = (luggageData: any): Promise<void> => {
    const emailFormatted = formatEmailForPath(luggageData.email);
    const pointsRef = ref(secondaryDatabase, 'userRoutes/' + emailFormatted);

    return set(pointsRef, {
        startPoint: luggageData.startPoint,
        endPoint: luggageData.endPoint,
        email: luggageData.email
    }).then(() => {
        console.log("Points saved successfully to Firebase!");
    });
};

// 백엔드로 Luggage 데이터를 저장하는 함수
export const saveLuggage = (luggageData: LuggageDTO): Promise<string> => {
    return axios.post(`${API_BASE_URL}/saveLuggage`, luggageData, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.data.message;
            } else {
                return Promise.reject("Failed to save luggage data");
            }
        });
};
