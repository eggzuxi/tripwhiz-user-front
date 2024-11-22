import { useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { ref, onValue } from "firebase/database";
import { simulateLuggageMovement } from "./simulateLuggageMovement";
import {secondaryDatabase} from "../../firebase/firebaseConfig.ts";

const containerStyle = {
    width: "100%",
    height: "500px",
};

function Maps() {
    const [position, setPosition] = useState({ lat: 3.139, lng: 101.6869 }); // 초기 위치
    const [path, setPath] = useState<{ lat: number; lng: number }[]>([]); // 경로 데이터 저장
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyCAEphgIbIzt3ECeOlAkuKSLpoDs1DZRVY",
    });

    useEffect(() => {
        const locationRef = ref(secondaryDatabase, "luggage/location");

        // Firebase Realtime Database에서 위치 업데이트 수신
        const unsubscribe = onValue(locationRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPosition({ lat: data.lat, lng: data.lng });
                setPath((prevPath) => [...prevPath, { lat: data.lat, lng: data.lng }]); // 새로운 경로 추가
                console.log("Updated Position:", data);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">말레이시아 수화물 이동</h1>
            <button
                onClick={simulateLuggageMovement}
                className="p-2 bg-blue-500 text-white rounded mb-4"
            >
                수화물 이동 시작
            </button>
            {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={12}>
                    {/* Polyline으로 경로 표시 */}
                    <Polyline
                        path={path}
                        options={{
                            strokeColor: "#FF0000", // 빨간색 선
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                        }}
                    />
                    {/* 마커 */}
                    <Marker position={position} />
                </GoogleMap>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
}

export default Maps;
