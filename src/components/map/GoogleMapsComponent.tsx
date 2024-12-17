import { useEffect, useRef, useState } from "react";
// import "../../App.css";
import { storeAPI } from "../../api/storeAPI.ts";
import MapMarker from "./MapMarker.tsx";

interface Spot {
    spno: number;
    spotname: string;
    address:string;
    url: string;
    latitude: number;
    longitude: number;
}

// 거리 계산 함수
// function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//     const toRad = (value: number) => (value * Math.PI) / 180;
//     const R = 6371; // 지구 반지름 (단위: km)
//     const dLat = toRad(lat2 - lat1);
//     const dLng = toRad(lng2 - lng1); // lng1이 여기서 사용됩니다.
//
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
//
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // 거리 반환 (단위: km)
// }


const GoogleMap: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
    const [spotData, setSpotData] = useState<Spot[]>([]);
    // const [filteredSpots, setFilteredSpots] = useState<Spot[]>([]); // 필터링된 지점 데이터

    useEffect(() => {
        const fetchSpotData = async () => {
            try {
                const spotList = await storeAPI.list(); // storeAPI.list 사용
                setSpotData(spotList);
            } catch (error) {
                console.error("Spot 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchSpotData();
    }, []);

    useEffect(() => {

        if (ref.current && !googleMap) {
            const initialMap = new window.google.maps.Map(ref.current, {
                center: { lat: 3.157288444149725, lng: 101.70809824531135 },
                zoom: 12,
                disableDefaultUI: true,
                gestureHandling: "greedy",
            });

            setGoogleMap(initialMap);

        }
    }, [googleMap]);

    // useEffect(() => {
    //     if (googleMap) {
    //         const handleCenterChanged = () => {
    //             const center = googleMap?.getCenter();
    //             if (center) {
    //                 const centerLat = center.lat();
    //                 const centerLng = center.lng();
    //
    //                 // 지도 중심에서 반경 1km 이내의 지점만 필터링
    //                 const nearbySpots = spotData.filter((spot: Spot) => {
    //                     const distance = calculateDistance(centerLat, centerLng, spot.latitude, spot.longitude);
    //                     return distance <= 1;
    //                 });
    //
    //                 setFilteredSpots(nearbySpots); // 필터링된 지점만 업데이트
    //             }
    //         };
    //
    //         const listener = googleMap.addListener("center_changed", handleCenterChanged);
    //
    //         // Cleanup: 컴포넌트가 unmount될 때 리스너 제거
    //         return () => {
    //             if (listener) {
    //                 google.maps.event.removeListener(listener);
    //             }
    //         };
    //     }
    // }, [googleMap, spotData]);

    useEffect(() => {
        if (googleMap && searchInputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
                fields: ["geometry", "name"],
                types: ["geocode"],
            });

            autocomplete.bindTo("bounds", googleMap);

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (!place.geometry || !place.geometry.location) {
                    console.error("검색 결과에 위치 정보가 없습니다.");
                    return;
                }

                googleMap.panTo(place.geometry.location);
                googleMap.setZoom(16);
            });
        }
    }, [googleMap]);

    return (
        <div className="container">
            {/* 헤더 */}
            <header className="header">지점선택</header>

            {/* 검색창 */}
            <div className="search-bar">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Google 지도 검색"
                    style={{
                        width: "100%",
                        height: "40px",
                        padding: "8px",
                        fontSize: "16px",
                        boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginBottom: "10px",
                    }}
                />
            </div>

            {/* 지도 */}
            <div ref={ref} id="map" style={{ width: "100%", height: "500px" }} />

            {/* 매장 리스트 */}
            <div className="store-list">
                {googleMap &&
                    spotData.map((spot) => (
                        <div className="store-item" key={spot.spno}>
                            <MapMarker
                                key={spot.spno}
                                map={googleMap}
                                position={{ lat: spot.latitude, lng: spot.longitude }}
                                title={spot.spotname}
                                address={spot.address}
                                spno={spot.spno}
                                content={`<h4>${spot.spotname}</h4><a href="${spot.url}" target="_blank">길찾기</a>`}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default GoogleMap;