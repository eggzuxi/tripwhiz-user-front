import { useGoogleLogin } from "@react-oauth/google";
import { getGoogleWithAccessToken } from "../../api/googleAPI.ts";
import useAuthStore from "../../store/AuthStore.ts";
import { getKakaoLoginLink } from "../../api/kakaoAPI.ts";
import { Link } from "react-router-dom";

function LoginComponent() {
    const { setUser } = useAuthStore(state => state);

    // Google Login Functionality
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("Access Token:", tokenResponse.access_token);

            // 액세스 토큰을 서버 API로 보내고 상태 업데이트
            await getGoogleWithAccessToken(tokenResponse.access_token, setUser);

            // 로그인 후 리다이렉션 처리
            window.location.href = "https://tripwhiz.shop/product/list";
            // window.location.href = "http://localhost:8081/product/list";
        },
        onError: () => console.error("Failed Login.."),
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    });

    // Kakao Login URL
    const kakaoLoginLink = getKakaoLoginLink();

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white pt-64">
            {/* Title */}
            <h2 className="text-center text-2xl font-bold text-[#1D2D5F] mb-8">Sign In</h2>

            {/* Google Login Button */}
            <button
                onClick={() => googleLogin()}
                className="w-full max-w-xs flex items-center border border-gray-300 rounded-full py-3 bg-white hover:shadow-lg transition duration-150 mb-4"
            >
                <img
                    src="/public/images/logo/google_logo.png"
                    alt="Google"
                    className="w-6 h-6 ml-4"
                />
                <span className="text-gray-800 font-medium mx-auto">
                    Sign in Google
                </span>
            </button>

            {/* Kakao Login Button */}
            <Link
                to={kakaoLoginLink}
                className="w-full max-w-xs flex items-center border border-gray-300 rounded-full py-3 bg-white hover:shadow-lg transition duration-150"
            >
                <img
                    src="/public/images/logo/kakao_logo.png"
                    alt="Kakao"
                    className="w-6 h-6 ml-4"
                />
                <span className="text-gray-800 font-medium mx-auto">
                    Sign in KakaoTalk
                </span>
            </Link>
        </div>
    );
}

export default LoginComponent;
