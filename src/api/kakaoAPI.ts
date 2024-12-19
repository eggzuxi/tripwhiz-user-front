import axios from 'axios';

const rest_api_key = '3e34907a71ec50993d339fa571affddf';

// 인증 후 리디렉션될 URI. 사용자가 카카오 로그인 인증을 완료하면 이 URI로 돌아옴
const redirect_uri = 'https://tripwhiz.shop/member/kakao';
// const redirect_uri = 'http://localhost:5173/member/kakao';

console.log("DEBUG - Redirect URI:", redirect_uri); // 리다이렉트 URI 출력

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;
const access_token_url = 'https://kauth.kakao.com/oauth/token';

// 백엔드 서버의 API URL. 액세스 토큰을 사용하여 사용자 정보를 요청할 때 사용
const host = '/api/member/kakao';
// const host = 'http://localhost:8081/api/member/kakao';

// 액세스 토큰을 사용해 사용자 정보를 가져오는 함수
export const getKakaoWithAccessToken = async (
    accessToken: string,
    setUser: (name: string, email: string, accessToken: string) => void
) => {
    try {
        console.log("DEBUG - Sending request to backend with accessToken:", accessToken);

        const res = await axios.get(`${host}?accessToken=${accessToken}`);

        console.log("DEBUG - Backend response:", res.data);  // 응답 데이터 확인

        const { name, email } = res.data;
        console.log("DEBUG - Extracted User Data:", name, email);

        if (name && email) {
            setUser(name, email, accessToken);  // 액세스 토큰도 함께 상태에 저장
        }

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('DEBUG - Error in fetching Access Token:', error.response?.data || error.message);
        } else {
            console.error('DEBUG - Unknown Error:', error);
        }
        throw error;
    }
};

// 카카오 로그인 링크 생성 함수
export const getKakaoLoginLink = () => {
    // const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code`;
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    console.log("DEBUG - Generated Kakao Login URL:", kakaoURL); // 카카오 로그인 URL 출력

    return kakaoURL;
};

// 액세스 토큰을 발급받는 함수
export const getAccessToken = async (authCode: string) => {
    console.log("DEBUG - Received authCode:", authCode); // 인가 코드 확인

    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    };

    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    };

    console.log("DEBUG - Sending request to Kakao for access token with params:", params);

    try {
        const res = await axios.post(access_token_url, params, header);
        console.log("DEBUG - Received Access Token Response:", res.data);

        const accessToken = res.data.access_token;
        console.log("DEBUG - Extracted Access Token:", accessToken);

        return accessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('DEBUG - Error in fetching Access Token:', error.response?.data || error.message);
        } else {
            console.error('DEBUG - Unknown Error:', error);
        }
        throw error;
    }
};
