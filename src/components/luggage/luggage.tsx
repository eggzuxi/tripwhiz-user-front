import React, { useState } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { fetchLocation, saveLuggage } from "../../api/luggageAPI";

const containerStyle = {
    width: "100%",
    height: "500px",
};

function Luggage() {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(
        null
    );
    const [startPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);
    const [zoomLevel, setZoomLevel] = useState<number>(12);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyCAEphgIbIzt3ECeOlAkuKSLpoDs1DZRVY",
    });

    const handleMapClick = async (event: google.maps.MapMouseEvent) => {
        const clickedPosition = event.latLng?.toJSON();
        if (!clickedPosition) return;

        if (!startPoint) {
            setStartPoint(clickedPosition);
        } else if (!endPoint) {
            setEndPoint(clickedPosition);

            // 출발지와 도착지가 모두 설정되면 백엔드에 저장
            const formattedStartPoint = {
                lat: parseFloat(startPoint.lat.toFixed(6)),
                lng: parseFloat(startPoint.lng.toFixed(6)),
            };

            const formattedEndPoint = {
                lat: parseFloat(clickedPosition.lat.toFixed(6)),
                lng: parseFloat(clickedPosition.lng.toFixed(6)),
            };

            try {
                const response = await saveLuggage({
                    startPoint: formattedStartPoint,
                    endPoint: formattedEndPoint,
                });
                console.log("서버 응답:", response);
                alert("출발지와 도착지가 저장되었습니다!");
            } catch (error) {
                console.error("백엔드 저장 중 오류:", error);
                alert("백엔드 저장에 실패했습니다. 서버 상태를 확인해주세요.");
            }
        }
    };

    const loadRouteAndStores = async () => {
        if (!startPoint || !endPoint) {
            alert("출발지와 도착지를 모두 설정해주세요.");
            return;
        }

        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: startPoint,
                destination: endPoint,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === "OK" && result.routes[0]) {
                    const newPath = result.routes[0].overview_path.map((point) => ({
                        lat: point.lat(),
                        lng: point.lng(),
                    }));
                    setPath(newPath); // 경로 설정
                } else {
                    console.error("경로 요청 실패:", status);
                    alert("경로를 불러오지 못했습니다. 다시 시도해주세요.");
                }
            }
        );
    };

    const loadCurrentLocation = async () => {
        try {
            const location = await fetchLocation("userLocation"); // Firebase에서 위치 가져오기
            if (location) {
                setCurrentLocation(location);
                setZoomLevel(15); // 내 위치로 확대
                console.log("Firebase에서 가져온 위치:", location);
            } else {
                alert("Firebase에서 위치를 가져올 수 없습니다.");
            }
        } catch (error) {
            console.error("Firebase 위치 가져오기 실패:", error);
            alert("현재 위치를 가져오는 데 실패했습니다.");
        }
    };

    if (loadError) return <p>Error loading map: {loadError.message}</p>;

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">말레이시아 지도 - 내 위치, 출발지/도착지 설정</h1>
            <div className="mb-4 flex gap-2">
                <button
                    onClick={loadCurrentLocation}
                    className="p-2 bg-green-500 text-white rounded"
                >
                    내 위치 표시
                </button>
                <button
                    onClick={() => {
                        setStartPoint(null);
                        setEndPoint(null);
                        setPath([]);
                    }}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    초기화
                </button>
                {startPoint && endPoint && (
                    <button
                        onClick={loadRouteAndStores}
                        className="p-2 bg-purple-500 text-white rounded"
                    >
                        경로 표시
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
                                text: "출발",
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
                                text: "도착",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                        />
                    )}
                    {path.length > 0 && (
                        <Polyline
                            path={path}
                            options={{
                                strokeColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeWeight: 4,
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
