import useAuthStore from "../../store/AuthStore.ts";
import { useNavigate } from "react-router-dom";
import {startTransition} from "react";

const MyPageComponent = () => {
    const { name, email, logout } = useAuthStore(); // 사용자 정보 및 로그아웃 함수 가져오기
    const navigate = useNavigate();

    const handleLogout = (): void => {
        startTransition(() => {
            logout(); // 상태 초기화 및 세션 스토리지 초기화
            navigate("/main"); // 메인 페이지로 이동
        });
    };
    return (
        <div className="w-full h-screen bg-white p-4 overflow-y-auto">
            {/* 내 정보 섹션 */}
            <div className="text-center bg-purple-50 rounded-lg shadow-md mb-6">
                <div className="text-xl font-semibold text-gray-800 mb-2">
                    {name ? `${name}님 환영합니다` : "회원님 환영합니다"}
                </div>
                <div className="text-sm text-gray-600">{email || "example@email.com"}</div>
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-full">
                    내 정보 보기
                </button>
            </div>

            {/* 기타 섹션 */}
            <div className="mt-6">
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button className="border border-purple-500 text-purple-500 py-2 rounded-lg font-medium">
                        고객센터
                    </button>
                    <button
                        onClick={handleLogout}
                        className="border border-gray-300 text-gray-500 py-2 rounded-lg font-medium"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyPageComponent;
