import React, { useEffect, useState, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createLuggageStorage } from "../../api/luggageAPI";
import { LuggageStorageStatus, SpotDTO } from "../../types/luggage";

import useAuthStore from "../../store/AuthStore";
import { storeAPI } from "../../api/storeAPI.ts";
import useFCM from "../../hooks/useFCM.ts";

// GoogleMap 컴포넌트
const GoogleMap: React.FC<{
    spots: SpotDTO[];
    onSelectSpot: (spot: SpotDTO) => void;
    center: { lat: number; lng: number };
}> = ({ spots, onSelectSpot, center }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (mapRef.current) {
            // 지도 초기화
            const map = new google.maps.Map(mapRef.current, {
                center,
                zoom: 12,
            });
            mapInstance.current = map;

            // 마커 추가
            if (Array.isArray(spots) && spots.length > 0) {
                spots.forEach((spot) => {
                    const marker = new google.maps.Marker({
                        position: { lat: spot.latitude, lng: spot.longitude },
                        map,
                        title: spot.spotname,
                    });

                    // 마커 클릭 이벤트
                    const infoWindow = new google.maps.InfoWindow({
                        content: `<div><strong>${spot.spotname}</strong><br>${spot.address}</div>`,
                    });

                    marker.addListener("click", () => {
                        infoWindow.open(map, marker);
                        onSelectSpot(spot);
                    });
                });
            } else {
                console.warn("No spots to display on the map.");
            }
        }
    }, [spots, onSelectSpot, center]);

    useEffect(() => {
        if (mapInstance.current) {
            mapInstance.current.setCenter(center);
        }
    }, [center]);

    return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

// NumberPicker 컴포넌트
const NumberPicker: React.FC<{
    range: number[];
    value: number;
    onChange: (value: number) => void;
}> = ({ range, value, onChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        const currentIndex = range.indexOf(value);
        if (e.deltaY > 0 && currentIndex < range.length - 1) {
            onChange(range[currentIndex + 1]);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            onChange(range[currentIndex - 1]);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleScroll, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleScroll);
            }
        };
    }, [value, range]);

    return (
        <div
            ref={containerRef}
            className="w-40 h-8 border border-[#1D2D5F] rounded-md flex items-center justify-center"
            style={{
                userSelect: "none",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
            }}
        >
            {value}
        </div>
    );
};

