import axios from "axios";
import { ref, get, set } from "firebase/database";
import { secondaryDatabase } from "../firebase/firebaseConfig";
import {LuggageDTO, Point} from "../types/spot.ts";

const API_BASE_URL = "http://localhost:8081/luggage";

// Firebase에서 특정 위치 데이터를 가져오는 함수
export const fetchLocation = async (key: string): Promise<Point | null> => {
    try {
        const locationRef = ref(secondaryDatabase, key);
        const snapshot = await get(locationRef);
        if (snapshot.exists()) {
            return snapshot.val() as Point;
        }
        return null;
    } catch (error) {
        console.error("Error fetching location from Firebase:", error);
        return null;
    }
};

// Firebase에서 편의점 데이터를 가져오는 함수
export const fetchConvenienceStores = async (): Promise<
    { lat: number; lng: number; name: string }[]
> => {
    try {
        const storesRef = ref(secondaryDatabase, "convenienceStores");
        const snapshot = await get(storesRef);
        if (snapshot.exists()) {
            const data = snapshot.val() as Record<string, { lat: number; lng: number; name: string }>;
            return Object.values(data);
        }
        return [];
    } catch (error) {
        console.error("Error fetching convenience stores from Firebase:", error);
        return [];
    }
};

// Firebase에 출발지와 도착지를 저장하는 함수
export const savePointsToFirebase = async (
    startPoint: Point | null,
    endPoint: Point | null
): Promise<void> => {
    const pointsRef = ref(secondaryDatabase, "userRoutes");
    await set(pointsRef, { startPoint, endPoint });
};

// 백엔드로 Luggage 데이터를 저장하는 함수
export const saveLuggage = async (luggageData: LuggageDTO): Promise<string> => {
    const response = await axios.post<string>(`${API_BASE_URL}/saveLuggage`, luggageData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
