// MapMarker.tsx
import { useEffect, useRef } from 'react';
import MapPin from './MapPin';

function MapMarker({ map }: { map: google.maps.Map }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const initMarker = new google.maps.marker.AdvancedMarkerElement({
                position: {
                    lat: 37.549186395087,
                    lng: 127.07505567644,
                },
                map,
                title: '이건 마커다 마커마커',
                content: ref.current, // PinElement
            });

            return () => {
                initMarker.map = null;
            };
        }
    }, [map]);

    return (
        <div ref={ref} style={{ backgroundColor: '#db4455', borderColor: '#881824' }}>
            <MapPin ref={ref}>마커</MapPin>
        </div>
    );
}

export default MapMarker;
