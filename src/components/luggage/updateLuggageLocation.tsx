import { ref, set } from "firebase/database";
import {secondaryDatabase} from "../../firebase/firebaseConfig"; // Firebase 설정 가져오기

/**
 * Firebase에 수화물 위치 업데이트
 * @param lat - 위도
 * @param lng - 경도
 */
export const updateLuggageLocation = (lat: number, lng: number) => {
    const locationRef = ref(secondaryDatabase, "luggage/location"); // Firebase Realtime Database 경로
    set(locationRef, { lat, lng })
        .then(() => console.log(`Location updated to: ${lat}, ${lng}`))
        .catch((error) => console.error("Error updating location:", error));
};
