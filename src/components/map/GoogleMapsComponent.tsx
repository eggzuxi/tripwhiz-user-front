import { useEffect, useRef, useState } from "react";
import MapMarker from './MapMarker';  // MapMarker 임포트

function GoogleMap() {
    const ref = useRef<HTMLDivElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);

    const markerData = [
        { lat: 3.1579, lng: 101.7123, title: '페트로나스 트윈타워점', content: '이건 첫 번째 마커입니다.' },
        { lat: 3.1497, lng: 101.6943, title: '메르데카 광장점', content: '이건 두 번째 마커입니다.' },
        { lat: 3.2379, lng: 101.6831, title: '바투동굴점', content: '이건 세 번째 마커입니다.' },
    ];

    useEffect(() => {
        const resizeMap = () => {
            if (ref.current && googleMap) {
                googleMap.setCenter({ lat: 3.1579, lng: 101.7123 });
                googleMap.setZoom(15);
            }
        };

        if (ref.current && !googleMap) {
            const apiKey = import.meta.env.VITE_GOOGLE_MAP_KEY;

            if (!apiKey) {
                console.error("Google Maps API Key is not defined");
                return;
            }

            const initialMap = new window.google.maps.Map(ref.current, {
                center: { lat: 3.1579, lng: 101.7123 },
                zoom: 15,
                mapId: apiKey,
                disableDefaultUI: true,
                minZoom: 5,
                maxZoom: 18,
                gestureHandling: 'greedy',
            });

            setGoogleMap(initialMap);
            window.google.maps.event.addListener(initialMap, 'resize', resizeMap);
            resizeMap();
        }
    }, [googleMap]);

    return (
        <div className="flex flex-col h-screen">
            <header className="h-16 bg-gray-200 flex items-center justify-center text-xl">
                eMart 24
            </header>
            {/* 구글 맵이 헤더를 제외하고 화면에 꽉 차도록 설정 */}
            <div ref={ref} id="map" style={{ width: "100%", height: "calc(100vh - 64px)" }} />
            {/* MapMarker 컴포넌트로 여러 마커 렌더링 */}
            {googleMap && markerData.map((marker, index) => (
                <MapMarker key={index} map={googleMap} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title} content={marker.content} />
            ))}
        </div>
    );
}

export default GoogleMap;
