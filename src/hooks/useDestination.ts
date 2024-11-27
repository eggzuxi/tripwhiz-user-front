import {create} from 'zustand';
import axios from 'axios';

// 상태 타입 정의
interface DestinationState {
    selectedDestination: { id: number; name: string } | null; // 선택한 나라 정보
    fetchDestination: (id: number) => Promise<void>; // API 호출 함수
}

export const useDestination = create<DestinationState>((set) => ({
    selectedDestination: null,
    fetchDestination: async (id: number) => {
        try {
            const response = await axios.get(
                `http://localhost:8082/api/nationality/${id}`
            ); // 점주 서버의 엔드포인트 호출
            const destinationData = response.data; // API에서 받은 데이터

            console.log("Fetched destination data:", destinationData); // API에서 받은 데이터 확인

            set({ selectedDestination: { id: destinationData.id, name: destinationData.name } });
        } catch (error) {
            console.error("Failed to fetch destination:", error);
        }
    },
}));
