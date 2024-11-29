import { useState} from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

// Firebase 설정 (Firebase Realtime Database 연결)
import { ref, get } from "firebase/database";
import { secondaryDatabase } from "../../firebase/firebaseConfig.ts";  // Firebase 설정

const containerStyle = {
    width: "100%",
    height: "500px",
};

// Firebase에서 특정 위치 데이터를 가져오는 함수
const fetchLocation = async (key: string): Promise<{ lat: number; lng: number } | null> => {
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

// 백엔드에 출발지와 도착지 저장
const saveSpotToServer = async (startPoint: { lat: number; lng: number }, endPoint: { lat: number; lng: number }) => {
    try {
        await axios.post("http://localhost:8081/api/saveSpot", {
            startPoint,
            endPoint,
        });
        alert("스팟이 저장되었습니다!");
    } catch (error) {
        console.error("Error sending spot to server:", error);
    }
};

function Luggage() {
    const [startPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [zoomLevel, setZoomLevel] = useState(12);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 구글맵 API 키
    });

    const handleMapClick = async (event: google.maps.MapMouseEvent) => {
        const clickedPosition = event.latLng?.toJSON();
        if (!clickedPosition) return;

        if (!startPoint) {
            setStartPoint(clickedPosition);
        } else if (!endPoint) {
            setEndPoint(clickedPosition);

            // 출발지와 도착지가 설정되면 서버에 저장
            if (startPoint && clickedPosition) {
                await saveSpotToServer(startPoint, clickedPosition);
            }
        }
    };

    const loadCurrentLocation = async () => {
        const location = await fetchLocation("userLocation"); // Firebase에서 위치 데이터 가져오기
        if (location) {
            setCurrentLocation(location);
            setZoomLevel(15); // 내 위치를 표시할 때 확대
        }
    };

    return (
        <div>
            <h1>말레이시아 지도 - 출발지 및 도착지 설정</h1>
            <div className="mb-4 flex gap-2">
                <button
                    onClick={loadCurrentLocation}
                    className="p-2 bg-green-500 text-white rounded"
                >
                    내 위치 표시
                </button>
                <button
                    onClick={() => setStartPoint(null)}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    출발지 초기화
                </button>
                <button
                    onClick={() => setEndPoint(null)}
                    className="p-2 bg-red-500 text-white rounded"
                >
                    도착지 초기화
                </button>
                {startPoint && endPoint && (
                    <button
                        onClick={async () => {
                            if (startPoint && endPoint) {
                                await saveSpotToServer(startPoint, endPoint);
                            }
                        }}
                        className="p-2 bg-purple-500 text-white rounded"
                    >
                        경로 및 편의점 표시
                    </button>
                )}
            </div>

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentLocation || { lat: 3.139, lng: 101.6869 }}
                    zoom={zoomLevel}
                    onClick={handleMapClick}
                >
                    {currentLocation && (
                        <Marker
                            position={currentLocation}
                            label={{
                                text: "내 위치",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                        />
                    )}
                    {startPoint && (
                        <Marker
                            position={startPoint}
                            label={{
                                text: "출발지",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                        />
                    )}
                    {endPoint && (
                        <Marker
                            position={endPoint}
                            label={{
                                text: "도착지",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                        />
                    )}
                </GoogleMap>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
}

export default Luggage;
