import useAuthStore from "../../store/AuthStore.ts";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";

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
        <div className="w-full h-screen bg-gray-50 p-4 overflow-y-auto">
            {/* 헤더 */}

            {/* 사용자 정보 섹션 */}
            <div className="text-center bg-purple-100 rounded-lg shadow-md p-4 mt-4">
                <div className="text-lg font-semibold text-gray-800">
                    {name ? `${name}님 환영합니다` : "회원님 환영합니다"}
                </div>
                <div className="text-sm text-gray-600 mt-1">{email || "example@email.com"}</div>
                <button className="mt-4 px-6 py-2 bg-purple-500 text-white text-sm font-medium rounded-full">
                    내 정보 보기
                </button>
            </div>

            {/* 주요 아이콘 섹션 */}
            <div className="grid grid-cols-4 gap-4 text-center mt-6">
                {[
                    { label: "공지사항", icon: "📜" },
                    { label: "이벤트", icon: "🎉" },
                    { label: "결제내역", icon: "💳" },
                    { label: "쿠폰북", icon: "🎟️" },
                    { label: "결제카드", icon: "💳" },
                    { label: "면허증", icon: "🚗" },
                    { label: "FAQ", icon: "❓" },
                    { label: "친구초대", icon: "👥" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center bg-white rounded-lg shadow p-4"
                    >
                        <div className="text-3xl">{item.icon}</div>
                        <div className="text-sm font-medium text-gray-700 mt-2">{item.label}</div>
                    </div>
                ))}
            </div>

            {/* 마일리지 및 기타 버튼 섹션 */}
            <div className="mt-8 bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold text-gray-800">마일리지</div>
                    <div className="text-purple-500 text-lg font-bold">1,000원</div>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg">
                    고객센터
                </button>
                <button
                    onClick={handleLogout}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 text-gray-500 text-sm font-medium rounded-lg"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default MyPageComponent;
