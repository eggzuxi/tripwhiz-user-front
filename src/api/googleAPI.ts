import axios from "axios";


// const host = 'http://10.10.10.215:8080/api/v1/member/google'
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

// 액세스 토큰을 사용해 사용자 정보를 가져오는 함수
// export const getGoolgeWithAccessToken = async (accessToken: string) => {
//     try {
//         // Google API의 사용자 정보 요청
//         const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`  // Bearer 토큰 방식으로 액세스 토큰을 전달
//             }
//         });
//
//         // 사용자 정보 반환
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching Google user data: ", error);
//         throw error;
//     }
// }