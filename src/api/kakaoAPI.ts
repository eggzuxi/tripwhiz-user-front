import axios from 'axios';


const rest_api_key = '3e34907a71ec50993d339fa571affddf'

// 인증 후 리디렉션될 URI. 사용자가 카카오 로그인 인증을 완료하면 이 URI로 돌아옴
// const redirect_uri = 'http://10.10.10.73:5173/member/kakao'
const redirect_uri = '/member/kakao'

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url = 'https://kauth.kakao.com/oauth/token'

// 백엔드 서버의 API URL. 액세스 토큰을 사용하여 사용자 정보를 요청할 때 사용

const host = 'http://localhost:8081/api/member/kakao'
// const host = '/api/member/kakao'

// 액세스 토큰을 사용해 사용자 정보를 가져오는 함수
export const getKakaoWithAccessToken = async (
    accessToken: string,
    setUser: (name: string, email: string, accessToken: string) => void
) => {
    try {
        const res = await axios.get(`${host}?accessToken=${accessToken}`);
        console.log("카카오 백엔드 응답 데이터:", res.data);  // 응답 데이터 확인

        const { name, email } = res.data;

        console.log("---------------------------------------0", name, email)

        if (name && email) {
            setUser(name, email, accessToken);  // 액세스 토큰도 함께 상태에 저장
        }

        return res.data;
    } catch (error) {
        console.error("API 호출 오류:", error);
        throw error;
    }
}


// 카카오 로그인 링크 생성 함수
export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoURL
}

// 액세스 토큰을 발급받는 함수
export const getAccessToken = async (authCode:string) => {
    // HTTP 요청 헤더 설정
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    // HTTP 요청 바디에 전달할 파라미터 설정
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code:authCode
    }
    const res = await axios.post(access_token_url, params , header)
    const accessToken = res.data.access_token

    return accessToken
}