import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용
import "../../App.css";

// 거리 계산 함수
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 반환 (단위: km)
}

function GoogleMap() {
    const ref = useRef<HTMLDivElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
    const [filteredMarkers, setFilteredMarkers] = useState<typeof markerData>([]); // 필터링된 데이터 저장
    const navigate = useNavigate(); // React Router의 navigate 사용

    // 마커 데이터
    const markerData = [
        { lat: 3.1579, lng: 101.7123, title: "페트로나스 트윈타워", content: "페트로나스 트윈타워입니다." },
        { lat: 3.1569, lng: 101.7118, title: "만다린 오리엔탈 쿠알라룸푸르", content: "만다린 오리엔탈 호텔입니다." },
        { lat: 3.1543, lng: 101.7113, title: "그랜드 하얏트 쿠알라룸푸르", content: "그랜드 하얏트 호텔입니다." },
        { lat: 3.1549, lng: 101.7125, title: "트레이더스 호텔 쿠알라룸푸르", content: "트레이더스 호텔입니다." },
        { lat: 3.1540, lng: 101.7118, title: "임피아나 KLCC 호텔", content: "임피아나 KLCC 호텔입니다." },
        { lat: 3.1520, lng: 101.7054, title: "샹그릴라 호텔 쿠알라룸푸르", content: "샹그릴라 호텔입니다." },
        { lat: 3.2379, lng: 101.6831, title: "바투 동굴", content: "힌두교 사원이 위치한 석회암 동굴입니다." },
    ];

    useEffect(() => {
        if (ref.current && !googleMap) {
            const initialMap = new window.google.maps.Map(ref.current, {
                center: { lat: 3.1579, lng: 101.7123 },
                zoom: 15,
                disableDefaultUI: true,
                gestureHandling: "greedy",
            });

            setGoogleMap(initialMap);

            // 마커 추가
            markerData.forEach((marker) => {
                const mapMarker = new window.google.maps.Marker({
                    position: { lat: marker.lat, lng: marker.lng },
                    map: initialMap,
                    title: marker.title,
                });

                // 마커 클릭 이벤트
                mapMarker.addListener("click", () => {
                    // 반경 1km 이내의 데이터 필터링
                    const nearbyMarkers = markerData.filter((m) => {
                        const distance = calculateDistance(marker.lat, marker.lng, m.lat, m.lng);
                        return distance <= 1; // 반경 1km
                    });

                    // 필터링된 데이터를 상태에 저장
                    setFilteredMarkers(nearbyMarkers);

                    // 지도 중심 이동
                    initialMap.panTo({ lat: marker.lat, lng: marker.lng });
                    initialMap.setZoom(16);
                });
            });
        }
    }, [googleMap]);

    return (
        <div className="container">
            {/* 헤더 */}
            <header className="header">eMart 24</header>

            {/* 지도 */}
            <div ref={ref} id="map" className="map-container" />

            {/* 매장 리스트 */}
            <div className="store-list">
                {filteredMarkers.length > 0 ? (
                    filteredMarkers.map((marker, index) => (
                        <div className="store-item" key={index}>
                            {/* 제목을 클릭하면 지도 이동 */}
                            <h4
                                className="store-title"
                                onClick={() => {
                                    if (googleMap) {
                                        googleMap.panTo({ lat: marker.lat, lng: marker.lng });
                                        googleMap.setZoom(17);
                                    }
                                }}
                            >
                                {marker.title}
                            </h4>
                            {/* 설명 */}
                            <p>{marker.content}</p>
                            {/* 버튼을 클릭하면 "/payment"로 이동 */}
                            <button
                                className="select-button"
                                onClick={() => {
                                    navigate("/payment");
                                }}
                            >
                                선택하기
                            </button>
                        </div>
                    ))
                ) : (
                    <p>반경 1km 이내 매장이 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default GoogleMap;