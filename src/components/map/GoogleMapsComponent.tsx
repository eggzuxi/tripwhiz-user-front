import { useEffect, useRef, useState } from "react";

function GoogleMap() {
    const ref = useRef<HTMLDivElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);

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
        </div>
    );
}

export default GoogleMap;
