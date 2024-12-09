import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";

interface MapMarkerProps {
    map: google.maps.Map;
    position: google.maps.LatLngLiteral;
    title: string;
    content: string;
    address: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ map, position, title, content, address }) => {

    const navigate = useNavigate()

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
                    navigate("/order/pickup"); // 절대 경로 사용
                }}
            >
                선택하기
            </button>
        </div>

    );
};

export default MapMarker;
