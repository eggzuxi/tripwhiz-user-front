import KakaoLoginComponent from "../../components/member/KakaoLoginComponent.tsx";
import GoogleLoginComponent from "../../components/member/GoogleLoginComponent.tsx";
import HeaderLayout from "../../layouts/HeaderLayout.tsx";

function LoginPage() {
    return (
        <div>
            <HeaderLayout />
            <KakaoLoginComponent/>
            <GoogleLoginComponent/>
        </div>
    );
}

export default LoginPage;