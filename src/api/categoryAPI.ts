import axios from "axios";

// const host ='/api/categories';
const host ='http://localhost:8081/api/categories';


// 상위 카테고리 목록 가져오기
export const getCategories = async () => {
    try {
        const response = await axios.get(`${host}`);
        console.log("Fetched Categories:", response.data);
        return response.data; // 반환되는 데이터는 카테고리 배열
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// 하위 카테고리 목록 가져오기
export const getSubCategories = async (cno:number) => {
    try {
        const response = await axios.get(`${host}/${cno}/subcategories`);
        console.log("Fetched SubCategories:", response.data);
        return response.data; // 반환되는 데이터는 하위 카테고리 배열
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw error;
    }
};