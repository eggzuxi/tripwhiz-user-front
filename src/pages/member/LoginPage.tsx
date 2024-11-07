import KakaoLoginComponent from "../../components/member/KakaoLoginComponent.tsx";
import GoogleLoginComponent from "../../components/member/GoogleLoginComponent.tsx";

function LoginPage() {
    return (
        <div>
            Login Page

            <KakaoLoginComponent/>
            <GoogleLoginComponent/>
        </div>
    );
}

export default LoginPage;