// LuggageStorageComponent
const LuggageStorageComponent: React.FC = () => {
    const [spots, setSpots] = useState<SpotDTO[]>([]);
    const [selectedSpot, setSelectedSpot] = useState<SpotDTO | null>(null);

    const [storageYear, setStorageYear] = useState<number>(2024);
    const [storageMonth, setStorageMonth] = useState<number>(1);
    const [storageDay, setStorageDay] = useState<number>(1);
    const [storageHour, setStorageHour] = useState<number>(12);

    const [retrieveYear, setRetrieveYear] = useState<number>(2024);
    const [retrieveMonth, setRetrieveMonth] = useState<number>(1);
    const [retrieveDay, setRetrieveDay] = useState<number>(1);
    const [retrieveHour, setRetrieveHour] = useState<number>(12);

    const [searchInput, setSearchInput] = useState<string>("");
    const [center] = useState<{ lat: number; lng: number }>({
        lat: 37.5665,
        lng: 126.978,
    });

    const email = useAuthStore((state) => state.email);

    // FCM 훅 실행
    useFCM(email);

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const spotList = await storeAPI.list();
                console.log("Fetched spot list:", spotList);
                if (Array.isArray(spotList)) {
                    setSpots(spotList);
                } else {
                    console.error("Unexpected response format:", spotList);
                    setSpots([]);
                }
            } catch (error) {
                console.error("Failed to fetch spots:", error);
                setSpots([]);
            }
        };

        fetchSpots();
    }, []);

    const handleSave = async () => {
        if (!selectedSpot || !email) {
            alert("모든 정보를 입력해주세요.");
            return;
        }

        // 맡기실 시간
        const storageDate = new Date(storageYear, storageMonth - 1, storageDay, storageHour);
        const formattedStorageDate = storageDate.toISOString().slice(0, 19); // ISO 8601 형식: YYYY-MM-DDTHH:mm:ss

        // 찾으실 시간 (맡기실 시간에 8시간 추가)
        const storedUntilDate = new Date(storageDate.getTime());
        storedUntilDate.setHours(storageDate.getHours() + 8); // 8시간 추가
        const formattedStoredUntil = storedUntilDate.toISOString().slice(0, 19); // ISO 8601 형식

        const payload = {
            storageSpot: {
                spno: selectedSpot.spno,
                spotname: selectedSpot.spotname,
                address: selectedSpot.address,
                url: selectedSpot.url,
                latitude: selectedSpot.latitude,
                longitude: selectedSpot.longitude,
            },
            email: email,
            storageDate: formattedStorageDate,
            storedUntil: formattedStoredUntil,
            status: LuggageStorageStatus.PENDING, // 열거형 값 사용
        };

        try {
            await createLuggageStorage(payload);
            alert("데이터가 성공적으로 저장되었습니다.");
        } catch (error) {
            console.error("Failed to save luggage storage:", error);
            alert("데이터 저장에 실패했습니다.");
        }
    };

    const handleSpotSelect = (spot: SpotDTO) => setSelectedSpot(spot);

    const renderMap = (status: Status) => {
        if (status === Status.LOADING) return <p>지도 로딩 중...</p>;
        if (status === Status.FAILURE) return <p>지도 로드 실패</p>;
        return <GoogleMap spots={spots} onSelectSpot={handleSpotSelect} center={center} />;
    };

    return (
        <div>
            {/* 검색 섹션 */}
            <div className="mb-4 mx-4 flex gap-2">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="주소 또는 장소를 입력하세요"
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Google Maps */}
            <div className="mx-auto w-11/12">
                <Wrapper
                    apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
                    render={renderMap}
                    libraries={["places"]}
                />
            </div>

            {/* 선택한 지점 정보 */}
            {selectedSpot && (
                <div className="mx-4 my-4 p-4 border rounded-md" style={{ borderColor: "#1D2D5F" }}>
                    <h4 className="font-bold text-lg text-[#1D2D5F]">{selectedSpot.spotname}</h4>
                    <p className="text-gray-600">{selectedSpot.address}</p>
                </div>
            )}

            {/* 날짜 및 시간 선택 */}
            <h4 className="font-bold mb-2 text-left ml-4 text-lg mt-4">맡기실 시간</h4>
            <div className="flex items-center gap-1 mb-4 mx-4">
                <NumberPicker range={[...Array(11)].map((_, i) => 2024 + i)} value={storageYear} onChange={setStorageYear} />
                <span>년</span>
                <NumberPicker range={[...Array(12)].map((_, i) => i + 1)} value={storageMonth} onChange={setStorageMonth} />
                <span>월</span>
                <NumberPicker range={[...Array(31)].map((_, i) => i + 1)} value={storageDay} onChange={setStorageDay} />
                <span>일</span>
                <NumberPicker range={[...Array(24)].map((_, i) => i)} value={storageHour} onChange={setStorageHour} />
                <span>시</span>
            </div>

            <h4 className="font-bold mb-2 text-left ml-4 text-lg mt-4">찾으실 시간</h4>
            <div className="flex items-center gap-1 mb-4 mx-4">
                <NumberPicker range={[...Array(11)].map((_, i) => 2024 + i)} value={retrieveYear} onChange={setRetrieveYear} />
                <span>년</span>
                <NumberPicker range={[...Array(12)].map((_, i) => i + 1)} value={retrieveMonth} onChange={setRetrieveMonth} />
                <span>월</span>
                <NumberPicker range={[...Array(31)].map((_, i) => i + 1)} value={retrieveDay} onChange={setRetrieveDay} />
                <span>일</span>
                <NumberPicker range={[...Array(24)].map((_, i) => i)} value={retrieveHour} onChange={setRetrieveHour} />
                <span>시</span>
            </div>

            {/* 이전 및 다음 버튼 */}
            <button
                onClick={() => window.history.back()}
                className="mt-4 p-2 border border-[#1D2D5F] rounded-md text-[#1D2D5F] w-40"
            >
                이전
            </button>
            <button
                onClick={handleSave}
                className="mt-4 p-2 bg-[#1D2D5F] text-white rounded-md w-40 ml-4"
            >
                다음
            </button>
        </div>
    );
};

export default LuggageStorageComponent;
