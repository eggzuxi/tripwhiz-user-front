import { updateLuggageLocation } from "./updateLuggageLocation";

/**
 * 수화물 이동 시뮬레이션
 */
export const simulateLuggageMovement = () => {
    const route = [
        { lat: 3.139, lng: 101.6869 }, // 출발: 쿠알라룸푸르
        { lat: 3.145, lng: 101.692 },  // 경유1
        { lat: 3.150, lng: 101.700 },  // 경유2
        { lat: 3.160, lng: 101.730 },  // 도착점
    ];

    let index = 0;

    const interval = setInterval(() => {
        if (index < route.length) {
            updateLuggageLocation(route[index].lat, route[index].lng);
            index++;
        } else {
            clearInterval(interval); // 경로 종료 시 정리
        }
    }, 5000); // 5초마다 위치 업데이트
};
