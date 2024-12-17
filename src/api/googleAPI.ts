import axios from "axios";

// const host = 'https://tripwhiz.shop/api/member/google'
const host = 'http://localhost:8081/api/member/google'

// 액세스 토큰을 사용해 사용자 정보를 가져오는 함수
export const getGoogleWithAccessToken = async (
    accessToken: string,
    setUser: (name: string, email: string, accessToken: string) => void
) => {
    try {
        const res = await axios.get(`${host}?accessToken=${accessToken}`);
        console.log("구글 백엔드 응답 데이터:", res.data); // 응답 데이터 확인

        const { name, email } = res.data;  // 백엔드 응답에서 name, email를 받아옵니다.

        console.log("---------------------------------------0", name, email)

        if (name && email) {
            setUser(name, email, accessToken);  // 액세스 토큰도 함께 상태에 저장
        }

        return res.data;
    } catch (error) {
        console.error("Error fetching Google user data: ", error);
        throw error;
    }

}
