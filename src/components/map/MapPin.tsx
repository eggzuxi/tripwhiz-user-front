import React, { useEffect, useRef } from 'react';

// props 타입 정의
interface MapPinProps {
    children: React.ReactNode;
}

// forwardRef로 ref를 부모 컴포넌트에 전달할 수 있도록 처리
const MapPin = React.forwardRef<HTMLDivElement, MapPinProps>((props, ref) => {
    const innerRef = useRef<HTMLDivElement>(null); // 내부 ref 선언

    useEffect(() => {
        const currentRef = innerRef.current; // ref.current를 변수로 저장

        if (currentRef) {
            // google.maps.marker.PinElement 생성
            const initPin = new google.maps.marker.PinElement({
                background: '#db4455', // 핀 배경 색
                borderColor: '#881824', // 핀 테두리 색
            });

            // ref.current에 PinElement 추가
            currentRef.appendChild(initPin.element);

            // Cleanup: 컴포넌트가 unmount될 때 핀 제거
            return () => {
                currentRef.removeChild(initPin.element);
            };
        }
    }, []);

    // div로 MapPin을 렌더링
    return <div ref={ref ? ref : innerRef}>{props.children}</div>;
});

export default MapPin;