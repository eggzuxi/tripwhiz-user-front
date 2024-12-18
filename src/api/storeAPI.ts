import axios from "axios";
import {SpotDTO} from "../types/luggage.ts";

// 기본 API URL (Vite 프록시 설정이 `/api`로 시작하는 요청을 백엔드로 라우팅)
const BASE_URL = "/api/spot";
// const BASE_URL = "http://localhost:8081/api/spot";

export const storeAPI = {
    /**
     * Fetch the list of spots
     * @returns {Promise<SpotDTO[]>} List of spots
     */
    async list(): Promise<SpotDTO[]> {
        try {
            const response = await axios.get(`${BASE_URL}/list`);
            return response.data; // SpotDTO 배열 반환
        } catch (error) {
            console.error("Error fetching spot list:", error);
            throw error;
        }
    },

    /**
     * Fetch a specific spot by ID
     * @param spno Spot ID
     * @returns {Promise<SpotDTO>} Spot details
     */
    async getSpot(spno: number): Promise<SpotDTO> {
        try {
            const response = await axios.get(`${BASE_URL}/${spno}`);
            return response.data; // SpotDTO 반환
        } catch (error) {
            console.error(`Error fetching spot with ID ${spno}:`, error);
            throw error;
        }
    },

    /**
     * Sync spots from the admin server
     * @returns {Promise<void>} Sync success status
     */
    async sync(): Promise<void> {
        try {
            await axios.post(`${BASE_URL}/sync`);
            console.log("Successfully synced spots from admin server.");
        } catch (error) {
            console.error("Error syncing spots from admin server:", error);
            throw error;
        }
    },
};
