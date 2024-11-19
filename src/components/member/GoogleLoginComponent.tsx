import {useGoogleLogin} from "@react-oauth/google";
import googleLoginImage from '/static/web_neutral_sq_SI@2x.png';
import {getGoogleWithAccessToken} from "../../api/googleAPI.ts";
import useAuthStore from "../../store/AuthStore.ts";

function GoogleLoginComponent() {

    const { setUser } = useAuthStore(state => state);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Access Token:', tokenResponse.access_token);

            // 액세스 토큰을 서버 API로 보내고 상태 업데이트
            await getGoogleWithAccessToken(tokenResponse.access_token, setUser);

            //로그인 후 리다이렉션 처리
            window.location.href = 'http://localhost:5173/product/list';
        },
        onError: () => console.error("Failed Login.."),
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
    });


    return (
        <div className="flex justify-center  w-full">
            {/* 로그인 버튼 */}
            <button onClick={() => login()}>
                <img
                    src={googleLoginImage}
                    width="200"
                    height="auto"
                />
            </button>
        </div>
    );
}

export default GoogleLoginComponent;