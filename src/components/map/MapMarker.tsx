import { useEffect, useRef } from 'react';
import MapPin from './MapPin';

interface MapMarkerProps {
    map: google.maps.Map;
    position: google.maps.LatLngLiteral;
    title: string;
    content: string;
}

function MapMarker({ map, position, title, content }: MapMarkerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            // google.maps.Marker를 사용하여 마커 생성
            const marker = new google.maps.Marker({
                position,  // lat, lng 포함된 position
                map,
                title,
            });

            // Marker의 콘텐츠를 Custom으로 설정하기 위해 InfoWindow 사용
            const infoWindow = new google.maps.InfoWindow({
                content: ref.current,  // MapPin을 InfoWindow로 설정
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });

            // Cleanup: 컴포넌트 unmount 시 마커 제거
            return () => {
                marker.setMap(null); // 마커 제거
            };
        }
    }, [map, position, title, content]);  // 의존성 배열에 필요한 props 추가

    return (
        <div ref={ref} style={{ backgroundColor: '#db4455', borderColor: '#881824' }}>
            <MapPin>{content}</MapPin>
        </div>
    );
}

export default MapMarker;

