import { ref, get, set } from "firebase/database";
import {secondaryDatabase} from "../firebase/firebaseConfig.ts";


// Firebase에서 특정 위치 데이터를 가져오는 함수
export const fetchLocation = async (key: string): Promise<{ lat: number; lng: number } | null> => {
    try {
        const locationRef = ref(secondaryDatabase, key);
        const snapshot = await get(locationRef);
        if (snapshot.exists()) {
            return snapshot.val() as { lat: number; lng: number };
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
            const data = snapshot.val() as Record<
                string,
                { lat: number; lng: number; name: string }
            >;
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
    startPoint: { lat: number; lng: number } | null,
    endPoint: { lat: number; lng: number } | null
) => {
    const pointsRef = ref(secondaryDatabase, "userRoutes");
    await set(pointsRef, { startPoint, endPoint });
};
