import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {cartStore} from "../../store/CartStore.ts";

interface MapMarkerProps {
    map: google.maps.Map;
    position: google.maps.LatLngLiteral;
    title: string;
    content: string;
    address: string;
    spno: number; // 지점 번호
}

const MapMarker: React.FC<MapMarkerProps> = ({ map, position, title, content, address, spno }) => {

    const navigate = useNavigate()
    const setSpno = cartStore((state) => state.setSpno); // Zustand의 setSpno 함수 가져오기

    useEffect(() => {
        const marker = new google.maps.Marker({
            position,
            map,
            title,
        });

        const infoWindow = new google.maps.InfoWindow({
            content, // content를 InfoWindow에 전달
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        return () => {
            marker.setMap(null);
        };
    }, [map, position, title]);

    return (
        <div>
            <div>{title}</div>
            <div>{address}</div>
            <button
                onClick={() => {
                    setSpno(spno); // 클릭 시 지점번호 저장
                    navigate("/order/pickup"); // 절대 경로 사용
                }}
            >
                선택하기
            </button>
        </div>

    );
};

export default MapMarker;
