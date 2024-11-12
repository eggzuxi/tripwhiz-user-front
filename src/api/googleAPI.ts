import axios from "axios";


const host = 'http://localhost:8080/api/v1/member/google'


//액세스 토큰을 사용해 사용자 정보를 가져오는 함수
export const getGoolgeWithAccessToken = async (accessToken:string) => {

    try {
        const res = await axios.get(`${host}?accessToken=${accessToken}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching Google user data: ", error);
        throw error;
    }

}
