import axios from "axios";

// 서버 URL 가져오기
const USER_SERVER_URL = import.meta.env.VITE_USER_SERVER_URL || "";
// const STORE_SERVER_URL = import.meta.env.VITE_STORE_SERVER_URL || "http://localhost:8082";

const storeAPI = {

    read: async (spno: number) => {
        try {
            const response = await axios.get(`${USER_SERVER_URL}/api/spot/${spno}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Spot with ID ${spno}:`, error);
            throw error;
        }
    },


    list: async () => {
        try {
            const response = await axios.get(`${USER_SERVER_URL}/api/spot/list`);
            return response.data;
        } catch (error) {
            console.error("Error fetching Spot list:", error);
            throw error;
        }
    },
};

export default storeAPI;