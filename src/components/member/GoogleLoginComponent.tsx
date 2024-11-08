import {useGoogleLogin} from "@react-oauth/google";
import {getGoolgeWithAccessToken} from "../../api/googleAPI.ts";
import googleLoginImage from '/static/web_neutral_sq_SI@2x.png';

function GoogleLoginComponent() {


    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Access Token:', tokenResponse.access_token);
            //액세스토큰을 서버 API로 보내기
            getGoolgeWithAccessToken(tokenResponse.access_token);

            //로그인 후 리다이렉션 처리
            window.location.href = 'http://localhost:5173/member/google';
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