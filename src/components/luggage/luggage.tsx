import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { fetchConvenienceStores, fetchLocation, savePointsToFirebase } from '../../api/luggageAPI';
import LuggageForm from './LuggageForm';
import useAuthStore from '../../store/AuthStore'; // 이메일을 가져오기 위한 useAuthStore import

const containerStyle = {
    width: '100%',
    height: '500px',
};

const Luggage: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [startPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [endPoint, setEndPoint] = useState<{ lat: number; lng: number } | null>(null);
    const [convenienceStores, setConvenienceStores] = useState<{ lat: number; lng: number; name: string }[]>([]);
    const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);
    const [zoomLevel, setZoomLevel] = useState<number>(12);

    // useAuthStore에서 이메일 가져오기 (수정된 부분)
    const email = useAuthStore(state => state.email); // 이메일을 직접 가져옴

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyCAEphgIbIzt3ECeOlAkuKSLpoDs1DZRVY',
    });

    const handleMapClick = async (event: google.maps.MapMouseEvent) => {
        const clickedPosition = event.latLng?.toJSON();
        if (!clickedPosition) return;

        if (!startPoint) {
            setStartPoint(clickedPosition);
        } else if (!endPoint) {
            setEndPoint(clickedPosition);
            await savePointsToFirebase(startPoint, clickedPosition);
            alert('출발지와 도착지가 저장되었습니다!');
        }
    };

    const loadRouteAndStores = async () => {
        if (!startPoint || !endPoint) return;

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: startPoint,
                destination: endPoint,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            async (result, status) => {
                if (status === 'OK' && result.routes[0]) {
                    const newPath = result.routes[0].overview_path.map(point => ({
                        lat: point.lat(),
                        lng: point.lng(),
                    }));
                    setPath(newPath);

                    const stores = await fetchConvenienceStores();
                    const nearbyStores = stores.filter(store => {
                        const distance = google.maps.geometry.spherical.computeDistanceBetween(
                            new google.maps.LatLng(store.lat, store.lng),
                            new google.maps.LatLng(startPoint.lat, startPoint.lng)
                        );
                        return distance <= 5000; // 5km 내 편의점 필터링
                    });
                    setConvenienceStores(nearbyStores);
                } else {
                    console.error('경로 요청 실패:', status);
                }
            }
        );
    };

    const loadCurrentLocation = async () => {
        const location = await fetchLocation('userLocation');
        if (location) {
            setCurrentLocation(location);
            setZoomLevel(15); // 내 위치를 표시할 때 확대
        }
    };

    if (loadError) return <p>Error loading map: {loadError.message}</p>;

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">말레이시아 지도 - 내 위치, 출발지/도착지 설정</h1>
            <div className="mb-4 flex gap-2">
                <button onClick={loadCurrentLocation} className="p-2 bg-green-500 text-white rounded">
                    내 위치 표시
                </button>
                <button
                    onClick={() => {
                        setStartPoint(null);
                        setEndPoint(null);
                    }}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    초기화
                </button>
                {startPoint && endPoint && (
                    <button onClick={loadRouteAndStores} className="p-2 bg-purple-500 text-white rounded">
                        경로 및 편의점 표시
                    </button>
                )}
            </div>

            <div>
                {/* 이메일 출력 */}
                {email && <p>로그인한 이메일: {email}</p>}
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
                            label={{ text: '내 위치', color: 'white', fontSize: '14px', fontWeight: 'bold' }}
                        />
                    )}
                    {startPoint && (
                        <Marker
                            position={startPoint}
                            label={{ text: '출발', color: 'white', fontSize: '14px', fontWeight: 'bold' }}
                        />
                    )}
                    {endPoint && (
                        <Marker
                            position={endPoint}
                            label={{ text: '도착', color: 'white', fontSize: '14px', fontWeight: 'bold' }}
                        />
                    )}
                    {path.length > 0 && (
                        <Polyline
                            path={path}
                            options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 4 }}
                        />
                    )}
                    {convenienceStores.map((store, index) => (
                        <Marker
                            key={index}
                            position={{ lat: store.lat, lng: store.lng }}
                            label={{ text: store.name, color: 'blue', fontSize: '12px', fontWeight: 'bold' }}
                        />
                    ))}
                </GoogleMap>
            ) : (
                <p>Loading map...</p>
            )}

            <LuggageForm email={email} />
        </div>
    );
};

export default Luggage;
